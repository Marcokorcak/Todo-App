"use client";
import { Ibl, Lid } from "@/app/utils/data";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const Page = ({ params: { id } }) => {
  const [items, assignItems] = useState([]);
  const [Lname, assignName] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const { data: titles } = await Ibl(id);
      assignItems(titles);
      const { data } = await Lid(id);
      assignName(data[0].title);
    };
    fetchItems();
  }, [id]);

  return (
    <section className={"mx-auto max-w-7xl px-4 py-5 "}>
          <div className="w-full max-w-md">
            <div className="bg-lime-200 shadow-md border-2 border-black rounded-lg px-3 py-2 mb-4">
              <div className="block text-gray-700 text-2xl font-semibold py-2 px-2">
                {Lname}
              </div>
              <div className="flex items-center rounded-md">
                <div className="pl-2"></div>
              </div>
              <div className="py-3 text-sm divide-y-2 divide-lime-500">
                {items.map(({ title, order, status, id: itemId }) => {
                  return (
                    <div
                      key={itemId}
                      className="flex justify-start  text-gray-700  rounded-md px-2 py-2 my-2 "
                    >
                      {status === false ? (
                        <div>
                          <button
                            className="text-3xl"
                            onClick={() => updateOneItem(itemId, !status)}
                          >
                            <FontAwesomeIcon icon={faCircle} />
                          </button>{" "}
                        </div>
                      ) : (
                        <div>
                          <button
                            className="text-3xl"
                            onClick={() => updateOneItem(itemId, !status)}
                          >
                            {" "}
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              style={{ color: "#49b71a" }}
                            />
                          </button>
                        </div>
                      )}
                      <div className="flex-grow text-base font-medium text-gray-500 px-2">
                        {title}
                      </div>
                      <div className="text-sm font-normal text-gray-500 tracking-wide ">
                        {" "}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
    </section>
  );
};

export default Page;
