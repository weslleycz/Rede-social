-- CreateTable
CREATE TABLE "base"."Comments" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "postId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "base"."Comments" ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "base"."Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "base"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
