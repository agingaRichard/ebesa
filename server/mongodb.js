import { errorMonitor } from "events";
import mongoose from "mongoose";

async function db() {
  await alert("Connecting...");
  await alert(JSON.stringify(mongoose));
  const uri = process.env.MONGODB_URI;

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await mongoose.connection;
  //connection.isConnected = db.connections[0].readyState;

  //Get the default connection
  db.once("open", (_) => {
    alert("Database connected!");
  }).on("error", (err) => {
    alert("Error! " + err);
  });

  const uzas = await db.collection("users").find({ firstName: "Le" });
  await alert(uzas);
}

export default db;
