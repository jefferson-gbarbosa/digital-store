import React from "react";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import Logo from "./Logo";
import cartIcon from "../assets/mini-cart.svg";
import "primeicons/primeicons.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import logo from "../assets/logo-header.svg";

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ menuOpen, setMenuOpen }) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/produtos", label: "Produtos" },
    { path: "/categorias", label: "Categorias" },
    { path: "/meuspedidos", label: "Meus pedidos" },
  ];

  return (
    <header className={clsx(
      "w-full bg-white z-50 relative transition-all duration-300",
      searchOpen ? "h-[120px]" : "h-[72px]",
      "md:h-[192px] pb-3.5"
    )}>
      <nav className="flex flex-col md:flex-row items-center md:flex-none md:items-start max-w-7xl h-full mx-auto px-4 justify-between md:justify-normal md:gap-6 md:pt-3.5 py-5">
        {/* Mobile Top Bar */}
        <div className="flex items-center justify-between w-full md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
             <i
                className={clsx(
                  "text-2xl cursor-pointer transition-colors duration-200",
                  menuOpen ? "pi pi-times" : "pi pi-align-justify text-dark-gray"
                )}
              />
          </button>

          <div className="w-[138px] h-[24px] flex items-center">
            <Logo img={{ src: logo, alt: "Logo Header" }} />
          </div>

          <div  className="relative flex items-center gap-3">
            <i
              className={clsx(
                "pi pi-search cursor-pointer transition-colors duration-200",
                searchOpen ? "text-primary" : "text-light-gray-2 opacity-60"
              )}
              onClick={() => setSearchOpen(!searchOpen)}
            />
            
            <NavLink to='/carrinho'>
              <img src={cartIcon} alt="Carrinho de compras" />
              <Badge value="3" severity="danger" className="absolute -top-2 -right-3 w-[18px] h-[18px] text-[12px] font-inter font-bold leading-[18px] tracking-[0.5px] text-[#FFFFFF] bg-[#EE4266]" />
            </NavLink>
            
          </div>
        </div>
        {searchOpen && (
          <div
            className={clsx(
              "w-full px-4 md:hidden relative",
              menuOpen ? "mt-6" : "mt-2"
            )}
          >
          <i className="pi pi-search absolute right-8 top-1/2 transform -translate-y-1/2 text-light-gray-2 opacity-60 cursor-pointer" />
          <input
            type="text"
            placeholder="Pesquisar produto..."
            className="w-full bg-[rgba(71,71,71,0.04)] placeholder:text-dark-gray-3 rounded-[8px] outline-none p-3"
            autoFocus
          />
        </div>
        )}
        {/* Mobile Sidebar Menu */}
        
<div
  className={`fixed top-[72px] left-0 w-[75%] max-w-[300px] h-[calc(100vh-72px)] bg-white z-50 p-5 shadow-md flex flex-col justify-between md:hidden
    transform transition-transform duration-500 ease-in-out
    ${menuOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"}
  `}
>
  <div>
    <h2 className="text-dark-gray-2 font-bold text-base leading-6 tracking-[0.75px] mt-6 mb-3">Páginas</h2>
    <ul className="flex flex-col gap-3">
      {navItems.map(({ path, label }) => (
        <li key={path}>
          <NavLink
            to={path}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              clsx(
                "font-normal text-base leading-7 tracking-[0.75px] transition-colors duration-200",
                isActive ? "text-primary underline underline-offset-4" : "text-dark-gray-2"
              )
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>

  <div className="border-t border-t-dark-gray-3 pt-4 flex flex-col gap-2">
    <Button
      label="Entrar"
      className="bg-[#C92071] text-white font-bold rounded-lg h-10"
      onClick={() => setMenuOpen(false)}
    />
    <button
      className="text-sm underline text-center text-gray-700"
      onClick={() => setMenuOpen(false)}
    >
      Cadastre-se
    </button>
  </div>
</div>

      {/* Desktop Header */}
        <div className="hidden md:flex flex-1 justify-between py-4">
          <div className="w-[253px] h-[44px]">
            <Logo img={{ src: logo, alt: "Logo Header" }} />
          </div>
          <div className="flex-1 min-w-[200px] px-4">
            <span className="relative w-full block">
              <i className="pi pi-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 opacity-60 cursor-pointer" />
              <input
                placeholder="Pesquisar produto..."
                className="w-full bg-[rgba(71,71,71,0.04)] placeholder:text-dark-gray-3 rounded-[8px] outline-none p-3"
              />
            </span>
          </div>
          <div className="flex items-center gap-5 mr-8">
            <Button
              label="Cadastrar"
              className="text-[#474747] text-[16px] font-inter font-normal leading-[28px] tracking-[0.75px] underlin cursor-pointer"
            />
            <Button
              label="Entrar"
              className="w-28 h-10 bg-[#C92071] text-[#F5F5F5] text-sm leading-5 font-bold rounded-lg cursor-pointer"
            />
            <NavLink to="/carrinho" className="relative">
              <img src={cartIcon} alt="Carrinho de compras" />
              <Badge value="3" severity="danger" className="absolute -top-2 -right-3 w-[18px] h-[18px] text-[12px] font-inter font-bold leading-[18px] tracking-[0.5px] text-[#FFFFFF] bg-[#EE4266]" />
            </NavLink>
          </div>
        </div>
        {/* Desktop Menu Links */}
        <ul className="hidden md:flex gap-8 absolute bottom-6">
          {navItems.map(({ path, label }) => (
            <li key={path} className="font-normal text-[16px] leading-[28px] tracking-[0.75px]">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  clsx(
                    "transition-colors duration-200 hover:text-primary",
                    isActive ? "text-primary underline underline-offset-4" : "text-dark-gray-2"
                  )
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
