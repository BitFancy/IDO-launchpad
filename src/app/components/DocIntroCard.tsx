import Image from "next/image";
import MoviePlayIcon from "../../../public/assets/icon/playIcon.png";
import GalleryIcon from "../../../public/assets/icon/galleryIcon.png";

export default function DocIntroCard({ selectIcon }: { selectIcon: boolean }) {
    return (
        <div className="xs:w-full w-[92vw] relative rounded-[10px] xl:h-[702px] h-doccardheight xs:mt-[71px] mt-[25px]">
            <div className="w-full h-full bg-[#ffff] flex justify-center items-center rounded-[10px] opacity-25"></div>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                {selectIcon ? (
                    <Image
                        src={MoviePlayIcon}
                        alt="intromovie"
                        className="xl:h-[70px] h-doccardiconheight w-auto"
                    />
                ) : (
                    <Image
                        src={GalleryIcon}
                        alt="intromovie"
                        className="xl:h-[70px] h-doccardiconheight w-auto"
                    />
                )}
            </div>
        </div>
    );
}
