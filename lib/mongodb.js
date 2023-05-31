import { errorMonitor } from "events";

async function db() {
  await alert("Connecting...");
  await alert(JSON.stringify());
  const uri = process.env.MONGODB_URI;
}

export default db;
