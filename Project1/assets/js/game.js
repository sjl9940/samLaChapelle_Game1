(() => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const CELL = 40, COLS = 92, ROWS = 22;
  const levels = [
    { name: 'Survival', borough: 'Brooklyn', mood: 'Warm neighborhood rush', desc: 'Brooklyn opens with fewer scammers; read the situation and manage space.', seconds: 120, money: 40, scammers: 12, walkers: 16, speed: 190, detection: 320, maxPursuers: 2, wrongCost: 3, payCost: 4, carCost: 4, forcePayChance: .22, musicStep: 178, musicMood: 'warm' },
    { name: 'Management', borough: 'Manhattan', mood: 'Bright, compressed rush', desc: 'Manhattan crowds the avenue; a correct read gives you two seconds to move before pursuit resumes.', seconds: 90, money: 24, scammers: 18, walkers: 24, speed: 210, detection: 520, maxPursuers: 3, wrongCost: 5, payCost: 7, carCost: 5, forcePayChance: .55, musicStep: 136, musicMood: 'rush' },
    { name: 'Nightmare', borough: 'Queens', mood: 'Restless night pressure', desc: 'Queens packs the street with people. Scammers spot you across the screen; a correct read buys two seconds before anyone can approach again.', seconds: 60, money: 20, scammers: 32, walkers: 34, speed: 212, detection: Infinity, maxPursuers: 5, wrongCost: 7, payCost: 9, carCost: 7, forcePayChance: .82, musicStep: 108, musicMood: 'stress' }
  ];
  const styles = [
    { id: 'polite', label: 'Polite', line: '“I’m sorry, I can’t.”' },
    { id: 'firm', label: 'Firm', line: '“No. I’m moving on.”' }
  ];
  const responseOutcomes=[{id:'polite',weight:34},{id:'firm',weight:31},{id:'ignore',weight:35}];
  const scammerLines = [
    { style:'polite', text:'“Hey, sorry to stop you. I’m short for the train—anything helps.”', clue:'They apologized, keep a little distance, and ask without blocking you.' },
    { style:'polite', text:'“Excuse me, when you have a second—could you help me get home?”', clue:'They wait for your attention and leave your path open.' },
    { style:'polite', text:'“No pressure. I lost my wallet and just need a MetroCard swipe.”', clue:'Their voice stays low and they do not move closer.' },
    { style:'polite', text:'“I know everyone asks. If you can spare a little, thank you.”', clue:'They acknowledge your choice and give you room.' },
    { style:'polite', text:'“Could you help me with a dollar? It’s okay if not.”', clue:'The request is tentative, and they do not follow your step.' },
    { style:'polite', text:'“Sorry, I’m trying to reach the shelter before it closes.”', clue:'They ask once, softly, without stepping into your lane.' },
    { style:'polite', text:'“Would you mind helping me make a phone call?”', clue:'They ask a question and wait instead of crowding you.' },
    { style:'polite', text:'“I hate asking, but I need a little for food.”', clue:'They look down and keep their hands close to themselves.' },
    { style:'polite', text:'“If you have change, I’d be grateful. Have a good day either way.”', clue:'They offer you an easy way to decline.' },
    { style:'polite', text:'“Could you spare a few coins? I’m not going to hold you up.”', clue:'They stay beside the sidewalk edge and leave the route clear.' },
    { style:'polite', text:'“Hey, sorry—do you know where the closest station is?”', clue:'They start with a normal question and give you space to answer.' },
    { style:'polite', text:'“I’m embarrassed to ask. Anything for a bus fare?”', clue:'Their voice is hesitant; they do not repeat the ask over you.' },
    { style:'polite', text:'“Sorry to interrupt. Could you spare a little? It’s completely up to you.”', clue:'They ask once and make your choice clear; a brief polite refusal is enough.' },
    { style:'polite', text:'“I’m trying to get something to eat. If you can’t help, I understand.”', clue:'They accept a no without pressure; a courteous boundary fits.' },
    { style:'polite', text:'“Would you be able to help with a MetroCard? No worries if not.”', clue:'They leave you room to decline; a calm, polite answer suits the tone.' },
    { style:'polite', text:'“I know you’re on your way. Could I ask for a little help?”', clue:'They acknowledge your time and wait; answer briefly and politely.' },
    { style:'polite', text:'“Anything you can spare would help, but please don’t feel pressured.”', clue:'They explicitly remove pressure; a polite response matches their approach.' },
    { style:'polite', text:'“Excuse me, could you help me with a small fare? Thank you either way.”', clue:'They show appreciation and keep their distance; respond courteously.' },
    { style:'polite', text:'“Sorry, I need a little for the bus. Only if you’re comfortable.”', clue:'They leave the choice with you and do not press; a gentle refusal fits.' },
    { style:'polite', text:'“Could you help me out today? I understand if it’s not possible.”', clue:'They accept your limits and leave space; a brief polite answer is enough.' },
    { style:'firm', text:'“You! Don’t walk past me. I need an answer.”', clue:'They raise their voice, step into your path, and demand an answer.' },
    { style:'firm', text:'“Come on, you can afford it. Open your wallet.”', clue:'They assume what you have and move closer when you hesitate.' },
    { style:'firm', text:'“I asked you a question. Don’t ignore me.”', clue:'They repeat themselves louder and angle across your route.' },
    { style:'firm', text:'“That’s all? You can do better than that.”', clue:'They reject a small offer and pressure you for more.' },
    { style:'firm', text:'“Stop right there. You owe me a minute.”', clue:'They plant themselves in front of you and claim your time.' },
    { style:'firm', text:'“You heard me. Give me something, now.”', clue:'Their demand is sharp, close, and not phrased as a request.' },
    { style:'firm', text:'“Don’t turn away while I’m talking to you.”', clue:'They follow your movement and try to control where you look.' },
    { style:'firm', text:'“I know you have cash. Let me see what you’ve got.”', clue:'They make a claim about your money and lean into your space.' },
    { style:'firm', text:'“You’re really going to leave me with nothing?”', clue:'They use guilt and keep pressing after you pause.' },
    { style:'firm', text:'“Wait. I’m not finished with you.”', clue:'They step across the route instead of letting you pass.' },
    { style:'firm', text:'“A few dollars. Don’t make this difficult.”', clue:'Their tone turns into a warning and they close the distance.' },
    { style:'firm', text:'“Hey, I’m talking to you. Pay attention.”', clue:'They call louder, point toward you, and keep advancing.' },
    { style:'ignore', text:'“I could use a dollar, but if you’re late, keep going. No need to stop.”', clue:'They explicitly tell you to keep moving; walking away is enough.' },
    { style:'ignore', text:'“Could you help with a MetroCard? If not, no worries—take care.”', clue:'They release you right in the sentence; you do not need to answer.' },
    { style:'ignore', text:'“I have a quick fundraiser pitch, only if you have time. Otherwise, keep moving.”', clue:'They say you can continue without responding; walking away fits.' },
    { style:'ignore', text:'“Do you have spare change? If you’re busy, you’re all set to go.”', clue:'They give you permission to leave without a reply.' },
    { style:'ignore', text:'“Could you spare a few dollars? It’s okay, I won’t hold you up.”', clue:'They promise not to hold you; simply walking on follows that cue.' },
    { style:'ignore', text:'“I’m short for the train. If you can’t stop, that’s alright.”', clue:'They accept that you may be moving; walking away is the clear option.' },
    { style:'ignore', text:'“Can I ask you something? Actually, if you’re rushing, go ahead.”', clue:'They withdraw the request when you seem busy; keep walking.' },
    { style:'ignore', text:'“Anything helps, but I understand if you need to get somewhere.”', clue:'They acknowledge your need to go and leave your path open.' },
    { style:'ignore', text:'“I’m collecting for a neighborhood drive. No time? No problem.”', clue:'They make stopping optional and say there is no problem if you pass.' },
    { style:'ignore', text:'“Could you help me out? If not, have a good one—keep going.”', clue:'They end the exchange themselves; a reply is unnecessary.' },
    { style:'ignore', text:'“Sorry to bother you. If you don’t want to stop, just carry on.”', clue:'They directly invite you to continue without engaging.' }
  ];
  const spotCallouts=['“Hey! You—hold on!”','“Don’t walk away! I saw you!”','“Wait up! I’m talking to you!”','“You heard me—stop a second!”','“Come back here, I need an answer!”','“You in the blue coat—wait!”','“I know you saw me. Hold up!”','“Don’t ignore me—come here!”'];
  const boroughPalettes = [
    { sidewalk:'#f0bd8b', road:'#514a52', curb:'#ff854c', shop:['#b83d52','#e17a35','#448477','#a84270'], awning:['#f6c933','#ff735f','#63b884'] },
    { sidewalk:'#b9e7f4', road:'#393d52', curb:'#38b9e8', shop:['#514bb8','#168cb9','#d45091','#386a9d'], awning:['#f7db38','#f45c52','#41d1df'] },
    { sidewalk:'#e4a9d6', road:'#42354f', curb:'#ff548e', shop:['#e0496a','#ee9a2e','#327f78','#7444bd'], awning:['#ffe13d','#e946bc','#43dac0'] }
  ];
  const palettes = [
    { O:'#30253a', H:'#734332', S:'#f6d8c0', E:'#241b2d', C:'#ef553f', B:'#155fa8', P:'#ffd33f', G:'#263c66', W:'#392f38' },
    { O:'#30253a', H:'#241c21', S:'#f2cfb1', E:'#241b2d', C:'#f0bd38', B:'#44a77d', P:'#e95183', G:'#37465e', W:'#392f38' },
    { O:'#30253a', H:'#986344', S:'#ffe1c8', E:'#241b2d', C:'#45d1cf', B:'#8b50c9', P:'#ed7650', G:'#343d78', W:'#392f38' },
    { O:'#30253a', H:'#d1a64f', S:'#eec9ab', E:'#241b2d', C:'#f25b96', B:'#e54d3f', P:'#4dd0bd', G:'#424e80', W:'#392f38' },
    { O:'#30253a', H:'#29252d', S:'#f8dfc5', E:'#241b2d', C:'#70ce59', B:'#ef9d32', P:'#337ca5', G:'#344a68', W:'#392f38' },
    { O:'#30253a', H:'#bb7752', S:'#efc8a9', E:'#241b2d', C:'#7560d7', B:'#e34b72', P:'#f2cf42', G:'#40557a', W:'#392f38' },
    { O:'#30253a', H:'#382c44', S:'#f5d1b6', E:'#241b2d', C:'#38b7a1', B:'#3158ba', P:'#f37e43', G:'#2d3e63', W:'#392f38' },
    { O:'#30253a', H:'#d6b36b', S:'#edd2bd', E:'#241b2d', C:'#ef7a36', B:'#5a4ec9', P:'#e54452', G:'#3e456d', W:'#392f38' }
  ];
  const playerArt = [
    '......HHHH......','.....HHHHHH.....','....HHHHHHHH....','....HSSSSSSH....','....HSESSSEH....','....HSSSSSSH....','.....SSSSSS.....','.....OOOOOO.....','....PBBBBBB.....','....PBBBBBB.....','....PBBBBBB.....','.....BBBBBB.....','.....BBBBBB.....','.....GG..GG.....','.....GG..GG.....','.....GG..GG.....','.....GG..GG.....','.....W...W......','.....W...W......','................'
  ];
  const scammerArt = [
    '......CCCC......','.....CCCCCC.....','....CCCCCCCC....','....CSSSSSSC....','....CSESSSEC....','....CSSSSSSC....','.....SSSSSS.....','.....OOOOOO.....','....PBBBBBBP....','....PBBBBBBP....','....PBBBBBBP....','.....BBBBBB.....','.....BBBBBB.....','.....GG..GG.....','.....GG..GG.....','.....GG..GG.....','.....GG..GG.....','.....W...W......','.....W...W......','................'
  ];
  const scammerArtByLevel=[scammerArt,scammerArt.map((row,i)=>i>=7&&i<=12?row.replace(/B/g,'G').replace(/P/g,'C'):row),scammerArt.map((row,i)=>i<=6?row.replace(/C/g,'B').replace(/S/g,'S'):i>=8&&i<=12?row.replace(/B/g,'C').replace(/P/g,'G'):row)];
  const palettesFor = id => palettes[id % palettes.length];
  const scammerPalettes=palettes.map((palette,i)=>({...palette,S:['#f6d8c0','#f2cfb1','#ffe1c8','#eec9ab'][i%4]}));
  const colorsFor = (art, palette) => ({ ...palette, '.':null });
  const $ = id => document.getElementById(id);
  const rand = n => Math.floor(Math.random() * n);
  function makeQuestion(level){
    const responseIds=responseOutcomes.map(x=>x.id),allChoices=[...responseIds,'pay'];
    if(level===0){const target=weightedStyle(),pool=scammerLines.filter(line=>line.style===target);return {line:pool[rand(pool.length)],target,uncertain:false};}
    if(level===1){const cue=weightedStyle(),pool=scammerLines.filter(line=>line.style===cue),line=pool[rand(pool.length)];if(Math.random()<.2){const alternatives=allChoices.filter(id=>id!==cue);return {line,target:alternatives[rand(alternatives.length)],uncertain:true};}return {line,target:cue,uncertain:false};}
    return {line:scammerLines[rand(scammerLines.length)],target:allChoices[rand(allChoices.length)],uncertain:true};
  }
  function showQuestion(s,prefix=''){
    const q=makeQuestion(levelIndex);s.line=q.line;s.targetStyle=q.target;s.eliminated=new Set();
    $('dialogueLine').textContent=s.line.text;
    $('dialogueClue').textContent=q.uncertain?(levelIndex===2?`${prefix}Queens is unpredictable: the clue may not match the best move. Any of the four choices can be right. ${s.line.clue}`:`${prefix}Mixed signals: in Manhattan, the clue is unreliable sometimes. ${s.line.clue}`):`${prefix}Notice the behavior: ${s.line.clue}`;
  }
  const key = (x,y) => `${x},${y}`;
  const distance = (a,b) => Math.hypot(a.x-b.x,a.y-b.y);
  let levelIndex=0, world, player, money=0, secondsLeft=0, encounter=null, finished=false, exitBonus=0, wrongFlashTimer=0, lastSwarmAlert=-Infinity, scammerGraceUntil=0;
  let keysDown=new Set(), camera={x:0,y:0}, lastFrame=0, cityAudio=null, soundEnabled=true, hornTimer=0, grooveStep=0, grooveTimer=0, lowMoney=false, lowAlarmAt=0, currentCallout=null;
  const ambientNodes=[];

  function weightedStyle(){let n=Math.random()*100;for(const s of responseOutcomes){n-=s.weight;if(n<0)return s.id;}return 'polite';}
  function makeWorld(){
    const buildings=[], buildingCells=new Set(), props=[], cars=[], walkers=[];
    const district=boroughPalettes[levelIndex];
    for(let x=0;x<COLS;x+=5+rand(4)){
      const w=3+rand(4), color=district.shop[rand(district.shop.length)];
      for(const y of [0,17]){
        const h=y===0?3+rand(4):3+rand(5), actualH=Math.min(h,ROWS-y);
        const underStart=y<9?y+actualH-2:y;
        buildings.push({x,y,w,h:actualH,underStart,color,awning:district.awning[rand(district.awning.length)],seed:rand(99)});
        for(let bx=x;bx<Math.min(COLS,x+w);bx++)for(let by=y;by<y+actualH;by++)if(by<underStart||by>=underStart+2)buildingCells.add(key(bx,by));
      }
    }
    const gates=[12,25,38,51,64,77].map((x,i)=>({x,gapY:i%2===0?8:14}));
    // Storefront blocks jut into the avenue; alternating openings make the player weave up and down.
    for(const gate of gates){
      const blockedRows=gate.gapY===8?[10,11,12,13,14,15]:[8,9,10,11,12,13];
      const y0=blockedRows[0],h=blockedRows.length;
      const underStart=gate.gapY===8?y0:y0+h-2;
      buildings.push({x:gate.x,y:y0,w:2,h,underStart,color:district.shop[rand(district.shop.length)],awning:district.awning[rand(district.awning.length)],seed:rand(99),construction:true});
      for(let x=gate.x;x<gate.x+2;x++)for(const y of blockedRows)if(y<underStart||y>=underStart+2)buildingCells.add(key(x,y));
    }
    const waypoints=[{x:0,y:11}];
    for(const gate of gates)waypoints.push({x:gate.x-3,y:gate.gapY},{x:gate.x+4,y:gate.gapY},{x:gate.x+8,y:11});
    waypoints.push({x:COLS-3,y:11});
    const route=[];
    for(let x=0;x<COLS;x++){
      let segment=0;while(segment<waypoints.length-2&&x>waypoints[segment+1].x)segment++;
      const a=waypoints[segment],b=waypoints[segment+1],t=Math.max(0,Math.min(1,(x-a.x)/(b.x-a.x||1)));
      route.push(Math.round(a.y+(b.y-a.y)*t));
    }
    for(let x=2;x<COLS-2;x+=2+rand(4)){
      props.push({x:x*CELL+20,y:(7.7+Math.random()*.6)*CELL,type:['hydrant','bin','tree','lamp','cart','scaffold'][rand(6)],color:['#e36f4f','#287766','#477a55'][rand(3)]});
      props.push({x:x*CELL+20,y:(14.3+Math.random()*.5)*CELL,type:['hydrant','bin','tree','lamp','cart'][rand(5)],color:['#e36f4f','#287766','#477a55'][rand(3)]});
    }
    const spec=levels[levelIndex], scammers=[];
    for(let i=0;i<spec.scammers;i++){
      let x,y,tries=0;do{x=(4+rand(COLS-9))*CELL+CELL/2;const lane=route[Math.floor(x/CELL)];y=(lane+(rand(5)-2))*CELL+CELL/2;tries++;}while((buildingCells.has(key(Math.floor(x/CELL),Math.floor(y/CELL)))||scammers.some(other=>Math.hypot(other.x-x,other.y-y)<78))&&tries<180);
      scammers.push({x,y,home:{x,y},targetStyle:weightedStyle(),asked:spec.payCost,active:true,chasing:false,fleeing:false,cooldown:0,style:rand(palettes.length),facing:Math.random()<.5?-1:1,anim:Math.random()*4,wanderX:0,wanderY:0,wanderUntil:0,warned:false,line:null,eliminated:new Set(),callout:null,mistakes:0,forcePay:false,forcedPay:false,roundLocked:false});
    }
    for(let i=0;i<16+levelIndex*5;i++){let x,y,tries=0;do{x=rand(COLS*CELL);y=(9.1+rand(5)*.72)*CELL;tries++;}while(buildingCells.has(key(Math.floor(x/CELL),Math.floor(y/CELL)))&&tries<100);cars.push({x,y,speed:(88+rand(70))*(Math.random()<.5?-1:1),color:['#ffcc29','#f45155','#27aee4','#fff0cb','#6fd05c'][rand(5)],w:38+rand(12)});}
    for(let i=0;i<spec.walkers;i++){const x=(2+rand(COLS-4))*CELL+CELL/2,lower=Math.random()<.5;walkers.push({x,y:(lower?14.65:7.35)*CELL,dir:Math.random()<.5?-1:1,speed:18+rand(22)+levelIndex*5,style:rand(palettes.length),anim:Math.random()*5});}
    return {width:COLS*CELL,height:ROWS*CELL,buildings,buildingCells,props,cars,walkers,route,scammers,exit:{x:(COLS-3)*CELL,y:route[COLS-3]*CELL+CELL/2}};
  }
  function resetLevel(newRun=false){
    encounter=null;finished=false;keysDown.clear();currentCallout=null;scammerGraceUntil=0;lowMoney=false;document.body.classList.remove('low-money');if(newRun){levelIndex=0;exitBonus=0;}
    const spec=levels[levelIndex];world=makeWorld();player={x:55,y:world.route[1]*CELL+CELL/2,facingX:1,facingY:0,speed:185,anim:0,moving:false,hasMoved:false};
    document.body.classList.remove('borough-brooklyn','borough-manhattan','borough-queens');document.body.classList.add(`borough-${spec.borough.toLowerCase()}`);
    money=spec.money+exitBonus;secondsLeft=spec.seconds;camera={x:0,y:0};$('dialogue').hidden=true;$('overlay').hidden=true;
    $('levelName').textContent=spec.name;$('levelDesc').textContent=spec.desc;
    $('levelProgress').innerHTML=levels.map((_,i)=>`<i class="${i<=levelIndex?'on':''}"></i>`).join('');
    $('weatherStat').textContent=['Brownstones & bodegas','Midtown towers','Queens night markets'][levelIndex];$('moodStat').textContent=spec.mood;$('boroughName').textContent=spec.borough;$('boroughMood').textContent=spec.mood;syncMusicForLevel();
    say('Follow the avenue toward the green exit. The camera follows you; distant streets stay hidden.');updateStats();draw();
  }
  function say(t){$('message').textContent=t;}
  function updateStats(){
    const s=Math.max(0,Math.ceil(secondsLeft));$('timeStat').textContent=`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;$('moneyStat').textContent=`$${money}`;
    const pct=Math.max(0,Math.min(100,player?player.x/world.exit.x*100:0));$('progressFill').style.width=`${pct}%`;$('distanceStat').textContent=`${Math.round(pct)}%`;
    const threshold=Math.max(6,Math.round(levels[levelIndex].money*.25)),isLow=money<=threshold;if(isLow&&!lowMoney){lowMoney=true;lowAlarmAt=performance.now()+1900;document.body.classList.add('low-money');alarmSound();}else if(!isLow&&lowMoney){lowMoney=false;document.body.classList.remove('low-money');}
  }
  function solid(x,y,r=9){
    if(x-r<0||y-r<0||x+r>world.width||y+r>world.height)return true;
    const samples=[[x-r,y-r],[x+r,y-r],[x-r,y+r],[x+r,y+r]];
    return samples.some(([sx,sy])=>world.buildingCells.has(key(Math.floor(sx/CELL),Math.floor(sy/CELL))));
  }
  function isUnderBuilding(x,y){
    const cx=x/CELL,cy=y/CELL;
    return world.buildings.some(b=>cx>=b.x&&cx<b.x+b.w&&cy>=b.underStart&&cy<b.underStart+2);
  }
  function lineOfSight(a,b){
    const steps=Math.ceil(distance(a,b)/20);for(let i=1;i<steps;i++){const t=i/steps;if(solid(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t,0))return false;}return true;
  }
  function beginAudio(){
    if(!soundEnabled)return;
    if(cityAudio){cityAudio.ac.resume();return;}
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    const ac=new AC(),master=ac.createGain();master.gain.value=.52;master.connect(ac.destination);cityAudio={ac,master};ac.resume();
    const length=ac.sampleRate*2,buffer=ac.createBuffer(1,length,ac.sampleRate),data=buffer.getChannelData(0);cityAudio.noiseBuffer=buffer;
    for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*.42;
    const noise=ac.createBufferSource();noise.buffer=buffer;noise.loop=true;
    const low=ac.createBiquadFilter();low.type='lowpass';low.frequency.value=570;
    const hiss=ac.createGain();hiss.gain.value=.045;noise.connect(low).connect(hiss).connect(master);noise.start();ambientNodes.push(noise);
    const traffic=ac.createOscillator(),trafficGain=ac.createGain();traffic.type='sawtooth';traffic.frequency.value=48;trafficGain.gain.value=.009;traffic.connect(trafficGain).connect(master);traffic.start();ambientNodes.push(traffic);
    const pulse=ac.createOscillator(),pulseGain=ac.createGain();pulse.type='sine';pulse.frequency.value=73;pulseGain.gain.value=.004;pulse.connect(pulseGain).connect(master);pulse.start();ambientNodes.push(pulse);
    syncMusicForLevel();
    master.gain.setTargetAtTime(.52,ac.currentTime,.35);
  }
  function syncMusicForLevel(){if(grooveTimer){clearInterval(grooveTimer);grooveTimer=0;}if(cityAudio&&soundEnabled)grooveTimer=setInterval(playFunkStep,levels[levelIndex].musicStep);grooveStep=0;}
  function playFunkStep(){
    if(!cityAudio||!soundEnabled)return;
    const {ac,master,noiseBuffer}=cityAudio,t=ac.currentTime+.015,step=grooveStep++%16,mood=levels[levelIndex].musicMood;
    const note=(freq,type,vol,dur,offset=0)=>{const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.setValueAtTime(freq,t+offset);g.gain.setValueAtTime(.0001,t+offset);g.gain.exponentialRampToValueAtTime(vol,t+offset+.012);g.gain.exponentialRampToValueAtTime(.0001,t+offset+dur);o.connect(g).connect(master);o.start(t+offset);o.stop(t+offset+dur+.02);};
    const drum=(cutoff,vol,dur,offset=0)=>{const n=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();n.buffer=noiseBuffer;f.type='highpass';f.frequency.value=cutoff;g.gain.setValueAtTime(vol,t+offset);g.gain.exponentialRampToValueAtTime(.0001,t+offset+dur);n.connect(f).connect(g).connect(master);n.start(t+offset);n.stop(t+offset+dur+.01);};
    if(mood==='warm'){
      const bass=[55,0,73.4,0,82.4,0,65.4,0,55,0,98,0,82.4,0,73.4,0];if(bass[step])note(bass[step],'triangle',.12,.19);
      if([0,8].includes(step))note(105,'sine',.13,.16);if([4,12].includes(step))drum(900,.08,.11);
      if([3,7,11,15].includes(step)){[220,277.2,330].forEach((hz,i)=>note(hz,'sine',.025,.16,i*.012));}
      if(step%4===2)drum(5200,.018,.04);
    }else if(mood==='rush'){
      const bass=[65.4,82.4,0,98,73.4,0,110,82.4,65.4,0,98,0,123.5,110,82.4,0];if(bass[step])note(bass[step],'square',.105,.12);
      if([0,4,8,12].includes(step))note(82,'sine',.15,.12);if([4,12].includes(step))drum(1100,.12,.12);
      if([2,6,10,14].includes(step)){[247,311,370].forEach((hz,i)=>note(hz,'sawtooth',.035,.09,i*.008));}
      drum(6500,.018,.035);
    }else{
      const bass=[49,0,58.3,69.3,0,65.4,0,77.8,49,0,58.3,0,92.5,0,77.8,69.3];if(bass[step])note(bass[step],'sawtooth',.13,.10);
      if(step%4===0)note(70,'square',.11,.15);if([2,6,10,14].includes(step))drum(800,.13,.18);
      if([3,7,11,15].includes(step)){[196,233,311].forEach((hz,i)=>note(hz,'sawtooth',.048,.12,i*.01));}
      if([5,13].includes(step)){const o=ac.createOscillator(),g=ac.createGain();o.type='sawtooth';o.frequency.setValueAtTime(880,t);o.frequency.linearRampToValueAtTime(540,t+.20);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.06,t+.025);g.gain.exponentialRampToValueAtTime(.0001,t+.22);o.connect(g).connect(master);o.start(t);o.stop(t+.23);}
      drum(7400,.025,.04);
    }
  }
  function toggleSound(){
    soundEnabled=!soundEnabled;$('soundButton').textContent=soundEnabled?'City groove: on':'City groove: off';
    if(soundEnabled){beginAudio();if(cityAudio){cityAudio.ac.resume();syncMusicForLevel();cityAudio.master.gain.setTargetAtTime(.52,cityAudio.ac.currentTime,.08);}}
    else if(cityAudio)cityAudio.master.gain.setTargetAtTime(0,cityAudio.ac.currentTime,.08);
  }
  function warningSound(){
    beginAudio();if(!cityAudio||!soundEnabled)return;const {ac,master}=cityAudio;
    [0,0.18,0.42].forEach((delay,i)=>{const o=ac.createOscillator(),g=ac.createGain();o.type='square';o.frequency.value=i===1?660:880;g.gain.setValueAtTime(.0001,ac.currentTime+delay);g.gain.exponentialRampToValueAtTime(.16,ac.currentTime+delay+.025);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+delay+.14);o.connect(g).connect(master);o.start(ac.currentTime+delay);o.stop(ac.currentTime+delay+.16);});
  }
  function alarmSound(){
    beginAudio();if(!cityAudio||!soundEnabled)return;const {ac,master}=cityAudio,t=ac.currentTime;
    for(let i=0;i<4;i++){const o=ac.createOscillator(),g=ac.createGain();o.type='sawtooth';o.frequency.setValueAtTime(i%2?520:760,t+i*.28);o.frequency.linearRampToValueAtTime(i%2?760:520,t+i*.28+.24);g.gain.setValueAtTime(.0001,t+i*.28);g.gain.exponentialRampToValueAtTime(.20,t+i*.28+.025);g.gain.exponentialRampToValueAtTime(.0001,t+i*.28+.26);o.connect(g).connect(master);o.start(t+i*.28);o.stop(t+i*.28+.27);}
  }
  function cheerSound(){
    beginAudio();if(!cityAudio||!soundEnabled)return;const {ac,master,noiseBuffer}=cityAudio,t=ac.currentTime;
    const crowd=ac.createBufferSource(),band=ac.createBiquadFilter(),gain=ac.createGain();crowd.buffer=noiseBuffer;band.type='bandpass';band.frequency.value=1350;band.Q.value=.55;gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(.10,t+.18);gain.gain.exponentialRampToValueAtTime(.0001,t+1.7);crowd.connect(band).connect(gain).connect(master);crowd.start(t);crowd.stop(t+1.72);
    [523.25,659.25,783.99,1046.5].forEach((hz,i)=>{const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=hz;g.gain.setValueAtTime(.0001,t+i*.07);g.gain.exponentialRampToValueAtTime(.035,t+i*.07+.05);g.gain.exponentialRampToValueAtTime(.0001,t+i*.07+1.1);o.connect(g).connect(master);o.start(t+i*.07);o.stop(t+i*.07+1.12);});
  }
  function flashWrongAnswer(){document.body.classList.add('wrong-flash');clearTimeout(wrongFlashTimer);wrongFlashTimer=setTimeout(()=>document.body.classList.remove('wrong-flash'),1000);}
  function cityHonk(){
    if(!cityAudio||!soundEnabled)return;const {ac,master}=cityAudio;
    [392,494].forEach((hz,i)=>{const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.setValueAtTime(hz,ac.currentTime+i*.08);o.frequency.exponentialRampToValueAtTime(hz*.82,ac.currentTime+.38+i*.08);g.gain.setValueAtTime(.0001,ac.currentTime+i*.08);g.gain.exponentialRampToValueAtTime(.035,ac.currentTime+.05+i*.08);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+.42+i*.08);o.connect(g).connect(master);o.start(ac.currentTime+i*.08);o.stop(ac.currentTime+.46+i*.08);});
  }
  function startChase(s){
    if(s.chasing)return;s.chasing=true;
    if(!s.warned){s.warned=true;if(performance.now()-lastSwarmAlert>900){warningSound();lastSwarmAlert=performance.now();}s.callout=spotCallouts[rand(spotCallouts.length)];currentCallout=s;s.calloutUntil=performance.now()+2600;say(`${levels[levelIndex].borough}: ${s.callout}`);$('threatIndicator').classList.add('visible');$('threatText').textContent='SPOTTED — '+s.callout;}
  }
  function caught(s){
    warningSound();if(currentCallout===s){currentCallout=null;$('threatIndicator').classList.remove('visible');}money=Math.max(0,money-3);say('Caught: you lose $3, then the conversation begins.');s.chasing=false;s.cooldown=performance.now()+4200;s.warned=false;updateStats();
    if(money<=0)endGame(false,'Your wallet is empty.');else openDialogue(s);
  }
  function updateNPCs(dt,now){
    const spec=levels[levelIndex];
    for(const s of world.scammers){if(!s.active)continue;
      const interactionProtected=now<scammerGraceUntil;
      if(interactionProtected&&s.chasing){s.chasing=false;s.warned=false;s.cooldown=scammerGraceUntil;}
      if(s.fleeing){const away=distance(s,player);if(away>720||now>s.leaveUntil){s.active=false;continue;}const dAway=Math.max(1,away),nx=s.x+(s.x-player.x)/dAway*245*dt,ny=s.y+(s.y-player.y)/dAway*245*dt;if(!solid(nx,s.y,8))s.x=nx;if(!solid(s.x,ny,8))s.y=ny;s.facing=player.x<s.x?1:-1;s.anim+=dt*9;continue;}
      const d=distance(s,player),sameLine=(Math.abs(s.x-player.x)<26||Math.abs(s.y-player.y)<26),facing= sameLine && (player.x-s.x)*player.facingX+(player.y-s.y)*player.facingY>0;
      const playerScreenX=player.x-camera.x,scammerScreenX=s.x-camera.x,sameScreenHalf=(playerScreenX<canvas.width/2)===(scammerScreenX<canvas.width/2);
      const activeChasers=world.scammers.filter(other=>other!==s&&other.active&&other.chasing).length;
      const onScreen=s.x>=camera.x-18&&s.x<=camera.x+canvas.width+18&&s.y>=camera.y-18&&s.y<=camera.y+canvas.height+18;
      const visible=onScreen&&lineOfSight(s,player);
      const canSwarm=levelIndex===2;
      const maxPursuers=spec.maxPursuers;
      // Pursuit grows with each borough; spacing keeps the larger groups readable.
      if(!interactionProtected&&!encounter&&activeChasers<maxPursuers&&player.hasMoved&&now>s.cooldown&&visible&&levelIndex>0&&(canSwarm||d<spec.detection))startChase(s);
      if(!interactionProtected&&!encounter&&activeChasers<maxPursuers&&player.hasMoved&&now>s.cooldown&&visible&&sameScreenHalf&&levelIndex===0&&facing&&d<spec.detection)startChase(s);
      if(s.chasing){
        if((d>690&&spec.detection!==Infinity)||(canSwarm&&(!onScreen||!lineOfSight(s,player)))||(levelIndex===0&&!sameScreenHalf)){s.chasing=false;s.warned=false;s.cooldown=now+1800;if(currentCallout===s){currentCallout=null;$('threatIndicator').classList.remove('visible');}}
        else if(d<30){if(!encounter&&encounter!==s)caught(s);continue;}
        else if(!encounter){let dx=(player.x-s.x)/d,dy=(player.y-s.y)/d;
          // Give the active pursuers separate lanes so they do not merge into a single blocking pile.
          for(const other of world.scammers){if(other===s||!other.active||!other.chasing)continue;const ox=s.x-other.x,oy=s.y-other.y,od=Math.hypot(ox,oy),spacing=levelIndex===2?66:54;if(od>0&&od<spacing){const push=(spacing-od)/spacing;dx+=ox/od*push*1.8;dy+=oy/od*push*1.8;}}
          const direction=Math.hypot(dx,dy)||1;dx/=direction;dy/=direction;const speed=spec.speed;s.facing=dx<0?-1:1;const nx=s.x+dx*speed*dt,ny=s.y+dy*speed*dt;if(!solid(nx,s.y,8))s.x=nx;if(!solid(s.x,ny,8))s.y=ny;s.anim+=dt*speed/22;}
      }else if(now>s.wanderUntil){s.wanderUntil=now+1.1+Math.random()*2.2;s.wanderX=(Math.random()-.5)*2;s.wanderY=(Math.random()-.5)*2;}
      else if(encounter!==s&&(levelIndex>0||distance(s,s.home)<120)){const nx=s.x+s.wanderX*18*dt,ny=s.y+s.wanderY*18*dt;if(!solid(nx,s.y,8))s.x=nx;if(!solid(s.x,ny,8))s.y=ny;if(Math.abs(s.wanderX)>.1)s.facing=s.wanderX<0?-1:1;s.anim+=dt*1.3;}
      if(!interactionProtected&&!encounter&&d<46&&now>s.cooldown&&(levelIndex!==0||(sameScreenHalf&&facing)))openDialogue(s);
    }
    for(const w of world.walkers){w.x+=w.dir*w.speed*dt;if(w.x<80||w.x>world.width-80)w.dir*=-1;w.anim+=dt*2.5;}
    updateCars(dt,now);
  }
  function updateCars(dt,now){
    for(const c of world.cars){if(c.stoppedUntil&&now>=c.stoppedUntil){c.speed=Math.abs(c.resumeSpeed||90);c.stoppedUntil=0;}if(!c.stoppedUntil){const nextX=c.x+c.speed*dt;if(world.buildingCells.has(key(Math.floor(nextX/CELL),Math.floor(c.y/CELL))))c.speed*=-1;else c.x=nextX;}if(c.x<-100)c.x=world.width+40;if(c.x>world.width+100)c.x=-40;
      if(player.hasMoved&&!encounter&&now>(player.carHitCooldown||0)&&Math.abs(player.x-c.x)<c.w/2+13&&Math.abs(player.y-c.y)<15){
        const cost=levels[levelIndex].carCost;money=Math.max(0,money-cost);c.resumeSpeed=Math.abs(c.speed)||90;c.speed=0;c.stoppedUntil=now+650;player.carHitCooldown=now+1900;player.stunnedUntil=now+420;keysDown.clear();warningSound();cityHonk();say(`Traffic hit you. Pay $${cost} and get back on your feet.`);updateStats();if(money<=0)endGame(false,'A car hit emptied your wallet.');
      }
    }
  }
  function update(dt,now){
    if(finished)return;secondsLeft-=dt;if(secondsLeft<=0){secondsLeft=0;updateStats();endGame(false,'Time ran out. The street took too long.');return;}
    if(cityAudio&&soundEnabled){hornTimer+=dt;if(hornTimer>9+Math.random()*7){hornTimer=0;cityHonk();}}
    if(lowMoney&&now>=lowAlarmAt){alarmSound();lowAlarmAt=now+2100;}
    if(currentCallout&&now>currentCallout.calloutUntil&&!currentCallout.chasing){currentCallout=null;$('threatIndicator').classList.remove('visible');}
    if(!encounter){let dx=(keysDown.has('ArrowRight')||keysDown.has('d')?1:0)-(keysDown.has('ArrowLeft')||keysDown.has('a')?1:0);let dy=(keysDown.has('ArrowDown')||keysDown.has('s')?1:0)-(keysDown.has('ArrowUp')||keysDown.has('w')?1:0);
      const len=Math.hypot(dx,dy);player.moving=len>0;if(len&&now>(player.stunnedUntil||0)){player.hasMoved=true;dx/=len;dy/=len;player.facingX=dx;player.facingY=dy;const nx=player.x+dx*player.speed*dt,ny=player.y+dy*player.speed*dt;if(!solid(nx,player.y,9))player.x=nx;if(!solid(player.x,ny,9))player.y=ny;player.anim+=dt*11;}
    }else player.moving=false;
    updateNPCs(dt,now);
    const targetX=Math.max(0,Math.min(world.width-canvas.width,player.x-canvas.width*.43));const targetY=Math.max(0,Math.min(world.height-canvas.height,player.y-canvas.height*.53));
    camera.x+=(targetX-camera.x)*Math.min(1,dt*5);camera.y+=(targetY-camera.y)*Math.min(1,dt*5);
    if(distance(player,world.exit)<32){completeLevel();return;}
    updateStats();
  }
  function loop(now){const dt=Math.min(.04,(now-lastFrame)/1000||0);lastFrame=now;update(dt,now);draw();requestAnimationFrame(loop);}
  function drawBuilding(b){
    const x=b.x*CELL,y=b.y*CELL,w=b.w*CELL,h=b.h*CELL;
    ctx.fillStyle='rgba(52,39,42,.25)';ctx.fillRect(x+7,y+9,w,h);ctx.fillStyle=b.color;ctx.fillRect(x,y,w,h);
    ctx.fillStyle='#493c43';ctx.fillRect(x,y+Math.min(h-6,18),w,5);ctx.fillStyle='#eee0bd';ctx.fillRect(x+5,y+5,w-10,7);
    const winColor=['#b5d8d4','#f5cd76','#9cc6dc'][b.seed%3];
    for(let wx=x+7;wx<x+w-7;wx+=18)for(let wy=y+25;wy<y+h-17;wy+=22){ctx.fillStyle='#50444a';ctx.fillRect(wx-1,wy-1,11,14);ctx.fillStyle=winColor;ctx.fillRect(wx,wy,9,11);ctx.fillStyle='rgba(255,255,255,.45)';ctx.fillRect(wx+1,wy+1,2,8);}
    if(b.construction){ctx.fillStyle='#f8ca32';ctx.fillRect(x+3,y+h-16,w-6,8);for(let sx=x+5;sx<x+w-7;sx+=12){ctx.fillStyle='#342b37';ctx.beginPath();ctx.moveTo(sx,y+h-16);ctx.lineTo(sx+7,y+h-16);ctx.lineTo(sx,y+h-9);ctx.fill();}ctx.fillStyle='#f5e9cc';ctx.fillRect(x+Math.max(3,w*CELL/2-17),y+4,34,15);ctx.fillStyle='#312a36';ctx.font='bold 6px system-ui';ctx.fillText('ROAD WORK',x+Math.max(4,w*CELL/2-15),y+14);}
    if(levelIndex===0){ctx.fillStyle='#5a493f';ctx.fillRect(x+5,y+h-47,16,13);ctx.fillRect(x+3,y+h-34,20,5);ctx.fillStyle='#d9bd9c';ctx.fillRect(x+5,y+h-32,2,13);ctx.fillRect(x+19,y+h-32,2,13);}
    if(levelIndex===1){ctx.fillStyle='rgba(228,241,255,.34)';for(let sx=x+11;sx<x+w-10;sx+=22)ctx.fillRect(sx,y+18,3,h-48);ctx.fillStyle='#424553';ctx.fillRect(x+w/2-2,y-12,4,12);}
    if(h>90){const awningY=b.underStart*CELL;ctx.fillStyle=b.awning;ctx.fillRect(x+2,awningY,w-4,13);for(let ax=x+4;ax<x+w-4;ax+=11){ctx.fillStyle='rgba(255,244,224,.85)';ctx.fillRect(ax,awningY,5,13);}ctx.fillStyle='#3b3438';ctx.fillRect(x+4,awningY+13,w-8,18);ctx.fillStyle='#dfc4a4';ctx.fillRect(x+8,awningY+16,w-16,12);ctx.fillStyle=levelIndex===2?'#ffe24e':'#fff1ce';ctx.font='bold 6px system-ui';ctx.textAlign='center';ctx.fillText(['BODEGA','MIDTOWN','NIGHT MARKET'][levelIndex],x+w/2,awningY+11);ctx.textAlign='start';}
    ctx.fillStyle='rgba(255,255,255,.14)';ctx.fillRect(x+3,y+3,3,h-6);
  }
  function drawProp(p){const x=p.x,y=p.y;
    if(p.type==='hydrant'){ctx.fillStyle='#3b3737';ctx.fillRect(x-7,y+7,14,4);ctx.fillStyle=p.color;ctx.fillRect(x-5,y-8,10,16);ctx.fillRect(x-8,y-4,16,6);ctx.fillStyle='#f5c98c';ctx.fillRect(x-3,y-10,6,3);}
    if(p.type==='bin'){ctx.fillStyle='#3d5555';ctx.fillRect(x-8,y-8,16,20);ctx.fillStyle='#73948a';ctx.fillRect(x-9,y-10,18,4);ctx.fillStyle='#526b65';ctx.fillRect(x-4,y-5,2,13);ctx.fillRect(x+2,y-5,2,13);}
    if(p.type==='tree'){ctx.fillStyle='#78513a';ctx.fillRect(x-3,y-4,6,19);ctx.fillStyle='#47734d';ctx.fillRect(x-12,y-18,24,18);ctx.fillStyle='#75a45d';ctx.fillRect(x-8,y-21,15,8);}
    if(p.type==='cart'){ctx.fillStyle='#40303d';ctx.fillRect(x-13,y-7,27,18);ctx.fillStyle='#ed644f';ctx.fillRect(x-14,y-13,29,7);ctx.fillStyle='#ffe17b';ctx.fillRect(x-9,y-5,17,7);ctx.fillStyle='#4a3c38';ctx.fillRect(x-10,y+11,3,6);ctx.fillRect(x+7,y+11,3,6);}
    if(p.type==='scaffold'){ctx.strokeStyle='#e6a93a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-12,y-24);ctx.lineTo(x-12,y+16);ctx.moveTo(x+12,y-24);ctx.lineTo(x+12,y+16);ctx.moveTo(x-12,y-17);ctx.lineTo(x+12,y-17);ctx.moveTo(x-12,y-1);ctx.lineTo(x+12,y-1);ctx.stroke();ctx.fillStyle='#f2cf45';ctx.fillRect(x-14,y+12,28,5);}
    if(p.type==='lamp'){ctx.fillStyle='#534a48';ctx.fillRect(x-2,y-35,4,46);ctx.fillRect(x-2,y-35,16,3);ctx.fillStyle='#ffe18a';ctx.fillRect(x+9,y-38,7,6);}
  }
  function drawCar(c){const x=c.x,y=c.y;ctx.fillStyle='rgba(30,26,26,.24)';ctx.fillRect(x-2,y+12,c.w+4,7);ctx.fillStyle='#39343a';ctx.fillRect(x-2,y,c.w+4,15);ctx.fillStyle=c.color;ctx.fillRect(x,y-2,c.w,14);ctx.fillStyle='#bde0e3';ctx.fillRect(x+8,y,c.w-19,7);ctx.fillStyle='#fff4d9';ctx.fillRect(c.speed>0?x+c.w-4:x+1,y+7,3,3);ctx.fillStyle='#e76452';ctx.fillRect(c.speed>0?x+1:x+c.w-4,y+7,3,3);ctx.fillStyle='#242227';ctx.fillRect(x+5,y+12,7,4);ctx.fillRect(x+c.w-12,y+12,7,4);}
  function drawPerson(x,y,art,palette,facing,anim,moving=false){
    const bob=moving?Math.sin(anim*2)*1.4:Math.sin(anim*1.4)*.4;ctx.fillStyle='rgba(47,39,38,.24)';ctx.beginPath();ctx.ellipse(x,y-1,13,5,0,0,Math.PI*2);ctx.fill();
    ctx.save();ctx.translate(x,y-40+bob);if(facing<0){ctx.translate(32,0);ctx.scale(-1,1);}const colors=colorsFor(art,palette);const frame=moving?Math.floor(anim*2)%2:0;
    for(let row=0;row<art.length;row++)for(let col=0;col<art[row].length;col++){let ch=art[row][col];if(row>=15&&row<=18&&frame===1){if(row===15||row===16){if(col===5||col===6)ch='.';if(col===9||col===10)ch='G';}if(row===17||row===18){if(col===5||col===6)ch='W';if(col===9||col===10)ch='.';}}const color=colors[ch];if(color) {ctx.fillStyle=color;ctx.fillRect(col*2,row*2,2.2,2.2);}}
    ctx.restore();
  }
  function drawScammerStyle(s){
    const x=s.x,y=s.y,style=s.style%5;ctx.save();
    if(levelIndex===0){ctx.fillStyle=['#e9b845','#d97f54','#7792b7'][style%3];ctx.fillRect(x-13,y-42,26,5);ctx.fillStyle='#d84e60';ctx.fillRect(x-10,y-17,20,5);ctx.fillRect(x+10,y-5,7,10);}
    else if(levelIndex===1){ctx.fillStyle='#373845';ctx.fillRect(x-12,y-22,7,21);ctx.fillRect(x+5,y-22,7,21);ctx.fillStyle='#c8a35a';ctx.fillRect(x-3,y-18,6,11);ctx.fillStyle='#d8ecf5';ctx.fillRect(x-10,y-31,8,3);ctx.fillRect(x+2,y-31,8,3);}
    else{ctx.fillStyle='#382d55';ctx.fillRect(x-13,y-43,26,9);ctx.fillStyle=['#f45c77','#42c9d0','#ffd044'][style%3];ctx.fillRect(x-13,y-16,26,5);ctx.fillRect(x-13,y-10,5,8);ctx.fillRect(x+8,y-10,5,8);}
    if(style===0){ctx.fillStyle='#ffd337';ctx.fillRect(x-12,y-43,24,6);ctx.fillRect(x-8,y-48,16,6);ctx.fillStyle='#e94d66';ctx.fillRect(x-3,y-47,7,3);}
    else if(style===1){ctx.fillStyle='#52e0a0';ctx.fillRect(x-3,y-52,6,11);ctx.fillRect(x-10,y-47,5,7);ctx.fillRect(x+5,y-49,5,8);}
    else if(style===2){ctx.fillStyle='#fb73d1';ctx.fillRect(x-10,y-30,8,5);ctx.fillRect(x+2,y-30,8,5);ctx.fillStyle='#211d36';ctx.fillRect(x-3,y-29,6,2);}
    else if(style===3){ctx.fillStyle='#ff8a38';ctx.fillRect(x-11,y-19,22,4);ctx.fillStyle='#ffe244';ctx.fillRect(x-7,y-18,14,2);}
    else{ctx.fillStyle='#49d6e2';ctx.fillRect(x-10,y-43,20,5);ctx.fillRect(x-7,y-47,14,5);ctx.fillStyle='#f45689';ctx.fillRect(x-11,y-1,5,7);}
    ctx.fillStyle=s.chasing?'#ec4258':'#fff0a4';ctx.fillRect(x+10,y-65,14,13);ctx.beginPath();ctx.moveTo(x+12,y-52);ctx.lineTo(x+17,y-47);ctx.lineTo(x+18,y-52);ctx.fill();ctx.fillStyle=s.chasing?'#fff':'#352548';ctx.font='bold 10px system-ui';ctx.fillText(s.chasing?'!':'?',x+14,y-55);
    ctx.restore();
  }
  function draw(){
    if(!world)return;ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#cdbba5';ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.save();ctx.translate(-camera.x,-camera.y);
    const top=Math.max(0,Math.floor(camera.y/CELL)-1),bottom=Math.min(ROWS,Math.ceil((camera.y+canvas.height)/CELL)+1),left=Math.max(0,Math.floor(camera.x/CELL)-1),right=Math.min(COLS,Math.ceil((camera.x+canvas.width)/CELL)+1);
    for(let y=top;y<bottom;y++)for(let x=left;x<right;x++){
      const py=y*CELL,px=x*CELL;
      if(y>=9&&y<=13){const district=boroughPalettes[levelIndex];ctx.fillStyle=(y===9||y===13)?district.curb:district.road;ctx.fillRect(px,py,CELL,CELL);if(y===9||y===13){ctx.fillStyle='#ffe16a';ctx.fillRect(px,py+2,CELL,CELL-4);}else if(y===11&&x%2===0){ctx.fillStyle='#ffe650';ctx.fillRect(px+7,py+18,24,4);}}
      else {ctx.fillStyle=boroughPalettes[levelIndex].sidewalk;ctx.fillRect(px,py,CELL,CELL);if((x+y)%2===0){ctx.fillStyle='rgba(255,255,255,.20)';ctx.fillRect(px+2,py+2,CELL-4,CELL-4);}ctx.strokeStyle='rgba(91,47,122,.23)';ctx.strokeRect(px,py,CELL,CELL);}
    }
    for(const b of world.buildings)if(b.x+b.w>left&&b.x<right&&b.y+b.h>top&&b.y<bottom)drawBuilding(b);
    for(const p of world.props)if(p.x>camera.x-40&&p.x<camera.x+canvas.width+40&&p.y>camera.y-50&&p.y<camera.y+canvas.height+50)drawProp(p);
    for(const w of world.walkers)if(w.x>camera.x-40&&w.x<camera.x+canvas.width+40)drawPerson(w.x,w.y,playerArt,palettesFor(w.style),w.dir,w.anim,true);
    for(const c of world.cars)if(c.x>camera.x-60&&c.x<camera.x+canvas.width+60&&c.y>camera.y-20&&c.y<camera.y+canvas.height+20)drawCar(c);
    const ex=world.exit.x,ey=world.exit.y;ctx.fillStyle='rgba(58,149,89,.28)';ctx.beginPath();ctx.ellipse(ex,ey,28,21,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#439359';ctx.fillRect(ex-8,ey-21,16,42);ctx.fillStyle='#fff3d5';ctx.fillRect(ex-4,ey-15,8,7);ctx.fillRect(ex-4,ey-3,8,7);ctx.fillStyle='#273c34';ctx.font='bold 18px system-ui';ctx.fillText('EXIT',ex-20,ey-27);
    for(const s of world.scammers){if(!s.active||s.x<camera.x-80||s.x>camera.x+canvas.width+80||s.y<camera.y-80||s.y>camera.y+canvas.height+80)continue;
      const spec=levels[levelIndex];if(levelIndex>0&&distance(s,player)<spec.detection){ctx.fillStyle=s.chasing?'rgba(224,75,78,.16)':'rgba(224,75,78,.09)';ctx.beginPath();ctx.ellipse(s.x,s.y,72,45,0,0,Math.PI*2);ctx.fill();}
      if(s.chasing){ctx.strokeStyle='rgba(213,65,68,.55)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(s.x,s.y-38);ctx.lineTo(player.x,player.y-30);ctx.stroke();}
      if(s.chasing){ctx.strokeStyle=`rgba(226,42,65,${.45+.3*(.5+.5*Math.sin(performance.now()/95))})`;ctx.lineWidth=3;ctx.strokeRect(s.x-15,s.y-43,30,43);}
      drawPerson(s.x,s.y,scammerArtByLevel[levelIndex],scammerPalettes[s.style%scammerPalettes.length],s.facing,s.anim,true);drawScammerStyle(s);
      if(s===currentCallout&&s.calloutUntil>performance.now()){const bx=s.x-camera.x,by=s.y-camera.y-76,text=s.callout||'Hey!';ctx.save();ctx.font='bold 10px system-ui';const words=text.replace(/[“”]/g,'').split(' '),lines=[];let line='';for(const word of words){const test=line?line+' '+word:word;if(ctx.measureText(test).width>180&&line){lines.push(line);line=word;}else line=test;}if(line)lines.push(line);const bw=Math.min(198,Math.max(100,...lines.map(t=>ctx.measureText(t).width+16))),bh=lines.length*13+12;ctx.fillStyle='#fff5d7';ctx.strokeStyle='#d5364c';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(bx-bw/2,by-bh,bw,bh,5);ctx.fill();ctx.stroke();ctx.fillStyle='#3a223e';lines.slice(0,3).forEach((t,i)=>ctx.fillText(t,bx-bw/2+8,by-bh+15+i*13));ctx.restore();}
      if(s.chasing){ctx.fillStyle='#fff3cd';ctx.fillRect(s.x-5,s.y-59,10,10);ctx.fillStyle='#df514c';ctx.font='bold 12px system-ui';ctx.fillText('!',s.x-2,s.y-50);}
    }
    if(!isUnderBuilding(player.x,player.y))drawPerson(player.x,player.y,playerArt,palettes[0],player.facingX<0?-1:1,player.anim,player.moving);
    ctx.restore();
    if(levelIndex===2){ctx.save();ctx.fillStyle='rgba(35,17,64,.10)';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.restore();}
    if(lowMoney){ctx.save();ctx.fillStyle=`rgba(221,25,53,${.10+.08*(.5+.5*Math.sin(performance.now()/115))})`;ctx.fillRect(0,0,canvas.width,canvas.height);ctx.restore();}
  }
  function openDialogue(s){
    if(encounter||!s.active)return;encounter=s;s.chasing=false;$('dialogue').hidden=false;
    s.mistakes=0;s.forcePay=Math.random()<levels[levelIndex].forcePayChance;s.forcedPay=false;s.roundLocked=false;showQuestion(s);
    $('dialogueFeedback').textContent='';$('dialogueRisk').textContent=s.forcePay?'They keep pressing: three wrong reads will leave payment as the only way out.':'';
    renderDialogueChoices(s);
    $('threatIndicator').classList.remove('visible');currentCallout=null;
  }
  function renderDialogueChoices(s){
    const responseButtons=s.forcedPay?'':styles.filter(style=>!s.eliminated.has(style.id)).map(style=>`<button ${s.roundLocked?'disabled':''} data-choice="${style.id}">${style.label}: ${style.line}</button>`).join('');
    let otherButtons=s.forcedPay||s.eliminated.has('ignore')?'':`<button ${s.roundLocked?'disabled':''} data-choice="ignore">Walk away</button>`;
    const payButton=`<button ${s.roundLocked?'disabled':''} data-choice="pay">Pay $${s.asked} and leave</button>`;
    $('dialogueChoices').innerHTML=responseButtons+payButton+otherButtons;
    $('dialogueChoices').querySelectorAll('button:not(:disabled)').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.choice)));
  }
  function choose(choice){
    const s=encounter;if(!s||s.roundLocked)return;const spec=levels[levelIndex];
    if(choice==='pay'){
      if(money<s.asked){if(s.forcedPay){endGame(false,`You could not pay the forced $${s.asked} demand.`);return;}say(`You need $${s.asked} to pay. Read the clue or try a response.`);return;}
      money-=s.asked;s.active=false;encounter=null;$('dialogue').hidden=true;say(s.targetStyle==='pay'?`You paid $${s.asked}. Paying was the right read.`:`You paid $${s.asked} to end the encounter; it cost more than the right response.`);
    }else if(choice==='ignore'&&choice!==s.targetStyle&&levelIndex>0){
      if(s.forcedPay)return;encounter=null;$('dialogue').hidden=true;
      if(levelIndex>0)startChase(s);else say('You kept walking. Keep an eye on their movement.');
    }else if(choice===s.targetStyle){s.chasing=false;encounter=null;$('dialogue').hidden=true;
      if(levelIndex===2){const now=performance.now();scammerGraceUntil=now+2000;s.fleeing=true;s.leaveUntil=now+1800;s.cooldown=scammerGraceUntil;for(const other of world.scammers)if(other.active){other.chasing=false;other.warned=false;other.cooldown=scammerGraceUntil;}currentCallout=null;$('threatIndicator').classList.remove('visible');say('You read the situation correctly. The crowd gives you two seconds to move.');}
      else if(levelIndex===1){const now=performance.now();scammerGraceUntil=now+2000;s.active=true;s.chasing=false;s.fleeing=false;s.warned=false;s.cooldown=scammerGraceUntil;for(const other of world.scammers)if(other.active){other.chasing=false;other.warned=false;other.cooldown=scammerGraceUntil;}currentCallout=null;$('threatIndicator').classList.remove('visible');say('You read the situation correctly. The crowd gives you two seconds to move; the scammer stays in the street.');}
      else{s.active=true;s.chasing=false;s.fleeing=false;s.warned=false;s.cooldown=performance.now()+5000;say('You read the situation correctly. They back off for a moment, then remain in the street.');}}
    else{
      money=Math.max(0,money-spec.wrongCost);s.asked+=spec.wrongCost;s.mistakes++;s.eliminated.add(choice);flashWrongAnswer();
      const choiceLabel=choice==='ignore'?'Walk away':choice==='polite'?'Polite':'Firm';say(`✕ Wrong read. They raise the ask to $${s.asked}.`);$('dialogueFeedback').textContent=`✕ ${choiceLabel} is off the table. Mistake ${s.mistakes}${s.forcePay?' / 3':''}.`;
      if(money<=0){updateStats();endGame(false,'You ran out of money after a wrong answer.');return;}
      if(s.forcePay&&s.mistakes>=3){s.forcedPay=true;$('dialogueRisk').textContent=`Three wrong reads. Pay $${s.asked} to end this encounter.`;renderDialogueChoices(s);}
      else if(s.forcePay){s.roundLocked=true;renderDialogueChoices(s);setTimeout(()=>{if(encounter!==s)return;s.roundLocked=false;showQuestion(s,'New ask — ');$('dialogueFeedback').textContent='';renderDialogueChoices(s);},900);}
      else renderDialogueChoices(s);
    }
    updateStats();
  }
  function completeLevel(){
    const completed=levels[levelIndex].name;money+=5;exitBonus+=5;cheerSound();levelIndex++;encounter=null;$('dialogue').hidden=true;
    if(levelIndex>=levels.length){endGame(true,`You made it through all three boroughs. Exit reward: +$5 (wallet $${money}).`);return;}
    finished=true;$('overlay').innerHTML=`<strong class="result-title">YOU WIN!</strong><span>${completed} cleared · Exit reward +$5<br><span class="overlay-sub">Your reward carries into the next borough.<br><br><button class="button button-small" id="nextLevel">Continue to ${levels[levelIndex].borough}</button></span></span>`;$('overlay').hidden=false;
    $('nextLevel').addEventListener('click',()=>resetLevel(false));
  }
  function endGame(won,text){finished=true;$('dialogue').hidden=true;$('overlay').innerHTML=`<strong class="result-title">${won?'YOU WIN!':'YOU LOSE'}</strong><span>${text}<br><span class="overlay-sub">${won?'All three boroughs complete.':'Reset the street and try again.'}<br><br><button class="button button-small" id="overlayRestart">${won?'Play again':'Reset level'}</button></span></span>`;$('overlay').hidden=false;$('overlayRestart').addEventListener('click',()=>resetLevel(won));}
  document.addEventListener('keydown',e=>{const map={ArrowUp:'ArrowUp',ArrowDown:'ArrowDown',ArrowLeft:'ArrowLeft',ArrowRight:'ArrowRight'};const k=map[e.key]||e.key.toLowerCase();if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d'].includes(k.toLowerCase())){e.preventDefault();beginAudio();keysDown.add(k);}});
  document.addEventListener('keyup',e=>{keysDown.delete(e.key);keysDown.delete(e.key.toLowerCase());});window.addEventListener('blur',()=>keysDown.clear());
  $('restartButton').addEventListener('click',()=>resetLevel(false));$('newRunButton').addEventListener('click',()=>resetLevel(true));$('soundButton').addEventListener('click',toggleSound);
  resetLevel(true);requestAnimationFrame(loop);
})();
