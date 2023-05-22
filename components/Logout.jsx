"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/utils/data";

const Logout = () => {
  const [error, setError] = useState(undefined);
  const router = useRouter();
  useEffect(() => {
    const innerLogout = async () => {
      const { success, error } = await logout();
      if (!success) {
        setError(error.message);
      }
      setTimeout(() => router.replace("/"), error ? 4000 : 2000);
    };
    innerLogout();
  }, []);

  return (
    <div className="my-10">
      <p className="text-center">Logging out, please wait...</p>
      {error && <p style={{ color: "#C20000" }}>Error: {error}</p>}
    </div>
  );
};

export default Logout;
