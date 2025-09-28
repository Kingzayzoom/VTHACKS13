import "./Residents.css";
import VTLOGO from "../../assets/Vtech.png";
import { useNavigate } from "react-router-dom";
import { useMemo, useState, useRef, useEffect } from "react";

const MOCK_PEOPLE = [
    { id: "1", name: "Alex Johnson", role: "Resident", lastSeen: "online", interests: ["Hiking","Cooking","VT Football","Board Games","Tech"] },
    { id: "2", name: "Priya Patel", role: "Resident", lastSeen: "2m ago", interests: ["Yoga","Photography","Coffee","Art","Hiking"] },
    { id: "3", name: "Chris Lee", role: "Resident", lastSeen: "5h ago", interests: ["Gaming","Anime","Climbing","Tech","Music"] },
    { id: "4", name: "Taylor Smith", role: "Resident", lastSeen: "yesterday", interests: ["Cooking","Running","Travel","Books","Art"] },
    { id: "5", name: "Jordan Kim", role: "Resident", lastSeen: "3d ago", interests: ["Cycling","Photography","VT Football","Music","Food"] },
];

const CURRENT_USER = {
    id: "me",
    name: "You",
    interests: ["Tech","Hiking","Coffee","Music","VT Football","Board Games"],
};

const INITIAL_THREADS = {
    "1": [
        { id: "m1", from: "them", text: "Hey! Is parking included?", at: Date.now() - 1000 * 60 * 60 },
        { id: "m2", from: "me", text: "Hi Alex—yes, spot P-124 is assigned to you.", at: Date.now() - 1000 * 60 * 58 },
    ],
    "2": [{ id: "m3", from: "them", text: "When is trash pickup?", at: Date.now() - 1000 * 60 * 7 }],
    "3": [],
    "4": [{ id: "m4", from: "them", text: "Can I get a copy of my lease?", at: Date.now() - 1000 * 60 * 60 * 20 }],
    "5": [],
};

export default function Residents() {
    const navigate = useNavigate();

    const [people] = useState(MOCK_PEOPLE);
    const [threads, setThreads] = useState(INITIAL_THREADS);
    const [selectedId, setSelectedId] = useState(people[0].id);
    const [query, setQuery] = useState("");
    const [draft, setDraft] = useState("");
    const chatTopRef = useRef(null);
    const listRef = useRef(null);
    const inputRef = useRef(null);

    const filteredPeople = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return people;
        return people.filter((p) => p.name.toLowerCase().includes(q));
    }, [people, query]);

    const selectedPerson = useMemo(
        () => people.find((p) => p.id === selectedId),
        [people, selectedId]
    );

    const messages = threads[selectedId] || [];

    useEffect(() => {
        const el = listRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [selectedId, messages.length]);

    function sendMessage() {
        const text = draft.trim();
        if (!text) return;
        const msg = { id: `m-${Date.now()}`, from: "me", text, at: Date.now() };
        setThreads((prev) => ({
            ...prev,
            [selectedId]: [...(prev[selectedId] || []), msg],
        }));
        setDraft("");
        inputRef.current?.focus();
    }

    function onKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    function similarity(a = [], b = []) {
        const A = new Set(a.map((x) => x.toLowerCase()));
        const B = new Set(b.map((x) => x.toLowerCase()));
        const inter = [...A].filter((x) => B.has(x)).length;
        const union = new Set([...A, ...B]).size || 1;
        return inter / union;
    }

    const rankedCandidates = useMemo(() => {
        return people
            .map((p) => ({
                ...p,
                score: similarity(CURRENT_USER.interests, p.interests),
            }))
            .sort((a, b) => b.score - a.score);
    }, [people]);

    const [deckIndex, setDeckIndex] = useState(0);
    const [likes, setLikes] = useState([]);
    const [passes, setPasses] = useState([]);
    const currentCandidate = rankedCandidates[deckIndex];

    function ensureThread(id) {
        setThreads((prev) => {
            if (prev[id]) return prev;
            return { ...prev, [id]: [] };
        });
    }

    function scrollToChat() {
        chatTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => inputRef.current?.focus(), 250);
    }

    const onPass = () => {
        if (!currentCandidate) return;
        setPasses((s) => [...s, currentCandidate.id]);
        setDeckIndex((i) => Math.min(i + 1, rankedCandidates.length));
    };

    const onLike = () => {
        if (!currentCandidate) return;
        setLikes((s) => [...s, { id: currentCandidate.id, name: currentCandidate.name }]);
        ensureThread(currentCandidate.id);
        setSelectedId(currentCandidate.id);
        setThreads((prev) => {
            const existing = prev[currentCandidate.id] || [];
            const alreadyGreeted = existing.some((m) => m.meta === "auto-greet");
            if (alreadyGreeted) return prev;
            const greet = {
                id: `greet-${Date.now()}`,
                from: "me",
                text: `Hey ${currentCandidate.name}! We matched based on similar interests — want to connect?`,
                at: Date.now(),
                meta: "auto-greet",
            };
            return { ...prev, [currentCandidate.id]: [...existing, greet] };
        });
        setDeckIndex((i) => Math.min(i + 1, rankedCandidates.length));
        scrollToChat();
    };

    const onOpenChat = (id) => {
        ensureThread(id);
        setSelectedId(id);
        scrollToChat();
    };

    const onClickPerson = (id) => {
        setSelectedId(id);
        scrollToChat();
    };

    return (
        <>
            <nav className="main-nav">
                <div className="main-nav-inner">
                    <div className="brand" onClick={() => navigate("/")}>
                        <img src={VTLOGO} alt="Virginia Tech" />
                        <span>Residents</span>
                    </div>
                    <ul className="linksContainer">
                        <li onClick={() => navigate("/")}>Home</li>
                        <li onClick={() => navigate("/application")}>Application</li>
                        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                    </ul>
                </div>
            </nav>

            <div className="chatLayout" ref={chatTopRef}>
                <aside className="peopleSection">
                    <div className="peopleHeader">
                        <h3>Conversations</h3>
                        <div className="peopleSearch">
                            <span aria-hidden>⌕</span>
                            <input
                                placeholder="Search residents"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <ul className="peopleList">
                        {filteredPeople.map((p) => {
                            const isActive = p.id === selectedId;
                            const preview = threads[p.id]?.at(-1)?.text ?? "No messages yet";
                            return (
                                <li
                                    key={p.id}
                                    className={`personItem ${isActive ? "active" : ""}`}
                                    onClick={() => onClickPerson(p.id)}
                                >
                                    <div className="avatar">{initials(p.name)}</div>
                                    <div className="personMeta">
                                        <div className="row1">
                                            <span className="name">{p.name}</span>
                                            <span className={`presence ${p.lastSeen === "online" ? "online" : ""}`}>
                        {p.lastSeen}
                      </span>
                                        </div>
                                        <div className="row2 preview" title={preview}>{preview}</div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </aside>

                <section className="messageSection">
                    <div className="messageHeader">
                        <div className="avatar lg">{initials(selectedPerson?.name || "?")}</div>
                        <div className="titleBlock">
                            <h3>{selectedPerson?.name}</h3>
                            <span className="subtle">{selectedPerson?.role} • {selectedPerson?.lastSeen}</span>
                        </div>
                    </div>

                    <div className="messageList" ref={listRef}>
                        {messages.map((m) => (
                            <MessageBubble key={m.id} from={m.from} text={m.text} at={m.at} />
                        ))}
                        {!messages.length && (
                            <div className="emptyState">
                                <p>Start a conversation with {selectedPerson?.name}.</p>
                            </div>
                        )}
                    </div>

                    <div className="composer">
            <textarea
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a message… (Enter to send, Shift+Enter for newline)"
                rows={1}
            />
                        <button className="sendBtn" onClick={sendMessage} disabled={!draft.trim()}>
                            Send
                        </button>
                    </div>
                </section>
            </div>

            <section className="findSimilar">
                <div className="findHeader">
                    <h3>Find Similar Residents</h3>
                    <p className="muted">
                        Based on shared interests with you: {CURRENT_USER.interests.join(", ")}
                    </p>
                </div>

                <div className="deckAndMatches">
                    <div className="cardStage">
                        {currentCandidate ? (
                            <ProfileCard
                                key={currentCandidate.id}
                                person={currentCandidate}
                                score={currentCandidate.score}
                                onLike={onLike}
                                onPass={onPass}
                            />
                        ) : (
                            <div className="emptyDeck">No more suggestions</div>
                        )}
                    </div>

                    <div className="matchesPane">
                        <h4>Matches</h4>
                        {likes.length === 0 ? (
                            <p className="muted">Likes you send will show up here.</p>
                        ) : (
                            <ul className="matchList">
                                {likes.map((m) => (
                                    <li key={m.id} className="matchItem">
                                        <div className="avatar sm">{initials(m.name)}</div>
                                        <span className="matchName">{m.name}</span>
                                        <button className="openChatBtn" onClick={() => onOpenChat(m.id)}>
                                            Open Chat
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

function ProfileCard({ person, score, onLike, onPass }) {
    const [dragging, setDragging] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);
    const startRef = useRef({ x: 0, y: 0 });
    const threshold = 120;
    const percent = Math.round(score * 100);
    const rot = Math.max(-15, Math.min(15, dx / 10));
    const likeOpacity = Math.min(1, Math.max(0, dx / threshold));
    const passOpacity = Math.min(1, Math.max(0, -dx / threshold));

    function onDown(e) {
        const p = "touches" in e ? e.touches[0] : e;
        startRef.current = { x: p.clientX, y: p.clientY };
        setDragging(true);
    }

    function onMove(e) {
        if (!dragging) return;
        const p = "touches" in e ? e.touches[0] : e;
        setDx(p.clientX - startRef.current.x);
        setDy(p.clientY - startRef.current.y);
    }

    function flyOut(direction) {
        setAnimating(true);
        setDx(direction === "right" ? window.innerWidth : -window.innerWidth);
        setTimeout(() => {
            setAnimating(false);
            setDx(0);
            setDy(0);
            direction === "right" ? onLike() : onPass();
        }, 260);
    }

    function onUp() {
        if (!dragging) return;
        setDragging(false);
        if (Math.abs(dx) > threshold) {
            flyOut(dx > 0 ? "right" : "left");
        } else {
            setDx(0);
            setDy(0);
        }
    }

    return (
        <div
            className={`swipeCard ${dragging ? "dragging" : ""} ${animating ? "animating" : ""}`}
            style={{ transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)` }}
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={dragging ? onUp : undefined}
            onTouchStart={onDown}
            onTouchMove={onMove}
            onTouchEnd={onUp}
        >
            <div className="decisionBadge like" style={{ opacity: likeOpacity }}>MATCH</div>
            <div className="decisionBadge pass" style={{ opacity: passOpacity }}>PASS</div>

            <div className="profileCard">
                <div className="profileTop">
                    <div className="profileAvatar">{initials(person.name)}</div>
                    <div className="profileMeta">
                        <h4>{person.name}</h4>
                        <span className="muted">{person.role} • {person.lastSeen}</span>
                    </div>
                    <div className="matchBadge">{percent}% match</div>
                </div>

                <div className="profileInterests">
                    {person.interests.map((tag) => (
                        <span key={tag} className="chip">{tag}</span>
                    ))}
                </div>

                <div className="profileActions">
                    <button className="passBtn" onClick={() => flyOut("left")}>Pass</button>
                    <button className="likeBtn" onClick={() => flyOut("right")}>Match</button>
                </div>
            </div>
        </div>
    );
}

function MessageBubble({ from, text, at }) {
    const mine = from === "me";
    return (
        <div className={`bubbleRow ${mine ? "mine" : "theirs"}`}>
            <div className={`bubble ${mine ? "bubbleMine" : "bubbleTheirs"}`}>
                <div className="bubbleText">{text}</div>
                <div className="bubbleMeta">{timeAgo(at)}</div>
            </div>
        </div>
    );
}

function initials(name) {
    const parts = name.split(" ").filter(Boolean);
    const first = parts[0]?.[0] ?? "";
    const second = parts[1]?.[0] ?? "";
    return (first + second).toUpperCase();
}

function timeAgo(ts) {
    const diff = Math.max(1, Math.floor((Date.now() - ts) / 1000));
    if (diff < 60) return `${diff}s ago`;
    const m = Math.floor(diff / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
}
