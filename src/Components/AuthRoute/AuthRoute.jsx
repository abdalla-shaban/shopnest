import { Navigate } from "react-router";
import { useUserContext } from "./../../Context/UserContext";

export default function AuthRoute({ children }) {
  const { userToken, isLoading, user } = useUserContext();

  if (userToken && !isLoading && user) {
    return <Navigate to="/home" />;
  }
  return <>{children}</>;
}
