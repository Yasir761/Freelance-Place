import toast from "react-hot-toast";
import { funMessage } from "./FunLoginNotification";

const CustomToastNotification = () => {
  const randomMessage = funMessage[Math.floor(Math.random() * 25)];

  toast.custom(<CustomToastContent data={randomMessage} />, {
    duration: 4000,
  });
  return;
};

const CustomToastContent = ({ data }) => {
  return (
    <div className="shadow-2xl bg-white relative overflow-hidden min-h-[50px] text-red-500 duration-300 transition-all rounded-xl border-2 border-dashed border-red-600">
      <div className="flex h-full w-full items-center justify-center gap-2 p-2 relative z-20 bg-inherit rounded-xl">
        <span className="text-xl">{data.icon}</span>
        <span className="text-sm font-medium">{data.message}</span>
      </div>
    </div>
  );
};

export default CustomToastNotification;
