import { Thread } from "threads-api";
import ThreadUI from "./Thread";

const Column = ({ posts }: { posts: Thread[] }) => {
  return (
    <div className="border border-black min-w-[450px] max-w-[450px]">
      <div className="px-3 py-2 border-b-2 border-gray-300">
        <div className="text-sm text-gray-500">List</div>
        <div className="text-xl font-bold">name</div>
      </div>

      {posts.map((post) => (
        <ThreadUI post={post.thread_items[0].post} />
      ))}
    </div>
  );
};

export default Column;
