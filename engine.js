/* 浏览器演示结算，不连接真实订单或真实资产。 */
const Engine={
 fresh:(c=CONFIG)=>({coins:c.initialCoins,score:0,cursor:0,owned:[],milestones:[],groups:[],allClaimed:false,shop:{},inventory:{gold:0,energy:0,gems:0},orders:0}),
 draw(s,n,c=CONFIG){
  if(!c.multipliers.includes(n))throw Error('无效倍率');
  if(s.coins<n*c.baseCost)throw Error('扭蛋币不足，完成主线订单可获得');
  if(s.cursor+n>c.sequence.length)throw Error('本段演示序列已不足当前抽数，请降低档位或重置体验');
  const result=[],owned=new Set(s.owned);let points=0;
  for(let j=0;j<n;j++){const entry=c.sequence[s.cursor+j],id=entry.toyId,toy=c.toys.find(t=>t.id===id);if(!toy)throw Error('序列中的玩具配置无效');if(entry.quality!==toy.quality)throw Error('序列品质与玩具所属品质不一致');const duplicate=owned.has(id),p=duplicate?c.qualities[toy.quality].points:0;result.push({id,duplicate,points:p});points+=p;owned.add(id);}
  s.coins-=n*c.baseCost;s.cursor+=n;s.owned=[...owned];s.score+=points;return {result,points,newCount:result.filter(x=>!x.duplicate).length};
 },
 addItems(s,items){for(const [key,value]of Object.entries(items))s.inventory[key]=(s.inventory[key]||0)+value;},
 groupComplete(s,q,c=CONFIG){return c.toys.filter(t=>t.quality===q).every(t=>s.owned.includes(t.id));},
 allComplete:(s,c=CONFIG)=>c.toys.every(t=>s.owned.includes(t.id)),
 claimMilestone(s,id,c=CONFIG){const m=c.milestones.find(x=>x.id===id);if(!m||s.score<m.threshold)throw Error('积分尚未达成');if(s.milestones.includes(id))throw Error('奖励已领取');this.addItems(s,c.rewards[m.rewardId].items);s.milestones.push(id);return c.rewards[m.rewardId];},
 claimGroup(s,q,c=CONFIG){if(!this.groupComplete(s,q,c))throw Error('集齐该品质的 5 款玩具即可领取');if(s.groups.includes(q))throw Error('奖励已领取');this.addItems(s,c.rewards.group.items);s.groups.push(q);return c.rewards.group;},
 claimAll(s,c=CONFIG){if(!this.allComplete(s,c))throw Error('集齐全部 25 款玩具即可领取');if(s.allClaimed)throw Error('奖励已领取');this.addItems(s,c.rewards.all.items);s.allClaimed=true;return c.rewards.all;},
 redeem(s,id,c=CONFIG){if(!this.allComplete(s,c))throw Error('需全收集后才可解锁兑换功能');const p=c.shop.find(x=>x.id===id);if(!p)throw Error('商品配置不存在');if((s.shop[id]||0)>=p.limit)throw Error('本期兑换次数已用完');if(s.coins<p.cost)throw Error('扭蛋币不足，完成主线订单可获得');s.coins-=p.cost;s.shop[id]=(s.shop[id]||0)+1;this.addItems(s,p.items);return p;},
 odds(c=CONFIG){const counts=c.qualities.map(()=>0);for(const entry of c.sequence){const toy=c.toys.find(t=>t.id===entry.toyId);if(!toy||entry.quality!==toy.quality)throw Error('序列配置无效');counts[entry.quality]++;}return counts.map(n=>n/c.sequence.length*100);},
 validateMilestones(list,c=CONFIG){if(!Array.isArray(list)||!list.length||list.length>30)throw Error('奖励节点需要 1～30 个');const ids=new Set;let prev=-1;for(const m of list){if(typeof m.id!=='string'||!m.id||ids.has(m.id)||!Number.isInteger(m.threshold)||m.threshold<=prev||!c.rewards[m.rewardId])throw Error('节点 ID 须唯一，门槛须为递增非负整数，奖励引用须有效');ids.add(m.id);prev=m.threshold;}return true;}
};
if(typeof module!=='undefined')module.exports=Engine;
