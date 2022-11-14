-- CreateTable
CREATE TABLE "countries" (
    "guid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "continent_guid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("guid")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_guid_key" ON "countries"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "countries_continent_guid_fkey" FOREIGN KEY ("continent_guid") REFERENCES "continents"("guid") ON DELETE RESTRICT ON UPDATE CASCADE;
