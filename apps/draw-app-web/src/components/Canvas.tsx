import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import "./canvas.css";
import { socket } from "../socket";

export const Canvas = () => {
  const canvasRef: MutableRefObject<HTMLCanvasElement> = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [setOther, setSetOther] = useState();

  const handleMouseMovement = (event: React.MouseEvent) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleDrawingOther = (p: any) => {
    setSetOther(p);
  };

  socket.on("draw", handleDrawingOther);

  useEffect(() => {
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;
    ctx.beginPath();
    ctx.moveTo(setOther.start.x, setOther.start.y);
    ctx.lineTo(setOther.end.x, setOther.end.y);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.stroke();
  }, [setOther]);

  const draw = (event: React.MouseEvent) => {
    if (event.buttons !== 1) return;
    console.log("drawing at", mousePosition.x, " and ", mousePosition.y);
    console.log("event at", event.clientX, " and ", event.clientY);
    const ctx: CanvasRenderingContext2D = context;
    ctx.beginPath();
    ctx.moveTo(mousePosition.x, mousePosition.y);
    setMousePosition({ x: event.clientX, y: event.clientY });
    ctx.lineTo(event.clientX, event.clientY);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.stroke();
    socket.emit("draw", {
      start: { x: mousePosition.x, y: mousePosition.y },
      end: { x: event.clientX, y: event.clientY },
    });
  };

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (canvas) {
      setContext(canvas.getContext("2d"));
    }
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={(e) => {
        handleMouseMovement(e);
        draw(e);
      }}
      onMouseDown={handleMouseMovement}
      onMouseEnter={handleMouseMovement}
    ></canvas>
  );
};
