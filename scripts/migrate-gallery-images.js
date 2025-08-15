const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function migrateGalleryImages() {
  try {
    console.log('Starting gallery images migration...')

    // Check if there are existing gallery images without projectId
    const imagesWithoutProject = await prisma.galleryImage.findMany({
      where: { projectId: null },
    })

    if (imagesWithoutProject.length === 0) {
      console.log('No gallery images need migration.')
      return
    }

    console.log(`Found ${imagesWithoutProject.length} images without project assignment.`)

    // Create a default project for existing gallery images
    const defaultProject = await prisma.project.create({
      data: {
        title: 'Galeria Geral (Migração)',
        description: 'Projeto criado automaticamente durante a migração para agrupar imagens existentes da galeria.',
        location: null,
        completedAt: null,
        isActive: true,
        imageUrls: [], // Empty array since we're moving to relations
      },
    })

    console.log(`Created default project: "${defaultProject.title}" (ID: ${defaultProject.id})`)

    // Update all images without projectId to use the default project
    const updateResult = await prisma.galleryImage.updateMany({
      where: { projectId: null },
      data: { projectId: defaultProject.id },
    })

    console.log(`Successfully assigned ${updateResult.count} images to the default project.`)
    
    // Verify the migration
    const remainingOrphans = await prisma.galleryImage.count({
      where: { projectId: null },
    })

    if (remainingOrphans === 0) {
      console.log('Migration completed successfully! All gallery images now have a project.')
    } else {
      console.warn(`Warning: ${remainingOrphans} images still without project assignment.`)
    }

  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the migration
migrateGalleryImages()
  .then(() => {
    console.log('Migration script completed.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Migration script failed:', error)
    process.exit(1)
  })