import { XCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

const FancyModal = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? "modal display-block z-50 "
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className='relative modal-main bg-white px-4 py-8 rounded-2xl'>
        <button
          type='button'
          className='bg-transparent hover:bg-transparent absolute top-2 right-2 z-50'
          onClick={handleClose}>
          <XCircle className='text-black h-9 w-9' />
        </button>
        <ScrollArea className='h-full w-full'>{children}</ScrollArea>
      </section>
    </div>
  );
};

export default FancyModal;
