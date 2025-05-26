-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectMember" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "firstname" TEXT,
    CONSTRAINT "ProjectMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProjectMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectMember" ("firstname", "id", "projectId", "userId") SELECT "firstname", "id", "projectId", "userId" FROM "ProjectMember";
DROP TABLE "ProjectMember";
ALTER TABLE "new_ProjectMember" RENAME TO "ProjectMember";
CREATE UNIQUE INDEX "ProjectMember_projectId_userId_key" ON "ProjectMember"("projectId", "userId");
CREATE TABLE "new_Sprint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "duration" TEXT NOT NULL,
    "expectedPoints" INTEGER NOT NULL,
    "achievedPoints" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Sprint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Sprint" ("achievedPoints", "duration", "endDate", "expectedPoints", "id", "index", "projectId", "startDate") SELECT "achievedPoints", "duration", "endDate", "expectedPoints", "id", "index", "projectId", "startDate" FROM "Sprint";
DROP TABLE "Sprint";
ALTER TABLE "new_Sprint" RENAME TO "Sprint";
CREATE UNIQUE INDEX "Sprint_projectId_index_key" ON "Sprint"("projectId", "index");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
