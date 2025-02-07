import React from "react";
import NewGigForm from "../forms/NewGigForm";
import NewGigServices from "../forms/NewGigServices";
import PublishGigPopup from "../ui/PublishGigPopup";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCurrentStep } from "../../slices/formSteps";
import { createNewGig } from "../../utils/gig";
import { changeLoadingState } from "../../slices/showLoginForm.slice";
import toast from "react-hot-toast";

// Custom Hook for handling form data
const useNewGigForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      keywords: [],
      coverPicture: [],
      category: "",
      services: {
        serviceTitle: "",
        serviceDescription: "",
        price: "",
        deliveryTime: "",
        features: [],
      },
    },
  });

  const validateStep = (step, data) => {
    clearErrors();
    if (step === 2 || step === 3) {
      const validateFields = step === 2 ? data : data?.services;

      const emptyFields = Object.entries(validateFields).filter(
        ([key, inputValues]) => !inputValues?.length
      );

      // 1 field will always be due to images array which is not required field need to exclude to validate.

      emptyFields.forEach(([fieldName, value]) =>
        setError(step === 2 ? fieldName : `services.${fieldName}`, {
          type: "manual",
          message: `${fieldName} is required`,
        })
      );

      return emptyFields.length === 0;
    }
    return true;
  };

  return {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState,
    validateStep,
  };
};

const StepButton = ({ label, onClick, disabled, iconLeft, iconRight }) => (
  <button
    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition relative disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed"
    onClick={onClick}
    disabled={disabled}
  >
    {iconLeft && <span className="inline-block mr-2">{iconLeft}</span>}
    {label}
    {iconRight && <span className="inline-block ml-2">{iconRight}</span>}
  </button>
);

const NewGigMultistepForm = () => {
  const currentStep = useSelector((store) => store.currentFormStep);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
    validateStep,
  } = useNewGigForm();

  const handleNextStep = (step) => {
    const data = getValues();

    if (step < 1 || step > 3 || !validateStep(step, data)) return;

    dispatch(setCurrentStep(step));
  };

  const handleCreateNewGig = async (data) => {
    dispatch(changeLoadingState(true));
    toast.dismiss()
    const toastId = toast.loading("Creating New Gig...");
    const formData = new FormData();

    // Append data to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(
          key,
          typeof value === "object" ? JSON.stringify(value) : value
        );
      }
    });

    const response = await createNewGig(formData);
    toast.success(response?.message, { id: toastId });
    dispatch(changeLoadingState(false));
    navigate("/myGigs");
    dispatch(setCurrentStep(1));
  };

  const stepComponents = [
    <NewGigForm
      key="step1"
      register={register}
      setValue={setValue}
      errors={errors}
      getValues={getValues}
      control={control}
    />,
    <NewGigServices
      key="step2"
      register={register}
      errors={errors}
      control={control}
    />,
    <PublishGigPopup key="step3" getValues={getValues} />,
  ];

  return (
    <div className="border-2 border-gray-200 rounded-lg p-6 shadow-xl">
      <form onSubmit={handleSubmit(handleCreateNewGig)}>
        {stepComponents[currentStep - 1]}
      </form>
      {currentStep !== 3 && (
        <div className="flex gap-2 py-8">
          <StepButton
            label="Previous"
            disabled={currentStep === 1}
            onClick={() => handleNextStep(currentStep - 1)}
            iconLeft={<FaArrowLeftLong />}
          />
          <StepButton
            label="Next"
            disabled={currentStep === 3}
            onClick={() => handleNextStep(currentStep + 1)}
            iconRight={<FaArrowRightLong />}
          />
        </div>
      )}
    </div>
  );
};

export default NewGigMultistepForm;
