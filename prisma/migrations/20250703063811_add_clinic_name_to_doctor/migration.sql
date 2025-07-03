/*
  Warnings:

  - Added the required column `clinicName` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "city" TEXT,
ADD COLUMN     "clinicName" TEXT NOT NULL,
ADD COLUMN     "photoUrl" TEXT;
