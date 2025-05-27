import { ActionIcon } from "@mantine/core";
import { IconCheck, IconX, IconPencil } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { TagsInput } from "@mantine/core";
import { SuccessNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";
import { useMediaQuery } from "@mantine/hooks";

const Skills = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const matches = useMediaQuery("(max-width: 475px)");
  const profile = useSelector((state: any) => state.profile);
  const [skills, setSkills] = useState<string[]>([]);

  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
      setSkills(profile.skills);
    } else {
      setEdit(false);
    }
  };

  const handleSave = () => {
    setEdit(false);
    const updateProfile = { ...profile, skills };
    dispatch(changeProfile(updateProfile));
    SuccessNotification("Success", "Skills updated Successfully!");
  };

  return (
    <div>
      <div className="text-2xl font-semibold mb-3 flex justify-between items-center">
        Skills
        <div className="flex gap-2">
          {edit && (
            <ActionIcon
              variant="subtle"
              color="green.8"
              onClick={handleSave}
              size={matches ? "md" : "lg"}
            >
              <IconCheck className="h-4/5 w-4/5" />
            </ActionIcon>
          )}
          <ActionIcon
            variant="subtle"
            color={edit ? "red.8" : "brightSun.4"}
            onClick={handleEdit}
            size={matches ? "md" : "lg"}
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
        <TagsInput
          value={skills}
          onChange={setSkills}
          placeholder="Add skills"
          splitChars={[",", " ", "|"]}
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.map((skill: any, index: number) => (
            <div
              key={index}
              className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-xl text-bright-sun-800 px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;
