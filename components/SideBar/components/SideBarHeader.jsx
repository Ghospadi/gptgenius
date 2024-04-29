import ThemeToggle from "@/components/SideBar/components/ThemeToggle";

const SideBarHeader = ({ImgIcon, title}) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex gap-4 justify-center items-center mr-auto">
        <ImgIcon className="w-12 h-12 rounded-full"/>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default SideBarHeader;
