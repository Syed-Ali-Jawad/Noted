import { cn } from "@/lib/utils";
import type { InputProps } from "../../types/input.type";
import { Input } from "../../ui/input";

const VariantStyleMap = {
  outlined: "border-primary",
  filled: "bg-[#FFF1ED] border-transparent",
};

const FieldInput = ({
  rightItem,
  error,
  variant = "outlined",
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <div
        className={cn(
          "flex h-14  items-center border rounded-xl overflow-hidden  focus-within:outline-primary/70 focus-within:outline-2",
          VariantStyleMap[variant],
        )}
      >
        <Input
          type="text"
          className=" h-full placeholder:text-[#96918C] focus-visible:ring-0 focus-visible:border-none pr-0 border-none"
          {...props}
        />
        {rightItem && (
          <div className="mr-4 flex items-center text-primary">{rightItem}</div>
        )}
      </div>
      {error && <p className="text-primary text-xs">{error.message}</p>}
    </div>
  );
};

export default FieldInput;
