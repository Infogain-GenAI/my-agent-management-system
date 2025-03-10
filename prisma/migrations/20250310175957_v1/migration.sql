-- CreateEnum
CREATE TYPE "capability" AS ENUM ('CAPABILITY_1', 'CAPABILITY_2', 'CAPABILITY_3', 'CAPABILITY_4');

-- CreateEnum
CREATE TYPE "feature" AS ENUM ('FEATURE_1', 'FEATURE_2', 'FEATURE_3', 'FEATURE_4');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('ACTIVE', 'OFFLINE', 'MAINTENANCE', 'PENDING', 'ERROR', 'ONLINE');

-- CreateEnum
CREATE TYPE "domain_type" AS ENUM ('SOFTWARE_DEVELOPMENT', 'CLOUD_OPERATIONS', 'DEVOPS', 'SECURITY', 'DATA_ENGINEERING', 'HUMAN_RESOURCES', 'FINANCE', 'IT_SUPPORT');

-- CreateEnum
CREATE TYPE "provider_type" AS ENUM ('FRAMEWORKS', 'PLATFORMS');

-- CreateEnum
CREATE TYPE "integration_type" AS ENUM ('SDK', 'API', 'NATIVE');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('PLATFORM_ADMIN', 'PROJECT_ADMIN', 'SUPPORT', 'USER');

-- CreateEnum
CREATE TYPE "provider_agent_type" AS ENUM ('PLANNER', 'EXECUTOR', 'REVIEWER', 'ASSISTANT', 'CUSTOM_FLOWS', 'CODER', 'VALIDATOR', 'WORKER', 'MANAGER', 'SPECIALIST', 'CUSTOM', 'PRE_BUILT', 'ENTERPRISE_ASSISTANT', 'PROCESS_AUTOMATION', 'CUSTOM_AGENTS', 'PRE_BUILT_SOLUTIONS');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "domain_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "provider_type" NOT NULL,
    "description" TEXT,
    "status" "status" NOT NULL DEFAULT 'OFFLINE',
    "features" "feature"[],
    "agent_types" "provider_agent_type"[],
    "integration" "integration_type"[],
    "config" JSONB,
    "logo_link" TEXT,
    "doc_link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persona" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "status" NOT NULL DEFAULT 'OFFLINE',
    "capabilities" "capability"[],
    "features" "feature"[],
    "config" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "provider_id" TEXT NOT NULL,
    "persona_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_agent" (
    "user_id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,

    CONSTRAINT "user_agent_pkey" PRIMARY KEY ("user_id","agent_id")
);

-- CreateTable
CREATE TABLE "domain_agent" (
    "domain_id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,

    CONSTRAINT "domain_agent_pkey" PRIMARY KEY ("domain_id","agent_id")
);

-- CreateTable
CREATE TABLE "metric" (
    "id" TEXT NOT NULL,
    "agent_id" TEXT,
    "provider_id" TEXT,
    "domain_id" TEXT,
    "persona_id" TEXT,
    "user_id" TEXT,
    "metric_type" TEXT NOT NULL,
    "metric_value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "metric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_agent" (
    "project_id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_agent_pkey" PRIMARY KEY ("project_id","agent_id")
);

-- CreateTable
CREATE TABLE "_ProjectTouser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectTouser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE INDEX "domain_name_idx" ON "domain"("name");

-- CreateIndex
CREATE INDEX "domain_type_idx" ON "domain"("type");

-- CreateIndex
CREATE INDEX "provider_name_idx" ON "provider"("name");

-- CreateIndex
CREATE INDEX "provider_type_idx" ON "provider"("type");

-- CreateIndex
CREATE INDEX "persona_name_idx" ON "persona"("name");

-- CreateIndex
CREATE INDEX "agent_name_idx" ON "agent"("name");

-- CreateIndex
CREATE INDEX "agent_provider_id_idx" ON "agent"("provider_id");

-- CreateIndex
CREATE INDEX "agent_persona_id_idx" ON "agent"("persona_id");

-- CreateIndex
CREATE INDEX "agent_status_idx" ON "agent"("status");

-- CreateIndex
CREATE INDEX "agent_user_id_idx" ON "agent"("user_id");

-- CreateIndex
CREATE INDEX "metric_agent_id_idx" ON "metric"("agent_id");

-- CreateIndex
CREATE INDEX "metric_provider_id_idx" ON "metric"("provider_id");

-- CreateIndex
CREATE INDEX "metric_domain_id_idx" ON "metric"("domain_id");

-- CreateIndex
CREATE INDEX "metric_persona_id_idx" ON "metric"("persona_id");

-- CreateIndex
CREATE INDEX "metric_user_id_idx" ON "metric"("user_id");

-- CreateIndex
CREATE INDEX "project_agent_project_id_idx" ON "project_agent"("project_id");

-- CreateIndex
CREATE INDEX "project_agent_agent_id_idx" ON "project_agent"("agent_id");

-- CreateIndex
CREATE INDEX "_ProjectTouser_B_index" ON "_ProjectTouser"("B");

-- AddForeignKey
ALTER TABLE "agent" ADD CONSTRAINT "agent_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agent" ADD CONSTRAINT "agent_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_agent" ADD CONSTRAINT "user_agent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_agent" ADD CONSTRAINT "user_agent_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain_agent" ADD CONSTRAINT "domain_agent_domain_id_fkey" FOREIGN KEY ("domain_id") REFERENCES "domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain_agent" ADD CONSTRAINT "domain_agent_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metric" ADD CONSTRAINT "metric_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metric" ADD CONSTRAINT "metric_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metric" ADD CONSTRAINT "metric_domain_id_fkey" FOREIGN KEY ("domain_id") REFERENCES "domain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metric" ADD CONSTRAINT "metric_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "persona"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metric" ADD CONSTRAINT "metric_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_agent" ADD CONSTRAINT "project_agent_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_agent" ADD CONSTRAINT "project_agent_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectTouser" ADD CONSTRAINT "_ProjectTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectTouser" ADD CONSTRAINT "_ProjectTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
