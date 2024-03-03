import Link from "next/link";
import { useEffect, useState } from "react";
import { Typee } from "../types/types";

// If debounce is used elsewhere, consider moving it to a utilities file.
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

export const TypeDirectory = () => {
  const [typees, setTypees] = useState<Typee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTypees = debounce((query: string) => {
      fetch(`/api/typees?query=${query}`)
        .then((response) => response.json())
        .then((data: Typee[]) => setTypees(data));
    }, 500); // Debounce delay in milliseconds

    fetchTypees(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <h1>Typee Directory</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Added By</th>
          </tr>
        </thead>
        <tbody>
          {typees.map((typee) => (
            <tr key={typee.id}>
              <td>
                <Link href={`/typees/${typee.id}`}>{typee.name}</Link>
              </td>
              <td>
                {typee.createdBy.username}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
