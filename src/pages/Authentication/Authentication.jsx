import { useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { AuthContainer, Section } from "./AuthenticationStyled";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../../schemas/signinSchema";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { signupSchema } from "../../schemas/signupSchema";
import { signin, signup } from "../../services/userServices";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function Authentication() {
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    formState: { errors: errorsSignin },
  } = useForm({ resolver: zodResolver(signinSchema) });

  async function inHanleSubmit(data) {
    try {
      const response = await signin(data);
      Cookies.set("token", response.data, { expires: 1 });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();

  async function upHanleSubmit(data) {
    try {
      const response = await signup(data);
      Cookies.set("token", response.data, { expires: 1 });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContainer>
      <Section type="signin">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmitSignin(inHanleSubmit)}>
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            register={registerSignin}
          />
          {errorsSignin.email && (
            <ErrorSpan>{errorsSignin.email.message}</ErrorSpan>
          )}
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            register={registerSignin}
          />
          {errorsSignin.password && (
            <ErrorSpan>{errorsSignin.password.message}</ErrorSpan>
          )}
          <Button type="submit" text="Entrar" />
        </form>
      </Section>

      <Section type="signup">
        <h2>Cadastrar</h2>
        <form onSubmit={handleSubmitSignup(upHanleSubmit)}>
          <Input
            type="text"
            placeholder="Nome"
            name="name"
            register={registerSignup}
          />
          {errorsSignup.name && (
            <ErrorSpan>{errorsSignup.name.message}</ErrorSpan>
          )}
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            register={registerSignup}
          />
          {errorsSignup.email && (
            <ErrorSpan>{errorsSignup.email.message}</ErrorSpan>
          )}
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            register={registerSignup}
          />
          {errorsSignup.password && (
            <ErrorSpan>{errorsSignin.password.message}</ErrorSpan>
          )}
          <Input
            type="password"
            placeholder="Confirmar senha"
            name="confirmPassword"
            register={registerSignup}
          />
          {errorsSignup.confirmPassword && (
            <ErrorSpan>{errorsSignup.confirmPassword.message}</ErrorSpan>
          )}
          <Button type="submit" text="Cadastrar" />
        </form>
      </Section>
    </AuthContainer>
  );
}
