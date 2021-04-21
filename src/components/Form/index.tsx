import React from "react";
import style from "./form.module.scss";

export default function Form() {
  return (
    <section className={style.form}>
      <label htmlFor="categories">Categorias</label>
      <select name="categories">
        <option value="1">Categoria 1</option>
        <option value="2">Categoria 2</option>
      </select>

      <label htmlFor="title">Título</label>
      <input name="title"></input>

      <label htmlFor="description">Descrição</label>
      <textarea name="description" rows={5} cols={30} />
      <button type="submit">Cadastrar</button>
    </section>
  );
}
