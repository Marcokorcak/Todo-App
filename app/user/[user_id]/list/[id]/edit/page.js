"use client";
import {
  insertNewItem,
  Ibl,
  removeItem,
  modifyItem,
  Lid,
  ChangePlacement,
} from "@/app/utils/data";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircle, faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const Page = ({ params: { id } }) => {
  const [title, assignTitle] = useState("");
  const [status, assignS] = useState(false);
  const [items, assignItem] = useState([]);
  const [nList, assignName] = useState("");
  const [editVar, EditBool] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const { data: titles } = await Ibl(id);
      assignItem(titles);
      const { data } = await Lid(id);
      assignName(data[0].title);
    };
    fetchItems();
  }, [id]);

  const HandleT = (e) => {
    assignTitle(e.target.value);
  };

  const addNewItem = async (e) => {
    e.preventDefault();

    const list_id = id;
    const order = items.length + 1;
    const addedLink = await insertNewItem(title, order, status, list_id);

    if (addedLink.success == false) {
      console.log(items);
      return;
    }
    const { data: titles } = await Ibl(id);
    assignItem(titles);
    assignTitle("");
  };

  const deleteItem = async (itemId) => {
    await removeItem(itemId);

    const { data: titles } = await Ibl(id);
    assignItem(titles);
  };

  const updateI = async (itemId, status) => {
    await modifyItem(itemId, status);

    const { data: titles } = await Ibl(id);
    assignItem(titles);
  };

  const updateIOrder = async (itemId, current, destination, lid) => {
    await ChangePlacement(itemId, current, destination, lid);

    const { data: titles } = await Ibl(id);
    assignItem(titles);
  };

  const editHandle = () => {
    EditBool(true);
  };

  const stopEdit = () => {
    EditBool(false);
  };

  return (
    <section className={"mx-auto max-w-7xl px-4  "}>
      <div className="w-full max-w-screen-xl  mx-auto px-6">
        <div className="flex justify-center p-4 px-3 py-10">
          <div className="w-full max-w-md">
            <div className="bg-lime-200 shadow-md border-2 border-lime-200 rounded-lg px-3 py-2 mb-4">
              <div className="block text-gray-700 text-2xl font-semibold px-2">
                {nList}
              </div>
              <div className="flex items-center bg-indigo-600 rounded-md">
                <div className="pl-2"></div>
              </div>
              <div className="py-3 text-sm divide-y-2 divide-lime-500">
                {items.map(({ title, order, status, id: itemId }) => {
                  return (
                    <div
                      key={itemId}
                      className="flex justify-start  text-slate-500  rounded-md px-2 py-2 my-2 "
                    >
                      {status === false ? (
                        <div>
                          <button
                            className="text-3xl"
                            onClick={() => updateI(itemId, !status)}
                          >
                            <FontAwesomeIcon icon={faCircle} />
                          </button>{" "}
                        </div>
                      ) : (
                        <div>
                          <button
                            className="text-3xl"
                            onClick={() => updateI(itemId, !status)}
                          >
                            {" "}
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              style={{ color: "#49b71a" }}
                            />
                          </button>
                        </div>
                      )}

                      <div className="flex-grow text-base font-medium text-black px-2">
                        {title}
                      </div>
                      <div className="text-sm font-normal text-black tracking-wide ">
                        {" "}
                      </div>

                      {order === 1 ? (
                        <>
                          <button
                            className="bg-lime-500 hover:bg-slate-600 text-white font-bold  rounded h-10 px-4 m-2"
                            onClick={() =>
                              updateIOrder(
                                itemId,
                                order,
                                items.length,
                                id
                              )
                            }
                          >
                            Lower Priority{" "}
                          </button>
                          <button
                            className="bg-red-300 hover:bg-red-500 text-white font-bold m-2 rounded"
                            onClick={() => deleteItem(itemId)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-red-300 hover:bg-red-500 text-white font-bold h-10 px-4 m-2 rounded"
                          onClick={() => deleteItem(itemId)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="block bg-lime-200 text-sm text-right py-2 px-3 -mx-3 -mb-2 rounded-b-lg">
                {!editVar && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-3 rounded"
                    onClick={editHandle}
                  >
                    Add New Task <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                )}
                {editVar && (
                  <div className="my-3">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      name="New Task"
                      placeholder="New Task"
                      value={title}
                      onChange={HandleT}
                    ></input>
                    <br />
                    <button
                      className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 my-3 rounded"
                      onClick={addNewItem}
                    >
                      Add
                    </button>
                    <button
                      className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 mx-4 rounded"
                      onClick={stopEdit}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
