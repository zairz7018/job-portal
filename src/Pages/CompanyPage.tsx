import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Company from "../CompanyProfile/Company";
import SimilliarCompanies from "../CompanyProfile/SimilliarCompanies";


const CompanyPage = () => {
  const navigate = useNavigate();
  return <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
    <Divider size="xs"  />
            <Button onClick={() => navigate(-1)} my='md' leftSection={<IconArrowLeft size={20} />} color="brightSun.4" variant="light" >Back</Button>
          
  <div className="flex gap-5 justify-between">
    <Company />
    <SimilliarCompanies />
  </div>
</div>

}
export default CompanyPage;