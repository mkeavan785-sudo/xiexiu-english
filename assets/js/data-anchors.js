/* ============================================================
   邪修英语 · 锚点名词数据 data-anchors.js
   设计理念（名词锚点思维）：沟通 = 指认锚点名词 + 说状态。
   锚点选词原则：民间日常高频名词（time/water/money/food…），
   每条 = 1 个高频名词（锚点）+ 它周围最高频的配套词组
   （动作/状态/问题），成组记忆。
   phr.w 中的锚点词在前端自动异色显示（沿用高亮规则）。
   a.zh  仅展示；a 本身、phr.w、phr.zh 均朗读。
   ============================================================ */
window.ANCHORS = {
  list: [
    {
      a: 'time', zh: '时间',
      phr: [
        {w:'what time', zh:'几点了'},
        {w:'on time', zh:'准时'},
        {w:'take your time', zh:'慢慢来'},
        {w:'no time', zh:'没时间'},
        {w:'save time', zh:'省时间'},
        {w:'have a good time', zh:'玩得开心'}
      ]
    },
    {
      a: 'water', zh: '水',
      phr: [
        {w:'drink water', zh:'喝水'},
        {w:'hot water', zh:'热水'},
        {w:'cold water', zh:'凉水'},
        {w:'fill the water', zh:'接点水'},
        {w:'water is boiling', zh:'水开了'}
      ]
    },
    {
      a: 'money', zh: '钱',
      phr: [
        {w:'save money', zh:'省钱'},
        {w:'spend money', zh:'花钱'},
        {w:'pay the money', zh:'付钱'},
        {w:'no money', zh:'没钱'},
        {w:'short of money', zh:'钱不够'}
      ]
    },
    {
      a: 'food', zh: '饭 / 食物',
      phr: [
        {w:'order food', zh:'点餐'},
        {w:'fast food', zh:'快餐'},
        {w:'food is ready', zh:'饭好了'},
        {w:'junk food', zh:'垃圾食品'},
        {w:'takeout food', zh:'外卖'}
      ]
    },
    {
      a: 'home', zh: '家',
      phr: [
        {w:'go home', zh:'回家'},
        {w:'at home', zh:'在家'},
        {w:'stay home', zh:'待在家'},
        {w:'feel at home', zh:'像在自己家'},
        {w:'home alone', zh:'独自在家'}
      ]
    },
    {
      a: 'door', zh: '门',
      phr: [
        {w:'open the door', zh:'开门'},
        {w:'close the door', zh:'关门'},
        {w:'knock on the door', zh:'敲门'},
        {w:'front door', zh:'前门'},
        {w:'door is locked', zh:'门锁着'}
      ]
    },
    {
      a: 'car', zh: '车',
      phr: [
        {w:'drive the car', zh:'开车'},
        {w:'park the car', zh:'停车'},
        {w:'wash the car', zh:'洗车'},
        {w:'rent a car', zh:'租车'},
        {w:'car broke down', zh:'车抛锚了'}
      ]
    },
    {
      a: 'phone', zh: '手机',
      phr: [
        {w:'check the phone', zh:'看手机'},
        {w:'charge the phone', zh:'给手机充电'},
        {w:'phone is dead', zh:'手机没电了'},
        {w:'answer the phone', zh:'接电话'},
        {w:'call my phone', zh:'打我手机'}
      ]
    },
    {
      a: 'work', zh: '工作 / 活',
      phr: [
        {w:'go to work', zh:'上班'},
        {w:'at work', zh:'在上班'},
        {w:'a lot of work', zh:'活很多'},
        {w:'finish work', zh:'干完活了'},
        {w:'work overtime', zh:'加班'}
      ]
    },
    {
      a: 'day', zh: '天 / 日子',
      phr: [
        {w:'every day', zh:'每天'},
        {w:'all day', zh:'一整天'},
        {w:'day off', zh:'休息日'},
        {w:'the other day', zh:'前几天'},
        {w:'have a nice day', zh:'祝你今天愉快'}
      ]
    }
  ]
};
