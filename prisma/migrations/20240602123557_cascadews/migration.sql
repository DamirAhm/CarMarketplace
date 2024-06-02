-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" BLOB NOT NULL,
    "fileType" TEXT NOT NULL,
    "advertismentId" TEXT,
    "userId" TEXT,
    "feedbackId" TEXT,
    CONSTRAINT "Image_advertismentId_fkey" FOREIGN KEY ("advertismentId") REFERENCES "Advertisment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Image_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("advertismentId", "content", "feedbackId", "fileType", "id", "userId") SELECT "advertismentId", "content", "feedbackId", "fileType", "id", "userId" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE TABLE "new_Favorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "advertismentId" TEXT NOT NULL,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Favorite_advertismentId_fkey" FOREIGN KEY ("advertismentId") REFERENCES "Advertisment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Favorite" ("advertismentId", "id", "userId") SELECT "advertismentId", "id", "userId" FROM "Favorite";
DROP TABLE "Favorite";
ALTER TABLE "new_Favorite" RENAME TO "Favorite";
CREATE UNIQUE INDEX "Favorite_advertismentId_userId_key" ON "Favorite"("advertismentId", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
