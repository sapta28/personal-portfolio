import type { NextConfig } from "next";
import os from "node:os";

// Dapatkan semua IP local secara dinamis agar HMR/Fast Refresh tidak terblokir saat IP berubah
const localIPs: string[] = [];
const interfaces = os.networkInterfaces();
for (const devName in interfaces) {
  const iface = interfaces[devName];
  if (iface) {
    for (const alias of iface) {
      if (alias.family === "IPv4") {
        localIPs.push(alias.address);
      }
    }
  }
}

// Tambahkan port 3000-3005 untuk setiap host local
const devPorts = ["3000", "3001", "3002", "3003", "3004", "3005"];
const allowedDevOrigins = [
  "localhost",
  "127.0.0.1",
  ...localIPs
].reduce<string[]>((acc, host) => {
  acc.push(host);
  devPorts.forEach((port) => {
    acc.push(`${host}:${port}`);
  });
  return acc;
}, []);

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins,
};

export default nextConfig;
