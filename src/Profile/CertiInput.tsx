import { Button, TextInput } from "@mantine/core";
import SelectInput from "../PostJob/SelectInput";
import fields from "../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { SuccessNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";
import { useMediaQuery } from "@mantine/hooks";

const CertiInput = (props:any) => {
  const matches = useMediaQuery("(max-width: 475px)");
  const dispatch = useDispatch();
  const profile = useSelector((state:any)=>state.profile);
  const select = fields;
  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      name: "",
      issuer: "",
      issueDate: new Date(),
      certificateId: ""
    },
    validate: {
      name: isNotEmpty("name is Required"),
      issuer: isNotEmpty("issuer is Required"),
      certificateId: isNotEmpty("certificateId is Required")
    }
  });

  const handleSave = () => {
    form.validate(); // ⚠️ Problème ici
    if (Object.keys(form.errors).length > 0) {
      console.log("error", form.errors);  // Affiche les erreurs s'il y en a
      return; // Si des erreurs existent, arrêter l'exécution
    }
  
    let certi = [...profile.certifications]; // ⚠️ profile.certifications peut être undefined
    // let certi = [...(profile.certifications || [])];
    certi.push(form.getValues()); // ✅ Ajoute la certification
  
    // ✅ Formatage de la date
    certi[certi.length - 1].issueDate = certi[certi.length - 1].issueDate.toISOString();
  
    let updatedProfile = { ...profile, certifications: certi };
    props.setEdit(false);
    dispatch(changeProfile(updatedProfile)); // ⚠️ Ça met à jour Redux, mais PAS la base de données !
  
    SuccessNotification("Success", "Certificate Added Successfully!");
  };

  return <div className="flex flex-col gap-3">
    <div className="text-lg font-semibold">Add Certificate</div>
    <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex flex-wrap my-3">
      <TextInput label="Title" withAsterisk placeholder="Enter Title" {...form.getInputProps("name")} />
      <SelectInput form={form} name="issuer" {...select[1]}/>
    </div>

    <div className="flex gap-10 [&>*]:w-1/2">
      <MonthPickerInput
        withAsterisk
        maxDate={new Date()}
        {...form.getInputProps("issueDate")}
        label="Issue Date"
        placeholder="Pick date"
      />
      <TextInput label="Certificate Id" {...form.getInputProps("certificateId")} withAsterisk placeholder="Enter Id" />
    </div>

    <div className="flex gap-5">
      <Button onClick={handleSave} color="brightSun.4" variant="outline">Save</Button>
      <Button onClick={() => props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
    </div>
  </div>
}
export default CertiInput;
