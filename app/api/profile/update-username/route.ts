import { getSession } from '@auth0/nextjs-auth0';
import prisma from '../../db'; // Adjust the import path based on your setup

export const POST = async function handle(
    req: Request
) {

    const session = await getSession();
    if (!session) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, username } = await req.json();

    try {
        const updatedUser = await prisma.user.update({
            where: {
                email: session.user.email, // Assuming email is unique and used for user identification
            },
            data: {
                username: username,
                name: name
            },
        });

        return Response.json(updatedUser);
    } catch (error) {
        return Response.json({ message: 'Error updating username' }, { status: 500 });
    }
}