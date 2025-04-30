"use client";

import { useForm } from "react-hook-form";
import { OctagonAlert } from "lucide-react";

export default function CreateJobForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleCreate(formData) {}

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
        <textarea name="description"></textarea>
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
