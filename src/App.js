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
var css='@import url("https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600&family=DM+Mono:wght@400;500&display=swap");*{box-sizing:border-box;margin:0;padding:0}:root{--m:#881C1C;--md:#5c1212;--ml:#f9f0f0;--g:#c8a951;--ink:#1a1a1a;--mu:#666;--bo:#d8d0c8;--bg:#faf8f5;--wh:#fff;--r:4px;--sh:0 2px 12px rgba(0,0,0,.08)}body{font-family:"EB Garamond",Georgia,serif;font-size:17px;line-height:1.6;color:var(--ink);background:var(--bg);min-height:100vh}.ah{background:var(--m);color:#fff;border-bottom:3px solid var(--g)}.hi{max-width:960px;margin:0 auto;padding:20px 24px;display:flex;align-items:center;gap:16px}.hb{width:44px;height:44px;background:var(--g);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px}.ht{font-size:13px;text-transform:uppercase;letter-spacing:.12em;opacity:.8;font-family:"DM Mono",monospace}.hs{font-size:20px;font-weight:600}.nav{background:var(--md);padding:0 24px}.navi{max-width:960px;margin:0 auto;display:flex}.nt{padding:10px 20px 10px 0;font-size:12px;font-family:"DM Mono",monospace;color:rgba(255,255,255,.5);text-decoration:none;border-bottom:2px solid transparent;display:inline-block}.nt.active{color:var(--g);border-bottom-color:var(--g)}.main{max-width:960px;margin:0 auto;padding:40px 24px 60px}.st{font-size:26px;font-weight:600;color:var(--m);margin-bottom:6px}.sd{color:var(--mu);font-size:15px;font-family:"DM Mono",monospace;margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid var(--bo)}.card{background:var(--wh);border:1px solid var(--bo);border-radius:var(--r);padding:28px;margin-bottom:24px;box-shadow:var(--sh)}.ct{font-size:12px;font-family:"DM Mono",monospace;text-transform:uppercase;letter-spacing:.1em;color:var(--m);margin-bottom:18px;padding-bottom:10px;border-bottom:1px solid var(--ml)}.fi{margin-bottom:18px}.fi:last-child{margin-bottom:0}.fr{display:grid;grid-template-columns:1fr 1fr;gap:16px}label{display:block;font-size:12px;font-family:"DM Mono",monospace;color:var(--mu);text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px}.rq{color:var(--m)}input,select,textarea{width:100%;padding:10px 14px;border:1px solid var(--bo);border-radius:var(--r);font-family:"EB Garamond",Georgia,serif;font-size:16px;color:var(--ink);background:var(--bg);outline:none;-webkit-appearance:none;transition:border-color .15s}input:focus,select:focus,textarea:focus{border-color:var(--m);background:var(--wh)}textarea{resize:vertical;min-height:80px}.hp{font-size:12px;color:var(--mu);margin-top:4px;font-family:"DM Mono",monospace}.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;font-family:"DM Mono",monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;border:none;border-radius:var(--r);cursor:pointer}.bp{background:var(--m);color:#fff}.bp:disabled{opacity:.6;cursor:not-allowed}.ba{background:#1a5c2a;color:#fff;font-size:14px;padding:14px 32px}.bc{background:#fff;color:#7a4f00;border:2px solid #7a4f00;font-size:14px;padding:14px 32px}.bg{display:flex;gap:16px;margin-top:28px;padding-top:24px;border-top:1px solid var(--bo)}.err{background:#fdf0f0;color:#8b1c1c;border-left:4px solid #8b1c1c;padding:14px 18px;border-radius:var(--r);margin-bottom:20px;font-size:14px}.js{background:var(--ml);border:1px solid #e8d4d4;border-radius:var(--r);padding:18px;margin-bottom:24px}.jst{font-size:11px;font-family:"DM Mono",monospace;text-transform:uppercase;letter-spacing:.1em;color:var(--m);margin-bottom:10px}.jsg{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px}.ji{font-size:14px}.ji span{font-family:"DM Mono",monospace;font-size:11px;text-transform:uppercase;color:var(--mu);display:block}.done{text-align:center;padding:60px 20px}.done-i{font-size:56px;margin-bottom:16px}.done-t{font-size:26px;color:var(--m);margin-bottom:8px}.done-s{color:var(--mu);font-size:15px}.bid{display:inline-block;background:var(--m);color:#fff;font-family:"DM Mono",monospace;font-size:14px;padding:6px 16px;border-radius:20px;margin:12px 0}.rg{display:flex;flex-direction:column;gap:10px}.ro{display:flex;align-items:center;gap:12px;padding:12px 16px;border:1px solid var(--bo);border-radius:var(--r);cursor:pointer;background:var(--bg)}.ro.sel{border-color:var(--m);background:var(--ml)}.ro input{width:18px;height:18px}.rl{font-size:16px;cursor:pointer}.nt2{background:var(--ml);border:1px solid #e8d4d4;border-radius:var(--r);padding:12px 16px;font-size:13px;color:var(--md);margin-bottom:20px;font-family:"DM Mono",monospace}.tbox{background:var(--md);color:#fff;border-radius:var(--r);padding:12px 18px;margin-top:12px;font-family:"DM Mono",monospace;font-size:13px;display:flex;justify-content:space-between}.sp{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.bw{margin-bottom:10px}.bt{display:flex;justify-content:space-between;font-size:12px;font-family:"DM Mono",monospace;margin-bottom:3px}.bb{background:var(--bo);border-radius:3px;height:8px}.bf{border-radius:3px;height:8px;transition:width .4s}@media(max-width:600px){.fr,.jsg{grid-template-columns:1fr}.bg{flex-direction:column}}';
function Bar(P){var p=P.max>0?(P.value/P.max)*100:0;return<div className="bw"><div className="bt"><span style={{color:"var(--ink)"}}>{P.label}</span><span style={{color:"var(--mu)",fontWeight:600}}>{P.value}</span></div><div className="bb"><div className="bf" style={{width:p+"%",background:P.color||"var(--m)"}}/></div></div>;}
function Dashboard(){
  const[jobs,sJ]=useState([]);const[ld,sL]=useState(true);
  useEffect(function(){(async function(){var a=[];var off=null;do{var u=AT.url()+"?pageSize=100"+(off?"&offset="+off:"");var d=await(await fetch(u,{headers:AT.h()})).json();a=a.concat(d.records||[]);off=d.offset;}while(off);sJ(a.map(function(r){return r.fields;}));sL(false);})();},[]);
  if(ld)return<div style={{padding:60,textAlign:"center",color:"var(--mu)",fontFamily:"'DM Mono',monospace"}}>Loading…</div>;
  if(!jobs.length)return<div style={{padding:60,textAlign:"center"}}><div style={{fontSize:48,marginBottom:16}}>📋</div><p style={{color:"var(--mu)",fontFamily:"'DM Mono',monospace"}}>No jobs yet.</p><br/><a href="/#intake" style={{color:"var(--m)"}}>Submit first job</a></div>;
  var tot=jobs.length,bS={},bD={},bT={},bP={},tH=0,tP=0,aH=0,aP=0,aC=0;
  jobs.forEach(function(j){var s=j.Status||"Unknown";bS[s]=(bS[s]||0)+1;bD[j.Department||"?"]=(bD[j.Department||"?"]||0)+1;bT[j.JobType||"?"]=(bT[j.JobType||"?"]||0)+1;var pi=j.FacultyName||"?";if(!bP[pi])bP[pi]={j:0,h:0,p:0};bP[pi].j++;var h=parseFloat(j.HoursEst)||0;var pr=parseFloat(j.PartsEst)||0;tH+=h;tP+=pr;bP[pi].h+=h;bP[pi].p+=pr;if(s==="Approved"){aH+=h;aP+=pr;aC++;}});
  var SC={"Pending Shop Review":"#c8a951","Pending PI Approval":"#2563eb","Approved":"#1a5c2a","Needs Clarification":"#7a4f00"};
  var mD=Math.max(...Object.values(bD)),mPv=Math.max(...Object.values(bP).map(function(v){return v.j;}));
  var totR=Math.round(tH*75)+Math.round(tP),appR=Math.round(aH*75)+Math.round(aP);
  function St(P){return<div style={{background:"var(--wh)",border:"1px solid var(--bo)",borderRadius:"var(--r)",padding:"18px 22px",boxShadow:"var(--sh)",borderTop:"3px solid "+(P.c||"var(--m)")}}><div style={{fontSize:11,fontFamily:"'DM Mono',monospace",textTransform:"uppercase",letterSpacing:".1em",color:"var(--mu)",marginBottom:6}}>{P.l}</div><div style={{fontSize:28,fontWeight:600,color:P.c||"var(--ink)",lineHeight:1,fontFamily:"'DM Mono',monospace"}}>{P.v}</div>{P.s&&<div style={{fontSize:12,color:"var(--mu)",marginTop:5,fontFamily:"'DM Mono',monospace"}}>{P.s}</div>}</div>;}
  return<div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:28}}>
      <St l="Total Jobs" v={tot} s="all time" c="var(--m)"/>
      <St l="Labor Hours" v={tH.toFixed(1)+"h"} s={"$"+Math.round(tH*75).toLocaleString()+" @ $75/hr"} c="#2563eb"/>
      <St l="Parts Est." v={"$"+Math.round(tP).toLocaleString()} s="materials & supplies" c="#7a4f00"/>
      <St l="Total Revenue Est." v={"$"+totR.toLocaleString()} s={aC+" approved ($"+appR.toLocaleString()+")"} c="#1a5c2a"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
      <div className="card"><div className="ct">By Status</div>{Object.entries(bS).sort(function(a,b){return b[1]-a[1];}).map(function(e){return<Bar key={e[0]} label={e[0]} value={e[1]} max={tot} color={SC[e[0]]||"#999"}/>;})}</div>
      <div className="card"><div className="ct">By Job Type</div>{Object.entries(bT).sort(function(a,b){return b[1]-a[1];}).map(function(e){return<Bar key={e[0]} label={e[0]} value={e[1]} max={tot} color="var(--m)"/>;})}</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
      <div className="card"><div className="ct">By Department</div>{Object.entries(bD).sort(function(a,b){return b[1]-a[1];}).map(function(e){return<Bar key={e[0]} label={e[0]} value={e[1]} max={mD} color="#2563eb"/>;})}</div>
      <div className="card"><div className="ct">By PI / Faculty</div>{Object.entries(bP).sort(function(a,b){return b[1].j-a[1].j;}).map(function(e){return<Bar key={e[0]} label={e[0]} value={e[1].j+" job"+(e[1].j!==1?"s":"")+(e[1].h?" · "+e[1].h.toFixed(1)+"h":"")} max={mPv} color="var(--g)"/>;})}</div>
    </div>
    <div className="card"><div className="ct">All Jobs</div><div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead><tr style={{borderBottom:"2px solid var(--bo)"}}>{["ID","Submitter","PI","Dept","Job","Type","Hrs","Parts","Status","Speedtype"].map(function(h){return<th key={h} style={{textAlign:"left",padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:10,textTransform:"uppercase",color:"var(--mu)",whiteSpace:"nowrap"}}>{h}</th>;})}</tr></thead>
        <tbody>{[...jobs].sort(function(a,b){return(b.Timestamp||"").localeCompare(a.Timestamp||"");}).map(function(j,i){var sc=SC[j.Status||""]||"#999";return<tr key={i} style={{borderBottom:"1px solid var(--bo)"}}>
          <td style={{padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:11,color:"var(--m)",fontWeight:600,whiteSpace:"nowrap"}}>{j.JobID||"—"}</td>
          <td style={{padding:"8px 10px",whiteSpace:"nowrap"}}>{j.SubmitterName||"—"}</td>
          <td style={{padding:"8px 10px",whiteSpace:"nowrap"}}>{j.FacultyName||"—"}</td>
          <td style={{padding:"8px 10px",whiteSpace:"nowrap",fontSize:12}}>{j.Department||"—"}</td>
          <td style={{padding:"8px 10px",maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{j.JobName||"—"}</td>
          <td style={{padding:"8px 10px",whiteSpace:"nowrap",fontSize:12}}>{j.JobType||"—"}</td>
          <td style={{padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:11,whiteSpace:"nowrap"}}>{j.HoursEst?j.HoursEst+"h":"—"}</td>
          <td style={{padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:11,whiteSpace:"nowrap"}}>{j.PartsEst?"$"+j.PartsEst:"—"}</td>
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
function ShopReview(P){
  var jobId=P.jobId;
  const[rec,sR]=useState(null);const[ld,sL]=useState(true);
  const[h,sH]=useState("");const[sd,sSd]=useState("");const[ed,sEd]=useState("");const[parts,sParts]=useState("");const[nt,sNt]=useState("");
  const[st,sSt]=useState(null);
  useEffect(function(){if(jobId)AT.find(jobId).then(function(r){sR(r);sL(false);});},[jobId]);
  var laborCost=Math.round((parseFloat(h)||0)*75);
  var partsCost=parseFloat(parts)||0;
  var totalEst=laborCost+partsCost;
  async function sub(e){e.preventDefault();sSt("s");try{
    await AT.update(rec.id,{Status:"Pending PI Approval",HoursEst:parseFloat(h)||0,StartDate:sd,CompletionDate:ed,PartsEst:parts,ShopNotes:nt});
    var j=rec.fields,lk=ou()+"/#approve?job="+jobId;
    var mg="Dear "+j.FacultyName+",\n\n"+j.SubmitterName+" submitted a shop job requiring your approval.\n\nJob: "+j.JobName+"\nID: "+jobId+"\n\nShop Estimate:\nLabor: "+h+" hrs @ $75/hr = $"+laborCost+"\nParts/materials: $"+(parts||"0")+"\nTotal estimate: $"+Math.round(totalEst)+"\nStart: "+sd+"\nCompletion: "+ed+(nt?"\nNotes: "+nt:"")+"\n\nApprove or request clarification:\n"+lk+"\n\nPhysics Machine Shop | HAS 6 | wrp@physics.umass.edu";
    await mail(j.PIEmail,"[Action Required] Approve "+jobId+": "+j.JobName,mg);
    await mail(NOTIFY,"[Shop] "+jobId+" estimate submitted, PI notified",mg);
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
      <div className="fr">
        <div className="fi"><label>Labor hours <span className="rq">*</span></label><input required type="number" min="0.5" step="0.5" value={h} onChange={function(e){sH(e.target.value);}}/><p className="hp">@ $75/hr shop rate</p></div>
        <div className="fi"><label>Parts / materials cost ($)</label><input type="number" min="0" step="0.01" value={parts} onChange={function(e){sParts(e.target.value);}}/><p className="hp">Parts, supplies, stock</p></div>
      </div>
      {(parseFloat(h)||parseFloat(parts))>0&&<div className="tbox"><span>Total estimate</span><span>${Math.round(totalEst).toLocaleString()} <span style={{opacity:.7,fontSize:11}}>(labor + parts)</span></span></div>}
      <div className="fr" style={{marginTop:16}}>
        <div className="fi"><label>Start date <span className="rq">*</span></label><input required type="date" value={sd} onChange={function(e){sSd(e.target.value);}}/></div>
        <div className="fi"><label>Completion <span className="rq">*</span></label><input required type="date" value={ed} onChange={function(e){sEd(e.target.value);}}/></div>
      </div>
      <div className="fi"><label>Notes for PI</label><textarea value={nt} onChange={function(e){sNt(e.target.value);}} rows={3}/></div>
    </div>
    {st==="e"&&<div className="err">Something went wrong.</div>}
    <button type="submit" className="btn bp" disabled={st==="s"}>{st==="s"?<><span className="sp"/> Submitting…</>:"Submit & Notify PI →"}</button>
  </form>;
}
function PIApproval(P){
  var jobId=P.jobId;
  const[rec,sR]=useState(null);const[ld,sL]=useState(true);
  const[dec,sD]=useState("");const[com,sC]=useState("");const[spd,sSp]=useState("");const[st,sSt]=useState(null);
  useEffect(function(){if(jobId)AT.find(jobId).then(function(r){sR(r);sL(false);});},[jobId]);
  async function sub(e){e.preventDefault();if(!dec)return;sSt("s");try{
    var ok=dec==="a";var sv2=ok?"Approved":"Needs Clarification";
    var upd={Status:sv2,PIDecision:dec,PIComments:com};if(ok&&spd)upd.Speedtype=spd;
    await AT.update(rec.id,upd);
    var j=rec.fields;
    await mail(SHOP,"[Shop] "+jobId+" — "+sv2,"PI "+j.FacultyName+": "+sv2+(ok&&spd?"\nSpeedtype: "+spd:"")+(com?"\nComments: "+com:"")+"\nJob: "+j.JobName);
    await mail(j.SubmitterEmail,"Your shop job "+jobId+" — "+sv2,"Hello "+j.SubmitterName+",\n\nYour job '"+j.JobName+"' ("+jobId+"): "+sv2+"\n\n"+(ok?"Approved! Shop will be in touch.":"PI will contact you.")+(com?"\n\nPI: "+com:""));
    await mail(NOTIFY,"[Shop] "+jobId+" — "+sv2,"PI "+j.FacultyName+": "+sv2+"\nJob: "+j.JobName+(ok&&spd?"\nSpeedtype: "+spd:""));
    sSt("ok");
  }catch(err){console.error(err);sSt("e");}}
  if(ld)return<p style={{color:"var(--mu)",padding:40}}>Loading…</p>;
  if(!rec)return<div className="err" style={{marginTop:40}}>Job {jobId} not found.</div>;
  var j=rec.fields;var ok2=dec==="a";
  var hrs=j.HoursEst,pts=j.PartsEst,hasEst=hrs||pts||j.StartDate;
  var laborAmt=Math.round((parseFloat(hrs)||0)*75);
  var partsAmt=parseFloat(pts)||0;
  if(st==="ok")return<div className="done"><div className="done-i">{ok2?"✅":"💬"}</div><h2 className="done-t">{ok2?"Job Approved":"Clarification Requested"}</h2><div className="bid">{jobId}</div><p className="done-s">{ok2?"Shop notified.":"Shop and submitter notified."}</p></div>;
  return<form onSubmit={sub}>
    <div className="js"><div className="jst">Job — {jobId}</div><div className="jsg">
      <div className="ji"><span>Job</span>{j.JobName}</div><div className="ji"><span>Submitted by</span>{j.SubmitterName}</div>
      <div className="ji"><span>Type</span>{j.JobType}</div><div className="ji"><span>Dept</span>{j.Department}</div>
    </div></div>
    {hasEst&&<div className="card"><div className="ct">⏱ Shop Estimate</div><div className="jsg">
      {hrs&&<div className="ji"><span>Labor</span>{hrs} hrs @ $75/hr = ${laborAmt.toLocaleString()}</div>}
      {pts&&<div className="ji"><span>Parts / materials</span>${partsAmt.toLocaleString()}</div>}
      {(hrs||pts)&&<div className="ji"><span>Total estimate</span>${(laborAmt+partsAmt).toLocaleString()}</div>}
      {j.StartDate&&<div className="ji"><span>Start date</span>{j.StartDate}</div>}
      {j.CompletionDate&&<div className="ji"><span>Completion</span>{j.CompletionDate}</div>}
      {j.ShopNotes&&<div className="ji"><span>Shop notes</span>{j.ShopNotes}</div>}
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