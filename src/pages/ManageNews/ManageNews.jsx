import { useNavigate, useParams } from "react-router-dom";
import { AddNewsContainer } from "./ManageNewsStyled";
import { newsSchema } from "../../schemas/newsSchema";
import { createNews, getNewsById } from "../../services/postsServices";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useEffect } from "react";

export function ManageNews() {
  const { action, id } = useParams();
  const navigate = useNavigate();

  const {
    register: registerNews,
    handleSubmit: handleRegisterNews,
    formState: { errors: errorsRegisterNews },
    setValue,
  } = useForm({ resolver: zodResolver(newsSchema) });

  async function registerNewsSubmit(data) {
    try {
      await createNews(data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function editNewsSubmit(data) {
    // try {
    //   await editNews(data);
    //   navigate("/profile");
    // } catch (error) {
    //   console.log(error);
    // }
  }

  async function findNewsById(id) {
    try {
      const { data } = await getNewsById(id);
      setValue("title", data.title);
      setValue("banner", data.banner);
      setValue("text", data.text);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (action === "edit") {
      findNewsById(id);
    }
  }, []);

  return (
    <AddNewsContainer>
      <h2>{action == "add" ? "Adicionar" : "Atualizar"} Notícia</h2>
      <form
        onSubmit={
          action == "add"
            ? handleRegisterNews(registerNewsSubmit)
            : handleRegisterNews(editNewsSubmit)
        }
      >
        <Input
          type="text"
          placeholder="Titulo"
          name="title"
          register={registerNews}
        />
        {errorsRegisterNews.title && (
          <ErrorSpan>{errorsRegisterNews.title.message}</ErrorSpan>
        )}
        <Input
          type="text"
          placeholder="Link da imagem"
          name="banner"
          register={registerNews}
        />
        {errorsRegisterNews.banner && (
          <ErrorSpan>{errorsRegisterNews.banner.message}</ErrorSpan>
        )}
        <Input
          type="text"
          placeholder="Texto"
          name="text"
          register={registerNews}
          isInput={false}
        />
        {errorsRegisterNews.text && (
          <ErrorSpan>{errorsRegisterNews.text.message}</ErrorSpan>
        )}

        <Button
          type="submit"
          text={action === "add" ? "Adicionar" : "Atualizar"}
        />
      </form>
    </AddNewsContainer>
  );
}
