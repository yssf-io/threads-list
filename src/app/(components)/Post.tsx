import Image from "next/image";
import { Post, RepostedPost } from "threads-api";
import { formatDuration, splitByMention } from "./Thread";
import LinkAttachment from "./LinkAttachement";

export interface LinkPreviewAttachment {
  display_url: string;
  favicon_url: string;
  image_url: string;
  title: string;
  url: string;
}

const Post = ({ post }: { post: Post | RepostedPost }) => {
  const { caption, user, taken_at, image_versions2, text_post_app_info } = post;
  const { profile_pic_url, username } = user;
  const { candidates } = image_versions2;
  const { link_preview_attachment } = text_post_app_info;

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
        <div className="flex justify-between align-top ml-2 mt-2">
          <p className="font-bold text-md">@{username}</p>
          <p className="text-md ml-2">
            {formatDuration(Date.now() / 1000 - taken_at)}
          </p>
        </div>
        <div className="mr-2 mb-2">
          {caption && (
            <p className="ml-2">
              {splitByMention(caption.text).map(({ value, mention }) => (
                <span>
                  {mention ? (
                    <a
                      className="text-blue-500"
                      href={`https://threads.net/${value}`}
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </span>
              ))}
            </p>
          )}

          {candidates.length > 0 && (
            <Image
              className="rounded-lg m-2"
              src={candidates[0].url}
              alt={`image from ${username}`}
              width={candidates[0].width}
              height={candidates[0].height}
            />
          )}

          {link_preview_attachment && (
            <LinkAttachment link={link_preview_attachment} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
