"use client";
import { list_user, getCurrentUser } from "@/app/utils/data";
import Link from "next/link";

const Page = async ({ params: { user_id } }) => {
  const { data } = await getCurrentUser();

  const { data: titles, error } = await list_user(user_id);

  console.log(data);

  if (error) {
    return <p>Error: {error.message}</p>;
  } else if (titles.length == 0) {
    return (
      <h1 className="text-center my-10 text-red-700">
        This user has no lists.
      </h1>
    );
  } else if (user_id === data?.id) {
    return (
      <main>
        {titles.map(({ title, id }) => {
          return (
            <div className="flex justify-center items-center" key={title}>
              <div className="text-center font-bold">
                <div className="items">
                  <a
                    key={title}
                    href={`/user/${user_id}/list/${id}/edit`}
                    class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-lime-200 rounded hover:bg-lime-200 group"
                  >
                    <span class="w-48 h-48 rounded rotate-[-40deg] bg-violet-400 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                      {title}
                    </span>
                  </a>
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
                <div>
                  <div className="items">
                    <a
                      key={title}
                      href={`/user/${user_id}/list/${id}`}
                      class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-lime-200 rounded hover:bg-lime-200 group"
                    >
                      <span class="w-48 h-48 rounded rotate-[-40deg] bg-violet-400 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                      <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                        {title}
                      </span>
                    </a>
                  </div>
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
