import Image from "next/image";
import { Thread } from "threads-api";

function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h`;
  }
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days}d`;
  }
  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks}w`;
  }
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}m`;
  }
  const years = Math.floor(days / 365);
  return `${years}y`;
}

const Thread = ({ post }: { post: Thread }) => {
  const { caption, user, taken_at } = post.thread_items[0].post;
  const { profile_pic_url, username } = user;

  return (
    <div className="flex ml-2 border-b items-start border-gray-300">
      <Image
        className="rounded-full m-2"
        src={profile_pic_url}
        alt={`profile picture of ${username}`}
        width={60}
        height={60}
      />
      <div className="w-4/5">
        <div className="flex justify-between align-top m-2">
          <p className="font-bold text-md">@{username}</p>
          <p className="text-md ml-2">
            {formatDuration(Date.now() / 1000 - taken_at)}
          </p>
        </div>
        <p className="ml-2">{caption?.text}</p>
      </div>
    </div>
  );
};

export default Thread;
