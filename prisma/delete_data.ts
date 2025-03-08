import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.metric.deleteMany({});
  await prisma.user_agent.deleteMany({});
  await prisma.domain_agent.deleteMany({});
  await prisma.agent.deleteMany({});
  await prisma.persona.deleteMany({});
  await prisma.domain.deleteMany({});
  await prisma.provider.deleteMany({});
  await prisma.user.deleteMany({});
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });