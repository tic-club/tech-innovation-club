function RightSidebar(){
  return(
      <section className=" custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-[#1F2222] bg-[#12141C] px-10 pb-6 pt-28 max-xl:hidden">
          <div className=" flex flex-1 flex-col justify-start">
              <h1 className=" text-heading4-medium text-[#ffffff] ">News</h1>
              <p className=" text-[#ffffff] ">T.E Results are out <br /> go please check</p>

              <p className=" justify-end text-[#ffffff]">check more....</p>
          </div>
          <div className=" flex flex-1 flex-col justify-start">
              <h1 className=" text-[20px]  text-[#ffffff] ">Important Announcment</h1>
          </div>
      </section>
  )
}

export default RightSidebar;
