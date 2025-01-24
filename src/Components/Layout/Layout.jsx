import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container flex-1 py-5 mt-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
