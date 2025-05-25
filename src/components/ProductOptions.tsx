import { useState } from "react"
import clsx from "clsx"

type ProductOptionsProps = {
  options: string[]
  shape: "square" | "circle"
  type: "text" | "color"
  radius?: string
}

export default function ProductOptions({
  options,
  shape,
  type,
  radius
}: ProductOptionsProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="flex gap-2 flex-wrap mt-4">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setSelected(opt)}
          className={clsx(
            "flex items-center justify-center border transition-all",
            shape === "square" && "h-[46px] px-4",
            shape === "circle" && "w-[31px] h-[31px] rounded-full",
            type === "text" && "text-[24px] text-dark-gray-2",
            type === "color" && "p-0",
            selected === opt ? "border-2 border-primary" : "border border-light-gray-2",
            shape === "square" && `rounded-[${radius}]`,
          )}
          style={{
            backgroundColor: type === "color" ? opt : "transparent"
          }}
        >
          {type === "text" ? opt : ""}
        </button>
      ))}
    </div>
  )
}
