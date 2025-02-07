import React from "react";
import { Link } from "react-router-dom";
import { Users } from "../../mocks/data";

const MessagesRow = ({ rowData, bgColor, index, itemList, setItemList }) => {

  const handleMarkReadMessages = (chat, msgId) => {

    const Chats = [...itemList];
    const userIndex = Chats.findIndex(user => user.id === chat.id);

    if(userIndex === -1) return;
    
    const message = Chats[userIndex]?.messages.find(msg => msg.id === msgId);
    message.isRead = true;
    
    setItemList(Chats);
  };

  const handleRemainTime = (date) => {
    const sentDate = new Date(date);
    const currentDate = new Date();

    const diffYear = currentDate.getFullYear() - sentDate.getFullYear();
    const diffMonth = currentDate.getMonth() - sentDate.getMonth();
    const diffDate = currentDate.getDate() - sentDate.getDate();
    const diffHour = currentDate.getHours() - sentDate.getHours();
    const diffMin = currentDate.getMinutes() - sentDate.getMinutes();

    if (diffYear) return `${diffYear} year ago`;
    else if (diffMonth) return `${diffMonth} month ago`;
    else if (diffDate) return `${diffDate} day ago`;
    else if (diffHour) return `${diffHour} hour ago`;
    else if (diffMin) return `${diffMin} min ago`;
    else return `just now`;
    
  };
  //  sender will always in data...
  const sender = Users.find((user) => user.id === rowData.user?.sender);

  return (
    <tr
      className={
        !rowData?.messages[rowData?.messages.length - 1]?.isRead
          ? bgColor
          : "bg-white"
      }
    >
      <td className="p-4">
        <Link to={`/message/${rowData.id}`} >
        <img src={sender.profile} alt={sender.name} className="h-8 w-8 mr-1 rounded-full inline-block"/>
        <span className="font-medium hidden sm:inline-block">{sender.name}</span>
        </Link>
      </td>
      <td className="p-4">
        <Link to={`/message/${rowData.id}`}>
        <span className="max-sm:max-w-40 inline-block whitespace-nowrap overflow-hidden text-ellipsis">
          {
          rowData?.messages[rowData?.messages.length - 1]?.text.substring(
            0,
            50
          )
        }
        {rowData?.messages[rowData?.messages.length - 1]?.text.length >= 50 && "..."}
        </span>
        </Link>
      </td>
      <td className="p-4 text-nowrap">
        {handleRemainTime(
          rowData?.messages[rowData?.messages?.length - 1].createdAt
        )}
      </td>
      {!rowData?.messages[rowData?.messages.length - 1]?.isRead && (
        <td className="p-4">
          <button
            className="border rounded-md py-2 text-sm px-3 bg-blue-500 text-blue-50 active:scale-95 text-nowrap"
            onClick={() =>
              handleMarkReadMessages(
                rowData,
                rowData?.messages[rowData?.messages?.length - 1]?.id
              )
            }
          >
            Mark Read
          </button>
        </td>
      )}
    </tr>
  );
};

export default MessagesRow;
