"use client";

import {
  Pagination,
  PaginationContent,
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
  const { media } = props;

  return (
    <div className='text-white'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          {Array.from({ length: 5 }).map((_, i) => (
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
