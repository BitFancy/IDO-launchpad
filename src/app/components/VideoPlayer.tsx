import { useEffect, useRef } from "react";

interface VideoPlayerProps {
    fileName: string;
    width?: string;
    height?: string;
    loop?: boolean;
}

const VideoPlayer = ({ fileName, width, height, loop }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    
    useEffect(() => {
        if(videoRef.current) {
            videoRef.current.src = supportsHEVCAlpha() ? `/assets/back/${fileName}.mov` : `/assets/back/${fileName}.webm`;
            if (width) videoRef.current.style.width = width;
            if (height) videoRef.current.style.height = height;
            videoRef.current.loop = loop ?? false;
        }
    }, [fileName, width, height, loop]);

    const supportsHEVCAlpha = () => {
        const ua = navigator.userAgent.toLowerCase();
        const hasMediaCapabilities = !!(
        navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo
        );
        const isSafari =
        ua.includes("safari") &&
        !ua.includes("chrome") &&
        ua.includes("version/");

        return isSafari && hasMediaCapabilities;
    }

    return (
        <video
        ref={videoRef}
        loop={loop}
        muted
        autoPlay
        playsInline
        className="w-full h-auto rounded-lg shadow-md"
      />
    )
}

export default VideoPlayer;
