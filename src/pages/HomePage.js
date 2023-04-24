import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import NewNameContext from "../context/NewNameContext";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { currentUser, setCurrentUser } = useContext(NewNameContext);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState({ value: 0, order: "" });
  const [load, setLoad] = useState(false);

  const updateTransactions = useCallback(
    (token) => {
      const config = {
        headers: {
          Authorization: `Bearer ${
            currentUser.token ? currentUser.token : token.token
          }`,
        },
      };
      setLoad(true);
      axios
        .get(`${apiUrl}/transactions`, config)
        .then((res) => {
          setLoad(false);
          const transactions = res.data.transactions.reverse();
          const amount = transactions.reduce((totalAmount, transaction) => {
            return transaction.type === "withdraw"
              ? totalAmount - transaction.value
              : totalAmount + transaction.value;
          }, 0);

          setTransactions(transactions);
          setAmount({
            value: Math.abs(amount),
            order: amount < 0 ? "negativo" : "positivo",
          });
        })
        .catch((error) => {
          setLoad(false);
          if (error.response && error.response.data) {
            alert(`Ocorreu um erro: ${error.response.data}`);
          } else {
            alert("Ocorreu um erro desconhecido.");
          }
        });
    },
    [apiUrl, currentUser]
  );

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("session");
    if (tokenFromStorage) {
      const token = JSON.parse(tokenFromStorage);
      setCurrentUser(token);
      updateTransactions(token);
    } else {
      navigate("/");
    }
  }, [navigate, setCurrentUser, updateTransactions]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleDeleteTransaction = async (id, title) => {
    const confirmationMessage = `Deseja deletar: ${title}?`;

    if (window.confirm(confirmationMessage)) {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      setLoad(true);
      try {
        await axios.delete(`${apiUrl}/transactions/${id}`, config);
        updateTransactions();
      } catch (error) {
        alert(`Ocorreu um erro: ${error.response.data}`);
      } finally {
        setLoad(false);
      }
    }
  };

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {currentUser.name}</h1>
        <BiExit onClick={handleLogout} />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map((transaction) => (
            <ListItemContainer key={transaction.id}>
              <TransactionDescription>
                <span>{transaction.date.slice(0, 5)}</span>
                <strong>{transaction.description}</strong>
              </TransactionDescription>
              <div>
                <Value
                  color={
                    transaction.type === "withdraw" ? "negativo" : "positivo"
                  }
                >
                  {(transaction.value / 100).toFixed(2)}
                </Value>
                <button
                  onClick={() =>
                    handleDeleteTransaction(
                      transaction.id,
                      transaction.description
                    )
                  }
                >
                  x
                </button>
              </div>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={amount.order}>
            {(Number(amount.value) / 100).toFixed(2)}
          </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button
          onClick={() => navigate("/nova-transacao/entrada")}
          disabled={load}
        >
          <AiOutlinePlusCircle />
          <p>
            Nova <br /> entrada
          </p>
        </button>
        <button
          onClick={() => navigate("/nova-transacao/saida")}
          disabled={load}
        >
          <AiOutlineMinusCircle />
          <p>
            Nova <br />
            saída
          </p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  font-weight: 400;
  font-family: "Raleway", sans-serif;
  color: white;
`;

const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  height: calc(100% - 170px);
  color: #000;
  border-radius: 5px;
  padding: 16px;

  ul {
    height: 100%;
    margin-bottom: 13px;
    overflow-y: scroll;
    padding-bottom: 10px;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  article {
    display: flex;
    justify-content: space-between;

    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ButtonsContainer = styled.section`
  margin: 15px 0 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #a328d6;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 22px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    padding: 12px;

    p {
      font-size: 18px;
    }
  }
`;

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;

const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000;
  margin-right: 10px;
  line-height: 20px;

  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }

  div:nth-child(2) {
    display: flex;
    align-items: center;

    button {
      font-size: 16px;
      padding: 0;
      margin-left: 11px;
      color: #c6c6c6;
      background: none;
      outline: none;
      border: none;
    }
  }
`;

const TransactionDescription = styled.div`
  max-width: auto;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
