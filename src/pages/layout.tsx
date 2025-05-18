import Footer from "../components/Footer";
import Header from "../components/Header";
import { ReactNode, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        {menuOpen && (
        <div
          className="fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-dark-gray opacity-40 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
        )}
        {children}
      <Footer />
    </>
  );
};

export default Layout;