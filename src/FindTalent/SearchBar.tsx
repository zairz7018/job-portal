import { Divider, Input, RangeSlider } from "@mantine/core";
import React, { useEffect, useState } from 'react';

import MultiInput from "../FindJobs/MultiInput";
import { searchFields } from "../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 50]);
  const [name , setName] = useState('');

  const handleChange = (name: any, event: any) => {
    if (name === "exp") {
      dispatch(updateFilter({ exp: event }));
    } else {
      const value = event?.target?.value ?? ''; // Protection contre undefined
      dispatch(updateFilter({ name: value }));
      setName(value);
    }
  };


  return (
    <div className="flex px-5 py-8 items-center !text-mine-shaft-100 ">
      <div className="flex items-center">
        <div className="text-bright-sun-400 bg-mine-shaft-950 rounded-full p-1 mr-2">
          <IconUserCircle size={20} />
        </div>
        <Input
          defaultValue={name}
          onChange={(e) => handleChange("name", e)}
          className="[&_input]:!placeholder-mine-shaft-300"
          variant="unistyled"
          placeholder="Talent Name"
        />
      </div>

      <Divider mr="xs" size="xs" orientation="vertical" />

      {
      searchFields.map((item, index) => { 
        return (
          <React.Fragment key={index}>
            <div className="w-1/5">
              <MultiInput title={item.title} icon= {item.icon} options={item.options} />
            </div>
            <Divider mr="xs" size="xs" orientation="vertical" />
          </React.Fragment>
        )
      })
    }

      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between">
          <div>Experience (Year)</div>
          <div>{value[0]} - {value[1]}</div>
        </div>
        <RangeSlider
          color="brightSun.4"
          size="xs"
          max={50}
          minRange={1}
          mih={1}
          onChangeEnd={(e) => handleChange("exp", e)}
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  );
};

export default SearchBar;
