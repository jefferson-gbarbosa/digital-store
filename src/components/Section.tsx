import React from "react";
import clsx from "clsx";


type SectionProps = {
  id?: string;
  title?: string;
  titleAlign?: "left" | "center";  
  link?: {
    text: string;
    href: string;
  };
  children: React.ReactNode;
  className?: string;
};

const Section: React.FC<SectionProps> = ({
  id,
  title,
  titleAlign = "left",
  link,
  children,
  className
}) => {
  const isCentered = titleAlign === "center";

  return (
    <section id={id} className={clsx("max-w-7xl  h-full mx-auto", className)}>
      <div
        className={clsx(
          "flex items-center gap-30 md:justify-between pt-6 md:pt-0 ml-6 md:ml-4",
          isCentered && "flex-col gap-2 text-center"
        )}
      >
        <h2
          className={clsx(
            "text-base md:text-2xl font-bold tracking-[0.75px] leading-[38px] md:tracking-wide text-dark-gray-2",
            isCentered ? "w-full" : "w-auto"
          )}
        >
          {title}
        </h2>

        {!isCentered && link && (
          <a
            href={link.href}
            className="text-primary text-sm md:text-[18px] leading-[22px] font-medium tracking-[0.25px] hover:underline md:ml-80"
          >
            {link.text}
            <i className="pi pi-arrow-right text-sm ml-2"></i>
          </a>
        )}
      </div>

      {isCentered && link && (
        <a
          href={link.href}
          className="text-primary text-sm md:text-[18px] hover:underline mt-1"
        >
          {link.text}
        </a>
      )}
      {children}
    </section>
  );
};

export default Section;
