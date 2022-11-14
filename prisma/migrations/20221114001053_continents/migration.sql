-- CreateTable
CREATE TABLE "continents" (
    "guid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "continents_pkey" PRIMARY KEY ("guid")
);

-- CreateIndex
CREATE UNIQUE INDEX "continents_guid_key" ON "continents"("guid");

-- CreateIndex
CREATE UNIQUE INDEX "continents_name_key" ON "continents"("name");
