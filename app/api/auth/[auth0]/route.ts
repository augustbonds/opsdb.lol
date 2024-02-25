import { AfterCallback, handleAuth, handleCallback, Session } from '@auth0/nextjs-auth0';
import { NextRequest } from 'next/server';
import prisma from '../../db';


const afterCallback: AfterCallback = async (req: NextRequest,
    session: Session,
    state?: { [key: string]: any }) => {

    const { user } = session;
    if (user?.email){
        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (!existingUser) {
            await prisma.user.create({
                data: {
                    email: user.email,
                    name: user.name || undefined, // Assuming the 'name' can be null based on your schema
                },
            });
        }
    }
    //
    // Your code here
    return session;
}

export const GET = handleAuth({
    callback: async (req: any, res: any) => {
        try {
            return await handleCallback(req, res, {
                afterCallback
            });
        } catch (error) {
            console.error(error)
        }
    }
});