import React, { useState } from "react";
import { LabelInputContainer } from "./InputBoxUtils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IoTrashBin } from "react-icons/io5";

const ErrorSpan = ({message}) => {
  return   <p className="text-red-500 text-sm capitalize">
   {message}*
</p>
}

const NewGigServices = ({ register, remove, getValues, append, errors }) => {
  const gigDetails = getValues();
  const [feature, setFeature] = useState("");

  const [featuresList, setFeaturesList] = useState(
    gigDetails?.services?.features || []
  );

  const handleRemoveFeature = (index) => {
    const updateKeywordList = featuresList.filter((_, idx) => idx !== index);
    setFeaturesList(updateKeywordList);
    remove(index);
  };

  const handleUpdateFeaturesList = (text) => {
    if (text.includes(",")) {
      let textArr = feature.split(",");
      textArr = textArr.filter((word) => word.trim() !== "");
      const updatedFeatureList = [...featuresList, ...textArr];

      setFeaturesList(updatedFeatureList);
      append(...textArr);
      // setValue("services.features", updatedFeatureList);
      setFeature("");
    } else {
      setFeature(text);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <LabelInputContainer className={"space-y-0"}>
        <Label
          htmlFor="serviceTitle"
          className={"text-lg text-gray-500"}
          children={
            <>
              Service Title
              <span className="text-[#EF476F]"> *</span>
            </>
          }
        />
        <Input
          id="serviceTitle"
          placeholder="Enter gig service title"
          type="text"
          className={"text-lg p-4 bg-gray-50"}
          {...register("services.serviceTitle", { required: true })}
        />
        {errors?.services?.serviceTitle && <ErrorSpan message={"Service Title is required"}/>}
      </LabelInputContainer>
      <LabelInputContainer className={"space-y-0"}>
        <Label
          htmlFor="serviceDescription"
          className={"text-lg text-gray-500"}
          children={
            <>
              Service Description
              <span className="text-[#EF476F]"> *</span>
            </>
          }
        />
        <Input
          id="serviceDescription"
          placeholder="Enter gig service description"
          type="text"
          className={"text-lg p-4 bg-gray-50"}
          {...register("services.serviceDescription", { required: true })}
        />
        {errors?.services?.serviceDescription && <ErrorSpan message={"Service Description is required"}/>}
      </LabelInputContainer>
      <LabelInputContainer className={"space-y-0"}>
        <Label
          htmlFor="price"
          className={"text-lg text-gray-500"}
          children={
            <>
              Price
              <span className="text-[#EF476F]"> *</span>
            </>
          }
        />
        <Input
          id="price"
          placeholder="Enter gig price"
          type="number"
          className={"text-lg p-4 bg-gray-50"}
          {...register("services.price", { required: true })}
        />
        {errors?.services?.price && <ErrorSpan message={"Price is required"}/>}
      </LabelInputContainer>
      <LabelInputContainer className={"space-y-0"}>
        <Label
          htmlFor="deliveryTime"
          className={"text-lg text-gray-500"}
          children={
            <>
              Delivery Time
              <span className="text-[#EF476F]"> *</span>
            </>
          }
        />
        <Input
          id="deliveryTime"
          placeholder="Enter gig delivery time in days"
          type="number"
          className={"text-lg p-4 bg-gray-50"}
          {...register("services.deliveryTime", { required: true })}
        />
        {errors?.services?.deliveryTime && <ErrorSpan message={"Delivery Time is required"}/>}
      </LabelInputContainer>
      <LabelInputContainer className={"space-y-0"}>
        <Label
          htmlFor="revisions"
          className={"text-lg text-gray-500"}
          children={"Revisions"}
        />
        <Input
          id="revisions"
          placeholder="Enter gig revisions"
          className={"text-lg p-4 bg-gray-50"}
          {...register("services.revisions", { required: true })}
          type="number"
        />
        {errors?.services?.revisions && <ErrorSpan message={"Revisions is required"}/>}
      </LabelInputContainer>
      <LabelInputContainer className={"space-y-1"}>
        <Label
          htmlFor="features"
          className={"text-lg text-gray-500"}
          children={
            <>
              Features
              <span className="text-[#EF476F]"> * </span>
              <span className="text-sm align-bottom font-normal text-gray-500">
                ( saperated by ',' OR click to Add )
              </span>
            </>
          }
        />
        <div className="flex gap-1 sm:gap-3 w-full *:w-full">
          <Input
            id="features"
            placeholder="Enter features list here..."
            type="text"
            value={feature}
            onChange={(e) => handleUpdateFeaturesList(e.target.value)}
            className={"text-lg p-4 bg-gray-50 "}
          />
          <button
            type="button"
            onClick={() => handleUpdateFeaturesList(feature + ",")}
            disabled={!feature}
            className="rounded-md border-2 border-gray-300 px-3 sm:px-8 font-medium bg-gray-950 text-gray-100 active:scale-95 max-w-fit disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 transition-all disabled:active:scale-100"
          >
            Add
          </button>
        </div>
        <div
          className={`${
            featuresList.length > 0 && "p-4"
          } rounded-md space-y-2 bg-gray-100 flex flex-col`}
        >
          {featuresList.length > 0 &&
            featuresList.map((word, i) => (
              <p
                key={i}
                className=" text-neutral-600 dark:text-white capitalize flex"
              >
                <span className="flex-1">
                  {" "}
                  {i + 1}. {word}{" "}
                </span>
                <IoTrashBin
                  className="text-[#ef4747] cursor-pointer p-1.5 text-3xl inline-block self-end"
                  onClick={() => handleRemoveFeature(i)}
                />
              </p>
            ))}
        </div>
        {errors?.services?.features && <ErrorSpan message={"Features is required"}/>}
      </LabelInputContainer>
    </div>
  );
};

export default NewGigServices;
