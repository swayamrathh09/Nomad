/*
  Warnings:

  - A unique constraint covering the columns `[districtId,name]` on the table `Package` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[districtId,name]` on the table `Stop` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Package_districtId_name_key" ON "Package"("districtId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Stop_districtId_name_key" ON "Stop"("districtId", "name");
