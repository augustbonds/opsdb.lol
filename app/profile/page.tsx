"use client";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user, error, isLoading } = useUser();
  const [currentName, setCurrentName] = useState('');
  const [newName, setNewName] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    // Fetch the name from the database on component mount
    const fetchName = async () => {
      const response = await fetch('/api/profile', { // Ensure you have an endpoint to get the name
        method: 'GET',
      });
      if (response.ok) {
        const userData = await response.json();
        setCurrentName(userData.name);
        setNewName(userData.name);
        setCurrentUserName(userData.username)
        setNewUserName(userData.username);
      }
    };

    if (user) {
      fetchName();
    }
  }, [user]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Call the API route to update the username
    const response = await fetch('/api/profile/update-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName, username: newUserName }),
    });

    if (response.ok) {
      const userData = await response.json();
      setCurrentName(userData.name);
      setCurrentUserName(userData.username);
      console.log('Name/username updated successfully');
    } else {
      console.error('Error updating username');
    }
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) return <Link href="/api/auth/login">Login</Link>;

  return (
    <div>
      <p>Hello {currentName} ({currentUserName})</p>
      <br/>
      <h2>Change display name (visible on profile):</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Display Name:</label>
      <input
        id="name"
        type="text"
        value={newName as string}
        onChange={handleNameChange}
        className="border px-2 py-1"
      />
      <br/>

      <label htmlFor="username">Username:</label>
      <input
        id="username"
        type="text"
        value={newUserName as string}
        onChange={handleUsernameChange}
        className="border px-2 py-1"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Update</button>
    </form>
      <Link href="/api/auth/logout">
        <button className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700">
          Logout
        </button>
      </Link>
    </div>
  );
}

// // app/profile/page.js
// import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

// export default withPageAuthRequired(async function Profile() {
//   const { user } = await getSession();
//   return <div>Hello {user.name}</div>;
// }, { returnTo: '/profile' })
// // You need to provide a `returnTo` since Server Components aren't aware of the page's URL
