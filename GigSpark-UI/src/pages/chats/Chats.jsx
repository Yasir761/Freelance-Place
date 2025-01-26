import React, { useEffect, useState } from "react";
import { Chats } from "../../mocks/data";
import Table from "../../components/table/Table";
import MessagesRow from "./ChatRow";
import { useDispatch, useSelector } from "react-redux";
import TableLoadingPlaceholder from "../../components/ui/shimmerUI/TableShimmerUi";
import { changeLoadingState } from "../../slices/showLoginForm.slice";

const Messages = () => {
  const columns = ["Buyer", "Last Message", "Date", "Action"];

  const [allChats, setAllChats] =  useState([])

  const isLoading = useSelector((store) => store?.showAuthForm?.isLoading);
  const dispatch = useDispatch();

  const fetchMessages = async() => {
    dispatch(changeLoadingState(true))
    // const data = await fetchAllChats();
    setAllChats(Chats); // dummy chats for now
    dispatch(changeLoadingState(false))
  }

  useEffect(( ) => {
    fetchMessages();
  }, [])

  return (
    <section className="sm:p-6">
      <div className="max-w-screen-xl mx-auto p-6 ">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-3xl font-bold">Messages</h1>
        </div>
        <div className="overflow-x-auto">
        {isLoading ? (
            <TableLoadingPlaceholder />
          ) :
          <Table
            data={allChats}
            column={columns}
            Row={MessagesRow}
            bgColor={"bg-blue-100"}
          />}
        </div>
      </div>
    </section>
  );
};

export default Messages;
