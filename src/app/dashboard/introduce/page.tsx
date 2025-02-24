"use client";
import Button1 from "../../components/button1";
import Image from "next/image";
import aptos from "../../../../public/assets/category/aptos.png";
import katman from "../../../../public/assets/category/katma.png";

import { Jost } from "next/font/google";
import VideoPlayer from "@/app/components/VideoPlayer";

const jost = Jost({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-jost",
});

export default function intruduce() {
    const scrollToSection = (event: React.MouseEvent) => {
        event.preventDefault();
        const section = document.getElementById("howitworks");
        if (section) {
            const topPosition =
                section.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: topPosition,
                behavior: "smooth", // Smooth scrolling
            });
        }
    };

    return (
        <div className="w-full m-auto xl:mt-[70px] mt-[30px] xl:flex justify-between">
            <div className="w-full flex justify-center xl:hidden ">
                <VideoPlayer fileName="banner" className="xl:w-[532px] w-moonwidth h-moonheight xl:h-[532px] flex items-center justify-center" loop={false} />
            </div>

            <div className="xl:w-[670px] mr-[10px] flex flex-col items-center xl:block mt-[50px] xl:mt-0px">
                <h1
                    className={`text-fluid xl:text-[40px] sm:leading-[48px] sm:mt-[15px] tracking-4 font-350 sm:mb-[20px] text-[#E3E3E3] ${jost.className}`}
                >
                    FUEL YOUR DREAMS, LAUNCH
                </h1>
                <h1
                    className={`text-fluid2 xl:text-[64px] sm:leading-[64px] font-550 tracking-1 text-[#E3E3E3] sm:mb-[8px] ${jost.className}`}
                >
                    TO THE MOON!
                </h1>
                <p
                    className={`text-introdescription md:text-[20px] xl:text-left text-center tracking-2 text-[#E3E3E3] block font-200 mb-[33px] ${jost.className}`}
                >
                    Astromove identifies the best new tokens on the Aptos and
                    Sui networks and launches them with a refund guarantee
                    before they are listed on exchanges. Together, let’s
                    redefine success in the Aptos and Sui ecosystems.
                </p>

                <a onClick={scrollToSection} className="ml-[7px]">
                    <Button1
                        name={"How it works?"}
                        width="182px"
                        height="50px"
                    />
                </a>
                <p
                    className={`block my-[15px] text-[#E3E3E3] text-fluid3 md:text-[20px] font-200 ${jost.className}`}
                >
                    Supported Blockchains:
                </p>
                <div className="px-[25px] flex gap-[36px]">
                    <a href="https://aptosfoundation.org/" target="blank">
                        <Image alt={"aptos"} src={aptos} />
                    </a>
                    <a href="https://sui.io" target="blank">
                        <Image alt={"katman"} src={katman} />
                    </a>
                </div>
            </div>
            <VideoPlayer fileName="banner" className="hidden xl:flex items-center justify-center w-[558px] h-[558px]" loop={false} />
        </div>
    );
}
