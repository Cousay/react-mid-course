import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import tokenMethod from "../../utils/token";
import { MODAL_TYPE } from "../../constants/general";
import { useEffect } from "react";

const PrivateRoute = ({ redirectPath = "/" }) => {
  const { handleShowModal } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!!tokenMethod.get()) {
      handleShowModal?.(MODAL_TYPE.login);
    }
  }, [handleShowModal]);

  if (!!!tokenMethod.get()) {
    if (redirectPath) {
      return <Navigate to={redirectPath} />;
    } else {
      navigate(-1);
    }
  }

  return <Outlet />;
};

export default PrivateRoute;
