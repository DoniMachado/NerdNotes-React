import style from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id={style.footer}>
      <div id={style.footer_principal}>
        <h2>Luiz Felipe D. Machado</h2>
        <p> Infnet, 2024</p>
        <p> Engenharia de Software</p>
      </div>
      <p>Projeto de Bloco: Desenvolvimento Front-end com Frameworks [24E3_5]</p>
    </footer>
  );
}
