import { Navigate } from "react-router";

export default function AuthRoute({ children }) {
  if (localStorage.getItem("userToken")) {
    return <Navigate to="/home" />;
  }
  return <>{children}</>;
}
