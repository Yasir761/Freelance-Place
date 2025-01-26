import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiImessage } from "react-icons/si";

const OrderRow = ({ rowData, bgColor, index, itemList, setItemList }) => {
  const navigate = useNavigate();

  const handleMessageUser = () => {
    navigate("/messages");
  };

  return (
    <tr className={index % 2 === 0 ? bgColor : "bg-white"}>
      <td className="p-4">
        <Link to={`/gig/${rowData?.gigId?._id}`}>
          <img
            src={rowData?.gigId?.coverPicture?.url}
            alt={rowData?.gigId?.services?.serviceTitle}
            className="w-10 h-10 object-cover rounded"
          />
        </Link>
      </td>
      <td className="p-4">
        <Link to={`/gig/${rowData?.gigId?._id}`} className="inline-block max-sm:max-w-28 max-w-48 whitespace-nowrap overflow-hidden text-ellipsis">{rowData?.gigId?.services?.serviceTitle}</Link>
      </td>
      <td className="p-4">{rowData?.gigId?.services?.price}</td>
      <td className="p-4 capitalize">
        <Link to={`/profile/${rowData?.seller?._id}`}>
        {rowData?.seller?.firstName} {rowData?.seller?.lastName}
        </Link>
        </td>
      <td className="p-4 pl-8">
        <button
          className="text-blue-500  hover:text-blue-600"
          onClick={handleMessageUser}
        >
          <SiImessage className="text-2xl" />
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
