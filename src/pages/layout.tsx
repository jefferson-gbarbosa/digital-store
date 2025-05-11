import Footer from "../components/Footer";
import Header from "../components/Header";
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
         {children}
      <Footer />
    </div>
  );
};

export default Layout;