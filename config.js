/* 所有金额、奖励与序列均为演示数值。口径见策划文档待确认项。 */
const CONFIG={
 version:2,baseCost:1,initialCoins:30,orderCoins:10,durationSeconds:601200,multipliers:[1,3,5,10],
 qualities:[{name:'普通',color:'#72bfa0',points:1},{name:'罕见',color:'#74b7ef',points:5},{name:'稀有',color:'#b49ade',points:10},{name:'史诗',color:'#ed8885',points:20},{name:'传说',color:'#efc45d',points:50}],
 toys:Array.from({length:25},(_,i)=>({id:i,quality:Math.floor(i/5),name:['森野','晴空','月光','落日','星愿'][Math.floor(i/5)]+['小熊','兔兔','猫咪','小犬','精灵'][i%5]})),
 rewards:{r1:{name:'金币 × 1,500',icon:'◈',items:{gold:1500}},r2:{name:'体力 × 30',icon:'ϟ',items:{energy:30}},r3:{name:'金币 × 3,000',icon:'◈',items:{gold:3000}},r4:{name:'体力 × 60',icon:'ϟ',items:{energy:60}},r5:{name:'宝石 × 30',icon:'◆',items:{gems:30}},r6:{name:'宝石 × 100',icon:'🎁',items:{gems:100}},group:{name:'金币 × 500 · 体力 × 20',icon:'🎁',items:{gold:500,energy:20}},all:{name:'宝石 × 100 · 体力 × 100',icon:'🏆',items:{gems:100,energy:100}}},
 milestones:[{id:'p1',threshold:10,rewardId:'r1'},{id:'p2',threshold:30,rewardId:'r2'},{id:'p3',threshold:60,rewardId:'r3'},{id:'p4',threshold:100,rewardId:'r4'},{id:'p5',threshold:160,rewardId:'r5'},{id:'p6',threshold:240,rewardId:'r6'}],
 shop:[{id:'s1',name:'金币袋',icon:'◈',cost:10,limit:2,items:{gold:1500}},{id:'s2',name:'体力瓶',icon:'ϟ',cost:15,limit:2,items:{energy:50}},{id:'s3',name:'宝石盒',icon:'◆',cost:20,limit:2,items:{gems:30}},{id:'s4',name:'金币宝箱',icon:'▣',cost:30,limit:2,items:{gold:5000}},{id:'s5',name:'体力礼包',icon:'ϟ',cost:35,limit:2,items:{energy:150}},{id:'s6',name:'星愿宝箱',icon:'🎁',cost:50,limit:1,items:{gems:100}}],
 sequence:[]
};
// 固定序列：最终展开为 100 个具体玩具 ID；抽取时不进行随机运算。
{const remaining=[40,25,18,12,5],seen=[0,0,0,0,0];const opening=[0,1,0,2,0,1,3,1,0,4];for(const q of opening){CONFIG.sequence.push(q*5+(seen[q]++%5));remaining[q]--;}for(let pos=10;pos<100;pos++){let q;if([29,49,74,99].includes(pos))q=4;else q=[0,1,2,3].filter(q=>remaining[q]>0).sort((a,b)=>remaining[b]-remaining[a])[0];CONFIG.sequence.push(q*5+(seen[q]++%5));remaining[q]--;}}
CONFIG.sequence=CONFIG.sequence.map(toyId=>({quality:Math.floor(toyId/5),toyId}));
if(typeof module!=='undefined')module.exports=CONFIG;

