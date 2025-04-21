import { Button, TextInput } from "@mantine/core";
import SelectInput from "../PostJob/SelectInput";
import fields from "../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";


const CertiInput = (props:any) => {
  const [IssueDate , setIssueDate]=useState<Date | null>(new Date());
  const select = fields;
  return <div className="flex flex-col gap-3">
    <div className="text-lg font-semibold">add Certificate </div>
    <div className="flex gap-10 [&>*]:w-1/2">
    <TextInput label="title" withAsterisk placeholder="Enter Title" />
    <SelectInput {...select[1]}/>
    </div>

    <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput withAsterisk maxDate={new Date()} label="Issue Date" placeholder="Pick date" value={IssueDate} onChange={setIssueDate} />
        <TextInput label="Certificate Id" withAsterisk placeholder="Enter Id" />
    </div>

    <div className="flex gap-5">
          <Button onClick={()=>props.setEdit(false)} color="brightSun.4" variant="outline">Save</Button>
           <Button onClick={()=>props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
    </div>
   
</div>
}
export default CertiInput;