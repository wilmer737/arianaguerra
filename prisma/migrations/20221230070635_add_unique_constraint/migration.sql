/*
  Warnings:

  - A unique constraint covering the columns `[childId]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[parentId]` on the table `Child` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Activity_childId_key" ON "Activity"("childId");

-- CreateIndex
CREATE UNIQUE INDEX "Child_parentId_key" ON "Child"("parentId");
