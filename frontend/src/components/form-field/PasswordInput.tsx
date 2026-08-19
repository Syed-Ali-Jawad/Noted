import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import type { InputProps } from "../../types/input.type";
import FieldInput from "./FieldInput";

const PasswordInput = (props: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FieldInput
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      rightItem={
        <button
          type="button"
          className="cursor-pointer w-min"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </button>
      }
      {...props}
    />
  );
};

export default PasswordInput;
