import { useState } from "react";
import {
  FastForward,
  LayoutGrid,
  Leaf,
  Pause,
  Radio,
  Repeat,
  Rewind,
  Snowflake,
  SunDim,
  Wind,
} from "lucide-react";
import { LiveAudioVisualizer } from "react-audio-visualize";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import CircularSlider from "react-circular-slider-svg";
import Layout from "../components/Layout";

export default function Rooms() {
  const rooms = [
    {
      id: 0,
      name: "Living Room",
      temperature: 28,
      humidity: 48.2,
      currentConsumption: 1.5,
    },
    {
      id: 1,
      name: "Bedroom",
      temperature: 23,
      humidity: 45.8,
      currentConsumption: 1.2,
    },
    {
      id: 2,
      name: "Kitchen",
      temperature: 32,
      humidity: 50.1,
      currentConsumption: 2.3,
    },
    {
      id: 3,
      name: "Bathroom",
      temperature: 16,
      humidity: 40.3,
      currentConsumption: 1.0,
    },
  ];
  const mockDevices = [
    {
      id: 0,
      name: "Gaabor",
      type: "Humidifier",
      isConnected: true,
      roomId: 0,
    },
    {
      id: 1,
      name: "Amazon Echo",
      type: "Speaker",
      isConnected: false,
      roomId: 0,
    },
    {
      id: 2,
      name: "Bardi",
      type: "Smart Lamp",
      isConnected: true,
      roomId: 1,
    },
    {
      id: 3,
      name: "Xiaomi",
      type: "Camera",
      isConnected: false,
      roomId: 2,
    },
  ];
  const recorder = useAudioRecorder();
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [devices, setDevices] = useState(mockDevices);
  const [thermostat, setThermostat] = useState(true);
  const [temperature, setTemperature] = useState(23);
  // 10:52 PM format
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  function StatsCard({
    title,
    value,
  }: {
    title: string;
    value: number | string;
  }) {
    return (
      <div className="w-1/3 border-[#e7e7e7] border rounded-3xl py-5 px-4 flex flex-col gap-1">
        <h2 className="text-[#858585]">{title}</h2>
        <p className="text-4xl font-semibold">{value}</p>
      </div>
    );
  }

  // function DeviceCard({
  //   device,
  //   onToggle,
  // }: {
  //   device: (typeof mockDevices)[0];
  //   onToggle: () => void;
  // }) {
  //   return (
  //     <div
  //       className="w-1/4 border-[#e7e7e7] border rounded-3xl py-5 px-4 flex flex-col gap-1 transition duration-300 ease-in-out"
  //       style={{ backgroundColor: device.isConnected ? "#e8f3ff" : "white" }}
  //     >
  //       <div className="flex items-center justify-between pb-12">
  //         <div className="bg-white border border-[#585858] w-8 h-8 rounded-full flex items-center justify-center">
  //           <LayoutGrid size={16} color="#585858" />
  //         </div>

  //         <div
  //           className={`w-10 h-6 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300 ease-in-out ${
  //             device.isConnected ? "bg-primary" : "bg-[#585858]"
  //           }`}
  //           onClick={onToggle}
  //         >
  //           <div
  //             className="w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ease-in-out"
  //             style={{
  //               transform: device.isConnected
  //                 ? "translateX(60%)"
  //                 : "translateX(0)",
  //             }}
  //           ></div>
  //         </div>
  //       </div>

  //       <p className="text-[#858585] text-sm">{device.name}</p>
  //       <h2 className="text-xl font-semibold">{device.type}</h2>
  //     </div>
  //   );
  // }

  return (
    <Layout title="Rooms" isLandingPage>
      <div className="w-full flex justify-items-center pt-8 min-h-[85vh]">
        <div className="w-3/4 mx-auto pr-8">
          <div className="flex gap-12 align-center mb-6">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`${
                  room.id === selectedRoom.id
                    ? "text-3xl font-semibold"
                    : "text-lg text-gray-500 hover:text-gray-900"
                } flex items-center gap-2 transition-all duration-100 ease-in-out`}
              >
                {room.id === selectedRoom.id && (
                  <div className="w-2 h-2 bg-[#c4dbf3] transform rotate-45 mx-auto"></div>
                )}
                {room.name}
              </button>
            ))}
          </div>

          <div className="flex justify-center items-stretch gap-4 mb-4">
            <div className="w-1/2">
              <img
                src="./assets/live-camera-placeholder.jpg"
                alt="Live Camera footage"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
            <div className="w-1/2 border border-[#e7e7e7] rounded-3xl p-4">
              <h2 className="text-2xl font-semibold mb-2">Voice Assistant</h2>
              <p className="text-[#858585] text-sm mb-4">
                Voice control your devices with Nia, your personal assistant.
              </p>

              <AudioRecorder recorderControls={recorder} />

              <div className="mt-8 flex justify-center items-stretch gap-4 h-[120px] w-full">
                {recorder.mediaRecorder && (
                  <LiveAudioVisualizer
                    mediaRecorder={recorder.mediaRecorder}
                    width={200}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mb-4">
            <StatsCard
              title="Current Consumption"
              value={`${selectedRoom.currentConsumption}kWh`}
            />
            <StatsCard title="Humidity" value={`${selectedRoom.humidity}%`} />
            <StatsCard
              title="Temperature"
              value={`${selectedRoom.temperature}°C`}
            />
          </div>

          <div className="flex justify-center items-center gap-4">
            <div
              className="w-1/4 border-[#e7e7e7] border rounded-xl py-5 px-4 flex flex-col gap-1 transition duration-300 ease-in-out"
              style={{
                backgroundColor: devices[0].isConnected ? "#e8f3ff" : "white",
              }}
            >
              <div className="flex items-center justify-between pb-12">
                <div className="bg-white border border-[#585858] w-8 h-8 rounded-full flex items-center justify-center">
                  <LayoutGrid size={16} color="#585858" />
                </div>

                <div
                  className={`w-10 h-6 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300 ease-in-out ${
                    devices[0].isConnected ? "bg-primary" : "bg-[#585858]"
                  }`}
                  onClick={() => {
                    const updatedDevices = devices.map((d) =>
                      d.id === devices[0].id
                        ? { ...d, isConnected: !d.isConnected }
                        : d
                    );
                    setDevices(updatedDevices);
                  }}
                >
                  <div
                    className="w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ease-in-out"
                    style={{
                      transform: devices[0].isConnected
                        ? "translateX(60%)"
                        : "translateX(0)",
                    }}
                  ></div>
                </div>
              </div>

              <p className="text-[#858585] text-sm">{devices[0].name}</p>
              <h2 className="text-xl font-semibold">{devices[0].type}</h2>
            </div>
            <div
              className="w-1/4 border-[#e7e7e7] border rounded-xl py-5 px-4 flex flex-col gap-1 transition duration-300 ease-in-out"
              style={{
                backgroundColor: devices[1].isConnected ? "#e8f3ff" : "white",
              }}
            >
              <div className="flex items-center justify-between pb-12">
                <div className="bg-white border border-[#585858] w-8 h-8 rounded-full flex items-center justify-center">
                  <LayoutGrid size={16} color="#585858" />
                </div>

                <div
                  className={`w-10 h-6 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300 ease-in-out ${
                    devices[1].isConnected ? "bg-primary" : "bg-[#585858]"
                  }`}
                  onClick={() => {
                    const updatedDevices = devices.map((d) =>
                      d.id === devices[1].id
                        ? { ...d, isConnected: !d.isConnected }
                        : d
                    );
                    setDevices(updatedDevices);
                  }}
                >
                  <div
                    className="w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ease-in-out"
                    style={{
                      transform: devices[1].isConnected
                        ? "translateX(60%)"
                        : "translateX(0)",
                    }}
                  ></div>
                </div>
              </div>

              <p className="text-[#858585] text-sm">{devices[1].name}</p>
              <h2 className="text-xl font-semibold">{devices[1].type}</h2>
            </div>
            <div
              className="w-1/4 border-[#e7e7e7] border rounded-xl py-5 px-4 flex flex-col gap-1 transition duration-300 ease-in-out"
              style={{
                backgroundColor: devices[2].isConnected ? "#e8f3ff" : "white",
              }}
            >
              <div className="flex items-center justify-between pb-12">
                <div className="bg-white border border-[#585858] w-8 h-8 rounded-full flex items-center justify-center">
                  <LayoutGrid size={16} color="#585858" />
                </div>

                <div
                  className={`w-10 h-6 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300 ease-in-out ${
                    devices[2].isConnected ? "bg-primary" : "bg-[#585858]"
                  }`}
                  onClick={() => {
                    const updatedDevices = devices.map((d) =>
                      d.id === devices[2].id
                        ? { ...d, isConnected: !d.isConnected }
                        : d
                    );
                    setDevices(updatedDevices);
                  }}
                >
                  <div
                    className="w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ease-in-out"
                    style={{
                      transform: devices[2].isConnected
                        ? "translateX(60%)"
                        : "translateX(0)",
                    }}
                  ></div>
                </div>
              </div>

              <p className="text-[#858585] text-sm">{devices[2].name}</p>
              <h2 className="text-xl font-semibold">{devices[2].type}</h2>
            </div>
            <div
              className="w-1/4 border-[#e7e7e7] border rounded-xl py-5 px-4 flex flex-col gap-1 transition duration-300 ease-in-out"
              style={{
                backgroundColor: devices[3].isConnected ? "#e8f3ff" : "white",
              }}
            >
              <div className="flex items-center justify-between pb-12">
                <div className="bg-white border border-[#585858] w-8 h-8 rounded-full flex items-center justify-center">
                  <LayoutGrid size={16} color="#585858" />
                </div>

                <div
                  className={`w-10 h-6 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300 ease-in-out ${
                    devices[3].isConnected ? "bg-primary" : "bg-[#585858]"
                  }`}
                  onClick={() => {
                    const updatedDevices = devices.map((d) =>
                      d.id === devices[3].id
                        ? { ...d, isConnected: !d.isConnected }
                        : d
                    );
                    setDevices(updatedDevices);
                  }}
                >
                  <div
                    className="w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ease-in-out"
                    style={{
                      transform: devices[3].isConnected
                        ? "translateX(60%)"
                        : "translateX(0)",
                    }}
                  ></div>
                </div>
              </div>

              <p className="text-[#858585] text-sm">{devices[3].name}</p>
              <h2 className="text-xl font-semibold">{devices[3].type}</h2>
            </div>

            {/* {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onToggle={() => {
                  const updatedDevices = devices.map((d) =>
                    d.id === device.id
                      ? { ...d, isConnected: !d.isConnected }
                      : d
                  );
                  setDevices(updatedDevices);
                }}
              />
            ))} */}
          </div>
        </div>

        <div className="w-1/4 mx-auto p-8 bg-thermostat-gradient h-full rounded-3xl flex flex-col">
          <h1 className="text-4xl text-center font-light text-white mb-4">
            {currentTime.split(" ")[0]}{" "}
            <span className="text-gray-400">{currentTime.split(" ")[1]}</span>
          </h1>
          <hr className="border-[#e7e7e7] border-t-2 border-opacity-50 mb-4 w-16 mx-auto rounded-full" />

          <div className="flex justify-between items-center my-4">
            <p className="text-lg text-white">Thermostat</p>
            <div
              className={`w-12 h-7 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300 ease-in-out ${
                thermostat ? "bg-[#6a76b9]" : "bg-[#b9b9b9]"
              }`}
              onClick={() => setThermostat(!thermostat)}
            >
              <div
                className="w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ease-in-out"
                style={{
                  transform: thermostat ? "translateX(95%)" : "translateX(0)",
                }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <CircularSlider
              minValue={-20}
              maxValue={40}
              size={350}
              trackWidth={12}
              startAngle={40}
              endAngle={320}
              arcColor="#6a76b9"
              coerceToInt
              handle1={{
                value: temperature,
                onChange: (value) => setTemperature(value),
              }}
            />

            <div className="absolute flex flex-col items-center">
              <h1 className="text-8xl text-white font-medium mb-2">
                {temperature}°
              </h1>
              <p className="text-white text-lg font-light">(° Celsius)</p>

              <div className="flex gap-4 absolute -bottom-20">
                <button
                  className="w-12 h-12 text-2xl rounded-full bg-[#20233d] border-2 border-[#a0a0a0] text-white flex items-center justify-center hover:bg-[#6a76b9] hover:border-[#6a76b9] transition-all duration-300 ease-in-out"
                  onClick={() =>
                    setTemperature((prev) => Math.max(prev - 1, -20))
                  }
                >
                  -
                </button>
                <button
                  className="w-12 h-12 text-2xl rounded-full bg-[#20233d] border-2 border-[#a0a0a0] text-white flex items-center justify-center hover:bg-[#6a76b9] hover:border-[#6a76b9] transition-all duration-300 ease-in-out"
                  onClick={() =>
                    setTemperature((prev) => Math.min(prev + 1, 40))
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <div className="w-1/4 flex flex-col justify-center items-center gap-2 bg-slate-800 rounded-xl p-4 text-[#e9e9e9] text-center cursor-pointer hover:bg-[#b8beeb] hover:text-black transition-all duration-300 ease-in-out">
              <SunDim size={36} />
              <p className="text-sm">Hot</p>
            </div>
            <div className="w-1/4 flex flex-col justify-center items-center gap-2 bg-slate-800 rounded-xl p-4 text-[#e9e9e9] text-center cursor-pointer hover:bg-[#b8beeb] hover:text-black transition-all duration-300 ease-in-out">
              <Leaf size={36} />
              <p className="text-sm">Eco</p>
            </div>
            <div className="w-1/4 flex flex-col justify-center items-center gap-2 bg-slate-800 rounded-xl p-4 text-[#e9e9e9] text-center cursor-pointer hover:bg-[#b8beeb] hover:text-black transition-all duration-300 ease-in-out">
              <Wind size={36} />
              <p className="text-sm">Fan</p>
            </div>
            <div className="w-1/4 flex flex-col justify-center items-center gap-2 bg-[#b8beeb] rounded-xl p-4 text-black text-center cursor-pointer hover:bg-[#8793da] hover:text-black transition-all duration-300 ease-in-out">
              <Snowflake size={36} />
              <p className="text-sm">Cold</p>
            </div>
          </div>

          <div className="bg-white w-full mt-8 p-4 rounded-xl text-center">
            <p className="text-[#858585] mb-1">Mangat Toor</p>
            <h2 className="text-primary text-2xl font-medium">God's Plan</h2>

            <div className="relative w-full mt-8 h-2 bg-[#b9b9b9] rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-primary rounded-full"
                style={{ width: "25%" }}
              ></div>
            </div>

            <div className="flex justify-between mt-1">
              <p className="text-sm text-black">1:34</p>
              <p className="text-sm text-black">3:18</p>
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="bg-[#f0f0f0] p-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#dddddd]">
                <Repeat size={20} />
              </div>
              <div className="bg-[#f0f0f0] p-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#dddddd]">
                <Rewind size={20} />
              </div>
              <div className="bg-[#e8f3ff] p-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-primary hover:text-white">
                <Pause size={40} />
              </div>
              <div className="bg-[#f0f0f0] p-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#dddddd]">
                <FastForward size={20} />
              </div>
              <div className="bg-[#f0f0f0] p-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#dddddd]">
                <Radio size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
