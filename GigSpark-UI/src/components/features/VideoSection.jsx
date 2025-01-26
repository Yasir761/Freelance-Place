import React from "react";
import Video from "../video/Video";
import { ContainerScroll } from "../ui/container-scroll-animation";

const VideoHeader = () => {
  return (
    <div className="text-center text-zinc-100 sm:mb-16">
      <h3 className="text-2xl font-semibold sm:text-3xl md:text-4xl font-primary mt-16 bg-gradient-to-b from-white to-zinc-950 from-50% bg-clip-text text-transparent">
        What success on Freelance Place looks like
      </h3>
      <p className="mt-2 text-sm sm:text-base text-zinc-400">
        Discover key insights to achieve success and thrive on Freelance Place.
      </p>
    </div>
  );
};

const VideoSection = () => {
  return (
    <div className="space-y-16 max-w-screen-xl  mx-auto">
      <ContainerScroll titleComponent={<VideoHeader />}>
        <div className="w-full relative pb-8 mx-auto rounded-2xl object-cover h-full object-left-top max-h-[75vh] aspect-video">
          <p className="text-slate-600 text-sm font-primary pb-2 absolute -bottom-4 left-4 z-[1] ">
            Video source from youtube -
            <a
              href="https://www.youtube.com/@whatastory"
              className="font-semibold underline underline-offset-4"
            >
              {" "}
              @whatastory
            </a>
          </p>
          <div className="rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-r from-slate-700 to-slate-400 h-full">
            <Video src={"./video/feature-video.mkv"} className="object-cover h-full w-full"/>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
};

export default VideoSection;
