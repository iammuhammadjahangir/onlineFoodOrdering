import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAssignedTasksArrayQuery } from "../../redux/api/assignTasks";
import { RootState } from "../../redux/store";
import Navbar from "./navbar/navbar";
import SideBar from "./sideBar/sideBar";

const Header = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated, user, loading } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { data } = useAssignedTasksArrayQuery(user?.role?._id);

  console.log(user?.role?._id);
  console.log(data);

  const closeSidebar = (e: any) => {
    if (
      isOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", closeSidebar); // Listen for mousemove events
    return () => document.removeEventListener("mousemove", closeSidebar);
  }, [isOpen]); // Only listen when the sidebar is open

  return (
    !loading &&
    isAuthenticated && (
      <>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`overlay ${isOpen ? "open" : ""}`}
        />
        <Navbar setIsOpen={setIsOpen} />
        <SideBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          permissions={data?.taskNamesArray || []}
          user={user}
        />
      </>
    )
  );
};

export default Header;
