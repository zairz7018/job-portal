import { useState } from "react";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";

const ExpInput = (props:any) => {
  const select=fields;
  const [startDate , setStartDate]=useState<Date | null>(new Date());
  const [checked , setChecked] = useState(false);
  const [endDate , setEndDate]=useState<Date | null>(new Date());
  const [desc , setDesc] = useState("");
  return <div className="flex flex-col gap-3">
    <div className="text-lg font-semibold">{props.add?"Add":"Edit"} Experience </div>
          <div className="flex gap-10 [&>*]:w-1/2">
              <SelectInput  {...select[0]}/>
              <SelectInput  {...select[1]}/>
            </div>
              <SelectInput  {...select[2]}/>
              <Textarea withAsterisk label="Summary" value={desc} placeholder="Enter Summary ..." autosize minRows={3} onChange={(event)=> setDesc(event.target.value)}/> 

            <div className="flex gap-10 [&>*]:w-1/2">
              <MonthPickerInput withAsterisk maxDate={endDate ||undefined} label="Start Date" placeholder="Pick date" value={startDate} onChange={setStartDate} />
              <MonthPickerInput disabled={checked} withAsterisk minDate={startDate||undefined} maxDate={new Date()} label="End Date" placeholder="Pick date" value={endDate} onChange={setEndDate} />
              
            </div>
            <Checkbox checked={checked} onChange={(event)=> setChecked(event.currentTarget.checked)} autoContrast label="Currently work here" />
              <div className="flex gap-5">
                        <Button onClick={()=>props.setEdit(false)} color="brightSun.4" variant="outline">Save</Button>
                        <Button onClick={()=>props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
                      </div>
</div>
}
export default ExpInput;