import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import Image from "next/image";
import img from './contest3.jpg';

import { useRouter } from "next/router";

const Contest3 = () => {

    const router = useRouter();

    return (
        <div className="">

                <Navbar /> 

                <div className="flex justify-center items-center">
            <button className="bg-[#2dad5c] text-white w-[145px] h-[42px] rounded-md" onClick={() => router.push("/Home")}>Go Back</button>
            </div>
            <div className="">
                <h1 className="text-[#2dad5c] text-lg text-center my-5 font-bold">போட்டிகள் முடிவடைந்தது - Arabic Calligraphy</h1>
            </div>
                <div className="banner flex justify-center my-5">
                    <Image src={img} width={400} height={400} className="max-h-[70vh] max-w-[90vw]" alt="img" /> 
                </div>

                <form >
                    

                    

                    <hr className="tect-blue-500 my-8 border-1 border-[#222222] border-t w-[100%]" />

                   
                    {/* <h1>{form.date}</h1> */}
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe2wZA2nwGze-BpMLhcOBVCPz7XCsSADd1RHUJF3MwQb7t_Iw/viewform" width="900" className="w-[100vw] min-h-[3000px] max-h-[3500px]" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

            </form>
        </div>

       /* <>
            <div className="h-[100vh] w-[100vw] flex justify-center items-center text-[#2dad5c] font-bold font-serif">
                <h1 className="text">போட்டிகள் முடிவடைந்தது - Contests have been closed</h1>
            </div>
        </>
        */
    )
} 

export default Contest3;