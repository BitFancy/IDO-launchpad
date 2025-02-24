import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
    fileName: string;
    className?: string;
    loop?: boolean;
}

const VideoPlayer = ({ fileName, className, loop }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    
    useEffect(() => {
        if(videoRef.current) {
            videoRef.current.src = supportsHEVCAlpha() ? `/assets/back/${fileName}.mov` : `/assets/back/${fileName}.mov`;
            videoRef.current.className = className ?? "";
            videoRef.current.loop = loop ?? false;
        }
    }, [fileName, className, loop]);

    const [deviceType, setDeviceType] = useState('');

    useEffect(() => {
      const userAgent = navigator.userAgent;
      console.log(" userAgent -> ", userAgent);
      alert(userAgent);
  
      if (/iPhone|iPad|iPod/i.test(userAgent)) {
        setDeviceType('iOS');
      } else if (/Windows/i.test(userAgent)) {
        setDeviceType('Windows');
      } else if (/Android/i.test(userAgent)) {
        setDeviceType('Android');
      } else {
        setDeviceType('Other');
      }
      console.log(" deviceType -> ", deviceType);
    }, []);

    const supportsHEVCAlpha = () => {
        const ua = navigator.userAgent.toLowerCase();
        // console.log(" ua -> ", ua);
        const hasMediaCapabilities = !!(
        navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo
        );
        const isSafari =
        ua.includes("safari") &&
        !ua.includes("chrome") &&
        ua.includes("version/");

        // console.log(" isSafari, hasMediaCapabilities -> ", isSafari && hasMediaCapabilities);
        // alert(isSafari && hasMediaCapabilities);


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
