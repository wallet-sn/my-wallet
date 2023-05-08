import useQuickOut from "../../hooks/useQuickOut";
import { useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useAddTransaction } from "../../services/transactions";
import { TransactionsContainer } from "./styled";

export default function AddTransactionsPage() {
  const { form, handleForm } = useForm({ description: "", value: "" });
  const { type } = useParams();
  const typeText = type === "entrada" ? "Entrada" : "Saída";
  const addTransaction = useAddTransaction();
  useQuickOut();

  function submitForm(e) {
    e.preventDefault();
    const body = { ...form, type: type === "entrada" ? "income" : "expense" };
    addTransaction(body);
  }

  return (
    <TransactionsContainer>
      <h1>Nova {typeText}</h1>
      <form onSubmit={submitForm}>
        <input
          required
          type="number"
          placeholder="Valor"
          name="value"
          value={form.value}
          onChange={handleForm}
        />
        <input
          required
          placeholder="Descrição"
          name="description"
          value={form.description}
          onChange={handleForm}
        />
        <button type="submit">Salvar {typeText}</button>
      </form>
    </TransactionsContainer>
  );
}
