import { Button, Collapse, Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import MultiInput from "./MultiInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const matches = useMediaQuery("(max-width: 475px)");
  const [opened , {toggle}] = useDisclosure(false);
  const dispatch = useDispatch();
const [value, setValue] = useState<[number, number]>([0, 300]);

const handleChange = (event: any) => {
  dispatch(updateFilter({ salary: event }));
};




return <div>
  <div className="flex justify-end">
      {matches && <Button variant="outline" autoContrast color="brightSun.4" m='sm' radius='lg' className="align" onClick={toggle}>{opened?"Close":"Filters"}</Button>} 
    
  </div>
  <Collapse in={(opened || !matches)} >
  

<div className=" flex px-5 py-8 items-center !text-mine-shaft-100 lg-mx:!flex-wrap">
    {
      dropdownData.map((item,index) => <> <div key={index} className="w-1/5 lg-mx:w1/4 bs-mx:w-[30%] sm-mx:w-[48%]">
          <MultiInput title={item.title} icon={item.icon} options={item.options} />
        
          </div>
          <Divider mr="xs" size="xs" orientation="vertical" className="sm-mx:hidden" />
           </>)
    }
    <div className="w-1/5 lg-mx:w1/4 lg-mx:mt-7 bs-mx:w-[30%] text-sm sm-mx:w-[48%] xs-mx:w-full
     [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between">
          <div>Salary </div>
          <div>&euro;{value[0] } EURO - &euro;{value[1] } </div>
        </div>
      <RangeSlider color="brightSun.4"
          size="xs"
          max={300}
          minRange={1}
          mih={1}
          onChangeEnd={handleChange}
          value={value}
          onChange={setValue} />
    </div>
    
  </div>
  </Collapse>
  </div>
}
export default SearchBar;