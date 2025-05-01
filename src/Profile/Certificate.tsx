import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import {  useSelector } from "react-redux";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";

const Certficate = () => {
  const [edit , setEdit ] = useState(false);
  const [addCerti, setAddCerti] = useState(false);
  const profile = useSelector((state:any)=> state.profile);
  const handleEdit =() =>{
    setEdit(!edit); 
  }
  return <div className="">
  <div className="text-2xl font-semibold mb-4 flex justify-between">
    Certification
    <div className="flex gap-2">
      <ActionIcon
        onClick={() => setAddCerti(true)}
        variant="subtle"
        color="brightSun.4"
        size="lg"
      >
        <IconPlus className="h-4/5 w-4/5" />
      </ActionIcon>

      <ActionIcon
        variant="subtle"
        color={edit ? "red.8" : "brightSun.4"}
        onClick={handleEdit}
        size="lg"
      >
        {edit ? (
          <IconX className="h-4 w-4" />
        ) : (
          <IconPencil className="h-4/5 w-4/5" />
        )}
      </ActionIcon>
    </div>
  </div>

  <div className="flex flex-col gap-8">
    {profile?.certifications?.map((certi: any, index: number) => (
      <CertiCard key={index} edit={edit} index={index} {...certi} />
    ))}

    {addCerti && <CertiInput setEdit={setAddCerti} />}
  </div>
</div>
}
export default Certficate;
