import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import useQuickOut from "../../hooks/useQuickOut";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useLogout } from "../../services/auth";
import TransactionItem from "../../components/TransactionItem/TransactionItem";
import { Oval } from "react-loader-spinner";
import { useGetTransactions } from "../../services/transactions";
import { useNavigate } from "react-router-dom";
import { HomeContainer, Header, TransactionsContainer, ListContainer, Value, ButtonsContainer } from "./styled";
import { mainColor, mainColorLight } from "../../constants/colors";

export default function HomePage() {
  const { userName } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = useLogout();
  const { transactions, getTransactions } = useGetTransactions();
  useQuickOut();

  function calcBalance() {
    const sum = transactions.reduce(
      (acc, cur) => (cur.type === "income" ? acc + cur.value : acc - cur.value),
      0
    );
    return sum.toFixed(2);
  }

  const balance = transactions && calcBalance();

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {userName}</h1>
        <BiExit onClick={logout} />
      </Header>

      <TransactionsContainer>
        {!transactions && (
          <Oval color={mainColor} secondaryColor={mainColorLight} />
        )}
        {transactions && transactions.length === 0 && (
          <>Não há registros de entrada ou saída</>
        )}
        {transactions && transactions.length > 0 && (
          <ListContainer>
            <ul>
              {transactions.map((t) => (
                <TransactionItem
                  key={t._id}
                  transaction={t}
                  getTransactions={getTransactions}
                />
              ))}
            </ul>
            <article>
              <strong>Saldo</strong>
              <Value color={balance > 0 ? "positivo" : "negativo"}>
                {balance.toString().replace(".", ",")}
              </Value>
            </article>
          </ListContainer>
        )}
      </TransactionsContainer>

      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>
            Nova <br /> entrada
          </p>
        </button>
        <button onClick={() => navigate("/nova-transacao/saida")}>
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
