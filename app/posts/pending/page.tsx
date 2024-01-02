import PendingPost from "@/app/components/PendingPost";
import { getPendingPosts } from "@/app/components/actions";
import { IPost } from "@/types";
import Link from "next/link";

export default async function PendingPosts() {
  let pendingPosts: IPost[] = [];
  try {
    pendingPosts = (await getPendingPosts()) as IPost[];
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="pending">
      <h1 className="text-3xl">Posts awaiting approval</h1>
      <p className="mb-8">
        Edit or approve the post. You can edit the post to correct any spelling
        or grammar issues.
      </p>

      <ul className="list-none list-inside mb-8 flex flex-col gap-4">
        {pendingPosts.length ? (
          pendingPosts.map((post: IPost) => (
            <li key={post.id}>
              <PendingPost {...post} />
              {/* <Link href={`/posts/${post.slug}/edit`}> */}
              {/*   <h2 className="text-xl mb-2 underline">{post.title}</h2> */}
              {/* </Link> */}
              {/* <p className="line-clamp-3 whitespace-pre-line">{post.text}</p> */}
              {/* {post.author && <p className="text-right">By {post.author}</p>} */}
            </li>
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
