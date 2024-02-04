import React from "react";
import FilterSkeleton from "./FilterSkeleton";
import ListSkeleton from "./ListSkeleton";

const PageSkeleton = () => {
  return (
    <div>
      <div className='mb-12'>
        <FilterSkeleton />
      </div>
      <ListSkeleton />
    </div>
  );
};

export default PageSkeleton;
