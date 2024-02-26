import prisma from "../../db";

export const GET = async function handle(req: Request,
    { params }: { params: { typeeId: string } }) {

    const typeeId = params.typeeId;

    try {
        const typee = await prisma.typee.findUnique({
            where: { id: typeeId },
            include: {
                createdBy: true,
                votes: true,
            }
        });

        if (typee == null){
            return Response.json({ error: `Typee with id ${typeeId} not found` }, { status: 404 });        }

        const reshapedTypee = {
            id: typee.id,
            name: typee.name,
            createdBy: {
                id: typee.createdBy.id,
                name: typee.createdBy.name
            },
            votes: typee?.votes
        };


        return Response.json(reshapedTypee);
    } catch (error) {
        console.error(`failed to get typee ${typeeId} from prisma`);
        return Response.json({ error: `Failed to fetch typee with id ${typeeId}` }, { status: 500 });
    }
}