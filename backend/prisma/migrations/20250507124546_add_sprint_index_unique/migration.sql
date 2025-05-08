/*
  Warnings:

  - A unique constraint covering the columns `[projectId,index]` on the table `Sprint` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sprint_projectId_index_key" ON "Sprint"("projectId", "index");
