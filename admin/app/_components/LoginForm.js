"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setIsLoading(false);

    if (result?.error) {
      alert("Login failed: " + result.error);
    } else {
      alert("Login successful!");

      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">username</label>
      <br />
      <input
        type="text"
        name="username"
        {...register("email", { required: "Username is required" })}
      />
      {errors.email && (
        <span style={{ color: "red" }}>{errors.email.message}</span>
      )}
      <br />
      <label htmlFor="password">password</label>
      <br />
      <input
        type="password"
        name="password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && (
        <span style={{ color: "red" }}>{errors.password.message}</span>
      )}
      <br />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
