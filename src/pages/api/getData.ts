import { List } from "@/app/(components)/CreateList";
import { NextApiRequest, NextApiResponse } from "next";
import { Thread, ThreadsAPI } from "threads-api";

export interface FilledList extends List {
  posts: Thread[];
}

export async function getData(
  username: string
): Promise<{ id: string; posts: Thread[] }> {
  const threads = new ThreadsAPI();
  const id = await threads.getUserIDfromUsername(username);

  // const profile = await threads.getUserProfile(username, id);
  if (!id) return { id: "", posts: [] };

  const posts = await threads.getUserProfileThreads(username, id);

  return { id, posts };
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

      const sortedPosts = posts.sort(
        (a, b) =>
          b.thread_items[0].post.taken_at - a.thread_items[0].post.taken_at
      );

      return { ...list, posts: sortedPosts };
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
