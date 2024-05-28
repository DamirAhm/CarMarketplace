/*
  Warnings:

  - A unique constraint covering the columns `[advertismentId,userId]` on the table `View` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "View_advertismentId_userId_key" ON "View"("advertismentId", "userId");
