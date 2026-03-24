import { useState, useEffect, useRef } from "react";
var _t1="patmQEdq0ca8XAH",_t2="jo.277e11c1a3fa3ae2eb367b0c40b9023bd94214e6a0e6c14df57a35705bcb4b7d";
var AT_TOKEN=_t1+_t2,AT_BASE="apprqBhq3q6jtyyEI",AT_TABLE="Jobs";
var W3F="417f889e-7a74-4972-b726-22d2ead06191";
var SHOP="wrp@physics.umass.edu",NOTIFY="vmathai@umass.edu";
var AT={
  url:function(){return"https://api.airtable.com/v0/"+AT_BASE+"/"+AT_TABLE;},
  h:function(){return{Authorization:"Bearer "+AT_TOKEN,"Content-Type":"application/json"};},
  create:async function(f){return(await fetch(AT.url(),{method:"POST",headers:AT.h(),body:JSON.stringify({fields:f})})).json();},
  update:async function(id,f){return(await fetch(AT.url()+"/"+id,{method:"PATCH",headers:AT.h(),body:JSON.stringify({fields:f})})).json();},
  find:async function(j){var q=encodeURIComponent("{JobID}=\""+j+"\"");var d=await(await fetch(AT.url()+"?filterByFormula="+q,{headers:AT.h()})).json();return d.records&&d.records[0]?d.records[0]:null;},
  nextId:async function(){var d=await(await fetch(AT.url()+"?fields[]=JobID&sort[0][field]=Timestamp&sort[0][direction]=desc&maxRecords=1",{headers:AT.h()})).json();if(!d.records||!d.records.length)return"JOB-0001";var n=parseInt((d.records[0].fields.JobID||"JOB-0000").replace("JOB-",""))+1;return"JOB-"+String(n).padStart(4,"0");},
  uploadFile:async function(recordId,file){
    // Upload to Cloudinary (permanent free storage)
    var fd=new FormData();
    fd.append("file",file,file.name);
    fd.append("upload_preset","shop_uploads");
    fd.append("resource_type","raw");
    var cr=await fetch("https://api.cloudinary.com/v1_1/djjovmhac/raw/upload",{method:"POST",body:fd});
    if(!cr.ok)throw new Error("Cloudinary upload failed: "+cr.status);
    var cd=await cr.json();
    if(!cd.secure_url)throw new Error("No URL from Cloudinary");
    var fileUrl=cd.secure_url;
    // Save URL to Airtable Attachments field
    var ar=await fetch(AT.url()+"/"+recordId,{
      method:"PATCH",headers:AT.h(),
      body:JSON.stringify({fields:{Attachments:[{url:fileUrl,filename:file.name}]}})
    });
    if(!ar.ok)throw new Error("Airtable attach failed: "+ar.status);
    return fileUrl;
  }
};
async function mail(to,subj,msg){try{var r=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({access_key:W3F,subject:subj,message:msg,to_email:to,from_name:"Physics Machine Shop"})});return r.ok;}catch(e){return false;}}
function gv(){var h=window.location.hash||"#intake";var pts=h.slice(1).split("?");var p={};if(pts[1])pts[1].split("&").forEach(function(s){var kv=s.split("=");p[kv[0]]=decodeURIComponent(kv[1]||"");});return{view:pts[0]||"intake",params:p};}
function ou(){return window.location.origin;}
function fmt$(n){return"$"+Math.round(parseFloat(n)||0).toLocaleString();}
var css='@import url("https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600&family=DM+Mono:wght@400;500&display=swap");*{box-sizing:border-box;margin:0;padding:0}:root{--m:#881C1C;--md:#5c1212;--ml:#f9f0f0;--g:#c8a951;--ink:#1a1a1a;--mu:#666;--bo:#d8d0c8;--bg:#faf8f5;--wh:#fff;--r:4px;--sh:0 2px 12px rgba(0,0,0,.08);--green:#1a5c2a;--blue:#2563eb;--warn:#7a4f00}body{font-family:"EB Garamond",Georgia,serif;font-size:17px;line-height:1.6;color:var(--ink);background:var(--bg);min-height:100vh}.ah{background:var(--m);color:#fff;border-bottom:3px solid var(--g)}.hi{max-width:960px;margin:0 auto;padding:20px 24px;display:flex;align-items:center;gap:16px}.hb{width:44px;height:44px;background:var(--g);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px}.ht{font-size:13px;text-transform:uppercase;letter-spacing:.12em;opacity:.8;font-family:"DM Mono",monospace}.hs{font-size:20px;font-weight:600}.nav{background:var(--md);padding:0 24px}.navi{max-width:960px;margin:0 auto;display:flex}.nt{padding:10px 20px 10px 0;font-size:12px;font-family:"DM Mono",monospace;color:rgba(255,255,255,.5);text-decoration:none;border-bottom:2px solid transparent;display:inline-block}.nt.active{color:var(--g);border-bottom-color:var(--g)}.main{max-width:960px;margin:0 auto;padding:40px 24px 60px}.st{font-size:26px;font-weight:600;color:var(--m);margin-bottom:6px}.sd{color:var(--mu);font-size:15px;font-family:"DM Mono",monospace;margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid var(--bo)}.card{background:var(--wh);border:1px solid var(--bo);border-radius:var(--r);padding:28px;margin-bottom:24px;box-shadow:var(--sh)}.ct{font-size:12px;font-family:"DM Mono",monospace;text-transform:uppercase;letter-spacing:.1em;color:var(--m);margin-bottom:18px;padding-bottom:10px;border-bottom:1px solid var(--ml)}.fi{margin-bottom:18px}.fi:last-child{margin-bottom:0}.fr{display:grid;grid-template-columns:1fr 1fr;gap:16px}label{display:block;font-size:12px;font-family:"DM Mono",monospace;color:var(--mu);text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px}.rq{color:var(--m)}input,select,textarea{width:100%;padding:10px 14px;border:1px solid var(--bo);border-radius:var(--r);font-family:"EB Garamond",Georgia,serif;font-size:16px;color:var(--ink);background:var(--bg);outline:none;-webkit-appearance:none;transition:border-color .15s}input:focus,select:focus,textarea:focus{border-color:var(--m);background:var(--wh)}textarea{resize:vertical;min-height:80px}.hp{font-size:12px;color:var(--mu);margin-top:4px;font-family:"DM Mono",monospace}.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;font-family:"DM Mono",monospace;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;border:none;border-radius:var(--r);cursor:pointer}.bp{background:var(--m);color:#fff}.bp:disabled{opacity:.6;cursor:not-allowed}.ba{background:var(--green);color:#fff;font-size:14px;padding:14px 32px}.bc{background:#fff;color:var(--warn);border:2px solid var(--warn);font-size:14px;padding:14px 32px}.bd{background:#fff;color:var(--blue);border:2px solid var(--blue);font-size:13px;padding:12px 24px}.bg{display:flex;gap:16px;margin-top:28px;padding-top:24px;border-top:1px solid var(--bo);flex-wrap:wrap}.err{background:#fdf0f0;color:#8b1c1c;border-left:4px solid #8b1c1c;padding:14px 18px;border-radius:var(--r);margin-bottom:20px;font-size:14px}.warn-box{background:#fdf6e3;border:1px solid var(--g);border-radius:var(--r);padding:16px 20px;margin-bottom:20px;font-size:14px;color:var(--warn);font-family:"DM Mono",monospace}.js{background:var(--ml);border:1px solid #e8d4d4;border-radius:var(--r);padding:18px;margin-bottom:24px}.jst{font-size:11px;font-family:"DM Mono",monospace;text-transform:uppercase;letter-spacing:.1em;color:var(--m);margin-bottom:10px}.jsg{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px}.ji{font-size:14px}.ji span{font-family:"DM Mono",monospace;font-size:11px;text-transform:uppercase;color:var(--mu);display:block}.done{text-align:center;padding:60px 20px}.done-i{font-size:56px;margin-bottom:16px}.done-t{font-size:26px;color:var(--m);margin-bottom:8px}.done-s{color:var(--mu);font-size:15px}.bid{display:inline-block;background:var(--m);color:#fff;font-family:"DM Mono",monospace;font-size:14px;padding:6px 16px;border-radius:20px;margin:12px 0}.rg{display:flex;flex-direction:column;gap:10px}.ro{display:flex;align-items:center;gap:12px;padding:12px 16px;border:1px solid var(--bo);border-radius:var(--r);cursor:pointer;background:var(--bg)}.ro.sel{border-color:var(--m);background:var(--ml)}.ro input{width:18px;height:18px}.rl{font-size:16px;cursor:pointer}.nt2{background:var(--ml);border:1px solid #e8d4d4;border-radius:var(--r);padding:12px 16px;font-size:13px;color:var(--md);margin-bottom:20px;font-family:"DM Mono",monospace}.tbox{background:var(--md);color:#fff;border-radius:var(--r);padding:12px 18px;margin-top:12px;font-family:"DM Mono",monospace;font-size:13px;display:flex;justify-content:space-between}.sp{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.bw{margin-bottom:10px}.bt{display:flex;justify-content:space-between;font-size:12px;font-family:"DM Mono",monospace;margin-bottom:3px}.bb{background:var(--bo);border-radius:3px;height:8px}.bf{border-radius:3px;height:8px;transition:width .4s}.upload-area{border:2px dashed var(--bo);border-radius:var(--r);padding:20px;text-align:center;cursor:pointer;transition:border-color .15s;background:var(--bg)}.upload-area:hover,.upload-area.drag{border-color:var(--m);background:var(--ml)}.upload-area input{display:none}.upload-label{font-family:"DM Mono",monospace;font-size:12px;color:var(--mu)}.upload-name{font-family:"DM Mono",monospace;font-size:12px;color:var(--green);margin-top:6px}.var-pos{color:var(--green);font-weight:600}.var-neg{color:#8b1c1c;font-weight:600}@media(max-width:600px){.fr,.jsg,.bg{grid-template-columns:1fr;flex-direction:column}}';
function Bar(P){var p=P.max>0?(P.value/P.max)*100:0;return<div className="bw"><div className="bt"><span style={{color:"var(--ink)"}}>{P.label}</span><span style={{color:"var(--mu)",fontWeight:600}}>{P.value}</span></div><div className="bb"><div className="bf" style={{width:p+"%",background:P.color||"var(--m)"}}/></div></div>;}
function Dashboard(){
  const[jobs,sJ]=useState([]);const[ld,sL]=useState(true);
  useEffect(function(){(async function(){var a=[];var off=null;do{var u=AT.url()+"?pageSize=100"+(off?"&offset="+off:"");var d=await(await fetch(u,{headers:AT.h()})).json();a=a.concat(d.records||[]);off=d.offset;}while(off);sJ(a.map(function(r){return r.fields;}));sL(false);})();},[]);
  if(ld)return<div style={{padding:60,textAlign:"center",color:"var(--mu)",fontFamily:"'DM Mono',monospace"}}>Loading…</div>;
  if(!jobs.length)return<div style={{padding:60,textAlign:"center"}}><div style={{fontSize:48,marginBottom:16}}>📋</div><p style={{color:"var(--mu)",fontFamily:"'DM Mono',monospace"}}>No jobs yet.</p></div>;
  var tot=jobs.length,bS={},bD={},bT={},bP={},tH=0,tP=0,aH=0,aP=0,aC=0,tAH=0,tAP=0,cC=0;
  jobs.forEach(function(j){var s=j.Status||"Unknown";bS[s]=(bS[s]||0)+1;bD[j.Department||"?"]=(bD[j.Department||"?"]||0)+1;bT[j.JobType||"?"]=(bT[j.JobType||"?"]||0)+1;var pi=j.FacultyName||"?";if(!bP[pi])bP[pi]={j:0,h:0};bP[pi].j++;var h=parseFloat(j.HoursEst)||0,pr=parseFloat(j.PartsEst)||0;tH+=h;tP+=pr;bP[pi].h+=h;if(s==="Approved"){aH+=h;aP+=pr;aC++;}if(s==="Complete"){tAH+=parseFloat(j.ActualHours)||0;tAP+=parseFloat(j.ActualParts)||0;cC++;}});
  var SC={"Pending Shop Review":"#c8a951","Needs Discussion":"#2563eb","Pending PI Approval":"#5c1212","Approved":"#1a5c2a","Needs Clarification":"#7a4f00","Complete":"#333"};
  var mD=Math.max(1,...Object.values(bD)),mPv=Math.max(1,...Object.values(bP).map(function(v){return v.j;}));
  var totR=Math.round(tH*75)+Math.round(tP),appR=Math.round(aH*75)+Math.round(aP),actR=Math.round(tAH*75)+Math.round(tAP);
  function St(P){return<div style={{background:"var(--wh)",border:"1px solid var(--bo)",borderRadius:"var(--r)",padding:"18px 22px",boxShadow:"var(--sh)",borderTop:"3px solid "+(P.c||"var(--m)")}}><div style={{fontSize:11,fontFamily:"'DM Mono',monospace",textTransform:"uppercase",letterSpacing:".1em",color:"var(--mu)",marginBottom:6}}>{P.l}</div><div style={{fontSize:26,fontWeight:600,color:P.c||"var(--ink)",lineHeight:1,fontFamily:"'DM Mono',monospace"}}>{P.v}</div>{P.s&&<div style={{fontSize:12,color:"var(--mu)",marginTop:5,fontFamily:"'DM Mono',monospace"}}>{P.s}</div>}</div>;}
  return<div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:28}}>
      <St l="Total Jobs" v={tot} s={cC+" complete"} c="var(--m)"/>
      <St l="Labor Hours Est." v={tH.toFixed(1)+"h"} s={fmt$(tH*75)+" @ $75/hr"} c="var(--blue)"/>
      <St l="Parts Est." v={fmt$(tP)} s="materials & supplies" c="var(--warn)"/>
      <St l="Total Est. Revenue" v={fmt$(totR)} s={cC>0?"Actual: "+fmt$(actR)+" ("+cC+" done)":aC+" approved ("+fmt$(appR)+")"} c="var(--green)"/>
    </div>
    {cC>0&&<div className="warn-box" style={{marginBottom:24}}>
      <strong>Variance summary ({cC} completed jobs):</strong> Labor est {tH.toFixed(1)}h — actual {tAH.toFixed(1)}h — revenue est {fmt$(totR)} vs actual {fmt$(actR)} — <span className={actR<totR*0.85?"var-neg":"var-pos"}>{actR<totR*0.85?"⚠ Significant under-reporting detected":"✅ On track"}</span>
    </div>}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
      <div className="card"><div className="ct">By Status</div>{Object.entries(bS).sort(function(a,b){return b[1]-a[1];}).map(function(e){return<Bar key={e[0]} label={e[0]} value={e[1]} max={tot} color={SC[e[0]]||"#999"}/>;})}</div>
      <div className="card"><div className="ct">By Job Type</div>{Object.entries(bT).sort(function(a,b){return b[1]-a[1];}).map(function(e){return<Bar key={e[0]} label={e[0]} value={e[1]} max={tot} color="var(--m)"/>;})}</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
      <div className="card"><div className="ct">By Department</div>{Object.entries(bD).sort(function(a,b){return b[1]-a[1];}).map(function(e){return<Bar key={e[0]} label={e[0]} value={e[1]} max={mD} color="var(--blue)"/>;})}</div>
      <div className="card"><div className="ct">By PI / Faculty</div>{Object.entries(bP).sort(function(a,b){return b[1].j-a[1].j;}).map(function(e){return<Bar key={e[0]} label={e[0]} value={e[1].j+" job"+(e[1].j!==1?"s":"")+(e[1].h?" · "+e[1].h.toFixed(1)+"h":"")} max={mPv} color="var(--g)"/>;})}</div>
    </div>
    <div className="card"><div className="ct">All Jobs</div><div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead><tr style={{borderBottom:"2px solid var(--bo)"}}>{["ID","Submitter","PI","Dept","Job","Hrs Est","Parts Est","Hrs Act","Parts Act","Variance","Status","Speedtype"].map(function(h){return<th key={h} style={{textAlign:"left",padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:10,textTransform:"uppercase",color:"var(--mu)",whiteSpace:"nowrap"}}>{h}</th>;})}</tr></thead>
        <tbody>{[...jobs].sort(function(a,b){return(b.Timestamp||"").localeCompare(a.Timestamp||"");}).map(function(j,i){
          var sc=SC[j.Status||""]||"#999";
          var eT=(parseFloat(j.HoursEst)||0)*75+(parseFloat(j.PartsEst)||0);
          var aT=(parseFloat(j.ActualHours)||0)*75+(parseFloat(j.ActualParts)||0);
          var vari=j.ActualHours?Math.round(aT-eT):null;
          return<tr key={i} style={{borderBottom:"1px solid var(--bo)"}}>
            <td style={{padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:11,color:"var(--m)",fontWeight:600,whiteSpace:"nowrap"}}>{j.JobID||"—"}</td>
            <td style={{padding:"8px 10px",whiteSpace:"nowrap"}}>{j.SubmitterName||"—"}</td>
            <td style={{padding:"8px 10px",whiteSpace:"nowrap"}}>{j.FacultyName||"—"}</td>
            <td style={{padding:"8px 10px",whiteSpace:"nowrap",fontSize:12}}>{j.Department||"—"}</td>
            <td style={{padding:"8px 10px",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{j.JobName||"—"}</td>
            <td style={{padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:11,whiteSpace:"nowrap"}}>{j.HoursEst?j.HoursEst+"h":"—"}</td>
            <td style={{padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:11,whiteSpace:"nowrap"}}>{j.PartsEst?fmt$(j.PartsEst):"—"}</td>
            <td style={{padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:11,whiteSpace:"nowrap"}}>{j.ActualHours?j.ActualHours+"h":"—"}</td>
            <td style={{padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:11,whiteSpace:"nowrap"}}>{j.ActualParts?fmt$(j.ActualParts):"—"}</td>
            <td style={{padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:11,whiteSpace:"nowrap"}}>{vari!==null?<span className={vari>0?"var-neg":"var-pos"}>{vari>0?"+":""}{fmt$(vari)}</span>:"—"}</td>
            <td style={{padding:"8px 10px",whiteSpace:"nowrap"}}><span style={{background:sc+"22",color:sc,border:"1px solid "+sc+"44",borderRadius:20,padding:"2px 9px",fontSize:10,fontFamily:"'DM Mono',monospace"}}>{j.Status||"—"}</span></td>
            <td style={{padding:"8px 10px",fontFamily:"'DM Mono',monospace",fontSize:11,color:"var(--green)"}}>{j.Speedtype?"✔ Submitted":"—"}</td>
          </tr>;
        })}
        </tbody>
      </table>
    </div></div>
  </div>;
}
function IntakeForm(){
  const[f,sF]=useState({nm:"",em:"",ph:"",pn:"",pe:"",dp:"",tp:"",jb:"",dr:"",st:""});
  const[files,sFiles]=useState([]);const[drag,sDrag]=useState(false);
  const[st2,sSt]=useState(null);const[id,sId]=useState("");
  const[uploadStatus,sUS]=useState("");
  const fileRef=useRef();
  var s=function(k){return function(e){sF(function(p){var o={...p};o[k]=e.target.value;return o;});};};
  function onFile(e){
    var fl=e.target.files?Array.from(e.target.files):[];
    sFiles(function(prev){
      var names=prev.map(function(f){return f.name;});
      var newFiles=fl.filter(function(f){return!names.includes(f.name);});
      return prev.concat(newFiles);
    });
  }
  function removeFile(name){sFiles(function(prev){return prev.filter(function(f){return f.name!==name;});});}
  async function sub(e){e.preventDefault();sSt("s");sUS("");try{
    var jid=await AT.nextId();sId(jid);
    var rec=await AT.create({JobID:jid,SubmitterName:f.nm,SubmitterEmail:f.em,Phone:f.ph,FacultyName:f.pn,PIEmail:f.pe,Department:f.dp,JobType:f.tp,JobName:f.jb,Drawings:f.dr,Stock:f.st,Status:"Pending Shop Review",Timestamp:new Date().toISOString()});
    var attachLines="";
    if(files.length>0&&rec.id){
      for(var i=0;i<files.length;i++){
        var fi=files[i];
        sUS("Uploading "+(i+1)+"/"+files.length+": "+fi.name+"...");
        try{
          // Use FormData directly - most reliable approach
          var fd=new FormData();
          fd.append("file",fi,fi.name);
          fd.append("filename",fi.name);
          fd.append("contentType",fi.type||"application/octet-stream");
          fd.append("fieldName","Attachments");
          var ur=await fetch("https://content.airtable.com/v0/"+AT_BASE+"/"+rec.id+"/uploadAttachment",{
            method:"POST",headers:{Authorization:"Bearer "+AT_TOKEN},body:fd
          });
          if(ur.ok){
            attachLines+="\n  • "+fi.name+" ("+(fi.size/1024).toFixed(1)+"KB) ✔";
          } else {
            var uerr=await ur.text();
            attachLines+="\n  • "+fi.name+" - upload failed: "+ur.status;
            console.error("Upload failed for",fi.name,":",uerr);
          }
        }catch(ue){
          attachLines+="\n  • "+fi.name+" - error: "+ue.message;
          console.error("Upload error for",fi.name,":",ue);
        }
        await new Promise(function(x){setTimeout(x,500);});
      }
    }
    sUS("");
    var attachSection=files.length>0?"\n\nAttachments ("+files.length+" file"+(files.length!==1?"s":"")+"):"+attachLines+"\n\nView all attachments in Airtable: https://airtable.com/"+AT_BASE+"/"+rec.id:"";
    var lk=ou()+"/#review?job="+jid;
    var mg="New job submitted.\n\nJob ID: "+jid+"\nJob: "+f.jb+"\nFrom: "+f.nm+" <"+f.em+">\nPI: "+f.pn+" <"+f.pe+">\nDept: "+f.dp+"\nType: "+f.tp+attachSection+"\n\nEnter your estimate:\n"+lk;
    await mail(SHOP,"[New Shop Job] "+jid+": "+f.jb,mg);
    await mail(NOTIFY,"[New Shop Job] "+jid+": "+f.jb,mg);
    sSt("ok");
  }catch(err){console.error(err);sUS("");sSt("e");}}
  if(st2==="ok")return<div className="done"><div className="done-i">📋</div><h2 className="done-t">Job Submitted</h2><div className="bid">{id}</div><p className="done-s">Received. The shop will be in touch.</p></div>;
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
    <div className="card"><div className="ct">📎 Drawings / Attachments (optional)</div>
      <div className={"upload-area"+(drag?" drag":"")} onDragOver={function(e){e.preventDefault();sDrag(true);}} onDragLeave={function(){sDrag(false);}} onDrop={function(e){e.preventDefault();sDrag(false);var fl=Array.from(e.dataTransfer.files||[]);sFiles(function(prev){var names=prev.map(function(x){return x.name;});return prev.concat(fl.filter(function(x){return!names.includes(x.name);}));});}} onClick={function(){fileRef.current&&fileRef.current.click();}}>
        <input type="file" ref={fileRef} onChange={onFile} accept=".pdf,.dxf,.dwg,.png,.jpg,.jpeg,.step,.stl" multiple/>
        <div className="upload-label">📁 Click or drag to attach files</div>
        <div className="hp" style={{marginTop:4}}>PDF, DXF, DWG, PNG, JPG, STEP, STL — multiple files OK</div>
      </div>
      {files.length>0&&<div style={{marginTop:12}}>
        {files.map(function(fi,i){return<div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 10px",background:"var(--ml)",borderRadius:"var(--r)",marginBottom:4,fontSize:13,fontFamily:"'DM Mono',monospace"}}>
          <span style={{color:"var(--green)"}}>• {fi.name} <span style={{color:"var(--mu)"}}>({(fi.size/1024).toFixed(1)}KB)</span></span>
          <span onClick={function(){removeFile(fi.name);}} style={{cursor:"pointer",color:"var(--m)",fontWeight:600,padding:"0 4px"}}>×</span>
        </div>;})}
        <div style={{fontSize:12,color:"var(--mu)",fontFamily:"'DM Mono',monospace",marginTop:4}}>{files.length} file{files.length!==1?"s":""} ready to upload</div>
      </div>}
      {uploadStatus&&<div style={{marginTop:8,fontSize:12,color:"var(--blue)",fontFamily:"'DM Mono',monospace"}}><span className="sp" style={{borderTopColor:"var(--blue)",borderColor:"rgba(37,99,235,.3)"}}/> {uploadStatus}</div>}
    </div>
    {st2==="e"&&<div className="err">Something went wrong. Please try again.</div>}
    <button type="submit" className="btn bp" disabled={st2==="s"}>{st2==="s"?<><span className="sp"/> {uploadStatus||"Submitting…"}</>:"Submit Job Request →"}</button>
  </form>;
}
function ShopReview(P){
  var jobId=P.jobId;
  const[rec,sR]=useState(null);const[ld,sL]=useState(true);
  const[sd,sSd]=useState("");
  const[h,sH]=useState("");
  const[ed,sEd]=useState("");
  const[parts,sParts]=useState("");
  const[nt,sNt]=useState("");
  const[st,sSt]=useState(null);
  useEffect(function(){if(jobId)AT.find(jobId).then(function(r){sR(r);sL(false);});},[jobId]);
  var laborCost=Math.round((parseFloat(h)||0)*75);
  var partsCost=parseFloat(parts)||0;
  var totalEst=laborCost+partsCost;
  async function submitDiscussion(){
    if(!sd){alert("Please enter a planned start date first.");return;}
    sSt("sd");
    try{
      await AT.update(rec.id,{Status:"Needs Discussion",StartDate:sd});
      var j=rec.fields;
      var reviewLk=ou()+"/#review?job="+jobId;
      await mail(j.SubmitterEmail,"[Shop Job "+jobId+"] Discussion needed before estimate","Hello "+j.SubmitterName+",\n\nWalter has reviewed your shop job request and needs to discuss it with you before providing an estimate.\n\nJob: "+j.JobName+"\nJob ID: "+jobId+"\nPlanned start: "+sd+"\n\nPlease contact Walter at wrp@physics.umass.edu or HAS 6 to arrange a discussion.\n\nPhysics Machine Shop | UMass Amherst");
      await mail(SHOP,"[Reminder] Enter estimate for "+jobId+" after discussion","Hi Walter,\n\nThis is a reminder to enter the estimate for "+jobId+" ("+j.JobName+") after your discussion with "+j.SubmitterName+".\n\nWhen ready, enter the estimate here:\n"+reviewLk+"\n\nPhysics Machine Shop");
      await mail(NOTIFY,"[Shop] "+jobId+" — Needs Discussion","Walter flagged "+jobId+" ("+j.JobName+") for discussion with submitter "+j.SubmitterName+".\nPlanned start: "+sd);
      sSt("disc_done");
    }catch(err){console.error(err);sSt("e");}
  }
  async function submitEstimate(e){
    e.preventDefault();sSt("s");
    try{
      await AT.update(rec.id,{Status:"Pending PI Approval",HoursEst:parseFloat(h)||0,StartDate:sd,CompletionDate:ed,PartsEst:parts,ShopNotes:nt});
      var j=rec.fields,lk=ou()+"/#approve?job="+jobId;
      var mg="Dear "+j.FacultyName+",\n\n"+j.SubmitterName+" submitted a shop job requiring your approval.\n\nJob: "+j.JobName+"\nID: "+jobId+"\n\nShop Estimate:\nLabor: "+h+" hrs @ $75/hr = "+fmt$(laborCost)+"\nParts/materials: "+fmt$(partsCost)+"\nTotal estimate: "+fmt$(totalEst)+"\nStart: "+sd+"\nCompletion: "+ed+(nt?"\nNotes: "+nt:"")+"\n\nApprove or request clarification:\n"+lk+"\n\nPhysics Machine Shop | HAS 6 | wrp@physics.umass.edu";
      await mail(j.PIEmail,"[Action Required] Approve "+jobId+": "+j.JobName,mg);
      await mail(NOTIFY,"[Shop] "+jobId+" estimate submitted, PI notified",mg);
      sSt("ok");
    }catch(err){console.error(err);sSt("e");}
  }
  if(ld)return<p style={{color:"var(--mu)",padding:40}}>Loading job…</p>;
  if(!rec)return<div className="err" style={{marginTop:40}}>Job {jobId} not found in Airtable.</div>;
  var j=rec.fields;
  var needsDisc=j.Status==="Needs Discussion";
  if(st==="disc_done")return<div className="done"><div className="done-i">💬</div><h2 className="done-t">Discussion Flagged</h2><div className="bid">{jobId}</div><p className="done-s">{j.SubmitterName} has been notified. You will receive a reminder email with a link to enter the estimate after your discussion.</p></div>;
  if(st==="ok")return<div className="done"><div className="done-i">📨</div><h2 className="done-t">Estimate Submitted</h2><div className="bid">{jobId}</div><p className="done-s">{j.FacultyName} has been emailed an approval request.</p></div>;
  return<div>
    <div className="js"><div className="jst">Job — {jobId}</div><div className="jsg">
      <div className="ji"><span>Submitted by</span>{j.SubmitterName} &lt;{j.SubmitterEmail}&gt;</div>
      <div className="ji"><span>PI</span>{j.FacultyName} &lt;{j.PIEmail}&gt;</div>
      <div className="ji"><span>Dept</span>{j.Department}</div><div className="ji"><span>Job</span>{j.JobName}</div>
      <div className="ji"><span>Type</span>{j.JobType}</div><div className="ji"><span>Status</span>{j.Status}</div>
    </div></div>
    {needsDisc&&<div className="warn-box">💬 This job is pending discussion. Once you've spoken with the submitter, enter the full estimate below and submit to the PI.</div>}
    <div className="card"><div className="ct">🗓 Schedule</div>
      <div className="fi"><label>Planned start date <span className="rq">*</span></label>
        <input required type="date" value={sd||j.StartDate||""} onChange={function(e){sSd(e.target.value);}}/>
        <p className="hp">Enter when you plan to begin the job</p>
      </div>
    </div>
    <div className="card"><div className="ct">⏱ Estimate {needsDisc&&<span style={{fontSize:11,color:"var(--blue)",fontWeight:400,marginLeft:8}}>(enter after discussion)</span>}</div>
      <div className="fr">
        <div className="fi"><label>Labor hours <span className="rq">*</span></label><input required type="number" min="0.5" step="0.5" value={h} onChange={function(e){sH(e.target.value);}}/><p className="hp">@ $75/hr shop rate</p></div>
        <div className="fi"><label>Parts / materials cost ($)</label><input type="number" min="0" step="0.01" value={parts} onChange={function(e){sParts(e.target.value);}}/><p className="hp">Parts, supplies, stock</p></div>
      </div>
      {(parseFloat(h)||parseFloat(parts))>0&&<div className="tbox"><span>Total estimate</span><span>{fmt$(totalEst)} <span style={{opacity:.7,fontSize:11}}>(labor + parts)</span></span></div>}
      <div className="fi" style={{marginTop:16}}><label>Completion date <span className="rq">*</span></label><input required type="date" value={ed} onChange={function(e){sEd(e.target.value);}}/></div>
      <div className="fi"><label>Notes for PI</label><textarea value={nt} onChange={function(e){sNt(e.target.value);}} rows={3}/></div>
    </div>
    {st==="e"&&<div className="err">Something went wrong.</div>}
    <div className="bg">
      <button type="button" className="btn bp" disabled={st==="s"||st==="sd"} onClick={submitEstimate}>{st==="s"?<><span className="sp"/> Submitting…</>:"Submit Estimate → Notify PI"}</button>
      {!needsDisc&&<button type="button" className="btn bd" disabled={st==="s"||st==="sd"} onClick={submitDiscussion}>{st==="sd"?<><span className="sp"/> Sending…</>:"💬 Needs Discussion First"}</button>}
    </div>
  </div>;
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
    var compLk=ou()+"/#complete?job="+jobId;
    await mail(SHOP,"[Shop] "+jobId+" — "+sv2,"PI "+j.FacultyName+": "+sv2+(ok&&spd?"\nSpeedtype: "+spd:"")+(com?"\nComments: "+com:"")+"\nJob: "+j.JobName+(ok?"\n\nWhen job is complete, log actuals here:\n"+compLk:""));
    await mail(j.SubmitterEmail,"Your shop job "+jobId+" — "+sv2,"Hello "+j.SubmitterName+",\n\nYour job '"+j.JobName+"' ("+jobId+"): "+sv2+"\n\n"+(ok?"Approved! The shop will be in touch.":"The PI will contact you.")+(com?"\n\nPI: "+com:""));
    await mail(NOTIFY,"[Shop] "+jobId+" — "+sv2,"PI "+j.FacultyName+": "+sv2+"\nJob: "+j.JobName+(ok&&spd?"\nSpeedtype received":""));
    sSt("ok");
  }catch(err){console.error(err);sSt("e");}}
  if(ld)return<p style={{color:"var(--mu)",padding:40}}>Loading…</p>;
  if(!rec)return<div className="err" style={{marginTop:40}}>Job {jobId} not found.</div>;
  var j=rec.fields;var ok2=dec==="a";
  var hrs=j.HoursEst,pts=j.PartsEst,hasEst=hrs||pts||j.StartDate;
  var laborAmt=Math.round((parseFloat(hrs)||0)*75),partsAmt=parseFloat(pts)||0;
  if(st==="ok")return<div className="done"><div className="done-i">{ok2?"✅":"💬"}</div><h2 className="done-t">{ok2?"Job Approved":"Clarification Requested"}</h2><div className="bid">{jobId}</div><p className="done-s">{ok2?"The shop has been notified and will proceed.":"The shop and submitter have been notified."}</p></div>;
  return<form onSubmit={sub}>
    <div className="js"><div className="jst">Job — {jobId}</div><div className="jsg">
      <div className="ji"><span>Job</span>{j.JobName}</div><div className="ji"><span>Submitted by</span>{j.SubmitterName}</div>
      <div className="ji"><span>Type</span>{j.JobType}</div><div className="ji"><span>Dept</span>{j.Department}</div>
    </div></div>
    {hasEst&&<div className="card"><div className="ct">⏱ Shop Estimate</div><div className="jsg">
      {hrs&&<div className="ji"><span>Labor</span>{hrs} hrs @ $75/hr = {fmt$(laborAmt)}</div>}
      {pts&&<div className="ji"><span>Parts / materials</span>{fmt$(partsAmt)}</div>}
      {(hrs||pts)&&<div className="ji"><span>Total estimate</span>{fmt$(laborAmt+partsAmt)}</div>}
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
      {dec==="a"&&<div className="fi" style={{marginTop:14,paddingTop:14,borderTop:"1px solid var(--bo)"}}><label>Speedtype <span className="rq">*</span></label><input required={dec==="a"} value={spd} onChange={function(e){sSp(e.target.value);}} placeholder="e.g. 12345678"/><p className="hp">Required to authorize charges. Will not be shown publicly.</p></div>}
    </div>
    {st==="e"&&<div className="err">Something went wrong.</div>}
    <div className="bg">
      <button type="submit" className="btn ba" disabled={dec!=="a"||st==="s"} onClick={function(){sD("a");}}>{st==="s"&&dec==="a"?<><span className="sp"/> Submitting…</>:"✅ Approve Job"}</button>
      <button type="submit" className="btn bc" disabled={dec!=="c"||st==="s"} onClick={function(){sD("c");}}>{st==="s"&&dec==="c"?<><span className="sp"/> Submitting…</>:"💬 Needs Clarification"}</button>
    </div>
  </form>;
}
function JobComplete(P){
  var jobId=P.jobId;
  const[rec,sR]=useState(null);const[ld,sL]=useState(true);
  const[ah,sAh]=useState("");const[ap,sAp]=useState("");const[cd,sCd]=useState("");const[cn,sCn]=useState("");
  const[st,sSt]=useState(null);
  useEffect(function(){if(jobId)AT.find(jobId).then(function(r){sR(r);sL(false);});},[jobId]);
  async function sub(e){e.preventDefault();sSt("s");try{
    var j=rec.fields;
    var eT=(parseFloat(j.HoursEst)||0)*75+(parseFloat(j.PartsEst)||0);
    var aT=(parseFloat(ah)||0)*75+(parseFloat(ap)||0);
    var vari=Math.round(aT-eT);
    await AT.update(rec.id,{Status:"Complete",ActualHours:ah,ActualParts:ap,CompletedDate:cd,CompletionNotes:cn});
    var msg="Job "+jobId+" marked complete.\n\nJob: "+j.JobName+"\nPI: "+j.FacultyName+"\nSpeedtype: "+j.Speedtype+"\n\nEstimate vs Actual:\nLabor: "+j.HoursEst+"h est — "+ah+"h actual\nParts: "+fmt$(j.PartsEst||0)+" est — "+fmt$(ap||0)+" actual\nTotal: "+fmt$(eT)+" est — "+fmt$(aT)+" actual\nVariance: "+(vari>=0?"+":"")+fmt$(vari)+(cn?"\n\nNotes: "+cn:"");
    await mail(NOTIFY,"[Shop Complete] "+jobId+": "+j.JobName,msg);
    sSt("ok");
  }catch(err){console.error(err);sSt("e");}}
  if(ld)return<p style={{color:"var(--mu)",padding:40}}>Loading…</p>;
  if(!rec)return<div className="err" style={{marginTop:40}}>Job {jobId} not found.</div>;
  var j=rec.fields;
  if(j.Status==="Complete")return<div className="done"><div className="done-i">🏁</div><h2 className="done-t">Already Complete</h2><div className="bid">{jobId}</div><div style={{marginTop:12,fontFamily:"'DM Mono',monospace",fontSize:13,color:"var(--mu)"}}><div>Actual: {j.ActualHours}h — {fmt$(j.ActualParts||0)} parts</div><div>Completed: {j.CompletedDate}</div></div></div>;
  if(st==="ok")return<div className="done"><div className="done-i">🏁</div><h2 className="done-t">Job Marked Complete</h2><div className="bid">{jobId}</div><p className="done-s">Actuals recorded. Dashboard updated.</p></div>;
  var estH=parseFloat(j.HoursEst)||0,estP=parseFloat(j.PartsEst)||0;
  var actH=parseFloat(ah)||0,actP=parseFloat(ap)||0;
  var vari=Math.round((actH*75+actP)-(estH*75+estP));
  return<form onSubmit={sub}>
    <div className="js"><div className="jst">Closing out — {jobId}</div><div className="jsg">
      <div className="ji"><span>Job</span>{j.JobName}</div><div className="ji"><span>PI</span>{j.FacultyName}</div>
      <div className="ji"><span>Est. hours</span>{j.HoursEst||"—"} hrs</div><div className="ji"><span>Est. parts</span>{fmt$(j.PartsEst||0)}</div>
      <div className="ji"><span>Est. total</span>{fmt$(estH*75+estP)}</div><div className="ji"><span>Speedtype</span>✔ On file</div>
    </div></div>
    <div className="card"><div className="ct">✔️ Actual Costs</div>
      <div className="fr">
        <div className="fi"><label>Actual hours <span className="rq">*</span></label><input required type="number" min="0" step="0.5" value={ah} onChange={function(e){sAh(e.target.value);}}/></div>
        <div className="fi"><label>Actual parts cost ($)</label><input type="number" min="0" step="0.01" value={ap} onChange={function(e){sAp(e.target.value);}}/></div>
      </div>
      {(actH||actP)>0&&<div className="tbox" style={{background:vari>500?"#5c1212":"var(--md)"}}><span>Actual: {fmt$(actH*75+actP)}</span><span style={{fontSize:12}}>Variance: {vari>=0?"+":""}{fmt$(vari)}</span></div>}
      <div className="fi" style={{marginTop:16}}><label>Actual completion date <span className="rq">*</span></label><input required type="date" value={cd} onChange={function(e){sCd(e.target.value);}}/></div>
      <div className="fi"><label>Notes</label><textarea value={cn} onChange={function(e){sCn(e.target.value);}} rows={3}/></div>
    </div>
    {st==="e"&&<div className="err">Something went wrong.</div>}
    <button type="submit" className="btn bp" style={{background:"var(--green)"}} disabled={st==="s"}>{st==="s"?<><span className="sp"/> Saving…</>:"🏁 Mark Job Complete"}</button>
  </form>;
}
export default function App(){
  const[{view,params},sR]=useState(gv);
  useEffect(function(){var h=function(){sR(gv());};window.addEventListener("hashchange",h);return function(){window.removeEventListener("hashchange",h);};},[]);
  var tabs=[{id:"intake",l:"Job Intake"},{id:"review",l:"Shop Review"},{id:"approve",l:"PI Approval"}];
  var mm={
    intake:{t:"Job Intake Form",d:"Submit a new machine shop job request"},
    review:{t:"Shop Review",d:"Review job "+(params.job||"…")},
    approve:{t:"PI Approval",d:"Review and approve "+(params.job||"…")},
    complete:{t:"Mark Job Complete",d:"Log actual hours and costs for "+(params.job||"…")},
    dashboard:{t:"Department Dashboard",d:"Live overview — jobs, hours, revenue, variance"},
  };
  var meta=mm[view]||mm.intake;
  return<>
    <style>{css}</style>
    <header className="ah"><div className="hi"><div className="hb">⚙️</div><div><div className="ht">University of Massachusetts Amherst</div><div className="hs">Physics & Astronomy Machine Shop</div></div></div>
      <nav className="nav"><div className="navi">{tabs.map(function(t){return<a key={t.id} className={"nt"+(view===t.id?" active":"")} href={"/#"+t.id}>{t.l}</a>;})}</div></nav>
    </header>
    <main className="main"><h1 className="st">{meta.t}</h1><p className="sd">{meta.d}</p>
      {view==="intake"&&<IntakeForm/>}
      {view==="review"&&<ShopReview jobId={params.job}/>}
      {view==="approve"&&<PIApproval jobId={params.job}/>}
      {view==="complete"&&<JobComplete jobId={params.job}/>}
      {view==="dashboard"&&<Dashboard/>}
    </main>
  </>;
}