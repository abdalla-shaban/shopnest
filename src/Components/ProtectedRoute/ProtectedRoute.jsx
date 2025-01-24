import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  if (!localStorage.getItem("userToken")) {
    return <Navigate to="/login" />;
  }
  return <>{children} </>;
}
