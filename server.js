import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose
  .connect("mongodb://127.0.0.1:27017/tournamentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));


const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const teamSchema = new mongoose.Schema({
  tournament: { type: String, required: true },
  teamName: { type: String, required: true, unique: true }, 
  players: [playerSchema],
});

const Team = mongoose.model("Team", teamSchema);


app.post("/participate", async (req, res) => {
  console.log("📩 Incoming data:", req.body);
  try {
    const { tournament, teamName, players } = req.body;

    
    const existingTeam = await Team.findOne({ teamName });
    if (existingTeam) {
      return res.status(400).json({ error: "Team name already taken!" });
    }

    
    const playerNames = players.map((p) => p.name.toLowerCase());
    const existingPlayer = await Team.findOne({
      "players.name": { $in: playerNames },
    });

    if (existingPlayer) {
      return res.status(400).json({ error: "Player name already taken!" });
    }

    
    const newTeam = new Team({ tournament, teamName, players });
    await newTeam.save();

    res.status(201).json({ message: "Team registered successfully!" });
  } catch (error) {
    console.error(" Error saving team:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    console.error(" Error fetching teams:", error);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
