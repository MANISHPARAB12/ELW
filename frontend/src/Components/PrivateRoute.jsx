
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <Navigate
        to="/Login"
        replace
        state={{
          from: location.pathname,
          message: "Please login to access this page."
        }}
      />
    );
  }

  return <Outlet />;
};
