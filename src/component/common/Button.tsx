import { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";

export const Button = ({ children, variant = "primary", onClick }: 
    {children: ReactNode, variant?: Variant, onClick: MouseEventHandler<HTMLButtonElement> }) => {
  const baseStyle =
    "px-4 py-2 rounded-2xl font-semibold backdrop-blur-md border shadow-lg transition-transform duration-200 hover:scale-105";

  const variants = {
    primary: `${baseStyle} bg-white/20 border-white/30 text-white hover:bg-white/30`,
    secondary: `${baseStyle} bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-white/20 text-white hover:from-pink-500/30 hover:to-purple-500/30`,
    outline: `${baseStyle} bg-transparent border-white/40 text-white hover:bg-white/10`,
  };

  return (
    <button  onClick={onClick} className={variants[variant]}>
      {children}
    </button>
  );
};