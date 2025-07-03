/*
  Warnings:

  - Made the column `city` on table `Doctor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "consultationFee" INTEGER NOT NULL DEFAULT 500,
ALTER COLUMN "city" SET NOT NULL;
