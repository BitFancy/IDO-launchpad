"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

interface MouseTrackProps {
  size?: number; // Cursor size
  opacity?: number; // Opacity of the tracker
}

const MouseTrack: React.FC<MouseTrackProps> = ({ size = 70, opacity = 1 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const [visible, setVisible] = useState(false);
  const [offSetX, setOffSetX] = useState(0);
  const [offSetY, setOffSetY] = useState(0);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Calculate the movement direction (relative to the starting position)
      const deltaX = clientX - prevPosition.x;
      const deltaY = clientY - prevPosition.y;

      // Calculate angle with Math.atan2 directly, and normalize it to [0, 360)
      let newAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      // Normalize angle to 0-360 degrees
      if (newAngle < 0) {
        newAngle += 360;
      }

      // Smooth the transition for the angle change
      const smoothAngle = angle + (newAngle - angle) * 0.1; // Smooth transition (0.1 is the factor for smoothing)

      // Set new angle and position
      setAngle(smoothAngle);
      setPrevPosition({ x: clientX, y: clientY });
      setPosition({ x: clientX, y: clientY });

      // Calculate offsets based on angle
      const offX = size / 2 * Math.cos(smoothAngle * Math.PI / 180);  // Horizontal offset
      const offY = size / 2 * Math.sin(smoothAngle * Math.PI / 180);  // Vertical offset

      setOffSetX(offX);
      setOffSetY(offY);
    };

    const showCursor = () => setVisible(true);
    const hideCursor = () => setVisible(false);

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => updatePosition(e));
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", showCursor);
    document.addEventListener("mouseleave", hideCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", showCursor);
      document.removeEventListener("mouseleave", hideCursor);
    };
  }, [prevPosition, size, angle]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50"
      animate={{
        x: position.x - offSetX, // Align the top-left corner with mouse position
        y: position.y - offSetY, // Align the top edge with the mouse position
        opacity: visible ? opacity : 0,
        rotate: angle, // Rotate the tracker based on mouse movement direction
      }}
      transition={{
        type: "spring",
        stiffness: 80, // Reduced stiffness for a smoother feel
        damping: 25, // Increased damping to reduce overshoot and make it less jittery
        mass: 0.8, // Adding a little mass to make the movement less twitchy
      }}
    >
      <VideoPlayer
        fileName="aaa"
        className="select-none"
        width={size}
        height={size}
        loop={true}
      />
    </motion.div>
  );
};

export default MouseTrack;
