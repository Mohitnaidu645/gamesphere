from pymongo import MongoClient
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler


client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["tournamentDB"]
collection = db["teamrankings"]


data = list(collection.find({}, {"_id": 0}))

df = pd.DataFrame(data)

if df.empty:
    raise Exception("No team ranking data found")


df["valueScore"] = (
    df["totalPoints"] * 0.5 +
    df["totalKills"] * 0.3 +
    df["wins"] * 20
)

features = ["matchesPlayed", "totalKills", "totalPoints", "wins"]
X = df[features]
y = df["valueScore"]


scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

model = RandomForestRegressor(
    n_estimators=200,
    random_state=42
)
model.fit(X_scaled, y)


df["predictedValue"] = model.predict(X_scaled)


top_teams = df.sort_values(
    by="predictedValue",
    ascending=False
)[["tournament", "teamName", "predictedValue"]]

print("\n🏆 MOST VALUABLE TEAMS OF THE YEAR 🏆\n")
print(top_teams.head(5))
