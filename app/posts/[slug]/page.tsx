import { getPost } from "@/app/components/actions";
import Link from "next/link";

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <div>
      {post && "title" in post ? (
        <div className="post">
          <h1 className="text-2xl mb-2">{post.title}</h1>
          <p className="mb-4 whitespace-pre-line">{post.text}</p>

          <Link href="/posts" className="link self-center">
            See all posts
          </Link>
        </div>
      ) : (
        <h1 className="text-2xl text-center mt-8">
          {post?.message || "Post not found"}
        </h1>
      )}
    </div>
  );
}
