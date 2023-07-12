"use client";
import CreateList, { List } from "./CreateList";
import ListUI from "./List";
import { useEffect, useState } from "react";
import { FilledList } from "@/pages/api/getData";

const getPosts = async (
  lists: List[]
): Promise<{ filledLists: FilledList[] }> => {
  if (lists.length === 0) return { filledLists: [] };

  const data = await fetch("/api/getData", {
    method: "POST",
    body: JSON.stringify({ lists }),
  });

  return await data.json();
};

const Lists = () => {
  const [filledLists, setFilledLists] = useState<FilledList[]>([]);
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
    getPosts(existingLists).then(({ filledLists }) => {
      setFilledLists(filledLists);
    });
  }, [existingLists]);

  return (
    <div className="flex">
      {filledLists &&
        filledLists.map(({ name, users, posts }) => (
          <ListUI
            key={name}
            list={{ name: name, users: users }}
            posts={posts}
          />
        ))}
      <div className="p-2">
        <CreateList />
      </div>
    </div>
  );
};

export default Lists;
