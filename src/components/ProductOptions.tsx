import { useState } from "react"
import clsx from "clsx"

type ProductOptionsProps = {
  title: string
  options: string[]
  shape: "square" | "circle"
  type: "text" | "color"
}

export default function ProductOptions({
  title,
  options,
  shape,
  type,
}: ProductOptionsProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div>
      <h4 className="font-bold text-[14px] leading-[22px] tracking-[0.75px] text-dark-gray-2 mb-3">
        {title}
      </h4>
      <div className="flex gap-3 flex-wrap">
        {options.map((opt) => {
          const isSelected = selected === opt

          return (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              className={clsx(
                "flex items-center justify-center transition-all",
                shape === "square" && "h-[46px] min-w-[46px] px-4 rounded-[8px] text-[16px] font-medium border",
                shape === "circle" && "w-[36px] h-[36px] rounded-full border-4",
                
                type === "text" &&
                  (isSelected
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-dark-gray-2 border-light-gray-2"),

                type === "color" &&
                  (isSelected
                    ? "ring-2 ring-primary border-white"
                    : "ring-2 ring-transparent border-white")
              )}
              style={{
                ...(type === "color" ? { backgroundColor: opt } : {})
              }}
            >
              {type === "text" ? opt : ""}
            </button>
          )
        })}
      </div>
    </div>
  )
}
