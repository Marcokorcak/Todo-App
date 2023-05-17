/* "use client";

import { registerUser } from "@/app/utils/data";
import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  function reducer(state, action) {
    switch (action.type) {
      case "email":
      case "name":
      case "password":
      case "slug":
        return { ...state, [action.type]: action.value };
      case "loading":
        return { ...state, loading: action.loading };
      case "response":
        return { ...state, response: action.response };
    }

    // throw Error("Unknown action." + action.type);
  }

  const initialState = {
    email: "",
    name: "",
    password: "",
    slug: "",
    response: "",
    loading: false,
  };

  const [userName, setUserName] = useState("");
  const [passwordEnter, setPassword] = useState("");
  const [emailEnter, setEmail] = useState("");
  const [error, setError] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, name, slug = name, password, response, loading } = state;

  const register = async (e) => {
    console.log("register called");
    dispatch({ type: "loading", loading: true });
    e.preventDefault();

    const response = await registerUser(name, email, password, name);
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
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h1>Register for an Account!</h1>
        <form
          onSubmit={register}
          className={loading ? "opacity-[10%] pointer-events-none" : ""}
        >
          <div className="form__group field">
            <input
              class="form__field"
              placeholder="Enter a User Name"
              name="name"
              id="name"
              required
              type="name"
              value={name}
              onChange={(e) => {
                dispatch({ type: e.target.name, value: e.target.value });
              }}
            />
            <input
              className="form__field"
              placeholder="Create a Password"
              name="password"
              id="password"
              required
              type="password"
              value={password}
              onChange={(e) => {
                dispatch({ type: e.target.name, value: e.target.value });
              }}
            />
            <input
              className="form__field"
              placeholder="Enter your email"
              name="email"
              id="email"
              required
              type="email"
              value={email}
              onChange={(e) => {
                dispatch({ type: e.target.name, value: e.target.value });
              }}
            />
          </div>
          <br />
          <div className="btn">
            <a
              href="#_"
              className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-violet-600 transition duration-300 ease-out border-2 border-violet-600 rounded-full shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-violet-600 group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-violet-600 transition-all duration-300 transform group-hover:translate-x-full ease">
                Submit
              </span>
              <button onClick={register} className="relative invisible">
                Submit
              </button>
            </a>

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
                  <p key={key} className="mb-5">
                    <label className="h3 capitalize w-[75px] inline-block">
                      {key}*
                    </label>
                    <input
                      className="h3 border-2 border-black ml-5 inline-block w-[220px] px-2"
                      required
                      name={key}
                      onChange={(e) => {
                        dispatch({
                          type: e.target.name,
                          value: e.target.value,
                        });
                      }}
                      value={state[key]}
                      type={type}
                    />
                  </p>
                );
              })}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
 */

"use client";

import { registerUser } from "@/app/utils/data";
import { useReducer } from "react";
import { useRouter } from "next/navigation";

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
        <h1 className="my-8 h1 text-center">Register for an Account!</h1>
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
