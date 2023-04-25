import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import dayjs from "dayjs";

export default function TransactionsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { currentUser, setcurrentUser } = useContext(UserContext);
  const [formData, setformData] = useState({
    description: "",
    value: "",
    type: "",
  });
  const [load, setload] = useState(false);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("session");
    if (tokenFromStorage) {
      setcurrentUser(JSON.parse(tokenFromStorage));
    } else {
      navigate("/");
    }
  }, [navigate, setcurrentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    const date = dayjs().format("DD/MM/YYYY");
    const body = {
      ...formData,
      value: (Number(parseFloat(formData.value).toFixed(2)) * 100).toString(),
      type: params.tipo === "entrada" ? "deposit" : "withdraw",
      date,
    };
    const config = {
      headers: { Authorization: `Bearer ${currentUser.token}` },
    };
    setload(true);
    axios
      .post(`${apiUrl}/transactions`, body, config)
      .then(() => navigate("/home"))
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
    <TransactionsContainer>
      <h1>Nova {params.tipo}</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Valor"
          type="number"
          value={formData.value}
          onChange={(e) => setformData({ ...formData, value: e.target.value })}
          disabled={load}
          required
        />
        <input
          placeholder="Descrição"
          type="text"
          value={formData.description}
          onChange={(e) =>
            setformData({ ...formData, description: e.target.value })
          }
          disabled={load}
          required
        />
        <button type="submit" disabled={load}>
          {load ? "Salvando..." : `Salvar ${params.tipo}`}
        </button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 100%;
    border-radius: 5px;
  }
  h1 {
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 26px;
    color: white;
    align-self: flex-start;
    margin-bottom: 40px;
    line-height: 31px;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
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
    ::placeholder {
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 23px;
    }
  }
  input:disabled {
    background: #dadada;
  }
`;
