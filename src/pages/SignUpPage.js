import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";

export default function SignupPage() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    loading: false,
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      return alert("As senhas inseridas não são iguais!");
    }
    setFormData({ ...formData, loading: true });
    axios
      .post(`${apiUrl}/cadastro`, formData)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(`Ocorreu um erro: ${error.response.data}`);
        } else {
          alert("Ocorreu um erro desconhecido.");
        }
      })
      .finally(() => {
        setFormData({ ...formData, loading: false });
      });
  }

  return (
    <SignUpContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={formData.loading}
          required
        />
        <input
          placeholder="E-mail"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={formData.loading}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          minLength={3}
          value={formData.password}
          disabled={formData.loading}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          minLength={3}
          value={formData.repeatPassword}
          disabled={formData.loading}
          onChange={(e) =>
            setFormData({ ...formData, repeatPassword: e.target.value })
          }
          required
        />
        <button type="submit" disabled={formData.loading}>
          {formData.loading ? "Carregando..." : "Cadastrar"}
        </button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.section`
  height: 100%;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    border-radius: 5px;
    gap: 15px;
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
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    width: 100%;
    padding: 12px;
  }

  a {
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: white;
    text-decoration: none;
    padding-top: 30px;
  }

  @media (max-width: 768px) {
    max-width: 600px;

    form {
      max-width: 300px;
    }
  }

  @media (max-width: 480px) {
    max-width: 400px;

    form {
      max-width: 200px;
    }

    input {
      font-size: 16px;
    }

    button {
      font-size: 16px;
    }

    a {
      font-size: 13px;
    }
  }
`;
