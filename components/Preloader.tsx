// import { GuardSpinner } from "react-spinners-kit";

//TODO :Replace the Guars spinner animation
const Preloader = () => {
  // const [loading, setLoading] = useState(true);
  return (
    <div className='fixed inset-0 z-[100] bg-[#26282F] flex justify-center items-center'>
      {/* <GuardSpinner size={50} frontColor='#fb6000' loading={loading} /> */}

      <p className='text-white'>Loading.....</p>
    </div>
  );
};

export default Preloader;
