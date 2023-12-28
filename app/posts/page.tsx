import Link from "next/link";
import { getApprovedPosts } from "../components/actions";

export default async function Posts() {
  let posts;
  try {
    posts = (await getApprovedPosts()) as any;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="posts">
      <h1 className="text-3xl mb-8">All posts</h1>

      <ul className="list-none list-inside mb-8 flex flex-col gap-4">
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="border border-gray-300 rounded-lg dark:border-gray-700 py-4 px-6"
          >
            <li key={post.id}>
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-xl mb-2 underline">{post.title}</h2>
              </Link>
              <p className="line-clamp-3 whitespace-pre-line">{post.text}</p>
              {post.author && <p className="text-right">By {post.author}</p>}
            </li>
          </div>
        ))}
      </ul>

      <Link href="/posts/new" className="link">
        Create new post
      </Link>
    </div>
  );
}
