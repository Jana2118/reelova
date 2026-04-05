import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeStyle, setActiveStyle] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [count, setCount] = useState({ creators: 0, videos: 0, hours: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const targets = { creators: 500, videos: 12000, hours: 48000 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCount({
        creators: Math.floor(targets.creators * progress),
        videos: Math.floor(targets.videos * progress),
        hours: Math.floor(targets.hours * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const styles = ["Cinematic", "Vlog", "Shorts", "Documentary"];
  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-96 h-96 bg-purple-800 rounded-full opacity-10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute bottom-40 right-20 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur border-b border-gray-800" : "bg-transparent"}`}
      >
        <h1 className="text-2xl font-bold text-purple-400 tracking-tight">Reelova</h1>
        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          {["How it works", "Pricing", "Reviews"].map((item, i) => (
            <motion.a
              key={i}
              href={`#${item.toLowerCase().replace(/ /g, "")}`}
              whileHover={{ color: "#fff", y: -2 }}
              className="hover:text-white transition cursor-pointer"
            >
              {item}
            </motion.a>
          ))}
        </div>
        <motion.a href="#waitlist" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button className="border border-purple-500 text-purple-400 px-5 py-2 rounded-full text-sm hover:bg-purple-500 hover:text-white transition">
            Get Early Access
          </button>
        </motion.a>
      </motion.nav>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-40 pb-24">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-purple-900 text-purple-300 text-xs px-4 py-1 rounded-full mb-6 uppercase tracking-widest"
        >
          AI Video Editor for Creators
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 max-w-3xl"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
        >
          Describe your video.{" "}
          <span className="text-purple-400">Reelova edits it for you.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-gray-400 text-xl max-w-2xl mb-10"
        >
          Just paste your script, pick a style, and let AI do the editing.
          Built for YouTubers, influencers, and creators.
        </motion.p>

        {/* Waitlist Form */}
        <motion.div
          id="waitlist"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3 rounded-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-semibold transition"
                >
                  Get Early Access
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-purple-900 border border-purple-500 text-purple-200 px-8 py-4 rounded-full text-lg"
              >
                You're on the list! We'll be in touch soon. 🎬
              </motion.div>
            )}
          </AnimatePresence>
          <p className="text-gray-600 text-sm mt-4">No credit card required. Join 500+ creators on the waitlist.</p>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="relative z-10 grid grid-cols-3 gap-6 max-w-3xl mx-auto px-6 pb-24">
        {[
          { label: "Creators waiting", value: count.creators, suffix: "+" },
          { label: "Videos processed", value: count.videos, suffix: "+" },
          { label: "Hours saved", value: count.hours, suffix: "+" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="text-center bg-gray-900 border border-gray-800 rounded-2xl py-6 px-4"
          >
            <p className="text-3xl font-extrabold text-purple-400">{stat.value.toLocaleString()}{stat.suffix}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Mock App Preview */}
      <div className="relative z-10 flex justify-center px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl bg-gray-900 border border-gray-700 rounded-3xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-800 bg-gray-950">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-500 text-sm">reelova.app — editor</span>
          </div>
          <div className="grid grid-cols-3 gap-0 h-72">
            <div className="col-span-1 border-r border-gray-800 p-4">
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-widest">Your Script</p>
              <div className="bg-gray-800 rounded-xl p-3 text-xs text-gray-300 leading-relaxed mb-4">
                "Hey guys, today we're reviewing the new iPhone 16 Pro. First let's talk about the camera..."
              </div>
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Style</p>
              <div className="flex flex-col gap-2">
                {styles.map((s, i) => (
                  <motion.div
                    key={i}
                    onClick={() => setActiveStyle(i)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`text-xs px-3 py-2 rounded-lg cursor-pointer transition ${activeStyle === i ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
                  >
                    {s}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center bg-gray-950 relative p-4">
              <motion.div
                key={activeStyle}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-40 h-24 bg-gray-800 rounded-xl flex items-center justify-center mb-4"
              >
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-xs">▶</span>
                  </div>
                  <span className="text-xs text-gray-400">{styles[activeStyle]}</span>
                </div>
              </motion.div>
              <div className="w-full bg-gray-800 rounded-xl px-4 py-2 flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-2 h-2 rounded-full bg-purple-500"
                />
                <div className="flex-1 h-1 bg-gray-700 rounded-full">
                  <motion.div
                    animate={{ width: ["0%", "60%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="h-1 bg-purple-500 rounded-full"
                  />
                </div>
                <span className="text-xs text-gray-400">AI editing...</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* How It Works */}
      <div id="howitworks" className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl font-bold text-center mb-4">How Reelova works</h3>
          <p className="text-gray-400 text-center mb-16">Three steps from idea to published video</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Paste your script", desc: "Write or paste your video script or concept. Even rough notes work perfectly." },
            { step: "02", title: "Pick a style", desc: "Choose from cinematic, vlog, shorts and more. Reelova matches the edit to your vibe." },
            { step: "03", title: "Export & publish", desc: "Download your edited video — YouTube, Reels, TikTok, Shorts ready in one click." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ y: -8, borderColor: "#8b5cf6" }}
              className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 transition cursor-default"
            >
              <span className="text-6xl font-extrabold text-gray-800 absolute top-4 right-6">{item.step}</span>
              <h4 className="text-xl font-semibold mb-3 text-white">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 px-6 py-16 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h3 className="text-4xl font-bold text-center mb-4">Everything you need</h3>
          <p className="text-gray-400 text-center mb-16">Powerful AI tools built for modern creators</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Script to Edit", desc: "Paste your script and AI structures the entire video edit automatically.", icon: "🎬" },
            { title: "Style Presets", desc: "Choose from vlog, cinematic, shorts and more. Your brand, your vibe.", icon: "🎨" },
            { title: "Auto Captions", desc: "AI generates and styles animated captions synced perfectly to your audio.", icon: "💬" },
            { title: "B-Roll Suggestions", desc: "AI recommends the perfect stock footage to fill gaps in your video.", icon: "🎥" },
            { title: "Multi-Platform Export", desc: "Export for YouTube, TikTok, Reels, and Shorts all at once.", icon: "📤" },
            { title: "Brand Kit", desc: "Save your fonts, colors, and logo. Apply your brand to every video instantly.", icon: "✨" },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -6, borderColor: "#8b5cf6", scale: 1.02 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 transition cursor-default"
            >
              <motion.span
                whileHover={{ scale: 1.3, rotate: 10 }}
                className="text-3xl mb-4 block"
              >
                {f.icon}
              </motion.span>
              <h4 className="text-lg font-semibold text-white mb-2">{f.title}</h4>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div id="reviews" className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h3 className="text-4xl font-bold text-center mb-4">Creators love Reelova</h3>
          <p className="text-gray-400 text-center mb-16">Don't take our word for it</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Arjun K.", handle: "@arjuncreates", text: "I used to spend 6 hours editing one video. Reelova cut that down to 20 minutes. Game changer." },
            { name: "Priya S.", handle: "@priyalifestyle", text: "The style presets are insane. My videos look cinematic without me knowing anything about editing." },
            { name: "Rahul M.", handle: "@rahultechreview", text: "Auto captions + B-roll suggestions alone are worth it. This is the future of content creation." },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, borderColor: "#8b5cf6" }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 transition"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, j) => (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: j * 0.1 }}
                    className="text-yellow-400 text-sm"
                  >★</motion.span>
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">"{t.text}"</p>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.handle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h3 className="text-4xl font-bold text-center mb-4">Simple pricing</h3>
          <p className="text-gray-400 text-center mb-16">Start free, scale when you're ready</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {[
            { plan: "Free", price: "$0", period: "forever", features: ["3 exports/month", "2 style presets", "Reelova watermark", "720p export"], cta: "Get Started", highlight: false },
            { plan: "Creator", price: "$19", period: "per month", features: ["Unlimited exports", "All style presets", "No watermark", "1080p export", "Auto captions"], cta: "Start Free Trial", highlight: true },
            { plan: "Pro", price: "$49", period: "per month", features: ["Everything in Creator", "Brand kit", "4K export", "B-roll suggestions", "Priority rendering"], cta: "Start Free Trial", highlight: false },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className={`rounded-2xl p-8 border transition ${p.highlight ? "bg-purple-900 border-purple-500 scale-105" : "bg-gray-900 border-gray-800 hover:border-purple-500"}`}
            >
              {p.highlight && (
                <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full mb-4 inline-block">Most Popular</span>
              )}
              <h4 className="text-xl font-bold text-white mb-1">{p.plan}</h4>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">{p.price}</span>
                <span className="text-gray-400 text-sm mb-1">/{p.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-purple-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`w-full py-3 rounded-full font-semibold text-sm transition ${p.highlight ? "bg-white text-purple-900 hover:bg-gray-100" : "border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"}`}
              >
                {p.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="relative z-10 px-6 py-24 max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h3 className="text-4xl font-bold text-center mb-4">FAQ</h3>
          <p className="text-gray-400 text-center mb-16">Everything you need to know</p>
        </motion.div>
        <div className="space-y-4">
          {[
            { q: "Do I need video editing experience?", a: "Not at all! Reelova is built for creators who want great videos without learning complex software." },
            { q: "What video formats are supported?", a: "You can upload MP4, MOV, AVI and more. Export to any format including vertical for Reels and Shorts." },
            { q: "How long does AI editing take?", a: "Most videos are processed in under 2 minutes depending on length and complexity." },
            { q: "Can I cancel anytime?", a: "Yes! No contracts, no commitments. Cancel your subscription anytime with one click." },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="text-white font-medium">{faq.q}</span>
                <motion.span
                  animate={{ rotate: activeFaq === i ? 45 : 0 }}
                  className="text-purple-400 text-xl font-bold ml-4"
                >+</motion.span>
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5 text-gray-400 text-sm leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative z-10 px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-purple-900 border border-purple-700 rounded-3xl p-12"
        >
          <h3 className="text-4xl font-bold mb-4">Ready to create faster?</h3>
          <p className="text-purple-300 mb-8">Join 500+ creators already on the Reelova waitlist.</p>
          <motion.a href="#waitlist" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className="bg-white text-purple-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition">
              Get Early Access — It's Free
            </button>
          </motion.a>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center text-gray-600 text-sm py-8 border-t border-gray-900">
        © 2026 Reelova. Built for creators. ·
        <span className="ml-2 hover:text-gray-400 cursor-pointer transition">Privacy</span> ·
        <span className="ml-2 hover:text-gray-400 cursor-pointer transition">Terms</span>
      </footer>

    </div>
  );
}

export default App;