-- AlterTable
ALTER TABLE "base"."Users" ADD COLUMN     "postId" TEXT;

-- AddForeignKey
ALTER TABLE "base"."Users" ADD CONSTRAINT "Users_postId_fkey" FOREIGN KEY ("postId") REFERENCES "base"."Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
