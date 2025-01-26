import React, { useRef } from "react";
import { setCurrentStep } from "../../slices/formSteps";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { changeLoadingState } from "../../slices/showLoginForm.slice";

const PublishGigPopup = ({ getValues }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((store) => store?.showAuthForm?.isLoading);
  const currentBtnClickRef = useRef(null);

  const saveDataTODraft = () => {
    currentBtnClickRef.current = 'draft';
    dispatch(changeLoadingState(true));

    const data = getValues();
    setTimeout(() => {

      dispatch(changeLoadingState(false));
    }, 2000);
  };

  const onUpdate = () => {
    dispatch(setCurrentStep(1));
  };

  const onSubmit = () => {
    currentBtnClickRef.current = 'publish';
  }

  return (
    <div className="flex items-center justify-center md:py-8">
      <div className="bg-white rounded-lg max-w-lg md:border sm:p-6">
        <h2 className="text-2xl font-semibold mb-4">Publish Your Gig</h2>
        <p className="text-gray-600 mb-6">
          Do you want to publish the gig, update the details, or save it in the
          Draft for future publish?
        </p>
        <div className="flex justify-end flex-col sm:flex-row gap-3">
          <button
            onClick={saveDataTODraft}
            type="button" disabled={isLoading}
            className="disabled:cursor-not-allowed disabled:bg-gray-300 px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
          >
            {currentBtnClickRef.current === "draft" && isLoading ? (
              <Loading className={"border-gray-900"}/>
            ) : (
              <span>Save Draft</span>
            )}
          </button>
          <button
            onClick={onUpdate}
            type="button"  disabled={isLoading}
            className="disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400 px-4 py-2 text-sm text-blue-700 bg-blue-100 rounded hover:bg-blue-200 focus:outline-none"
          >
            Update Data
          </button>

          <button
            type="submit" disabled={isLoading}
            onClick={() => {onSubmit()}}
            className="disabled:cursor-not-allowed disabled:bg-green-300 px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none"
          >
            {currentBtnClickRef.current === "publish" && isLoading ? (
              <Loading />
            ) : (
              <span>Publish Gig</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishGigPopup;
