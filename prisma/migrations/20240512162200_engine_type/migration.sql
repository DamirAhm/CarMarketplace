/*
  Warnings:

  - Added the required column `engineType` to the `Advertisment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Advertisment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "generation" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "engineType" TEXT NOT NULL,
    "engineVolume" REAL NOT NULL,
    "transmission" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Advertisment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Advertisment" ("body", "brand", "cost", "createdAt", "currency", "description", "engineVolume", "generation", "id", "mileage", "model", "transmission", "userId", "year") SELECT "body", "brand", "cost", "createdAt", "currency", "description", "engineVolume", "generation", "id", "mileage", "model", "transmission", "userId", "year" FROM "Advertisment";
DROP TABLE "Advertisment";
ALTER TABLE "new_Advertisment" RENAME TO "Advertisment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
