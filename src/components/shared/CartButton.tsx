import { NavLink } from 'react-router-dom'
import cartIcon from '../../assets/icons/mini-cart.svg'
import { useCartStore } from '../../stores/cartStore'
import Badge from '../ui/Badge'

interface CartButtonProps {
  className?: string
}

const CartButton = ({ className }: CartButtonProps) => {
  const totalItems = useCartStore((s) => s.totalItems)
  const lastUpdated = useCartStore((s) => s.lastUpdated)

  return (
    <NavLink
      to="/carrinho"
      className={`relative inline-block ${className || ''}`}
      aria-label="Carrinho de compras"
    >
      <img
        src={cartIcon}
        alt="Carrinho de compras"
        className="w-[26px] h-[26px]"
      />

      {totalItems > 0 ? (
        <Badge value={totalItems} color="#EE4266" pulseKey={lastUpdated} />
      ) : (
        <Badge dot color="#EE4266" pulseKey={lastUpdated} />
      )}
    </NavLink>
  )
}
export default CartButton
