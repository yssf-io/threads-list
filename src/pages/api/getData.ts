import { List } from "@/app/(components)/CreateList";
import { getData } from "@/app/page";
import { NextApiRequest, NextApiResponse } from "next";
import { Thread } from "threads-api";

const getPosts = async (
  lists: List[]
): Promise<{ posts: Thread[]; lists: List[] }> => {
  if (lists.length === 0) return { posts: [], lists: [] };

  const list = lists[0];
  const user = list.users[0];
  const { id, posts } = await getData(user.username);

  if (!id) return { posts: [], lists };
  user.id = id;

  return { posts, lists };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(await getPosts(JSON.parse(req.body).lists));
}
