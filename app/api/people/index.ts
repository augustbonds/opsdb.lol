// /api/people.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define a type for the request body
interface AddTypeeRequestBody {
  name: string;
}

// Define a type for the response data
interface AddTypeeResponseData {
  id?: string;
  name?: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AddTypeeResponseData>
): Promise<void> {
  const session = await getSession(req, res);

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (req.method === 'POST') {
    const { name } = req.body as AddTypeeRequestBody;
    console.log("Received new Typee!");

    try {
      const newTypee = await prisma.typee.create({
        data: {
          name,
        },
      });

      res.status(200).json(newTypee);
    } catch (error) {
      console.error('Error adding Typee:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
