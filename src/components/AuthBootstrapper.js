import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, setBootstrapped } from "../store";

const AuthBootstrapper = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      try {
        dispatch(login({ user: JSON.parse(user), token }));
      } catch {}
    }
    dispatch(setBootstrapped());
  }, [dispatch]);
  return null;
};

export default AuthBootstrapper;
