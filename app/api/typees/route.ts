import { getSession } from '@auth0/nextjs-auth0';
import prisma from '../db';
import { Typee } from '@prisma/client';

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

interface TypeeListDto {
  id: string,
  name: string,
  createdBy?: CreatedByUser
}

interface CreatedByUser {
  name: string;
}

export const POST = async function handle(
  req: Request
) {
  const session = await getSession();

  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  const { name } = await req.json() as AddTypeeRequestBody;
  console.log("Received new Typee!");

  try {
    const newTypee = await prisma.typee.create({
      data: {
        name: name,
        createdByUserId: user?.id ?? ""
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
      name: {
        contains: query as string,
        mode: 'insensitive' as const
      }
    } : {}

    const typees = await prisma.typee.findMany({
      where: searchCondition,
      include: {
        createdBy: true,
        votes: false,
      }
    });

    const reshapedTypees = typees.map(typee => ({
      id: typee.id,
      name: typee.name,
      createdBy: {
        id: typee.createdBy.id,
        name: typee.createdBy.name
      }
    }))

    return Response.json(reshapedTypees);
  } catch (error) {
    console.error('failed to get typees from prisma')
    return Response.json({ error: "Failed to fetch typees" }, { status: 500 });
  }
}
