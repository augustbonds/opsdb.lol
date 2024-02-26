import Link from "next/link";

export default function TypeePage({ params }: { params: { typeeId: string }}) {
  return (
    <div>
      <h1>Typee Details</h1>
      {/* Fetch and display the details of the typee using typeeId */}
      <p>Typee ID: {params.typeeId}</p>
      <Link href={`/typees/${params.typeeId}/vote`}>Vote here!</Link>
    </div>
  );
}
