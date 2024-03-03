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
    <div className='text-white w-full relative px-5 md:px-0 '>
      <div className='border-[0.2px] border-white/20 md:h-[70px] border-r-0 border-l-0 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 py-5  md:items-center md:w-full md:justify-center mb-5'>
        <div>
          <p className='text-[20px] font-black'>FilmSasa</p>
        </div>
        <div className='flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between md:items-center md:px-3'>
          {links.map(({ title, link }, index) => (
            <Link
              href={link}
              key={index}
              className='text-sm md:text-xs cursor-pointer'>
              {title}
            </Link>
          ))}
        </div>
        <div className=' flex md:justify-end'>links</div>
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
