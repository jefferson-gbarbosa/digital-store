import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm text-dark-gray-2 ">
      <ul className="flex items-center flex-wrap gap-1">
        <li>
          <Link to="/" className="hover:underline text-dark-gray-2 font-medium text-[14px] leading-[22px] tracking-[0.25px]">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name} className="flex items-center gap-1">
              <span className="text-dark-gray-2 text-[14px] leading-[22px] tracking-[0.25px]">/</span>
              {isLast ? (
                <span className="text-dark-gray-2 text-[14px] leading-[22px] tracking-[0.25px]">{decodeURIComponent(name.replace(/-/g, ' '))}</span>
              ) : (
                <Link to={routeTo} className="hover:underline text-dark-gray-2 ">
                  {decodeURIComponent(name.replace(/-/g, ' '))}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
