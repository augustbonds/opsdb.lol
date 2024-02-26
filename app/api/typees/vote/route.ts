import { ConsumeOrBlast, DiOrDe, FOrT, IOrE, InfoOrEnergy, NOrS, ObserverOrDecider, OiOrOe, PrismaClient, SleepOrPlay } from '@prisma/client';

const prisma = new PrismaClient();

interface VoteRequest {
    typeeId: string;
    observerOrDecider: string;
    diOrDe: string;
    oiOrOe: string;
    nOrS: string;
    fOrT: string;
    sleepOrPlay: string;
    consumeOrBlast: string;
    infoOrEnergy: string;
    iOrE: string;
}

export const POST = async function handler(req: Request, res: Response) {
    const {
        typeeId, observerOrDecider, diOrDe, oiOrOe, nOrS, fOrT,
        sleepOrPlay, consumeOrBlast, infoOrEnergy, iOrE
    } = await req.json() as VoteRequest;

    try {
        const vote = await prisma.vote.create({
            data: {
                typeeId,
                observerOrDecider: observerOrDecider as ObserverOrDecider,
                diOrDe: diOrDe as DiOrDe,
                oiOrOe: oiOrOe as OiOrOe,
                nOrS: nOrS as NOrS,
                fOrT: fOrT as FOrT,
                sleepOrPlay: sleepOrPlay as SleepOrPlay,
                consumeOrBlast: consumeOrBlast as ConsumeOrBlast,
                infoOrEnergy: infoOrEnergy as InfoOrEnergy,
                iOrE: iOrE as IOrE,
            },
        });

        return Response.json(vote);
    } catch (error) {
        return Response.json({ message: "There was a problem submitting your vote." }, { status: 400 });
    }
}