/*
  Warnings:

  - You are about to drop the column `body` on the `Advertisment` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `Advertisment` table. All the data in the column will be lost.
  - You are about to drop the column `engineType` on the `Advertisment` table. All the data in the column will be lost.
  - You are about to drop the column `engineVolume` on the `Advertisment` table. All the data in the column will be lost.
  - You are about to drop the column `generation` on the `Advertisment` table. All the data in the column will be lost.
  - You are about to drop the column `mileage` on the `Advertisment` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Advertisment` table. All the data in the column will be lost.
  - You are about to drop the column `transmission` on the `Advertisment` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Advertisment` table. All the data in the column will be lost.
  - Added the required column `carId` to the `Advertisment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "opinion" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reaction_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Feedback_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "mileage" INTEGER,
    "engineType" TEXT,
    "transmission" TEXT,
    "engineVolume" REAL,
    "body" TEXT,
    "generation" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Advertisment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "carId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Advertisment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Advertisment_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Advertisment" ("cost", "createdAt", "currency", "description", "id", "userId") SELECT "cost", "createdAt", "currency", "description", "id", "userId" FROM "Advertisment";
DROP TABLE "Advertisment";
ALTER TABLE "new_Advertisment" RENAME TO "Advertisment";
CREATE TABLE "new_Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" BLOB NOT NULL,
    "fileType" TEXT NOT NULL,
    "advertismentId" TEXT,
    "userId" TEXT,
    "feedbackId" TEXT,
    CONSTRAINT "Image_advertismentId_fkey" FOREIGN KEY ("advertismentId") REFERENCES "Advertisment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Image_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("advertismentId", "content", "fileType", "id", "userId") SELECT "advertismentId", "content", "fileType", "id", "userId" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Car_brand_model_year_mileage_engineType_transmission_key" ON "Car"("brand", "model", "year", "mileage", "engineType", "transmission");
