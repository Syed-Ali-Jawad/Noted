import { createElement } from "react";
import Logo from "../assets/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import type { SideBarOption } from "@/types/common.type";
// import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
// import Avatar from "@/ui/avatar";
import { SIDEBAR_OPTIONS } from "@/shared/constants";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  }

  return (
    <div className="w-60 mt-4 bg-white hidden lg:flex rounded-xl h-[95dvh]  max-h-173.25 p-6 sticky top-4  flex-col justify-between">
      <div>
        <div className="flex">
          <img src={Logo} className="h-12 w-auto" alt="Logo" />
          <div>
            <p className="text-2xl font-semibold text-primary">oted</p>
            <p className="text-center  font-semibold text-slate-500 text-xs">
              Personal Sanctuary
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-y-3 text-[#625E59] text-base">
          {SIDEBAR_OPTIONS.map((option: SideBarOption) => {
            const isSelected = option.routeTo === pathname;
            return (
              <button
                className={cn(
                  "flex gap-2 items-center rounded-full text-sm px-4 py-3 box-border  cursor-pointer font-medium transition-all duration-100",
                  isSelected && "bg-primary/5 text-primary",
                )}
                onClick={() => {
                  navigate(option.routeTo);
                }}
                key={option.title}
              >
                <span>
                  {createElement(option.icon, {
                    size: 20,
                    className: `${isSelected ? `fill-primary ${option.selectedClasses}` : "fill-none"}`,
                  })}
                </span>
                <span>{option.title}</span>
              </button>
            );
          })}
        </div>
      </div>
      <button onClick={handleLogout} className="w-full cursor-pointer hover:opacity-90 transition-opacity duration-300 bg-primary rounded-lg py-2 text-white font-semibold shadow-[0px_0px_4px_rgba(0,0,0,0.4)]">Logout</button>
      {/* <div className="flex items-center justify-between">
        <div className="flex gap-x-3 items-center">
          <Avatar className="shadow-md" />
          <span className="text-sm font-bold">User</span>
        </div>
        <Link to="/login">
          <LogOut size={22} className="text-primary" />
        </Link>
      </div> */}
    </div>
  );
};

export default Sidebar;
