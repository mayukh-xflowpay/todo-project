"use client";
import { ChangeEvent, Dispatch, SetStateAction, useMemo } from "react";

import { debounce } from "./debounce";
export default function Search({
  setSearch,
  setPage,
  searchVal,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
  searchVal: string;
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

  return (
    <input
      type="text"
      defaultValue={searchVal}
      placeholder="Search..."
      onChange={handleSearch}
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
    />
  );
}
