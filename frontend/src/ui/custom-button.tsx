import { cn } from "@/lib/utils";
import React from "react";

const Button = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="submit"
      className={cn(
        "h-14 rounded-xl w-full bg-primary text-white hover:cursor-pointer hover:opacity-90 transition-all duration-200",
        props.disabled &&
          "opacity-80 hover:cursor-not-allowed hover:opacity-80",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
