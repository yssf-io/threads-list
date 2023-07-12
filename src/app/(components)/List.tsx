"use client";
import { Thread } from "threads-api";
import Column from "./Column";
import CreateList, { List } from "./CreateList";
import { useEffect, useState } from "react";

const getPosts = async (
  lists: List[]
): Promise<{ posts: Thread[]; lists: List[] }> => {
  if (lists.length === 0) return { posts: [], lists: [] };

  const data = await fetch("/api/getData", {
    method: "POST",
    body: JSON.stringify({ lists }),
  });

  const res = await data.json();

  return res;
};

const List = () => {
  const [posts, setPosts] = useState<Thread[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [existingLists, setExistingLists] = useState<List[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (existingLists) return;
    const tmp = localStorage.getItem("lists");
    setExistingLists(tmp ? JSON.parse(tmp) : undefined);
  });

  useEffect(() => {
    if (!existingLists) return;
    getPosts(existingLists).then(({ posts, lists }) => {
      setPosts(posts);
      setLists(lists);
    });
  }, [existingLists]);

  return (
    <main className="p-2 flex">
      {lists.length > 0 && posts.length > 0 ? (
        <Column posts={posts} />
      ) : (
        <CreateList />
      )}
    </main>
  );
};

export default List;
