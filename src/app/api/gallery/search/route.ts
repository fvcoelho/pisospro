import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Search parameters
    const query = searchParams.get('q') || searchParams.get('query')
    const categories = searchParams.get('categories')?.split(',').filter(Boolean)
    const locations = searchParams.get('locations')?.split(',').filter(Boolean)
    const status = searchParams.get('status') // 'active', 'inactive', 'all'
    
    // Date range filters
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const skip = (page - 1) * pageSize
    
    // Sorting
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    
    // Build where clause
    const where: Record<string, any> = {}
    
    // Text search in title and description
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { location: { contains: query, mode: 'insensitive' } }
      ]
    }
    
    // Category filter (multiple categories with OR)
    if (categories && categories.length > 0) {
      if (where.OR) {
        // If we already have an OR clause from text search, combine with AND
        where.AND = [
          { OR: where.OR },
          { category: { in: categories } }
        ]
        delete where.OR
      } else {
        where.category = { in: categories }
      }
    }
    
    // Location filter (multiple locations with OR)
    if (locations && locations.length > 0) {
      const locationCondition = {
        OR: locations.map(loc => ({
          location: { contains: loc, mode: 'insensitive' as const }
        }))
      }
      
      if (where.AND) {
        where.AND.push(locationCondition)
      } else if (where.OR) {
        where.AND = [{ OR: where.OR }, locationCondition]
        delete where.OR
      } else {
        where.location = { 
          in: locations 
        }
      }
    }
    
    // Status filter
    if (status === 'active') {
      where.isActive = true
    } else if (status === 'inactive') {
      where.isActive = false
    } else if (!status || status === 'default') {
      where.isActive = true // Default to active only
    }
    // status === 'all' shows everything
    
    // Date range filter
    if (dateFrom || dateTo) {
      const dateFilter: Record<string, any> = {}
      if (dateFrom) {
        dateFilter.gte = new Date(dateFrom)
      }
      if (dateTo) {
        // Add 1 day to include the entire day
        const endDate = new Date(dateTo)
        endDate.setDate(endDate.getDate() + 1)
        dateFilter.lt = endDate
      }
      where.createdAt = dateFilter
    }
    
    // Get total count for pagination
    const totalCount = await prisma.galleryImage.count({ where })
    
    // Build orderBy
    const orderBy: Record<string, 'asc' | 'desc'> = {}
    if (sortBy === 'title') {
      orderBy.title = sortOrder
    } else if (sortBy === 'category') {
      orderBy.category = sortOrder
    } else if (sortBy === 'location') {
      orderBy.location = sortOrder
    } else if (sortBy === 'updatedAt') {
      orderBy.updatedAt = sortOrder
    } else {
      orderBy.createdAt = sortOrder
    }
    
    // Fetch images
    const images = await prisma.galleryImage.findMany({
      where,
      orderBy,
      skip,
      take: pageSize
    })
    
    // Get unique categories and locations for filters
    const allImages = await prisma.galleryImage.findMany({
      select: {
        category: true,
        location: true
      },
      where: {
        isActive: status === 'inactive' ? false : (status === 'all' ? undefined : true)
      }
    })
    
    const uniqueCategories = [...new Set(allImages
      .map(img => img.category)
      .filter(Boolean)
    )].sort()
    
    const uniqueLocations = [...new Set(allImages
      .map(img => img.location)
      .filter(Boolean)
    )].sort()
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / pageSize)
    const hasNextPage = page < totalPages
    const hasPreviousPage = page > 1
    
    return NextResponse.json({
      images,
      pagination: {
        currentPage: page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage
      },
      filters: {
        availableCategories: uniqueCategories,
        availableLocations: uniqueLocations,
        appliedFilters: {
          query,
          categories,
          locations,
          status,
          dateFrom,
          dateTo
        }
      }
    })
  } catch (error) {
    console.error('Error searching gallery images:', error)
    return NextResponse.json(
      { error: 'Failed to search images' },
      { status: 500 }
    )
  }
}

// POST advanced search with request body
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Extract search parameters from body
    const {
      query,
      categories,
      locations,
      status = 'active',
      dateFrom,
      dateTo,
      page = 1,
      pageSize = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc' as 'asc' | 'desc'
    } = body
    
    const skip = (page - 1) * pageSize
    
    // Build complex where clause
    const where: Record<string, any> = {}
    const andConditions: Record<string, any>[] = []
    
    // Text search with relevance
    if (query) {
      const searchConditions = []
      
      // Exact match gets highest priority
      searchConditions.push({ title: { equals: query } })
      searchConditions.push({ description: { equals: query } })
      
      // Contains match
      searchConditions.push({ title: { contains: query, mode: 'insensitive' } })
      searchConditions.push({ description: { contains: query, mode: 'insensitive' } })
      searchConditions.push({ location: { contains: query, mode: 'insensitive' } })
      
      // Starts with match
      searchConditions.push({ title: { startsWith: query, mode: 'insensitive' } })
      
      andConditions.push({ OR: searchConditions })
    }
    
    // Categories filter
    if (categories && categories.length > 0) {
      andConditions.push({ category: { in: categories } })
    }
    
    // Locations filter
    if (locations && locations.length > 0) {
      andConditions.push({
        OR: locations.map((loc: string) => ({
          location: { contains: loc, mode: 'insensitive' }
        }))
      })
    }
    
    // Status filter
    if (status === 'active') {
      andConditions.push({ isActive: true })
    } else if (status === 'inactive') {
      andConditions.push({ isActive: false })
    }
    // 'all' status doesn't add any filter
    
    // Date range filter
    if (dateFrom || dateTo) {
      const dateFilter: Record<string, any> = {}
      if (dateFrom) {
        dateFilter.gte = new Date(dateFrom)
      }
      if (dateTo) {
        const endDate = new Date(dateTo)
        endDate.setDate(endDate.getDate() + 1)
        dateFilter.lt = endDate
      }
      andConditions.push({ createdAt: dateFilter })
    }
    
    // Combine all conditions
    if (andConditions.length > 0) {
      where.AND = andConditions
    }
    
    // Get total count
    const totalCount = await prisma.galleryImage.count({ where })
    
    // Build orderBy
    const orderBy: Record<string, 'asc' | 'desc'> = {}
    if (sortBy === 'title') {
      orderBy.title = sortOrder
    } else if (sortBy === 'category') {
      orderBy.category = sortOrder
    } else if (sortBy === 'location') {
      orderBy.location = sortOrder
    } else if (sortBy === 'updatedAt') {
      orderBy.updatedAt = sortOrder
    } else {
      orderBy.createdAt = sortOrder
    }
    
    // Fetch images
    const images = await prisma.galleryImage.findMany({
      where,
      orderBy,
      skip,
      take: pageSize
    })
    
    // Calculate pagination
    const totalPages = Math.ceil(totalCount / pageSize)
    
    return NextResponse.json({
      success: true,
      images,
      pagination: {
        currentPage: page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      },
      searchCriteria: body
    })
  } catch (error) {
    console.error('Error in advanced search:', error)
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    )
  }
}