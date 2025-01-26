import toast from "react-hot-toast";
import { Payment } from "../services/api";
import { removeItemFromLocalstorage } from "../services/localStorage";
import { newRequest } from "../services/newRequest";

const handlePayment = async (productId, email) => {

  if (!productId) return;
  const { CREATE_NEW_ORDER } = Payment;
  toast.dismiss();

  const response = await newRequest("post", CREATE_NEW_ORDER, {
    id: productId,
  });

  if (
    response === "Unauthorized request" ||
    response === "Invalid Access Token"
  ) {
    // reset if token is expired or removed...
    removeItemFromLocalstorage("user");
    removeItemFromLocalstorage("sessionTimeout");
  }

  if (typeof response === "string") {
    (response  !== "Unauthorized request" &&  toast.error(response));
    return response;
  }

  handlePaymentVerify(response?.data, email, productId);
};

const handlePaymentVerify = async (orderDetails, name, gigId) => {
  const { VERIFY_PAYMENT } = Payment;
  const RAZORPAY_KEY_ID = import.meta.env.RAZORPAY_KEY_ID;

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: orderDetails.amount,
    currency: orderDetails.currency,
    name: name,
    description: "Test Mode",
    order_id: orderDetails.id,
    handler: async (response) => {
      
      const paymentDetails = {...response, gigId }
      toast.dismiss();

      const result = await newRequest("post", VERIFY_PAYMENT, paymentDetails);

      if (typeof result === "string") {
        (result  !== "Unauthorized request" &&  toast.error(result));

        return;
      }

      // order place successfully...
      toast.success(result?.message);
    },

    theme: {
      color: "#5f63b8",
    },
  };

  const paymentPopupWindow = new window.Razorpay(options);

  paymentPopupWindow.open();
};

const fetchAllOrder = async () => {
  const { GET_MY_ORDERS } = Payment;
  toast.dismiss();

  const response = await newRequest("get", GET_MY_ORDERS, null);

  if ( response === "Unauthorized request" || response === "Invalid Access Token" ) {
    // reset if token is expired or removed...
    removeItemFromLocalstorage("user");
    removeItemFromLocalstorage("sessionTimeout");
    (response && toast.error(response));
    return;
  }

  if (typeof response === "string") {
    (response  !== "Unauthorized request" &&  toast.error(response));
    return response;
  }
  toast.success(response?.message);
  return response?.data;

}

export { handlePayment, fetchAllOrder };
