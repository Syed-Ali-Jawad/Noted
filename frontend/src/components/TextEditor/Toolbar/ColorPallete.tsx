import { cn } from "@/lib/utils";

interface ColorPalleteProps {
    className: string;
    onClick?: () => void;
    title?: string;
}

const ColorPallete = ({
    className,
    onClick,
    ...props
}: ColorPalleteProps) => (
    <div
        className={cn(
            "w-5 h-5 cursor-pointer border-white border-2 rounded-full shadow-md",
            className,
        )}
        onClick={onClick}
        {...props}
    />
);

export default ColorPallete;