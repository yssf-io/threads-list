"use client";
import { Thread } from "threads-api";
import Column from "./Column";
import CreateList, { List } from "./CreateList";

const List = ({ list, posts }: { list: List; posts: Thread[] }) => {
  return (
    <main className="flex">
      <Column posts={posts} name={list.name} />
    </main>
  );
};

export default List;
