"use client";

import { api, setToken } from "@/trpc/react";
import { useEffect, useMemo, useState } from "react";

const useUser = () => {
  const [mounted, setMounted] = useState(false);
  const [safeToMakeApiCall, setSafeToMakeApiCall] = useState(false);

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (token) {
      setToken(token);
      setSafeToMakeApiCall(true);
    } else {
      setSafeToMakeApiCall(false);
    }
    setMounted(true);
  }, []);

  const {
    data: user,
    isLoading,
    isError,
    status,
  } = api.auth.me.useQuery(undefined, {
    enabled: safeToMakeApiCall,
  });

  const authStatus:
    | "unAuthenticated"
    | "authenticated"
    | "pending"
    | undefined = useMemo(() => {
    if (!mounted) return "pending";
    const token = localStorage?.getItem("token");
    if (status === "success" && user) return "authenticated";
    if (status === "error" || !token) {
      return "unAuthenticated";
    }
    return "pending";
  }, [user, status, mounted]);

  return {
    user,
    isLoading,
    isError,
    status: authStatus,
  };
};

export default useUser;
