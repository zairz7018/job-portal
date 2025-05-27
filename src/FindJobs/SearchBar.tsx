import { Button, Collapse, Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import MultiInput from "./MultiInput";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const matches = useMediaQuery("(max-width: 475px)");
  const [opened, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 300]);

  const handleChange = (event: any) => {
    dispatch(updateFilter({ salary: event }));
  };

  return (
    <div>
      <div className="flex justify-end">
        {matches && (
          <Button
            variant="outline"
            autoContrast
            color="brightSun.4"
            m='sm'
            radius='lg'
            onClick={toggle}
          >
            {opened ? "Close" : "Filters"}
          </Button>
        )}
      </div>
      
      <Collapse in={(opened || !matches)}>
        <div className="px-5 py-8 flex items-center !text-mine-shaft-100 lg-mx:flex-wrap xs-mx:flex-col xs-mx:min-w-full">
          {dropdownData.map((item, index) => (
            <React.Fragment key={index}>
              <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:min-w-full xs-mx:mb-1">
                <MultiInput 
                  title={item.title} 
                  icon={item.icon} 
                  options={item.options} 
                />
              </div>
              {!matches && <Divider mr="xs" size="xs" orientation="vertical" />}
            </React.Fragment>
          ))}
          
          {matches && <div className="h-4 w-full" />}

          <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] text-sm sm-mx:w-[48%] xs-mx:w-full xs-mx:min-w-full [&_.mantine-Slider-label]:!translate-y-10 xs-mx:mb-1">
            <div className="flex text-sm justify-between">
              <div>Salary</div>
              <div>&euro;{value[0]} - &euro;{value[1]}</div>
            </div>
            <RangeSlider
              color="brightSun.4"
              size="xs"
              max={300}
              minRange={1}
              min={1}
              onChangeEnd={handleChange}
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