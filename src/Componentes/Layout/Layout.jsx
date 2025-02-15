import style from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../index.js";

export default function Layout() {
  return (
    <div id={style.layout}>
      <Header />
      <main id={style.layout_main_content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
