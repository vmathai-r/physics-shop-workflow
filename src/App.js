import { useState, useEffect } from "react";

const CONFIG = {
  APP_URL:       process.env.REACT_APP_APP_URL || "",
  AT_TOKEN:      process.env.REACT_APP_AT_TOKEN || "",
  AT_BASE:       process.env.REACT_APP_AT_BASE || "",
  AT_TABLE:      "Jobs",
  W3F_KEY:       "417f889e-7a74-4972-b726-22d2ead06191",
  SHOP_EMAIL:    "wrp@physics.umass.edu",
  NOTIFY_EMAIL:  "vmathai@umass.edu",
};

const AT = {
  url: () => "https://api.airtable.com/v0/" + CONFIG.AT_BASE + "/" + CONFIG.AT_TABLE,
  h:   () => ({ Authorization: "Bearer " + CONFIG.AT_TOKEN, "Content-Type": "application/json" }),
  async create(f)    { return (await fetch(AT.url(), { method:"POST", headers:AT.h(), body:JSON.stringify({fields:f}) })).json(); },
  async update(id,f) { return (await fetch(AT.url()+"/"+id, { method:"PATCH", headers:AT.h(), body:JSON.stringify({fields:f}) })).json(); },
  async find(jobId)  {
    const q = encodeURIComponent('{JobID}="'+jobId+'"');
    const d = await (await fetch(AT.url()+"?filterByFormula="+q,{headers:AT.h()})).json();
    return d.records && d.records[0] ? d.records[0] : null;
  },
  async nextId() {
    const d = await (await fetch(AT.url()+"?fields[]=JobID&sort[0][field]=Timestamp&sort[0][direction]=desc&maxRecords=1",{headers:AT.h()})).json();
    if (!d.records||!d.records.length) return "JOB-0001";
    const n = parseInt((d.records[0].fields.JobID||"JOB-0000").replace("JOB-",""))+1;
    return "JOB-"+String(n).padStart(4,"0");
  }
};

async function sendEmail(to, subject, message) {
  const r = await fetch("https://api.web3forms.com/submit", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ access_key:CONFIG.W3F_KEY, subject, message, to_email:to, from_name:"Physics Machine Shop" }),
  });
  return r.ok;
}

function getView() {
  const hash = window.location.hash || "#intake";
  const [path, query] = hash.slice(1).split("?");
  const p = {};
  if (query) query.split("&").forEach(s => { const [k,v]=s.split("="); p[k]=decodeURIComponent(v||""); });
  return { view: path||"intake", params: p };
}

const css = `@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--m:#881C1C;--md:#5c1212;--ml:#f9f0f0;--g:#c8a951;--ink:#1a1a1a;--mu:#666;--bo:#d8d0c8;--bg:#faf8f5;--wh:#fff;--r:4px;--sh:0 2px 12px rgba(0,0,0,.08)}
body{font-family:'EB Garamond',Georgia,serif;font-size:17px;line-height:1.6;color:var(--ink);background:var(--bg);min-height:100vh}
.ah{background:var(--m);color:#fff;border-bottom:3px solid var(--g)}
.hi{max-width:960px;margin:0 auto;padding:20px 24px 18px;display:flex;align-items:center;gap:16px}
.hb{width:44px;height:44px;background:var(--g);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.ht{font-size:13px;text-transform:uppercase;letter-spacing:.12em;opacity:.8;font-family:'DM Mono',monospace}
.hs{font-size:20px;font-weight:600;line-height:1.2;margin-top:1px}
.nav{background:var(--md);padding:0 24px}
.navi{max-width:960px;margin:0 auto;display:flex;gap:0}
.nt2{padding:10px 20px 10px 0;font-size:12px;font-family:'DM Mono',monospace;color:rgba(255,255,255,.5);cursor:pointer;border-bottom:2px solid transparent;transition:all .15s}
.nt2.active{color:var(--g);border-bottom-color:var(--g)}
.nt2:hover:not(.active){color:rgba(255,255,255,.8)}
.main{max-width:960px;margin:0 auto;padding:40px 24px 60px}
.st{font-size:26px;font-weight:600;color:var(--m);margin-bottom:6px}
.sd{color:var(--mu);font-size:15px;font-family:'DM Mono',monospace;margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid var(--bo)}
.card{background:var(--wh);border:1px solid var(--bo);border-radius:var(--r);padding:28px;margin-bottom:28px;box-shadow:var(--sh)}
.ct{font-size:13px;font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.1em;color:var(--m);margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid var(--ml);display:flex;align-items:center;gap:8px}
.fi{margin-bottom:20px}.fi:last-child{margin-bottom:0}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:16px}
label{display:block;font-size:13px;font-family:'DM Mono',monospace;color:var(--mu);text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
label .rq{color:var(--m);margin-left:2px}
input,select,textarea{width:100%;padding:10px 14px;border:1px solid var(--bo);border-radius:var(--r);font-family:'EB Garamond',Georgia,serif;font-size:16px;color:var(--ink);background:var(--bg);transition:border-color .15s,box-shadow .15s;outline:none;-webkit-appearance:none}
input:focus,select:focus,textarea:focus{border-color:var(--m);box-shadow:0 0 0 3px rgba(136,28,28,.1);background:var(--wh)}
textarea{resize:vertical;min-height:80px}
.hp{font-size:13px;color:var(--mu);margin-top:5px;font-family:'DM Mono',monospace}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;font-family:'DM Mono',monospace;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;border:none;border-radius:var(--r);cursor:pointer;transition:all .15s}
.bp{background:var(--m);color:#fff}.bp:hover:not(:disabled){background:var(--md);transform:translateY(-1px)}.bp:disabled{opacity:.6;cursor:not-allowed}
.ba{background:#1a5c2a;color:#fff;font-size:14px;padding:14px 32px}.ba:hover:not(:disabled){background:#134520;transform:translateY(-1px)}
.bc{background:#fff;color:#7a4f00;border:2px solid #7a4f00;font-size:14px;padding:14px 32px}.bc:hover:not(:disabled){background:#fdf6e3}
.bg2{display:flex;gap:16px;flex-wrap:wrap;margin-top:32px;padding-top:24px;border-top:1px solid var(--bo)}
.ae{background:#fdf0f0;color:#8b1c1c;border-left:4px solid #8b1c1c;padding:16px 20px;border-radius:var(--r);font-size:15px;margin-bottom:24px}
.js{background:var(--ml);border:1px solid #e8d4d4;border-radius:var(--r);padding:20px;margin-bottom:28px}
.jst{font-size:12px;font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.1em;color:var(--m);margin-bottom:12px}
.jsg{display:grid;grid-template-columns:1fr 1fr;gap:8px 20px}
.ji{font-size:14px}.ji span{font-family:'DM Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--mu);display:block}
.sp{text-align:center;padding:60px 20px}
.si2{font-size:56px;margin-bottom:20px}.st2{font-size:28px;color:var(--m);margin-bottom:8px}.ss{color:var(--mu);font-size:15px;max-width:400px;margin:0 auto}
.jib{display:inline-block;background:var(--m);color:#fff;font-family:'DM Mono',monospace;font-size:15px;padding:6px 16px;border-radius:20px;margin:16px 0;letter-spacing:.05em}
.rg{display:flex;flex-direction:column;gap:10px}
.ro{display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid var(--bo);border-radius:var(--r);cursor:pointer;transition:all .15s;background:var(--bg)}
.ro:hover,.ro.sel{border-color:var(--m);background:var(--ml)}
.ro input[type="radio"]{width:18px;height:18px;flex-shrink:0}.rl{font-size:16px;cursor:pointer}
.notice{background:var(--ml);border:1px solid #e8d4d4;border-radius:var(--r);padding:14px 18px;font-size:14px;color:var(--md);margin-bottom:24px;font-family:'DM Mono',monospace}
.sp2{display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:600px){.fr,.jsg{grid-template-columns:1fr}.bg2{flex-direction:column}}`;

function Bar({label, value, max, color}) {
  const pct = max > 0 ? (value/max)*100 : 0;
  return <div style={{marginBottom:10}}>
    <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontFamily:"'DM Mono',monospace",marginBottom:4}}>
      <span style={{color:"var(--ink)"}}>{label}</span>
      <span style={{color:"var(--mu)",fontWeight:600}}>{typeof value === "number" ? value : value}</span>
    </div>
    <div style={{background:"var(--bo)",borderRadius:3,height:8}}>
      <div style={{background:color||"var(--m)",borderRadius:3,height:8,width:pct+"%",transition:"width .4s"}} />
    </div>
  </div>;
}

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const RATE = 75;

  useEffect(() => {
    async function load() {
      let all = []; let offset = null;
      do {
        const url = AT.url()+"?pageSize=100"+(offset?"&offset="+offset:"");
        const d = await (await fetch(url,{headers:AT.h()})).json();
        all = all.concat(d.records||[]);
        offset = d.offset;
      } while(offset);
      setJobs(all.map(r=>r.fields));
      setLoading(false);
    }
    load();
  },[]);

  if (loading) return <div style={{padding:"60px",textAlign:"center",color:"var(--mu)",fontFamily:"'DM Mono',monospace"}}>Loading dashboard data…</div>;
  if (!jobs.length) return <div style={{padding:"60px",textAlign:"center"}}><div style={{fontSize:48,marginBottom:16}}>📋</div><p style={{color:"var(--mu)",fontFamily:"'DM Mono',monospace"}}>No jobs yet. Submit the first one!</p><br/><a href="/#intake" style={{color:"var(--m)"}}>Go to intake form</a></div>;

  const total = jobs.length;
  const byStatus = {}; const byDept = {}; const byType = {}; const byPI = {};
  let totalHrs = 0; let approvedHrs = 0; let approvedCount = 0;

  jobs.forEach(j => {
    const st = j.Status||"Unknown";
    byStatus[st] = (byStatus[st]||0)+1;
    byDept[j.Department||"Unknown"] = (byDept[j.Department||"Unknown"]||0)+1;
    byType[j.JobType||"Unknown"] = (byType[j.JobType||"Unknown"]||0)+1;
    const pi = j.FacultyName||"Unknown";
    if (!byPI[pi]) byPI[pi] = {jobs:0,hrs:0};
    byPI[pi].jobs++;
    const h = parseFloat(j.HoursEst)||0;
    totalHrs += h; byPI[pi].hrs += h;
    if (st==="Approved") { approvedHrs += h; approvedCount++; }
  });

  const SC = {"Pending Shop Review":"#c8a951","Pending PI Approval":"#2563eb","Approved":"#1a5c2a","Needs Clarification":"#7a4f00"};
  const maxDept = Math.max(...Object.values(byDept));
  const maxPI = Math.max(...Object.values(byPI).map(v=>v.jobs));

  const Stat = ({label,val,sub,color}) => <div style={{background:"var(--wh)",border:"1px solid var(--bo)",borderRadius:"var(--r)",padding:"20px 24px",boxShadow:"var(--sh)",borderTop:"3px solid "+(color||"var(--m)")}}>
    <div style={{fontSize:11,fontFamily:"'DM Mono',monospace",textTransform:"uppercase",letterSpacing:".1em",color:"var(--mu)",marginBottom:8}}>{label}</div>
    <div style={{fontSize:30,fontWeight:600,color:color||"var(--ink)",lineHeight:1,fontFamily:"'DM Mono',monospace"}}>{val}</div>
    {sub && <div style={{fontSize:12,color:"var(--mu)",marginTop:6,fontFamily:"'DM Mono',monospace"}}>{sub}</div>}
  </div>;

  return <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:32}}>
      <Stat label="Total Jobs" val={total} sub="all time" color="var(--m)" />
      <Stat label="Hours Estimated" val={totalHrs.toFixed(1)} sub="across all jobs" color="#2563eb" />
      <Stat label="Est. Revenue" val={"$"+Math.round(totalHrs*RATE).toLocaleString()} sub={"@ $"+RATE+"/hr"} color="#1a5c2a" />
      <Stat label="Approved" val={approvedCount} sub={"$"+Math.round(approvedHrs*RATE).toLocaleString()+" confirmed"} color="#c8a951" />
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:24}}>
      <div className="card">
        <div className="ct">By Status</div>
        {Object.entries(byStatus).sort((a,b)=>b[1]-a[1]).map(([s,n])=>
          <Bar key={s} label={s} value={n} max={total} color={SC[s]||"#999"} />
        )}
      </div>
      <div className="card">
        <div className="ct">By Job Type</div>
        {Object.entries(byType).sort((a,b)=>b[1]-a[1]).map(([t,n])=>
          <Bar key={t} label={t} value={n} max={total} color="var(--m)" />
        )}
      </div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:24}}>
      <div className="card">
        <div className="ct">By Department</div>
        {Object.entries(byDept).sort((a,b)=>b[1]-a[1]).map(([d,n])=>
          <Bar key={d} label={d} value={n} max={maxDept} color="#2563eb" />
        )}
      </div>
      <div className="card">
        <div className="ct">By PI / Faculty</div>
        {Object.entries(byPI).sort((a,b)=>b[1].jobs-a[1].jobs).map(([pi,v])=>
          <Bar key={pi} label={pi} value={v.jobs+" job"+(v.jobs!==1?"s":"")+(v.hrs?" · "+v.hrs.toFixed(1)+" hrs":"")} max={maxPI} color="var(--g)" />
        )}
      </div>
    </div>

    <div className="card">
      <div className="ct">All Jobs</div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:14}}>
          <thead><tr style={{borderBottom:"2px solid var(--bo)"}}>
            {["Job ID","Submitter","PI","Dept","Job","Type","Hrs","Status","Speedtype"].map(h=>
              <th key={h} style={{textAlign:"left",padding:"8px 12px",fontFamily:"'DM Mono',monospace",fontSize:11,textTransform:"uppercase",letterSpacing:".08em",color:"var(--mu)",whiteSpace:"nowrap"}}>{h}</th>
            )}
          </tr></thead>
          <tbody>
            {[...jobs].sort((a,b)=>(b.Timestamp||"").localeCompare(a.Timestamp||"")).map((j,i)=>{
              const sc = SC[j.Status||""]||"#999";
              return <tr key={i} style={{borderBottom:"1px solid var(--bo)"}}>
                <td style={{padding:"8px 12px",fontFamily:"'DM Mono',monospace",fontSize:12,color:"var(--m)",fontWeight:600,whiteSpace:"nowrap"}}>{j.JobID||"—"}</td>
                <td style={{padding:"8px 12px",whiteSpace:"nowrap"}}>{j.SubmitterName||"—"}</td>
                <td style={{padding:"8px 12px",whiteSpace:"nowrap"}}>{j.FacultyName||"—"}</td>
                <td style={{padding:"8px 12px",whiteSpace:"nowrap",fontSize:13}}>{j.Department||"—"}</td>
                <td style={{padding:"8px 12px",maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{j.JobName||"—"}</td>
                <td style={{padding:"8px 12px",whiteSpace:"nowrap",fontSize:12}}>{j.JobType||"—"}</td>
                <td style={{padding:"8px 12px",fontFamily:"'DM Mono',monospace",fontSize:12,whiteSpace:"nowrap"}}>{j.HoursEst?j.HoursEst+" h":"—"}</td>
                <td style={{padding:"8px 12px",whiteSpace:"nowrap"}}>
                  <span style={{background:sc+"22",color:sc,border:"1px solid "+sc+"44",borderRadius:20,padding:"2px 10px",fontSize:11,fontFamily:"'DM Mono',monospace"}}>{j.Status||"—"}</span>
                </td>
                <td style={{padding:"8px 12px",fontFamily:"'DM Mono',monospace",fontSize:12}}>{j.Speedtype||"—"}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>;
}

function IntakeForm() {
  const [f, sF] = useState({name:"",email:"",phone:"",piName:"",piEmail:"",dept:"",type:"",job:"",drawings:"",stock:""});
  const [st, sSt] = useState(null);
  const [id, sId] = useState("");
  const set = k => e => sF(p=>({...p,[k]:e.target.value}));

  async function submit(e) {
    e.preventDefault(); sSt("sub");
    try {
      const jid = await AT.nextId(); sId(jid);
      await AT.create({JobID:jid,SubmitterName:f.name,SubmitterEmail:f.email,Phone:f.phone,FacultyName:f.piName,PIEmail:f.piEmail,Department:f.dept,JobType:f.type,JobName:f.job,Drawings:f.drawings,Stock:f.stock,Status:"Pending Shop Review",Timestamp:new Date().toISOString()});
      const link = (CONFIG.APP_URL||window.location.origin)+"/#review?job="+jid;
      const msg = "New job submitted.\n\nJob ID: "+jid+"\nJob: "+f.job+"\nFrom: "+f.name+" <"+f.email+">\nPI: "+f.piName+" <"+f.piEmail+">\nDept: "+f.dept+"\nType: "+f.type+"\n\nEnter estimate:\n"+link;
      await sendEmail(CONFIG.SHOP_EMAIL,"[New Shop Job] "+jid+": "+f.job,msg);
      await sendEmail(CONFIG.NOTIFY_EMAIL,"[New Shop Job] "+jid+": "+f.job,msg);
      sSt("ok");
    } catch(err){console.error(err);sSt("err");}
  }

  if (st==="ok") return <div className="sp"><div className="si2">📋</div><h2 className="st2">Job Submitted</h2><div className="jib">{id}</div><p className="ss">Your request has been received. The shop will be in touch.</p></div>;
  return <form onSubmit={submit}>
    <div className="card"><div className="ct">👤 Contact</div>
      <div className="fr"><div className="fi"><label>Your name <span className="rq">*</span></label><input required value={f.name} onChange={set("name")}/></div><div className="fi"><label>Email <span className="rq">*</span></label><input required type="email" value={f.email} onChange={set("email")}/></div></div>
      <div className="fr"><div className="fi"><label>Phone</label><input value={f.phone} onChange={set("phone")}/></div><div className="fi"><label>Department <span className="rq">*</span></label><input required value={f.dept} onChange={set("dept")}/></div></div>
    </div>
    <div className="card"><div className="ct">🏛️ Faculty / PI</div>
      <div className="notice">The PI will receive an approval request once the shop estimates the job.</div>
      <div className="fr"><div className="fi"><label>PI name <span className="rq">*</span></label><input required value={f.piName} onChange={set("piName")}/></div><div className="fi"><label>PI email <span className="rq">*</span></label><input required type="email" value={f.piEmail} onChange={set("piEmail")} placeholder="pi@umass.edu"/><p className="hp">Will receive the approval request</p></div></div>
    </div>
    <div className="card"><div className="ct">🔧 Job</div>
      <div className="fi"><label>Job description <span className="rq">*</span></label><input required value={f.job} onChange={set("job")}/></div>
      <div className="fr"><div className="fi"><label>Job type <span className="rq">*</span></label><select required value={f.type} onChange={set("type")}><option value="">Select…</option><option>Research</option><option>Physics Teaching Labs</option><option>Physics/Astronomy lecture prep</option><option>Other Dept support</option></select></div><div className="fi"><label>Drawings</label><input value={f.drawings} onChange={set("drawings")} placeholder="0"/></div></div>
      <div className="fi"><label>Stock / special items</label><textarea value={f.stock} onChange={set("stock")} rows={3}/><p className="hp">Shop stock charged at replacement cost.</p></div>
    </div>
    {st==="err"&&<div className="ae">Something went wrong. Please try again.</div>}
    <div className="notice" style={{fontSize:13}}>All dimensions must be in inches. Questions? Email wrp@physics.umass.edu</div>
    <button type="submit" className="btn bp" disabled={st==="sub"}>{st==="sub"?<><span className="sp2"/> Submitting…</>:"Submit Job Request →"}</button>
  </form>;
}

function ShopReview({jobId}) {
  const [rec,sR]=useState(null);const [ld,sL]=useState(true);
  const [f,sF]=useState({hrs:"",sd:"",ed:"",notes:""});const [st,sSt]=useState(null);
  const set=k=>e=>sF(p=>({...p,[k]:e.target.value}));
  useEffect(()=>{if(jobId)AT.find(jobId).then(r=>{sR(r);sL(false);});},[jobId]);

  async function submit(e){
    e.preventDefault();sSt("sub");
    try{
      await AT.update(rec.id,{Status:"Pending PI Approval",HoursEst:f.hrs,StartDate:f.sd,CompletionDate:f.ed,ShopNotes:f.notes});
      const j=rec.fields;
      const link=(CONFIG.APP_URL||window.location.origin)+"/#approve?job="+jobId;
      const msg="Dear "+j.FacultyName+",\n\n"+j.SubmitterName+" submitted a shop job requiring your approval.\n\nJob: "+j.JobName+"\nID: "+jobId+"\nType: "+j.JobType+"\n\nEstimate:\nHours: "+f.hrs+" hrs\nStart: "+f.sd+"\nCompletion: "+f.ed+(f.notes?"\nNotes: "+f.notes:"")+"\n\nApprove or request clarification:\n"+link+"\n\nPhysics & Astronomy Machine Shop | HAS 6 | wrp@physics.umass.edu";
      await sendEmail(j.PIEmail,"[Action Required] Approve Shop Job "+jobId+": "+j.JobName,msg);
      await sendEmail(CONFIG.NOTIFY_EMAIL,"[Shop] "+jobId+" estimate submitted, PI notified",msg);
      sSt("ok");
    }catch(err){console.error(err);sSt("err");}
  }

  if(ld)return<p style={{color:"var(--mu)"}}>Loading…</p>;
  if(!rec)return<div className="ae">Job {jobId} not found.</div>;
  const j=rec.fields;
  if(st==="ok")return<div className="sp"><div className="si2">📨</div><h2 className="st2">Estimate Submitted</h2><div className="jib">{jobId}</div><p className="ss">{j.FacultyName} has been emailed an approval request.</p></div>;
  return<form onSubmit={submit}>
    <div className="js"><div className="jst">Job Summary — {jobId}</div><div className="jsg">
      <div className="ji"><span>Submitted by</span>{j.SubmitterName}</div><div className="ji"><span>Faculty/PI</span>{j.FacultyName}</div>
      <div className="ji"><span>Dept</span>{j.Department}</div><div className="ji"><span>Job</span>{j.JobName}</div>
      <div className="ji"><span>Type</span>{j.JobType}</div><div className="ji"><span>Drawings</span>{j.Drawings||"—"}</div>
    </div></div>
    <div className="card"><div className="ct">⏱ Your Estimate</div>
      <div className="fi"><label>Hours <span className="rq">*</span></label><input required type="number" min="0.5" step="0.5" value={f.hrs} onChange={set("hrs")} placeholder="e.g. 4.5"/></div>
      <div className="fr"><div className="fi"><label>Start date <span className="rq">*</span></label><input required type="date" value={f.sd} onChange={set("sd")}/></div><div className="fi"><label>Completion <span className="rq">*</span></label><input required type="date" value={f.ed} onChange={set("ed")}/></div></div>
      <div className="fi"><label>Notes for PI</label><textarea value={f.notes} onChange={set("notes")} rows={3}/></div>
    </div>
    {st==="err"&&<div className="ae">Something went wrong. Please try again.</div>}
    <button type="submit" className="btn bp" disabled={st==="sub"}>{st==="sub"?<><span className="sp2"/> Submitting…</>:"Submit & Notify PI →"}</button>
  </form>;
}

function PIApproval({jobId}) {
  const [rec,sR]=useState(null);const [ld,sL]=useState(true);
  const [dec,sDec]=useState("");const [com,sCom]=useState("");const [spd,sSpd]=useState("");const [st,sSt]=useState(null);
  useEffect(()=>{if(jobId)AT.find(jobId).then(r=>{sR(r);sL(false);});},[jobId]);

  async function submit(e){
    e.preventDefault();if(!dec)return;sSt("sub");
    try{
      const ok=dec==="approve";const sv=ok?"Approved":"Needs Clarification";
      await AT.update(rec.id,{Status:sv,PIDecision:dec,PIComments:com,...(ok&&spd?{Speedtype:spd}:{})});
      const j=rec.fields;
      await sendEmail(CONFIG.SHOP_EMAIL,"[Shop] "+jobId+" — "+sv,"PI response for "+jobId+" ("+j.JobName+"): "+sv+(ok&&spd?"\nSpeedtype: "+spd:"")+(com?"\nComments: "+com:"")+"\nPI: "+j.FacultyName+"\nSubmitter: "+j.SubmitterName);
      await sendEmail(j.SubmitterEmail,"Your shop job "+jobId+" — "+sv,"Hello "+j.SubmitterName+",\n\nYour job '"+j.JobName+"' ("+jobId+") status: "+sv+"\n\n"+(ok?"Approved! The shop will be in touch.":"The PI will contact you for clarification.")+(com?"\n\nPI comments: "+com:"")+"\n\nPhysics & Astronomy Machine Shop | UMass Amherst");
      await sendEmail(CONFIG.NOTIFY_EMAIL,"[Shop] "+jobId+" — "+sv,"PI "+j.FacultyName+" responded: "+sv+"\nJob: "+j.JobName+"\nSubmitter: "+j.SubmitterName);
      sSt("ok");
    }catch(err){console.error(err);sSt("err");}
  }

  if(ld)return<p style={{color:"var(--mu)"}}>Loading…</p>;
  if(!rec)return<div className="ae">Job {jobId} not found.</div>;
  const j=rec.fields;const ok=dec==="approve";
  if(st==="ok")return<div className="sp"><div className="si2">{ok?"✅":"💬"}</div><h2 className="st2">{ok?"Job Approved":"Clarification Requested"}</h2><div className="jib">{jobId}</div><p className="ss">{ok?"The shop has been notified and will proceed.":"The shop and submitter have been notified."}</p></div>;
  return<form onSubmit={submit}>
    <div className="js"><div className="jst">Job Details — {jobId}</div><div className="jsg">
      <div className="ji"><span>Job</span>{j.JobName}</div><div className="ji"><span>Submitted by</span>{j.SubmitterName}</div>
      <div className="ji"><span>Type</span>{j.JobType}</div><div className="ji"><span>Dept</span>{j.Department}</div>
    </div></div>
    {j.HoursEst&&<div className="card"><div className="ct">⏱ Shop Estimate</div><div className="jsg">
      <div className="ji"><span>Hours</span>{j.HoursEst} hrs</div><div className="ji"><span>Start</span>{j.StartDate}</div>
      <div className="ji"><span>Completion</span>{j.CompletionDate}</div>{j.ShopNotes&&<div className="ji"><span>Notes</span>{j.ShopNotes}</div>}
    </div></div>}
    <div className="card"><div className="ct">✍️ Your Decision</div>
      <div className="fi"><div className="rg">
        <label className={"ro"+(dec==="approve"?" sel":"")} onClick={()=>sDec("approve")}><input type="radio" name="d" checked={dec==="approve"} onChange={()=>sDec("approve")}/><span className="rl">✅ Approve — please proceed</span></label>
        <label className={"ro"+(dec==="clarify"?" sel":"")} onClick={()=>sDec("clarify")}><input type="radio" name="d" checked={dec==="clarify"} onChange={()=>sDec("clarify")}/><span className="rl">💬 Needs clarification — I will contact the shop</span></label>
      </div></div>
      <div className="fi" style={{marginTop:16}}><label>Comments (optional)</label><textarea value={com} onChange={e=>sCom(e.target.value)} rows={3}/></div>
      {dec==="approve"&&<div className="fi" style={{marginTop:16,paddingTop:16,borderTop:"1px solid var(--bo)"}}><label>Account / speedtype <span className="rq">*</span></label><input required={dec==="approve"} value={spd} onChange={e=>sSpd(e.target.value)} placeholder="e.g. 12345678"/><p className="hp">Required to authorize charges.</p></div>}
    </div>
    {st==="err"&&<div className="ae">Something went wrong. Please try again.</div>}
    <div className="bg2">
      <button type="submit" className="btn ba" disabled={dec!=="approve"||st==="sub"} onClick={()=>sDec("approve")}>{st==="sub"&&dec==="approve"?<><span className="sp2"/> Submitting…</>:"✅ Approve Job"}</button>
      <button type="submit" className="btn bc" disabled={dec!=="clarify"||st==="sub"} onClick={()=>sDec("clarify")}>{st==="sub"&&dec==="clarify"?<><span className="sp2"/> Submitting…</>:"💬 Needs Clarification"}</button>
    </div>
  </form>;
}

export default function App() {
  const [{view,params},sR] = useState(getView);
  useEffect(()=>{const h=()=>sR(getView());window.addEventListener("hashchange",h);return()=>window.removeEventListener("hashchange",h);},[]);

  const tabs=[
    {id:"intake",label:"Job Intake"},
    {id:"review",label:"Shop Review"},
    {id:"approve",label:"PI Approval"},
    {id:"dashboard",label:"Dashboard"},
  ];

  const meta={
    intake:{t:"Job Intake Form",d:"Submit a new machine shop job request"},
    review:{t:"Shop Review",d:"Enter your estimate for "+(params.job||"…")},
    approve:{t:"PI Approval",d:"Review and approve "+(params.job||"…")},
    dashboard:{t:"Department Dashboard",d:"Live overview of all jobs, hours, and revenue estimates"},
  }[view]||{t:"Job Intake Form",d:""};

  return <>
    <style>{css}</style>
    <header className="ah">
      <div className="hi"><div className="hb">⚙️</div><div><div className="ht">University of Massachusetts Amherst</div><div className="hs">Physics & Astronomy Machine Shop</div></div></div>
      <nav className="nav"><div className="navi">
        {tabs.map(t=><a key={t.id} className={"nt2"+(view===t.id?" active":"")} href={"/#"+t.id} onClick={e=>{e.preventDefault();window.location.hash="#"+t.id;}}>{t.label}</a>)}
      </div></nav>
    </header>
    <main className="main">
      <h1 className="st">{meta.t}</h1><p className="sd">{meta.d}</p>
      {view==="intake"&&<IntakeForm/>}
      {view==="review"&&<ShopReview jobId={params.job}/>}
      {view==="approve"&&<PIApproval jobId={params.job}/>}
      {view==="dashboard"&&<Dashboard/>}
    </main>
  </>;
}
