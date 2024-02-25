"use client"
import { useEffect, useState } from "react";
import { Typee } from "../types/types";

const TypeesPage : React.FC = () => {
  const [typees, setTypees] = useState<Typee[]>([]);

  useEffect(() => {
    fetch("/api/typees")
      .then((response) => response.json())
      .then((data: Typee[]) => setTypees(data));
  }, []);

  return (
    <div>
      <p>Press the button to create a new person to type</p>
      <a href="/typees/new">
        <button>New</button>
      </a>
      <div>
        <h1>Typees</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {typees.map((typee) => (
              <tr key={typee.id}>
                <td>{typee.id}</td>
                <td>{typee.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TypeesPage;
