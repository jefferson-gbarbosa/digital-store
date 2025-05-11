import React from "react";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import Logo from "./Logo";
import cartIcon from "../assets/mini-cart.svg";
import 'primeicons/primeicons.css';
import { NavLink } from "react-router-dom";
import clsx from "clsx";
        
const Header: React.FC = () => {
  return (
    <header className="w-full h-[192px]">
      <div className="max-w-7xl h-full mx-auto px-4 pt-8">
        {/* Linha principal: logo, busca, ações */}
        <div className="flex items-center justify-between py-4 mb-7 gap-6 flex-wrap">
          {/* Logo */}
          <Logo />
          {/* Campo de Busca */}
          <div className="flex-1 min-w-[200px]">
            <span className="relative w-full">
              <i className="pi pi-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 opacity-60" />
              <input placeholder="Pesquisar produto..." className="w-full bg-gray-100 placeholder:text-gray-400 rounded-[8px] outline-none p-3" />
            </span>
          </div>
          {/* Ações */}
          <div className="flex items-center gap-5 mr-8">
            <Button label="Cadastrar" className="text-[#474747] text-[16px] font-inter font-normal leading-[28px] tracking-[0.75px] underline decoration-solid text-base p-button-text p-button-sm cursor-pointer" />
            <Button label="Entrar" className="w-28 h-10 bg-[#C92071] text-[#F5F5F5] text-sm leading-5 font-bold rounded-lg p-button-sm cursor-pointer" />
          </div>
            {/* Carrinho com Badge */}
            <div className="relative">
              <img src={cartIcon} alt="Carinho de compras" />
              <Badge value="3" severity="danger" className="absolute -top-2 -right-3 w-[18px] h-[18px] text-[12px] font-inter font-bold leading-[18px] tracking-[0.5px] text-[#FFFFFF] bg-[#EE4266]" />
            </div>
        </div>
        {/* Menu de navegação */}
        <ul className="flex gap-3">
            <li className="font-normal text-[16px] leading-[28px] tracking-[0.75px]">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  clsx(
                    "transition-colors duration-200 hover:text-primary",
                    isActive ? "text-primary underline underline-offset-4" : "text-dark-gray-2"
                  )
                }
              >
                Home
              </NavLink>
            </li>
            <li className="font-normal text-[16px] leading-[28px] tracking-[0.75px]">
              <NavLink
                to="/produtos"
                className={({ isActive }) =>
                  clsx(
                    "transition-colors duration-200 hover:text-primary",
                    isActive ? "text-primary underline underline-offset-4" : "text-dark-gray-2"
                  )
                }
              >
                Produtos
              </NavLink>
            </li>
            <li className="font-normal text-[16px] leading-[28px] tracking-[0.75px]">
              <NavLink
                to="/categorias"
                className={({ isActive }) =>
                  clsx(
                    "transition-colors duration-200 hover:text-primary",
                    isActive ? "text-primary underline underline-offset-4" : "text-dark-gray-2"
                  )
                }
              >
                Categorias
              </NavLink>
            </li>
            <li className="font-normal text-[16px] leading-[28px] tracking-[0.75px]">
              <NavLink
                to="/meuspedidos"
                className={({ isActive }) =>
                  clsx(
                    "transition-colors duration-200 hover:text-primary",
                    isActive ? "text-primary underline underline-offset-4" : "text-dark-gray-2"
                  )
                }
              >
                Meus pedidos
              </NavLink>
            </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
