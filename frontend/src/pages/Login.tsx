import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/form-field/PasswordInput";
import Logo from "../assets/logo.svg";
import { useForm } from "react-hook-form";
import type { LoginForm } from "../types/forms.type";
import FieldInput from "@/components/form-field/FieldInput";
import GradientPage from "@/components/GradientPage";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "@/shared/constants/constants";
import Button from "@/ui/custom-button";
import { login } from "@/api/auth.api";
import useSWRMutation from "swr/mutation";
import { Loader2 } from "lucide-react";
import { LOGIN_DEFAULT_VALUES } from "@/shared/constants/auth.constant";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>({ defaultValues: LOGIN_DEFAULT_VALUES });

  const navigate = useNavigate();

  const {
    trigger: signIn,
    isMutating: isSigningIn,
    error,
  } = useSWRMutation("/login", login, { onSuccess: () => navigate("/") });

  const onSubmit = async (data: LoginForm) => {
    await signIn(data);
  };

  return (
    <GradientPage>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-2xl relative w-screen h-dvh sm:h-auto sm:w-auto sm:min-w-105 bg-white rounded-2xl  overflow-hidden p-10 flex flex-col justify-center items-center gap-y-8 "
      >
        <div className="flex flex-col gap-y-2 text-center">
          <img src={Logo} alt="writing icon" className="w-auto h-12" />
          <h1 className="font-bold text-2xl font-source-serif">
            Sign in to Noted
          </h1>
          <p className="text-[#96918C] ">
            Welcome back to your personal sanctuary.
          </p>
        </div>
        <div className="flex flex-col gap-y-4 w-full">
          <FieldInput
            placeholder="Email"
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
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: PASSWORD_PATTERN,
                message: "Password must be atleast 8 characters long.",
              },
            })}
            error={errors.password}
          />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex gap-x-3 items-center ">
            <input
              type="checkbox"
              id="remember"
              className="checkbox"
              {...register("shallRemember")}
            />
            <label
              htmlFor="remember"
              className="text-[#625E59] hover:cursor-pointer hover:opacity-90"
            >
              Remember me
            </label>
          </div>
          {/* <Link to="#" className="text-primary hover:opacity-90">
            Forgot Password?
          </Link> */}
        </div>

        <div className="flex flex-col gap-y-2 w-full items-center">
          <Button
            className="flex gap-x-2 items-center justify-center"
            disabled={isSigningIn}
          >
            {isSigningIn && <Loader2 className="animate-spin" />}
            <span>Sign In</span>
          </Button>
          {error && (
            <p className="text-primary text-xs">
              {error?.response?.data?.message}
            </p>
          )}
        </div>
        <p className="border-t border-slate-200 pt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-sm font-medium text-primary hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>
    </GradientPage>
  );
};

export default Login;
