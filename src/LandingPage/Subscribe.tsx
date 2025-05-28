import { Button, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Subscribe = () => {
  const matches = useMediaQuery("(max-width: 639px)");
    const matches1 = useMediaQuery("(max-width: 475px)");
    return <div className="mt-20 flex items-center flex-wrap bg-mine-shaft-900 mx-20 py-3 rounded-xl justify-around sm-mx:mx-5">
        <div className="text-4xl font-semibold  w-2/5 text-mine-shaft-100 text-center md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl bs-mx:w-4/5">
              Never Wants to Miss  Any <span className="text-bright-sun-400">Job News?</span>
        </div>

        <div className="flex gap-4 rounded-xl bg-mine-shaft-700 px-3 py-2 xs:items-center  xs-mx:flex-col ">
              <TextInput
                className="[&_input]:text-mine-shaft-100 font-semibold"
                variant="unistyled"
                placeholder="Your@email.com"
                size={ matches1 ? 'sm' :matches ? "md" : "xl"}
              />
              <Button className="!rounded-lg" size={matches1 ? 'sm' :matches ? "md" : "xl"} color="brightSun.4" variant="filled">Subscribe</Button>
          </div>

    </div>
}
export default Subscribe;