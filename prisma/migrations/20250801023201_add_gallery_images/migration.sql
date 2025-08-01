-- AlterTable
ALTER TABLE "public"."UserSession" ADD COLUMN     "browser" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "colorDepth" INTEGER,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "device" TEXT,
ADD COLUMN     "headers" JSONB,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "os" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "screenResolution" TEXT,
ADD COLUMN     "timezone" TEXT,
ADD COLUMN     "viewport" TEXT;

-- CreateTable
CREATE TABLE "public"."GalleryImage" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "imageUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "category" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);
