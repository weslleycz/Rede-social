/*
  Warnings:

  - Added the required column `createDate` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "base"."Posts" ADD COLUMN     "createDate" TEXT NOT NULL;
