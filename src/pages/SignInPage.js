import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import NewNameContext from "../context/NewNameContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function SignInPage() {
  const { setCurrentUser } = useContext(NewNameContext);
  const [load, setload] = useState(false);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("session");
    if (tokenFromStorage) {
      const token = JSON.parse(tokenFromStorage);
      setCurrentUser(token);
      navigate("/home");
    }
  }, [navigate, setCurrentUser]);

  function handleFormSubmit(e) {
    e.preventDefault();
    setload(true);
    axios
      .post(`${apiUrl}/login`, formData)
      .then((res) => {
        const user = res.data;
        setCurrentUser(user);
        localStorage.setItem("session", JSON.stringify(user));
        navigate("/home");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(`Ocorreu um erro: ${error.response.data}`);
        } else {
          alert("Ocorreu um erro desconhecido.");
        }
      })
      .finally(() => setload(false));
  }
  return (
    <SingInContainer>
      <form onSubmit={handleFormSubmit}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          minLength={3}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button type="submit">{load ? "Carregando..." : "Entrar"}</button>
      </form>
      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  body {
    overflow: hidden;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    border-radius: 5px;
    gap: 15px;
    margin: 0 auto;

    @media (max-width: 600px) {
      max-width: 300px;
    }
  }

  input {
    font-size: 20px;
    width: 100%;
    border-radius: 5px;
    outline: none;
    border: 1px solid #ccc;
    padding: 15px;
    margin: 1px;
    :focus {
      border: 2px solid #ffb6b6;
      margin: 0px;
    }
  }

  input:disabled {
    background: #dadada;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #a328d6;
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 30px;

    @media (max-width: 600px) {
      margin-top: 30px;
      margin-bottom: 60px;
    }
  }
`;
