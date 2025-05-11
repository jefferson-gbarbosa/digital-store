import FacebookIcon from '../assets/facebook.svg';
import InstagramIcon from '../assets/instagram.svg';
import TwitterIcon from '../assets/twitter.svg';
import Logo from './Logo';

const Footer = () => {
  const companyInfo = [
    { text: "Sobre Drip Store", link: "/about" },
    { text: "Blog", link: "/blog" },
    { text: "Termos de Uso", link: "/terms" },
    { text: "Política de Privacidade", link: "/privacy" }
  ];

  const helpInfo = [
    { text: "Central de Ajuda", link: "/help" },
    { text: "Entregas", link: "/delivery" },
    { text: "Devoluções", link: "/returns" },
    { text: "Pagamentos", link: "/payments" }
  ];

  return (
    <footer className='bg-dark-gray text-white'>
      <div className='max-w-7xl h-full mx-auto pt-30'>
          <div className='flex justify-between pb-10'>
            <div className="max-w-2xs flex flex-col gap-8">
              <Logo />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
              <div className="flex space-x-4 mt-4 text-xl">
                <a href="#"><img src={FacebookIcon} alt="Facebook" /></a>
                <a href="#"><img src={InstagramIcon} alt="Instagram" /></a>
                <a href="#"><img src={TwitterIcon} alt="Twitter" /></a>
              </div>
            </div>
            <div className='flex gap-16'>
                <div className="footer-info">
                  <h3 className='font-semibold text-[18px] leading-[18px] tracking-normal mb-8'>Informações</h3>
                  <ul>
                    {companyInfo.map((item, index) => (
                      <li className='leading-[38px] ' key={index}><a className='font-normal text-[16px] tracking-normal' href={item.link}>{item.text}</a></li>
                    ))}
                  </ul>
                </div>
                <div className="footer-help">
                  <h3 className='font-semibold text-[18px] leading-[18px] tracking-normal mb-8'>Ajuda</h3>
                  <ul>
                    {helpInfo.map((item, index) => (
                      <li className='leading-[38px] ' key={index}><a className='font-normal text-[16px] tracking-normal' href={item.link}>{item.text}</a></li>
                    ))}
                  </ul>
                </div>
                <div className="ml-10">
                  <h3 className='font-semibold text-[18px] leading-[18px] tracking-normal mb-8'>Contato</h3>
                  <p className='font-normal text-[16px] tracking-normal max-w-2xs'>Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161</p>
                  <p className='font-normal text-[16px] tracking-normal'>(85) 3051-3411</p>
                </div>
            </div>
          </div>
          <div className='mt-10'>
            <hr />
            <p className="text-center p-3 font-normal text-[13px] leading-[24px] tracking-normal">© {new Date().getFullYear()} Digital Store</p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;