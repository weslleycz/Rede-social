/*
  Warnings:

  - You are about to drop the column `link` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "base"."Posts" DROP COLUMN "link",
ADD COLUMN     "links" TEXT[];
