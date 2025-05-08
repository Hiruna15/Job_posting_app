"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect, useTransition } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { FiPlus, FiX } from "react-icons/fi";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { createJob, editJob } from "../_lib/actions";

const FormContainer = styled.div`
  /* width: 100%; */
  max-height: 80vh;
  overflow-y: auto;
  padding: 0 4em;
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  border-radius: 1em;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FormTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #000000;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 38em;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  height: 40px;
  &:focus {
    border-color: #1890ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  height: 40px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  &:focus {
    border-color: #1890ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
`;

const RadioInput = styled.input.attrs({ type: "radio" })`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  position: relative;
  margin: 0;

  &:checked {
    border-color: #1890ff;
    &::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 8px;
      height: 8px;
      background: #1890ff;
      border-radius: 50%;
    }
  }
`;

const QuillEditor = styled(ReactQuill)`
  .ql-toolbar {
    border-radius: 6px 6px 0 0;
    border-color: #d9d9d9;
  }
  .ql-container {
    border-radius: 0 0 6px 6px;
    border-color: #d9d9d9;
    height: 200px;
  }
  .ql-editor {
    font-size: 14px;
  }
`;

const QuestionsSection = styled.div`
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
`;

const QuestionItem = styled.div`
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  margin-bottom: 16px;
  background: #ffffff;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const QuestionLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  padding: 0;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AddQuestionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #ffffff;
  color: #1890ff;
  border: 1px solid #1890ff;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 8px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background: #e6f7ff;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 24px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  float: right;
  margin-top: 24px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background: #40a9ff;
  }
`;

const HelperText = styled.p`
  font-size: 14px;
  color: #8c8c8c;
  margin-bottom: 16px;
`;

export default function CreateJobForm({ mode, job }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      coverLetterRequired: false,
    },
  });

  const [isPending, startTransition] = useTransition();
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionsErrors, setQuestionsErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (job) {
      setValue("title", job?.title || "");
      setValue("description", job?.description || "");
      setDescription(job?.description || "");
      setValue("company", job?.company || "");
      setValue("location", job?.location || "");
      setValue("locationType", job?.locationType || "");
      setValue("employmentType", job?.employmentType || "");
      setValue("salary", job?.salary || 0);
      setValue("status", job?.status || "");
      setValue("coverLetterRequired", job?.coverLetterRequired || false);

      if (job.questions && job.questions.length > 0) {
        setQuestions(job.questions);
      }
    }
  }, [job, setValue]);

  const addQuestion = () => {
    if (
      questions.length > 0 &&
      !questions[questions.length - 1].question.trim()
    ) {
      setQuestionsErrors({
        ...questionsErrors,
        [questions.length - 1]: {
          question: {
            message: "Please fill this question before adding another",
          },
        },
      });
      return;
    }

    setQuestions([...questions, { question: "", required: false }]);
    setQuestionsErrors({});
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);

    if (value.trim()) {
      const newErrors = { ...questionsErrors };
      delete newErrors[index];
      setQuestionsErrors(newErrors);
    }
  };

  const handleRequiredChange = (index, required) => {
    const newQuestions = [...questions];
    newQuestions[index].required = required;
    setQuestions(newQuestions);
  };

  const deleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);

    const newErrors = { ...questionsErrors };
    delete newErrors[index];
    setQuestionsErrors(newErrors);
  };

  async function handleCreate(formData) {
    const descriptionLength = description.trim().length;
    if (descriptionLength < 20) {
      setError("description", {
        type: "minLength",
        message: "Description must be at least 20 characters long",
      });
      return;
    }
    if (descriptionLength > 1500) {
      setError("description", {
        type: "maxLength",
        message: "Description must not exceed 1500 characters",
      });
      return;
    }

    let hasEmptyQuestions = false;
    const newQuestionsErrors = {};

    questions.forEach((q, index) => {
      if (!q.question.trim()) {
        hasEmptyQuestions = true;
        newQuestionsErrors[index] = {
          question: { message: "Question cannot be empty" },
        };
      }
    });

    if (hasEmptyQuestions) {
      setQuestionsErrors(newQuestionsErrors);
      return;
    }

    const dataToSubmit = {
      ...formData,
      questions: questions.filter((q) => q.question.trim()),
    };

    startTransition(async () => {
      try {
        if (mode === "create") await createJob(dataToSubmit);
        if (mode === "edit") await editJob(dataToSubmit, job._id);

        router.push("/dashboard/jobs");
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    });
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(handleCreate)} autoComplete="off">
        <FormTitle>Create a new Job</FormTitle>

        <FormGroup>
          <Label>Job Role</Label>
          <Input
            type="text"
            {...register("title", {
              required: "Job title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters",
              },
              maxLength: {
                value: 50,
                message: "Title must not exceed 50 characters",
              },
            })}
            disabled={isPending}
          />
        </FormGroup>

        <FormGroup>
          <Label>Location</Label>
          <Input
            type="text"
            {...register("location", {
              validate: (value) => {
                const locationType = getValues("locationType");
                if (locationType === "remote") return true;
                return (
                  value?.trim()?.length > 0 ||
                  "Location is required for non-remote jobs"
                );
              },
            })}
            disabled={isPending}
          />
        </FormGroup>

        <FormGroup>
          <Label>Location Type</Label>
          <Select
            {...register("locationType", {
              required: "Location type is required",
            })}
            disabled={isPending}
          >
            <option value="">Select a location type</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
            <option value="hybrid">Hybrid</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Cover letter required</Label>
          <RadioGroup>
            <RadioOption>
              <RadioInput
                value={true}
                {...register("coverLetterRequired")}
                disabled={isPending}
              />
              Yes
            </RadioOption>
            <RadioOption>
              <RadioInput
                value={false}
                {...register("coverLetterRequired")}
                disabled={isPending}
              />
              No
            </RadioOption>
          </RadioGroup>
        </FormGroup>

        <FormGroup>
          <Label>Job Description</Label>
          <QuillEditor
            value={description}
            onChange={(value) => {
              setDescription(value);
              setValue("description", value, { shouldValidate: true });
              const descriptionLength = value.trim().length;
              if (descriptionLength >= 20 && descriptionLength <= 1500) {
                clearErrors("description");
              }
            }}
            readOnly={isPending}
            theme="snow"
          />
        </FormGroup>

        <FormGroup>
          <Label>Company name</Label>
          <Input
            type="text"
            {...register("company", {
              required: "Company name is required",
              minLength: {
                value: 3,
                message: "Company name must be at least 3 characters",
              },
              maxLength: {
                value: 25,
                message: "Company name must not exceed 25 characters",
              },
            })}
            disabled={isPending}
          />
        </FormGroup>

        <FormGroup>
          <Label>Salary</Label>
          <Input
            type="number"
            {...register("salary", {
              required: "Salary is required",
              min: {
                value: 0,
                message: "Salary must be a positive number",
              },
            })}
            disabled={isPending}
          />
        </FormGroup>

        <FormGroup>
          <Label>Employment Type</Label>
          <Select
            {...register("employmentType", {
              required: "Employment type is required",
            })}
            disabled={isPending}
          >
            <option value="">Select a employment type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </Select>
        </FormGroup>

        {mode === "edit" && (
          <FormGroup>
            <Label>Status</Label>
            <Select {...register("status")} disabled={isPending}>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </Select>
          </FormGroup>
        )}

        <QuestionsSection>
          <FormTitle>Application Questions</FormTitle>
          <HelperText>
            Add custom questions that applicants will need to answer when
            applying for this job.
          </HelperText>

          {questions.map((question, index) => (
            <QuestionItem key={index}>
              <QuestionHeader>
                <QuestionLabel>Question {index + 1}</QuestionLabel>
                <DeleteButton
                  type="button"
                  onClick={() => deleteQuestion(index)}
                  disabled={isPending}
                >
                  <FiX size={16} />
                </DeleteButton>
              </QuestionHeader>
              <Input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                disabled={isPending}
                placeholder="Enter the question"
              />
              <RadioGroup style={{ marginTop: "12px" }}>
                <RadioOption>
                  <RadioInput
                    checked={question.required}
                    onChange={() => handleRequiredChange(index, true)}
                    disabled={isPending}
                  />
                  Required
                </RadioOption>
                <RadioOption>
                  <RadioInput
                    checked={!question.required}
                    onChange={() => handleRequiredChange(index, false)}
                    disabled={isPending}
                  />
                  Optional
                </RadioOption>
              </RadioGroup>
            </QuestionItem>
          ))}

          <AddQuestionButton
            type="button"
            onClick={addQuestion}
            disabled={isPending}
          >
            <FiPlus size={16} />
            Add Question
          </AddQuestionButton>
        </QuestionsSection>

        <SubmitButton type="submit" disabled={isPending}>
          {mode === "create" ? "Create Job" : "Update Job"}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}
