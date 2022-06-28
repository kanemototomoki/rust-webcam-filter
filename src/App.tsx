import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | null>(
    null
  );
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

  const w = 480;
  const h = 270;

  // カメラデバイス取得
  useEffect(() => {
    const initDevice = async () => {
      const device = await navigator.mediaDevices.enumerateDevices();
      const cameraDevice = device.filter((v) => v.kind === 'videoinput');
      setDeviceList(() => cameraDevice);
      setSelectedDevice(() => cameraDevice[0]);
    };

    initDevice();
  }, []);

  // stream取得
  useEffect(() => {
    const initStream = async () => {
      if (selectedDevice) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            deviceId: selectedDevice.deviceId,
            width: w,
            height: h,
          },
        });

        setStream(() => stream);
      }
    };

    initStream();
  }, [selectedDevice?.deviceId]);

  // videoにstream流し込み
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef.current, stream?.id]);

  // videoのstreamをcanvasに流し込み
  useEffect(() => {
    if (canvasRef.current && videoRef.current) {
      canvasRef.current.width = w;
      canvasRef.current.height = h;
      const context = canvasRef.current.getContext('2d');

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      const draw = () => {
        if (videoRef.current) {
          context?.drawImage(videoRef.current, 0, 0, w, h);
          const id = requestAnimationFrame(draw);
          setAnimationFrameId(id);
        }
      };

      draw();
    }
  }, [stream?.id]);

  return (
    <div
      className='App'
      style={{
        display: 'grid',
        justifyContent: 'center',
        justifyItems: 'center',
        gap: '10px',
      }}
    >
      <div>
        <label>カメラ: </label>
        <select
          onChange={(e) => {
            const device = deviceList.find((v) => v.label === e.target.value);
            if (device) {
              setSelectedDevice(() => device);
            } else {
              setSelectedDevice(null);
            }
          }}
          defaultValue={selectedDevice?.label}
        >
          {deviceList.map((device) => {
            return <option key={device.label}>{device.label}</option>;
          })}
        </select>
      </div>
      <div>
        <p style={{ margin: 0 }}>in</p>
        <video autoPlay playsInline ref={videoRef} />
        <p style={{ margin: 0 }}>out</p>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export default App;
