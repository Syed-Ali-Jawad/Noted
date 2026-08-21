import useNotesStore from "@/store";
import { FileText } from "lucide-react";

const EmptyState = ({
    title = "Nothing here yet",
    description = "Your notes will appear here.",
}: {
    title?: string;
    description?: string;
}) => {

    const { search } = useNotesStore()

    return (
        <div className="flex min-h-64 max-w-130 mx-auto  w-full flex-col items-center justify-center rounded-2xl bg-white px-6 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                <FileText className="size-5 text-primary" />
            </div>

            <h3 className="text-base font-semibold text-gray-700">
                {search ? `No result found for ${search}` : title}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
                {search ? "Try searching for something else" : description}
            </p>
        </div>
    );
};

export default EmptyState;