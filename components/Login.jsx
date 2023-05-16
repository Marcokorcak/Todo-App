"use client";

import React, { useState } from "react";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="card flex flex-col items-center bg-violet-300 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-violet-300 dark:bg-violet-300 dark:hover:bg-violet-300">
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h1>LOGIN</h1>
        <div className="form__group field">
          <input
            class="form__field"
            placeholder="User Name"
            name="username"
            id="username"
            required
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="form__field"
            placeholder="Password"
            name="password"
            id="pass"
            required
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <span className="relative invisible">Submit</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
