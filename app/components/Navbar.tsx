"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  const handleClick = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">NohaArchive</a>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-1 p-0">
            <button className="btn btn-square btn-ghost text-neutral-content bg-neutral">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-neutral rounded-box w-52"
          >
            <li onClick={handleClick}>
              <Link href="/posts">See all posts</Link>
            </li>
            <li onClick={handleClick}>
              <Link href="/posts/pending">See posts awaiting approval</Link>
            </li>
            <li onClick={handleClick}>
              <Link href="/posts/new">Create a new post</Link>
            </li>
          </ul>
        </div>
      </div>
      {session ? (
        <>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="pfp w-10 rounded-full relative">
                <Image
                  src={
                    session?.user?.image ||
                    "https://i.redd.it/7ayjc8s4j2n61.png"
                  }
                  alt="Profile picture"
                  fill={true}
                  sizes="50px"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-neutral rounded-box w-52"
            >
              <li onClick={() => signOut()}>
                <p className="link-error">Sign out</p>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <button className="btn btn-active btn-accent" onClick={() => signIn()}>
          Sign In
        </button>
      )}
    </div>
  );
}
