import { Badge, Tabs } from "@mantine/core";
import Job from "../JobDesc/JobDesc";
import TalentCard from "../FindTalent/TalentCard";
import { useEffect, useState } from "react";

const PostedJobDesc = (props: any) => {
  const [tab, setTab] = useState("overview");
  const [arr, setArr] = useState<any>([]);

  const handleTabChange = (value: any) => {
    setTab(value);
    if (value === "applicants") {
      setArr(props.applicants?.filter((x: any) => x.applicationStatus === "APPLIED"));
    } else if (value === "invited") {
      setArr(props.applicants?.filter((x: any) => x.applicationStatus === "INTERVIEWING"));
    } else if (value === "offered") {
      setArr(props.applicants?.filter((x: any) => x.applicationStatus === "OFFERED"));
    } else if (value === "rejected") {
      setArr(props.applicants?.filter((x: any) => x.applicationStatus === "REJECTED"));
    }
  };

  useEffect(() => {
    handleTabChange("overview");
  }, [props]);

  return (
    <div className="mt-5 w-3/4 px-5 md-mx:w-full">
      {props.jobTitle ? (
        <>
          <div className="text-2xl font-semibold flex items-center xs-mx:text-xl">
            {props.jobTitle}{" "}
            <Badge
              variant="light"
              ml="sm"
              size="sm"
              color="brightSun.4"
            >
              {props.jobStatus}
            </Badge>
          </div>
          <div className="font-medium text-mine-shaft-300 mb-3 xs-mx:text-xl">
            {props.location}
          </div>
          <div>
            <Tabs
              variant="outline"
              radius="lg"
              value={tab}
              onChange={handleTabChange}
            >
              <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400 sm-mx:!text-lg sm-mx:[&_button]:!text-lg xs-mx:[&_button]:!text-base xsm-mx:[&_button]:!text-sm xs-mx:[&_button]:!px-1.5 xs-mx:font-medium xs-mx:[&_button]:!py-2">
                <Tabs.Tab value="Overview">Overview</Tabs.Tab>
                <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                <Tabs.Tab value="invited">Invited</Tabs.Tab>
                <Tabs.Tab value="offered">Offered</Tabs.Tab>
                <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="Overview" className="[&>div]:w-full">
                <Job {...props} edit={true} closed={props.jobStatus === "CLOSED"} />
              </Tabs.Panel>

              <Tabs.Panel value="applicants">
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr.map((talent: any, index: any) => (
                      <TalentCard key={index} {...talent} posted />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold">No Applicants</div>
                  )}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="invited">
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr.map((talent: any, index: any) => (
                      <TalentCard key={index} {...talent} invited />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold">No Invited Candidates</div>
                  )}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="offered">
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr.map((talent: any, index: any) => (
                      <TalentCard key={index} {...talent} offered />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold">No Offered Candidates</div>
                  )}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="rejected">
                <div className="flex mt-10 flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr.map((talent: any, index: any) => (
                      <TalentCard key={index} {...talent} rejected />
                    ))
                  ) : (
                    <div className="text-2xl font-semibold">No Rejected Candidates</div>
                  )}
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </>
      ) : (
        <div className="text-2xl font-semibold min-h-[70vh] flex justify-center items-center">
          No Job Selected
        </div>
      )}
    </div>
  );
};

export default PostedJobDesc;
