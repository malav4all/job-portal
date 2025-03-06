import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProtectedRoute = ({ children }: { children: any }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token = useSelector((state: any) => state.auth.token);
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
