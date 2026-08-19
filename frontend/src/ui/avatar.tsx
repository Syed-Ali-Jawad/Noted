import Logo from "../assets/logo.svg";
import { cn } from "@/lib/utils";

const Avatar = ({ className }: { className?: string }) => {
  return (
    <img
      src={Logo}
      className={cn(
        "rounded-full w-10 h-10 border border-white bg-white p-1",
        className,
      )}
      alt="Profile pictue"
    />
  );
};

export default Avatar;
