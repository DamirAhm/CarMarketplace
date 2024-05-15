/*
  Warnings:

  - Made the column `engineType` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `transmission` on table `Car` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "engineType" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "engineVolume" REAL,
    "body" TEXT,
    "generation" TEXT
);
INSERT INTO "new_Car" ("body", "brand", "engineType", "engineVolume", "generation", "id", "model", "transmission", "year") SELECT "body", "brand", "engineType", "engineVolume", "generation", "id", "model", "transmission", "year" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
CREATE UNIQUE INDEX "Car_brand_model_year_engineType_transmission_key" ON "Car"("brand", "model", "year", "engineType", "transmission");
CREATE TABLE "new_Advertisment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "mileage" INTEGER,
    "carId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Advertisment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Advertisment_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Advertisment" ("carId", "cost", "createdAt", "currency", "description", "id", "mileage", "userId") SELECT "carId", "cost", "createdAt", "currency", "description", "id", "mileage", "userId" FROM "Advertisment";
DROP TABLE "Advertisment";
ALTER TABLE "new_Advertisment" RENAME TO "Advertisment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
