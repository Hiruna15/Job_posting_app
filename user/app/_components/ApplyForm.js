import { useState } from "react";
import { useForm } from "react-hook-form";
import { saveApplication } from "../_lib/actions";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { FaFileUpload, FaCheck } from "react-icons/fa";

export default function ApplyForm({ jobId, additionalFields }) {
  const [loading, setLoading] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [coverLetterName, setCoverLetterName] = useState("");
  const router = useRouter();

  let { coverLetterRequired, questions } = additionalFields;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleResumeChange = (e) => {
    if (e.target.files.length > 0) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleCoverLetterChange = (e) => {
    if (e.target.files.length > 0) {
      setCoverLetterName(e.target.files[0].name);
    }
  };

  async function onSubmit(data) {
    setLoading(true);

    const formData = new FormData();
    const resumeFile = data.resume[0];
    formData.append("resume", resumeFile);

    if (data.coverLetter?.[0]) {
      formData.append("coverLetter", data.coverLetter[0]);
    }

    try {
      const res = await fetch("/api/upload-cloudinary", {
        method: "POST",
        body: formData,
      });

      const { resumeUrl, coverLetterUrl } = await res.json();
      data.resume = resumeUrl;
      data.coverLetter = coverLetterUrl;
      data.jobId = jobId;

      data.answers =
        questions?.map((question, index) => ({
          question: question.question,
          answer: data[`question-${index}`] || "",
        })) ?? [];

      // console.log(data.answers);

      const application = await saveApplication(data);

      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ application }),
      });

      setLoading(false);

      router.push("/jobs/applied");
    } catch (err) {
      console.error("Upload failed", err);
      setLoading(false);
    }
  }

  return (
    <Wrapper>
      <FormContainer onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Field>
          <Input
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </Field>
        <Field>
          <Input
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </Field>

        <UploadField>
          <UploadLabel>
            <UploadIcon>
              <FaFileUpload />
            </UploadIcon>
            <UploadText>
              {resumeName ? (
                <>
                  <FileName>{resumeName}</FileName>
                  <FileStatus>
                    <FaCheck color="green" /> Selected
                  </FileStatus>
                </>
              ) : (
                "Upload Resume"
              )}
            </UploadText>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              {...register("resume", {
                required: "Resume is required",
                onChange: handleResumeChange,
              })}
            />
          </UploadLabel>
          {errors.resume && <Error>{errors.resume.message}</Error>}

          {coverLetterRequired && (
            <UploadLabel>
              <UploadIcon>
                <FaFileUpload />
              </UploadIcon>
              <UploadText>
                {coverLetterName ? (
                  <>
                    <FileName>{coverLetterName}</FileName>
                    <FileStatus>
                      <FaCheck color="green" /> Selected
                    </FileStatus>
                  </>
                ) : (
                  "Upload Cover Letter"
                )}
              </UploadText>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                {...register("coverLetter", {
                  required: "Cover letter is required",
                  onChange: handleCoverLetterChange,
                })}
              />
            </UploadLabel>
          )}
          {errors.coverLetter && <Error>{errors.coverLetter.message}</Error>}
        </UploadField>

        {questions?.map((q, index) => (
          <QuestionBox key={index}>
            <div>
              <span>{q.question}</span>
              <span className="required">{q.required && "Required*"}</span>
              <span className="optional">{!q.required && "Optional"}</span>
            </div>
            <AnswerField>
              <input
                placeholder="Your answer"
                {...register(`question-${index}`, {
                  required: q.required ? true : false,
                })}
              />
              {errors[`question-${index}`] && (
                <Error>The answer is required</Error>
              )}
            </AnswerField>
          </QuestionBox>
        ))}

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </SubmitButton>
      </FormContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-height: 90vh;
  overflow-y: auto;
  background: #e2e2e2;
  padding: 2rem;
  border-radius: 1rem;
  position: relative;
  padding-right: 5em;

  width: 35em;

  input {
    outline: none;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Field = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.75rem;
  background: #dedede;
  font-size: 1rem;
`;

const UploadField = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const UploadLabel = styled.label`
  border: 1px solid black;
  border-radius: 2rem;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  background: white;
  font-size: 0.9rem;
  position: relative;
  min-width: 200px;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  input[type="file"] {
    display: none;
  }
`;

const UploadIcon = styled.span`
  font-size: 1.2rem;
`;

const UploadText = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
`;

const FileName = styled.span`
  font-weight: bold;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileStatus = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: green;
`;

const QuestionBox = styled.div`
  background: #d3d3d3;
  border-radius: 1rem;
  padding: 1rem;

  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9em;
  }

  .required {
    color: red;
  }

  .optional {
    color: green;
  }
`;

const AnswerField = styled.div`
  position: relative;

  input {
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;
    border: none;
    font-size: 1rem;
  }
`;

const SubmitButton = styled.button`
  padding: 0.9em 4em;
  border: none;
  border-radius: 2rem;
  background: black;
  color: white;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.2s;
  width: fit-content;

  &:hover {
    background: #333;
  }

  &:disabled {
    background: #999;
    cursor: not-allowed;
  }
`;

const Error = styled.p`
  color: red;
  position: absolute;
  font-size: 0.8rem;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
`;
