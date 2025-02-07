import React, { useState } from "react";
import { LabelInputContainer } from "./InputBoxUtils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { IoCloseSharp } from "react-icons/io5";
import { FileUpload } from "../ui/FileUpload";
import DropdownList from "../ui/DropdownList";
import { useSelector } from "react-redux";
import RichTextEditor from "../addNewGig/GigDetailsBox";

const NewGigForm = ({
  register,
  setValue,
  errors,
  getValues,
  removeKeyword,
  removeImages,
  removeCoverPicture,
  appendKeyword,
}) => {
  const gigDetails = getValues();
  const [keywords, setKeywords] = useState(gigDetails?.keywords || []);

  const [selectValue, setSelectedValue] = useState(gigDetails?.category);

  const [keywordInput, setKeywordInput] = useState("");

  const allCategory = useSelector((store) => store.category);

  const handleRemoveTag = (index) => {
    const updateKeywordList = keywords.filter((_, i) => i !== index);
    setKeywords(updateKeywordList);
    removeKeyword(index);
  };

  const handleUpdateKeywordList = (text) => {
    if (text.includes(",")) {
      let textArr = keywordInput.split(",");
      textArr = textArr.filter((word) => word.trim() !== "");

      setKeywords((prev) => [...prev, ...textArr]);
      setKeywordInput("");
      appendKeyword(...textArr);
    } else {
      setKeywordInput(text);
    }
  };

  const handleSelectCotegory = (id) => {
    setSelectedValue(id);
    setValue("category", id);
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <LabelInputContainer className={"space-y-0"}>
          <Label
            htmlFor="title"
            className={"text-lg text-gray-500"}
            children={
              <>
                Title
                <span className="text-[#EF476F]"> *</span>
              </>
            }
          />
          <Input
            id="title"
            placeholder="Enter gig title"
            type="text"
            className={"text-lg p-4 bg-gray-50"}
            {...register("title", {
              required: true,
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm capitalize">
              {errors.title?.message}*
            </p>
          )}
        </LabelInputContainer>

        <RichTextEditor
          setValue={setValue}
          value={gigDetails?.description}
          errors={errors}
        />

        <LabelInputContainer className={"space-y-1"}>
          <Label
            htmlFor="keywords"
            className={"text-lg text-gray-500"}
            children={
              <>
                keywords
                <span className="text-[#EF476F]"> * </span>
                <span className="text-sm align-bottom font-normal text-gray-500">
                  ( saperated by ',' OR click to Add )
                </span>
              </>
            }
          />
          <div className="flex gap-1 sm:gap-3 w-full *:w-full">
            <Input
              id="keywords"
              placeholder="Enter keywords here..."
              type="text"
              value={keywordInput}
              onChange={(e) => handleUpdateKeywordList(e.target.value)}
              className={"text-lg p-4 bg-gray-50 "}
            />
            <button
              type="button"
              onClick={() => handleUpdateKeywordList(keywordInput + ",")}
              disabled={!keywordInput}
              className="rounded-md border-2 border-gray-300 px-3 sm:px-8 font-medium bg-gray-950 text-gray-100 active:scale-95 max-w-fit disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 transition-all disabled:active:scale-100"
            >
              Add
            </button>
          </div>
          <div className="px-3 flex gap-3 flex-wrap">
            {keywords.length > 0 &&
              keywords.map((word, i) => (
                <div className="flex gap-0.5" key={i}>
                  <span
                    key={i}
                    className="rounded-lg px-2 py-1 w-fit text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input text-xs"
                  >
                    {word}
                  </span>
                  <IoCloseSharp
                    className="text-[#EF476F] cursor-pointer p-1 text-xl -mt-1.5"
                    onClick={() => handleRemoveTag(i)}
                  />
                </div>
              ))}
          </div>
          {errors?.keywords && (
            <p className="text-red-500 text-sm capitalize">
              {errors.keywords?.message}*
            </p>
          )}
        </LabelInputContainer>

        <DropdownList
          lists={allCategory}
          label={
            <>
              Category
              <span className="text-[#EF476F]"> *</span>
            </>
          }
          value={selectValue}
          Heading={<span className="">Select a category </span>}
          errors={errors}
          onChange={handleSelectCotegory}
        />

        <FileUpload
          multiple={false}
          label={
            <>
              Upload cover image
              <span className="text-[#EF476F]"> *</span>
            </>
          }
          maxLength={1}
          selectedFileColumn={1}
          remove={removeCoverPicture}
          setValue={setValue}
          name={"coverPicture"}
          errors={errors}
          value={gigDetails?.coverPicture || []}
        />

        <FileUpload
          multiple={true}
          maxLength={5}
          label={<>Upload multiple images (maximum 5)</>}
          selectedFileColumn={2}
          remove={removeImages}
          setValue={setValue}
          name={"images"}
          value={gigDetails?.images || []}
        />
      </div>
    </div>
  );
};

export default NewGigForm;
