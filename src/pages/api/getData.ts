import { List } from "@/app/(components)/CreateList";
import { getData } from "@/app/page";
import { NextApiRequest, NextApiResponse } from "next";
import { Thread } from "threads-api";

export interface FilledList extends List {
  posts: Thread[];
}

const getPosts = async (
  lists: List[]
): Promise<{ filledLists: FilledList[] }> => {
  if (lists.length === 0) return { filledLists: [] };

  const filledLists = await Promise.all(
    lists.map(async (list) => {
      const posts: Thread[] = [];

      list.users = await Promise.all(
        list.users.map(async (user) => {
          const { posts: listPosts, id } = await getData(user.username);

          posts.push(...listPosts);

          return { username: user.username, id };
        })
      );

      return { ...list, posts };
    })
  );

  return { filledLists };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(await getPosts(JSON.parse(req.body).lists));
}
