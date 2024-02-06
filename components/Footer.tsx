import Link from "next/link";

const links = [
  {
    title: "About",
    link: "#",
  },
  {
    title: "Terms & Conditions",
    link: "#",
  },
  {
    title: "FAQs",
    link: "#",
  },
  {
    title: "Contact",
    link: "#",
  },
];

const Footer = () => {
  return (
    <div className='text-white w-full relative '>
      <div className='border-[0.2px] border-white/20 h-[70px] border-r-0 border-l-0 grid grid-cols-3  items-center w-full justify-center mb-5'>
        <div className=''>
          <p className='font-bold'>FlickFiesta</p>
        </div>
        <div className='flex justify-between items-center px-3'>
          {links.map(({ title, link }, index) => (
            <Link href={link} key={index} className='text-xs cursor-pointer'>
              {title}
            </Link>
          ))}
        </div>
        <div className=' flex justify-end'>links</div>
      </div>
      <div className='w-full flex items-center justify-center'>
        <p className='text-xs'>
          Developed by Isadia <span>&copy; 2024</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
