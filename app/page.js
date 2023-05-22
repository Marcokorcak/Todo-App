import { recentUserList } from "./utils/data";
import Link from "next/link";
export const revalidate = 20;

export default async function Home() {
  const { success, data, error } = await recentUserList();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data.length === 0) {
    return (
      <h3 className="my-3 h3 text-4xl text-center font-extrabold">
        No users have signed up yet.
      </h3>
    );
  }

  return (
    <main>
      <h2 className="purples">Latest Lists</h2>
      {data.map(({ name, user_id }) => {
        return (
          <div className="flex justify-center items-center" key={name}>
            <div className="text-center font-bold">
              <div >
                <Link key={user_id} href={`/user/${user_id}`}>
                  <div>
                    <div className="latest">
                      <p> {`${name}'s Lists`}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}
