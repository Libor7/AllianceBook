"use client";

/** LIBRARIES */
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination as MUIPagination } from "@mui/material";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeHandler = (_event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <MUIPagination
      color="primary"
      count={totalPages}
      onChange={changeHandler}
      page={currentPage}
    />
  );
};

export default Pagination;
