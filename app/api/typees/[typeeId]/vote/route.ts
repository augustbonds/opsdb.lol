import { getSession } from '@auth0/nextjs-auth0';
import { ConsumeOrBlast, DiOrDe, FOrT, IOrE, InfoOrEnergy, NOrS, ObserverOrDecider, OiOrOe, PrismaClient, SleepOrPlay, FOrMS, FOrMDe, User } from '@prisma/client';

const prisma = new PrismaClient();

interface VoteRequest {
    observerOrDecider: string;
    diOrDe: string;
    oiOrOe: string;
    nOrS: string;
    fOrT: string;
    sleepOrPlay: string;
    consumeOrBlast: string;
    infoOrEnergy: string;
    iOrE: string;
    fOrMS: string;
    fOrMDe: string;
}

export const POST = async function handler(req: Request, { params }: { params: { typeeId: string } }) {

    const session = await getSession();

    if (!session) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const typeeId = params.typeeId;

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })
    const {
        observerOrDecider, diOrDe, oiOrOe, nOrS, fOrT,
        sleepOrPlay, consumeOrBlast, infoOrEnergy, iOrE,
        fOrMS, fOrMDe
    } = await req.json() as VoteRequest;

    try {
        const vote = await prisma.vote.create({
            data: {
                typeeId: typeeId as string,
                authorId: (user as User).id,
                observerOrDecider: observerOrDecider as ObserverOrDecider,
                diOrDe: diOrDe as DiOrDe,
                oiOrOe: oiOrOe as OiOrOe,
                nOrS: nOrS as NOrS,
                fOrT: fOrT as FOrT,
                sleepOrPlay: sleepOrPlay as SleepOrPlay,
                consumeOrBlast: consumeOrBlast as ConsumeOrBlast,
                infoOrEnergy: infoOrEnergy as InfoOrEnergy,
                iOrE: iOrE as IOrE,
                fOrMS: fOrMS as FOrMS,
                fOrMDe: fOrMDe as FOrMDe
            },
        });

        return Response.json(vote);
    } catch (error) {
        return Response.json({ message: "There was a problem submitting your vote." }, { status: 400 });
    }
}