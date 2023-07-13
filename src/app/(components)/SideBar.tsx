"use client";

import { useListStore } from "@/slices/displayLists";
import { List } from "./CreateList";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [lists, setLists] = useState<List[] | undefined>(undefined);
  const {
    lists: listsShow,
    showList,
    showCreateList,
    toggleCreateList,
    existingLists,
    updateExistingLists,
  } = useListStore();

  const handleShow = (name: string) => {
    if (existingLists === undefined) return;
    const index = existingLists.findIndex((list: List) => list.name === name);
    existingLists[index].show = existingLists[index].show ? false : true;
    showList(existingLists[index].name);
    localStorage.setItem("lists", JSON.stringify(lists));
  };

  const handleDelete = (name: string) => {
    if (existingLists === undefined) return;
    const index = existingLists.findIndex((list: List) => list.name === name);
    existingLists.splice(index, 1);
    localStorage.setItem("lists", JSON.stringify(lists));
    updateExistingLists(existingLists);
  };

  useEffect(() => {
    if (lists) return;
    setLists(JSON.parse(localStorage.getItem("lists") || "[]"));
  }, []);

  return (
    <div className="border border-black min-w-[300px] max-w-[300px] h-screen">
      <p className="text-center text-xl font-bold my-8">Welcome</p>
      <p className="text-lg font-bold m-2">Your lists</p>
      {existingLists &&
        existingLists.map((list: List) => (
          <div
            key={list.name}
            className="m-2 p-2 border border-black hover:bg-gray-200 rounded-lg flex justify-between items-center"
          >
            <p className="w-full">{list.name}</p>
            <p
              onClick={() => handleShow(list.name)}
              className="cursor-pointer text-white mr-1 px-4 py-2 bg-green-400 rounded-lg"
            >
              {listsShow.find((l) => l.name === list.name)?.show
                ? "Hide"
                : "Show"}
            </p>
            <p
              onClick={() => handleDelete(list.name)}
              className="cursor-pointer px-4 py-2 text-white bg-red-400 rounded-lg"
            >
              Delete
            </p>
          </div>
        ))}

      {!showCreateList && (
        <p
          onClick={toggleCreateList}
          className="w-2/3 m-auto px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer"
        >
          Create a list
        </p>
      )}
    </div>
  );
};

export default SideBar;
