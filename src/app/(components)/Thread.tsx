import { Post } from "threads-api";
import PostUI from "./Post";
import Repost from "./Repost";

export function formatDuration(seconds: number): string {
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

export const splitByMention = (
  input: string
): { value: string; mention: boolean }[] => {
  let result: { value: string; mention: boolean }[] = [];
  let parts = input.split(/(@\w+)/g);

  parts.forEach((part) => {
    if (part) {
      let isMention = part.startsWith("@");
      result.push({ value: part, mention: isMention });
    }
  });

  return result;
};

type SplitResult = {
  value: string;
  type: "mention" | "url" | "text";
};

export function splitByMentionAndURL(input: string): SplitResult[] {
  const regex = /(@\w+)|((?:http|https):\/\/[^\s]+)/g;
  let result: SplitResult[] = [];
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(input))) {
    if (match.index !== lastIndex) {
      result.push({ value: input.slice(lastIndex, match.index), type: "text" });
    }

    let type: SplitResult["type"] = match[0].startsWith("@")
      ? "mention"
      : "url";
    result.push({ value: match[0], type });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < input.length) {
    result.push({ value: input.slice(lastIndex), type: "text" });
  }

  return result;
}

const Thread = ({ post }: { post: Post }) => {
  const { user, text_post_app_info } = post;
  const { username } = user;
  const { reposted_post, quoted_post } = text_post_app_info.share_info;

  return (
    <div>
      {!reposted_post && <PostUI post={post} />}
      {reposted_post && !quoted_post && (
        <Repost post={reposted_post} reposter={username} />
      )}
    </div>
  );
};

export default Thread;
