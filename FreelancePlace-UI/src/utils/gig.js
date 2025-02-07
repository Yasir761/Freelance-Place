import toast from "react-hot-toast";
import { Gig } from "../services/api";
import { newRequest } from "../services/newRequest";
import { removeItemFromLocalstorage } from "../services/localStorage";

const fetchGig = async (id) => {
  const { SINGLE_GIG } = Gig;
  toast.dismiss();

  const response = await newRequest("get", SINGLE_GIG(id), null);

  if (typeof response === "string") {

    (response  !== "Unauthorized request" &&  toast.error(response));

    return;
  }
  toast.success(response?.message);
  return response?.data;
};

const createNewGig = async (data) => {
  const { ADD_NEW_GIG } = Gig;
  toast.dismiss();

  const response = await newRequest("post", ADD_NEW_GIG, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  if (typeof response === "string") {
    (response  !== "Unauthorized request" &&  toast.error(response));
    return;
  }
  toast.success(response?.message);
  return response;
};

const fetchMyGig = async (filter) => {
  const { ALL_GIGS } = Gig;
  toast.dismiss();

  const response = await newRequest("get", ALL_GIGS, filter);

  if ( response === "Unauthorized request" || response === "Invalid Access Token" ) {
    // reset if token is expired or removed...
    removeItemFromLocalstorage("user");
    removeItemFromLocalstorage("sessionTimeout");
  }

  if (typeof response === "string") {
    (response  !== "Unauthorized request" &&  toast.error(response));
    
    return response;
  }
  toast.success(response?.message);
  return response?.data;
}

export { fetchGig, createNewGig, fetchMyGig };
