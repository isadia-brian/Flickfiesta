const Watch = ({ params }: { params: { id: number } }) => {
  const videoId = params.id;

  return (
    <div className='h-screen flex items-center justify-center md:w-[1200px] mx-auto px-4 md:px-0'>
      <iframe
        className='h-[250px] md:h-[650px] w-full'
        src={`https://vidsrc.to/embed/movie/${videoId}?autoplay=1&muted=1`}
        allow='autoplay; fullscreen'
        allowFullScreen
        referrerPolicy='no-referrer'></iframe>
    </div>
  );
};

export default Watch;
