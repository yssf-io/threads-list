import Image from "next/image";
import { LinkPreviewAttachment } from "./Post";

const LinkAttachment = ({ link }: { link: LinkPreviewAttachment }) => {
  const { display_url, image_url, title, url } = link;

  return (
    <div className="border border-gray-300 w-full m-2 rounded-lg">
      <a href={url}>
        {image_url && (
          <Image
            className="w-full rounded-t-lg"
            src={image_url}
            alt={`image preview of ${title} page`}
            width="100"
            height="100"
            layout="responsive"
          />
        )}
        <p className="text-gray-400 text-sm m-2">{display_url}</p>
        <p className="m-2">{title}</p>
      </a>
    </div>
  );
};

export default LinkAttachment;
