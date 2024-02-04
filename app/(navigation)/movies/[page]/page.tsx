import { discoverMovies } from "@/helpers";

import PaginationNumbers from "@/components/PaginationNumbers";

const Page = async ({ searchParams }: { searchParams?: { page?: string } }) => {
  const page = Number(searchParams?.page);

  const media = "movies";

  const data = await discoverMovies(page);

  const pages = data.total_pages;

  return (
    <div className='bg-gray-900 h-screen relative'>
      <h1>Page</h1>
      <div className='absolute bottom-5'>
        <PaginationNumbers pages={pages} page={page} media={media} />
      </div>
    </div>
  );
};

export default Page;
