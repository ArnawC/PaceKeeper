(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();const Y="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20128%20128'%20role='img'%20aria-labelledby='title'%3e%3ctitle%3ePaceKeeper%3c/title%3e%3crect%20width='128'%20height='128'%20rx='24'%20fill='%230f766e'/%3e%3ccircle%20cx='64'%20cy='64'%20r='42'%20fill='%23f8fafc'/%3e%3ccircle%20cx='64'%20cy='64'%20r='32'%20fill='%23111827'/%3e%3cpath%20d='M64%2032v32l21%2018'%20fill='none'%20stroke='%23f59e0b'%20stroke-width='9'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M42%2098c12%208%2033%2010%2048%200'%20fill='none'%20stroke='%2322c55e'%20stroke-width='7'%20stroke-linecap='round'/%3e%3c/svg%3e";function Z({count:s,canDecrement:t=!0,label:e}){return`
    <section class="counter-panel" aria-labelledby="counter-heading">
      <div>
        <p class="section-kicker" id="counter-heading">${e}</p>
        <output class="counter-value" aria-live="polite">${s}</output>
      </div>
      <div class="counter-actions">
        <button class="counter-button decrement" type="button" data-action="decrement" ${t?"":"disabled"} aria-label="-1">-1</button>
        <button class="counter-button increment" type="button" data-action="increment" aria-label="+1">+1</button>
      </div>
    </section>
  `}const Q={idle:{action:"start",key:"start"},running:{action:"pause",key:"pause"},paused:{action:"resume",key:"resume"},complete:{action:"start",key:"startAgain"}};function tt({state:s,t}){const e=Q[s]??Q.idle;return`
    <div class="controls" aria-label="${t("timerControls")}">
      <button class="control-button primary" type="button" data-action="${e.action}">
        ${t(e.key)}
      </button>
      <button class="control-button" type="button" data-action="reset">
        ${t("reset")}
      </button>
    </div>
  `}function u(s,t,e){return Math.min(Math.max(s,t),e)}function p(s,t,e,n){const i=Number.parseInt(s,10);return Number.isNaN(i)?t:u(i,e,n)}function D(s){return Math.round(s*1e3)}function et(s){return Math.round(s*60*1e3)}function l(s){const t=Math.max(0,Math.round(s)),e=Math.floor(t/1e3),n=Math.floor(e/3600),i=Math.floor(e%3600/60),a=e%60;return n>0?`${n}:${String(i).padStart(2,"0")}:${String(a).padStart(2,"0")}`:`${i}:${String(a).padStart(2,"0")}`}function N(s){const t=Math.max(0,Math.round(s)),e=Math.floor(t/1e3),n=Math.floor(t%1e3/100),i=Math.floor(e/60),a=e%60;return`${i}:${String(a).padStart(2,"0")}.${n}`}function st(s){return`${s>0?"+":s<0?"-":""}${l(Math.abs(s))}`}function nt(s){return s>0?`+${s}`:String(s)}function it(s){return s?new Intl.DateTimeFormat(void 0,{hour:"2-digit",minute:"2-digit"}).format(new Date(s)):"--:--"}function S(s){return`${Math.round(u(s,0,1)*100)}%`}function at({value:s,label:t,detail:e=""}){const n=u(Number(s)||0,0,1);return`
    <div class="progress-wrap">
      <div class="progress-copy">
        <span>${t}</span>
        <strong>${S(n)}</strong>
      </div>
      <div class="progress-track" role="progressbar" aria-label="${t}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(n*100)}">
        <span class="progress-fill" style="width: ${S(n)}"></span>
      </div>
      ${e?`<p class="progress-detail">${e}</p>`:""}
    </div>
  `}function ot({label:s,value:t,tone:e="neutral"}){return`
    <article class="status-card tone-${e}">
      <span>${s}</span>
      <strong>${t}</strong>
    </article>
  `}function M(s){return`
    <section class="status-grid" aria-label="Session status">
      ${s.map(t=>ot(t)).join("")}
    </section>
  `}let y=null;async function rt(){const s=K();s&&s.state==="suspended"&&await s.resume()}async function lt({enabled:s=!0,frequency:t=880,volume:e=.6,durationMs:n=120}={}){if(!s)return;const i=K();if(!i)return;i.state==="suspended"&&await i.resume();const a=i.currentTime,o=i.createOscillator(),r=i.createGain(),d=Math.min(Math.max(e,0),1),h=Math.min(Math.max(t,120),2200),v=Math.min(Math.max(n,40),800)/1e3;o.type="sine",o.frequency.setValueAtTime(h,a),r.gain.setValueAtTime(1e-4,a),r.gain.exponentialRampToValueAtTime(Math.max(1e-4,d),a+.01),r.gain.exponentialRampToValueAtTime(1e-4,a+v),o.connect(r),r.connect(i.destination),o.start(a),o.stop(a+v+.02)}function ct(s=!0,t=[80]){s&&"vibrate"in navigator&&navigator.vibrate(t)}function ut(s=!0){s&&(document.documentElement.classList.remove("screen-flash"),window.requestAnimationFrame(()=>{document.documentElement.classList.add("screen-flash"),window.setTimeout(()=>document.documentElement.classList.remove("screen-flash"),240)}))}function K(){if(!("AudioContext"in window)&&!("webkitAudioContext"in window))return null;if(!y){const s=window.AudioContext||window.webkitAudioContext;y=new s}return y}class dt{constructor({intervalMs:t=6e4,onInterval:e=()=>{}}={}){this.intervalMs=F(t),this.onInterval=e,this.lastIntervalIndex=0}setIntervalMs(t){this.intervalMs=F(t)}reset(t=0){this.lastIntervalIndex=this.getExpectedCount(t)}update(t){const e=this.getExpectedCount(t);if(!this.intervalMs)return e;for(let n=this.lastIntervalIndex+1;n<=e;n+=1)this.onInterval({index:n,intervalMs:this.intervalMs,scheduledAtMs:n*this.intervalMs,elapsedMs:t});return this.lastIntervalIndex=Math.max(this.lastIntervalIndex,e),e}getExpectedCount(t){return this.intervalMs?Math.max(0,Math.floor(Math.max(0,t)/this.intervalMs)):0}getCountdownMs(t){if(!this.intervalMs)return null;const n=Math.max(0,t)%this.intervalMs;return n===0?this.intervalMs:this.intervalMs-n}}function F(s){const t=Number(s);return Number.isFinite(t)&&t>0?t:null}const H="pacekeeper:state:v1",q={theme:"system",sound:!0,volume:.65,beepFrequency:880,vibration:!0,flash:!0,keepAwake:!1,keyboardShortcuts:!0,language:"es",counterMode:"manual"},b={exam:{totalQuestions:80,durationMinutes:60},emom:{rounds:20,intervalSeconds:60},intervals:{intervalSeconds:60,targetCycles:10},stopwatch:{}},B=[{id:"pspo-i",name:"PSPO I",mode:"exam",config:{totalQuestions:80,durationMinutes:60}},{id:"psm-i",name:"PSM I",mode:"exam",config:{totalQuestions:80,durationMinutes:60}},{id:"pomodoro",name:"Pomodoro",mode:"intervals",config:{intervalSeconds:1500,targetCycles:1}},{id:"emom-20",name:"EMOM",mode:"emom",config:{rounds:20,intervalSeconds:60}}];function ht(){if(!U())return C();try{const s=window.localStorage.getItem(H);return s?z(JSON.parse(s)):C()}catch{return C()}}function pt(s){U()&&window.localStorage.setItem(H,JSON.stringify(z(s)))}function C(){return{settings:{...q},configs:I(b),profiles:I(B),lastMode:null,selectedProfileId:""}}function z(s={}){var t,e,n;return{settings:{...q,...s.settings??{}},configs:{exam:{...b.exam,...((t=s.configs)==null?void 0:t.exam)??{}},emom:{...b.emom,...((e=s.configs)==null?void 0:e.emom)??{}},intervals:{...b.intervals,...((n=s.configs)==null?void 0:n.intervals)??{}},stopwatch:{}},profiles:Array.isArray(s.profiles)&&s.profiles.length>0?s.profiles:I(B),lastMode:s.lastMode??null,selectedProfileId:s.selectedProfileId??""}}function I(s){return"structuredClone"in window?window.structuredClone(s):JSON.parse(JSON.stringify(s))}function U(){try{return typeof window<"u"&&"localStorage"in window}catch{return!1}}const mt=100;class gt{constructor({durationMs:t=null,tickMs:e=mt,onTick:n=()=>{},onComplete:i=()=>{}}={}){this.durationMs=R(t),this.tickMs=e,this.onTick=n,this.onComplete=i,this.state="idle",this.elapsedBeforeStart=0,this.startedAt=null,this.intervalId=null}start(){return this.state==="running"?this.getSnapshot():(this.clearInterval(),this.elapsedBeforeStart=0,this.startedAt=performance.now(),this.state="running",this.schedule(),this.emitTick(),this.getSnapshot())}pause(){return this.state!=="running"?this.getSnapshot():(this.elapsedBeforeStart=this.getElapsedMs(),this.startedAt=null,this.state="paused",this.clearInterval(),this.emitTick(),this.getSnapshot())}resume(){return this.state!=="paused"?this.getSnapshot():(this.startedAt=performance.now(),this.state="running",this.schedule(),this.emitTick(),this.getSnapshot())}reset({emit:t=!0}={}){return this.clearInterval(),this.elapsedBeforeStart=0,this.startedAt=null,this.state="idle",t&&this.emitTick(),this.getSnapshot()}setDurationMs(t){return this.durationMs=R(t),this.getSnapshot()}isRunning(){return this.state==="running"}getElapsedMs(){const t=this.state==="running"&&this.startedAt!==null?performance.now()-this.startedAt:0,e=this.elapsedBeforeStart+t;return this.durationMs===null?Math.max(0,e):Math.min(Math.max(0,e),this.durationMs)}getSnapshot(){const t=this.getElapsedMs(),e=this.durationMs===null?null:Math.max(0,this.durationMs-t);return{durationMs:this.durationMs,elapsedMs:t,remainingMs:e,progress:this.durationMs===null?0:t/this.durationMs,state:this.state}}schedule(){this.clearInterval(),this.intervalId=window.setInterval(()=>this.tick(),this.tickMs)}tick(){if(this.durationMs!==null&&this.getElapsedMs()>=this.durationMs){this.elapsedBeforeStart=this.durationMs,this.startedAt=null,this.state="complete",this.clearInterval();const t=this.getSnapshot();this.onTick(t),this.onComplete(t);return}this.emitTick()}emitTick(){this.onTick(this.getSnapshot())}clearInterval(){this.intervalId!==null&&(window.clearInterval(this.intervalId),this.intervalId=null)}}function R(s){if(s==null)return null;const t=Number(s);return Number.isFinite(t)&&t>0?t:null}const c={totalQuestions:80,intervalMs:45e3,durationMs:80*45e3};function w({elapsedMs:s,lastIncrementAtMs:t,currentCount:e,intervalMs:n,totalQuestions:i}){const a=Number.isFinite(t)?t:0,o=Math.max(0,Math.floor((s-a)/n));return o<=0?{count:e,lastIncrementAtMs:a}:{count:Math.min(i,e+o),lastIncrementAtMs:a+o*n}}const ft=["manual","automatic"];function vt(s){return s==="automatic"?"automatic":"manual"}function m(s={}){return{rounds:p(s.rounds,20,1,300),intervalSeconds:p(s.intervalSeconds,60,5,3600)}}function x(s){return D(m(s).intervalSeconds)}function V(s){const t=m(s);return t.rounds*x(t)}function Mt({config:s,elapsedMs:t}){const e=m(s),n=x(e),i=V(e),a=u(Math.floor(t/n),0,e.rounds),o=t>=i,r=o?e.rounds:a+1,d=t%n,h=o?0:d===0?n:n-d;return{...e,intervalMs:n,durationMs:i,completedRounds:a,currentRound:r,countdownMs:h,remainingRounds:Math.max(0,e.rounds-a),progress:Math.min(t/i,1),isComplete:o}}function g(s={}){return{totalQuestions:p(s.totalQuestions,80,1,500),durationMinutes:p(s.durationMinutes,60,1,600)}}function E(s){return et(g(s).durationMinutes)}function _(s){const t=g(s);return E(t)/t.totalQuestions}function bt({config:s,elapsedMs:t,completedEvents:e}){const n=g(s),i=E(n),a=_(n),o=u(e,0,n.totalQuestions),r=u(Math.floor(t/a),0,n.totalQuestions),d=t>=i||o>=n.totalQuestions,h=o>=n.totalQuestions?n.totalQuestions:o+1,v=r>=n.totalQuestions?n.totalQuestions:r+1,W=Math.max(0,n.totalQuestions-o),G=Math.max(0,i-t),T=o>0?t/o:null,L=T===null?null:T*n.totalQuestions,J=L===null?null:Date.now()+Math.max(0,L-t),X=o*a-t;return{...n,durationMs:i,intervalMs:a,actualCompleted:o,expectedCompleted:r,currentQuestion:h,expectedQuestion:v,difference:o-r,remainingQuestions:W,remainingMs:G,estimatedFinishTimestamp:J,timeBankMs:X,actualProgress:o/n.totalQuestions,scheduleProgress:Math.min(t/i,1),isComplete:d}}function f(s={}){return{intervalSeconds:p(s.intervalSeconds,60,5,3600),targetCycles:p(s.targetCycles,10,0,500)}}function A(s){return D(f(s).intervalSeconds)}function j(s){const t=f(s);return t.targetCycles===0?null:t.targetCycles*A(t)}function St({config:s,elapsedMs:t}){const e=f(s),n=A(e),i=j(e),a=Math.floor(t/n),o=i!==null&&t>=i,r=t%n,d=o?0:r===0?n:n-r,h=e.targetCycles>0?Math.min(e.targetCycles,a+1):a+1;return{...e,intervalMs:n,durationMs:i,completedCycles:e.targetCycles>0?Math.min(a,e.targetCycles):a,currentCycle:h,countdownMs:d,remainingCycles:e.targetCycles>0?Math.max(0,e.targetCycles-a):null,progress:i===null?0:Math.min(t/i,1),isComplete:o}}function yt({elapsedMs:s,completedEvents:t}){return{elapsedMs:s,completedEvents:t,isComplete:!1}}const $=[{id:"exam",short:"EX",labelKey:"exam",hintKey:"examHint"},{id:"emom",short:"EM",labelKey:"emom",hintKey:"emomHint"},{id:"intervals",short:"IN",labelKey:"intervals",hintKey:"intervalsHint"},{id:"stopwatch",short:"SW",labelKey:"stopwatch",hintKey:"stopwatchHint"}],O=[{id:"pspo-1",label:"modo PSPO 1"},{id:"pspo-1-edit",label:"edit PSPO 1"}],k={en:{appSubtitle:"Offline pace tracker",settings:"Settings",close:"Close",home:"Home",manual:"Manual",automatic:"Automatic",counterMode:"Counter mode",exam:"Exam",emom:"EMOM",intervals:"Interval",stopwatch:"Stopwatch",examHint:"Questions and duration",emomHint:"Rounds on a fixed clock",intervalsHint:"Repeating timer",stopwatchHint:"Simple elapsed time",configuration:"Configuration",totalQuestions:"Total questions",durationMinutes:"Duration minutes",rounds:"Rounds",intervalSeconds:"Interval seconds",targetCycles:"Target cycles",start:"Start",pause:"Pause",resume:"Resume",reset:"Reset",startAgain:"Start again",timerControls:"Timer controls",eventCounter:"Event counter",progress:"Progress",elapsed:"Elapsed",remaining:"Remaining",currentQuestion:"Current question",expectedQuestion:"Expected question",difference:"Difference",remainingQuestions:"Remaining questions",estimatedFinish:"Estimated finish",timeBank:"Time bank",currentRound:"Current round",countdown:"Countdown",remainingRounds:"Remaining rounds",currentCycle:"Current cycle",completedCycles:"Completed cycles",remainingCycles:"Remaining cycles",events:"Events",profiles:"Profiles",chooseProfile:"Choose profile",profileName:"Profile name",saveProfile:"Save profile",theme:"Theme",system:"System",light:"Light",dark:"Dark",sound:"Sound",volume:"Volume",beepFrequency:"Beep frequency",vibration:"Vibration",flash:"Flash screen",keepAwake:"Keep screen awake",keyboardShortcuts:"Keyboard shortcuts",language:"Language",unlimited:"Unlimited",noConfig:"No configuration"},es:{appSubtitle:"Ritmo offline",settings:"Ajustes",close:"Cerrar",home:"Inicio",manual:"Manual",automatic:"Automático",counterMode:"Modo de contador",exam:"Examen",emom:"EMOM",intervals:"Intervalo",stopwatch:"Cronómetro",examHint:"Preguntas y duración",emomHint:"Rondas con reloj fijo",intervalsHint:"Temporizador repetido",stopwatchHint:"Tiempo transcurrido",configuration:"Configuración",totalQuestions:"Preguntas totales",durationMinutes:"Minutos",rounds:"Rondas",intervalSeconds:"Segundos por intervalo",targetCycles:"Ciclos objetivo",start:"Iniciar",pause:"Pausar",resume:"Reanudar",reset:"Reiniciar",startAgain:"Iniciar otra vez",timerControls:"Controles del temporizador",eventCounter:"Contador de eventos",progress:"Progreso",elapsed:"Transcurrido",remaining:"Restante",currentQuestion:"Pregunta actual",expectedQuestion:"Pregunta esperada",difference:"Diferencia",remainingQuestions:"Preguntas restantes",estimatedFinish:"Fin estimado",timeBank:"Banco de tiempo",currentRound:"Ronda actual",countdown:"Cuenta atrás",remainingRounds:"Rondas restantes",currentCycle:"Ciclo actual",completedCycles:"Ciclos completados",remainingCycles:"Ciclos restantes",events:"Eventos",profiles:"Perfiles",chooseProfile:"Elegir perfil",profileName:"Nombre del perfil",saveProfile:"Guardar perfil",theme:"Tema",system:"Sistema",light:"Claro",dark:"Oscuro",sound:"Sonido",volume:"Volumen",beepFrequency:"Frecuencia",vibration:"Vibración",flash:"Flash de pantalla",keepAwake:"Mantener pantalla activa",keyboardShortcuts:"Atajos de teclado",language:"Idioma",unlimited:"Ilimitado",noConfig:"Sin configuración"}};function Ct(s){return new wt(s)}class wt{constructor(t){this.root=t;const e=ht(),n=window.location.pathname,i=this.getModeFromPath(n),a=n!=="/home"&&n!=="/",o=this.isKnownMode(i)?i:a&&this.isKnownMode(e.lastMode)?e.lastMode:null;this.state={...e,activeMode:o,lastMode:o,elapsedMs:0,count:0,pspoAutoIncrements:0,pspoLastIncrementAtMs:0,timerState:"idle",settingsOpen:!1,draftProfileName:"",selectedProfileId:e.selectedProfileId??""},this.wakeLock=null,this.timer=new gt({tickMs:100,onTick:r=>this.handleTick(r),onComplete:()=>this.handleComplete()}),this.intervalEngine=new dt({onInterval:()=>this.handleInterval()})}init(){if(this.root.addEventListener("click",t=>this.handleClick(t)),this.root.addEventListener("pointerdown",t=>this.handlePointerDown(t)),this.root.addEventListener("change",t=>this.handleChange(t)),this.root.addEventListener("input",t=>this.handleInput(t)),document.addEventListener("keydown",t=>this.handleKeydown(t)),window.addEventListener("hashchange",()=>this.handleLocationChange()),window.addEventListener("popstate",()=>this.handleLocationChange()),document.addEventListener("visibilitychange",()=>{!document.hidden&&this.timer.isRunning()&&this.syncWakeLock()}),this.applyTheme(),this.configureEngines(),this.isPspoMode(this.state.activeMode)){this.syncUrl({replace:!0}),this.startPspoSession();return}this.syncUrl({replace:!0}),this.render()}t(t){const e=this.state.settings.language in k?this.state.settings.language:"en";return k[e][t]??k.en[t]??t}render(){if(this.root){if(this.isPspoMode(this.state.activeMode)){this.root.innerHTML=this.renderPspoScreen();return}this.root.innerHTML=`
      <div class="app-shell">
        ${this.renderHeader()}
        ${this.state.settingsOpen?this.renderSettings():""}
        <main class="main-area">
          ${this.state.activeMode?this.renderMode():this.renderHome()}
        </main>
      </div>
    `}}renderHeader(){const t=this.getActiveMode(),e=t?this.t(t.labelKey):this.t("appSubtitle");return`
      <header class="topbar">
        <button class="brand" type="button" data-action="go-home" aria-label="PaceKeeper ${this.t("home")}">
          <img src="${Y}" alt="" width="40" height="40" />
          <span>
            <strong>PaceKeeper</strong>
            <small>${e}</small>
          </span>
        </button>
        <button class="settings-button" type="button" data-action="toggle-settings">
          ${this.state.settingsOpen?this.t("close"):this.t("settings")}
        </button>
      </header>
    `}renderHome(){return`
      <section class="home-screen" aria-label="PaceKeeper modes">
        <div class="pspo-launch-grid" aria-label="PSPO 1">
          ${O.map(t=>`
              <button class="pspo-launch-card" type="button" data-mode="${t.id}">
                <strong>${t.label}</strong>
              </button>
            `).join("")}
        </div>
        <div class="mode-grid">
          ${$.map(t=>`
              <button class="mode-card" type="button" data-mode="${t.id}">
                <span class="mode-badge">${t.short}</span>
                <strong>${this.t(t.labelKey)}</strong>
                <small>${this.t(t.hintKey)}</small>
              </button>
            `).join("")}
        </div>
      </section>
    `}renderPspoScreen(){const t=this.state.activeMode==="pspo-1-edit";return`
      <main
        class="pspo-screen ${t?"is-editable":""}"
        ${t?'role="button" tabindex="0"':""}
        aria-label="${t?"edit PSPO 1":"modo PSPO 1"}"
      >
        <output class="pspo-timer" aria-label="Temporizador">${l(this.state.elapsedMs)}</output>
        <output class="pspo-count" aria-label="Pregunta">${this.getPspoCount()}</output>
      </main>
    `}renderMode(){const t=this.getActiveMode(),e=this.getMetrics();return`
      <section class="workspace" aria-label="${this.t(t.labelKey)}">
        <div class="mode-title">
          <button class="text-button" type="button" data-action="go-home">${this.t("home")}</button>
          <div>
            <h1>${this.t(t.labelKey)}</h1>
            <p>${this.t(t.hintKey)}</p>
          </div>
        </div>
        ${this.renderConfig()}
        ${this.renderProfiles()}
        ${this.renderCounterModeSelector()}
        <div class="run-layout">
          <section class="timer-panel" aria-live="polite">
            ${this.renderTimerHero(e)}
            ${tt({state:this.state.timerState,t:n=>this.t(n)})}
          </section>
          ${Z({count:this.state.count,canDecrement:this.state.count>0,label:this.t("eventCounter")})}
        </div>
        ${this.renderStatus(e)}
      </section>
    `}renderTimerHero(t){const e=this.state.activeMode;if(e==="stopwatch")return`
        <div class="time-readout">
          <span>${this.t("elapsed")}</span>
          <strong>${N(this.state.elapsedMs)}</strong>
        </div>
      `;const n=t.countdownMs??t.remainingMs??this.timer.getSnapshot().remainingMs??0,i=e==="exam"?t.actualProgress:e==="emom"||e==="intervals"?t.progress:0;return`
      <div class="time-readout">
        <span>${e==="exam"?this.t("remaining"):this.t("countdown")}</span>
        <strong>${l(n)}</strong>
      </div>
      ${at({value:i,label:this.t("progress"),detail:`${this.t("elapsed")}: ${l(this.state.elapsedMs)}`})}
    `}renderConfig(){const t=this.state.activeMode,e=this.getConfig();return t==="exam"?`
        <section class="config-panel" aria-label="${this.t("configuration")}">
          ${this.renderNumberField("totalQuestions",this.t("totalQuestions"),e.totalQuestions,1,500)}
          ${this.renderNumberField("durationMinutes",this.t("durationMinutes"),e.durationMinutes,1,600)}
        </section>
      `:t==="emom"?`
        <section class="config-panel" aria-label="${this.t("configuration")}">
          ${this.renderNumberField("rounds",this.t("rounds"),e.rounds,1,300)}
          ${this.renderNumberField("intervalSeconds",this.t("intervalSeconds"),e.intervalSeconds,5,3600)}
        </section>
      `:t==="intervals"?`
        <section class="config-panel" aria-label="${this.t("configuration")}">
          ${this.renderNumberField("intervalSeconds",this.t("intervalSeconds"),e.intervalSeconds,5,3600)}
          ${this.renderNumberField("targetCycles",this.t("targetCycles"),e.targetCycles,0,500)}
        </section>
      `:`
      <section class="config-panel compact" aria-label="${this.t("configuration")}">
        <span class="quiet-label">${this.t("noConfig")}</span>
      </section>
    `}renderNumberField(t,e,n,i,a){return`
      <label class="field">
        <span>${e}</span>
        <input type="number" inputmode="numeric" data-config="${t}" min="${i}" max="${a}" value="${n}" />
      </label>
    `}renderProfiles(){return`
      <section class="profile-panel" aria-label="${this.t("profiles")}">
        <label class="field">
          <span>${this.t("profiles")}</span>
          <select data-profile-select value="${P(this.state.selectedProfileId)}">
            <option value="">${this.t("chooseProfile")}</option>
            ${this.state.profiles.map(t=>`
                  <option value="${t.id}" ${t.id===this.state.selectedProfileId?"selected":""}>
                    ${P(t.name)}
                  </option>
                `).join("")}
          </select>
        </label>
        <label class="field grow">
          <span>${this.t("profileName")}</span>
          <input type="text" data-profile-name value="${P(this.state.draftProfileName)}" maxlength="40" />
        </label>
        <button class="save-profile" type="button" data-action="save-profile">${this.t("saveProfile")}</button>
      </section>
    `}renderCounterModeSelector(){return`
      <label class="field">
        <span>${this.t("counterMode")}</span>
        <select data-counter-mode>
          ${ft.map(t=>`
            <option value="${t}" ${this.state.settings.counterMode===t?"selected":""}>${this.t(t)}</option>
          `).join("")}
        </select>
      </label>
    `}renderStatus(t){return this.state.activeMode==="exam"?M([{label:this.t("currentQuestion"),value:`${t.currentQuestion}/${t.totalQuestions}`},{label:this.t("expectedQuestion"),value:`${t.expectedQuestion}/${t.totalQuestions}`},{label:this.t("difference"),value:nt(t.difference),tone:t.difference>0?"ahead":t.difference<0?"behind":"neutral"},{label:this.t("elapsed"),value:l(this.state.elapsedMs)},{label:this.t("remaining"),value:l(t.remainingMs)},{label:this.t("remainingQuestions"),value:t.remainingQuestions},{label:this.t("estimatedFinish"),value:it(t.estimatedFinishTimestamp)},{label:this.t("timeBank"),value:st(t.timeBankMs),tone:t.timeBankMs>0?"ahead":t.timeBankMs<0?"behind":"neutral"}]):this.state.activeMode==="emom"?M([{label:this.t("currentRound"),value:`${t.currentRound}/${t.rounds}`},{label:this.t("countdown"),value:l(t.countdownMs)},{label:this.t("remainingRounds"),value:t.remainingRounds},{label:this.t("elapsed"),value:l(this.state.elapsedMs)},{label:this.t("remaining"),value:l(Math.max(0,t.durationMs-this.state.elapsedMs))}]):this.state.activeMode==="intervals"?M([{label:this.t("currentCycle"),value:t.targetCycles>0?`${t.currentCycle}/${t.targetCycles}`:String(t.currentCycle)},{label:this.t("countdown"),value:l(t.countdownMs)},{label:this.t("completedCycles"),value:t.completedCycles},{label:this.t("remainingCycles"),value:t.remainingCycles??this.t("unlimited")},{label:this.t("elapsed"),value:l(this.state.elapsedMs)}]):M([{label:this.t("elapsed"),value:N(this.state.elapsedMs)},{label:this.t("events"),value:this.state.count}])}renderSettings(){const t=this.state.settings;return`
      <aside class="settings-panel" aria-label="${this.t("settings")}">
        <label class="setting-control">
          <span>${this.t("theme")}</span>
          <select data-setting="theme">
            <option value="system" ${t.theme==="system"?"selected":""}>${this.t("system")}</option>
            <option value="light" ${t.theme==="light"?"selected":""}>${this.t("light")}</option>
            <option value="dark" ${t.theme==="dark"?"selected":""}>${this.t("dark")}</option>
          </select>
        </label>
        ${this.renderCheckboxSetting("sound",this.t("sound"),t.sound)}
        <label class="setting-control">
          <span>${this.t("volume")}</span>
          <input type="range" min="0" max="1" step="0.05" data-setting="volume" value="${t.volume}" />
          <output>${S(t.volume)}</output>
        </label>
        <label class="setting-control">
          <span>${this.t("beepFrequency")}</span>
          <input type="range" min="220" max="1760" step="20" data-setting="beepFrequency" value="${t.beepFrequency}" />
          <output>${t.beepFrequency} Hz</output>
        </label>
        ${this.renderCheckboxSetting("vibration",this.t("vibration"),t.vibration)}
        ${this.renderCheckboxSetting("flash",this.t("flash"),t.flash)}
        ${this.renderCheckboxSetting("keepAwake",this.t("keepAwake"),t.keepAwake)}
        ${this.renderCheckboxSetting("keyboardShortcuts",this.t("keyboardShortcuts"),t.keyboardShortcuts)}
        <label class="setting-control">
          <span>${this.t("language")}</span>
          <select data-setting="language">
            <option value="es" ${t.language==="es"?"selected":""}>Español</option>
            <option value="en" ${t.language==="en"?"selected":""}>English</option>
          </select>
        </label>
      </aside>
    `}renderCheckboxSetting(t,e,n){return`
      <label class="setting-control inline">
        <span>${e}</span>
        <input type="checkbox" data-setting="${t}" ${n?"checked":""} />
      </label>
    `}handlePointerDown(t){if(t.pointerType!=="touch"&&t.pointerType!=="pen")return;if(this.state.activeMode==="pspo-1-edit"&&t.target.closest(".pspo-screen")){this.incrementPspoEditCount();return}t.target.closest("[data-action]")&&this.handleClick(t)}handleClick(t){if(this.state.activeMode==="pspo-1-edit"&&t.target.closest(".pspo-screen")){this.incrementPspoEditCount();return}const e=t.target.closest("[data-mode]");if(e){this.selectMode(e.dataset.mode);return}const n=t.target.closest("[data-action]");if(!n)return;const i=n.dataset.action;i==="go-home"&&this.goHome(),i==="toggle-settings"&&(this.state.settingsOpen=!this.state.settingsOpen,this.render()),i==="start"&&this.startSession(),i==="pause"&&this.pauseSession(),i==="resume"&&this.resumeSession(),i==="reset"&&this.resetSession(),i==="increment"&&this.changeCount(1),i==="decrement"&&this.changeCount(-1),i==="save-profile"&&this.saveProfile()}handleChange(t){const e=t.target;if(e.matches("[data-config]")){this.updateConfig(e.dataset.config,e.value);return}if(e.matches("[data-profile-select]")){e.value?this.loadProfile(e.value):(this.state.selectedProfileId="",this.saveState(),this.render());return}if(e.matches("[data-counter-mode]")){this.updateSetting("counterMode",vt(e.value));return}e.matches("[data-setting]")&&this.updateSetting(e.dataset.setting,this.getInputValue(e))}handleInput(t){var n;const e=t.target;if(e.matches("[data-profile-name]")){this.state.draftProfileName=e.value;return}if(e.matches('[data-setting="volume"], [data-setting="beepFrequency"]')){const i=this.getInputValue(e);this.state.settings[e.dataset.setting]=i,this.saveState();const a=(n=e.closest(".setting-control"))==null?void 0:n.querySelector("output");a&&(a.textContent=e.dataset.setting==="volume"?S(i):`${i} Hz`)}}handleKeydown(t){if(this.state.activeMode==="pspo-1-edit"){(t.code==="Space"||t.code==="Enter")&&(t.preventDefault(),this.incrementPspoEditCount());return}this.isPspoMode(this.state.activeMode)||!this.state.activeMode||!this.state.settings.keyboardShortcuts||["INPUT","SELECT","TEXTAREA","BUTTON"].includes(t.target.tagName)||(t.code==="Space"&&(t.preventDefault(),this.handleCounterInput((this.state.settings.counterMode==="automatic",1))),t.code==="Backspace"&&(t.preventDefault(),this.handleCounterInput(-1)))}handleTick(t){if(this.state.elapsedMs=t.elapsedMs,this.state.timerState=t.state,this.isPspoMode(this.state.activeMode)){this.updatePspoCount(t.elapsedMs),this.render();return}this.state.activeMode!=="stopwatch"&&this.intervalEngine.update(t.elapsedMs),this.render()}handleComplete(){this.syncWakeLock()}handleInterval(){const t=this.state.settings;lt({enabled:t.sound,frequency:t.beepFrequency,volume:t.volume}),ct(t.vibration),ut(t.flash)}handleCounterInput(t){if(this.state.settings.counterMode==="automatic"){const e=this.state.count+t,n=this.getCounterLimit();this.state.count=u(e,0,n),this.render();return}this.changeCount(t)}selectMode(t){if(this.isKnownMode(t)){if(this.state.activeMode=t,this.state.lastMode=t,this.state.selectedProfileId="",this.resetSession({render:!1}),this.configureEngines(),this.saveState(),this.syncUrl(),this.isPspoMode(t)){this.startPspoSession();return}this.render()}}goHome(){this.state.activeMode=null,this.state.lastMode=null,this.state.selectedProfileId="",this.resetSession({render:!1}),this.saveState(),this.syncUrl(),this.render()}async startSession(){await rt(),this.state.count=0,this.configureEngines(),this.intervalEngine.reset(0),this.timer.start(),this.syncWakeLock(),this.render()}pauseSession(){this.timer.pause(),this.syncWakeLock(),this.render()}resumeSession(){this.timer.resume(),this.syncWakeLock(),this.render()}resetSession({render:t=!0}={}){this.state.elapsedMs=0,this.state.count=0,this.state.pspoAutoIncrements=0,this.state.timerState="idle",this.timer.reset({emit:!1}),this.intervalEngine.reset(0),this.syncWakeLock(),t&&this.render()}changeCount(t){const e=this.getCounterLimit(),n=this.state.count+t;this.state.count=u(n,0,e),this.render()}startPspoSession(){this.state.elapsedMs=0,this.state.count=1,this.state.pspoAutoIncrements=0,this.state.pspoLastIncrementAtMs=0,this.state.timerState="idle",this.timer.reset({emit:!1}),this.configureEngines(),this.timer.start(),this.syncWakeLock()}updatePspoCount(t){if(this.state.activeMode==="pspo-1"){const n=w({elapsedMs:t,lastIncrementAtMs:this.state.pspoLastIncrementAtMs,currentCount:this.state.count,intervalMs:c.intervalMs,totalQuestions:c.totalQuestions});this.state.count=n.count,this.state.pspoLastIncrementAtMs=n.lastIncrementAtMs,this.state.pspoAutoIncrements=n.count-1;return}const e=w({elapsedMs:t,lastIncrementAtMs:this.state.pspoLastIncrementAtMs,currentCount:this.state.count,intervalMs:c.intervalMs,totalQuestions:c.totalQuestions});e.count>this.state.count&&(this.state.count=e.count,this.state.pspoLastIncrementAtMs=e.lastIncrementAtMs,this.state.pspoAutoIncrements=e.count-1)}incrementPspoEditCount(){if(this.state.timerState==="complete")return;const t=w({elapsedMs:this.state.elapsedMs,lastIncrementAtMs:this.state.pspoLastIncrementAtMs,currentCount:this.state.count,intervalMs:c.intervalMs,totalQuestions:c.totalQuestions});this.state.count=Math.min(c.totalQuestions,t.count+1),this.state.pspoLastIncrementAtMs=this.state.elapsedMs,this.state.pspoAutoIncrements=this.state.count-1,this.render()}updateConfig(t,e){const n=this.state.activeMode,i={...this.state.configs[n],[t]:e};n==="exam"&&(this.state.configs.exam=g(i)),n==="emom"&&(this.state.configs.emom=m(i)),n==="intervals"&&(this.state.configs.intervals=f(i)),this.resetSession({render:!1}),this.configureEngines(),this.saveState(),this.render()}updateSetting(t,e){this.state.settings[t]=e,this.applyTheme(),this.syncWakeLock(),this.saveState(),this.render()}loadProfile(t){const e=this.state.profiles.find(n=>n.id===t);e&&(this.state.activeMode=e.mode,this.state.lastMode=e.mode,this.state.selectedProfileId=e.id,this.state.configs[e.mode]=this.normalizeConfig(e.mode,e.config),this.resetSession({render:!1}),this.configureEngines(),this.saveState(),this.syncUrl(),this.render())}saveProfile(){const t=this.state.draftProfileName.trim();!t||!this.state.activeMode||(this.state.profiles=[...this.state.profiles,{id:$t(t),name:t,mode:this.state.activeMode,config:this.getConfig()}],this.state.selectedProfileId=this.state.profiles[this.state.profiles.length-1].id,this.state.draftProfileName="",this.saveState(),this.render())}configureEngines(){this.timer.setDurationMs(this.getModeDurationMs()),this.intervalEngine.setIntervalMs(this.getModeIntervalMs()),this.intervalEngine.reset(this.state.elapsedMs)}getActiveMode(){return $.find(t=>t.id===this.state.activeMode)}getRouteForMode(t){return t?t==="pspo-1"?"#/timePSPO":t==="pspo-1-edit"?"#/editPSPO":`#/${t}`:"#/home"}getModeFromPath(t=window.location.pathname,e=window.location.hash){const i=(e?e.slice(1):t).split("?")[0].split("#")[0].replace(/^\/+|\/+$/g,"").toLowerCase();return!i||i==="home"?null:i==="timepspo"?"pspo-1":i==="editpspo"?"pspo-1-edit":this.isKnownMode(i)?i:null}syncUrl({replace:t=!1}={}){const e=this.getRouteForMode(this.state.activeMode);if((window.location.hash||"#/home")!==e){if(t){window.location.replace(e);return}window.location.hash=e.slice(1)}}handleLocationChange(){const t=this.getModeFromPath(window.location.pathname,window.location.hash);if(t===this.state.activeMode){this.render();return}if(this.state.activeMode=t,this.state.lastMode=t,this.resetSession({render:!1}),this.configureEngines(),this.saveState(),this.isPspoMode(this.state.activeMode)){this.startPspoSession();return}this.render()}isKnownMode(t){return $.some(e=>e.id===t)||this.isPspoMode(t)}isPspoMode(t){return O.some(e=>e.id===t)}getPspoCount(){return u(this.state.count||1,1,c.totalQuestions)}getConfig(){return this.normalizeConfig(this.state.activeMode,this.state.configs[this.state.activeMode]??{})}normalizeConfig(t,e){return t==="exam"?g(e):t==="emom"?m(e):t==="intervals"?f(e):{}}getModeDurationMs(){const t=this.getConfig();return this.state.activeMode==="exam"?E(t):this.state.activeMode==="emom"?V(t):this.state.activeMode==="intervals"?j(t):this.isPspoMode(this.state.activeMode)?c.durationMs:null}getModeIntervalMs(){const t=this.getConfig();return this.state.activeMode==="exam"?_(t):this.state.activeMode==="emom"?x(t):this.state.activeMode==="intervals"?A(t):null}getMetrics(){const t={config:this.getConfig(),elapsedMs:this.state.elapsedMs,completedEvents:this.state.count};return this.state.activeMode==="exam"?bt(t):this.state.activeMode==="emom"?Mt(t):this.state.activeMode==="intervals"?St(t):yt(t)}getCounterLimit(){const t=this.getConfig();return this.state.activeMode==="exam"?t.totalQuestions:this.state.activeMode==="emom"?t.rounds:this.state.activeMode==="intervals"&&t.targetCycles>0?t.targetCycles:this.isPspoMode(this.state.activeMode)?c.totalQuestions:9999}getInputValue(t){return t.type==="checkbox"?t.checked:t.type==="range"||t.type==="number"?Number(t.value):t.value}applyTheme(){const t=this.state.settings.theme,e=window.matchMedia("(prefers-color-scheme: dark)").matches,n=t==="system"?e?"dark":"light":t;document.documentElement.dataset.theme=n,document.documentElement.lang=this.state.settings.language}async syncWakeLock(){const t=this.state.settings.keepAwake&&this.timer.isRunning();if(!t&&this.wakeLock){await this.wakeLock.release().catch(()=>{}),this.wakeLock=null;return}if(!(!t||this.wakeLock||!("wakeLock"in navigator)))try{this.wakeLock=await navigator.wakeLock.request("screen"),this.wakeLock.addEventListener("release",()=>{this.wakeLock=null})}catch{this.wakeLock=null}}saveState(){pt({settings:this.state.settings,configs:this.state.configs,profiles:this.state.profiles,lastMode:this.state.lastMode,selectedProfileId:this.state.selectedProfileId})}}function $t(s){const t="crypto"in window&&"randomUUID"in window.crypto?window.crypto.randomUUID().slice(0,8):String(Date.now()).slice(-8);return`${s.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${t}`}function P(s){return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const kt=document.querySelector("#app"),Pt=Ct(kt);Pt.init();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./service-worker.js").catch(()=>{})});
