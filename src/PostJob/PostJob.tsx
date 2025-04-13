import { TagsInput } from "@mantine/core";
import { fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";

const PostJob = () => {
  const select = fields;
  return <div className="w-4/5 mx-auto">
    <div className="text-2xl font-semibold mb-5">Post a job </div>
    <div className="flex flex-col gap-5">
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput {...select[0]}/>
        <SelectInput {...select[1]}/>
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput {...select[2]}/>
        <SelectInput {...select[3]}/>
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput {...select[4]}/>
        <SelectInput {...select[5]}/>
      </div>
      <TagsInput withAsterisk label="Skills" placeholder="Enter skill" splitChars={[',',' ' , '|']} clearable acceptValueOnBlur  />
      <div>
        <div className="text-sm font-medium">Job Description</div>
        <TextEditor />
      </div>
    </div>
  </div>
}
export default PostJob;