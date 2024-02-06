"use client";
import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Proptype = {
  pages?: number;
  page: number;
  media: string;
};
const PaginationNumbers: React.FC<Proptype> = (props) => {
  const { pages, media, page } = props;

  return (
    <div className='text-white'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          {Array.from({ length: 10 }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href={{ pathname: `/${media}/`, query: { page: i + 1 } }}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationNumbers;
