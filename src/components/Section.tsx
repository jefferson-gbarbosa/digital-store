import { FC, ReactNode } from "react"

interface SectionProps {
  children: ReactNode
}

const Section: FC<SectionProps> = ({ children }) => {
  return (
    <section className="w-full relative">
      {children}
    </section>
  )
}

export default Section





