import { Gig } from "../models/gig.model.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import ApiResponse from "../utils/ApiResponse.js";
import { Payment } from "../models/payment.model.js";
import { Order } from "../models/order.model.js";

const getAllOrders = AsyncHandler(async (req, res) => {
  const buyerId = req.user?._id;
  if (!buyerId) throw new ApiError(403, "Buyer not found");

  const orders = await Order.find({ buyer: buyerId })
    .populate({
      path: "gigId",
      select: "coverPicture services",
      populate:"services"
    })
    .populate({
      path: "seller",
      select: "firstName lastName profile",
    })
    .populate({
      path: "buyer",
      select: "firstName lastName profile",
    });

  if (!orders) throw new ApiError(404, "Orders not found");

  res.status(200).json(new ApiResponse(200, orders, "Orders fetch successfully"))
});

const createNewOrder = AsyncHandler(async (req, res) => {
  const { id } = req.body;

  const gigToPurchase = await Gig.findById(id).populate("services");

  if (!gigToPurchase) throw new ApiError(404, "Gig not found");

  const options = {
    amount: Number(gigToPurchase?.services?.price * 100),
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };

  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  razorpayInstance.orders.create(options, (error, order) => {
    if (error) {
      throw new ApiError(400, error.message);
    }

    res.status(200).json(new ApiResponse(200, order));
  });
});

const verifyPayment = AsyncHandler(async (req, res) => {
  const { razorpay_signature, razorpay_order_id, razorpay_payment_id, gigId } =
    req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  // Create ExpectedSign just like the razorpay sign
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(sign.toString())
    .digest("hex");

  // Authenticate Razorpay payment successfully or not
  const isAuthentic = expectedSign === razorpay_signature;

  if (!isAuthentic) throw new ApiError(403, "Payment request failed");

  const gig = await Gig.findByIdAndUpdate(
    gigId,
    { 
      $inc:
      { sales: 1 } 
    },
    {new:true}
);

  const payment = await Payment.create({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  if (!payment) throw new ApiError(403, "Payment failed");

  const order = await Order.create({
    gigId: gig?._id,
    seller: gig?.author,
    buyer: req?.user?._id,
    isCompleted: true,
    paymentIntentId: payment?._id,
  });

  if (!order) throw new ApiError(401, "Order not completed.");

  res
    .status(200)
    .json(new ApiResponse(200, order, "Order Completd Successfully."));
});

export { createNewOrder, verifyPayment, getAllOrders };
