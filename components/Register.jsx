
"use client";

import { registerUser } from "@/app/utils/data";
import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const router = useRouter();

  function reducer(state, action) {
    switch (action.type) {
      case "email":
      case "name":
      case "slug":
      case "password":
        return { ...state, [action.type]: action.value };
      case "loading":
        return { ...state, loading: action.loading };
      case "response":
        return { ...state, response: action.response };
    }

    throw Error("Unknown action." + action.type);
  }

  const initialState = {
    email: "",
    name: "",
    slug: "",
    password: "",
    response: "",
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, name, slug, password, response, loading } = state;

  const register = async (e) => {
    dispatch({ type: "loading", loading: true });
    e.preventDefault();

    const response = await registerUser(email, password, name, slug);
    dispatch({ type: "response", response });
    dispatch({ type: "loading", loading: false });
    if (!!response?.success) {
      setTimeout(() => {
        router.push("/login");
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
        <h1 className="my-3 h1 text-center">Register for an Account!</h1>
        <h1 className="text-4xl">
          <FontAwesomeIcon icon={faUsers} />
        </h1>
        <form
          onSubmit={register}
          className={loading ? "opacity-[10%] pointer-events-none" : ""}
        >
          {/* ["email", "name", "slug", "password", "response", "loading"] */}
          {Object.keys(initialState)
            .filter((k) => !["response", "loading"].includes(k))
            .map((key) => {
              let type = "text";
              if (key === "password") {
                type = "password";
              } else if (key === "email") {
                type = "email";
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

export default Register;
