import { useEffect, useState } from "react";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";

const Talents = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state : any) => state.sort);
  const [talents, setTalents] = useState<any>([]);
  const filter = useSelector((state : any) => state.filter);
  const [filtredTalents , setFiltredTalents] = useState<any>([]);
  useEffect(() => {
    dispatch(resetFilter());
    getAllProfiles()
      .then((res) => {
        setTalents(res);
      })
      .catch((err) => {
        // console.error("Erreur lors du chargement des profils :", err);
      });
  }, []);

  useEffect(()=>{
    if(sort === "Experience :Low to high"){
      setTalents([...talents].sort((a:any,b:any) => a.totalExp - b.totalExp));
    }else if(sort === "Experience :high to low"){
      setTalents([...talents].sort((a:any,b:any) => b.totalExp - a.totalExp));
    }
  },[sort])
  
  useEffect(() => {
    let filtered = talents;
  
    // Filtrage par nom
    if (filter.name) {
      filtered = filtered.filter((talent: any) =>
        talent.name?.toLowerCase().includes(filter.name.toLowerCase())
      );
    }
  
    // Filtrage par Job Title
    if (Array.isArray(filter["Job Title"]) && filter["Job Title"].length > 0) {
      filtered = filtered.filter((talent: any) =>
        filter["Job Title"].some((title: string) =>
          talent.jobTitle?.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
  
    // Filtrage par Location
    const locations = Array.isArray(filter["Location"]) // <-- "Location" avec L majuscule
  ? filter["Location"]
  : filter["Location"]
  ? [filter["Location"]]
  : [];

    if (locations.length > 0) {
      filtered = filtered.filter((talent: any) =>
        locations.some((loc: string) =>
          talent.location?.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }
    
    // Filtrage par Skills (version corrigée)
    const skills = Array.isArray(filter["Skills"]) // <-- "Skills" avec S majuscule
    ? filter["Skills"]
    : filter["Skills"]
    ? [filter["Skills"]]
    : [];

  if (skills.length > 0) {
    filtered = filtered.filter((talent: any) =>
      skills.some((skill: string) =>
        talent.skills?.some((talentSkill: string) => 
          talentSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
  }
    // ...

  // Filtrage par Expérience (version corrigée)
  const expRange = Array.isArray(filter.exp) 
  ? filter.exp
  : [];

if (expRange.length === 2 && 
    !isNaN(expRange[0]) && 
    !isNaN(expRange[1])) {
  filtered = filtered.filter((talent: any) => {
    const talentExp = Number(talent.totalExp) || 0;
    return talentExp >= expRange[0] && talentExp <= expRange[1];
  });
}
  
    console.log("Filtre appliqué :", filter);
    setFiltredTalents(filtered);
  }, [filter, talents]);
  


  return (
    <div className="px-5 py-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Talents</div>
        <Sort />
      </div>
      <div className="mt-10 flex flex-wrap gap-5 justify-between">
      {filtredTalents.length?filtredTalents?.map((talent: any, index: any) => 
          <TalentCard key={index } {...talent} />) :
          <div className="text-xl font-semibold">No Talents Found</div>
        }
      </div>
    </div>
  );
};

export default Talents;
