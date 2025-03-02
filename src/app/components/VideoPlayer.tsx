import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
    fileName: string;
    className?: string;
    loop?: boolean;
    width: number;
    height: number;
}

const VideoPlayer = ({ fileName, className, loop, width, height }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [osType, setOsType] = useState('');
    
    useEffect(() => {
        if(videoRef.current) {
            videoRef.current.src = osType === 'iOS' ? `/assets/back/${fileName}.mov` : `/assets/back/${fileName}.webm`;
            videoRef.current.className = className ?? "";
            videoRef.current.loop = loop ?? false;
            videoRef.current.width = width?? "";
            videoRef.current.height = height?? "";
        }
    }, [fileName, className, loop, osType]);


    useEffect(() => {
        const userAgent = navigator.userAgent;
    
        if (/iPhone|iPad|iPod/i.test(userAgent)) {
            setOsType('iOS');
        } else if (/Windows/i.test(userAgent)) {
            setOsType('Windows');
        } else if (/Android/i.test(userAgent)) {
            setOsType('Android');
        } else {
            setOsType('Other');
        }
    }, []);

    return (
        <video
        ref={videoRef}
        loop={loop}
        muted
        autoPlay
        playsInline
        width={width}
        height={height}
        className={className}
      />
    )
}

export default VideoPlayer;
