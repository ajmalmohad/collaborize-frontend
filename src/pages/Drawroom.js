import React, { useEffect, useRef } from 'react'
import './css/Drawroom.css'
import { useAppContext } from './../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

function Drawroom() {

  const canvasRef = useRef(null);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { socket,  user } = useAppContext();

    useEffect(() => {
        let name = user.name
        let email = user.email

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (canvas && roomId !== '' && user.name !== '') {
            socket.emit('join_room', { name, email, roomId });
            let drawing = false;

            const current = {
                color: 'black',
            };

            const drawLine = (x0, y0, x1, y1, color, emit) => {
                context.beginPath();
                context.moveTo(x0, y0);
                context.lineTo(x1, y1);
                context.strokeStyle = color;
                context.lineWidth = 2;
                context.stroke();
                context.closePath();

                if (!emit) { return; }
                const w = canvas.width;
                const h = canvas.height;

                socket.emit('drawing', {
                    x0: x0 / w,
                    y0: y0 / h,
                    x1: x1 / w,
                    y1: y1 / h,
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
                if (!drawing) { return; }
                var bounds = e.currentTarget.getBoundingClientRect();
                drawLine(current.x, current.y, e.clientX - bounds.left || e.touches[0].clientX - bounds.left, e.clientY - bounds.top || e.touches[0].clientY - bounds.top, current.color, true);
                current.x = e.clientX - bounds.left || e.touches[0].clientX - bounds.left;
                current.y = e.clientY - bounds.top || e.touches[0].clientY - bounds.top;
            };

            const onMouseUp = (e) => {
                if (!drawing) { return; }
                drawing = false;
                var bounds = e.currentTarget.getBoundingClientRect();
                if(e.clientX || e.touches.length > 0) drawLine(current.x, current.y, e.clientX - bounds.left || e.touches[0].clientX - bounds.left, e.clientY - bounds.top || e.touches[0].clientY - bounds.top, current.color, true);
            };

            const throttle = (callback, delay) => {
                let previousCall = new Date().getTime();
                return function() {
                  const time = new Date().getTime();
          
                  if ((time - previousCall) >= delay) {
                    previousCall = time;
                    callback.apply(null, arguments);
                  }
                };
              };
          
            canvas.addEventListener('mousedown', onMouseDown, false);
            canvas.addEventListener('mouseup', onMouseUp, false);
            canvas.addEventListener('mouseout', onMouseUp, false);
            canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

            canvas.addEventListener('touchstart', onMouseDown, false);
            canvas.addEventListener('touchend', onMouseUp, false);
            canvas.addEventListener('touchcancel', onMouseUp, false);
            canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

            const onResize = () => {
                if(canvasRef.current){
                  canvas.width = canvasRef.current.clientWidth;
                  canvas.height = canvasRef.current.clientHeight;
                }
            };

            window.addEventListener('resize', onResize, false);
            onResize();

            const onDrawingEvent = (data) => {
                const w = canvas.width;
                const h = canvas.height;
                drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
            }

            socket.on('drawing', onDrawingEvent);

        }

    return () => {
      const __createdtime__ = Date.now();
      socket.off('receive_message');
      socket.off('Drawroom_users');
      socket.emit('leave_room', { name, email, roomId, __createdtime__ });
    }
  }, [socket, user, roomId]);

  const leaveRoom = () => {
    const name = user.name;
    const email = user.email
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { name, email, roomId, __createdtime__ });
    navigate('/draw', { replace: true });
  };

  return (
    <div className='Drawroom'>
        <button onClick={leaveRoom}>Leave</button>
        <canvas ref={canvasRef} className="whiteboard" />
    </div>
  )
}

export default Drawroom