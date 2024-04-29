import SideBarHeader from "@/components/SideBar/components/SideBarHeader";
import MemberProfile from "@/components/SideBar/components/MemberProfile";
import NavLinks from "@/components/SideBar/components/NavLinks";

import {GiMechaMask} from "react-icons/gi";

const links = [
  {
    id: 1,
    title: "Chat",
    href: "/chat",
  },
  {
    id: 2,
    title: "Tours",
    href: "/tours",
  },
  {
    id: 3,
    title: "New Tour",
    href: "/new-tour",
  },
  {
    id: 4,
    title: "Profile",
    href: "/profile",
  },
];

const SideBar = () => {
  return (
    <div className="px-4 w-80 min-h-full bg-base-300 py-12 grid grid-rows-[auto,1fr,auto]">
      <SideBarHeader
        ImgIcon={GiMechaMask}
        title="GPTGenius"
      />
      <NavLinks links={links}/>
      <MemberProfile/>
    </div>
  );
};

export default SideBar;
