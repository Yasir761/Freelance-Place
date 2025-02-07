import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LabelInputContainer } from "../forms/InputBoxUtils";
import { Label } from "../ui/label";

const RichTextEditor = ({ setValue, value, errors }) => {
  const handleGigDescription = (value) => {
    setValue("description", value);
  };

  return (
    <LabelInputContainer className={"space-y-0"}>
      <Label
        className={"text-lg text-gray-500"}
        children={
          <>
            Description
            <span className="text-[#EF476F]"> *</span>
          </>
        }
      />
      <ReactQuill
        value={value}
        onChange={handleGigDescription}
        theme="snow"
        placeholder="Enter Gig full details here..."
        className="mb-4"
      />
      <style>
        {`
          .ql-container.ql-snow {
            border:2px solid #ccc;
            border-bottom-right-radius:8px;
            border-bottom-left-radius:8px;
            }
            .ql-toolbar.ql-snow {
              border:2px solid #ccc;
              border-top-right-radius:8px;
              border-top-left-radius:8px;
              // overflow-x:auto;
          }
          .ql-editor {
            min-height:8rem;
            color:#6b7280;
            font-size:1rem;
            }
            .ql-editor.ql-blank::before{
              font-style:normal;
              color:rgba(0, 0, 0, 0.4);
              }
              `}
      </style>
      {errors?.description && (
        <p className="text-red-500 text-sm capitalize">
          {errors?.description?.message}*
        </p>
      )}
    </LabelInputContainer>
  );
};

export default RichTextEditor;
