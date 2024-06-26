const Errorpage = () => {
    return (
      <div className="flex flex-col justify-center text-center bg-white shadow-2xl">
        <div className="flex overflow-hidden relative flex-col items-center px-16 pt-20 w-full min-h-[775px] max-md:px-5 max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5dd348c5e839c93c6cc23a54127b066c0050d0513b15bdf99e6d2a90860ae620?"
            className="object-cover absolute inset-0 size-full"
          />
          <div className="flex relative flex-col mt-9 max-w-full w-[672px]">
            <div className="z-10 self-center text-blue-500 text-[205px] max-md:text-4xl">
              404
            </div>
            <div className="flex overflow-hidden relative flex-col items-center px-16 pt-11 pb-96 w-full text-2xl text-black mix-blend-darken min-h-[519px] max-md:px-5 max-md:pb-10 max-md:max-w-full">
              <img
                loading="lazy"
                srcSet="..."
                className="object-cover absolute inset-0 size-full"
              />
              <span className="font-semibold">Oops!</span> it seems you follow
              backlink
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Errorpage;