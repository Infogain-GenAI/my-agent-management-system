import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma, logger } from './common';

/**
 * @openapi
 * /api/agent/getAllAgents:
 *   get:
 *     summary: Get all agents
 *     description: Retrieve a list of all agents.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                   capabilities:
 *                     type: array
 *                     items:
 *                       type: string
 *                   features:
 *                     type: array
 *                     items:
 *                       type: string
 *                   config:
 *                     type: object
 *                   provider_id:
 *                     type: string
 *                   persona_id:
 *                     type: string
 *                   user_id:
 *                     type: string
 *                   domain_id:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 */

// Get all agents
const getAllAgents = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const agents = await prisma.agent.findMany();
    res.status(200).json(agents);
    logger.info(`Retrieved all agents: ${JSON.stringify(agents)}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error retrieving agents: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage });
  }
};

export default getAllAgents;
