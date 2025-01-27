import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  status: string;
  timestamp: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'GET') {
    res.status(405).json({ status: 'error', timestamp: new Date().toISOString() });
    return;
  }

  try {
    // Here you can add actual health checks like database connectivity
    // For now, we'll return a simple OK status
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString()
    });
  }
}