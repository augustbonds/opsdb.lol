"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Typee } from "./types/types";
import { TypeDirectory } from "./components/TypeDirectory";

export default function Home() {
  const [typees, setTypees] = useState<Typee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Debounced fetch function
    const fetchTypees = debounce((query: string) => {
      fetch(`/api/typees?query=${query}`)
        .then((response) => response.json())
        .then((data: Typee[]) => setTypees(data));
    }, 500); // Debounce delay in milliseconds

    fetchTypees(searchQuery);
  }, [searchQuery]);

  return (
    <main>
      <TypeDirectory></TypeDirectory>
    </main>
  );
}

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
