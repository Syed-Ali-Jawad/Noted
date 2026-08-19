import type { InputHTMLAttributes, JSX } from "react";
import type { FieldError } from "react-hook-form";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  rightItem?: JSX.Element;
  error?: FieldError;
  variant?: "outlined" | "filled";
};
