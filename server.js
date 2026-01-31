import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

/* =====================
   MIDDLEWARE
===================== */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =====================
   DATABASE
===================== */
mongoose
  .connect("mongodb://127.0.0.1:27017/tournamentDB")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* =====================
   SCHEMAS
===================== */

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  gameId: { type: String, required: true },
});

const teamSchema = new mongoose.Schema({
  tournament: { type: String, required: true },
  teamName: { type: String, required: true, unique: true },
  players: [playerSchema],
});

const Team = mongoose.model("Team", teamSchema);

const hostSchema = new mongoose.Schema({
  tournamentName: String,
  game: String,
  date: String,
  maxTeams: Number,
});

const HostTournament = mongoose.model("HostTournament", hostSchema);

const matchSchema = new mongoose.Schema({
  tournament: String,
  matchNo: Number,
  teamName: String,
  placement: Number,
  kills: Number,
  points: Number,
});

const Match = mongoose.model("Match", matchSchema);

const teamRankingSchema = new mongoose.Schema({
  tournament: String,
  teamName: String,
  matchesPlayed: { type: Number, default: 0 },
  totalKills: { type: Number, default: 0 },
  totalPoints: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
});

const TeamRanking = mongoose.model("TeamRanking", teamRankingSchema);

const playerRankingSchema = new mongoose.Schema({
  playerName: String,
  teamName: String,
  kills: { type: Number, default: 0 },
  matches: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  tier: String,
});

const PlayerRanking = mongoose.model("PlayerRanking", playerRankingSchema);

/* =====================
   HELPERS
===================== */
function getTier(score) {
  if (score >= 300) return "Pro";
  if (score >= 200) return "Advanced";
  if (score >= 100) return "Intermediate";
  return "Beginner";
}

/* =====================
   ROUTES
===================== */

// PARTICIPATE
app.post("/participate", async (req, res) => {
  try {
    const { tournament, teamName, players } = req.body;

    if (!players[0]?.email) {
      return res.status(400).json({ error: "Leader email required" });
    }

    if (players.some(p => !p.gameId)) {
      return res.status(400).json({ error: "All players need game ID" });
    }

    const exists = await Team.findOne({ teamName });
    if (exists) {
      return res.status(400).json({ error: "Team already exists" });
    }

    await new Team({ tournament, teamName, players }).save();
    res.json({ message: "✅ Team registered" });
  } catch {
    res.status(500).json({ error: "Registration failed" });
  }
});

// HOST TOURNAMENT
app.post("/host", async (req, res) => {
  await new HostTournament(req.body).save();
  res.json({ message: "✅ Tournament hosted" });
});

// ADD MATCH RESULT
app.post("/match-result", async (req, res) => {
  try {
    let { tournament, matchNo, teamName, placement, kills, points } = req.body;

    // 🔒 Convert to numbers
    kills = Number(kills);
    points = Number(points);
    placement = Number(placement);

    const duplicate = await Match.findOne({ tournament, matchNo, teamName });
    if (duplicate) {
      return res.status(400).json({ error: "Match already added" });
    }

    await new Match({ tournament, matchNo, teamName, placement, kills, points }).save();

    // TEAM RANKING
    let teamRank = await TeamRanking.findOne({ tournament, teamName });
    if (!teamRank) {
      teamRank = new TeamRanking({ tournament, teamName });
    }

    teamRank.matchesPlayed += 1;
    teamRank.totalKills += kills;
    teamRank.totalPoints += points;
    if (placement === 1) teamRank.wins += 1;

    await teamRank.save();

    // PLAYER RANKINGS
    const team = await Team.findOne({ teamName });
    if (team) {
      const perPlayerKills = Math.floor(kills / team.players.length);

      for (const p of team.players) {
        let pr = await PlayerRanking.findOne({
          playerName: p.name,
          teamName,
        });

        if (!pr) {
          pr = new PlayerRanking({ playerName: p.name, teamName });
        }

        pr.kills += perPlayerKills;
        pr.matches += 1;
        pr.score = pr.kills * 10;
        pr.tier = getTier(pr.score);

        await pr.save();
      }
    }

    res.json({ message: "✅ Match & rankings updated" });
  } catch (err) {
    res.status(500).json({ error: "Match update failed" });
  }
});

// GET TEAM RANKINGS
app.get("/rankings/teams", async (req, res) => {
  const data = await TeamRanking.find().sort({ totalPoints: -1 });
  res.json(data);
});

// GET PLAYER RANKINGS
app.get("/rankings/players", async (req, res) => {
  const data = await PlayerRanking.find().sort({ score: -1 });
  res.json(data);
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
