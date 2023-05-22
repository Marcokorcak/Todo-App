"use client";
import {
  addItem,
  getItemByList,
  deleteItem,
  updateItem,
  getListById,
  updateOrder,
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
      const { data: titles } = await getItemByList(id);
      setItems(titles);
      const { data } = await getListById(id);
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
    const addedLink = await addItem(title, order, status, list_id);

    if (addedLink.success == false) {
      console.log(items);
      //handle error
      return;
    }
    const { data: titles } = await getItemByList(id);
    setItems(titles);
    setTitle("");

    //@todo update this to either fake get the links (by taking the latest DB load + adding in the latest pushed link)
    //  or make a new request....
  };

  const deleteOneItem = async (itemId) => {
    await deleteItem(itemId);

    const { data: titles } = await getItemByList(id);
    setItems(titles);

    //@todo update this to either fake get the links (by taking the latest DB load + adding in the latest pushed link)
    //  or make a new request....
  };

  const updateOneItem = async (itemId, status) => {
    await updateItem(itemId, status);

    const { data: titles } = await getItemByList(id);
    setItems(titles);

    //@todo update this to either fake get the links (by taking the latest DB load + adding in the latest pushed link)
    //  or make a new request....
  };

  const updateOneItemOrder = async (itemId, current, destination, lid) => {
    // await supabase.rpc('changeOrder', { itemId : itemId, current : current, destination:destination, list_id : list_id })
    await updateOrder(itemId, current, destination, lid);

    const { data: titles } = await getItemByList(id);
    setItems(titles);

    //@todo update this to either fake get the links (by taking the latest DB load + adding in the latest pushed link)
    //  or make a new request....
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <section className={"mx-auto max-w-7xl px-4  "}>
      {/* <h2 className="mt-8 h1 text-3xl text-center font-extrabold">Edit List</h2> */}

      <div className="w-full max-w-screen-xl  mx-auto px-6">
        <div className="flex justify-center p-4 px-3 py-10">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md border-2 border-black rounded-lg px-3 py-2 mb-4">
              <div className="block text-gray-700 text-2xl font-semibold px-2">
                {listName}
              </div>
              <div className="flex items-center bg-gray-200 rounded-md">
                <div className="pl-2"></div>
              </div>
              <div className="py-3 text-sm divide-y-2">
                {items.map(({ title, order, status, id: itemId }) => {
                  return (
                    <div
                      key={itemId}
                      className="flex justify-start  text-gray-700  rounded-md px-2 py-2 my-2 "
                    >
                      {/* {status === false ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="fill-red-500"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className=" flex justify-start w-6 h-6 text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-green-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}{" "} */}
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
                      {/* <button
                        className="bg-slate-500 hover:bg-slate-600 text-white font-bold  rounded h-10 px-4 m-2"
                        onClick={() => updateOneItem(itemId, !status)}
                      >
                        Change Status
                      </button> */}
                      {order === 1 ? (
                        <>
                          <button
                            className="bg-slate-500 hover:bg-slate-600 text-white font-bold  rounded h-10 px-4 m-2"
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
                            className="bg-red-500 hover:bg-red-600 text-white font-bold h-10 px-4 m-2 rounded"
                            onClick={() => deleteOneItem(itemId)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold h-10 px-4 m-2 rounded"
                          onClick={() => deleteOneItem(itemId)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="block bg-gray-200 text-sm text-right py-2 px-3 -mx-3 -mb-2 rounded-b-lg">
                {/* <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="New Task"
                  placeholder="New Task"
                  value={title}
                  onChange={titleHandler}
                ></input>
                <br />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={addNewItem}
                >
                  Add
                </button> */}
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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="New Task"
                      placeholder="New Task"
                      value={title}
                      onChange={titleHandler}
                    ></input>
                    <br />
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-3 rounded"
                      onClick={addNewItem}
                    >
                      Add
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-4 rounded"
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
