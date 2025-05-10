  import { Link , useLocation} from "react-router-dom";
  // import Header from "./Header";  

  const NavLinks = () => {
    const Links = [
      { name: "Find Jobs", url: "find-jobs" },
      { name: "Find Talent", url: "find-talent" },
      { name: "Post Job", url: "post-job" },
      { name: "Posted Jobs", url: "posted-jobs/0" },
      { name: "Job History", url: "job-history" },
      { name: "SignUp", url: "signup" }

    ]
      const location = useLocation();
    return <div className="flex gap-5 text-mine-shaft-300 h-full items-center">
      {
        Links.map((link, index) => <div className=
        {`${location.pathname ==="/"+link.url?"border-bright-sun-400 text-bright-sun-400" : ""}
        border-t-[3px] h-full flex items-center `} >
          <Link key={index} to={link.url} > {link.name}</Link>
        </div>)
      }   
          
    </div>
  }
  export default NavLinks;