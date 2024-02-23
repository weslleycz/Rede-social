-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "base";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "chatCofre";

-- CreateTable
CREATE TABLE "base"."Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "chatId" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."Posts" (
    "id" TEXT NOT NULL,
    "content" TEXT,
    "urlImg" TEXT,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatCofre"."Mensagems" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "chatId" TEXT,

    CONSTRAINT "Mensagems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatCofre"."Chats" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."_UserFriends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "base"."Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFriends_AB_unique" ON "base"."_UserFriends"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFriends_B_index" ON "base"."_UserFriends"("B");

-- AddForeignKey
ALTER TABLE "base"."Users" ADD CONSTRAINT "Users_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chatCofre"."Chats"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatCofre"."Mensagems" ADD CONSTRAINT "Mensagems_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chatCofre"."Chats"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."_UserFriends" ADD CONSTRAINT "_UserFriends_A_fkey" FOREIGN KEY ("A") REFERENCES "base"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."_UserFriends" ADD CONSTRAINT "_UserFriends_B_fkey" FOREIGN KEY ("B") REFERENCES "base"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
