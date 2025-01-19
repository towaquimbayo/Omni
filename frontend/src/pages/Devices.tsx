import { useState } from "react";
import Layout from "../components/Layout";
import {
  AudioLines,
  Lightbulb,
  LockKeyhole,
  Plus,
  Sparkles,
  Thermometer,
  Tv,
  Wind,
} from "lucide-react";

export default function Devices() {
  type DeviceType =
    | "lighting"
    | "audio"
    | "entertainment"
    | "security"
    | "thermostat"
    | "air_quality"
    | "cleaning";

  interface Device {
    id: number;
    name: string;
    room: string;
    isConnected: boolean;
    lastConnected: string;
    type: DeviceType;
  }

  const mockDevices: Device[] = [
    {
      id: 0,
      name: "Luminens LED Modern Standing Lamp",
      room: "Living Room",
      isConnected: true,
      lastConnected: "Just Now",
      type: "lighting",
    },
    {
      id: 1,
      name: "Nest Thermostat",
      room: "Living Room",
      isConnected: false,
      lastConnected: "5 minutes ago",
      type: "thermostat",
    },
    {
      id: 2,
      name: "Echo Dot (4th Gen)",
      room: "Kitchen",
      isConnected: true,
      lastConnected: "2 hours ago",
      type: "audio",
    },
    {
      id: 3,
      name: "Philips Hue Smart Light",
      room: "Bedroom",
      isConnected: false,
      lastConnected: "2 weeks ago",
      type: "lighting",
    },
    {
      id: 4,
      name: "Dyson Purifier Cool",
      room: "Master Bedroom",
      isConnected: true,
      lastConnected: "10 minutes ago",
      type: "air_quality",
    },
    {
      id: 5,
      name: "Samsung Smart TV",
      room: "Living Room",
      isConnected: true,
      lastConnected: "Just Now",
      type: "entertainment",
    },
    {
      id: 6,
      name: "Arlo Pro 4 Camera",
      room: "Front Door",
      isConnected: false,
      lastConnected: "2 days ago",
      type: "security",
    },
    {
      id: 7,
      name: "Ring Video Doorbell",
      room: "Front Door",
      isConnected: true,
      lastConnected: "10 minutes ago",
      type: "security",
    },
    {
      id: 8,
      name: "iRobot Roomba i7+",
      room: "Hallway",
      isConnected: false,
      lastConnected: "4 months ago",
      type: "cleaning",
    },
    {
      id: 9,
      name: "Sonos One Speaker",
      room: "Dining Room",
      isConnected: true,
      lastConnected: "1 hour ago",
      type: "audio",
    },
  ];
  const deviceIconsMap: { [key in DeviceType]: JSX.Element } = {
    lighting: <Lightbulb className="w-6 h-6" fill="#f2f2f2" stroke="#f2f2f2" />,
    audio: <AudioLines className="w-6 h-6" fill="#f2f2f2" stroke="#f2f2f2" />,
    entertainment: <Tv className="w-6 h-6" fill="#f2f2f2" stroke="#f2f2f2" />,
    security: (
      <LockKeyhole className="w-6 h-6" fill="#f2f2f2" stroke="#f2f2f2" />
    ),
    thermostat: (
      <Thermometer className="w-6 h-6" fill="#f2f2f2" stroke="#f2f2f2" />
    ),
    air_quality: <Wind className="w-6 h-6" fill="#f2f2f2" stroke="#f2f2f2" />,
    cleaning: <Sparkles className="w-6 h-6" fill="#f2f2f2" stroke="#f2f2f2" />,
  };
  const [devices, setDevices] = useState(mockDevices);

  function handleDeleteDevice(id: number) {
    setDevices(devices.filter((device) => device.id !== id));
  }

  return (
    <Layout title="Devices">
      {/* Header Section */}
      <div className="flex justify-between items-center py-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#c4dbf3] transform rotate-45 mx-auto"></div>
          <h1 className="text-xl font-semibold md:text-3xl">My Devices</h1>
        </div>

        <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          <Plus className="w-5 h-5 mr-2" />
          Add Device
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {devices
          .reduce(
            (
              rows: {
                id: number;
                name: string;
                room: string;
                isConnected: boolean;
                lastConnected: string;
                type: DeviceType;
              }[][],
              device: Device,
              index
            ) => {
              if (index % 4 === 0) rows.push([]);
              rows[rows.length - 1].push(device);
              return rows;
            },
            []
          )
          .map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-1 md:grid-cols-2 min-[1400px]:grid-cols-4 gap-4"
            >
              {row.map((device) => (
                <div
                  key={device.id}
                  className="w-full border-[#e7e7e7] border rounded-xl py-5 px-5 flex flex-col gap-1 transition duration-300 ease-in-out"
                >
                  <div className="flex justify-between items-center gap-2">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#243b5a] mb-2">
                      {deviceIconsMap[device?.type as DeviceType]}
                    </div>
                    <div
                      className={`w-10 h-6 rounded-full flex items-center p-1 cursor-pointer transition-all duration-300 ease-in-out ${
                        device.isConnected ? "bg-primary" : "bg-[#b6b6b6]"
                      }`}
                      onClick={() => {
                        const updatedDevices = devices.map((d) => {
                          if (d.id === device.id) {
                            return {
                              ...d,
                              isConnected: !d.isConnected,
                            };
                          }
                          return d;
                        });
                        setDevices(updatedDevices);
                      }}
                    >
                      <div
                        className="w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ease-in-out"
                        style={{
                          transform: device.isConnected
                            ? "translateX(100%)"
                            : "translateX(0)",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <h2 className="text-lg font-medium truncate -mr-6">
                      {device.name}
                    </h2>
                    <div className="flex items-center gap-2 w-[25%] justify-end">
                      <button
                        onClick={() => handleDeleteDevice(device.id)}
                        className="text-sm text-[#b9b9b9] transition duration-300 ease-in-out hover:text-[#e26161]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-500">Room: {device.room}</p>
                  <p className="text-gray-500">
                    Last Connected:{" "}
                    <span
                      className={`font-medium ${
                        device.lastConnected === "Just Now"
                          ? "text-[#5bd68a]"
                          : ""
                      }`}
                    >
                      {device.lastConnected}
                    </span>
                  </p>
                </div>
              ))}
              {Array.from({ length: 4 - row.length }).map((_, i) => (
                <div key={`placeholder-${rowIndex}-${i}`} className="w-1/4" />
              ))}
            </div>
          ))}
      </div>
    </Layout>
  );
}
