import React, { useState } from "react";
import { Label } from "./label";
import { LabelInputContainer } from "../forms/InputBoxUtils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const DropdownList = ({ lists, label, onChange, value, Heading, errors = null }) => {
  return (
    <LabelInputContainer>
      {label && <Label
        children={label}
        htmlFor={label}
        className={"text-lg text-gray-500"}
      />}
      <Select onValueChange={onChange} >
        <SelectTrigger className="w-full border-gray-300 shadow-input border-2 text-base">
          <SelectValue placeholder={Heading} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {lists.map((item) => (
              <SelectItem value={item?._id} key={item._id}>
                {item?.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors?.category && (
        <p className="text-red-500 text-sm capitalize">
          {errors.category?.message}*
        </p>
      )}
    </LabelInputContainer>
  );
};

export default DropdownList;
