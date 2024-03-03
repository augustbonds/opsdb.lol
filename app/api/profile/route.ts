import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../db"
export const GET = async function handle() {

    const session = await getSession();
    if (!session) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        return Response.json(user);
    } catch (error) {
        return Response.json({ message: 'Error updating username' }, { status: 500 });
    }
  }