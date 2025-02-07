import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const GigsRow = ({ rowData, bgColor, index, itemList, setItemList }) => {

  const handleDeleteItem =  (id) => {
    const remaingItem = itemList.filter(item => item._id !== id);
    setItemList(remaingItem);
  }


  return (
    <tr className={index % 2 === 0 ? bgColor : "bg-white"}>
      <td className="p-4">
        <Link to={`/gig/${rowData._id}`}>
          <img
            src={rowData?.coverPicture?.url}
            alt={rowData?.title}
            className="w-10 h-10 object-cover rounded"
          />
        </Link>
      </td>
      <td className="p-4">
        <Link to={`/gig/${rowData?._id}`} className="inline-block max-sm:max-w-28 max-w-48 whitespace-nowrap overflow-hidden text-ellipsis">{rowData?.services?.serviceTitle}</Link>
      </td>
      <td className="p-4">{rowData?.services?.price}</td>
      <td className="p-4">{rowData?.sales}</td>
      <td className="p-4 pl-8">
        <button className="text-red-500  hover:text-red-600" onClick={() => handleDeleteItem(rowData?._id) }>
          <FaTrashAlt className="text-xl" />
        </button>
      </td>
    </tr>
  );
};

export default GigsRow;
