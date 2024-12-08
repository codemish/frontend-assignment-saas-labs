import { PATHS } from "../enums";
import { Routes, Route, Navigate } from "react-router";

const Router = () => {
  return (
    <Routes>
      {Object.values(PATHS).map(({ Component, url, name }) => (
        <Route path={url} element={<Component />} />
      ))}
      <Route path="/" element={<Navigate to="/product/details" replace />} />
    </Routes>
  );
};

export default Router;
