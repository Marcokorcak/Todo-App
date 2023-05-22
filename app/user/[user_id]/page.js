"use client";
import { getListByUser, getCurrentUser } from "@/app/utils/data";
import Link from "next/link";

const Page = async ({ params: { user_id } }) => {
    const { data } = await getCurrentUser();
  
    const { data: titles, error } = await getListByUser(user_id);
  
    console.log(data);
  
    if (error) {
      return <p>Error: {error.message}</p>;
    } else if (titles.length == 0) {
      return (
        <h3 className="my-10 h3 text-4xl text-center font-extrabold">
          This user has no lists.
        </h3>
      );
    } else if (user_id === data?.id) {
      return (
        <main>
          {titles.map(({ title, id }) => {
            return (
              <div className="flex justify-center items-center" key={title}>
                <div className="text-center font-bold">
                  <div className="transform transition duration-400 hover:scale-125 ">
                    <Link
                      key={title}
                      href={`/user/${user_id}/list/${id}/edit`}
                      className="block my-5 button small"
                    >
                      <div className='rounded-2xl w-60 transition duration-500 hover:scale-150 hover:bg-indigo-600 flex justify-center text-center'>
                        <div className="px-6 py-4">{title}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      );
    } else {
      return (
        <main>
          {titles.map(({ title, id }) => {
            return (
              <div className="flex justify-center items-center" key={title}>
                <div className="text-center font-bold">
                  <div className="transform transition duration-400 hover:scale-125 ">
                    <Link
                      key={title}
                      href={`/user/${user_id}/list/${id}`}
                      className="block my-5 button small"
                    >
                      <div className='rounded-2xl w-60 transition duration-500 hover:scale-150 hover:bg-fuchsia-600 flex justify-center text-center'>
                        <div className="px-6 py-4">{title}</div>
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
  };
  
  export default Page;