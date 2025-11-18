import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import logo from '../../assets/logos/logo-header.svg'
import Logo from '../shared/Logo'
import SearchBar from '../shared/SearchBar'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Menu, Search, ShoppingCart, X } from 'lucide-react'
import Badge from '../ui/Badge'
import { useCartStore } from '../../stores/cartStore'

interface HeaderProps {
  menuOpen: boolean
  setMenuOpen: (value: boolean) => void
}

const Header = ({ menuOpen, setMenuOpen }: HeaderProps) => {
  const navigate = useNavigate()
  const { openSignIn } = useClerk()
  const { isSignedIn } = useUser()
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  // const totalItems = useCartStore((state) => state.totalItems)
  // const lastUpdated = useCartStore((state) => state.lastUpdated)

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/collection', label: 'Produtos' },
    { path: '/categorias', label: 'Categorias' },
  ]

  const items = useCartStore((state) => state.items)
  const lastUpdated = useCartStore((state) => state.lastUpdated)

  // ✅ Calcular totalItems baseado nos items (reativo)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  // React.useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (searchQuery.trim()) {
  //       searchProducts({ q: searchQuery })
  //     }
  //   }, 500)

  //   return () => clearTimeout(timeout)
  // }, [searchQuery, searchProducts])

  const handleSelectProduct = (id: number) => {
    navigate(`/produtos/${id}`)
    setSearchQuery('')
    setSearchOpen(false)
  }

  const handleNavClick = () => {
    setMenuOpen(false)
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
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? (
              <X className="text-2xl cursor-pointer transition-colors duration-200" />
            ) : (
              <Menu className="text-2xl cursor-pointer transition-colors duration-200" />
            )}
          </button>

          <div className="w-[138px] h-[24px] flex items-center">
            <Logo img={{ src: logo, alt: 'Logo Header' }} />
          </div>

          <div className="relative flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label={searchOpen ? 'Fechar pesquisa' : 'Abrir pesquisa'}
            >
              {searchOpen ? (
                <X
                  className={clsx(
                    'cursor-pointer transition-colors duration-200',
                    'text-primary',
                  )}
                />
              ) : (
                <Search
                  className={clsx(
                    'cursor-pointer transition-colors duration-200',
                    'text-light-gray-2 opacity-60 hover:text-primary',
                  )}
                />
              )}
            </button>
            <div className="flex items-center gap-4 px-4 cursor-pointer">
              <div className="relative">
                <ShoppingCart onClick={() => navigate('/cart')} />
                <Badge value={totalItems} pulseKey={lastUpdated} />
              </div>
            </div>
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
              // onSearchClick={() => searchProducts({ q: searchQuery })}
              // suggestions={products.map((p) => ({ id: p.id, name: p.name }))}
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
            {isSignedIn ? (
              <div className="flex flex-col gap-2">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: '32px',
                        height: '32px',
                      },
                    },
                  }}
                />
                <button
                  onClick={() => {
                    navigate('/my-orders')
                    handleNavClick()
                  }}
                  className="flex items-center gap-2 text-dark-gray-2 hover:text-primary transition-colors cursor-pointer"
                >
                  <span>Meus Pedidos</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => openSignIn()}
                className="flex justify-center items-center w-28 h-10 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              >
                Entrar
              </button>
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
              // onSearchClick={() => searchProducts({ q: searchQuery })}
              // suggestions={products.map((p) => ({ id: p.id, name: p.name }))}
              onSelectSuggestion={handleSelectProduct}
              autoFocus
            />
          </div>

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/my-orders')}
                  className="flex items-center gap-2 text-dark-gray-2 hover:text-primary transition-colors p-2 cursor-pointer"
                  aria-label="Meus pedidos"
                >
                  <div className="flex items-center gap-4 px-4 cursor-pointer">
                    <div className="relative">
                      <ShoppingCart size={20} />
                      <Badge value={totalItems} pulseKey={lastUpdated} />
                    </div>
                  </div>
                  <span className="text-sm">Meus Pedidos</span>
                </button>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: '42px',
                        height: '42px',
                      },
                      userButtonTrigger: {
                        '&:focus': {
                          boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.1)',
                        },
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4 px-4 cursor-pointer">
                <div className="relative">
                  <ShoppingCart onClick={() => navigate('/cart')} />
                  <Badge value={totalItems} pulseKey={lastUpdated} />
                </div>
                <button
                  onClick={() => openSignIn()}
                  className="flex justify-center items-center w-28 h-10 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Entrar
                </button>
              </div>
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
