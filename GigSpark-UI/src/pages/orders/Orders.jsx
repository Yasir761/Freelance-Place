import React, { useEffect, useState } from "react";
import { dummyUserInfo, gigsData } from "../../mocks/data";
import Table from "../../components/table/Table";
import OrderRow from "../../components/orders/OrderRow";
import { fetchAllOrder } from "../../utils/placeOrder";
import { useDispatch, useSelector } from "react-redux";
import { changeLoadingState } from "../../slices/showLoginForm.slice";
import TableLoadingPlaceholder from "../../components/ui/shimmerUI/TableShimmerUi";

const Orders = () => {
  const columns = [
    "Image",
    "Title",
    "Price",
    dummyUserInfo.isSeller ? "Buyer" : "Seller",
    "Contact",
  ];

  const [ orders, setOrders ] = useState([])

  const isLoading = useSelector((store) => store?.showAuthForm?.isLoading);
  const dispatch = useDispatch();

  const fetchMyOrders = async() => {
    dispatch(changeLoadingState(true))
    const data =await fetchAllOrder();
    setOrders(data);
    dispatch(changeLoadingState(false))
  }

  useEffect(( ) => {
    fetchMyOrders();
  }, [])

  return (
    <section className="sm:p-6">
      <div className="max-w-screen-xl mx-auto p-6 ">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-3xl font-bold">Orders</h1>
        </div>
        <div className="overflow-x-auto">
        {isLoading ? (
            <TableLoadingPlaceholder />
          ) :
          <Table
            data={orders}
            column={columns}
            Row={OrderRow}
            bgColor={"bg-blue-50"}
          />
          }
        </div>
      </div>
    </section>
  );
};

export default Orders;
