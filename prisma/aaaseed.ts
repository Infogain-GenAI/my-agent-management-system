import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const user1 = await prisma.user.create({
    data: { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', role: 'PLATFORM_ADMIN' },
  });

  const user2 = await prisma.user.create({
    data: { first_name: 'Jane', last_name: 'Doe', email: 'jane.doe@example.com', role: 'PROJECT_ADMIN' },
  });

  // Create sample providers
  const provider1 = await prisma.provider.create({
    data: { name: 'AWS', type: 'PLATFORMS', status: 'ONLINE' },
  });

  const provider2 = await prisma.provider.create({
    data: { name: 'Azure', type: 'PLATFORMS', status: 'ONLINE' },
  });

  const provider3 = await prisma.provider.create({
    data: { name: 'Google Cloud', type: 'PLATFORMS', status: 'ONLINE' },
  });

  const provider4 = await prisma.provider.create({
    data: { name: 'Heroku', type: 'PLATFORMS', status: 'OFFLINE' },
  });

  // Create sample domains
  const domain1 = await prisma.domain.create({
    data: { name: 'Software Development', type: 'SOFTWARE_DEVELOPMENT' },
  });

  const domain2 = await prisma.domain.create({
    data: { name: 'Cloud Operations', type: 'CLOUD_OPERATIONS' },
  });

  const domain3 = await prisma.domain.create({
    data: { name: 'DevOps', type: 'DEVOPS' },
  });

  const domain4 = await prisma.domain.create({
    data: { name: 'Security', type: 'SECURITY' },
  });

  const domain5 = await prisma.domain.create({
    data: { name: 'Data Engineering', type: 'DATA_ENGINEERING' },
  });

  // Create sample personas
  const persona1 = await prisma.persona.create({
    data: { name: 'Developer', description: 'Software Developer' },
  });

  const persona2 = await prisma.persona.create({
    data: { name: 'DevOps Engineer', description: 'DevOps Engineer' },
  });

  const persona3 = await prisma.persona.create({
    data: { name: 'Security Specialist', description: 'Security Specialist' },
  });

  const persona4 = await prisma.persona.create({
    data: { name: 'Data Engineer', description: 'Data Engineer' },
  });

  const persona5 = await prisma.persona.create({
    data: { name: 'HR Manager', description: 'Human Resources Manager' },
  });

  // Create sample agents
  const agent1 = await prisma.agent.create({
    data: { name: 'Agent 1', status: 'ACTIVE', provider_id: provider1.id, persona_id: persona1.id, user_id: user1.id },
  });

  const agent2 = await prisma.agent.create({
    data: { name: 'Agent 2', status: 'OFFLINE', provider_id: provider2.id, persona_id: persona2.id, user_id: user1.id },
  });

  const agent3 = await prisma.agent.create({
    data: { name: 'Agent 3', status: 'MAINTENANCE', provider_id: provider3.id, persona_id: persona3.id, user_id: user2.id },
  });

  const agent4 = await prisma.agent.create({
    data: { name: 'Agent 4', status: 'PENDING', provider_id: provider4.id, persona_id: persona4.id, user_id: user2.id },
  });

  const agent5 = await prisma.agent.create({
    data: { name: 'Agent 5', status: 'ERROR', provider_id: provider1.id, persona_id: persona5.id, user_id: user1.id },
  });

  // Create sample user_agent relationships
  await prisma.user_agent.createMany({
    data: [
      { user_id: user1.id, agent_id: agent1.id },
      { user_id: user1.id, agent_id: agent2.id },
      { user_id: user2.id, agent_id: agent3.id },
      { user_id: user2.id, agent_id: agent4.id },
      { user_id: user1.id, agent_id: agent5.id },
    ],
  });

  // Create sample domain_agent relationships
  await prisma.domain_agent.createMany({
    data: [
      { domain_id: domain1.id, agent_id: agent1.id },
      { domain_id: domain2.id, agent_id: agent2.id },
      { domain_id: domain3.id, agent_id: agent3.id },
      { domain_id: domain4.id, agent_id: agent4.id },
      { domain_id: domain5.id, agent_id: agent5.id },
    ],
  });

  // Create sample metrics
  await prisma.metric.createMany({
    data: [
      { agent_id: agent1.id, metric_type: 'CPU', metric_value: 75.5, unit: '%' },
      { agent_id: agent2.id, metric_type: 'Memory', metric_value: 60.2, unit: '%' },
      { agent_id: agent3.id, metric_type: 'Disk', metric_value: 80.1, unit: '%' },
      { agent_id: agent4.id, metric_type: 'Network', metric_value: 50.3, unit: 'Mbps' },
      { agent_id: agent5.id, metric_type: 'CPU', metric_value: 65.4, unit: '%' },
      { agent_id: agent1.id, metric_type: 'Memory', metric_value: 70.8, unit: '%' },
      { agent_id: agent2.id, metric_type: 'Disk', metric_value: 90.0, unit: '%' },
      { agent_id: agent3.id, metric_type: 'Network', metric_value: 40.5, unit: 'Mbps' },
      { agent_id: agent4.id, metric_type: 'CPU', metric_value: 55.6, unit: '%' },
      { agent_id: agent5.id, metric_type: 'Memory', metric_value: 75.9, unit: '%' },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });