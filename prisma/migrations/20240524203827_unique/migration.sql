/*
  Warnings:

  - A unique constraint covering the columns `[userId,feedbackId]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Reaction_userId_feedbackId_key" ON "Reaction"("userId", "feedbackId");
