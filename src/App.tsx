import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
