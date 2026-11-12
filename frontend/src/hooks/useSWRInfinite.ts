import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useSWR from "swr";

const useNotesInfinite = (
  key: string | string[],
  fetcher: (search: string, page?: number) => Promise<any>,
) => {
  const [page, setPage] = useState<number>(1);
  const search = Array.isArray(key) ? key[1] : "";
  const { pathname } = useLocation();
  const {
    data = { notes: [], totalNotes: 0 },
    isLoading,
    error,
    mutate,
  } = useSWR(key, () => fetcher(search));

  const loadMoreNotes = useCallback(async () => {
    if (data.notes.length >= data.totalNotes) return;

    const updatedPage = page + 1;

    const newNotes = await fetcher(search, updatedPage);
    mutate(
      {
        notes: [...data.notes, ...newNotes.notes],
        totalNotes: newNotes.totalNotes,
      },
      false,
    );
    setPage(updatedPage);
  }, [mutate, page, search, setPage, data.notes, data.totalNotes]);

  useEffect(() => {
    return () => setPage(1);
  }, [pathname]);

  return { data, isLoading, error, loadMoreNotes };
};

export default useNotesInfinite;
