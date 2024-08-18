import { useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { server } from "../../../redux/store";
import {
  MainMenuOptionType,
  PropsType,
  SubMenuOptionsType,
  UserDetailProps,
} from "../../../types/headerTypes";
import { MenuItem, MenuItemDetail, menuItems } from "./sideBarItems";

// Icons Import
import { CiUser } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";

const SideBar = ({ isOpen, setIsOpen, permissions, user }: PropsType) => {
  console.log(permissions);
  const [activeItem, setActiveItem] = useState<string>();
  const isSalesman: boolean = JSON.parse(
    localStorage.getItem("isSalesman") || "false"
  );
  const isAdmin: boolean = JSON.parse(
    localStorage.getItem("isAdmin") || "false"
  );
  const isAdministrator: boolean = JSON.parse(
    localStorage.getItem("isAdministrator") || "false"
  );
  const isSuperAdmin: boolean = JSON.parse(
    localStorage.getItem("isSuperAdmin") || "false"
  );

  const handleClick = (item: string) => {
    console.log(item);
    setActiveItem(item !== activeItem ? item : "");
  };

  return (
    <aside className={`siderbar ${isOpen ? "open" : ""}`}>
      <UserDetailsContainer user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="scrollable">
        {menuItems.map((item) => (
          <div className="menuItemsContainer" key={item.name}>
            {(isSalesman && item?.roles?.includes("Salesman")) ||
            (isAdmin && item?.roles?.includes("Admin")) ||
            (isSuperAdmin && item?.roles?.includes("superAdmin")) ||
            (isAdministrator && item?.roles?.includes("Administrator")) ? (
              <>
                <MainMenuOption
                  onClick={handleClick}
                  name={item.name}
                  icon={item.icon}
                  isActive={activeItem === item.name}
                  hasSubNav={!!item.items}
                  key={item.name}
                />
                <SubMenuOptions
                  setIsOpen={setIsOpen}
                  activeItem={activeItem}
                  handleClick={handleClick}
                  item={item}
                  permissions={permissions}
                />
              </>
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
};

export const UserDetailsContainer = ({
  user,
  isOpen,
  setIsOpen,
}: UserDetailProps) => {
  const navigate = useNavigate();
  return (
    <div className="userDetailsContainer">
      <div className="userDetails">
        <div className="userImage">
          <img src={`${server}/${user?.avatar.url}`} alt={`${user?.name}`} />
        </div>
        <div className="userInfo">
          <p>{user?.role?.name}</p>
          <h3>{user?.name}</h3>
        </div>
        {isOpen && (
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/fluency/20/admin-settings-male--v1.png"
            alt="admin-settings-male--v1"
            onClick={() => {
              navigate("/me");
              setIsOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export const MainMenuOption = ({
  hasSubNav = false,
  icon,
  isActive,
  name,
  onClick,
}: MainMenuOptionType) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={() => onClick(name)}
      className={`mainMenuOption ${isActive ? "active" : ""} `}
    >
      {icon && icon}
      <p>{t(name)}</p>
      {hasSubNav && <IoIosArrowDown className="marginLeft" />}
    </div>
  );
};

const SubMenuOptions = ({
  item,
  permissions,
  setIsOpen,
  activeItem,
}: SubMenuOptionsType) => {
  const location = useLocation();
  const navRef = useRef<any>(null);
  const navigate = useNavigate();

  const handleLinkClick = (link: string) => {
    navigate(`${link}`);
    setIsOpen(false);
  };

  const isSubNavOpen = (item: MenuItem, items: MenuItemDetail[]) =>
    items.some((i) => i.name === activeItem) || item.name === activeItem;

  return (
    <div
      className={`subItemContainer ${
        isSubNavOpen(item, item.items) ? "open" : ""
      }`}
      style={{
        height: !isSubNavOpen(item, item.items)
          ? 0
          : navRef.current.clientHeight + 5,
      }}
    >
      <div ref={navRef} className="subItemInner">
        {item?.items.map(
          (subItem: MenuItemDetail) =>
            (permissions?.includes(subItem.permission) ||
              subItem?.permission?.includes("superAdmin")) && (
              <MainMenuOption
                icon={subItem.icon}
                // onClick={handleClick}
                onClick={() => {
                  handleLinkClick(subItem.path);
                  // !item.subItems && setShowMenu(false);
                }}
                name={subItem.name}
                isActive={location.pathname === subItem.path}
                key={subItem.name}
              />
            )
        )}
      </div>
    </div>
  );
};
export default SideBar;
