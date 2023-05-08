import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AddTransactionsPage from "./pages/AddTransactionPage";
import EditTransactionsPage from "./pages/EditTransactionPage";
import AuthContext from "./contexts/AuthContext";
import { useState } from "react";
import { mainColor } from "./constants/colors";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  return (
    <PagesContainer>
      <AuthContext.Provider value={{ token, setToken, userName, setUserName }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/nova-transacao/:type" element={<AddTransactionsPage />} />
            <Route path="/editar-transacao/:type" element={<EditTransactionsPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  background-color: ${mainColor};
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`;
