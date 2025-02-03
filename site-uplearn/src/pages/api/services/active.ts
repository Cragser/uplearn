import { NextApiRequest, NextApiResponse } from "next";
import activeServices from "@/src/server/api/service/active.services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const services = activeServices();
    return res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching active services:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
