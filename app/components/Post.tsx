import { IPost } from "@/types";
import Link from "next/link";

export default function Post(post: IPost) {
  return (
    <div className="border border-gray-300 rounded-lg dark:border-gray-700 py-4 px-6">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-xl mb-2 underline">{post.title}</h2>
      </Link>
      <p className="line-clamp-3 whitespace-pre-line">{post.text}</p>
      {post.author && <p className="text-right">By {post.author}</p>}
    </div>
  );
}
