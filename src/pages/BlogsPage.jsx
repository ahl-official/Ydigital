// ============================================================
//  BlogsPage.jsx  —  Ydigital
//  Reads published posts from /src/data/blogs.json
//  Falls back gracefully if the file is empty or missing.
// ============================================================

import { useState, useEffect } from "react";

// ── Inline SVG icon helper (re-used from main App) ──────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
    const icons = {
        clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
        arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
        search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
        user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
        tag: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>,
        close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    };
    return icons[name] || null;
};

// ── Colour palette per category ──────────────────────────────
const CATEGORY_COLORS = {
    "SEO": "#0057FF",
    "PPC": "#FF6B1A",
    "Social Media": "#DB2777",
    "Influencer": "#7C3AED",
    "Growth Hacks": "#059669",
    "Case Studies": "#0057FF",
    "General": "#8892A4",
};
const categoryColor = (cat) => CATEGORY_COLORS[cat] || "#0057FF";

// ── Fallback placeholder image ───────────────────────────────
const FALLBACK_IMG = "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80";

// ── Full post modal ──────────────────────────────────────────
const BlogModal = ({ post, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const handler = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handler);
        };
    }, [onClose]);

    const color = categoryColor(post.category);

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed", inset: 0, zIndex: 2000,
                background: "rgba(5,14,31,0.75)", backdropFilter: "blur(6px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "1.5rem",
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: "#fff", borderRadius: 20,
                    maxWidth: 760, width: "100%",
                    maxHeight: "90vh", overflowY: "auto",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
                }}
            >
                {/* Cover image */}
                <div style={{ position: "relative" }}>
                    <img
                        src={post.imageUrl || FALLBACK_IMG}
                        alt={post.title}
                        onError={(e) => { e.target.src = FALLBACK_IMG; }}
                        style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: "20px 20px 0 0", display: "block" }}
                    />
                    <button
                        onClick={onClose}
                        style={{
                            position: "absolute", top: 16, right: 16,
                            width: 38, height: 38, borderRadius: "50%",
                            background: "rgba(0,0,0,0.5)", border: "none", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                    >
                        <Icon name="close" size={18} color="#fff" />
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: "2rem 2.2rem 2.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: "1.2rem" }}>
                        <span style={{
                            background: `${color}15`, color,
                            fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 800,
                            padding: "0.25rem 0.75rem", borderRadius: 20, letterSpacing: "0.05em",
                        }}>
                            {post.category}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", color: "#8892A4", fontWeight: 500 }}>
                            <Icon name="clock" size={12} color="#8892A4" /> {post.readTime}
                        </span>
                        {post.author && (
                            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", color: "#8892A4", fontWeight: 500 }}>
                                <Icon name="user" size={12} color="#8892A4" /> {post.author}
                            </span>
                        )}
                        {post.publishDate && (
                            <span style={{ fontSize: "0.75rem", color: "#8892A4", fontWeight: 500, marginLeft: "auto" }}>
                                {post.publishDate}
                            </span>
                        )}
                    </div>

                    <h2 style={{
                        fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
                        fontSize: "clamp(1.4rem, 3vw, 1.9rem)", lineHeight: 1.2,
                        color: "#050E1F", marginBottom: "0.8rem",
                    }}>
                        {post.title}
                    </h2>

                    {post.excerpt && (
                        <p style={{
                            color: "#8892A4", fontSize: "1rem", lineHeight: 1.7,
                            marginBottom: "1.5rem", fontStyle: "italic", fontWeight: 400,
                            borderLeft: `3px solid ${color}`, paddingLeft: "1rem",
                        }}>
                            {post.excerpt}
                        </p>
                    )}

                    {/* Body — supports simple HTML or plain text */}
                    <div
                        style={{ color: "#050E1F", fontSize: "0.95rem", lineHeight: 1.85, fontWeight: 400 }}
                        dangerouslySetInnerHTML={{ __html: post.body || "" }}
                    />
                </div>
            </div>
        </div>
    );
};

// ── Blog card ────────────────────────────────────────────────
const BlogCard = ({ post, onClick }) => {
    const color = categoryColor(post.category);
    const [imgError, setImgError] = useState(false);

    return (
        <div
            onClick={onClick}
            style={{
                background: "#fff", borderRadius: 12,
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                overflow: "hidden", cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
                display: "flex", flexDirection: "column",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,87,255,0.12)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)";
            }}
        >
            <img
                src={imgError ? FALLBACK_IMG : (post.imageUrl || FALLBACK_IMG)}
                alt={post.title}
                onError={() => setImgError(true)}
                style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: "1.4rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    <span style={{
                        background: `${color}15`, color,
                        fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 800,
                        padding: "0.2rem 0.7rem", borderRadius: 20, letterSpacing: "0.05em",
                    }}>
                        {post.category}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: "0.72rem", color: "#8892A4", fontWeight: 500 }}>
                        <Icon name="clock" size={11} color="#8892A4" /> {post.readTime}
                    </span>
                    {post.publishDate && (
                        <span style={{ fontSize: "0.7rem", color: "#8892A4", marginLeft: "auto", fontWeight: 400 }}>
                            {post.publishDate}
                        </span>
                    )}
                </div>

                <h3 style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                    fontSize: "0.95rem", color: "#050E1F", lineHeight: 1.45,
                    marginBottom: "0.6rem", flex: 1,
                }}>
                    {post.title}
                </h3>

                {post.excerpt && (
                    <p style={{ fontSize: "0.83rem", color: "#8892A4", lineHeight: 1.6, marginBottom: "1rem", fontWeight: 400 }}>
                        {post.excerpt.length > 100 ? post.excerpt.slice(0, 100) + "…" : post.excerpt}
                    </p>
                )}

                <div style={{
                    display: "flex", alignItems: "center", gap: 6,
                    color, fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", fontWeight: 700,
                    marginTop: "auto", letterSpacing: "0.03em",
                }}>
                    Read More <Icon name="arrow" size={14} color={color} />
                </div>
            </div>
        </div>
    );
};

// ── Main BlogsPage component ─────────────────────────────────
export default function BlogsPage() {
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPost, setSelectedPost] = useState(null);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    // Load blogs.json at mount
    useEffect(() => {
        fetch("/data/blogs.json")
            .then((r) => {
                if (!r.ok) throw new Error("blogs.json not found (HTTP " + r.status + ")");
                return r.json();
            })
            .then((data) => {
                setAllPosts(data.blogs || []);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Derive unique categories
    const categories = ["All", ...Array.from(new Set(allPosts.map((p) => p.category)))];

    // Filter by category + search
    const filtered = allPosts.filter((p) => {
        const matchCat = activeCategory === "All" || p.category === activeCategory;
        const q = searchQuery.toLowerCase();
        const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
        return matchCat && matchSearch;
    });

    const handleSubscribe = () => {
        if (email.includes("@")) { setSubscribed(true); setEmail(""); }
    };

    // ── Render states ────────────────────────────────────────
    const headerSection = (
        <section style={{
            background: "linear-gradient(135deg, #050E1F 0%, #0A1830 50%, #0D1F45 100%)",
            padding: "10rem 2rem 5rem", textAlign: "center",
            position: "relative", overflow: "hidden",
        }}>
            <div style={{ position: "absolute", borderRadius: "50%", filter: "blur(70px)", pointerEvents: "none", width: 500, height: 500, background: "rgba(0,87,255,0.12)", top: -150, left: "20%" }} />
            <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 800,
                    letterSpacing: "0.2em", textTransform: "uppercase", color: "#FF8C4D",
                    marginBottom: "1rem",
                }}>
                    <span style={{ display: "block", width: 28, height: 2, background: "#FF8C4D" }} />
                    Ydigital Blog
                </div>
                <h1 style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
                    fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1,
                    color: "#fff", marginBottom: "1rem",
                }}>
                    Insights & <span style={{ color: "#4D8FFF" }}>Ideas</span>
                </h1>
                <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 500, margin: "0 auto", fontWeight: 400, fontSize: "clamp(0.9rem, 2vw, 1.05rem)" }}>
                    Deep dives into digital marketing, growth hacks, and real campaign case studies from the Ydigital team.
                </p>
            </div>
        </section>
    );

    if (loading) return (
        <div style={{ minHeight: "100vh", background: "#F5F7FF" }}>
            {headerSection}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", color: "#8892A4", fontWeight: 600 }}>Loading posts…</div>
            </div>
        </div>
    );

    return (
        <div className="page-enter">
            {headerSection}

            <section style={{ padding: "5rem 1.5rem", background: "#fff" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>

                    {/* Search bar */}
                    <div style={{ maxWidth: 480, margin: "0 auto 2.5rem", position: "relative" }}>
                        <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
                            <Icon name="search" size={16} color="#8892A4" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search posts…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: "100%", padding: "0.8rem 1rem 0.8rem 2.6rem",
                                border: "1.5px solid #dde3f0", borderRadius: 30,
                                fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem",
                                background: "#F5F7FF", color: "#050E1F", outline: "none",
                                transition: "border 0.2s",
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#0057FF"}
                            onBlur={(e) => e.target.style.borderColor = "#dde3f0"}
                        />
                    </div>

                    {/* Category filters */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "3rem", justifyContent: "center" }}>
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setActiveCategory(c)}
                                style={{
                                    padding: "0.42rem 1.1rem", borderRadius: 30, border: "none",
                                    fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.75rem",
                                    cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.04em",
                                    background: activeCategory === c ? "#0057FF" : "#F5F7FF",
                                    color: activeCategory === c ? "#fff" : "#8892A4",
                                    boxShadow: activeCategory === c ? "0 4px 16px rgba(0,87,255,0.25)" : "none",
                                }}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Error state */}
                    {error && (
                        <div style={{
                            background: "#fff3ee", border: "1px solid #FF6B1A33",
                            borderRadius: 12, padding: "1.5rem 2rem", marginBottom: "2rem",
                            fontFamily: "'Montserrat', sans-serif", fontSize: "0.88rem", color: "#FF6B1A",
                        }}>
                            <strong>Could not load posts:</strong> {error}
                            <br /><span style={{ color: "#8892A4", fontWeight: 400 }}>Make sure <code>src/data/blogs.json</code> exists in the repo.</span>
                        </div>
                    )}

                    {/* No posts */}
                    {!error && filtered.length === 0 && (
                        <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
                            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
                            <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "#050E1F", marginBottom: "0.5rem" }}>
                                {allPosts.length === 0 ? "No posts published yet" : "No posts match your search"}
                            </h3>
                            <p style={{ color: "#8892A4", fontWeight: 400, fontSize: "0.92rem" }}>
                                {allPosts.length === 0
                                    ? "Check back soon — the team is writing!"
                                    : "Try a different search term or category."}
                            </p>
                        </div>
                    )}

                    {/* Blog grid */}
                    {filtered.length > 0 && (
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "1.5rem",
                            marginBottom: "4rem",
                        }}>
                            {filtered.map((post) => (
                                <BlogCard
                                    key={post.id}
                                    post={post}
                                    onClick={() => setSelectedPost(post)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Subscribe banner */}
                    <div style={{
                        background: "linear-gradient(135deg, #0057FF, #003FCC)",
                        borderRadius: 20, padding: "3rem 1.5rem",
                        textAlign: "center", position: "relative", overflow: "hidden",
                    }}>
                        <div style={{ position: "absolute", borderRadius: "50%", filter: "blur(70px)", width: 200, height: 200, background: "rgba(255,255,255,0.08)", top: -60, right: "10%" }} />
                        <div style={{ position: "relative", zIndex: 2 }}>
                            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "clamp(1.4rem, 3vw, 1.9rem)", color: "#fff", marginBottom: "0.8rem" }}>
                                Never Miss a Post
                            </h2>
                            <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 420, margin: "0 auto 1.8rem", fontWeight: 400, fontSize: "0.93rem" }}>
                                Get the latest marketing insights from the Ydigital team delivered straight to your inbox.
                            </p>
                            {subscribed ? (
                                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "#fff", fontSize: "1.05rem" }}>
                                    ✅ You're subscribed!
                                </div>
                            ) : (
                                <div style={{ display: "flex", gap: 8, justifyContent: "center", maxWidth: 400, margin: "0 auto", flexWrap: "wrap" }}>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                                        style={{
                                            flex: 1, minWidth: 200,
                                            padding: "0.85rem 1.1rem",
                                            border: "1.5px solid rgba(255,255,255,0.2)",
                                            borderRadius: 8, outline: "none",
                                            fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem",
                                            background: "rgba(255,255,255,0.1)", color: "#fff",
                                        }}
                                    />
                                    <button
                                        onClick={handleSubscribe}
                                        style={{
                                            background: "#FF6B1A", color: "#fff", border: "none",
                                            fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                                            fontSize: "0.82rem", letterSpacing: "0.07em", textTransform: "uppercase",
                                            padding: "0.85rem 1.6rem", borderRadius: 4, cursor: "pointer",
                                            display: "inline-flex", alignItems: "center", gap: 8,
                                        }}
                                    >
                                        Subscribe <Icon name="arrow" size={14} color="#fff" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </section>

            {/* Full post modal */}
            {selectedPost && (
                <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
        </div>
    );
}