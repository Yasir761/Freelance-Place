import { cn } from "../../lib/utils";

const BrandsLogo = ({ src, className = "" }) => {
  return (
    <figure className={cn("h-[60px]", className)}>
      <img className="h-full aspect-auto" alt="Brand Logo" src={src} />
    </figure>
  );
};

export default BrandsLogo;
