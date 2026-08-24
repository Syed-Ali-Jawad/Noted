import { ChevronLeft, CircleCheck, Loader2, LogOut, Menu, Search } from "lucide-react";
import { Input } from "@/ui/input"
import { cn, revalidate } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import useNotesStore from "@/store";
import { PAGE_ROUTES, SIDEBAR_OPTIONS } from "@/shared/constants/constants";
import NoteActions from "./NoteActions";
import useSWRMutation from "swr/mutation";
import { emptyTrash } from "@/api/notes.api";
import type { Note } from "@/types/notes.type";
import { createElement, useEffect, useRef, useState } from "react";
import type { SideBarOption } from "@/types/common.type";
import Logo from "../assets/logo.svg"

interface DesktopNavbarProps {
    trashNotes: Note[];
    setSearchInput: (input: string) => void;
}

export const DesktopNavbar = ({
    trashNotes,
    setSearchInput,
}: DesktopNavbarProps) => {
    const location = useLocation();

    const { selectedNotes } = useNotesStore();

    const { trigger: handleEmptyTrash, isMutating } = useSWRMutation("/notes/trash", emptyTrash, {
        onSuccess: () => {
            revalidate("/notes/trashed");
        }
    })
    const isTrashPage = location.pathname === PAGE_ROUTES.trash;

    return (
        <div className="hidden lg:flex items-center justify-end pr-4 h-18">
            <div className="bg-white absolute left-1/2 -translate-x-1/2  rounded-full h-11 mx-auto max-w-125 w-full flex items-center px-3 overflow-hidden transition-all duration-300">
                <Search className="text-slate-400" size={20} />

                <Input
                    type="search"
                    placeholder="Search notes"
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="border-none w-full focus-visible:ring-0 transition-all duration-300"
                />
            </div>
            <div className="flex gap-x-4 items-self-center justify-end text-primary font-semibold [&_button]:cursor-pointer">
                {isTrashPage && trashNotes?.length > 0 && (
                    <button onClick={() => handleEmptyTrash()} className="flex items-center">{isMutating && <Loader2 className="animate-spin text-primary mr-2" size={20} />}Empty Trash</button>
                )}
                {selectedNotes.length > 0 && (
                    <NoteActions className="flex gap-x-4" showLabels />
                )}

                {/* <Avatar /> */}
            </div>
        </div>
    );
};


export const MobileNavbar = ({
    setSearchInput,
}: {
    setSearchInput: (input: string) => void;
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const {
        selectedNotes,
        toggleMobileSelectAllow,
        mobileSelectAllow,
        resetNotesSelection,
    } = useNotesStore();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const element = e.target as Node;

            if (menuRef.current && !menuRef.current.contains(element)) {
                setIsMenuOpen(false);
            }

            if (searchRef.current && !searchRef.current.contains(element)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login')
    }

    const handleClickChevron = () => {
        resetNotesSelection()
        toggleMobileSelectAllow()
    }

    return (
        <nav className="relative block lg:hidden ">
            {/* Top bar */}
            {selectedNotes.length === 0 ? (
                <>
                    <div className="flex justify-between items-center px-3 relative py-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const newVal = !isMenuOpen;
                                if (newVal) {
                                    setIsSearchOpen(false);
                                }
                                setIsMenuOpen(newVal);
                            }}
                        >
                            <Menu />
                        </button>
                        <div className="flex items-start  absolute left-1/2 -translate-x-1/2">
                            <img src={Logo} className="w-7 h-7" />
                            <p className="text-primary font-normal -mt-1 text-[25px] ">
                                oted
                            </p>
                        </div>

                        <div className="flex gap-x-3 items-center text-gray-800">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();

                                    if (isMenuOpen) {
                                        setIsMenuOpen(false);
                                    }

                                    setIsSearchOpen((prev) => !prev);
                                }}
                            >
                                <Search size={22} />
                            </button>

                            <button onClick={toggleMobileSelectAllow}>
                                <CircleCheck
                                    size={22}
                                    className={cn(mobileSelectAllow && "text-white fill-primary")}
                                />
                            </button>

                            {/* <Avatar /> */}
                        </div>
                    </div>

                    {/* Dropdown + overlay */}
                    <div
                        className={cn(
                            "w-full h-dvh",
                            "bg-black/30 transition-opacity duration-300",
                            overlayClasses,
                            isMenuOpen
                                ? "opacity-100 pointer-events-auto"
                                : "opacity-0 pointer-events-none",
                        )}
                    >
                        {/* Menu */}
                        <div
                            ref={menuRef}
                            className={cn(
                                "relative z-50 w-full bg-white p-3 overflow-hidden",
                                "max-h-0 transition-[max-height] duration-300",
                                isMenuOpen && "max-h-[23rem]",
                            )}
                        >
                            {SIDEBAR_OPTIONS.map((option: SideBarOption) => {
                                const isSelected = option.routeTo === pathname;

                                return (
                                    <button
                                        key={option.title}
                                        className={cn(
                                            "flex gap-2 items-center rounded-full text-sm",
                                            "px-4 py-3 box-border w-full cursor-pointer",
                                            "font-medium transition-all duration-100",
                                            isSelected && "bg-primary/5 text-primary",
                                        )}
                                        onClick={() => {
                                            navigate(option.routeTo);
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        <span>
                                            {createElement(option.icon, {
                                                size: 20,
                                                className: isSelected
                                                    ? `fill-primary ${option.selectedClasses}`
                                                    : "fill-none",
                                            })}
                                        </span>

                                        <span>{option.title}</span>
                                    </button>
                                );
                            })}
                            <button className="flex gap-2 items-center rounded-full text-sm px-4 py-3 box-border w-full cursor-pointer font-medium" onClick={handleLogout}><LogOut size={20} className="ml-0.5" />Logout</button>
                        </div>
                    </div>
                    {isSearchOpen && (
                        <div
                            ref={searchRef}
                            className={cn(
                                "bg-white   h-11  w-screen inset-x-0 shadow-xl flex items-center px-3 ",

                                overlayClasses,
                            )}
                        >
                            <Search className="text-slate-400" size={20} />

                            <Input
                                type="search"
                                placeholder="Search notes"
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="border-none w-full focus-visible:ring-0 transition-all duration-300"
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="w-full bg-white text-gray-700 h-17 p-4 shadow-md flex justify-between items-center">
                    <div className="flex gap-x-0.5 items-center font-semibold text-lg">
                        <button onClick={handleClickChevron}>
                            <ChevronLeft />
                        </button>
                        <p>
                            {selectedNotes.length} note{selectedNotes.length > 1 ? "s" : ""}{" "}
                            selected
                        </p>
                    </div>
                    <div>
                        {selectedNotes.length > 0 && (
                            <NoteActions iconSize={20} className="gap-x-4" />
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};



const overlayClasses = "fixed top-13.5 z-40";
