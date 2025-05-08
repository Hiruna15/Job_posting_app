"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { OctagonAlert } from "lucide-react";

import styled from "styled-components";

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #152238;
  border-radius: 0.5em;
  overflow: hidden;
  padding: 0.7em 1em;
  gap: 0.5em;
  position: relative;

  input {
    background-color: transparent;
    border: none;
    color: white;
    outline: none;
    font-size: 0.9em;

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px #152238 inset;
      -webkit-text-fill-color: white;
    }
  }

  label {
    color: white;
    font-size: 0.8em;
  }

  div {
    position: absolute;
    right: 1em;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: 78%;

  button {
    border-radius: 0.5em;
    border: none;
    font-size: 1.2em;
    padding: 0.7em;
    background-color: #3399ff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2678cc;
    }

    &:disabled {
      background-color: #b3d9ff;
      cursor: not-allowed;
    }
  }
`;

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
      toast.error(result.error, {
        position: "top-center",
      });
    } else {
      toast.success("Login Successful", {
        position: "top-center",
      });

      router.push("/dashboard");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputDiv>
        <label htmlFor="email">EMAIL</label>
        <input
          type="text"
          name="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <div>
            <OctagonAlert size={15} color="#fd0808" />
          </div>
        )}
      </InputDiv>

      <InputDiv>
        <label htmlFor="password">PASSWORD</label>
        <input
          type="password"
          name="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <div>
            <OctagonAlert size={15} color="#fd0808" />
          </div>
        )}
      </InputDiv>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log in"}
      </button>
    </Form>
  );
}
