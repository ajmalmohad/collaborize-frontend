import React, { useEffect, useRef } from 'react';
import './css/Drawroom.css';
import { useAppContext } from './../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

function Drawroom() {
  const canvasRef = useRef(null);
  const parentRef = useRef(null);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { socket, user } = useAppContext();
  const canvasWidth = 1920;
  const canvasHeight = 1080;

  useEffect(() => {
    let name = user.name;
    let email = user.email;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let drawing = false;
    let scale = 1;
    const current = {
      color: 'black',
    };

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      console.log(x0, y0, x1, y1);
      context.beginPath();
      context.moveTo(x0/scale, y0/scale);
      context.lineTo(x1/scale, y1/scale);
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.stroke();
      context.closePath();

      if (!emit) {
        return;
      }
      const w = canvas.width;
      const h = canvas.height;

      socket.emit('drawing', {
        x0: x0/scale / w,
        y0: y0/scale / h,
        x1: x1/scale / w,
        y1: y1/scale / h,
        color,
      });
    };

    const onMouseDown = (e) => {
      drawing = true;
      var bounds = e.currentTarget.getBoundingClientRect();
      current.x = e.clientX - bounds.left || e.touches[0].clientX - bounds.left;
      current.y = e.clientY - bounds.top || e.touches[0].clientY - bounds.top;
    };

    const onMouseMove = (e) => {
      if (!drawing) {
        return;
      }
      var bounds = e.currentTarget.getBoundingClientRect();
      drawLine(
        current.x,
        current.y,
        e.clientX - bounds.left || e.touches[0].clientX - bounds.left,
        e.clientY - bounds.top || e.touches[0].clientY - bounds.top,
        current.color,
        true
      );
      current.x = e.clientX - bounds.left || e.touches[0].clientX - bounds.left;
      current.y = e.clientY - bounds.top || e.touches[0].clientY - bounds.top;
    };

    const onMouseUp = (e) => {
      if (!drawing) {
        return;
      }
      drawing = false;
      var bounds = e.currentTarget.getBoundingClientRect();
      if (e.clientX || e.touches.length > 0)
        drawLine(
          current.x,
          current.y,
          e.clientX - bounds.left || e.touches[0].clientX - bounds.left,
          e.clientY - bounds.top || e.touches[0].clientY - bounds.top,
          current.color,
          true
        );
    };

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    const onResize = () => {
      if (canvas) {
        const screenWidth = parentRef.current.clientWidth - 40;
        const screenHeight = parentRef.current.clientHeight - 40;
        scale = screenWidth/canvasWidth;
        if(scale*canvasHeight > screenHeight) scale = screenHeight/canvasHeight;
        scale = Math.min(scale, 1);
        canvas.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('resize', onResize, false);
    onResize();

    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0*scale * w, data.y0*scale * h, data.x1*scale * w, data.y1*scale * h, data.color);
    };

    if (canvas && roomId !== '' && user.name !== '') {
      socket.emit('join_room', { name, email, roomId });

      canvas.height = canvasHeight;
      canvas.width = canvasWidth;

      canvas.addEventListener('mousedown', onMouseDown, false);
      canvas.addEventListener('mouseup', onMouseUp, false);
      canvas.addEventListener('mouseout', onMouseUp, false);
      canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

      canvas.addEventListener('touchstart', onMouseDown, false);
      canvas.addEventListener('touchend', onMouseUp, false);
      canvas.addEventListener('touchcancel', onMouseUp, false);
      canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

      socket.on('drawing', onDrawingEvent);
    }

    return () => {
      const __createdtime__ = Date.now();
      socket.off('receive_message');
      socket.off('Drawroom_users');
      socket.emit('leave_room', { name, email, roomId, __createdtime__ });
    };
  }, [socket, user, roomId]);

  const leaveRoom = () => {
    const name = user.name;
    const email = user.email;
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { name, email, roomId, __createdtime__ });
    navigate('/draw', { replace: true });
  };

  return (
    <div className="Drawroom" ref={parentRef}>
      <button onClick={leaveRoom}>Leave</button>
      <canvas ref={canvasRef} className="whiteboard" />
    </div>
  );
}

export default Drawroom;
