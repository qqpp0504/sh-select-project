import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // 將當前路徑編碼並作為參數傳遞
      navigate(`/accounts?redirectTo=${encodeURIComponent(location.pathname)}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return children;
}
