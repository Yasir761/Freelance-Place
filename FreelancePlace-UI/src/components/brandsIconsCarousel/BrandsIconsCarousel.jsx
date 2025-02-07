import Marquee from "../ui/Marquee.jsx";
import BrandsLogo from "./BrandsLogo";

export default function BrandsIconCarousel () {
  return (
    <div className="bg-blue-50 relative flex w-full flex-col items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition duration-200">
      <Marquee pauseOnHover={false} className="[--duration:50s]" >
        {Array(8).fill(0).map((_, count) => (
          <BrandsLogo key={count} src={`./img/brands/trusted${count+1}.png`} className={""}/>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-blue-50 from-10% md:from-20% dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-blue-50 from-10% md:from-10% dark:from-background">
      </div>
    </div>
  );
}
