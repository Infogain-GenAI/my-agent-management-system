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
    
  // Create sample users
  const user1 = await prisma.user.create({
    data: { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', role: 'PLATFORM_ADMIN' },
  });

  const user2 = await prisma.user.create({
    data: { first_name: 'Jane', last_name: 'Doe', email: 'jane.doe@example.com', role: 'PROJECT_ADMIN' },
  });

  // Create sample providers
  const provider1 = await prisma.provider.create({
    data: { name: 'AWS', type: 'PLATFORMS', description: 'Amazon Web Services', status: 'ONLINE', features: ['FEATURE_1', 'FEATURE_2'], agent_types: ['PLANNER', 'EXECUTOR'], integration: ['API'], config: { key: 'value' }, logo_link: 'https://aws.amazon.com/logo.png', doc_link: 'https://aws.amazon.com/documentation' },
  });

  const provider2 = await prisma.provider.create({
    data: { name: 'Azure', type: 'PLATFORMS', description: 'Microsoft Azure', status: 'ONLINE', features: ['FEATURE_3', 'FEATURE_4'], agent_types: ['REVIEWER', 'ASSISTANT'], integration: ['SDK'], config: { key: 'value' }, logo_link: 'https://azure.microsoft.com/logo.png', doc_link: 'https://azure.microsoft.com/documentation' },
  });

  const provider3 = await prisma.provider.create({
    data: { name: 'Google Cloud', type: 'PLATFORMS', description: 'Google Cloud Platform', status: 'ONLINE', features: ['FEATURE_1', 'FEATURE_3'], agent_types: ['CODER', 'VALIDATOR'], integration: ['NATIVE'], config: { key: 'value' }, logo_link: 'https://cloud.google.com/logo.png', doc_link: 'https://cloud.google.com/documentation' },
  });

  const provider4 = await prisma.provider.create({
    data: { name: 'Heroku', type: 'PLATFORMS', description: 'Heroku Cloud Platform', status: 'OFFLINE', features: ['FEATURE_2', 'FEATURE_4'], agent_types: ['WORKER', 'MANAGER'], integration: ['API'], config: { key: 'value' }, logo_link: 'https://heroku.com/logo.png', doc_link: 'https://heroku.com/documentation' },
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
    data: { name: 'Agent 1', description: 'Agent 1 Description', status: 'ACTIVE', capabilities: ['CAPABILITY_1', 'CAPABILITY_2'], features: ['FEATURE_1', 'FEATURE_2'], config: { key: 'value' }, provider_id: provider1.id, persona_id: persona1.id, user_id: user1.id },
  });

  const agent2 = await prisma.agent.create({
    data: { name: 'Agent 2', description: 'Agent 2 Description', status: 'OFFLINE', capabilities: ['CAPABILITY_3', 'CAPABILITY_4'], features: ['FEATURE_3', 'FEATURE_4'], config: { key: 'value' }, provider_id: provider2.id, persona_id: persona2.id, user_id: user1.id },
  });

  const agent3 = await prisma.agent.create({
    data: { name: 'Agent 3', description: 'Agent 3 Description', status: 'MAINTENANCE', capabilities: ['CAPABILITY_1', 'CAPABILITY_3'], features: ['FEATURE_1', 'FEATURE_3'], config: { key: 'value' }, provider_id: provider3.id, persona_id: persona3.id, user_id: user2.id },
  });

  const agent4 = await prisma.agent.create({
    data: { name: 'Agent 4', description: 'Agent 4 Description', status: 'PENDING', capabilities: ['CAPABILITY_2', 'CAPABILITY_4'], features: ['FEATURE_2', 'FEATURE_4'], config: { key: 'value' }, provider_id: provider4.id, persona_id: persona4.id, user_id: user2.id },
  });

  const agent5 = await prisma.agent.create({
    data: { name: 'Agent 5', description: 'Agent 5 Description', status: 'ERROR', capabilities: ['CAPABILITY_1', 'CAPABILITY_4'], features: ['FEATURE_1', 'FEATURE_4'], config: { key: 'value' }, provider_id: provider1.id, persona_id: persona5.id, user_id: user1.id },
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