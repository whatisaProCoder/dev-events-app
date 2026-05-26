/*
  Warnings:

  - You are about to alter the column `title` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `description` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `overview` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - Changed the type of `mode` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('ONLINE', 'OFFLINE', 'HYBRID');

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "overview" SET DATA TYPE VARCHAR(500),
DROP COLUMN "mode",
ADD COLUMN     "mode" "Mode" NOT NULL;
