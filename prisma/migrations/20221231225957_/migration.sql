/*
  Warnings:

  - You are about to drop the column `birthday` on the `Child` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Child" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "imgUrl" TEXT,
    "birthDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Child" ("createdAt", "firstName", "id", "imgUrl", "lastName", "updatedAt") SELECT "createdAt", "firstName", "id", "imgUrl", "lastName", "updatedAt" FROM "Child";
DROP TABLE "Child";
ALTER TABLE "new_Child" RENAME TO "Child";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
