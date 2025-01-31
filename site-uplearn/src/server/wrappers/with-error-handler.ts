import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const withErrorHandler = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error: unknown) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

export default withErrorHandler;
