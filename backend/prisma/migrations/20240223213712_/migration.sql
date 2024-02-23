/*
  Warnings:

  - You are about to drop the column `postId` on the `Users` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "base"."Users" DROP CONSTRAINT "Users_postId_fkey";

-- AlterTable
ALTER TABLE "base"."Posts" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "base"."Users" DROP COLUMN "postId";

-- AddForeignKey
ALTER TABLE "base"."Posts" ADD CONSTRAINT "Posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "base"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
