import { type ReactNode } from "react";
import Footer from "./Footer";
import Header from "./home/Header";

type LayoutProps = {
  children: ReactNode;
  handelLogin: () => void;
};

const layout = ({ children, handelLogin }: LayoutProps) => {
  return (
    <>
      <Header handelLoginClick={handelLogin} />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default layout;
