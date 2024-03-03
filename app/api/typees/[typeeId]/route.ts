import prisma from "../../db";

export const GET = async function handle(req: Request,
    { params }: { params: { typeeId: string } }) {

    const typeeId = params.typeeId;

    try {
        const typee = await prisma.typee.findUnique({
            where: { id: typeeId },
            include: {
                createdBy: true,
                votes: {
                    include: {
                        author: true
                    }
                }
            }
        });

        if (typee == null){
            return Response.json({ error: `Typee with id ${typeeId} not found` }, { status: 404 });        }

        const reshapedTypee = {
            id: typee.id,
            name: typee.name,
            createdBy: {
                id: typee.createdBy.id,
                username: typee.createdBy.username
            },
            votes: typee.votes?.map(vote => ({
                id: vote.id,
                author: { id: vote.author!.id, username: vote.author!.username },
                typeeId: vote.typeeId,
                observerOrDecider: vote.observerOrDecider,
                diOrDe: vote.diOrDe, 
                oiOrOe: vote.oiOrOe, 
                nOrS: vote.nOrS,
                fOrT: vote.fOrT,
                sleepOrPlay: vote.fOrT, 
                consumeOrBlast: vote.consumeOrBlast,
                infoOrEnergy: vote.infoOrEnergy,
                iOrE: vote.iOrE,
                fOrMS: vote.fOrMS,
                fOrMDe: vote.fOrMDe
            }))
        };

        return Response.json(reshapedTypee);
    } catch (error) {
        console.error(`failed to get typee ${typeeId} from prisma`);
        return Response.json({ error: `Failed to fetch typee with id ${typeeId}` }, { status: 500 });
    }
}