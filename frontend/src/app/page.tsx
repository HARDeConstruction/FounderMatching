import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>THIS WILL BE THE LANDING PAGE</h1>
      <h1>However, we just look here instead</h1>
      <Link href="/dashboard">Here</Link>
    </>
  );
}