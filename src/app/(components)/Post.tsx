import Image from "next/image";
import { Post, QuotedPost, RepostedPost } from "threads-api";
import { formatDuration, splitByMentionAndURL } from "./Thread";
import LinkAttachment from "./LinkAttachement";

export interface LinkPreviewAttachment {
  display_url: string;
  favicon_url: string;
  image_url: string;
  title: string;
  url: string;
}

const Post = ({
  post,
  isQuoted,
}: {
  post: Post | RepostedPost | QuotedPost;
  isQuoted?: boolean;
}) => {
  const { caption, user, taken_at, image_versions2, text_post_app_info } = post;
  const { profile_pic_url, username } = user;
  const { candidates } = image_versions2;
  const { link_preview_attachment, share_info } = text_post_app_info;

  return (
    <div className="flex ml-2 items-start border-gray-300">
      <Image
        className="rounded-full m-2"
        src={profile_pic_url}
        alt={`profile picture of ${username}`}
        width={isQuoted ? 40 : 60}
        height={isQuoted ? 40 : 60}
      />
      <div className="w-4/5">
        <div className="flex justify-between align-top ml-2 mt-2">
          <p className="font-bold text-md">@{username}</p>
          <p className="text-md ml-2">
            {formatDuration(Date.now() / 1000 - taken_at)}
          </p>
        </div>
        <div className="whitespace-pre-wrap mr-2 mb-2">
          {caption && (
            <p className="ml-2">
              {splitByMentionAndURL(caption.text).map(({ value, type }) => (
                <span>
                  {type === "mention" ? (
                    <a
                      className="text-blue-500"
                      href={`https://threads.net/${value}`}
                    >
                      {value}
                    </a>
                  ) : (
                    <span>
                      {type === "url" ? (
                        <a className="text-blue-500 break-all" href={value}>
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </span>
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

          <div>
            {!isQuoted && share_info && share_info.quoted_post && (
              <a
                href={`https://www.threads.net/t/${share_info.quoted_post.code}`}
              >
                <div className="border border-gray-300 p-2 rounded-lg mt-2">
                  <Post post={share_info.quoted_post} isQuoted={true} />
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
