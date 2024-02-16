const Watch = ({ params, searchParams }) => {
  const videoId = searchParams.id;
  const title = searchParams.name;
  const media = searchParams.media;

  return (
    <div className='h-screen flex items-center justify-center '>
      <div>
        <div className='md:mb-4'>
          <h4 className='font-extrabold text-lg underline underline-offset-4 decoration-red-500 decoration-4'>
            {title}
          </h4>
        </div>
        <div className='md:w-[1200px] mx-auto px-4 md:px-0 '>
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
