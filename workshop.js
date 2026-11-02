'use strict';
(() => {
 const canvas=document.getElementById('workshop-canvas'),ctx=canvas.getContext('2d');if(!ctx)return;
 const $=id=>document.getElementById(id);
 const toggle=$('motion-toggle'),screen=$('insight-screen'),content=$('dashboard-content'),nudge=$('nudge-card'),nudgeScene=$('nudge-scene'),dashboardScene=$('dashboard-scene'),workshop=document.querySelector('.workshop');
 document.body.classList.add('has-animation');
 nudgeScene.append(nudge);dashboardScene.append(screen);
 const outputs=$('belt-outputs');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const colors={purple:'#9373d3',yellow:'#e1b739',teal:'#17889d',blue:'#4388ce',green:'#399676',red:'#c9576b'};
 // Standalone invented fixtures. No company records, services or application code.
 function kpis(items){return '<div class="dash-kpis">'+items.map(([label,value,note,color])=>`<div class="dash-kpi" style="--kpi:${color}"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join('')+'</div>';}
 function bars(a,b,labels){const max=Math.max(...a,...b)*1.15,w=240,step=220/a.length;return `<svg viewBox="0 0 ${w} 112" role="img" aria-label="Grouped comparison chart; numeric values appear above each bar"><path d="M10 15H235M10 45H235M10 75H235M10 94H235" fill="none" stroke="#e4ebee"/>`+a.map((v,i)=>{const x=14+i*step,bw=Math.min(14,step/3),h=v/max*75,h2=b[i]/max*75;return `<rect x="${x}" y="${94-h}" width="${bw}" height="${h}" fill="${colors.purple}"/><rect x="${x+bw+2}" y="${94-h2}" width="${bw}" height="${h2}" fill="${colors.yellow}"/><text x="${x+bw/2}" y="${90-h}" text-anchor="middle" style="font-size:7px">${v}</text><text x="${x+bw*1.5+2}" y="${90-h2}" text-anchor="middle" style="font-size:7px">${b[i]}</text><text x="${x+bw}" y="109" text-anchor="middle">${labels[i]}</text>`;}).join('')+'</svg>';}
 function legend(a,b){return `<div class="dash-legend"><span><i style="--key:${colors.purple}"></i>${a}</span><span><i style="--key:${colors.yellow}"></i>${b}</span></div>`;}
 function table(title,heads,rows){return `<div class="dash-table"><h4>${title}</h4><table><thead><tr>${heads.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>'<tr>'+row.map((v,i)=>`<td class="${i===row.length-1&&String(v).startsWith('+')?'positive':String(v).startsWith('-')?'negative':''}">${v}</td>`).join('')+'</tr>').join('')}</tbody></table></div>`;}
 const cohortChart='<svg viewBox="0 0 240 112" role="img" aria-label="Individual versus cohort: sales 24 versus 20 thousand dollars, courses 3 versus 5, marketing activities 8 versus 10">'+[{name:'Sales ($k)',a:24,b:20,max:30},{name:'Courses',a:3,b:5,max:6},{name:'Marketing',a:8,b:10,max:12}].map((r,i)=>`<text x="0" y="${15+i*35}">${r.name}</text><rect x="76" y="${4+i*35}" width="${r.b/r.max*125}" height="8" fill="${colors.purple}"/><rect x="76" y="${15+i*35}" width="${r.a/r.max*125}" height="8" fill="${colors.yellow}"/><text x="${80+r.b/r.max*125}" y="${11+i*35}" style="font-size:8px">${r.b}</text><text x="${80+r.a/r.max*125}" y="${22+i*35}" style="font-size:8px">${r.a}</text>`).join('')+'</svg>';
 const groups=[
  {name:'Top Performers',color:'#c5a744',people:[
   ['Marcus','Marcus, your last 30 days reached $36,000 in sales, up 20% from the previous $30,000. Review what contributed to the increase.'],
   ['Priya','Priya, September accounted for $18,000 of your last $60,000 in sales. Explore the activity behind that 30% share.'],
   ['Jordan','Jordan, your recent sales total is $42,000 versus a $35,000 group average. Compare the mix behind your results.']]},
  {name:'Advanced users',color:'#47ad9d',people:[
   ['Gloria','Gloria, your historically strongest sales period begins in three weeks. Review last year’s pattern as you plan ahead.'],
   ['Amir','Amir, your last 30 days total $12,000 in sales, up 20% from the previous $10,000. Take a look at the recent change.'],
   ['Elena','Elena, your $24,000 in sales is 20% above the Advanced users average of $20,000. See how your activity compares.']]},
  {name:'Intermediate users',color:'#a183d5',people:[
   ['Sofia','Sofia, you completed three training courses this month. Explore the next recommendation matched to your sales history.'],
   ['Theo','Theo, your last 30 days reached $9,000 in sales versus $7,500 in the prior period. Review the 20% increase.'],
   ['Nadia','Nadia, your recent marketing activity is 8 actions versus a group average of 10. See which tools might be useful next.']]},
  {name:'New users',color:'#6eaee0',people:[
   ['Maya','Maya, you completed your first training course. Explore the next recommended course for your profile.'],
   ['Owen','Owen, your profile has no recorded sales yet. Review the getting-started resources and choose your next step.'],
   ['Leo','Leo, your calendar is not connected. Connect it to make relevant upcoming events easier to find.']]}
 ];
 const examples=[
  {name:'Seasonal patterns',kind:'SEASONAL EXPLORER',html:'<h3 class="dashboard-title">Seasonal sales history</h3><p class="dashboard-subtitle">Gloria · Advanced users · fictional Jun–Nov sales</p>'+kpis([['2025 SALES','$244k','Jun–Nov total',colors.teal],['VS. 2024','+20.8%','$202k baseline',colors.green],['PEAK MONTH','SEP','$72k in 2025',colors.yellow]])+'<div class="dash-grid"><div class="dash-chart"><h4>Monthly sales · $ thousands</h4>'+bars([20,25,32,60,40,25],[24,32,40,72,48,28],['JUN','JUL','AUG','SEP','OCT','NOV'])+legend('2024','2025')+'</div>'+table('Where the change happened',['Month','2025','Change'],[['Jul','$32k','+28%'],['Aug','$40k','+25%'],['Sep','$72k','+20%'],['Oct','$48k','+20%']])+'</div><p class="dash-foot">As of Aug 11, 2026 · Sep 1 is 21 days away · History is not a forecast.</p>'},
  {name:'Performance comparisons',kind:'GROUP PERFORMANCE',html:'<h3 class="dashboard-title">Sales by user group</h3><p class="dashboard-subtitle">Matching Jan–Mar periods · 2025 / 2026 · fictional cohorts</p>'+kpis([['2026 SALES','$135k','2025: $100k',colors.teal],['YEAR OVER YEAR','+35%','+$35k change',colors.green],['USER GROUPS','4','Same periods',colors.purple]])+'<div class="dash-grid"><div class="dash-chart"><h4>Monthly sales · $ thousands</h4>'+bars([28,32,40],[36,45,54],['JAN','FEB','MAR'])+legend('2025','2026')+'</div>'+table('Contribution by group',['Group','2026','YoY'],[['Top Performers','$60k','+33.3%'],['Advanced users','$45k','+28.6%'],['Intermediate users','$20k','+33.3%'],['New users','$10k','+100%']])+'</div><p class="dash-foot">2025 baselines in group order: $45k / $35k / $15k / $5k. Totals: $100k → $135k.</p>'},
  {name:'Cohort comparisons',kind:'USER GROUPS & COHORTS',html:'<h3 class="dashboard-title">User groups &amp; cohort comparisons</h3><p class="dashboard-subtitle">Illustrative September snapshot · user cohorts and contextual feedback</p>'+kpis([['USERS','1,200','Across four cohorts',colors.teal],['GLORIA','$24k','Advanced users',colors.yellow],['VS. HER GROUP','+20%','$20k group average',colors.green]])+'<div class="dash-grid"><div class="dash-chart"><h4>Average sales per user · $ thousands</h4><svg viewBox="0 0 240 112" role="img" aria-label="Average sales: Top Performers 40 thousand, Advanced users 20 thousand, Intermediate users 12 thousand, New users 4 thousand">'+[40,20,12,4].map((v,i)=>`<text x="0" y="${17+i*26}">${['Top','Advanced','Intermediate','New'][i]}</text><rect x="78" y="${5+i*26}" width="${v*3.2}" height="13" fill="${groups[i].color}"/><text x="${82+v*3.2}" y="${16+i*26}">${v}</text>`).join('')+'</svg></div>'+table('Cohort membership',['Group','Users','Avg. sales'],[['Top Performers','120','$40k'],['Advanced users','360','$20k'],['Intermediate users','480','$12k'],['New users','240','$4k']])+'</div><p class="dash-foot">Gloria: $24k / $20k = 120% of her group average. Comparisons do not establish causation.</p>'}
 ];
 let elapsed=11000,last=null,frame=null,paused=motion.matches,current=-1,width=innerWidth,height=innerHeight,dpr=1;
 const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));};
 const text=(s,x,y,size=9,c='#9bbb9b')=>{ctx.fillStyle=c;ctx.font=`${size}px Consolas,monospace`;ctx.fillText(s,x,y);};
 function machine(x,y,w,h){r(x+4,y+5,w,h,'#091922');r(x,y,w,h,'#2e4b55');r(x,y,w,4,'#729389');r(x+5,y+8,w-10,h-12,'#1c343e');for(const a of [x+4,x+w-8])r(a,y+3,3,3,'#bac6a7');}
 function sprite(x,y,action,t,flip=false,scale=1){
  ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
  const walking=action==='walk',bob=walking?Math.abs(Math.sin(t*7))*4:Math.sin(t*3)*1.4;
  r(-24,1,49,5,'#091920');ctx.translate(0,-bob);if(flip)ctx.scale(-1,1);
  const step=walking?Math.sin(t*7)*5:0;
  // Rounded pixel proportions, oversized head, hoodie and little sneakers.
  r(-14,-18,11,19,'#132e3b');r(4,-18,11,19,'#132e3b');r(-18+step,-4,16,7,'#d1dcc7');r(3-step,-4,16,7,'#d1dcc7');r(-18+step,2,16,2,'#70938e');r(3-step,2,16,2,'#70938e');
  r(-18,-48,36,30,'#387f79');r(-22,-43,44,22,'#387f79');r(-17,-48,34,4,'#66b398');r(-18,-24,36,6,'#28595d');r(-11,-53,23,10,'#a2c6a7');
  r(-21,-80,42,26,'#233944');r(-16,-86,32,7,'#233944');r(-25,-75,7,17,'#7eb5a2');r(19,-75,7,17,'#7eb5a2');r(-19,-78,38,21,'#ddbca0');r(-18,-81,36,7,'#28414a');r(-21,-76,12,6,'#28414a');r(12,-76,9,8,'#28414a');r(-10,-69,4,5,'#203942');r(8,-69,4,5,'#203942');r(-4,-59,9,2,'#8d675b');r(-17,-63,6,3,'#cf9684');r(13,-63,6,3,'#cf9684');
  // At the terminal, show the back of the head with an occasional friendly glance.
  if(action==='type'&&t%12>2){r(-19,-79,38,24,'#28414a');r(-12,-81,26,5,'#3b5860');r(-13,-57,26,3,'#52716e');}
  if(action==='type'){r(-29,-41,11,10,'#6fa99a');r(20,-41+Math.sin(t*9)*2,12,10,'#6fa99a');}
  else if(action==='hammer'){const up=Math.sin(t*8)>0;r(19,-44,10,14,'#59a08b');r(27,up?-62:-33,8,18,'#ddbca0');r(32,up?-73:-33,4,22,'#af8b63');r(25,up?-77:-38,20,9,'#dbe0ca');}
  else if(action==='switch'){r(19,-43,18,9,'#59a08b');r(34,-44,9,10,'#ddbca0');}
  else{r(-27,-42,9,21+step,'#59a08b');r(20,-42,9,21-step,'#59a08b');r(-26,-21+step,7,6,'#ddbca0');r(21,-21-step,7,6,'#ddbca0');}
  // Same readable name patch regardless of direction.
  if(flip)ctx.scale(-1,1);r(-13,-42,26,15,'#e8edd4');text('ME',-9,-31,12,'#244e4d');ctx.restore();
 }
 // The sliding packets themselves are the controls. Their detail panel stays fixed.
 let tokenRound=-1,tokenItems=[],hoverIndex=null,focusIndex=null,pinnedIndex=null,suppressedRound=-1,leaveTimer,packetElapsed=0,packetLast=11000;
 const tokenButtons=groups.map((g,i)=>{
  const el=document.createElement('button');el.type='button';el.className='output-token';el.style.setProperty('--cohort',g.color);el.setAttribute('aria-controls','nudge-card');el.setAttribute('aria-expanded','false');
  el.addEventListener('pointerenter',e=>{if(e.pointerType==='touch')return;clearTimeout(leaveTimer);hoverIndex=i;draw(elapsed);});
  el.addEventListener('pointerleave',()=>{leaveTimer=setTimeout(()=>{if(!nudge.matches(':hover')){hoverIndex=null;draw(elapsed);}},120);});
  el.addEventListener('focus',()=>{focusIndex=i;draw(elapsed);});
  el.addEventListener('blur',()=>{focusIndex=null;draw(elapsed);});
  el.addEventListener('click',()=>{if(pinnedIndex===i){pinnedIndex=focusIndex=hoverIndex=null;suppressedRound=Math.floor(elapsed/18000);}else{pinnedIndex=i;suppressedRound=-1;}draw(elapsed);});
  outputs.append(el);return el;
 });
 nudge.addEventListener('pointerenter',()=>clearTimeout(leaveTimer));nudge.addEventListener('pointerleave',()=>{hoverIndex=null;draw(elapsed);});
 function closeNudge(){const was=hoverIndex??focusIndex??pinnedIndex;hoverIndex=focusIndex=pinnedIndex=null;suppressedRound=Math.floor(elapsed/18000);if(was!==null&&nudge.contains(document.activeElement)){tokenButtons[was].focus({preventScroll:true});focusIndex=null;}draw(elapsed);}
 $('dismiss-nudge').addEventListener('click',closeNudge);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNudge();});
 function randomUnit(){return crypto.getRandomValues(new Uint32Array(1))[0]/4294967296;}
 function randomChars(chars,n){const bytes=crypto.getRandomValues(new Uint8Array(n));return Array.from(bytes,b=>chars[b%chars.length]).join('');}
 const rain=Array.from({length:144},(_,i)=>({x:randomUnit(),offset:randomUnit(),speed:24+randomUnit()*45,phase:randomUnit()*Math.PI*2,next:0,value:'',kind:i%5,route:i%4===0}));
 // Invented field names and values for the background illustration only.
 const rainFields=[
  ['transaction_date','2026-09-14'],['sales_amount',1350],['transaction_id','00482173'],
  ['user_name','Maya'],['cohort_name','Advanced users'],['training_completed',3],
  ['marketing_actions',8],['reporting_month','2026-09'],['prior_period_sales',100000],
  ['current_period_sales',135000],['sales_change_pct',35],['profile_updated',true],
  ['course_name','Planning basics'],['course_progress_pct',75],['active_days',18],
  ['last_activity_date','2026-09-21'],['group_average_sales',20000],['user_sales',24000],
  ['historical_peak_month','September'],['nudge_status','ready'],['feedback_type','cohort_comparison'],
  ['dashboard_view','sales_history'],['report_period','Jan-Mar'],['cohort_size',360],
  ['calendar_connected',true],['recommended_topic','Seasonal planning'],['sales_region','Florida'],
  ['data_refreshed_date','2026-09-22'],['completed_courses',5],['comparison_year',2025]
 ];
 function rainValue(p,i){
  if(p.kind===0||p.kind===3)return randomChars('0123456789',8);
  const [name,value]=rainFields[Math.floor(randomUnit()*rainFields.length)];
  return p.kind===1?name:JSON.stringify({[name]:value});
 }
 function place(el,x,y,w,h){el.style.left=Math.round(x)+'px';el.style.top=Math.round(y)+'px';el.style.width=Math.round(w)+'px';if(h)el.style.height=Math.round(h)+'px';}
 function draw(ms){
  const t=ms/1000,index=Math.floor(t/20)%3,phase=t%20,active=phase>=9.4&&phase<17.5;
  workshop.dataset.phase=phase<7?'sculpting':phase<9.4?'walking-to-switch':active?'examining':phase<18?'switching-off':'returning';workshop.dataset.cycle=String(index);
  if(index!==current){current=index;const e=examples[index];content.innerHTML=e.html;$('dashboard-kind').textContent=e.kind;$('stage-label').textContent=e.name;document.querySelector('.stage-number').textContent=`0${index+1} / 03`;}
  screen.dataset.active=String(active);$('cycle-progress').style.width=(phase*5)+'%';
  const nr=nudgeScene.getBoundingClientRect(),dr=dashboardScene.getBoundingClientRect(),mobile=width<=600,stacked=width<=900;
  const ns=Math.min(nr.width/(mobile?680:1200),1.2),world=nr.width/ns,belt=285;
  const round=Math.floor(t/18),np=t%18,autoSlot=round%4,checking=np>=6&&np<13;
  const held=hoverIndex??focusIndex??pinnedIndex;
  if(tokenRound!==round&&held===null){tokenRound=round;tokenItems=groups.map((g,i)=>({group:g.name,color:g.color,person:g.people[(round+i)%g.people.length][0],message:g.people[(round+i)%g.people.length][1]}));tokenItems.forEach((v,i)=>{tokenButtons[i].innerHTML=`<strong aria-hidden="true">${v.person.slice(0,2).toUpperCase()}</strong><span class="packet-lines" aria-hidden="true"></span>`;tokenButtons[i].setAttribute('aria-label',`Read ${v.person}'s generated nudge, ${v.group}`);});}
  const selected=held??(checking&&suppressedRound!==round?autoSlot:null);
  nudge.dataset.phase=selected!==null?'reviewing':np<6?'approaching':'returning';nudgeScene.dataset.checker=checking?'checking':np<6?'approaching':'returning';
  nudge.classList.toggle('is-hidden',selected===null);nudge.setAttribute('aria-hidden',String(selected===null));
  // Pause packet travel during inspection so pointer and touch targets do not run away.
  const packetDelta=Math.max(0,Math.min(ms-packetLast,100));packetLast=ms;
  if(held===null&&!checking)packetElapsed+=packetDelta;
  const tokenW=mobile?44:46,first=60*ns,last=nr.width-tokenW-8,travel=last-first;
  const positions=tokenButtons.map((el,i)=>{const x=first+((packetElapsed/1000*34*ns+i*travel/4)%travel);place(el,x,belt-48,tokenW,44);el.setAttribute('aria-expanded',String(selected===i));return x;});
  if(selected!==null){const v=tokenItems[selected];$('nudge-person').textContent=v.person;$('nudge-group').textContent=v.group;$('nudge-text').textContent=v.message;nudge.style.borderLeftColor=v.color;const cardW=Math.min(370,nr.width-12);place(nudge,(nr.width-cardW)/2,50,cardW,180);}
  // HTML panels live inside their scene anchors, so native scrolling cannot desynchronize them.
  const screenW=stacked?Math.min(580,dr.width-12):Math.min(560,dr.width*.47),screenH=mobile?540:390;
  const screenX=stacked?(dr.width-screenW)/2:dr.width-screenW-25;
  place(screen,screenX,6,screenW,screenH);
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
  for(let x=18;x<width;x+=44)for(let y=20;y<height;y+=44)r(x,y,1,1,'#24462f');
  const funnelOffset=mobile?140:0;const mouth=nr.top+belt-(76+funnelOffset)*ns,funnelX=nr.left+58*ns,visible=mouth>0&&mouth<height;
  for(let i=0;i<(mobile?72:144);i++){
   const p=rain[i];if(ms>=p.next||!p.value){p.value=rainValue(p,i);p.next=ms+180+randomUnit()*620;}
   // Only one quarter of the streams converge; the rest continue down the page.
   const limit=p.route&&visible?Math.max(90,mouth):height+70,y=((t*p.speed+p.offset*(limit+100))%(limit+100))-50;
   const convergence=p.route&&visible?Math.max(0,Math.min(1,(y-mouth+190)/190)):0;
   const x=p.x*width+(funnelX+((i%7)-3)*7*ns-p.x*width)*convergence;
   const fade=.16+.44*(.5+.5*Math.sin(t*.65+p.phase));
   ctx.globalAlpha=fade;text(p.value,x,y,p.kind===4?9:11,'#51df72');
   if(i%3===0){ctx.globalAlpha=fade*.28;text(p.value,x,y-17,10,'#23aa53');}
  }ctx.globalAlpha=1;
  if(nr.bottom>0&&nr.top<height){
   ctx.save();ctx.translate(nr.left,nr.top+belt);ctx.scale(ns,ns);
   ctx.save();ctx.translate(0,-funnelOffset);r(0,-76,120,7,'#91b99e');r(7,-69,106,13,'#416c68');r(20,-56,80,13,'#416c68');r(33,-43,54,13,'#608b7b');r(46,-30,28,24,'#78a18a');ctx.restore();if(funnelOffset)r(46,-funnelOffset-6,28,funnelOffset,'#557d67');
   machine(0,7,world,25);r(0,0,world,7,'#809b8d');for(let i=0;i<Math.floor(world/26);i++){r(9+i*26,16,14,8,'#102530');r(13+i*26+Math.floor(t*3)%3,17,3,5,'#7d988a');}
   [16,world*.48,world-20].forEach(x=>{r(x,32,8,90,'#3a5964');r(x-5,119,19,5,'#7b9b87');});
   // The moving HTML packet buttons are the visible conveyor outputs.
   const desk=185;machine(desk-50,67,111,14);r(desk-43,81,7,41,'#66887b');r(desk+46,81,7,41,'#66887b');machine(desk-33,20,72,42);r(desk-26,27,58,27,'#102a33');for(let i=0;i<4;i++)r(desk-21,32+i*5,19+(Math.floor(t)+i*7)%28,2,i%2?'#a5cf89':'#64aaa5');r(desk-5,62,10,6,'#789e8a');r(desk-32,68,65,4,'#b0c6a2');sprite(desk+4,124,'type',t,false,1);
   const destination=(positions[autoSlot]+tokenW/2)/ns,home=world-45;
   const checkerX=np<6?home+(destination-home)*np/6:np<13?destination:destination+(home-destination)*(np-13)/5;
   sprite(checkerX,124,checking?'idle':'walk',t,np<6,1);if(checking){r(checkerX-10,-1,22,13,'#accd87');text('OK',checkerX-6,9,9,'#1f4937');}
   r(0,132,world,3,'#42636c');ctx.restore();
  }
  if(dr.bottom>0&&dr.top<height){
   const ds=Math.min(dr.width/(stacked?600:1200),1.2),worldD=dr.width/ds;
   ctx.save();ctx.translate(dr.left,dr.top+(stacked?screenH+17:50));ctx.scale(ds,ds);
   const sculpt=stacked?190:worldD*.21,switchX=stacked?553:screenX/ds-38,base=stacked?166:290;
   machine(sculpt-15,base-57,109,14);r(sculpt-9,base-43,7,42,'#5c8177');r(sculpt+78,base-43,7,42,'#5c8177');
   const progress=Math.min(phase/7,1);for(let i=0;i<4;i++){const h=64-(64-[24,40,61,48][i])*progress;r(sculpt+i*22,base-57-h,18,h,'#c5d1c0');r(sculpt+i*22,base-57-h,18,4,'#f1efd8');r(sculpt+i*22+13,base-53-h,5,h-4,'#8ba499');}
   machine(switchX,base-85,25,30);r(switchX+8,base-80,10,19,'#122e35');r(switchX+6,active?base-80:base-69,13,7,active?'#c8e797':'#7d9c8d');
   const start=sculpt-42,end=switchX-37;let x=start,action='hammer';if(phase>=7&&phase<9){x=start+(end-start)*(phase-7)/2;action='walk';}else if(phase>=9&&phase<10){x=end;action='switch';}else if(phase>=10&&phase<17){x=end;action='idle';}else if(phase>=17&&phase<18){x=end;action='switch';}else if(phase>=18){x=end-(end-start)*(phase-18)/2;action='walk';}
   sprite(x,base,action,t,phase>=18);if(phase<7)for(let i=0;i<5;i++){const f=(t*2+i*.19)%1;r(sculpt-10+i*9+f*12,base-117+f*f*45,3,3,'#e9e5c9');}
   r(0,base+8,worldD,3,'#42636c');text('LUKE / USER GROUPS & PERFORMANCE DASHBOARDS',12,base+27,8,'#b5caa0');ctx.restore();
  }
 }
 function button(){toggle.setAttribute('aria-pressed',String(paused));toggle.setAttribute('aria-label',paused?'Resume animation':'Pause animation');toggle.innerHTML=paused?'▶ <span>Play</span>':'Ⅱ <span>Pause</span>';}
 function tick(now){frame=null;if(paused||document.hidden){last=null;return;}if(last!==null)elapsed+=Math.min(now-last,100);last=now;draw(elapsed);frame=requestAnimationFrame(tick);}
 function sync(){if(frame!==null){cancelAnimationFrame(frame);frame=null;}last=null;button();draw(elapsed);if(!paused&&!document.hidden)frame=requestAnimationFrame(tick);}
 function resize(){width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.imageSmoothingEnabled=false;draw(elapsed);}
 toggle.addEventListener('click',()=>{paused=!paused;sync();});motion.addEventListener('change',e=>{paused=e.matches;sync();});document.addEventListener('visibilitychange',sync);window.addEventListener('resize',resize);window.addEventListener('scroll',()=>{if(paused)draw(elapsed);},{passive:true});new ResizeObserver(resize).observe(document.body);
 resize();sync();
})();
