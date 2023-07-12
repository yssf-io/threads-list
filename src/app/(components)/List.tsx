"use client";
import { Thread } from "threads-api";
import Column from "./Column";
import CreateList, { List } from "./CreateList";

const List = ({ list, posts }: { list: List; posts: Thread[] }) => {
  return (
    <main className="p-2 flex">
      {posts.length > 0 ? (
        <Column posts={posts} name={list.name} />
      ) : (
        <CreateList />
      )}
    </main>
  );
};

export default List;
