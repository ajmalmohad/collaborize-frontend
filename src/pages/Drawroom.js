import React, { useEffect, useRef, useState } from 'react';
import './css/Drawroom.css';
import { useAppContext } from './../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdExit } from 'react-icons/io';
import { AiOutlineBgColors } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { TwitterPicker } from 'react-color';

function Drawroom() {
  const canvasRef = useRef(null);
  const parentRef = useRef(null);
  const roomRef = useRef(null);
  const scaleRef = useRef(null);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { socket, user } = useAppContext();
  const canvasWidth = 1920;
  let [color, _setColor] = useState("#000000");
  let [coloropen, setColorOpen] = useState(false);
  let [toolopen, setToolOpen] = useState(true);
  let [scaleopen, setScaleOpen] = useState(false);
  const myColor = useRef(color);
  const setColor = data => {
    myColor.current = data;
    _setColor(data);
  };

  useEffect(() => {
    let name = user.name;
    let email = user.email;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    let drawing = false;
    let scale = 1;
    let scaled = false;
    let current=  {};

    const drawLine = (x0, y0, x1, y1, color, emit) => {
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
        myColor.current,
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
          myColor.current,
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
        scale = canvas.getBoundingClientRect().width/canvasWidth;
      }
    };

    window.addEventListener('resize', onResize, false);
    onResize();

    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0*scale * w, data.y0*scale * h, data.x1*scale * w, data.y1*scale * h, data.color);
    };

    const onScale = () => {
      if(scaled){;
        roomRef.current.style.display = "flex";
        parentRef.current.style.width = "100%";
        scale = canvas.getBoundingClientRect().width/canvasWidth;
        scaled = !scaled;
      }else{
        roomRef.current.style.display = "block";
        parentRef.current.style.width = `${100*2}%`;
        scale = canvas.getBoundingClientRect().width/canvasWidth;
        scaled = !scaled;
      }
    }

    if (canvas && scaleRef.current && roomId !== '' && user.name !== '') {
      socket.emit('join_room', { name, email, roomId });
      
      canvas.addEventListener('mousedown', onMouseDown, false);
      canvas.addEventListener('mouseup', onMouseUp, false);
      canvas.addEventListener('mouseout', onMouseUp, false);
      canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

      canvas.addEventListener('touchstart', onMouseDown, false);
      canvas.addEventListener('touchend', onMouseUp, false);
      canvas.addEventListener('touchcancel', onMouseUp, false);
      canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

      scaleRef.current.addEventListener('click', onScale, false);

      socket.on('drawing', onDrawingEvent);
    }

    return () => {
      const __createdtime__ = Date.now();
      socket.off('receive_message');
      socket.off('Drawroom_users');
      socket.emit('leave_room', { name, email, roomId, __createdtime__ });
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, user, roomId]);

  const leaveRoom = () => {
    const name = user.name;
    const email = user.email;
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { name, email, roomId, __createdtime__ });
    navigate('/draw', { replace: true });
  };

  return (
      <div className="Drawroom" ref={roomRef}>
        <div className='tool-hamburger' onClick={()=>{setToolOpen(prev => !prev)}}>
          <GiHamburgerMenu />
        </div>
        <div className='tooler' style={{ right: toolopen ? "30px" : "-100px" }}>
            <div className='tool scale' ref={scaleRef} onClick={()=>{setScaleOpen(prev => !prev)}}>{scaleopen ? <FiMinimize2 /> : <FiMaximize2 />}</div>
            <div className='tool leave' onClick={leaveRoom}><IoMdExit /></div>
            <div className='tool'>
              <AiOutlineBgColors onClick={()=>{setColorOpen(prev => !prev)}} />
              { coloropen ? <TwitterPicker className='popup' color={ color } onChangeComplete={ (color)=>{setColor(color.hex); setColorOpen(prev => !prev)} } /> : ""}
            </div>
        </div>
        <div className='canvascontainer' ref={parentRef}>
          <canvas ref={canvasRef} height={1080} width={1920} className="whiteboard" />
        </div>
      </div>
  );
}

export default Drawroom;
