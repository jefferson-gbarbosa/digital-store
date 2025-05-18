import FacebookIcon from '../assets/facebook.svg';
import InstagramIcon from '../assets/instagram.svg';
import TwitterIcon from '../assets/twitter.svg';
import Logo from './Logo';
import logo from "../assets/logo-footer.svg";

const Footer = () => {
  const companyInfo = [
    { text: "Sobre Drip Store", link: "/" },
    { text: "Segurança", link: "/" },
    { text: "Wishlist", link: "/" },
    { text: "Blog", link: "/" },
    { text: "Trabalhe conosco", link: "/" },
    { text: "Meus pedidos", link: "/" }
  ];

  const categoriesInfo = [
    { text: "Camisetas", link: "/" },
    { text: "Calças", link: "/" },
    { text: "Bonés", link: "/" },
    { text: "Headphones", link: "/" },
    { text: "Tênis", link: "/" }
  ];

  return (
    <footer className="bg-[#1A1A1A] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:gap-40">
        <div className="flex flex-col gap-6">
          <Logo img={{ src: logo, alt: "Logo Footer" }} />
          <p className="text-sm leading-relaxed max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
          </p>
          <div className="flex gap-6 text-xl">
            <a href="#"><img src={FacebookIcon} alt="Facebook" /></a>
            <a href="#"><img src={InstagramIcon} alt="Instagram" /></a>
            <a href="#"><img src={TwitterIcon} alt="Twitter" /></a>
          </div>
        </div>
        <div className="flex flex-row gap-15">
          <div>
            <h3 className="font-semibold text-base mb-4">Informação</h3>
            <ul className="space-y-2 text-sm">
              {companyInfo.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="hover:underline">{item.text}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm">
              { categoriesInfo .map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="hover:underline">{item.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-base mb-4">Contato</h3>
          <p className="text-sm leading-relaxed">
            Av. Santos Dumont, 1510 - 1 andar -<br />
            Aldeota, Fortaleza - CE, 60150-161
          </p>
          <p className="text-sm mt-2">(85) 3051-3411</p>
        </div>
      </div>
      <div>
               <hr className="border-white/20 mt-6" />
        <p className="text-center text-xs pt-4">@ {new Date().getFullYear()} Digital College</p>
      </div>
    </footer>
  );
};

export default Footer;