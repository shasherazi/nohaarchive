import { getPost, updatePost } from "@/app/components/actions";
import { redirect } from "next/navigation";

export default async function EditPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  async function updatePostAction(formData: FormData) {
    "use server";
    await updatePost(formData, params.slug);
    redirect(`/posts/pending`);
  }

  return (
    <div>
      <h1 className="text-2xl mb-8">Edit post</h1>

      {post && "title" in post && "text" in post && "type" in post && (
        <form action={updatePostAction} className="form-control gap-4">
          <input
            type="text"
            name="title"
            defaultValue={post.title}
            className="input input-bordered"
            required
          />

          <textarea
            className="textarea textarea-bordered text-base h-40"
            name="content"
            defaultValue={post.text}
            placeholder="Post content"
            required
          ></textarea>

          <select
            className="select select-bordered"
            defaultValue={post.type}
            name="category"
          >
            <option value="noha">Noha</option>
            <option value="qaseeda">Qaseeda</option>
            <option value="bandd">Bandd</option>
            <option value="other">Other</option>
          </select>

          <button className="btn btn-primary w-full max-w-sm self-center">
            Update post
          </button>
        </form>
      )}
    </div>
  );
}
