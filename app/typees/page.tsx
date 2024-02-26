"use client"
import { useEffect, useState } from "react";
import { Typee } from "../types/types";
import { TypeDirectory as TypeeDirectory } from "../components/TypeDirectory";

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
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">New</button>
      </a>
      <TypeeDirectory></TypeeDirectory>
    </div>
  );
};

export default TypeesPage;
