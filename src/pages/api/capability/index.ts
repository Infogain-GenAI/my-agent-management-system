import type { NextApiRequest, NextApiResponse } from 'next';
import logger from '@/lib/logger';

import getAgentById from './getAllCapabilities';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
   logger.info(`Capability API called method : ${method}`);
 
   switch (method) {
    case 'GET':
      if (req.query.id) {
        return getAgentById(req, res);
      } else if (req.query.name) {
        return getAgentsByName(req, res);
      } else if (req.query.domain) {
        return getAgentsByDomain(req, res);
      } else if (req.query.provider) {
        return getAgentsByProvider(req, res);
      } else if (req.query.status) {
        return getAgentsByStatus(req, res);
      } else if (req.query.provider && req.query.domain) {
        return getAgentsByProviderAndDomain(req, res);
      } else if (req.query.userId) {
        return getAgentsByUserId(req, res);
      } else {
        return getAgents(req, res);
      }
    case 'POST':
      return createAgent(req, res);
    case 'PUT':
        return updateAgent(req, res);
    case 'DELETE':
        return deleteAgent(req, res);
    default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

export default handler;