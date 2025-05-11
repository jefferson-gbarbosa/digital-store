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
    <section id={id} className={clsx("max-w-7xl h-full mx-auto", className)}>
      <div
        className={clsx(
          "flex items-center justify-between pt-6 font-bold text-2xl leading-[38px] tracking-wide",
          isCentered && "flex-col gap-2 text-center"
        )}
      >
        <h2
          className={clsx(
            "text-[24px] text-dark-gray-2 font-semibold",
            isCentered ? "w-full" : "w-auto"
          )}
        >
          {title}
        </h2>

        {!isCentered && link && (
          <a
            href={link.href}
            className="text-primary text-[18px] font-medium hover:underline"
          >
            {link.text}
          </a>
        )}
      </div>

      {isCentered && link && (
        <a
          href={link.href}
          className="text-primary text-[18px] font-medium hover:underline mt-1 text-c"
        >
          {link.text}
        </a>
      )}

      {children}
    </section>
  );
};

export default Section;
