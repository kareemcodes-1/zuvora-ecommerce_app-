"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="btn btn--filled-dark btn--icon-right !w-full !text-start"
      style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)', height: 'clamp(2.75rem, 4vw, 3.5rem)' }}
    >
      {pending ? <Spinner className="size-8" />  : "LOG IN" }
    </button>
  );
};

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const formAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Side */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-[1.5rem] py-[3rem] lg:px-8 lg:py-12">
        <div className="w-full max-w-[400px] mx-auto">
          <h2 className="mb-[2rem] lg:mb-[2.5rem] text-center text-[1.1rem] lg:text-[1.3rem] font-semibold text-black bebas">
            Sign In To Account
          </h2>

          <form className="space-y-4 lg:space-y-6" action={formAction}>
            <div>
              <Input
                type="email"
                name="email"
                id="email"
                className="h-[3rem] lg:h-[3.5rem] placeholder:text-black !lowercase"
                placeholder="Email Address"
              />
            </div>

            <div>
              <div className="flex items-end justify-end w-full mb-2">
                <a href="#" className="text-[.75rem] lg:text-[.8rem] font-semibold text-muted-foreground">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="h-[3rem] lg:h-[3.5rem] placeholder:text-black pr-[3rem] !lowercase"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-[1rem] top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <SubmitBtn />
            </div>
          </form>

          <p className="mt-8 lg:mt-10 text-center text-[.8rem] lg:text-[.825rem] text-muted-foreground telegraf uppercase font-[200]">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-semibold text-black underline">
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Image Side */}
      <div className="hidden lg:block lg:w-1/2">
        <Image
          src="/3.jpg"
          alt="Right side illustration"
          className="h-[100vh] w-full object-cover"
          width={500}
          height={500}
          quality={75}
        />
      </div>
    </div>
  );
};

export default Login;