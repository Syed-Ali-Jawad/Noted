import { toast as uiToast } from "@/ui/toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toast = ({
  message,
  type = "success",
}: {
  message: string;
  type?: "success" | "destructive";
}) => {
  const id = uiToast.add({
    type,
    description: message,
    actionProps: {
      onClick() {
        uiToast.close(id);
      },
    },
  });
};
