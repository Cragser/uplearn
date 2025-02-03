import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { isEmpty } from "lodash";
interface ValidationSchema {
  [field: string]: string;
}

interface ValidationOptions {
  methods: string[];
  requiredFields?: ValidationSchema;
}

const withValidation = (
  options: ValidationOptions,
  handler: NextApiHandler,
): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { methods, requiredFields } = options;

    if (!methods.includes(req.method || "")) {
      return res.status(405).json({ error: "Method not allowed" });
    }

    if (requiredFields && req.method !== "GET") {
      const missingFields: string[] = [];

      for (const field in requiredFields) {
        if (isEmpty(req.body)) {
          missingFields.push(requiredFields[field]);
        }
      }

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: `Missing required fields: ${missingFields.join(", ")} `,
        });
      }
    }

    return handler(req, res);
  };
};

export default withValidation;
