import { toast as uiToast } from "@/ui/toast";
import { clsx, type ClassValue } from "clsx";
import { mutate } from "swr";
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


export const revalidate = async (...paths: string[]) =>
  Promise.all(
    paths.map((path) =>
      mutate((key) =>
        key === path ||
        (Array.isArray(key) && key[0] === path)
      )
    )
  );