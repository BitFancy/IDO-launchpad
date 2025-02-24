import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
    fileName: string;
    className?: string;
    loop?: boolean;
}

const VideoPlayer = ({ fileName, className, loop }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [osType, setOsType] = useState('');
    
    useEffect(() => {
        if(videoRef.current) {
            console.log(" osType -> ", osType);
            alert(osType);
            videoRef.current.src = osType === 'iOS' ? `/assets/back/${fileName}.mov` : `/assets/back/${fileName}.webm`;
            videoRef.current.className = className ?? "";
            videoRef.current.loop = loop ?? false;
        }
    }, [fileName, className, loop, osType]);


    useEffect(() => {
        const userAgent = navigator.userAgent;
    
        if (/iPhone|iPad|iPod/i.test(userAgent)) {
            console.log('its ios')
            setOsType('iOS');
        } else if (/Windows/i.test(userAgent)) {
            console.log('its windows')
            setOsType('Windows');
        } else if (/Android/i.test(userAgent)) {
            console.log('its android')
            setOsType('Android');
        } else {
            console.log('its other')
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
        className={className}
      />
    )
}

export default VideoPlayer;
