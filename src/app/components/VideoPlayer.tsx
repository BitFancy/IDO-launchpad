import { useEffect, useRef } from "react";

interface VideoPlayerProps {
    fileName: string;
    className?: string;
    loop?: boolean;
}

const VideoPlayer = ({ fileName, className, loop }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    
    useEffect(() => {
        if(videoRef.current) {
            videoRef.current.src = supportsHEVCAlpha() ? `/assets/back/${fileName}.mov` : `/assets/back/${fileName}.webm`;
            videoRef.current.className = className ?? "";
            videoRef.current.loop = loop ?? false;
        }
    }, [fileName, className, loop]);

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
        className={className}
      />
    )
}

export default VideoPlayer;
