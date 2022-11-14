-- CreateTable
CREATE TABLE "states" (
    "guid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "country_guid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "states_pkey" PRIMARY KEY ("guid")
);

-- CreateIndex
CREATE UNIQUE INDEX "states_guid_key" ON "states"("guid");

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_country_guid_fkey" FOREIGN KEY ("country_guid") REFERENCES "countries"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;
