import GradientPage from "@/components/GradientPage";
import Logo from "@/assets/logo.svg";
import FieldInput from "@/components/form-field/FieldInput";
import PasswordInput from "@/components/form-field/PasswordInput";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { RegisterForm } from "@/types/forms.type";
import { EMAIL_PATTERN } from "@/shared/constants";
import Button from "@/ui/custom-button";

const defaultValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues,
  });

  const onSubmit = (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    console.table(data);
  };
  return (
    <GradientPage>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-2xl xs:rounded-2xl w-screen xs:w-auto xs:min-w-110 p-10 min-h-162 flex flex-col gap-y-8 items-center"
      >
        <div className="text-center">
          <img src={Logo} alt="Noted Logo" className="mx-auto w-auto h-12" />
          <h1 className="text-[20px] font-bold font-source-serif mt-4">
            Create your sanctuary
          </h1>
          <p className="text-[#96918C]">
            Sign up to start capturing your thoughts.
          </p>
        </div>
        <div className="flex flex-col gap-y-4 w-full">
          <FieldInput
            placeholder="Full Name"
            variant="filled"
            {...register("fullName", { required: "Full name is required" })}
            error={errors.fullName}
          />
          <FieldInput
            placeholder="Email Address"
            variant="filled"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: EMAIL_PATTERN,
                message: "Please enter a valid email address",
              },
            })}
            error={errors.email}
          />
          <PasswordInput
            placeholder="Password"
            variant="filled"
            {...register("password", { required: "Password is required" })}
            error={errors.password}
          />
          <PasswordInput
            placeholder="Confirm Password"
            variant="filled"
            {...register("confirmPassword", {
              required: "Please confirm your password",
            })}
            error={errors.confirmPassword}
          />
          <Button className="w-full">Signup</Button>
        </div>
        <p className="border-t border-slate-200 pt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium text-sm hover:underline"
          >
            Log In
          </Link>
        </p>
      </form>
    </GradientPage>
  );
};

export default Signup;
