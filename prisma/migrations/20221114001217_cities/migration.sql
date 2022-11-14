/*
  Warnings:

  - Added the required column `city_guid` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "city_guid" UUID NOT NULL;

-- CreateTable
CREATE TABLE "cities" (
    "guid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "state_guid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("guid")
);

-- CreateIndex
CREATE UNIQUE INDEX "cities_guid_key" ON "cities"("guid");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_city_guid_fkey" FOREIGN KEY ("city_guid") REFERENCES "cities"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_guid_fkey" FOREIGN KEY ("state_guid") REFERENCES "states"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;
