"use client"
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter} from 'next/navigation';


function LeftSidebar(){
    const router = useRouter();
    const pathname = usePathname();

    return (

        <section className=" custom-scrollbar fixed left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-[#1F2222] bg-[#12141C] pb-5 pt-28  max-md:hidden ;
        "> 

            <div className=" flex w-full flex-1 flex-col gap-6 px-6">

                {
                    sidebarLinks.map((link) =>{
                        const isActive = (
                            pathname.includes(link.route) && link.route.length > 1
                        ) || pathname === link.route;


                        return (
                            <Link 
                                href={link.route}
                                key={link.label}
                                className={ `relative flex justify-start gap-4 rounded-lg p-4 ${isActive && 'bg-[#877EFF]'} ` } 

                            >
                                <Image  
                                    src={link.imgURL}
                                    alt={link.label}
                                    width={24}
                                    height={24}
                                />

                                <p className=' text-[#ffffff] max-lg:hidden'>{link.label}</p>
                            </Link>
                        )
                        }
                    )
                
                }

            </div>


        </section>



    )
}

export default LeftSidebar;
