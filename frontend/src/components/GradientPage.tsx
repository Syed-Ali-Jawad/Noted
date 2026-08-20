import { cn } from "@/lib/utils";
import { type JSX } from "react";

const GradientPage = ({
  children,
  className,
  gradientClasses,
}: {
  children: JSX.Element;
  className?: string;
  gradientClasses?: string;
}) => {
  return (
    <div
      className={cn(
        "relative bg-amber-100/20 min-h-dvh xs:min-h-screen max-w-screen flex justify-center items-center",
        className,
      )}
    >
      <div className="z-100">{children}</div>

      <div className={gradientClasses}>
        <div className="absolute bg-yellow-100 z-10 top-0 left-0 rounded-br-full w-[30%] h-[40%] blur-[140px]" />
        <div className="absolute bg-pink-100/50 top-0 left-0 rounded-br-full w-full h-[60%] blur-[20px]" />
        <div className="absolute bg-purple-100/50 bottom-0 right-0 rounded-tl-full w-[50%] h-[30%] blur-2xl" />
        <div className="absolute bg-blue-100/50 bottom-0 left-0 rounded-tr-full w-[50%] h-[30%] blur-2xl" />
        <div className="absolute bg-teal-100/30 top-[20%] right-0 rounded-tl-full rounded-bl-full w-[20%] h-[70%] blur-2xl" />
      </div>
    </div>
  );
};

export default GradientPage;
