import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5">
        <h1 className="text-2xl font-bold text-purple-400">Reelova</h1>
        <button className="border border-purple-400 text-purple-400 px-4 py-2 rounded-full text-sm hover:bg-purple-400 hover:text-black transition">
          Join Waitlist
        </button>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-24">
        <span className="bg-purple-900 text-purple-300 text-xs px-4 py-1 rounded-full mb-6 uppercase tracking-widest">
          AI Video Editor for Creators
        </span>
        <h2 className="text-5xl font-bold leading-tight mb-6 max-w-3xl">
          Describe your video.<br />
          <span className="text-purple-400">Reelova edits it for you.</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mb-10">
          Just paste your script, pick a style, and let AI do the editing.
          Built for YouTubers, influencers, and creators who hate spending
          hours in the edit suite.
        </p>

        {/* Waitlist Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
              required
            />
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-semibold transition"
            >
              Get Early Access
            </button>
          </form>
        ) : (
          <div className="bg-purple-900 border border-purple-500 text-purple-200 px-8 py-4 rounded-full text-lg">
            You're on the list! We'll be in touch soon.
          </div>
        )}

        <p className="text-gray-600 text-sm mt-4">No credit card required. Free to join.</p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-10 py-16 max-w-5xl mx-auto">
        {[
          { title: "Script to Edit", desc: "Paste your script and AI structures the entire video edit automatically." },
          { title: "Pick Your Style", desc: "Choose from vlog, cinematic, shorts and more. Your brand, your vibe." },
          { title: "Export Anywhere", desc: "Download in any format — YouTube, Reels, TikTok, Shorts ready." },
        ].map((f, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-left hover:border-purple-500 transition">
            <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-8">
        © 2026 Reelova. Built for creators.
      </footer>

    </div>
  );
}

export default App;