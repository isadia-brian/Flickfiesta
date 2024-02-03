import React from "react";

const Page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <h1>ID: {params.id}</h1>
    </div>
  );
};

export default Page;
