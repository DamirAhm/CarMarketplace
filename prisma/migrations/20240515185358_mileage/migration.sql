/*
  Warnings:

  - You are about to drop the column `mileage` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Advertisment" ADD COLUMN "mileage" INTEGER;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "engineType" TEXT,
    "transmission" TEXT,
    "engineVolume" REAL,
    "body" TEXT,
    "generation" TEXT
);
INSERT INTO "new_Car" ("body", "brand", "engineType", "engineVolume", "generation", "id", "model", "transmission", "year") SELECT "body", "brand", "engineType", "engineVolume", "generation", "id", "model", "transmission", "year" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
CREATE UNIQUE INDEX "Car_brand_model_year_engineType_transmission_key" ON "Car"("brand", "model", "year", "engineType", "transmission");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
