-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailOtp" INTEGER,
ADD COLUMN     "emailOtpExpiresIn" TIMESTAMP(3),
ADD COLUMN     "isEmailVerifed" BOOLEAN NOT NULL DEFAULT false;
