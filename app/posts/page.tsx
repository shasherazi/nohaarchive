import Link from "next/link";
import { getApprovedPosts } from "../components/actions";
import { IPost } from "@/types";
import Post from "../components/Post";

export default async function Posts() {
  let posts: IPost[] = [];
  try {
    posts = (await getApprovedPosts()) as IPost[];
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="posts">
      <h1 className="text-3xl mb-8">All posts</h1>

      <ul className="list-none list-inside mb-8 flex flex-col gap-4">
        {posts.length ? (
          posts.map((post: any) => (
            <li key={post.id}>
              <Post {...post} />
              {/* <Link href={`/posts/${post.slug}`}> */}
              {/*   <h2 className="text-xl mb-2 underline">{post.title}</h2> */}
              {/* </Link> */}
              {/* <p className="line-clamp-3 whitespace-pre-line">{post.text}</p> */}
              {/* {post.author && <p className="text-right">By {post.author}</p>} */}
            </li>
          ))
        ) : (
          <p className="error">No posts yet</p>
        )}
      </ul>

      <Link href="/posts/new" className="link">
        Create new post
      </Link>
    </div>
  );
}
