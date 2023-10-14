function RightSidebar() {
  return (
    <section className="custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l px-10 pb-6 pt-28 max-xl:hidden">
      <div className="flex flex-1 flex-col justify-start">
        <h1 className="text-heading4-medium">News</h1>
        <p>
          T.E Results are out <br /> go please check
        </p>

        <p className="justify-end">check more....</p>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h1 className="text-[20px]">Important Announcment</h1>
      </div>
    </section>
  );
}

export default RightSidebar;
