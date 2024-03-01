-- CreateEnum
CREATE TYPE "base"."UserStatus" AS ENUM ('Online', 'Offline');

-- AlterTable
ALTER TABLE "base"."Users" ADD COLUMN     "status" "base"."UserStatus" NOT NULL DEFAULT 'Online';
