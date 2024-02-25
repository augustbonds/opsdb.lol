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
