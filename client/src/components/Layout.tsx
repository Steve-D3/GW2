import { type ReactNode } from "react";
import Footer from "./Footer";
import Header from "./home/Header";

type LayoutProps = {
  children: ReactNode;
};

const layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default layout;
