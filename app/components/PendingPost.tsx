"use client";
import { IPost } from "@/types";
import Link from "next/link";
import { markAsApproved } from "./actions";
import { useState } from "react";

export default function PendingPost(post: IPost) {
  const [isApproved, setIsApproved] = useState(post.isApproved);

  const handleApprove = () => {
    markAsApproved(post.id, !isApproved);
    setIsApproved(!isApproved);
  };

  return (
    <div className="border border-gray-300 rounded-lg dark:border-gray-700 py-4 px-6">
      <div className="flex justify-between items-center">
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-xl mb-2 underline">{post.title}</h2>
        </Link>

        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={isApproved}
          onChange={handleApprove}
        />
      </div>
      <p className="line-clamp-3 whitespace-pre-line">{post.text}</p>
      {post.author && <p className="text-right">By {post.author}</p>}
    </div>
  );
}
