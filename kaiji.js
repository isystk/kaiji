var u=Object.defineProperty;var w=(n,e,t)=>e in n?u(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var l=(n,e,t)=>w(n,typeof e!="symbol"?e+"":e,t);const a={randInt:(n,e=0)=>Math.floor(Math.random()*(n-e+1)+e),isNumeric:n=>typeof n=="number"&&!isNaN(n)&&isFinite(n),isFunction:n=>typeof n=="function",addCssRule(n){const e=document.createElement("style");document.head.appendChild(e);const t=e.sheet;t.insertRule(n,t.cssRules.length)}};class c{constructor(){l(this,"setting");this.setting={url:"./",img:{zawa:"images/zawa.jpg",kaiji:"images/kaiji.png"}}}getImage(e){return this.setting.url+this.setting.img[e]}run(){let e=5e3;const t=e,i=()=>{if(e>400){const s=t/e;for(let o=0;o<s;o++)this.zawazawa();setTimeout(i,e),e-=e/10}else this.zawazawa(()=>{this.breakContents(),this.showKaiji()})};i()}zawazawa(e){const t=new Image;t.onload=()=>{const i=a.randInt(window.scrollY+window.innerHeight-t.height,window.scrollY),s=a.randInt(window.scrollX+window.innerWidth-t.width,window.scrollX);Object.assign(t.style,{top:`${i}px`,left:`${s}px`,display:"block"});const o=t.animate([{opacity:0},{opacity:1}],{duration:2e3,fill:"forwards"});o.onfinish=()=>{setTimeout(()=>{const r=t.animate([{opacity:1},{opacity:0}],{duration:2e3,fill:"forwards"});r.onfinish=()=>{t.remove(),e&&e()}},500)}},t.src=this.getImage("zawa"),t.style.cssText=`
      position: absolute;
      z-index: 9999;
      border-radius: 20px;
      width: ${a.randInt(256,100)}px;
      display: none;
    `,document.body.appendChild(t)}breakContents(){const e=document.querySelectorAll("h1, h2, h3, h4, h5, p, li, dt, dd, pre, aside, header, footer");e.forEach((i,s)=>{const o=()=>`
        translateX(${a.randInt(window.innerWidth/2,-window.innerWidth/2)}px)
        translateY(${a.randInt(window.innerHeight/2,-window.innerHeight/2)}px)
        rotateX(${a.randInt(360,-360)}deg)
        rotateY(${a.randInt(360,-360)}deg)
      `,r=o(),m=o(),p=o();i.style.transition="transform 3.0s cubic-bezier(0.61, -0.22, 0.55, 1.1)",i.style.transform=r;const d=`move${s}`;a.addCssRule(`
        @keyframes ${d} {
          0%, 100% { transform: ${r}; }
          33% { transform: ${m}; }
          66% { transform: ${p}; }
        }
      `),i.addEventListener("transitionend",()=>{i.style.animation=`${d} 60s infinite linear`},{once:!0})});const t=i=>{i.preventDefault(),e.forEach(o=>{o.style.animation="",o.style.transform="translate(0,0) rotate(0)"});const s=document.querySelector("#kaijiMessage .marquee");s&&(s.textContent="See You!! ".repeat(5)),setTimeout(()=>{document.querySelectorAll(".kaiji").forEach(o=>{o.animate([{opacity:1},{opacity:0}],{duration:3e3}).onfinish=()=>o.remove()}),document.body.removeEventListener("click",t)},3e3)};document.body.addEventListener("click",t)}showKaiji(){const e=new Image;e.className="kaiji",e.onload=()=>{document.body.appendChild(e),e.animate([{opacity:0},{opacity:1}],{duration:2e3}).onfinish=()=>{e.style.display="block",this.createBalloon()}},e.src=this.getImage("kaiji"),e.style.cssText=`
      position: absolute;
      display: none;
      z-index: 9999;
      width: 256px;
      top: ${window.scrollY+window.innerHeight-300}px;
      left: ${window.scrollX+window.innerWidth-250}px;
    `}createBalloon(){const e=document.createElement("div");e.id="kaijiMessage",e.className="kaiji",e.innerHTML=`
      <div class="textinner">
        <p class="marquee">XSSのセキュリティホールがあるようです。不具合の修正をお願いします！ クリックすると元に戻るよ</p>
      </div>
      <div class="triangle"></div>
    `,a.addCssRule(`
      @keyframes marquee {
        from { transform: translateX(100%); }
        to { transform: translateX(-100%); }
      }
    `),Object.assign(e.style,{width:"250px",position:"absolute",top:`${window.scrollY+window.innerHeight-390}px`,left:`${window.scrollX+window.innerWidth-390}px`,zIndex:"9999"});const t=e.querySelector(".textinner");t&&Object.assign(t.style,{padding:"20px",backgroundColor:"#fff",border:"5px solid #000",borderRadius:"30px",overflow:"hidden"});const i=e.querySelector(".marquee");i&&Object.assign(i.style,{whiteSpace:"nowrap",display:"inline-block",animation:"marquee 10s linear infinite",fontSize:"20px"}),document.body.appendChild(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>new c().run()):new c().run();
