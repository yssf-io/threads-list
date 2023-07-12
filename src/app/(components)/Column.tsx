import { Thread } from "threads-api";
import ThreadUI from "./Thread";

const Column = ({ posts, name }: { posts: Thread[]; name?: string }) => {
  return (
    <div className="border border-black min-w-[500px] max-w-[500px]">
      <div className="px-3 py-2 border-b-2 border-gray-300">
        <div className="text-sm text-gray-500">List</div>
        <div className="text-xl font-bold">{name || "name"}</div>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="border-b border-gray-300">
          <ThreadUI post={post.thread_items[0].post} />
        </div>
      ))}
    </div>
  );
};

export default Column;
