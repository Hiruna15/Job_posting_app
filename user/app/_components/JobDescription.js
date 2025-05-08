"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.bubble.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

export default function JobDescription({ description }) {
  return <ReactQuill value={description} readOnly={true} theme="bubble" />;
}
