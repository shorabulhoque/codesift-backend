/*
  Warnings:

  - You are about to drop the column `website` on the `recruiter_profiles` table. All the data in the column will be lost.
  - Added the required column `businessRegistrationNo` to the `recruiter_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecruiterVerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('CREDENTIALS', 'GOOGLE');

-- AlterTable
ALTER TABLE "candidate_profiles" ADD COLUMN     "address" TEXT,
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "avatarPublicId" TEXT,
ADD COLUMN     "experienceYears" INTEGER,
ADD COLUMN     "headline" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "resumePublicId" TEXT,
ADD COLUMN     "resumeUrl" TEXT;

-- AlterTable
ALTER TABLE "recruiter_profiles" DROP COLUMN "website",
ADD COLUMN     "businessRegistrationNo" TEXT NOT NULL,
ADD COLUMN     "companyLogoPublicId" TEXT,
ADD COLUMN     "companySize" TEXT,
ADD COLUMN     "companyWebsite" TEXT,
ADD COLUMN     "designation" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "verificationStatus" "RecruiterVerificationStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "provider" "AuthProvider" NOT NULL DEFAULT 'CREDENTIALS',
ADD COLUMN     "providerId" TEXT,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';
