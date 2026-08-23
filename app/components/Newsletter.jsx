"use client";

import { useState } from "react";

export default function Newsletter({ email, setEmail, subscribed, setSubscribed }) {
  return (
    <section className="newsletter" id="katil">
      <div className="container"><div className="newsletter-inner">            <div className="newsletter-icon"><svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg></div><div><h2>Haber Bültenimize Katılın</h2><p>Çalışmalarımızdan ve etkinliklerimizden haberdar olmak için bültenimize abone olun.</p></div><form className="newsletter-form" onSubmit={(e)=>{e.preventDefault();if(email){setSubscribed(true);setEmail("")}}}><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="E-posta adresiniz" required/><button className="btn btn-light">Abone Ol →</button></form></div></div>
      {subscribed && <div onClick={()=>setSubscribed(false)} style={{position:"fixed",right:20,bottom:20,zIndex:2000,background:"#fff",color:"var(--ink)",padding:"14px 18px",borderRadius:8,boxShadow:"0 12px 40px rgba(0,0,0,.2)",cursor:"pointer"}}>Bülten aboneliğiniz için teşekkürler.</div>}
    </section>
  );
}
