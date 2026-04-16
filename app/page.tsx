export default function Home() {
  const checkoutUrl = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL || "#";

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-block bg-[#58a6ff]/10 border border-[#58a6ff]/30 text-[#58a6ff] text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
          Maker Tools
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
          Discover Raspberry Pi Projects<br />
          <span className="text-[#58a6ff]">Matched to You</span>
        </h1>
        <p className="text-lg text-[#8b949e] max-w-xl mx-auto mb-8">
          Filter by skill level, components, and interests. Save favorites and unlock premium tutorials with detailed build guides and component lists.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["Beginner Friendly", "Component Filters", "Save Favorites", "Step-by-Step Guides"].map((tag) => (
            <span key={tag} className="bg-[#161b22] border border-[#30363d] text-[#8b949e] text-sm px-4 py-1.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={checkoutUrl}
          className="inline-block bg-[#58a6ff] hover:bg-[#79b8ff] text-[#0d1117] font-bold text-base px-8 py-3 rounded-lg transition-colors duration-200"
        >
          Start Building — $7/mo
        </a>
      </section>

      {/* Pricing */}
      <section className="max-w-md mx-auto px-6 pb-20">
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 text-center shadow-xl">
          <div className="text-[#58a6ff] text-sm font-semibold uppercase tracking-widest mb-2">Pro Access</div>
          <div className="text-5xl font-extrabold text-white mb-1">$7<span className="text-xl font-normal text-[#8b949e]">/mo</span></div>
          <p className="text-[#8b949e] text-sm mb-6">Cancel anytime. Instant access.</p>
          <ul className="text-left space-y-3 mb-8">
            {[
              "500+ curated Raspberry Pi projects",
              "Filter by skill, components & category",
              "Save & organize your favorites",
              "Premium step-by-step tutorials",
              "Full component & parts lists",
              "New projects added weekly"
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-[#c9d1d9]">
                <span className="text-[#58a6ff] mt-0.5 font-bold">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <a
            href={checkoutUrl}
            className="block w-full bg-[#58a6ff] hover:bg-[#79b8ff] text-[#0d1117] font-bold text-base py-3 rounded-lg transition-colors duration-200 text-center"
          >
            Get Started Now
          </a>
          <p className="text-xs text-[#484f58] mt-4">Secure payment via Lemon Squeezy</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "What skill levels are covered?",
              a: "Projects range from complete beginner (first Pi setup) to advanced (custom OS, ML on edge). Every project is clearly tagged so you always know what you're getting into."
            },
            {
              q: "Can I filter by components I already own?",
              a: "Yes. You can filter by components like cameras, sensors, displays, HATs, and more — so you only see projects you can build with what you have."
            },
            {
              q: "How do I cancel my subscription?",
              a: "You can cancel anytime from your Lemon Squeezy customer portal. No questions asked, no hidden fees."
            }
          ].map(({ q, a }) => (
            <div key={q} className="bg-[#161b22] border border-[#30363d] rounded-xl p-5">
              <h3 className="font-semibold text-white mb-2">{q}</h3>
              <p className="text-[#8b949e] text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#21262d] text-center py-6 text-xs text-[#484f58]">
        © {new Date().getFullYear()} Raspberry Pi Project Finder. All rights reserved.
      </footer>
    </main>
  );
}
