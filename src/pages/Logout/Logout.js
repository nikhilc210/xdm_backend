import React, { useEffect } from "react";

export default function Logout() {
  const doLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    doLogout();
  }, []);

  return <div>Logout...</div>;
}
