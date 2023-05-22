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
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);
  const [items, setItems] = useState([]);
  const [listName, setListName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const { data: titles } = await Ibl(id);
      setItems(titles);
      const { data } = await Lid(id);
      setListName(data[0].title);
    };
    fetchItems();
  }, [id]);

  const titleHandler = (e) => {
    setTitle(e.target.value);
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
    setItems(titles);
    setTitle("");
  };

  const deleteOneItem = async (itemId) => {
    await removeItem(itemId);

    const { data: titles } = await Ibl(id);
    setItems(titles);
  };

  const updateOneItem = async (itemId, status) => {
    await modifyItem(itemId, status);

    const { data: titles } = await Ibl(id);
    setItems(titles);
  };

  const updateOneItemOrder = async (itemId, current, destination, lid) => {
    await ChangePlacement(itemId, current, destination, lid);

    const { data: titles } = await Ibl(id);
    setItems(titles);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <section className={"mx-auto max-w-7xl px-4  "}>
      <div className="w-full max-w-screen-xl  mx-auto px-6">
        <div className="flex justify-center p-4 px-3 py-10">
          <div className="w-full max-w-md">
            <div className="bg-lime-200 shadow-md border-2 border-lime-200 rounded-lg px-3 py-2 mb-4">
              <div className="block text-gray-700 text-2xl font-semibold px-2">
                {listName}
              </div>
              <div className="flex items-center bg-lime-200 rounded-md">
                <div className="pl-2"></div>
              </div>
              <div className="py-3 text-sm divide-y-2">
                {items.map(({ title, order, status, id: itemId }) => {
                  return (
                    <div
                      key={itemId}
                      className="flex justify-start  text-lime-200  rounded-md px-2 py-2 my-2 "
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
                              updateOneItemOrder(
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
                            onClick={() => deleteOneItem(itemId)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-red-300 hover:bg-red-500 text-white font-bold h-10 px-4 m-2 rounded"
                          onClick={() => deleteOneItem(itemId)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="block bg-lime-200 text-sm text-right py-2 px-3 -mx-3 -mb-2 rounded-b-lg">
                {!isEditing && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-3 rounded"
                    onClick={startEditingHandler}
                  >
                    Add New Task <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                )}
                {isEditing && (
                  <div className="my-3">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      name="New Task"
                      placeholder="New Task"
                      value={title}
                      onChange={titleHandler}
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
                      onClick={stopEditingHandler}
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
