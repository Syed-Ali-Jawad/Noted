import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Loader2 } from "lucide-react";
import { cn, revalidate } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import useNotesStore from "@/store";
import { PAGE_ROUTES } from "@/shared/constants/constants";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { emptyTrash, getTrashedNotes } from "@/api/notes.api";
import { DesktopNavbar, MobileNavbar } from "./Navbar";

interface PageLayout {
  children: React.ReactNode;
  className?: string;
}

const PageLayout = ({
  children,
  className,
}: PageLayout) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { pathname } = useLocation();
  const isTrashPage = pathname === PAGE_ROUTES.trash;
  const [searchInput, setSearchInput] = useState<string>("")

  const {
    setSearch,
    resetNotesSelection,
  } = useNotesStore();

  const { data: trashNotes = [] } = useSWR(
    "/notes/trashed",
    () => getTrashedNotes()
  );
  const { trigger: handleEmptyTrash, isMutating } = useSWRMutation("/notes/trash", emptyTrash, {
    onSuccess: () => {
      revalidate("/notes/trashed");
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // reset selected notes on pgae change
  useEffect(() => resetNotesSelection(), [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchInput])


  return (
    <div
      className={cn(
        "w-full lg:pl-4 min-h-screen scroll-smooth bg-[url('/bg-pattern.svg')] bg-cover bg-gray-700/8 bg-blend-overlay",
        className,
      )}
    >
      <div className="flex centered-container">
        <Sidebar />
        <div className="flex flex-col w-full relative">
          <div
            className={cn(
              "sticky z-10 top-0 w-full",
              (isScrolled || isTrashPage) &&
              "bg-[url('/bg-pattern.svg')] bg-cover bg-gray-700/10 bg-blend-overlay shadow-md",
            )}
          >
            <DesktopNavbar
              trashNotes={trashNotes}
              setSearchInput={setSearchInput}
            />
            <MobileNavbar
              setSearchInput={setSearchInput}
            />
          </div>
          {/* {isTrashPage && (
            <p className="w-full bg-[#fff0eb] text-slate-700 z-1 mx-auto text-xs sm:text-base text-center sticky top-13.5 lg:top-18 shadow-sm py-2">
              Items in trash will be deleted in 30 days after the deletion date
            </p>
          )} */}
          <div className="px-4 md:px-8 pb-8">{children}</div>

          {isTrashPage && trashNotes?.length > 0 && (
            <button
              onClick={() => handleEmptyTrash()}
              className="block sm:hidden  min-w-36 fixed bottom-4 right-4 font-semibold px-4 py-2 bg-primary text-white rounded-full shadow-[0_0_5px_5px_rgba(0,0,0,0.1)] flex justify-center "
            >
              {isMutating ? <Loader2 className="animate-spin text-white" /> : "Empty Trash"}
            </button>
          )}
        </div>
      </div>
    </div >
  );
};

export default PageLayout;


