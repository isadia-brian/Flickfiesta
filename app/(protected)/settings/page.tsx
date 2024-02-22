import { auth, signOut } from "@/auth";

const Settings = async () => {
  const session = await auth();

  return (
    <div className='h-screen flex flex-col items-center justify-center space-y-6'>
      <h1>{JSON.stringify(session)}</h1>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}>
        <button
          type='submit'
          className='shadow-sm border border-slate-200 rounded-md px-4 py-2'>
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default Settings;
