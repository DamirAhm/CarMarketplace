/*
  Warnings:

  - A unique constraint covering the columns `[advertismentId,userId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorite_advertismentId_userId_key" ON "Favorite"("advertismentId", "userId");
