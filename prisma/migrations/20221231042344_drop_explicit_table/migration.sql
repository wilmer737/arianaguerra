/*
  Warnings:

  - You are about to drop the `ChildToParent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ChildToParent";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_ChildToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ChildToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Child" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ChildToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChildToUser_AB_unique" ON "_ChildToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChildToUser_B_index" ON "_ChildToUser"("B");
