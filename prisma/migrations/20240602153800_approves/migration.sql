-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Advertisment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "mileage" INTEGER,
    "carId" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Advertisment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Advertisment_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Advertisment" ("carId", "cost", "createdAt", "currency", "description", "id", "mileage", "userId") SELECT "carId", "cost", "createdAt", "currency", "description", "id", "mileage", "userId" FROM "Advertisment";
DROP TABLE "Advertisment";
ALTER TABLE "new_Advertisment" RENAME TO "Advertisment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
