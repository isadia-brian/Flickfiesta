import TrialCard from "@/components/TrialCard";
import { getRecommendedContent } from "@/helpers";

const Page = async () => {
  const results = await getRecommendedContent();

  return (
    <div className='relative mt-24 max-w-[1200px] mx-auto text-black'>
      <div className='grid grid-cols-6 gap-6'>
        {results.map((film, index) => {
          return <TrialCard film={film} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Page;
