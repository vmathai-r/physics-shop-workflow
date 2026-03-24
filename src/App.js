import { useState, useEffect } from "react";

var _t1="patmQEdq0ca8XAH",_t2="jo.277e11c1a3fa3ae2eb367b0c40b9023bd94214e6a0e6c14df57a35705bcb4b7d";
var AT_TOKEN=_t1+_t2,AT_BASE="apprqBhq3q6jtyyEI",AT_TABLE="Jobs";
var W3F="417f889e-7a74-4972-b726-22d2ead06191";
var SHOP="wrp@physics.umass.edu",NOTIFY="vmathai@umass.edu";

var AT={
  url:function(){return"https://api.airtable.com/v0/"+AT_BASE+"/"+AT_TABLE;},
  h:function(){return{Authorization:"Bearer "+AT_TOKEN,"Content-Type":"application/json"};},
  create:async function(f){return(await fetch(AT.url(),{method:"POST",headers:AT.h(),body:JSON.stringify({fields:f})})).json();},
  update:async function(id,f){return(await fetch(AT.url()+"/"+id,{method:"PATCH",headers:AT.h(),body:JSON.stringify({fields:f})})).json();},
  find:async function(j){var q=encodeURIComponent('{JobID}="'+j+'"');var d=await(await fetch(AT.url()+"?filterByFormula="+q,{headers:AT.h()})).json();return d.records&&d.records[0]?d.records[0]:null;},
  nextId:async function(){var d=await(await fetch(AT.url()+"?fields[]=JobID&sort[0][field]=Timestamp&sort[0][direction]=desc&maxRecords=1",{headers:AT.h()})).json();if(!d.records||!d.records.length)return"JOB-0001";var n=parseInt((d.records[0].fields.JobID||"JOB-0000").replace("JOB-",""))+1;return"JOB-"+String(n).padStart(4,"0");}
};

async function mail(to,subj,msg){var r=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({access_key:W3F,subject:subj,message:msg,to_email:to,from_name:"Physics Machine Shop"})});return r.ok;}

function gv(){var h=window.location.hash||"#intake";var pts=h.slice(1).split("?");var p={};if(pts[1])pts[1].split("&").forEach(function(s){var kv=s.split("=");p[kv[0]]=decodeURIComponent(kv[1]||"");});return{view:pts[0]||"intake",params:p};}
function ou(){return window.location.origin;}

var css=`@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600&family=DM+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{--m:#881C1C;--md:#5c1212;--ml:#f9f0f0;--g:#c8a951;--ink:#1a1a1a;--mu:#666;--bo:#d8d0c8;--bg:#faf8f5;--wh:#fff;--r:4px;--sh:0 2px 12px rgba(0,0,0,.08)}
body{font-family:'EB Garamond',Georgia,serif;font-size:17px;line-height:1.6;color:var(--ink);background:var(--bg);min-height:100vh}
.ah{background:var(--m);color:#fff;border-bottom:3px solid var(--g)}
.hi{max-width:960px;margin:0 auto;padding:20px 24px;display:flex;align-items:center;gap:16px}
.hb{width:44px;height:44px;background:var(--g);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px}
.ht{font-size:13px;text-transform:uppercase;letter-spacing:.12em;opacity:.8;font-family:'DM Mono',monospace}
.hs{font-size:20px;font-weight:600}
.nav{background:var(--md);padding:0 24px}
.navi{max-width:960px;margin:0 auto;display:flex}
.nt{padding:10px 20px 10px 0;font-size:12px;font-family:'DM Mono',monospace;color:rgba(255,255,255,.5);text-decoration:none;border-bottom:2px solid transparent;display:inline-block}
.nt.active{color:var(--g);border-bottom-color:var(--g)}
.main{max-width:960px;margin:0 auto;padding:40px 24px 60px}
.st{font-size:26px;font-weight:600;color:var(--m);margin-bottom:6px}
.sd{color:var(--mu);font-size:15px;font-family:'DM Mono',monospace;margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid var(--bo)}
.card{background:var(--wh);border:1px solid var(--bo);border-radius:var(--r);padding:28px;margin-bottom:24px;box-shadow:var(--sh)}
.ct{font-size:12px;font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.1em;color:var(--m);margin-bottom:18px;padding-bottom:10px;border-bottom:1px solid var(--ml)}
.fi{margin-bottom:18px}.fi:last-child{margin-bottom:0}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:16px}
label{display:block;font-size:12px;font-family:'DM Mono',monospace;color:var(--mu);text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px}
.rq{color:var(--m)}
input,select,textarea{width:100%;padding:10px 14px;border:1px solid var(--bo);border-radius:var(--r);font-family:'EB Garamond',Georgia,serif;font-size:16px;color:var(--ink);background:var(--bg);outline:none;-webkit-appearance:none;transition:border-color .15s}
input:focus,select:focus,textarea:focus{border-color:var(--m);background:var(--wh)}
textarea{resize:vertical;min-height:80px}
.hp{font-size:12px;color:var(--mu);margin-top:4px;font-family:'DM Mono',monospace}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;font-family:'DM Mono',monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;border:none;border-radius:var(--r);cursor:pointer}
.bp{background:var(--m);color:#fff}.bp:disabled{opacity:.6;cursor:not-allowed}
.ba{background:#1a5c2a;color:#fff;font-size:14px;padding:14px 32px}
.bc{background:#fff;color:#7a4f00;border:2px solid #7a4f00;font-size:14px;padding:14px 32px}
.bg{display:flex;gap:16px;margin-top:28px;padding-top:24px;border-top:1px solid var(--bo)}
.err{background:#fdf0f0;color:#8b1c1c;border-left:4px solid #8b1c1c;padding:14px 18px;border-radius:var(--r);margin-bottom:20px;font-size:14px}
.js{background:var(--ml);border:1px solid #e8d4d4;border-radius:var(--r);padding:18px;margin-bottom:24px}
.jst{font-size:11px;font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.1em;color:var(--m);margin-bottom:10px}
.jsg{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px}
.ji{font-size:14px}.ji span{font-family:'DM Mono',monospace;font-size:11px;text-transform:uppercase;color:var(--mu);display:block}
.done{text-align:center;padding:60px 20px}
.done-i{font-size:56px;margin-bottom:16px}.done-t{font-size:26px;color:var(--m);margin-bottom:8px}.done-s{color:var(--mu);font-size:15px}
.bid{display:inline-block;background:var(--m);color:#fff;font-family:'DM Mono',monospace;font-size:14px;padding:6px 16px;border-radius:20px;margin:12px 0}
.rg{display:flex;flex-direction:column;gap:10px}
.ro{display:flex;align-items:center;gap:12px;padding:12px 16px;border:1px solid var(--bo);border-radius:var(--r);cursor:pointer;background:var(--bg)}
.ro.sel{border-color:var(--m);background:var(--ml)}
.ro input{width:18px;height:18px}.rl{font-size:16px;cursor:pointer}
.nt2{background:var(--ml);border:1px solid #e8d4d4;border-radius:var(--r);padding:12px 16px;font-size:13px;color:var(--md);margin-bottom:20px;font-family:'DM Mono',monospace}
.sp{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.bar-wrap{margin-bottom:10px}.bar-top{display:flex;justify-content:space-between;font-size:12px;font-family:'DM Mono',monospace;margin-bottom:3px;color:var(--ink)}.bar-bg{background:var(--bo);border-radius:3px;height:8px}.bar-fill{border-radius:3px;height:8px;transition:width .4s}
@media(max-width:600px){.fr,.jsg{grid-template-columns:1fr}.bg{flex-direction:column}}`;

function Bar({label,value,max,color}){var p=max>0?(value/max)*100:0;return<div className="bar-wrap"><div className="bar-top"><span>{label}</span><span style={{color:"var(--mu)",fontWeight:600}}>{value}</span></div><div className="bar-bg"><div className="bar-fill" style={{width:p+"%",background:color||"var(--m)"}}/></div></div>;}

function Dashboard(){
  const[jobs,sJ]=useState([]);const[ld,sL]=useState(true);
  useEffect(function(){(async function(){var a=[];var off=null;do{var u=AT.url()+"?pageSize=100"+(off?"&offset="+off:"");var d=await(await fetch(u,{headers:AT.h()})).json();a=a.concat(d.records||[]);off=d.offset;}while(off);sJ(a.map(function(r){return r.fields;}));sL(false);})();},[]);
  if(ld)return<div style={{padding:60,textAlign:"center",color:"var(--mu)",fontFamily:"'DM Mono',monospace"}}>Loading…</div>;
  if(!jobs.length)return<div style={{padding:60,textAlign:"center"}}><div style={{fontSize:48,marginBottom:16}}>📋</div><p style={{color:"var(--mu)",fontFamily:"'DM Mono',monospace"}}>No jobs yet.</p><br/><a href="/#intake" style={{color:"var(--m)"}}>Submit first job</a></div>;
  var tot=jobs.length,bS={},bD={},bT={},bP={},tH=0,aH=0,aC=0;
  jobs.forEach(function(j){var s=j.Status||"Unknown";bS[s]=(bS[s]||0)+1;bD[j.Department||"?"]=(bD[j.Department||"?"]||0)+1;bT[j.JobType||"?"]=(bT[j.JobType||"?"]||0)+1;var pi=j.FacultyName||"?";if(!bP[pi])bP[pi]={j:0,h:0};bP[pi].j++;var h=parseFloat(j.HoursEst)||0;tH+=h;bP[pi].h+=h;if(s==="Approved"){aH+=h;aC++;}});
  var SC={"Pending Shop Review":"#c8a951","Pending PI Approval":"#2563eb","Approved":"#1a5c2a","Needs Clarification":"#7a4f00"};
  var mD=Math.max(...Object.values(bD)),mP=Math.max(...Object.values(bP).map(function(v){return v.j;}));
  function St({l,v,s,c}){return<div style={{background:"var(--wh)",border:"1px solid var(--bo)",borderRadius:"var(--r)",padding:"18px 22px",boxShadow:"var(--sh)",borderTop:"3px solid "+(c||"var(--m)")}}>
    <div style={{fontSize:11,fontFamily:"'DM Mono',monospace",textTransform:"uppercase",letterSpacing:".1em",color:"var(--mu)",marginBottom:6}}>{l}</div>
    <div style={{fontSize:28,fontWeight:600,color:c||"var(--ink)",lineHeight:1,fontFamily:"'DM Mono',monospace"}}>{v}</div>
    {s&&<div style={{fontSize:12,color:"var(--mu)",marginTop:5,fontFamily:"'DM Mono',monospace"}}>{s}</div>}
  </div>;}
  return<div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:28}}>
      <St l="Total Jobs" v={tot} s="all time" c="var(--m)"/><St l="Hours Est." v={tH.toFixed(1)} s="total" c="#2563eb"/>
      <St l="Est. Revenue" v={"$"+Math.round(tH*75).toLocaleString()} s="@ $75/hr" c="#1a5c2a"/><St l="Approved" v={aC} s={"$"+Math.round(aH*75).toLocaleString()+" confirmed"} c="#c8a951"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
      <div className="card"><div className="ct">By Status</div>{Object.entries(bS).sort(function(a,b){return b[1]-a[1];}).map(function([s,n]){return<Bar key={s} label={s} value={n} max={tot} color={SC[s]||"#999"}/>;})}</div>
      <div className="card"><div className="ct">By Job Type</div>{Object.entries(bT).sort(function(a,b){return b[1]-a[1];}).map(function([t,n]){return<Bar key={t} label={t} value={n} max={tot} color="var(--m)"/>;})}</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
      <div className="card"><div className="ct">By Department</div>{Object.entries(bD).sort(function(a,b){return b[1]-a[1];}).map(function([d,n]){return<Bar key={d} label={d} value={n} max={mD} color="#2563eb"/>;})}</div>
      <div className="card"><div className="ct">By PI / Faculty</div>{Object.entries(bP).sort(function(a,b){return b[1].j-a[1].j;}).map(function([pi,v]){return<Bar key={pi} label={pi} value={v.j+" job"+(v.j!==1?"s":"")+(v.h?" · "+v.h.toFixed(1)+" hrs":"")} max={mP} color="var(--g)"/>;})}</div>
    </div>
    <div className="card"><div className="ct">All Jobs</div><div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead><tr style={{borderBottom:"2px solid var(--bo)"}}>{["ID","Submitter","PI","Dept","Job","Type","Hrs","Status","Speedtype"].map(function(h){return<th key={h} style={{textAlign:"left",padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:10,textTransform:"uppercase",color:"var(--mu)",whiteSpace:"nowrap"}}>{h}</th>;})}</tr></thead>
        <tbody>{[...jobs].sort(function(a,b){return(b.Timestamp||"").localeCompare(a.Timestamp||"");}).map(function(j,i){var sc=SC[j.Status||""]||"#999";return<tr key={i} style={{borderBottom:"1px solid var(--bo)"}}>
          <td style={{padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:11,color:"var(--m)",fontWeight:600,whiteSpace:"nowrap"}}>{j.JobID||"—"}</td>
          <td style={{padding:"8px 10px",whiteSpace:"nowrap"}}>{j.SubmitterName||"—"}</td>
          <td style={{padding:"8px 10px",whiteSpace:"nowrap"}}>{j.FacultyName||"—"}</td>
          <td style={{padding:"8px 10px",whiteSpace:"nowrap",fontSize:12}}>{j.Department||"—"}</td>
          <td style={{padding:"8px 10px",maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{j.JobName||"—"}</td>
          <td style={{padding:"8px 10px",whiteSpace:"nowrap",fontSize:12}}>{j.JobType||"—"}</td>
          <td style={{padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:11,whiteSpace:"nowrap"}}>{j.HoursEst?j.HoursEst+"h":"—"}</td>
          <td style={{padding:"8px 10px",whiteSpace:"nowrap"}}><span style={{background:sc+"22",color:sc,border:"1px solid "+sc+"44",borderRadius:20,padding:"2px 9px",fontSize:10,fontFamily:"'DM Mono',monospace"}}>{j.Status||"—"}</span></td>
          <td style={{padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:11}}>{j.Speedtype||"—"}</td>
        </tr>;})}
        </tbody>
      </table>
    </div></div>
  </div>;
}

function IntakeForm(){
  const[f,sF]=useState({nm:"",em:"",ph:"",pn:"",pe:"",dp:"",tp:"",jb:"",dr:"",st:""});
  const[st,sSt]=useState(null);const[id,sId]=useState("");
  var s=function(k){return function(e){sF(function(p){var o={...p};o[k]=e.target.value;return o;});};};
  async function sub(e){e.preventDefault();sSt("s");try{
    var jid=await AT.nextId();sId(jid);
    await AT.create({JobID:jid,SubmitterName:f.nm,SubmitterEmail:f.em,Phone:f.ph,FacultyName:f.pn,PIEmail:f.pe,Department:f.dp,JobType:f.tp,JobName:f.jb,Drawings:f.dr,Stock:f.st,Status:"Pending Shop Review",Timestamp:new Date().toISOString()});
    var lk=ou()+"/#review?job="+jid;
    var mg="New job submitted.\n\nJob ID: "+jid+"\nJob: "+f.jb+"\nFrom: "+f.nm+" <"+f.em+">\nPI: "+f.pn+" <"+f.pe+">\nDept: "+f.dp+"\nType: "+f.tp+"\n\nEnter estimate:\n"+lk;
    await mail(SHOP,"[New Shop Job] "+jid+": "+f.jb,mg);await mail(NOTIFY,"[New Shop Job] "+jid+": "+f.jb,mg);
    sSt("ok");
  }catch(err){console.error(err);sSt("e");}}
  if(st==="ok")return<div className="done"><div className="done-i">📋</div><h2 className="done-t">Job Submitted</h2><div className="bid">{id}</div><p className="done-s">Received. The shop will be in touch.</p></div>;
  return<form onSubmit={sub}>
    <div className="card"><div className="ct">👤 Contact</div>
      <div className="fr"><div className="fi"><label>Your name <span className="rq">*</span></label><input required value={f.nm} onChange={s("nm")}/></div><div className="fi"><label>Email <span className="rq">*</span></label><input required type="email" value={f.em} onChange={s("em")}/></div></div>
      <div className="fr"><div className="fi"><label>Phone</label><input value={f.ph} onChange={s("ph")}/></div><div className="fi"><label>Department <span className="rq">*</span></label><input required value={f.dp} onChange={s("dp")}/></div></div>
    </div>
    <div className="card"><div className="ct">🏛️ Faculty / PI</div>
      <div className="nt2">The PI receives an approval request once the shop estimates the job.</div>
      <div className="fr"><div className="fi"><label>PI name <span className="rq">*</span></label><input required value={f.pn} onChange={s("pn")}/></div><div className="fi"><label>PI email <span className="rq">*</span></label><input required type="email" value={f.pe} onChange={s("pe")} placeholder="pi@umass.edu"/></div></div>
    </div>
    <div className="card"><div className="ct">🔧 Job</div>
      <div className="fi"><label>Job description <span className="rq">*</span></label><input required value={f.jb} onChange={s("jb")}/></div>
      <div className="fr"><div className="fi"><label>Job type <span className="rq">*</span></label><select required value={f.tp} onChange={s("tp")}><option value="">Select…</option><option>Research</option><option>Physics Teaching Labs</option><option>Physics/Astronomy lecture prep</option><option>Other Dept support</option></select></div><div className="fi"><label>Drawings</label><input value={f.dr} onChange={s("dr")} placeholder="0"/></div></div>
      <div className="fi"><label>Stock / special items</label><textarea value={f.st} onChange={s("st")} rows={3}/></div>
    </div>
    {st==="e"&&<div className="err">Something went wrong. Please try again.</div>}
    <button type="submit" className="btn bp" disabled={st==="s"}>{st==="s"?<><span className="sp"/> Submitting…</>:"Submit Job Request →"}</button>
  </form>;
}

function ShopReview({jobId}){
  const[rec,sR]=useState(null);const[ld,sL]=useState(true);
  const[f,sF]=useState({h:"",sd:"",ed:"",nt:""});const[st,sSt]=useState(null);
  var sv=function(k){return function(e){sF(function(p){var o={...p};o[k]=e.target.value;return o;});};};
  useEffect(function(){if(jobId)AT.find(jobId).then(function(r){sR(r);sL(false);});},[jobId]);
  async function sub(e){e.preventDefault();sSt("s");try{
    await AT.update(rec.id,{Status:"Pending PI Approval",HoursEst:f.h,StartDate:f.sd,CompletionDate:f.ed,ShopNotes:f.nt});
    var j=rec.fields,lk=ou()+"/#approve?job="+jobId;
    var mg="Dear "+j.FacultyName+",\n\n"+j.SubmitterName+" submitted a shop job.\n\nJob: "+j.JobName+"\nID: "+jobId+"\n\nEstimate: "+f.h+" hrs, "+f.sd+" to "+f.ed+(f.nt?"\nNotes: "+f.nt:"")+"\n\nRespond here:\n"+lk+"\n\nPhysics Machine Shop | HAS 6 | wrp@physics.umass.edu";
    await mail(j.PIEmail,"[Action Required] Approve "+jobId+": "+j.JobName,mg);
    await mail(NOTIFY,"[Shop] "+jobId+" estimate submitted",mg);
    sSt("ok");
  }catch(err){console.error(err);sSt("e");}}
  if(ld)return<p style={{color:"var(--mu)",padding:40}}>Loading job…</p>;
  if(!rec)return<div className="err" style={{marginTop:40}}>Job {jobId} not found in Airtable.</div>;
  var j=rec.fields;
  if(st==="ok")return<div className="done"><div className="done-i">📨</div><h2 className="done-t">Estimate Submitted</h2><div className="bid">{jobId}</div><p className="done-s">{j.FacultyName} has been emailed an approval request.</p></div>;
  return<form onSubmit={sub}>
    <div className="js"><div className="jst">Job — {jobId}</div><div className="jsg">
      <div className="ji"><span>Submitted by</span>{j.SubmitterName}</div><div className="ji"><span>PI</span>{j.FacultyName}</div>
      <div className="ji"><span>Dept</span>{j.Department}</div><div className="ji"><span>Job</span>{j.JobName}</div>
      <div className="ji"><span>Type</span>{j.JobType}</div><div className="ji"><span>PI email</span>{j.PIEmail}</div>
    </div></div>
    <div className="card"><div className="ct">⏱ Estimate</div>
      <div className="fi"><label>Hours <span className="rq">*</span></label><input required type="number" min="0.5" step="0.5" value={f.h} onChange={sv("h")} placeholder="e.g. 4.5"/></div>
      <div className="fr"><div className="fi"><label>Start date <span className="rq">*</span></label><input required type="date" value={f.sd} onChange={sv("sd")}/></div><div className="fi"><label>Completion <span className="rq">*</span></label><input required type="date" value={f.ed} onChange={sv("ed")}/></div></div>
      <div className="fi"><label>Notes for PI</label><textarea value={f.nt} onChange={sv("nt")} rows={3}/></div>
    </div>
    {st==="e"&&<div className="err">Something went wrong.</div>}
    <button type="submit" className="btn bp" disabled={st==="s"}>{st==="s"?<><span className="sp"/> Submitting…</>:"Submit & Notify PI →"}</button>
  </form>;
}

function PIApproval({jobId}){
  const[rec,sR]=useState(null);const[ld,sL]=useState(true);
  const[dec,sD]=useState("");const[com,sC]=useState("");const[spd,sSp]=useState("");const[st,sSt]=useState(null);
  useEffect(function(){if(jobId)AT.find(jobId).then(function(r){sR(r);sL(false);});},[jobId]);
  async function sub(e){e.preventDefault();if(!dec)return;sSt("s");try{
    var ok=dec==="a";var sv=ok?"Approved":"Needs Clarification";
    var upd={Status:sv,PIDecision:dec,PIComments:com};if(ok&&spd)upd.Speedtype=spd;
    await AT.update(rec.id,upd);
    var j=rec.fields;
    await mail(SHOP,"[Shop] "+jobId+" — "+sv,"PI "+j.FacultyName+": "+sv+(ok&&spd?"\nSpeedtype: "+spd:"")+(com?"\nComments: "+com:""));
    await mail(j.SubmitterEmail,"Your shop job "+jobId+" — "+sv,"Hello "+j.SubmitterName+",\n\nJob '"+j.JobName+"' ("+jobId+"): "+sv+"\n\n"+(ok?"Approved! Shop will be in touch.":"PI will contact you.")+(com?"\n\nPI: "+com:""));
    await mail(NOTIFY,"[Shop] "+jobId+" — "+sv,"PI "+j.FacultyName+": "+sv+"\nJob: "+j.JobName);
    sSt("ok");
  }catch(err){console.error(err);sSt("e");}}
  if(ld)return<p style={{color:"var(--mu)",padding:40}}>Loading…</p>;
  if(!rec)return<div className="err" style={{marginTop:40}}>Job {jobId} not found.</div>;
  var j=rec.fields;var ok2=dec==="a";
  if(st==="ok")return<div className="done"><div className="done-i">{ok2?"✅":"💬"}</div><h2 className="done-t">{ok2?"Job Approved":"Clarification Requested"}</h2><div className="bid">{jobId}</div><p className="done-s">{ok2?"Shop notified.":"Shop and submitter notified."}</p></div>;
  return<form onSubmit={sub}>
    <div className="js"><div className="jst">Job — {jobId}</div><div className="jsg">
      <div className="ji"><span>Job</span>{j.JobName}</div><div className="ji"><span>Submitted by</span>{j.SubmitterName}</div>
      <div className="ji"><span>Type</span>{j.JobType}</div><div className="ji"><span>Dept</span>{j.Department}</div>
    </div></div>
    {j.HoursEst&&<div className="card"><div className="ct">⏱ Shop Estimate</div><div className="jsg">
      <div className="ji"><span>Hours</span>{j.HoursEst} hrs</div><div className="ji"><span>Start</span>{j.StartDate}</div>
      <div className="ji"><span>Completion</span>{j.CompletionDate}</div>{j.ShopNotes&&<div className="ji"><span>Notes</span>{j.ShopNotes}</div>}
    </div></div>}
    <div className="card"><div className="ct">✍️ Decision</div>
      <div className="fi"><div className="rg">
        <label className={"ro"+(dec==="a"?" sel":"")} onClick={function(){sD("a");}}><input type="radio" name="d" checked={dec==="a"} onChange={function(){sD("a");}}/><span className="rl">✅ Approve — please proceed</span></label>
        <label className={"ro"+(dec==="c"?" sel":"")} onClick={function(){sD("c");}}><input type="radio" name="d" checked={dec==="c"} onChange={function(){sD("c");}}/><span className="rl">💬 Needs clarification</span></label>
      </div></div>
      <div className="fi" style={{marginTop:14}}><label>Comments (optional)</label><textarea value={com} onChange={function(e){sC(e.target.value);}} rows={3}/></div>
      {dec==="a"&&<div className="fi" style={{marginTop:14,paddingTop:14,borderTop:"1px solid var(--bo)"}}><label>Speedtype <span className="rq">*</span></label><input required={dec==="a"} value={spd} onChange={function(e){sSp(e.target.value);}} placeholder="e.g. 12345678"/><p className="hp">Required to authorize charges.</p></div>}
    </div>
    {st==="e"&&<div className="err">Something went wrong.</div>}
    <div className="bg">
      <button type="submit" className="btn ba" disabled={dec!=="a"||st==="s"} onClick={function(){sD("a");}}>{st==="s"&&dec==="a"?<><span className="sp"/> Submitting…</>:"✅ Approve Job"}</button>
      <button type="submit" className="btn bc" disabled={dec!=="c"||st==="s"} onClick={function(){sD("c");}}>{st==="s"&&dec==="c"?<><span className="sp"/> Submitting…</>:"💬 Needs Clarification"}</button>
    </div>
  </form>;
}

export default function App(){
  const[{view,params},sR]=useState(gv);
  useEffect(function(){var h=function(){sR(gv());};window.addEventListener("hashchange",h);return function(){window.removeEventListener("hashchange",h);};},[]);
  var tabs=[{id:"intake",l:"Job Intake"},{id:"review",l:"Shop Review"},{id:"approve",l:"PI Approval"},{id:"dashboard",l:"Dashboard"}];
  var mm={intake:{t:"Job Intake Form",d:"Submit a new machine shop job request"},review:{t:"Shop Review",d:"Enter estimate for "+(params.job||"…")},approve:{t:"PI Approval",d:"Review and approve "+(params.job||"…")},dashboard:{t:"Department Dashboard",d:"Live overview of all jobs, hours, and revenue"}};
  var meta=mm[view]||mm.intake;
  return<>
    <style>{css}</style>
    <header className="ah"><div className="hi"><div className="hb">⚙️</div><div><div className="ht">University of Massachusetts Amherst</div><div className="hs">Physics & Astronomy Machine Shop</div></div></div>
      <nav className="nav"><div className="navi">{tabs.map(function(t){return<a key={t.id} className={"nt"+(view===t.id?" active":"")} href={"/#"+t.id}>{t.l}</a>;})}</div></nav>
    </header>
    <main className="main"><h1 className="st">{meta.t}</h1><p className="sd">{meta.d}</p>
      {view==="intake"&&<IntakeForm/>}{view==="review"&&<ShopReview jobId={params.job}/>}
      {view==="approve"&&<PIApproval jobId={params.job}/>}{view==="dashboard"&&<Dashboard/>}
    </main>
  </>;
}
