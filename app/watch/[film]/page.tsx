const Watch = ({ searchParams }) => {
  const videoId = searchParams.id;
  const title = searchParams.name;
  const media = searchParams.media;

  return (
    <div className='h-screen w-full  flex md:items-center md:justify-center '>
      <div className='mt-32 md:mt-0'>
        <div className='mb-4 px-4 md:px-0'>
          <h4 className='font-extrabold text-lg underline underline-offset-4 decoration-red-500 decoration-4'>
            {title}
          </h4>
        </div>
        <div className='w-screen md:w-[1200px] md:mx-auto px-4 md:px-0 '>
          <iframe
            className='h-[250px] md:h-[650px] w-full'
            src={`https://vidsrc.to/embed/${media}/${videoId}?autoplay=1&muted=1`}
            allow='autoplay; fullscreen'
            allowFullScreen
            referrerPolicy='no-referrer'></iframe>
        </div>
      </div>
    </div>
  );
};

export default Watch;
