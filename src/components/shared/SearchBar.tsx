import clsx from 'clsx'
import { Search } from 'lucide-react'

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearchClick?: () => void
  suggestions?: { id: number; name: string }[]
  onSelectSuggestion?: (id: number) => void
  className?: string
  autoFocus?: boolean
}

const SearchBar = ({
  placeholder = 'Pesquisar...',
  value,
  onChange,
  onSearchClick,
  suggestions = [],
  onSelectSuggestion,
  className,
  autoFocus = false,
}: SearchBarProps) => {
  return (
    <div className={clsx('relative w-full', className)}>
      <Search
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 opacity-60 cursor-pointer"
        onClick={onSearchClick}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[rgba(71,71,71,0.04)] placeholder:text-dark-gray-3 rounded-[8px] outline-none p-3"
        autoFocus={autoFocus}
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white shadow-md rounded-md mt-1 max-h-60 overflow-auto z-50">
          {suggestions.map((s) => (
            <li
              key={s.id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectSuggestion && onSelectSuggestion(s.id)}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
