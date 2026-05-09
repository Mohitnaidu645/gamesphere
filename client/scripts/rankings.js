const teamTable = document.getElementById("teamTable");
const playerTable = document.getElementById("playerTable");

/* =====================
   FETCH TEAM RANKINGS
===================== */
async function loadTeamRankings() {
  try {
    const res = await fetch("http://localhost:5000/rankings/teams");
    const teams = await res.json();

    teamTable.innerHTML = "";

    teams.forEach((team, index) => {
      teamTable.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${team.teamName}</td>
          <td>${team.tournament}</td>
          <td>${team.matchesPlayed}</td>
          <td>${team.totalKills}</td>
          <td><strong>${team.totalPoints}</strong></td>
        </tr>
      `;
    });
  } catch (err) {
    console.error("Error loading team rankings:", err);
  }
}

/* =====================
   FETCH PLAYER RANKINGS
===================== */
async function loadPlayerRankings() {
  try {
    const res = await fetch("http://localhost:5000/rankings/players");
    const players = await res.json();

    playerTable.innerHTML = "";

    players.forEach((player, index) => {
      playerTable.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${player.playerName}</td>
          <td>${player.teamName}</td>
          <td><span class="tier ${player.tier}">${player.tier}</span></td>
        </tr>
      `;
    });
  } catch (err) {
    console.error("Error loading player rankings:", err);
  }
}

/* =====================
   TAB SWITCH
===================== */
function showTab(tabId, btn) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  btn.classList.add("active");

  if (tabId === "teams") loadTeamRankings();
  if (tabId === "players") loadPlayerRankings();
}

/* =====================
   LOAD DEFAULT
===================== */
loadTeamRankings();
