import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { CarCard } from "../../components/organisms/CarCard/CarCard";
import { Login } from "../../components/organisms/LoginBlock/Login";
import { pullTokens } from "../../store/login/selectors";
import { useCookies } from "react-cookie";

export const AppRoute = () => {
  const tokens = useSelector(pullTokens);
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);

  const arrTokens = [
    tokens?.access_token,
    tokens?.refresh_token,
    cookies.access_token,
    cookies.refresh_token,
  ];
  const tokenPresence = arrTokens.some((token) => token);

  useEffect(() => {
    if (tokenPresence) {
      setCookie("access_token", tokens?.access_token, { path: "/" });
      setCookie("refresh_token", tokens?.refresh_token, { path: "/" });
      navigate("admin/card/car");
    }
  }, [tokens]);

  useEffect(() => {
    if (
      location.pathname !== "admin/login" &&
      cookies.refresh_token === undefined
    ) {
      navigate("admin/login");
    }
  }, []);

  return (
    <Routes>
      {tokenPresence ? (
        <Route path="admin/card/car" element={<CarCard />} />
      ) : (
        <Route path="admin/login" element={<Login />} />
      )}
    </Routes>
  );
};
