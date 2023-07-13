import { ThreadsAPI, Thread } from "threads-api";
import Lists from "./(components)/Lists";
import SideBar from "./(components)/SideBar";

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
