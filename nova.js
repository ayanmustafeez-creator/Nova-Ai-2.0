// ===== BRAIN MEMORY LOAD =====
let brain = JSON.parse(localStorage.getItem("novaBrain") || "{}");

// ===== MATH =====
const square = n => n*n;
const cube = n => n*n*n;

// ===== MALE VOICE =====
function speak(text){
  const u = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  const male = voices.find(v => v.name.toLowerCase().includes("male"));
  if(male) u.voice = male;
  speechSynthesis.speak(u);
}

// ===== GLITCH + BEEP REPLY =====
function glitchBeep(){
  const ac = new (window.AudioContext||window.webkitAudioContext)();
  const osc = ac.createOscillator();
  osc.connect(ac.destination);
  osc.frequency.value = 700;
  osc.start();
  osc.stop(ac.currentTime + 0.1);
}

// ===== UI MESSAGE ADD =====
function addMessage(text,type){
  const d = document.createElement("div");
  d.className = "msg "+type;
  d.textContent = text;
  document.getElementById("messages").appendChild(d);
  d.scrollIntoView({behavior:"smooth"});
  if(type==="nova"){ glitchBeep(); speak(text); }
}

// ===== NETWORK SPEED =====
async function getSpeed(){
  return navigator.connection ? navigator.connection.downlink+" Mbps" : "Unknown";
}

// ===== SMART REPLY SYSTEM =====
async function reply(text){
  const msg = text.toLowerCase().trim();

  if(msg.includes("time")) return "Time: "+new Date().toLocaleTimeString();
  if(msg.includes("date")) return "Date: "+newDate().toLocaleDateString();
  if(msg.includes("speed")) return "Internet speed: "+await getSpeed();

  if(msg.startsWith("square of")){let n=+msg.replace("square of","");if(!isNaN(n)) return "Square = "+square(n)}
  if(msg.startsWith("cube of")){let n=+msg.replace("cube of","");if(!isNaN(n)) return "Cube = "+cube(n)}

  if(brain[msg]) return brain[msg];

  if(msg.startsWith("learn this:")){
    const p = text.replace(/learn this:/i,"").split("=");
    if(p.length===2){
      brain[p[0].trim().toLowerCase()] = p[1].trim();
      localStorage.setItem("novaBrain", JSON.stringify(brain));
      return "Memory saved.";
    }
  }

  // ===== 10+ APP OPENING =====
  const appMap={
    "open youtube":"youtube",
    "open google":"google",
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

  if(appMap[msg]){window.open(appMap[msg]);return "Opening "+msg.replace("open ","")}

  if(msg.includes("instagram reels")){window.open("insta");return "Opening Instagram Reels"}
  if(msg.includes("youtube shorts")||msg.includes("youtube shots")){window.open("youtube");return "Opening YouTube Shorts"}

  return "I am Nova 4.5 — system stable. Ask me anything.";
}

// ===== INPUT HANDLERS =====
const input=document.getElementById("msgInput");
document.getElementById("sendBtn").onclick=()=>{let t=input.value.trim();if(t){addMessage(t,"user");reply(t).then(r=>addMessage(r,"nova"))}input.value=""};
input.onkeydown=e=>e.key==="Enter"&&sendBtn.click();

// ===== LIVE MIC FIX =====
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(SR){let r=new SR();r.lang="en-IN";document.getElementById("voiceBtn").onclick=()=>r.start();r.onresult=e=>{let s=e.results[0][0].transcript;addMessage(s,"user");reply(s).then(r=>addMessage(r,"nova"))}}

// ===== GUARANTEED BOOT HIDE (FIX) =====
window.addEventListener("load",()=>{
  setTimeout(()=>{
    document.getElementById("boot").style.display="none";
    document.getElementById("ui").style.display="block";
    speak("Nova 4.5 online. Hello Ayan.");
    addMessage("System ready.","nova");
  }, 3200);
});

// ===== LIVE PANEL UPDATES =====
setInterval(async()=>{
  document.getElementById("timePanel").textContent="🕒 "+newDate().toLocaleTimeString();
  document.getElementById("datePanel").textContent="📅 "+newDate().toLocaleDateString();
  document.getElementById("speedPanel").textContent="⚡ "+await getSpeed();
},1000);