"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";
import VideoPlayer from "./VideoPlayer";
interface MousePosition {
    x: number;
    y: number;
}

const MouseTrack: React.FC = () => {
    const [mousePosition, setMousePosition] = useState<MousePosition | null>(
        null
    );
    const [isVisible, setIsVisible] = useState(false);
    const imageRef = useRef<HTMLVideoElement>(null);
    const [rotation, setRotation] = useState<number>(0);

    const x = useMotionValue(mousePosition?.x ?? 0);
    const y = useMotionValue(mousePosition?.y ?? 0);

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            x.set(event.clientX);
            y.set(event.clientY);
            setMousePosition({ x: event.clientX, y: event.clientY });
            if (!isVisible) {
                setIsVisible(true);
            }
        },  
        [isVisible]
    );

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [handleMouseMove]);

    useEffect(() => {
        if (!mousePosition) return;

        x.set(mousePosition.x);
        y.set(mousePosition.y);

        if (imageRef.current) {
            const imageElement: HTMLVideoElement = imageRef.current;
            const rect = imageElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const angle =
                90 +
                Math.atan2(
                    mousePosition.y - centerY,
                    mousePosition.x - centerX
                ) *
                    (180 / Math.PI);

            setRotation(angle);
        }
    }, [mousePosition, x, y]);

    if (!isVisible || !mousePosition) return null;

    return (
        <div className="h-[100vh] w-[100vw] fixed left-0 top-0 pointer-events-none">
            <motion.div
                style={{
                    x: x,
                    y: y,
                    position: "fixed",
                    pointerEvents: "none",
                    rotate: rotation,
                }}
            >
                <VideoPlayer fileName="mousetracker" className="xl:flex items-center justify-center w-[58px] h-[58px]" loop={true} />
            </motion.div>
        </div>
    );
};

export default MouseTrack;
