import { Tabs } from "@mantine/core";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";
import { useSelector } from "react-redux";

const JobHistory = () => {
  const [activeTab, setActiveTab] = useState<any>("APPLIED");
  const [jobList, setJobList] = useState<any>([]);
  const [showList, setShowList] = useState<any>([]);
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
        setShowList(
          res.filter((job: any) => {
            let found = false;
            job.applicants?.forEach((applicant: any) => {
              if (
                applicant.applicantId == user.id &&
                applicant.applicationStatus == "APPLIED"
              ) {
                found = true;
              }
            });
            return found;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTabChange = (value: string | null) => {
    setActiveTab(value);
    if (value == "SAVED") {
      setShowList(jobList.filter((job: any) => profile.savedJobs?.includes(job.id)));
    } else {
      setShowList(
        jobList.filter((job: any) => {
          let found = false;
          job.applicants?.forEach((applicant: any) => {
            if (
              applicant.applicantId == user.id &&
              applicant.applicationStatus == value
            ) {
              found = true;
            }
          });
          return found;
        })
      );
    }
  };

  return (
    <div className="">
      <div className="text-2xl font-semibold mb-5">Job History</div>
      <div>
        <Tabs variant="outline" radius="lg" value={activeTab} onChange={handleTabChange}>
          <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400 sm-mx:!text-lg sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xsm-mx:[&_button]:!text-sm xs-mx:[&_button]:!px-1.5 xs-mx:font-medium xs-mx:[&_button]:!py-2">
            <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">In Progress </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab}>
            <div className="mt-10 flex flex-wrap gap-5">
              {showList.map((job: any, index: any) => (
                <Card key={index} {...job} 
                {...{[activeTab.toLowerCase()]: true}} />
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default JobHistory;
