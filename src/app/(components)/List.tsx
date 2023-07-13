"use client";
import Column from "./Column";
import { List } from "./CreateList";
import { FilledList } from "@/pages/api/getData";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const getPostsOfList = async (list: List): Promise<FilledList> => {
  const data = await fetch("/api/getData", {
    method: "POST",
    body: JSON.stringify({ lists: [list] }),
  });

  return (await data.json()).filledLists[0];
};

const List = ({ list }: { list: List }) => {
  const [filledList, setFilledList] = useState<FilledList | undefined>(
    undefined
  );

  useEffect(() => {
    getPostsOfList(list).then((filledList) => {
      setFilledList(filledList);
    });
  }, [list]);

  return (
    <main className="flex">
      {filledList ? (
        <Column posts={filledList.posts} name={list.name} />
      ) : (
        <div className="border border-black min-w-[500px] max-w-[500px] h-screen">
          <div className="px-3 py-2 border-b-2 border-gray-300">
            <div className="text-sm text-gray-500">List</div>
            <div className="text-xl font-bold">{list.name || "name"}</div>
          </div>
          <Spinner />
        </div>
      )}
    </main>
  );
};

export default List;
