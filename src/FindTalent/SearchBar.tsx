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
      <Collapse in={(opened || !matches)} >
      
    
    <div className=" px-5 py-8 lg-mx:!flex-wrap  items-center  !text-mine-shaft-100 flex  xs-mx:flex-col "> 

<div className="w-1/5 lg-mx:w1/4 bs-mx:w-[30%] sm-mx:w-[48%]  xs-mx:w-full">
        <div className="text-bright-sun-400 bg-mine-shaft-950 rounded-full p-1 mr-2 ">
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
        <Divider className="sm-mx:hidden" mr="xs" size="xs" orientation="vertical" />
      
      {
      searchFields.map((item, index) => { 
        return (
          <React.Fragment key={index}>
            <div key={index} className="w-1/5 lg-mx:w1/4 bs-mx:w-[30%] sm-mx:w-[48%]  xs-mx:w-full">  
            
              <MultiInput  title={item.title} icon= {item.icon} options={item.options} />
            </div>
            <Divider className="sm-mx:hidden" mr="xs" size="xs" orientation="vertical" />
          </React.Fragment>
        )
      })
    }
      <div className="w-1/5 lg-mx:w1/4 lg-mx:mt-7 bs-mx:w-[30%] text-sm sm-mx:w-[48%] text-mine-shaft-300  xs-mx:w-full [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex mb-1 justify-between">
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
    </Collapse>
    </div>
  );
};

export default SearchBar;
