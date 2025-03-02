"use client"

import { useEffect, useRef, useState } from "react"
import VideoPlayer from "./VideoPlayer"

export default function RocketTracker() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const lastMousePosRef = useRef({ x: 0, y: 0 })
    const lastTimeRef = useRef<number>(0)
    const velocityRef = useRef({ x: 0, y: 0 })
    const ROCKET_LENGTH = 45 // Half of the rocket's height (80/2)
  
    // Initialize position
    useEffect(() => {
      if (typeof window !== "undefined") {
        const initialPos = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        }
        setPosition(initialPos)
        setTargetPosition(initialPos)
        lastMousePosRef.current = initialPos
      }
    }, [])
  
    // Track mouse movement
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const currentPos = { x: e.clientX, y: e.clientY }
  
        // Calculate movement direction
        const dx = currentPos.x - lastMousePosRef.current.x
        const dy = currentPos.y - lastMousePosRef.current.y
  
        // Only update rotation if there's significant movement
        // if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
          setRotation(angle)
          console.log('angle - >', angle);
        // setRotation((prevAngle) => prevAngle + (angle - prevAngle) * 0.1);
  
          // Calculate the offset based on rotation to place the rocket's head at the mouse position
          const radians = angle * (Math.PI / 180)
          const offsetX = Math.sin(radians) * ROCKET_LENGTH
          const offsetY = -Math.cos(radians) * ROCKET_LENGTH
  
          // Set target position adjusted for the rocket's head
          setTargetPosition({
            x: currentPos.x - offsetX,
            y: currentPos.y - offsetY,
          })
        // }
  
        lastMousePosRef.current = currentPos
      }
  
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])
  
    // Animation loop
    useEffect(() => {
      let animationFrameId: number
  
      const animate = (time: number) => {
        // Calculate delta time for smooth animation
        const deltaTime = lastTimeRef.current ? Math.min((time - lastTimeRef.current) / 1000, 0.1) : 0.016
        lastTimeRef.current = time
  
        // Spring physics parameters
        const springStrength = 80   // Lower = smoother, higher = more responsive
        const damping = 50 // Higher = less oscillation
  
        // Calculate spring force
        const dx = targetPosition.x - position.x
        const dy = targetPosition.y - position.y
  
        // Update velocity with spring physics
        velocityRef.current.x += (dx * springStrength - velocityRef.current.x * damping) * deltaTime
        velocityRef.current.y += (dy * springStrength - velocityRef.current.y * damping) * deltaTime
  
        // Update position
        setPosition((prev) => ({
          x: prev.x + velocityRef.current.x * deltaTime,
          y: prev.y + velocityRef.current.y * deltaTime,
        }))
  
        animationFrameId = requestAnimationFrame(animate)
      }
  
      animationFrameId = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrameId)
    }, [targetPosition, position.x, position.y])

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          opacity: 1,
          transformOrigin: "center center",
        }}
      >
       <VideoPlayer
        fileName="aaa"
        className="select-none"
        width={90}
        height={90}
        loop={true}
      />
      </div>
    </div>
  )
}

