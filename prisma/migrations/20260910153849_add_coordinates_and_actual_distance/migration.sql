-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "actualRoadDistanceKm" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Stop" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;
