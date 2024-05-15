-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageId" TEXT
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" BLOB NOT NULL,
    "fileType" TEXT NOT NULL,
    "advertismentId" TEXT,
    "userId" TEXT,
    CONSTRAINT "Image_advertismentId_fkey" FOREIGN KEY ("advertismentId") REFERENCES "Advertisment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Advertisment" (
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
    CONSTRAINT "Advertisment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
