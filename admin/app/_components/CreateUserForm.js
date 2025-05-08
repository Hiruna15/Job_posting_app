"use client";

import { useForm } from "react-hook-form";
import { OctagonAlert } from "lucide-react";
import { createAdminUser } from "../_lib/actions";
import { toast } from "react-toastify";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-size: 1.5em;

  gap: 2.5em;
  padding: 1em 2em;
  /* width: 20em; */

  input {
    border: 0;
    background-color: rgba(17, 17, 17, 0.09);
    /* font-size: 1.2em; */
    padding: 1em;
    border-radius: 0.5em;
    font-size: 0.9em;
    width: 25em;
    outline: none;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
      background-color: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    &::placeholder {
      font-size: 0.9em;
    }
  }

  button {
    width: fit-content;
    border: none;
    font-size: 0.85em;
    padding: 1em 2em;
    color: #ffffff;
    background-color: #111111;
    border-radius: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    margin-top: 1.5em;
    margin-left: auto;

    &:hover {
      background-color: #333333;
      transform: scale(1.05);
    }
  }

  select {
    padding: 1em 2em;
    outline: none;
    border: 1px solid rgba(17, 17, 17, 0.17);
    border-radius: 1em;

    option {
      background-color: #f9f9f9;
      color: #111111;
      padding: 0.5em;
    }
  }

  > div {
    font-size: 0.7em;
    position: relative;
    p {
      position: absolute;
      font-size: 0.7em;
      bottom: -1em;
    }
  }
`;

export default function CreateUserForm({ emails }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleCreate(data) {
    startTransition(async () => {
      try {
        await createAdminUser(data);
        toast.success("An new admin created Successfuly", {
          position: "top-center",
        });
        router.push("/dashboard/users");
      } catch (err) {
        toast.error("Error occured while creating a new admin", {
          position: "top-center",
        });
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit(handleCreate)}>
      <div>
        {/* <label htmlFor="email">email</label> */}
        <input
          placeholder="Email"
          name="email"
          type="text"
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^(?:[a-zA-Z0-9_'^&\/+-])+(?:\.(?:[a-zA-Z0-9_'^&\/+-]+))*@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/,
              message: "Invalid email address",
            },
            validate: (value) =>
              !emails.includes(value) || "Email already exists",
          })}
        />
        {errors.email?.type === "validate" && (
          <p style={{ color: "red" }}>{errors.email.message}</p>
        )}
        {errors.email?.type === "required" && (
          <OctagonAlert size={15} color="#fd0808" />
        )}
        {errors.email?.type === "pattern" && (
          <p style={{ color: "red" }}>{errors.email.message}</p>
        )}
      </div>

      <div>
        {/* <label htmlFor="password">password</label> */}
        <input
          placeholder="Password"
          name="password"
          type="password"
          {...register("password", {
            required: true,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
            },
          })}
        />
        {errors.password?.type === "required" && (
          <OctagonAlert size={15} color="#fd0808" />
        )}
        {errors.password?.type === "pattern" && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>

      <div>
        {/* <label htmlFor="role">role</label> */}
        <select name="role" {...register("role")}>
          <option value="normal">normal</option>
          <option value="super">super</option>
        </select>
      </div>

      <button disabled={isPending}>
        {isPending ? "Creating user...." : "Create user"}
      </button>
    </Form>
  );
}
