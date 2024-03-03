/*
  Warnings:

  - A unique constraint covering the columns `[authorId,typeeId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vote_authorId_typeeId_key" ON "Vote"("authorId", "typeeId");
