import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function useQuickOut() {
  const { userName, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userName) navigate("/");
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);
}
