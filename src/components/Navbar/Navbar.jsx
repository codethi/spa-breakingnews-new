import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../images/LogoBN.png";
import {
  ErrorSpan,
  ImageLogo,
  InputSpace,
  Nav,
  UserLoggedSpace,
} from "./NavbarStyled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
import { searchSchema } from "../../schemas/searchSchema";
import { userLogged } from "../../services/userServices";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/UserContext";

export function Navbar() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function onSearch(data) {
    const { title } = data;
    navigate(`/search/${title}`);
    reset();
  }
  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function signout() {
    Cookies.remove("token");
    setUser(undefined);
    navigate("/");
  }

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
  }, []);

  return (
    <>
      <Nav>
        <form onSubmit={handleSubmit(onSearch)}>
          <InputSpace>
            <button type="submit">
              <i className="bi bi-search"></i>
            </button>

            <input
              {...register("title")}
              type="text"
              placeholder="Pesquise por um título"
            />
          </InputSpace>
        </form>

        <Link to="/">
          <ImageLogo src={logo} alt="Logo do Breaking News" />
        </Link>

        {user ? (
          <UserLoggedSpace>
            <Link to="/profile">
              <h2>{user.name}</h2>
            </Link>

            <i className="bi bi-box-arrow-right" onClick={signout}></i>
          </UserLoggedSpace>
        ) : (
          <Link to="/auth">
            <Button type="button" text="Entrar">
              Entrar
            </Button>
          </Link>
        )}
      </Nav>
      {errors.title && <ErrorSpan>{errors.title.message}</ErrorSpan>}
      <Outlet />
    </>
  );
}
