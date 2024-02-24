import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const Forgot = () => {
  return (
    <div className='fixed inset-0  z-[300] bg-white gap-4 text-black'>
      <div className='md:w-[1200px] mx-auto flex items-center justify-center h-screen'>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default Forgot;
