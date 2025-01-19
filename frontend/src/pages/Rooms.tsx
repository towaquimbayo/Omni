import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import Layout from "../components/Layout";
import { LiveAudioVisualizer } from "react-audio-visualize";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

export default function Rooms() {
  const rooms = [
    {
      id: 0,
      name: "Living Room",
      temperature: 68,
      humidity: 48.2,
      currentConsumption: 1.5,
    },
    {
      id: 1,
      name: "Bedroom",
      temperature: 72,
      humidity: 45.8,
      currentConsumption: 1.2,
    },
    {
      id: 2,
      name: "Kitchen",
      temperature: 70,
      humidity: 50.1,
      currentConsumption: 2.3,
    },
    {
      id: 3,
      name: "Bathroom",
      temperature: 75,
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
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [devices, setDevices] = useState(mockDevices);
  const recorder = useAudioRecorder();

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
      <div className="w-full flex justify-items-center pt-8">
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
                  <div className="w-2 h-2 bg-primary/30 transform rotate-45 mx-auto"></div>
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
              value={`${selectedRoom.temperature}°F`}
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
        <div className="w-1/4 mx-auto">
          {/* Placeholder */}
          <div className="wi-full bg-[#0f1a4e] h-[80vh] rounded-3xl"></div>
        </div>
      </div>
    </Layout>
  );
}
