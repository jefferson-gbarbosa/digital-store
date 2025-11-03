type Option = {
  text: string
  value?: string
}

interface FilterGroupProps {
  title: string
  inputType: 'checkbox' | 'radio'
  options: Option[]
}

export const FilterGroup = ({
  title,
  inputType,
  options,
}: FilterGroupProps) => {
  return (
    <div className="mb-6">
      <h3 className="font-medium text-sm leading-[22px] tracking-[0.25px] text-dark-gray-2 mb-2">
        {title}
      </h3>
      <div className="flex flex-col gap-2">
        {options.map((option, index) => (
          <label
            key={index}
            className="flex items-center gap-2 text-dark-gray-2"
          >
            <input
              type={inputType}
              name={title}
              value={option.value || option.text}
              className="w-[22px] h-[22px] accent-primary"
            />
            {option.text}
          </label>
        ))}
      </div>
    </div>
  )
}
