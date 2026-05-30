import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');`;

const CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
@keyframes shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
@keyframes spin { to { transform: rotate(360deg); } }
.fade { animation: fadeUp 0.45s ease both; }
.fade2 { animation: fadeUp 0.45s 0.08s ease both; }
.fade3 { animation: fadeUp 0.45s 0.16s ease both; }
input,textarea,select {
  width:100%; background:#111; border:1px solid #222; border-radius:10px;
  color:#f0ece4; font-family:'DM Sans',sans-serif; font-size:14px;
  padding:11px 14px; outline:none; transition:border 0.2s; resize:vertical;
}
input:focus,textarea:focus,select:focus { border-color:#c9a84c; }
input::placeholder,textarea::placeholder { color:#3a3a3a; }
label { display:block; font-family:'DM Sans',sans-serif; font-size:10px;
  font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#555; margin-bottom:5px; }
@media print {
  .noprint { display:none!important; }
  body { background:white!important; }
  .print-area { box-shadow:none!important; border-radius:0!important; }
}
`;

// ── TEMPLATE RENDERERS ─────────────────────────────────────────────────────

function TemplateClassic({ d }) {
  return (
    <div style={{ fontFamily:"'Georgia',serif", background:"white", color:"#1a1a1a",
      padding:"40px 44px", fontSize:13, lineHeight:1.65 }}>
      <h1 style={{ fontSize:26, fontWeight:700, letterSpacing:"-0.02em", marginBottom:2 }}>{d.name}</h1>
      {d.role && <div style={{ fontSize:13, color:"#c9a84c", fontWeight:600, marginBottom:6 }}>{d.role}</div>}
      <div style={{ fontSize:12, color:"#666", borderBottom:"2px solid #1a1a1a",
        paddingBottom:12, marginBottom:16 }}>
        {[d.email, d.phone, d.location].filter(Boolean).join(" · ")}
      </div>
      {d.summary && <><SectionHead t="Professional Summary"/><p style={{marginBottom:12}}>{d.summary}</p></>}
      {d.skills && <><SectionHead t="Skills"/><p style={{marginBottom:12}}>{d.skills}</p></>}
      {d.experience && <><SectionHead t="Experience"/>
        {d.experience.split("\n\n").map((b,i)=>(
          <div key={i} style={{marginBottom:10}}>
            {b.split("\n").map((l,j)=>(
              <p key={j} style={{fontWeight:j===0?700:400, color:j===1?"#666":"inherit", fontSize:j===1?12:13}}>{l}</p>
            ))}
          </div>
        ))}
      </>}
      {d.education && <><SectionHead t="Education"/>
        {d.education.split("\n").map((l,i)=><p key={i}>{l}</p>)}
      </>}
    </div>
  );
}

function SectionHead({ t }) {
  return <h2 style={{ fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase",
    borderBottom:"1px solid #ddd", paddingBottom:4, marginBottom:8, marginTop:18, color:"#1a1a1a" }}>{t}</h2>;
}

function TemplateModern({ d }) {
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"white", color:"#1a1a1a",
      display:"grid", gridTemplateColumns:"200px 1fr", minHeight:500, fontSize:13 }}>
      {/* Sidebar */}
      <div style={{ background:"#1A1A2E", color:"white", padding:"32px 20px" }}>
        <div style={{ width:64, height:64, borderRadius:"50%", background:"#c9a84c",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:22, fontWeight:700, marginBottom:16, color:"#1a1a1a" }}>
          {(d.name||"?").charAt(0)}
        </div>
        <div style={{ fontSize:11, color:"#c9a84c", fontWeight:700,
          letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:4 }}>Contact</div>
        <div style={{ fontSize:11, color:"#aaa", lineHeight:1.8, marginBottom:20 }}>
          {d.email && <div>{d.email}</div>}
          {d.phone && <div>{d.phone}</div>}
          {d.location && <div>{d.location}</div>}
        </div>
        {d.skills && <>
          <div style={{ fontSize:11, color:"#c9a84c", fontWeight:700,
            letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:8 }}>Skills</div>
          {d.skills.split(",").map(s => (
            <div key={s} style={{ background:"#2d2d4e", borderRadius:4, padding:"3px 8px",
              fontSize:11, color:"#ddd", marginBottom:4, display:"inline-block", marginRight:4 }}>{s.trim()}</div>
          ))}
        </>}
      </div>
      {/* Main */}
      <div style={{ padding:"32px 28px" }}>
        <h1 style={{ fontSize:24, fontWeight:700, letterSpacing:"-0.02em" }}>{d.name}</h1>
        {d.role && <div style={{ color:"#c9a84c", fontWeight:600, marginBottom:12 }}>{d.role}</div>}
        {d.summary && <><ModHead t="About"/><p style={{color:"#444", marginBottom:12, fontSize:12, lineHeight:1.7}}>{d.summary}</p></>}
        {d.experience && <><ModHead t="Experience"/>
          {d.experience.split("\n\n").map((b,i)=>(
            <div key={i} style={{marginBottom:12}}>
              {b.split("\n").map((l,j)=>(
                <p key={j} style={{fontWeight:j===0?700:400, color:j===1?"#888":"#222", fontSize:j===1?11:13}}>{l}</p>
              ))}
            </div>
          ))}
        </>}
        {d.education && <><ModHead t="Education"/>
          {d.education.split("\n").map((l,i)=><p key={i} style={{color:"#333", fontSize:12}}>{l}</p>)}
        </>}
      </div>
    </div>
  );
}

function ModHead({ t }) {
  return <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em",
    textTransform:"uppercase", color:"#c9a84c", borderBottom:"2px solid #c9a84c22",
    paddingBottom:4, marginBottom:8, marginTop:16 }}>{t}</div>;
}

function TemplateMinimal({ d }) {
  return (
    <div style={{ fontFamily:"'Crimson Pro','Georgia',serif", background:"#fafafa",
      color:"#1a1a1a", padding:"44px 52px", fontSize:14, lineHeight:1.7 }}>
      <div style={{ borderLeft:"4px solid #1a1a1a", paddingLeft:16, marginBottom:24 }}>
        <h1 style={{ fontSize:32, fontWeight:600, letterSpacing:"-0.03em", lineHeight:1.1 }}>{d.name}</h1>
        {d.role && <div style={{ fontSize:15, color:"#666", fontStyle:"italic", marginTop:4 }}>{d.role}</div>}
        <div style={{ fontSize:12, color:"#888", marginTop:6 }}>
          {[d.email, d.phone, d.location].filter(Boolean).join("  ·  ")}
        </div>
      </div>
      {d.summary && <><MinHead t="Summary"/><p style={{marginBottom:16, color:"#333"}}>{d.summary}</p></>}
      {d.skills && <><MinHead t="Expertise"/><p style={{marginBottom:16, color:"#555", fontStyle:"italic"}}>{d.skills}</p></>}
      {d.experience && <><MinHead t="Experience"/>
        {d.experience.split("\n\n").map((b,i)=>(
          <div key={i} style={{marginBottom:14}}>
            {b.split("\n").map((l,j)=>(
              <p key={j} style={{fontWeight:j===0?600:400, color:j===1?"#888":"#333",
                fontSize:j===1?12:14, fontStyle:j===1?"italic":"normal"}}>{l}</p>
            ))}
          </div>
        ))}
      </>}
      {d.education && <><MinHead t="Education"/>
        {d.education.split("\n").map((l,i)=><p key={i} style={{color:"#444"}}>{l}</p>)}
      </>}
    </div>
  );
}

function MinHead({ t }) {
  return <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.2em",
    textTransform:"uppercase", color:"#1a1a1a", marginBottom:6, marginTop:20 }}>{t}</div>;
}

const TEMPLATES = [
  { id:"classic",  label:"Classic",  desc:"Traditional professional", Comp: TemplateClassic },
  { id:"modern",   label:"Modern",   desc:"Two-column with sidebar",  Comp: TemplateModern  },
  { id:"minimal",  label:"Minimal",  desc:"Clean editorial style",    Comp: TemplateMinimal },
];

const TABS = ["📄 Resume", "✉️ Cover Letter", "💼 LinkedIn Bio"];
const LANGS = [{ v:"en", l:"English" }, { v:"mr", l:"मराठी" }, { v:"hi", l:"हिंदी" }];

// ── MAIN APP ──────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage]           = useState("form"); // form | loading | result
  const [tab, setTab]             = useState(0);
  const [template, setTemplate]   = useState("classic");
  const [lang, setLang]           = useState("en");
  const [loadMsg, setLoadMsg]     = useState("");
  const [results, setResults]     = useState({ resume:null, cover:null, linkedin:null });

  const [f, setF] = useState({
    name:"", email:"", phone:"", location:"",
    role:"", skills:"", experience:"", education:"",
    jobDesc:"", extra:""
  });
  const set = (k,v) => setF(p=>({...p,[k]:v}));

  const canGo = f.name && f.email && f.role;

  const TComp = TEMPLATES.find(t=>t.id===template)?.Comp || TemplateClassic;

  // ── AI CALL ──
  const generate = async () => {
    setPage("loading");

    const langNote = lang === "mr"
      ? "Write the entire resume content in Marathi (Devanagari script). Keep field names in English."
      : lang === "hi"
      ? "Write the entire resume content in Hindi (Devanagari script). Keep field names in English."
      : "Write in professional English.";

    const base = `Name: ${f.name}, Role: ${f.role}, Email: ${f.email}, Phone: ${f.phone}, Location: ${f.location}
Skills: ${f.skills}
Experience: ${f.experience}
Education: ${f.education}
${f.extra ? "Extra: "+f.extra : ""}
${f.jobDesc ? "Job Description: "+f.jobDesc : ""}`;

    const calls = [
      {
        key: "resume",
        msg: "Resume बनवत आहे...",
        prompt: `You are a professional resume writer. ${langNote}
Based on the info below, return ONLY a JSON object with keys: name, email, phone, location, role, summary, skills, experience, education.
- summary: 2-3 sentences, strong and results-focused
- skills: comma-separated, clean
- experience: same structure but polished; use \\n\\n between jobs
- education: clean, one line per degree
Return ONLY valid JSON, no markdown.
${base}`
      },
      {
        key: "cover",
        msg: "Cover Letter लिहित आहे...",
        prompt: `Write a professional cover letter. ${langNote}
${f.jobDesc ? "Target job: "+f.jobDesc : ""}
Candidate: ${base}
Write 3 paragraphs: intro, why you're a great fit, closing. 
Return ONLY the cover letter text, no JSON, no markdown headers.`
      },
      {
        key: "linkedin",
        msg: "LinkedIn Bio तयार करत आहे...",
        prompt: `Write a compelling LinkedIn About section (bio). ${langNote}
Make it first-person, engaging, 3-4 short paragraphs, end with what you're open to.
Candidate: ${base}
Return ONLY the bio text, no JSON, no markdown.`
      }
    ];

    const out = {};
    for (const c of calls) {
      setLoadMsg(c.msg);
      try {
        const res = await fetch("/api/generate", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ prompt: c.prompt })
        });
        const data = await res.json();
        const text = data.content.map(i=>i.text||"").join("");
        if (c.key === "resume") {
          const clean = text.replace(/```json|```/g,"").trim();
          out[c.key] = JSON.parse(clean);
        } else {
          out[c.key] = text.trim();
        }
      } catch(e) {
        if (c.key === "resume") {
          out[c.key] = { ...f, summary: `Dedicated ${f.role} with expertise in ${(f.skills||"").split(",")[0] || "the domain"}.` };
        } else {
          out[c.key] = c.key === "cover"
            ? `Dear Hiring Manager,\n\nI am writing to express my interest in the ${f.role} position. With my background in ${(f.skills||"").split(",")[0]}, I believe I can contribute significantly to your team.\n\nI look forward to discussing this opportunity.\n\nSincerely,\n${f.name}`
            : `${f.role} with a passion for ${(f.skills||"").split(",")[0] || "my field"}. Based in ${f.location||"India"}.\n\nOpen to new opportunities.`;
        }
      }
    }

    setResults(out);
    setPage("result");
  };

  // ── FORM ─────────────────────────────────────────────────────────────────
  if (page === "form") return (
    <>
      <style>{FONTS}{CSS}</style>
      <div style={{ minHeight:"100vh", background:"#0a0a0a", paddingBottom:60 }}>
        {/* Header */}
        <div className="noprint" style={{ borderBottom:"1px solid #171717", padding:"16px 20px",
          display:"flex", alignItems:"center", gap:10, background:"#0a0a0a",
          position:"sticky", top:0, zIndex:10 }}>
          <div style={{ width:30, height:30, borderRadius:7,
            background:"linear-gradient(135deg,#c9a84c,#7a5a10)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>📄</div>
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, color:"#f0ece4" }}>ResumeAI India</div>
            <div style={{ fontSize:9, color:"#444", letterSpacing:"0.1em" }}>AI-POWERED · 4 TOOLS IN ONE</div>
          </div>
          {/* Lang selector */}
          <div style={{ marginLeft:"auto", display:"flex", gap:6 }}>
            {LANGS.map(l => (
              <button key={l.v} onClick={() => setLang(l.v)} style={{
                padding:"5px 12px", borderRadius:20, border:`1px solid ${lang===l.v?"#c9a84c":"#222"}`,
                background: lang===l.v ? "#c9a84c18" : "transparent",
                color: lang===l.v ? "#c9a84c" : "#555", fontSize:11,
                fontFamily:"'DM Sans',sans-serif", cursor:"pointer", transition:"all 0.2s"
              }}>{l.l}</button>
            ))}
          </div>
        </div>

        <div style={{ maxWidth:660, margin:"0 auto", padding:"28px 18px" }}>
          {/* Hero */}
          <div className="fade" style={{ marginBottom:28 }}>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(26px,6vw,38px)",
              fontWeight:900, color:"#f0ece4", lineHeight:1.15, marginBottom:8 }}>
              Professional Resume<br/>
              <span style={{ background:"linear-gradient(90deg,#c9a84c,#f0d080,#c9a84c)",
                backgroundSize:"200% auto", WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent", animation:"shimmer 3s linear infinite" }}>
                AI ने बनवा — मराठी, हिंदी, English
              </span>
            </h1>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {["Resume","Cover Letter","LinkedIn Bio","3 Templates"].map(t => (
                <span key={t} style={{ background:"#c9a84c18", border:"1px solid #c9a84c33",
                  color:"#c9a84c", fontSize:11, padding:"3px 10px", borderRadius:20,
                  fontWeight:600 }}>✓ {t}</span>
              ))}
            </div>
          </div>

          {/* Personal */}
          <Card title="वैयक्तिक माहिती" cls="fade2">
            <Grid2>
              <F label="पूर्ण नाव *"><input value={f.name} onChange={e=>set("name",e.target.value)} placeholder="Rahul Sharma"/></F>
              <F label="Target Job Role *"><input value={f.role} onChange={e=>set("role",e.target.value)} placeholder="Software Engineer"/></F>
              <F label="Email *"><input value={f.email} onChange={e=>set("email",e.target.value)} placeholder="rahul@gmail.com"/></F>
              <F label="Phone"><input value={f.phone} onChange={e=>set("phone",e.target.value)} placeholder="+91 98765 43210"/></F>
            </Grid2>
            <F label="Location"><input value={f.location} onChange={e=>set("location",e.target.value)} placeholder="Mumbai, Maharashtra"/></F>
          </Card>

          {/* Skills & Exp */}
          <Card title="Skills आणि अनुभव" cls="fade3">
            <F label="Skills (comma separated)">
              <input value={f.skills} onChange={e=>set("skills",e.target.value)}
                placeholder="React, JavaScript, Excel, Communication, Team Leadership"/>
            </F>
            <F label="Work Experience">
              <textarea value={f.experience} onChange={e=>set("experience",e.target.value)} rows={5}
                placeholder={"Software Developer – TechCorp, Mumbai (2021–2024)\nBuilt web apps used by 50,000+ users\n\nJunior Dev – StartupXYZ (2019–2021)\nDeveloped internal tools"}/>
            </F>
            <F label="Education">
              <textarea value={f.education} onChange={e=>set("education",e.target.value)} rows={3}
                placeholder={"B.E. Computer Engg – Pune University, 2019\nHSC – Maharashtra Board, 2015"}/>
            </F>
          </Card>

          {/* Optional */}
          <Card title="Optional (Cover Letter साठी)" cls="fade3">
            <F label="Job Description (paste करा)">
              <textarea value={f.jobDesc} onChange={e=>set("jobDesc",e.target.value)} rows={3}
                placeholder="Job posting मधून description paste करा — Cover Letter जास्त specific होईल"/>
            </F>
            <F label="इतर माहिती">
              <textarea value={f.extra} onChange={e=>set("extra",e.target.value)} rows={2}
                placeholder="Awards, certifications, projects, languages spoken..."/>
            </F>
          </Card>

          {/* Template picker */}
          <Card title="Template निवडा" cls="fade3">
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
              {TEMPLATES.map(t => (
                <button key={t.id} onClick={() => setTemplate(t.id)} style={{
                  padding:"14px 10px", borderRadius:10, cursor:"pointer",
                  border:`2px solid ${template===t.id ? "#c9a84c" : "#1e1e1e"}`,
                  background: template===t.id ? "#c9a84c12" : "#0d0d0d",
                  transition:"all 0.2s", textAlign:"center"
                }}>
                  <div style={{ fontSize:18, marginBottom:4 }}>
                    {t.id==="classic"?"🏛️":t.id==="modern"?"⚡":"✦"}
                  </div>
                  <div style={{ fontSize:12, fontWeight:700,
                    color: template===t.id?"#c9a84c":"#888",
                    fontFamily:"'DM Sans',sans-serif" }}>{t.label}</div>
                  <div style={{ fontSize:10, color:"#444",
                    fontFamily:"'DM Sans',sans-serif", marginTop:2 }}>{t.desc}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Submit */}
          <button onClick={generate} disabled={!canGo} style={{
            width:"100%", padding:"16px",
            background: canGo ? "linear-gradient(135deg,#c9a84c,#8B6310)" : "#151515",
            color: canGo ? "#0a0a0a" : "#333",
            border:"none", borderRadius:12, fontFamily:"'DM Sans',sans-serif",
            fontSize:15, fontWeight:700, cursor: canGo?"pointer":"not-allowed",
            boxShadow: canGo?"0 8px 32px rgba(201,168,76,0.3)":"none",
            transition:"all 0.3s", letterSpacing:"0.04em"
          }}>
            ✨ Resume + Cover Letter + LinkedIn Bio बनवा →
          </button>
          {!canGo && <p style={{ textAlign:"center", color:"#3a3a3a", fontSize:12, marginTop:8 }}>
            * नाव, email, job role आवश्यक</p>}
        </div>
      </div>
    </>
  );

  // ── LOADING ───────────────────────────────────────────────────────────────
  if (page === "loading") return (
    <>
      <style>{FONTS}{CSS}</style>
      <div style={{ minHeight:"100vh", background:"#0a0a0a", display:"flex",
        alignItems:"center", justifyContent:"center", padding:20 }}>
        <div className="fade" style={{ textAlign:"center", maxWidth:360 }}>
          <div style={{ width:56, height:56, border:"3px solid #c9a84c",
            borderTopColor:"transparent", borderRadius:"50%", margin:"0 auto 24px",
            animation:"spin 0.9s linear infinite" }}/>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22,
            color:"#f0ece4", marginBottom:8 }}>AI काम करत आहे...</h2>
          <p style={{ color:"#c9a84c", fontSize:14, marginBottom:32 }}>{loadMsg}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {["Resume तयार करत आहे","Cover Letter लिहित आहे","LinkedIn Bio बनवत आहे"].map((t,i) => (
              <div key={i} style={{ background:"#111", borderRadius:8, padding:"10px 16px",
                color:"#3a3a3a", fontSize:12, display:"flex", alignItems:"center", gap:8,
                animation:`fadeUp 0.4s ${i*0.25}s both` }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#c9a84c",
                  animation:`pulse 1.5s ${i*0.3}s infinite` }}/>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  // ── RESULT ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{FONTS}{CSS}</style>
      <div style={{ minHeight:"100vh", background:"#0a0a0a", paddingBottom:60 }}>
        {/* Top bar */}
        <div className="noprint" style={{ borderBottom:"1px solid #171717", padding:"12px 20px",
          display:"flex", alignItems:"center", gap:10, background:"#0a0a0a",
          position:"sticky", top:0, zIndex:10 }}>
          <button onClick={() => setPage("form")} style={{
            background:"transparent", border:"1px solid #222", color:"#666",
            borderRadius:8, padding:"7px 14px", fontFamily:"'DM Sans',sans-serif",
            fontSize:12, cursor:"pointer" }}>← मागे</button>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14,
            fontWeight:700, color:"#f0ece4", marginLeft:4 }}>तुमचे Results</div>
          <button onClick={() => window.print()} style={{
            marginLeft:"auto", background:"#c9a84c", border:"none", color:"#0a0a0a",
            borderRadius:8, padding:"8px 20px", fontFamily:"'DM Sans',sans-serif",
            fontSize:12, fontWeight:700, cursor:"pointer" }}>⬇ PDF Download</button>
        </div>

        <div style={{ maxWidth:760, margin:"0 auto", padding:"24px 18px" }}>
          {/* Tabs */}
          <div className="noprint fade" style={{ display:"flex", gap:6, marginBottom:20,
            background:"#111", borderRadius:12, padding:6 }}>
            {TABS.map((t,i) => (
              <button key={i} onClick={() => setTab(i)} style={{
                flex:1, padding:"10px 8px", borderRadius:8, border:"none",
                background: tab===i ? "#c9a84c" : "transparent",
                color: tab===i ? "#0a0a0a" : "#555",
                fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700,
                cursor:"pointer", transition:"all 0.2s"
              }}>{t}</button>
            ))}
          </div>

          {/* Template switcher (resume tab only) */}
          {tab === 0 && (
            <div className="noprint fade" style={{ display:"flex", gap:6, marginBottom:16 }}>
              {TEMPLATES.map(t => (
                <button key={t.id} onClick={() => setTemplate(t.id)} style={{
                  padding:"6px 14px", borderRadius:20, border:`1px solid ${template===t.id?"#c9a84c":"#222"}`,
                  background: template===t.id?"#c9a84c18":"transparent",
                  color: template===t.id?"#c9a84c":"#555",
                  fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600,
                  cursor:"pointer", transition:"all 0.2s"
                }}>{t.label}</button>
              ))}
            </div>
          )}

          {/* RESUME TAB */}
          {tab === 0 && results.resume && (
            <div className="fade print-area" style={{ borderRadius:6, overflow:"hidden",
              boxShadow:"0 20px 60px rgba(0,0,0,0.6)" }}>
              <TComp d={results.resume}/>
            </div>
          )}

          {/* COVER LETTER TAB */}
          {tab === 1 && results.cover && (
            <div className="fade">
              <div style={{ background:"white", borderRadius:6, padding:"44px 48px",
                boxShadow:"0 20px 60px rgba(0,0,0,0.6)",
                fontFamily:"'Crimson Pro',Georgia,serif", fontSize:14,
                lineHeight:1.85, color:"#1a1a1a", whiteSpace:"pre-wrap" }}>
                <div style={{ marginBottom:24, borderBottom:"1px solid #eee", paddingBottom:16 }}>
                  <div style={{ fontWeight:700, fontSize:16 }}>{results.resume?.name}</div>
                  <div style={{ color:"#888", fontSize:12 }}>
                    {[results.resume?.email, results.resume?.phone].filter(Boolean).join(" · ")}
                  </div>
                </div>
                {results.cover}
              </div>
              <button onClick={() => { navigator.clipboard.writeText(results.cover); }}
                className="noprint" style={{
                  marginTop:12, background:"transparent", border:"1px solid #333",
                  color:"#888", borderRadius:8, padding:"8px 16px",
                  fontFamily:"'DM Sans',sans-serif", fontSize:12, cursor:"pointer" }}>
                📋 Text Copy करा
              </button>
            </div>
          )}

          {/* LINKEDIN TAB */}
          {tab === 2 && results.linkedin && (
            <div className="fade">
              <div style={{ background:"#f8f9fa", borderRadius:12,
                border:"1px solid #e0e0e0", overflow:"hidden",
                boxShadow:"0 20px 60px rgba(0,0,0,0.4)" }}>
                {/* LinkedIn mock header */}
                <div style={{ background:"#0077B5", height:80, position:"relative" }}>
                  <div style={{ position:"absolute", bottom:-28, left:24,
                    width:72, height:72, borderRadius:"50%", background:"#c9a84c",
                    border:"4px solid white", display:"flex", alignItems:"center",
                    justifyContent:"center", fontSize:28, fontWeight:700, color:"#1a1a1a" }}>
                    {(results.resume?.name||"?").charAt(0)}
                  </div>
                </div>
                <div style={{ padding:"40px 24px 24px" }}>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700,
                    fontSize:18, color:"#1a1a1a" }}>{results.resume?.name}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", color:"#555",
                    fontSize:13, marginBottom:16 }}>{results.resume?.role}</div>
                  <div style={{ borderTop:"1px solid #e0e0e0", paddingTop:16 }}>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700,
                      fontSize:14, color:"#1a1a1a", marginBottom:10 }}>About</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13,
                      color:"#333", lineHeight:1.7, whiteSpace:"pre-wrap" }}>
                      {results.linkedin}
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(results.linkedin); }}
                className="noprint" style={{
                  marginTop:12, background:"#0077B5", border:"none",
                  color:"white", borderRadius:8, padding:"10px 20px",
                  fontFamily:"'DM Sans',sans-serif", fontSize:12,
                  fontWeight:700, cursor:"pointer" }}>
                📋 LinkedIn वर Copy करा
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ── Small helper components ──────────────────────────────────────────────
function Card({ title, children, cls }) {
  return (
    <div className={cls} style={{ background:"#0d0d0d", border:"1px solid #1a1a1a",
      borderRadius:14, padding:"18px 18px 6px", marginBottom:14 }}>
      <div style={{ fontSize:10, letterSpacing:"0.16em", color:"#c9a84c",
        fontWeight:700, textTransform:"uppercase", marginBottom:14 }}>{title}</div>
      {children}
    </div>
  );
}
function F({ label, children }) {
  return <div style={{ marginBottom:13 }}><label>{label}</label>{children}</div>;
}
function Grid2({ children }) {
  return <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>{children}</div>;
}
