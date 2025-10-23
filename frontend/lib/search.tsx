"use client";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";

import { debounce } from "./debounce";
export default function Search({
  setSearch,
  setPage,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        console.log(value);
        setPage(1);
        setSearch(value);
      }, 500),
    [setSearch, setPage]
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearch(e.target.value);
  };

  return <input type="text" placeholder="Search..." onChange={handleSearch} />;
}
