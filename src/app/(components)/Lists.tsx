"use client";
import CreateList from "./CreateList";
import ListUI from "./List";
import { useEffect } from "react";
import { useListStore } from "@/slices/displayLists";

const Lists = () => {
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
  }, []);

  useEffect(() => {
    if (existingLists) updateDisplayLists(existingLists);
  }, [existingLists]);

  return (
    <div className="flex">
      {existingLists &&
        existingLists.map(({ name, users }) => (
          <div>
            {lists && lists.find((l) => l.name === name)?.show && (
              <ListUI key={name} list={{ name: name, users: users }} />
            )}
          </div>
        ))}
      {showCreateList && <CreateList close={toggleCreateList} />}
    </div>
  );
};

export default Lists;
