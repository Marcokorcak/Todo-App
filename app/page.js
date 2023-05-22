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
      <h2 className="my-6 text-4xl text-center font-extrabold">Latest Lists</h2>
      {data.map(({ name, user_id }) => {
        return (
          <div className="flex justify-center items-center" key={name}>
            <div className="text-center font-bold">
              <div>
                <Link key={user_id} href={`/user/${user_id}`}>
                  <div>
                    <div className="my-2 border rounded-2xl w-60 transition duration-500 hover:scale-150 hover:bg-green-300 flex justify-center text-center">
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
