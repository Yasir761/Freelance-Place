
import React, { useEffect } from "react";
import { FaSitemap } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import RenderSteps from "../../components/addNewGig/RenderFormSteps";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddNewGig() {

  const gigUploadTips = [
    "Set your gig price or offer it for free.",
    "Use a thumbnail size of 1920x1080.",
    "Upload multiple images to showcase your gig.",
    "Organize services and deliverables in the Gig Services.",
    "Add extras, FAQs, and guidelines in the details section.",
    "Fill the Additional Data section for gig details.",
  ];

  const currentUser = useSelector(store => store?.user?.user)
  const navigate = useNavigate();
  

  
  useEffect(() => {
    
    if(!currentUser?.isSeller){
      navigate(-1);
      return;
    }
    
  })
  
  if(!currentUser?.isSeller) return;

  return (
    <section className="sm:p-6 pt-0 bg-white dark:bg-black">
      <div className="max-w-screen-xl mx-auto p-4 space-y-4">
        <div className=" w-full h-full flex max-lg:flex-wrap items-start justify-between gap-10">
          <div className="w-full">
            <h1 className="text-xl sm:text-3xl font-medium">
              <FaSitemap className="mr-1.5 mb-1 inline-block" />Add New Gig 
            </h1>
            <RenderSteps/>
          </div>
          <div className="border-2 border-gray-200 rounded-xl p-6 shadow-xl max-w-sm">
            <h2 className="font-bold text-2xl">
              <BsFillLightningChargeFill className="inline-block mr-2 text-yellow-500" />
              Gig Upload Tips
            </h2>
            <ul className="mt-5 *:mb-2 *:text-base list-disc px-8">
              {gigUploadTips.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}