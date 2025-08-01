# Cloudinary Setup for Gallery Upload

## Environment Variables Required

Add these environment variables to your `.env.local` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## How to Get Credentials

1. Go to [Cloudinary](https://cloudinary.com) and create an account or log in
2. Go to your dashboard
3. Copy the following values:
   - Cloud Name
   - API Key
   - API Secret
4. Add them to your `.env.local` file

## Features

- Upload images to gallery with title, description, and location
- Automatic image optimization and resizing
- Category-based organization
- Admin panel for managing uploaded images
- Real-time gallery updates on the portfolio page

## Usage

1. Visit `/admin/gallery` to upload and manage images
2. Images will automatically appear on the `/portfolio` page
3. Images are stored in the `pisos-pro/gallery` folder in Cloudinary
4. Database tracks image metadata including title, description, location, and category