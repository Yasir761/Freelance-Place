import React, { useEffect, useState } from "react";

import { FaFilter } from "react-icons/fa6";
import { AiOutlineClear } from "react-icons/ai";
import {
  useSortedByDate,
  useSortedByPopularity,
  useSortedByRecommendation,
} from "../../hooks/useSortMethods";
import DropdownList from "../../components/ui/DropdownList";

import { FaAngleDown } from "react-icons/fa6";
import useStateWithWindowEvents from "../../hooks/useStateWithWindowEvents";

const SortFilter = ({ AllGigCards, setGigCards }) => {
  const [budgetFilter, setBudgetFilter] = useState({ min: "", max: "" });

  const selectListArray = [
    { _id: 1, name: "Newest" },
    { _id: 2, name: "Popular" },
    { _id: 3, name: "Recommend" },
  ];

  const [sortMethod, setSortMethod] = useState(selectListArray[1]?._id);

  const [open, setOpen] =  useStateWithWindowEvents(false, "click");

  const handleSetMinMaxValue = (e) => {
    setBudgetFilter((old) => {
      return { ...old, [e.target.id]: e.target.value };
    });
  };

  const handleFilter = () => {
    const { min, max } = budgetFilter;
    if (!min && !max) return;

    let updateList = [];

    if (max === "") {
      updateList = AllGigCards.filter((gig) => gig?.services?.price >= +min);
    } else if (min === "") {
      updateList = AllGigCards.filter((gig) => gig?.services?.price <= +max);
    } else {
      updateList = AllGigCards.filter(
        (gig) => gig.price <= +max && gig?.services?.price >= +min
      );
    }
    setGigCards(updateList);
    setOpen(false)
  };

  const handleSorting = (value) => {
    setSortMethod(value);

    let updateList = [];
    if (value === 2) {
      updateList = useSortedByPopularity(AllGigCards);
    } else if (value === 1) {
      updateList = useSortedByDate(AllGigCards);
    } else {
      updateList = useSortedByRecommendation(AllGigCards);
      if (!updateList) return;
    }
    setGigCards(updateList);
  };

  const handleResetFilter = () => {
    setBudgetFilter({ min: "", max: "" });
    setGigCards(AllGigCards);
    setOpen(false)
  };

  const handleToggleMenu = () => {
    setOpen(!open);
  };


  useEffect(() => {
    if (!budgetFilter.min && !budgetFilter.min) {
      setGigCards(AllGigCards);
    }
  }, [budgetFilter]);

  return (
    <div className="py-4 mt-3  flex  gap-3 items-center bg-inherit">
      <div
        onClick={handleToggleMenu}
        className="relative bg-inherit py-0.5 px-3 rounded-md ring-2 ring-gray-300"
      >
        <span className="text-lg font-semibold text-gray-500 cursor-pointer">
          Budget <FaAngleDown className="inline-block text-gray-400" />
        </span>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`z-10 absolute top-11 -left-1 ${
            open ? "scale-y-1" : "scale-y-0"
          } flex flex-col gap-2 py-6 px-4 rounded-xl shadow-2xl border-2 bg-inherit transition-all duration-100 overflow-hidden origin-top`}
        >
          <input
            type="number"
            name="minimum"
            id="min"
            value={budgetFilter.min}
            onChange={handleSetMinMaxValue}
            className="border-[2px] outline-none border-gray-400 focus:border-blue-700 transition-all duration-200 rounded-md bg-transparent text-sm text-blue-950 font-semibold px-2 py-1 placeholder:text-gray-600 w-full max-w-52 min-w-20"
            placeholder="min"
            min={0}
          />
          <input
            type="number"
            name="maximum"
            id="max"
            value={budgetFilter.max}
            onChange={handleSetMinMaxValue}
            className="border-[2px] outline-none border-gray-400 focus:border-blue-700 transition-all duration-200 rounded-md bg-transparent text-sm text-blue-950 font-semibold px-2 py-1 placeholder:text-gray-600 w-full max-w-52 min-w-20"
            placeholder="max"
            min={0}
          />
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={handleFilter}
              className="px-3 py-1.5 active:scale-95 text-sm rounded-md disabled:bg-gray-400 bg-teal-600 hover:bg-teal-800 flex gap-2 items-center disabled:text-gray-300 disabled:scale-100 disabled:cursor-not-allowed text-teal-50 font-medium"
              disabled={!budgetFilter.min && !budgetFilter.max}
            >
              <FaFilter />
              <span>Filter</span>
            </button>
            <button
              onClick={handleResetFilter}
              className="px-3 py-1 active:scale-95 text-sm rounded-md border-[2px] disabled:border-gray-400 border-teal-600 hover:border-teal-800 flex gap-2 items-center disabled:text-gray-400 disabled:scale-100 disabled:cursor-not-allowed text-teal-700 font-medium"
              disabled={!budgetFilter.min && !budgetFilter.max}
            >
              <AiOutlineClear />
              <span> Reset </span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center *:w-fit">
        <DropdownList
          lists={selectListArray}
          Heading={
            <span className="text-lg font-semibold text-nowrap">Sort By </span>
          }
          onChange={handleSorting}
        />
      </div>
    </div>
  );
};

export default SortFilter;
