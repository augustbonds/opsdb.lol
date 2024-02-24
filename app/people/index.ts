// // pages/api/people/index.ts
// import type { NextApiRequest, NextApiResponse } from 'next'
// import { getSession } from 'next-auth/react';
// import { prisma } from '../api/db'; // Assume you've set up Prisma


// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const session = await getSession({ req });

//   if (!session) {
//     return res.status(401).json({ message: 'You must be logged in to do this.' });
//   }

//   if (req.method === 'POST') {
//     // Add validation for req.body
//     const { name } = req.body;
//     const person = await prisma.Typee.create({
//       data: {
//         name,
//         createdByUserId: session.user.id, // Assuming you have user IDs linked in session
//       },
//     });
//     return res.status(200).json(person);
//   }

//   // Handle other methods or return 405 for not allowed
//   res.setHeader('Allow', ['POST']);
//   res.status(405).end(`Method ${req.method} Not Allowed`);
// }
