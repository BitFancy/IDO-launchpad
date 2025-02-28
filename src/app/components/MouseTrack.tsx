"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

interface MousePosition {
    x: number;
    y: number;
}

const MouseTrack: React.FC = () => {
    const [mousePosition, setMousePosition] = useState<MousePosition | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [rotation, setRotation] = useState<number>(0);
    const [lastRotation, setLastRotation] = useState<number>(0);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const trackerSize = 58; // Adjust based on tracker size
    const offset = 25; // Move tracker slightly below the mouse

    const handleMouseMove = useCallback((event: MouseEvent) => {
        const { clientX, clientY } = event;
        
        setMousePosition({ x: clientX, y: clientY });
        if (!isVisible) setIsVisible(true);

        // Smooth animation for better UX
        animate(x, clientX - trackerSize / 2, { duration: 0.2 });
        animate(y, clientY - trackerSize / 2 + offset, { duration: 0.2 });
    }, [isVisible, x, y]);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    useEffect(() => {
        if (!mousePosition) return;

        const { x: mouseX, y: mouseY } = mousePosition;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const angle = Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);

        // Only update if change is significant
        if (Math.abs(angle - lastRotation) > 1) {
            setRotation(angle);
            setLastRotation(angle);
        }
    }, [mousePosition, lastRotation]);

    if (!isVisible || !mousePosition) return null;

    return (
        <div className="h-[100vh] w-[100vw] fixed left-0 top-0 pointer-events-none">
            <motion.div
                style={{
                    x,
                    y,
                    position: "fixed",
                    pointerEvents: "none",
                    rotate: rotation,
                }}
            >
                <VideoPlayer
                    fileName="mousetracker"
                    className="w-[58px] h-[58px]"
                    loop={true}
                />
            </motion.div>
        </div>
    );
};

export default MouseTrack;
