import React from 'react'
import { Badge } from 'primereact/badge'
import cartIcon from '../../assets/icons/mini-cart.svg'
import 'primeicons/primeicons.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import logo from '../../assets/logos/logo-header.svg'
import { useAuthStore } from '../../stores/authStore'
import Logo from '../shared/Logo'
import SearchBar from '../shared/SearchBar'
import { useProductStore } from '../../stores/productStore'

interface HeaderProps {
  menuOpen: boolean
  setMenuOpen: (value: boolean) => void
}

const Header = ({ menuOpen, setMenuOpen }: HeaderProps) => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const { searchProducts, products } = useProductStore()
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/produtos', label: 'Produtos' },
    { path: '/categorias', label: 'Categorias' },
  ]
  async function handleLogout() {
    await logout()
    navigate('/')
  }

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery.trim()) {
        searchProducts({ q: searchQuery })
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [searchQuery, searchProducts])

  const handleSelectProduct = (id: number) => {
    navigate(`/produtos/${id}`)
    setSearchQuery('')
    setSearchOpen(false)
  }

  return (
    <header
      className={clsx(
        'w-full bg-white z-50 relative transition-all duration-300',
        searchOpen ? 'h-[120px]' : 'h-[72px]',
        'md:h-[192px] pb-3.5',
      )}
    >
      <nav className="flex flex-col md:flex-row items-center md:flex-none md:items-start max-w-7xl h-full mx-auto px-4 justify-between md:justify-normal md:gap-6 md:pt-3.5 py-5">
        {/* Mobile Top Bar */}
        <div className="flex items-center justify-between w-full md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            <i
              className={clsx(
                'text-2xl cursor-pointer transition-colors duration-200',
                menuOpen ? 'pi pi-times' : 'pi pi-align-justify text-dark-gray',
              )}
            />
          </button>

          <div className="w-[138px] h-[24px] flex items-center">
            <Logo img={{ src: logo, alt: 'Logo Header' }} />
          </div>

          <div className="relative flex items-center gap-3">
            <i
              className={clsx(
                'pi pi-search cursor-pointer transition-colors duration-200',
                searchOpen ? 'text-primary' : 'text-light-gray-2 opacity-60',
              )}
              onClick={() => setSearchOpen(!searchOpen)}
            />

            {/* Ícones para usuário comum ou visitante */}
            {user?.role !== 'admin' && (
              <>
                {isAuthenticated && (
                  <NavLink to="/profile" aria-label="Meu Perfil">
                    <i className="pi pi-user text-xl text-light-gray-2 opacity-80" />
                  </NavLink>
                )}
                <NavLink
                  to="/carrinho"
                  className="relative"
                  aria-label="Carrinho de compras"
                >
                  <img src={cartIcon} alt="Carrinho de compras" />
                  <Badge
                    value="3"
                    severity="danger"
                    className="absolute -top-2 -right-3 w-[18px] h-[18px] text-[12px] font-inter font-bold leading-[18px] tracking-[0.5px] text-[#FFFFFF] bg-[#EE4266]"
                  />
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Barra de busca mobile */}
        {searchOpen && (
          <div
            className={clsx(
              'w-full px-4 md:hidden relative',
              menuOpen ? 'mt-6' : 'mt-2',
            )}
          >
            <SearchBar
              placeholder="Pesquisar produto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearchClick={() => searchProducts({ q: searchQuery })}
              suggestions={products.map((p) => ({ id: p.id, name: p.name }))}
              onSelectSuggestion={handleSelectProduct}
              autoFocus
            />
          </div>
        )}
        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed top-[72px] left-0 w-[75%] max-w-[300px] h-[calc(100vh-72px)] bg-white z-50 p-5 shadow-md flex flex-col justify-between md:hidden
          transform transition-transform duration-500 ease-in-out
          ${menuOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}
        `}
        >
          <div>
            <h2 className="text-dark-gray-2 font-bold text-base leading-6 tracking-[0.75px] mt-6 mb-3">
              Páginas
            </h2>
            <ul className="flex flex-col gap-3">
              {navItems.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      clsx(
                        'font-normal text-base leading-7 tracking-[0.75px] transition-colors duration-200',
                        isActive
                          ? 'text-primary underline underline-offset-4'
                          : 'text-dark-gray-2',
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
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex justify-center items-center h-10 bg-dark-gray text-white text-sm font-bold rounded-lg hover:bg-light-gray-2 hover:text-dark-gray transition-colors duration-300 cursor-pointer"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <span className="text-dark-gray-2 text-center py-2">
                  Olá, {user?.firstname}
                </span>
                <button
                  onClick={() => {
                    handleLogout()
                    setMenuOpen(false)
                  }}
                  className="flex justify-center items-center h-10 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-primary text-white font-bold rounded-lg h-10 flex justify-center items-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="text-sm underline text-center text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Cadastre-se
                </Link>
              </>
            )}
          </div>
        </div>
        {/* Desktop Header */}
        <div className="hidden md:flex flex-1 justify-between py-4">
          <div className="w-[253px] h-[44px]">
            <Logo img={{ src: logo, alt: 'Logo Header' }} />
          </div>
          {/* Barra de busca desktop */}
          <div className="flex-1 min-w-[200px] px-4">
            <SearchBar
              placeholder="Pesquisar produto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearchClick={() => searchProducts({ q: searchQuery })}
              suggestions={products.map((p) => ({ id: p.id, name: p.name }))}
              onSelectSuggestion={handleSelectProduct}
              autoFocus
            />
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-dark-gray-2">Olá, {user?.firstname}</span>
                {user?.role === 'admin' ? (
                  <Link
                    to="/admin"
                    className="flex justify-center items-center w-28 h-10 bg-dark-gray text-white text-sm font-bold rounded-lg hover:bg-light-gray-2 hover:text-dark-gray transition-colors duration-300 cursor-pointer"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <NavLink to="/profile" aria-label="Meu Perfil">
                    <i className="pi pi-user text-xl text-dark-gray-2 hover:text-primary" />
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="flex justify-center items-center w-28 h-10 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/cadastro"
                  className="text-dark-gray-2 hover:text-primary underline"
                >
                  Cadastre-se
                </Link>
                <Link
                  to="/login"
                  className="flex justify-center items-center w-28 h-10 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Entrar
                </Link>
              </>
            )}

            {/* Carrinho visível para clientes e visitantes */}
            {(!isAuthenticated || user?.role === 'customer') && (
              <NavLink to="/carrinho" className="relative">
                <img src={cartIcon} alt="Carrinho de compras" />
                <Badge
                  value="3"
                  severity="danger"
                  className="absolute -top-2 -right-3 w-[18px] h-[18px] text-[12px] font-inter font-bold leading-[18px] tracking-[0.5px] text-[#FFFFFF] bg-[#EE4266]"
                />
              </NavLink>
            )}
          </div>
        </div>
        {/* Desktop Menu Links */}
        <ul className="hidden md:flex gap-8 absolute bottom-6">
          {navItems.map(({ path, label }) => (
            <li
              key={path}
              className="font-normal text-[16px] leading-[28px] tracking-[0.75px]"
            >
              <NavLink
                to={path}
                className={({ isActive }) =>
                  clsx(
                    'transition-colors duration-200 hover:text-primary',
                    isActive
                      ? 'text-primary underline underline-offset-4'
                      : 'text-dark-gray-2',
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
  )
}

export default Header
