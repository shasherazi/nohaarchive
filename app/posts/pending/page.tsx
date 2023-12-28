import { getPendingPosts } from "@/app/components/actions";
import Link from "next/link";

export default async function PendingPosts() {
  let pendingPosts;
  try {
    pendingPosts = (await getPendingPosts()) as any;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="pending">
      <h1 className="text-3xl mb-8">Posts awaiting approval</h1>

      <ul className="list-none list-inside mb-8 flex flex-col gap-4">
        {pendingPosts.length ? (
          pendingPosts.map((post: any) => (
            <div
              key={post.id}
              className="border border-gray-300 rounded-lg dark:border-gray-700 py-4 px-6"
            >
              <li key={post.id}>
                <Link href={`/posts/${post.slug}/edit`}>
                  <h2 className="text-xl mb-2 underline">{post.title}</h2>
                </Link>
                <p className="line-clamp-3 whitespace-pre-line">{post.text}</p>
                {post.author && <p className="text-right">By {post.author}</p>}
              </li>
            </div>
          ))
        ) : (
          <p className="error">
            There are no posts awaiting approval at this time.
          </p>
        )}
      </ul>

      <Link href="/posts" className="link self-center">
        See all posts
      </Link>
    </div>
  );
}
