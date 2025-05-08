/*
  Warnings:

  - You are about to drop the column `name` on the `Sprint` table. All the data in the column will be lost.
  - Added the required column `index` to the `Sprint` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sprint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "duration" TEXT NOT NULL,
    "expectedPoints" INTEGER NOT NULL,
    "achievedPoints" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Sprint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sprint" ("achievedPoints", "duration", "endDate", "expectedPoints", "id", "projectId", "startDate") SELECT "achievedPoints", "duration", "endDate", "expectedPoints", "id", "projectId", "startDate" FROM "Sprint";
DROP TABLE "Sprint";
ALTER TABLE "new_Sprint" RENAME TO "Sprint";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
