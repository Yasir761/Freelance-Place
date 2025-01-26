import { IoCloseSharp } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

const ViewSelectedFile = ({ file, setFiles, idx, remove }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImagePreview = (file) => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setFiles((prev) => prev.filter((_, currentIndex) => currentIndex !== idx));
    remove(idx);
  };

  useEffect(() => {
    handleImagePreview(file);
  });

  return (
    <div
      className={cn(
        " bg-white dark:bg-neutral-900 p-1.5 w-full rounded-md flex gap-4 items-start",
        "shadow-sm relative border border-gray-300 flex-wrap"
      )}
    >
      <div className="max-h-12 h-full aspect-square rounded-md overflow-hidden border shadow-lg">
        <img
          src={imagePreview}
          alt={file.name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="space-y-1 flex-1">
        <p className="text-neutral-700 dark:text-neutral-300 truncate text-sm max-w-[90%] text-wrap">
          {file.name.length > 80 ? file?.name?.slice(0, 80) + "..." : file.name}
        </p>
        <p className="px-1.5 py-1 w-fit rounded-md bg-gray-100 dark:bg-neutral-800 text-xs">
          {file.type}
        </p>
      </div>
      <div className="flex gap-2 items-end flex-col">
        <FaTrashAlt
          className="text-red-500 p-1 text-2xl cursor-pointer"
          onClick={handleRemoveFile}
        />
        <p className="rounded-lg px-2 py-1 w-fit text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input text-xs">
          {(file.size / (1024 * 1024)).toFixed(2)} MB
        </p>
      </div>
    </div>
  );
};

export default ViewSelectedFile;
