import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SuccessNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";

const About = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const [about, setAbout] = useState("");

  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
      setAbout(profile.about);
    } else setEdit(false);
  };

  const handleSave=()=>{
    setEdit(false); 
      let updateProfile = {...profile, about:about};
      dispatch(changeProfile(updateProfile));
      SuccessNotification("Success" , "Profile updated Successfuly !")
  }

  return (
    <div>
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About
        <div>
          {edit && (
            <ActionIcon variant="subtle" color="green.8" onClick={handleSave} size="lg">
              <IconCheck className="h-4/5 w-4/5" />
            </ActionIcon>
          )}

          <ActionIcon
            variant="subtle"
            color={edit ? "red.8" : "brightSun.4"}
            onClick={handleEdit}
            size="lg"
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" stroke={1.5} />
            )}
          </ActionIcon>
        </div>
      </div>

      {edit ? (
        <Textarea
          value={about}
          placeholder="Enter About Yourself ..."
          autosize
          minRows={3}
          onChange={(event) => setAbout(event.target.value)}
        />
      ) : (
        <div className="text-sm text-mine-shaft-300 text-justify">
          {profile?.about}
        </div>
      )}
    </div>
  );
};

export default About;
