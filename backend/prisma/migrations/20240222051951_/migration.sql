-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "chatId" TEXT;

-- CreateTable
CREATE TABLE "Mensagems" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "chatId" TEXT,

    CONSTRAINT "Mensagems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chats" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chats"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensagems" ADD CONSTRAINT "Mensagems_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chats"("id") ON DELETE SET NULL ON UPDATE CASCADE;
