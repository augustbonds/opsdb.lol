import { getSession } from '@auth0/nextjs-auth0';
import { PrismaClient, Typee } from '@prisma/client';
import { NextApiRequest } from 'next';

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

export const POST = async function handle(
  req: Request
) {
  const session = await getSession();

  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await req.json() as AddTypeeRequestBody;
  console.log("Received new Typee!");

  try {
    const newTypee = await prisma.typee.create({
      data: {
        name: name
      },
    });

    return Response.json(newTypee);
  } catch (error) {
    console.error('Error adding Typee:', error);
    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export const GET = async function handle(req: Request) {

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  try {
    const searchCondition = query ? {
      name : {
        contains: query as string,
        mode: 'insensitive' as const
      }
    } : {};

    const typees: Typee[] = await prisma.typee.findMany({
      where: searchCondition,
      include: {
        votes: false,
      },
    });
    return Response.json(typees);
  } catch (error) {
    return Response.json({ error: "Failed to fetch typees" }, { status: 500 });
  }

}
