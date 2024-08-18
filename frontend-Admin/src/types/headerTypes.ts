import { MenuItem } from "../components/header/sideBar/sideBarItems";
import { User } from "./types";

export interface PropsType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  permissions: string[];
  user: User | undefined;
}

export interface UserDetailProps {
  user: User | undefined;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface MainMenuOptionType {
  name: string;
  icon: React.ReactNode;
  isActive: boolean;
  hasSubNav?: boolean;
  onClick: (item: string) => void;
}

export interface SubMenuOptionsType {
  item: MenuItem;
  activeItem: string | undefined;
  handleClick: (item: string) => void;
  permissions: string[];
  setIsOpen: (isOpen: boolean) => void;
}
