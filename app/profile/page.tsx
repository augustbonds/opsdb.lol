"use client"
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) return <Link href="/api/auth/login">Login</Link>;

  return <div>Hello {user.name}, <Link href="/api/auth/logout">Logout</Link></div>;
}


// // app/profile/page.js
// import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

// export default withPageAuthRequired(async function Profile() {
//   const { user } = await getSession();
//   return <div>Hello {user.name}</div>;
// }, { returnTo: '/profile' })
// // You need to provide a `returnTo` since Server Components aren't aware of the page's URL