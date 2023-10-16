import {
  BanIcon,
  GraduationCapIcon,
  HomeIcon,
  SearchIcon,
  UserIcon,
  Users,
} from "lucide-react";

export const sidebarLinks = [
  {
    imgURL: <HomeIcon height={25} width={25} />,
    route: "/",
    label: "Home",
  },
  {
    imgURL: <SearchIcon height={25} width={25} />,
    route: "/search",
    label: "Search",
  },
  {
    imgURL: <Users height={25} width={25} />,
    route: "/events",
    label: "Events",
  },
  {
    imgURL: <UserIcon height={25} width={25} />,
    route: "/teachers",
    label: "Teachers",
  },
  {
    imgURL: <GraduationCapIcon height={25} width={25} />,
    route: "/students",
    label: "Students",
  },
];

export const profilePhotos = [
  {
    imgURL: "@/assets/dummy1.jpg",
  },
  {
    imgURL: "@/assets/dummy2.jpg",
  },
  {
    imgURL: "@/assets/dummy3.jpg",
  },
];
