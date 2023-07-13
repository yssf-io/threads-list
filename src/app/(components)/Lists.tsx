"use client";
import CreateList, { List } from "./CreateList";
import ListUI from "./List";
import { useEffect, useState } from "react";
import { FilledList } from "@/pages/api/getData";
import { useListStore } from "@/slices/displayLists";

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
  const {
    lists,
    updateDisplayLists,
    showCreateList,
    toggleCreateList,
    existingLists,
    updateExistingLists,
  } = useListStore();

  useEffect(() => {
    if (existingLists) return;
    const tmp = localStorage.getItem("lists");
    updateExistingLists(tmp ? JSON.parse(tmp) : undefined);
  });

  useEffect(() => {
    if (!existingLists) return;
    getPosts(existingLists).then(({ filledLists }) => {
      setFilledLists(filledLists);
    });
  }, [existingLists]);

  useEffect(() => {
    if (existingLists) updateDisplayLists(existingLists);
  }, [existingLists]);

  return (
    <div className="flex">
      {filledLists &&
        filledLists.map(({ name, users, posts }, index) => (
          <div>
            {lists && lists.find((l) => l.name === name)?.show && (
              <ListUI
                key={name}
                list={{ name: name, users: users }}
                posts={posts}
              />
            )}
          </div>
        ))}
      {showCreateList && <CreateList close={toggleCreateList} />}
    </div>
  );
};

export default Lists;
