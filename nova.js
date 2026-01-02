// Load memory brain
let brain = JSON.parse(localStorage.getItem("novaBrain") || "{}");

// Math utilities
const square = n => n*n;
const cube = n => n*n*n;

// Male voice speech output
function speak(text){
  const u=new SpeechSynthesisUtterance(text);
  const v=speechSynthesis.getVoices().find(x=>x.name.toLowerCase().includes("male"));
  if(v) u.voice=v;
  u.rate=1;
  speechSynthesis.speak(u);
}

// Add messages with glitch reply effect
function addMessage(text,type){
  const d=document.createElement("div");
  d.className="msg "+type;
  d.textContent=text;
  document.getElementById("messages").appendChild(d);
  d.scrollIntoView({behavior:"smooth"});
  if(type==="nova") speak(text);
}

// Network speed monitor
async function getSpeed(){
  return navigator.connection ? navigator.connection.downlink+" Mbps" : "Unknown";
}

// Smart reply system
async function reply(text){
  const msg=text.toLowerCase().trim();

  // Time & date
  if(msg.includes("time")) return "Current time is "+new Date().toLocaleTimeString();
  if(msg.includes("date")) return "Today's date is "+new Date().toLocaleDateString();

  // Speed
  if(msg.includes("speed")) return "Network speed is "+await getSpeed();

  // Square / Cube
  if(msg.startsWith("square of")) return "Square is "+square(+msg.replace("square of",""));
  if(msg.startsWith("cube of")) return "Cube is "+cube(+msg.replace("cube of",""));

  // Teach memory
  if(msg.startsWith("learn this:")){
    const p=text.replace(/learn this:/i,"").split("=");
    if(p.length===2){
      brain[p[0].trim()]=p[1].trim();
      localStorage.setItem("novaBrain",JSON.stringify(brain));
      return "Core memory updated.";
    }
  }

  // Open 10 apps + reels/shorts
  const apps={
    "open google":"google",
    "open youtube":"youtube",
    "open facebook":"fb",
    "open instagram":"insta",
    "open chatgpt":"chatgpt",
    "open twitter":"twitter",
    "open whatsapp":"wa",
    "open github":"github",
    "open flipkart":"flipkart",
    "open phonepe":"phonepe",
    "open telegram":"tg"
  };

  if(apps[msg]){
    window.open(apps[msg]);
    return "Opening "+msg.replace("open ","");
  }

  // Instagram reels
  if(msg==="open instagram reels"){
    window.open("insta");
    return "Opening Instagram Reels feed.";
  }
  if(msg.includes("instagram reels")){
    window.open("insta");
    return "Launching reels panel.";
  }

  // YouTube Shorts / mobile app deep open
  if(msg==="youtube shorts" || msg==="open youtube shorts"){
    window.open("youtube");
    return "Opening YouTube Shorts.";
  }
  if(msg.includes("youtube shots") || msg.includes("youtube shorts")){
    window.open("youtube");
    return "Opening YouTube Shorts.";
  }

  // YouTube shorts in mobile
  if(msg.includes("youtube app") || msg.includes("youtube on mobile")){
    window.open("youtube");
    return "Opening YouTube app interface.";
  }

  // YouTube reels style command
  if(msg.includes("youtube shorts") || msg.includes("youtube shots")){
    window.open("youtube");
    return "Opening YouTube Shorts.";
  }

  // Creator vibe response
  if(brain[msg]) return brain[msg];

  return "Nova 4.2 active. Ask me anything, Ayan.";
}

// Send button handler
sendBtn.onclick=()=>{
  const t=input.value.trim();
  if(t){addMessage(t,"user");reply(t).then(r=>addMessage(r,"nova"))}
  input.value="";
}

// Speech Recognition live mic
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(SR){
  const r=new SR();
  r.lang="en-IN";
  voiceBtn.onclick=()=>r.start();
  r.onresult=e=>{
    const s=e.results[0][0].transcript;
    addMessage(s,"user");
    reply(s).then(r=>addMessage(r,"nova"));
  }
}

// Boot → Main UI transition
setTimeout(()=>{document.getElementById("boot").style.display="none";document.getElementById("ui").style.display="block";speak("Nova 4.2 online. Hello Ayan.")},3500);

// Live monitor panel update
setInterval(async()=>{
  timePanel.textContent="🕒 "+new Date().toLocaleTimeString();
  datePanel.textContent="📅 "+new Date().toLocaleDateString();
  speedPanel.textContent="⚡ "+await getSpeed();
},1000);

// App open shortcuts for mobile apps
const appLinks = {
  "google":"google",
  "youtube":"youtube",
  "fb":"fb",
  "insta":"insta",
  "chatgpt":"chatgpt",
  "twitter":"twitter",
  "wa":"wa",
  "github":"github",
  "flipkart":"flipkart",
  "phonepe":"phonepe",
  "telegram":"tg"
};

// Auto voice app launcher
async function openAppVoice(cmd){
  const m=cmd.toLowerCase();
  for(const k in appLinks){
    if(m.includes(k)){
      window.open(appLinks[k]);
      return "Opening "+k;
    }
  }
  return null;
}

// Matrix animation BG
const c=document.getElementById("matrix"),ctx=c.getContext("2d");
c.width=innerWidth;c.height=innerHeight;
const col=c.width/20,dr=Array(Math.floor(col)).fill(1);
setInterval(()=>{ctx.clearRect(0,0,c.width,c.height);ctx.font="18px monospace";dr.forEach((y,i)=>{ctx.fillText("01"[Math.floor(Math.random()*2)],i*20,y*20);if(y*20>c.height&&Math.random()>0.97)dr[i]=0;dr[i]++})},50);