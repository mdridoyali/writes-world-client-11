
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivetRoute = ({ children }) => {
   const {user, loader} = useAuth()
   const location = useLocation();

  if (loader) {
    return (
      <span className="loading loading-infinity loading-lg flex  mx-auto h-[80vh] "></span>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivetRoute;

