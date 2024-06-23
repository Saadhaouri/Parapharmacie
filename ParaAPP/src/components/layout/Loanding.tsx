import { GiCottonFlower } from "react-icons/gi";

const Loading = () => {
  return (
    <div className="min-h-screen  gap-6 flex items-center justify-center flex-col">
      <div className="w-36 h-36 border-8 border-dashed rounded-full border-emerald-600 animate-spin"></div>
      <div className="flex items-center">
        <GiCottonFlower className="text-[36px] text-emerald-500 mr-2" />
        <strong className="text-emerald-500 text-lg font-semibold">
          YOUSMALA
        </strong>
      </div>
    </div>
  );
};

export default Loading;
