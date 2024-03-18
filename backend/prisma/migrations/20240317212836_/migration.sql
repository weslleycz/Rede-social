/*
  Warnings:

  - Added the required column `matadados` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "base"."Notifications" ADD COLUMN     "matadados" JSONB NOT NULL;
