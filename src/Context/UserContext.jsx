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
  const [userToken, setUserToken] = useState(null);

  const { data: user, refetch } = useQuery({
    queryKey: ["verifyToken"],
    queryFn: verifyToken,
  });
  // const verifyToken = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_BASE_URL}/auth/verifyToken`,
  //       {
  //         headers: {
  //           token: localStorage.getItem("userToken"),
  //         },
  //       }
  //     );
  //     setUser(data);
  //   } catch (error) {
  //     setUser(null);
  //     toast.error(error.response.data.message);
  //   }
  // };

  useEffect(() => {
    localStorage.getItem("userToken") &&
      setUserToken(localStorage.getItem("userToken"));
  }, []);

  return (
    <UserContext.Provider value={{ userToken, setUserToken, user }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
