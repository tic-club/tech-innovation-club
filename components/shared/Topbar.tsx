import Image from "next/image";
import Link from "next/link";

function Topbar () {
  return (
    <nav className="topbar fixed top-0 z-30 flex w-full items-center justify-between bg-[#121417] px-6 py-3">
        <Link href="/" className=" flex items-center gap-4"> 

          <Image src="/assets/TIC_LOG.png" alt="logo tic"
            width={40}
            height={40}
    
          />
          <p className=" text-heading3-bold text-[#FFFFFF] max-xs:hidden"> 
            TIC-club
          </p>

        </Link>

        <div className=" flex items-center gap-1">
          <div className=" block md:hidden">
            
          </div>
        </div>

    </nav>
  )
}

export default Topbar;