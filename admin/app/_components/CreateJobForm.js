"use client";

import { useForm } from "react-hook-form";
import { OctagonAlert } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { createJob } from "../_lib/actions";

export default function CreateJobForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm();

  const [description, setDescription] = useState("");

  async function handleCreate(formData) {
    const descriptionLength = description.trim().length;
    if (descriptionLength < 20) {
      setError("description", {
        type: "minLength",
        message: "Description must be at least 20 characters long",
      });
      return;
    }
    if (descriptionLength > 500) {
      setError("description", {
        type: "maxLength",
        message: "Description must not exceed 500 characters",
      });
      return;
    }

    await createJob(formData);
  }

  return (
    <form onSubmit={handleSubmit(handleCreate)}>
      <div>
        <label htmlFor="title">Job title</label>
        <input
          type="text"
          name="title"
          {...register("title", {
            required: true,
            minLength: 5,
            maxLength: 50,
          })}
        />
        {errors.title && <OctagonAlert size={15} color="#fd0808" />}
      </div>

      <div>
        <label htmlFor="description">Job description</label>
        <ReactQuill
          value={description}
          onChange={(value) => {
            setDescription(value);
            setValue("description", value, { shouldValidate: true });
            const descriptionLength = value.trim().length;
            if (descriptionLength >= 20 && descriptionLength <= 500) {
              clearErrors("description");
            }
          }}
        />
        {errors.description && <OctagonAlert size={15} color="#fd0808" />}
      </div>

      <div>
        <label htmlFor="company">Company name</label>
        <input
          type="text"
          name="company"
          {...register("company", {
            required: true,
            minLength: 3,
            maxLength: 25,
          })}
        />
        {errors.company && <OctagonAlert size={15} color="#fd0808" />}
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          {...register("location", {
            validate: (value) => {
              const locationType = getValues("locationType");
              if (locationType === "remote") return true;
              return value.trim().length > 0;
            },
          })}
        />
        {errors.location && <OctagonAlert size={15} color="#fd0808" />}
      </div>
      <div>
        <label htmlFor="locationType">Location type</label>
        <select
          name="locationType"
          {...register("locationType", {
            required: true,
          })}
        >
          <option value="">Select the location type</option>
          <option value="remote">Remote</option>
          <option value="on-site">On-site</option>
          <option value="hybrid">Hybrid</option>
        </select>
        {errors.locationType && <OctagonAlert size={15} color="#fd0808" />}
      </div>
      {/* <div>
        <label htmlFor="status">Status</label>
        <select id="status" name="status">
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div> */}
      <div>
        <label htmlFor="employmentType">Employment type</label>
        <select
          name="employmentType"
          {...register("employmentType", { required: true })}
        >
          <option value="">Select the employement type</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
        {errors.employmentType && <OctagonAlert size={15} color="#fd0808" />}
      </div>
      <div>
        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          name="salary"
          {...register("salary", { required: true, min: 0 })}
        />
        {errors.salary && <OctagonAlert size={15} color="#fd0808" />}
      </div>

      <button type="submit">Create Job</button>
    </form>
  );
}
