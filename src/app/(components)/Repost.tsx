import Image from "next/image";
import { RepostedPost } from "threads-api";
import PostUI from "./Post";

const Repost = ({
  post,
  reposter,
}: {
  post: RepostedPost;
  reposter: string;
}) => {
  return (
    <div className="">
      <div className="flex align-middle items-center ml-16 mt-2">
        <Image
          className="mr-2"
          src="/repost.png"
          alt="Repost symbol"
          width="16"
          height="16"
        />
        <p className="text-gray-400 ml-2 font-light">{reposter} reposted</p>
      </div>

      <PostUI post={post} />
    </div>
  );
};

export default Repost;
