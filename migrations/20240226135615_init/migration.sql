-- CreateEnum
CREATE TYPE "ObserverOrDecider" AS ENUM ('Observer', 'Decider');

-- CreateEnum
CREATE TYPE "DiOrDe" AS ENUM ('Di', 'De');

-- CreateEnum
CREATE TYPE "OiOrOe" AS ENUM ('Oi', 'Oe');

-- CreateEnum
CREATE TYPE "NOrS" AS ENUM ('N', 'S');

-- CreateEnum
CREATE TYPE "FOrT" AS ENUM ('F', 'T');

-- CreateEnum
CREATE TYPE "SleepOrPlay" AS ENUM ('Sleep', 'Play');

-- CreateEnum
CREATE TYPE "ConsumeOrBlast" AS ENUM ('Consume', 'Blast');

-- CreateEnum
CREATE TYPE "InfoOrEnergy" AS ENUM ('Info', 'Energy');

-- CreateEnum
CREATE TYPE "IOrE" AS ENUM ('I', 'E');

-- CreateTable
CREATE TABLE "Typee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Typee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "authorId" TEXT,
    "typeeId" TEXT,
    "observerOrDecider" "ObserverOrDecider" NOT NULL,
    "diOrDe" "DiOrDe" NOT NULL,
    "oiOrOe" "OiOrOe" NOT NULL,
    "nOrS" "NOrS" NOT NULL,
    "fOrT" "FOrT" NOT NULL,
    "sleepOrPlay" "SleepOrPlay" NOT NULL,
    "consumeOrBlast" "ConsumeOrBlast" NOT NULL,
    "infoOrEnergy" "InfoOrEnergy" NOT NULL,
    "iOrE" "IOrE" NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Typee" ADD CONSTRAINT "Typee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_typeeId_fkey" FOREIGN KEY ("typeeId") REFERENCES "Typee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
