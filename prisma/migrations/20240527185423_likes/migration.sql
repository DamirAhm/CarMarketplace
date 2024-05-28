-- CreateTable
CREATE TABLE "Likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "advertismentId" TEXT NOT NULL,
    CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Likes_advertismentId_fkey" FOREIGN KEY ("advertismentId") REFERENCES "Advertisment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
