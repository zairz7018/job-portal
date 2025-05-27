import { Button, Collapse, Divider, Input, RangeSlider } from "@mantine/core";
import React, { useEffect, useState } from 'react';

import MultiInput from "../FindJobs/MultiInput";
import { searchFields } from "../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const matches = useMediaQuery("(max-width: 475px)");
    const [opened , {toggle}] = useDisclosure(false);
  
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


  return (<div>
      <div className="flex justify-end ">
          {matches && <Button variant="outline" autoContrast color="brightSun.4" m='sm' radius='lg' className="align" onClick={toggle}>{opened?"Close":"Filters"}</Button>} 
        
      </div>
      <Collapse in={(opened || !matches)}>
  <div className="px-5 py-8 flex items-center !text-mine-shaft-100 lg-mx:flex-wrap xs-mx:flex-col xs-mx:min-w-full">
    {/* Talent Name Input - maintenant avec la même largeur que les autres */}
    <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:min-w-full">
      <div className="flex items-center rounded-lg p-2">
        <div className="text-bright-sun-400 bg-mine-shaft-950 rounded-full p-1 mr-2">
          <IconUserCircle size={20} />
        </div>
        <Input
          defaultValue={name}
          onChange={(e) => handleChange("name", e)}
          className="[&_input]:!placeholder-mine-shaft-300 flex-1"
          variant="unstyled"
          placeholder="Talent Name"
        />
      </div>
    </div>

    {!matches && <Divider mr="xs" size="xs" orientation="vertical" />}

    {/* Search Fields */}
    {searchFields.map((item, index) => (
      <React.Fragment key={index}>
        <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:min-w-full">
          <MultiInput 
            title={item.title} 
            icon={item.icon} 
            options={item.options} 
          />
        </div>
        {!matches && <Divider mr="xs" size="xs" orientation="vertical" />}
      </React.Fragment>
    ))}

    {/* Espacement mobile entre Skills et Experience */}
    {matches && <div className="h-4 w-full" />}

    {/* Experience Slider */}
    <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:min-w-full text-sm text-mine-shaft-300 [&_.mantine-Slider-label]:!translate-y-10">
      <div className="flex mb-1 justify-between">
        <div>Experience (Year)</div>
        <div>{value[0]} - {value[1]}</div>
      </div>
      <RangeSlider
        color="brightSun.4"
        size="xs"
        max={50}
        minRange={1}
        min={1}
        onChangeEnd={(e) => handleChange("exp", e)}
        value={value}
        onChange={setValue}
      />
    </div>
  </div>
</Collapse>
    </div>
  );
};

export default SearchBar;
