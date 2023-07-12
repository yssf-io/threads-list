import { ThreadsAPI, Thread } from "threads-api";
import Lists from "./(components)/Lists";
import SideBar from "./(components)/SideBar";

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

export default async function Home() {
  // const { posts } = await getData("zuck");

  return (
    <main className="flex">
      <SideBar />
      <Lists />
      {/*<Column posts={posts} />*/}
    </main>
  );
}
