import Link from "next/link";
import { getAllPosts } from "../components/actions";

export default async function Posts() {
  let posts;
  try {
    posts = (await getAllPosts()) as any;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="posts p-6">
      <h1 className="text-4xl mb-8">All posts</h1>

      <ul className="list-none list-inside mb-8">
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="border border-gray-300 dark:border-gray-700 py-4 px-6"
          >
            <li key={post.id}>
              <h2 className="text-2xl mb-2">{post.title}</h2>
              <p>{post.text}</p>
              <p className="text-right">By {post.author}</p>
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
