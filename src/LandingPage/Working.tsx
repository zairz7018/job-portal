import { work } from "../Data/Data";

const Working = () => {
  return <div className="mt-20 pb-5">
      <div className="text-4xl font-semibold mb-3 text-mine-shaft-100 text-center">
        How it <span className="text-bright-sun-400">Works</span>
      </div>  
      <div className="text-lg mb-10 mx-auto text-mine-shaft-300 text-center w-1/2">
      Effortlessly navigate through the process and land your dream job. 
       </div>
       <div className="flex  px-16 justify-between items-center" >
          <div>
            <img className="w-[30rem]" src="/Working/Girl.png" alt="girl" />
          </div>
                <div className="flex flex-col gap-10">
                {
                        work.map((item , index)=> <div key={index} className="flex items-center gap-4">
                          <div className="p-2.5 bg-bright-sun-300 rounded-full">
                            <img className="h-12 w-12" src={`working/${item.name}.png`} alt="resume" />
                          </div>
                          <div >
                            <div className="text-mine-shaft-200 text-xl font-semibold">{item.name}</div>
                            <div className="text-mine-shaft-300">{item.desc}</div>
                          </div>
                        </div>
                        
                        ) 
                      }
                </div>
       </div>

</div>
};
export default Working;