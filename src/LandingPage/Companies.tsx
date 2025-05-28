import Marquee from "react-fast-marquee";
import { companies } from "../Data/Data";


const Companies = () => {
  return (
    <div className="mt-20 pb-5">
        <div className="text-4xl font-semibold text-mine-shaft-100 text-center md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl">
          Trusted by <span className="text-bright-sun-400">1000+</span> Companies
        </div>     
        <Marquee pauseOnHover={true}>
          {
            companies.map((company, index) => <div key={index} className="mx-8 px-2 py-1 hover:bg-mine-shaft-900 rounded-xl cursor-pointer sm-mx:mx-6 xs-mx:mx-4 xsm-mx:mx-2">
                    <img className="h-14" src={`/Companies/${company}.png`} alt={company} />

                      </div>)
          } 
        </Marquee> 
    </div>
  )

};
export default Companies;