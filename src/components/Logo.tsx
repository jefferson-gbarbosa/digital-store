import React from "react";
import { Link } from "react-router-dom"; 
import logo from "../assets/logo-header.svg";

const Logo: React.FC = () => {
  return (
    <Link to="/">
     <img src={logo} alt="Logo" className="h-10" />
    </Link>
  );
};

export default Logo;
