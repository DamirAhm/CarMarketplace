-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Advertisment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "generation" TEXT,
    "mileage" INTEGER,
    "engineType" TEXT,
    "engineVolume" REAL,
    "transmission" TEXT,
    "body" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Advertisment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Advertisment" ("body", "brand", "cost", "createdAt", "currency", "description", "engineType", "engineVolume", "generation", "id", "mileage", "model", "transmission", "userId", "year") SELECT "body", "brand", "cost", "createdAt", "currency", "description", "engineType", "engineVolume", "generation", "id", "mileage", "model", "transmission", "userId", "year" FROM "Advertisment";
DROP TABLE "Advertisment";
ALTER TABLE "new_Advertisment" RENAME TO "Advertisment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
