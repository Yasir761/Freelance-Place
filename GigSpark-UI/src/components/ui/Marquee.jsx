import { cn } from "../../lib/utils";

export default function Marquee({
  className,
  pauseOnHover = false,
  children,
  repeat = 4,
  ...props
}) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden [--duration:40s] [--gap:3rem] p-2 [gap:var(--gap)]",
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row",
              {
                "group-hover:[animation-play-state:paused]": pauseOnHover,
              }
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
