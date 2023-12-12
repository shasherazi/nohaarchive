import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>hi</h1>
      <Link href="/posts/new">
        Create new post
      </Link>
    </div>
  );
}
