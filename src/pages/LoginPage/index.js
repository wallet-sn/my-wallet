import { Link } from "react-router-dom";
import MyWalletLogo from "../../components/MyWalletLogo/MyWalletLogo";
import useQuickIn from "../../hooks/useQuickIn";
import useForm from "../../hooks/useForm";
import { useLogin } from "../../services/auth";
import { LoginContainer } from "./styled";

export default function LoginPage() {
  const { form, handleForm } = useForm({ email: "", password: "" });
  const login = useLogin();
  useQuickIn();

  function submitForm(e) {
    e.preventDefault();
    login(form);
  }

  return (
    <LoginContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input
          required
          type="email"
          autoComplete="username"
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleForm}
        />
        <input
          required
          minLength={3}
          type="password"
          autoComplete="new-password"
          placeholder="Senha"
          name="password"
          value={form.password}
          onChange={handleForm}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </LoginContainer>
  );
}
