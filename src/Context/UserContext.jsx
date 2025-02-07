import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

const verifyToken = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/auth/verifyToken`,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  return data;
};

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));

  const {
    data: user,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["verifyToken", userToken],
    queryFn: verifyToken,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (userToken) {
      localStorage.setItem("userToken", userToken);
    }
  }, [userToken]);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("userToken");
      setUserToken(null);
    }
  }, [isError]);

  return (
    <UserContext.Provider
      value={{ userToken, setUserToken, user, refetch, isLoading, isError }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
