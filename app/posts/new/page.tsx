import { createPost } from "@/app/components/actions";
import Link from "next/link";

export default function CreateNewPost() {
  async function createNewPost(formData: FormData) {
    "use server";
    try {
      await createPost(formData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="new-post p-6">
      <h1 className="text-4xl mb-8">Create new post</h1>

      <form action={createNewPost} className="form-control gap-4">
        <input
          type="text"
          name="title"
          placeholder="Post title"
          className="input input-bordered"
          required
        />
        <textarea
          className="textarea textarea-bordered text-base h-40"
          name="content"
          placeholder="Post content"
          required
        ></textarea>

        <input
          type="text"
          name="author"
          placeholder="Post author"
          className="input input-bordered"
        />

        <select
          className="select select-bordered"
          defaultValue="noha"
          name="category"
        >
          <option value="noha">Noha</option>
          <option value="qaseeda">Qaseeda</option>
          <option value="bandd">Bandd</option>
          <option value="other">Other</option>
        </select>

        <button className="btn btn-primary w-full max-w-sm self-center">
          Create
        </button>

        <Link href="/posts" className="link self-center">
          See all posts
        </Link>
      </form>
    </div>
  );
}
