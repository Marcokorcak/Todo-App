"use client";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/app/utils/data";
import { createList } from "@/app/utils/data";
import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { data } from "autoprefixer";

const CreateList = () => {
  const router = useRouter();

  const [id, setID] = useState("");

  useEffect(() => {
    const getCurUser = async () => {
      const { data, error } = await getCurrentUser();

      if (data) {
        setID(data.id);
      } else {
        console.log("Error fetching current user:", error);
      }
    };
    getCurUser();
  }, []);

  const uuid = { id };

  /*  useEffect(() => {
    console.log("ID ->", id);
  }, [id]); */

  function reducer(state, action) {
    switch (action.type) {
      case "title":
      case "content":
        return { ...state, [action.type]: action.value };
      case "loading":
        return { ...state, loading: action.loading };
      case "response":
        return { ...state, response: action.response };
    }

    throw Error("Unknown action." + action.type);
  }

  const initialState = {
    title: "",
    content: "",
    response: "",
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { title, content, response, loading } = state;

  const create = async (e) => {
    dispatch({ type: "loading", loading: true });
    e.preventDefault();

    const response = await createList(title, content, uuid);
    dispatch({ type: "response", response });
    dispatch({ type: "loading", loading: false });
    if (!!response?.success) {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  return (
    <div className="card flex flex-col items-center bg-violet-300 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-violet-300 dark:bg-violet-300 dark:hover:bg-violet-300">
      <div className="flex flex-col justify-between p-2 leading-normal">
        {response && (
          <div
            className={`${
              response.success
                ? "bg-green-200 border-2 border-green-800 text-green-800"
                : "bg-red-200 border-2 border-red-800 text-red-800"
            } py-2 px-5 my-10 text-center`}
          >
            <span className="font-bold">
              {response.success
                ? `Success ${response.message}`
                : `Failure: ${response.error.message}`}
            </span>
          </div>
        )}

        <h1 className="my-3 h1 text-center">Create A List</h1>
        <form
          onSubmit={create}
          className={loading ? "opacity-[10%] pointer-events-none" : ""}
        >
          {Object.keys(initialState)
            .filter((k) => !["response", "loading"].includes(k))
            .map((key) => {
              let type = "text";
              if (key === "title") {
                type = "title";
              } else if (key === "content") {
                type = "content";
              }

              return (
                <p key={key} className="mb-2">
                  <label className="h3 capitalize w-[75px] inline-block"></label>
                  <input
                    className="form__field"
                    placeholder={key}
                    required
                    name={key}
                    onChange={(e) => {
                      dispatch({ type: e.target.name, value: e.target.value });
                    }}
                    value={state[key]}
                    type={type}
                  />
                </p>
              );
            })}
          <div className="flex justify-center my-10">
            <input className="button small" type="submit"></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateList;
