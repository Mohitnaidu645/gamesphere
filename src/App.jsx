import React from "react";
import "./index.css";

export default function App() {
  return (
    <div className="app-root">
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          <div className="logo-section">
            <div className="logo" aria-hidden="true">🎮</div>
            <a href="#" className="brand-name">GameSphere</a>
          </div>
          <ul className="nav-links">
            <li><a href="#dashboard" aria-label="View your dashboard">Dashboard</a></li>
            <li><a href="#rankings" aria-label="View player rankings">Rankings</a></li>
            <li><a href="#leaderboard" aria-label="View leaderboards">Leaderboard</a></li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <div className="content-container">
          <div className="announcements-box-container">
            <h2>Important Announcements</h2>
            <div className="announcements-container">
              <ul className="scroll-content">
                <li><a href="#">New Tournament Rules Updated - Read Here</a></li>
                <li><a href="#">Season 2 Registration is Now Open!</a></li>
                <li><a href="#">Server Maintenance on May 10, 2025</a></li>
                <li><a href="#">Join Our Discord for Live Updates</a></li>
                <li><a href="#">New Tournament Rules Updated - Read Here</a></li>
                <li><a href="#">Season 2 Registration is Now Open!</a></li>
              </ul>
            </div>
          </div>

          <div className="center-content">
            <h1 style={{ color: "#8816fa" }}>Welcome to GameSphere</h1>
            <p>The ultimate platform for competitive gaming. Track your progress, climb the rankings, and compete with players at Institute Level.</p>
            <div className="cta-buttons">
              <a href="#dashboard" className="cta-button cta-primary">Host Tournament</a>
              <a href="/reg.html" className="cta-button cta-secondary">Participate</a>
            </div>
          </div>

          <div className="events-box-container">
            <h2>Upcoming Events</h2>
            <div className="events-container">
              <ul className="scroll-content">
                <li><a href="#">Valorant Regional Qualifiers - May 15, 2025</a></li>
                <li><a href="#">BGMI National Championship - June 20, 2025</a></li>
                <li><a href="#">CS2 Community Day - July 10, 2025</a></li>
                <li><a href="#">Apex Legends All-Stars - August 5, 2025</a></li>
                <li><a href="#">Valorant Regional Qualifiers - May 15, 2025</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <section className="games-section">
        <div className="games-content">
          <div className="games-header">
            <h2>Popular<br />Multiplayer<br />Games</h2>
            <p>Compete in the most exciting multiplayer games and climb the leaderboards</p>
          </div>

          <div className="games-grid-container">
            <div className="games-grid">

              <article className="game-card">
                <img src="/assets/valo.jpg" alt="Valorant gameplay" className="game-image" />
                <div className="game-info">
                  <h3 className="game-title">Valorant</h3>
                  <p className="game-description">Tactical 5v5 character-based shooter where precise gunplay meets unique agent abilities.</p>
                  <div className="game-stats">
                    <span className="players-online">no tourney</span>
                    <span className="game-genre">FPS • Tactical</span>
                  </div>
                </div>
              </article>

              <article className="game-card">
                <img src="/assets/PUBG.png" alt="PUBG" className="game-image" />
                <div className="game-info">
                  <h3 className="game-title">PUBG</h3>
                  <p className="game-description">The world's most popular pc Game with strategic team-based gameplay.</p>
                  <div className="game-stats">
                    <span className="players-online">no tourney</span>
                    <span className="game-genre">FPS • Strategy</span>
                  </div>
                </div>
              </article>

              <article className="game-card">
                <img src="/assets/cs2.png" alt="Counter-Strike 2 gameplay" className="game-image" />
                <div className="game-info">
                  <h3 className="game-title">Counter-Strike 2</h3>
                  <p className="game-description">The legendary tactical FPS reborn with enhanced graphics and refined competitive gameplay.</p>
                  <div className="game-stats">
                    <span className="players-online">no tourney</span>
                    <span className="game-genre">FPS • Competitive</span>
                  </div>
                </div>
              </article>

              <article className="game-card">
                <img src="/assets/CodM.png" alt="CodM" className="game-image" />
                <div className="game-info">
                  <h3 className="game-title">CODM</h3>
                  <p className="game-description">Dive into intense online matches including Team Deathmatch, Domination, Search & Destroy, and more.</p>
                  <div className="game-stats">
                    <span className="players-online">no tourney</span>
                    <span className="game-genre">FPS • BattleRoyale</span>
                  </div>
                </div>
              </article>

              <article className="game-card">
                <a href="/reg.html" style={{ textDecoration: "none", color: "inherit" }}>
                  <img src="/assets/BGMI.png" alt="BGMI" className="game-image" />
                  <div className="game-info">
                    <h3 className="game-title">BGMI</h3>
                    <p className="game-description">Team-based battlefield featuring a diverse cast of players and unique events.</p>
                    <div className="game-stats">
                      <span className="players-online">2 tourney🔴</span>
                      <span className="game-genre">FPS • BattleRoyale</span>
                    </div>
                  </div>
                </a>
              </article>

              <article className="game-card">
                <img src="/assets/apex.png" alt="Apex Legends gameplay" className="game-image" />
                <div className="game-info">
                  <h3 className="game-title">Apex Legends</h3>
                  <p className="game-description">Fast-paced battle royale with unique character abilities and squad-based tactical gameplay.</p>
                  <div className="game-stats">
                    <span className="players-online">no tourney</span>
                    <span className="game-genre">Battle Royale • FPS</span>
                  </div>
                </div>
              </article>

            </div>
          </div>
        </div>
      </section>

      <footer className="footer" role="contentinfo">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>gameSphere</h3>
              <p>Your premier destination for competitive gaming tournaments. Join thousands of players in epic battles across multiple game titles.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#tournaments">Browse Tournaments</a></li>
                <li><a href="#leaderboards">Leaderboards</a></li>
                <li><a href="#rules">Tournament Rules</a></li>
                <li><a href="#support">Support</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Community</h3>
              <ul className="footer-links">
                <li><a href="#discord">Discord Server</a></li>
                <li><a href="#twitter">Twitter</a></li>
                <li><a href="#reddit">Reddit</a></li>
                <li><a href="#youtube">YouTube</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>Email: info@gamesphere.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Gaming St, Esports City, EC 12345</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 gameSphere. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
