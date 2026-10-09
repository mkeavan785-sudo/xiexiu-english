/* ============================================================
   邪修英语 · 锚点名词数据 data-anchors.js
   设计理念（名词锚点思维）：现场沟通 = 指认锚点名词 + 说状态。
   每条 = 1 个高频现场名词（锚点，优先选磨耳朵/词库已有词）
        + 它周围最高频的配套词组（动作/状态/问题），成组记忆。
   phr.w 中的锚点词在前端自动异色显示（沿用高亮规则）。
   a.zh  仅展示；a 本身、phr.w、phr.zh 均朗读。
   ============================================================ */
window.ANCHORS = {
  list: [
    {
      a: 'beam', zh: '横梁',
      phr: [
        {w:'hoist the beam', zh:'吊装横梁'},
        {w:'beam alignment', zh:'横梁对位'},
        {w:'beam not level', zh:'横梁不水平'},
        {w:'set the beam', zh:'横梁就位'},
        {w:'bolt the beam', zh:'紧固横梁'},
        {w:'beam load capacity', zh:'横梁载重'}
      ]
    },
    {
      a: 'gap', zh: '间隙',
      phr: [
        {w:'check the gap', zh:'检查间隙'},
        {w:'gap too wide', zh:'间隙太大'},
        {w:'close the gap', zh:'收小间隙'},
        {w:'gap tolerance', zh:'间隙公差'},
        {w:'zero gap', zh:'零间隙'}
      ]
    },
    {
      a: 'bolt', zh: '螺栓',
      phr: [
        {w:'tighten the bolt', zh:'拧紧螺栓'},
        {w:'bolt loose', zh:'螺栓松动'},
        {w:'bolt missing', zh:'螺栓缺失'},
        {w:'torque the bolt', zh:'给螺栓施加扭矩'},
        {w:'anchor bolt', zh:'地脚螺栓'}
      ]
    },
    {
      a: 'column', zh: '立柱',
      phr: [
        {w:'column erection', zh:'立柱安装'},
        {w:'column plumb', zh:'立柱垂直'},
        {w:'column base', zh:'立柱底脚'},
        {w:'brace the column', zh:'支撑立柱'},
        {w:'column alignment', zh:'立柱对位'}
      ]
    },
    {
      a: 'pallet', zh: '托盘',
      phr: [
        {w:'pallet position', zh:'托盘货位'},
        {w:'pallet in place', zh:'托盘就位'},
        {w:'empty pallet', zh:'空托盘'},
        {w:'pallet size', zh:'托盘尺寸'},
        {w:'stack the pallet', zh:'码托盘'}
      ]
    },
    {
      a: 'crane', zh: '堆垛机',
      phr: [
        {w:'crane rail', zh:'堆垛机导轨'},
        {w:'crane travel', zh:'堆垛机行走'},
        {w:'test the crane', zh:'测试堆垛机'},
        {w:'crane speed', zh:'堆垛机速度'},
        {w:'crane limit switch', zh:'堆垛机限位'}
      ]
    },
    {
      a: 'forklift', zh: '叉车',
      phr: [
        {w:'forklift passage', zh:'叉车通道'},
        {w:'drive the forklift', zh:'开叉车'},
        {w:'forklift forks', zh:'叉车货叉'},
        {w:'forklift access', zh:'叉车进入'},
        {w:'forklift turning radius', zh:'叉车转弯半径'}
      ]
    },
    {
      a: 'torque', zh: '扭矩',
      phr: [
        {w:'torque value', zh:'扭矩值'},
        {w:'torque wrench', zh:'扭矩扳手'},
        {w:'check the torque', zh:'检查扭矩'},
        {w:'final torque', zh:'终拧扭矩'},
        {w:'torque mark', zh:'扭矩划线'}
      ]
    },
    {
      a: 'rail', zh: '导轨',
      phr: [
        {w:'rail alignment', zh:'导轨对位'},
        {w:'ground rail', zh:'地导轨'},
        {w:'rail joint', zh:'导轨接缝'},
        {w:'lubricate the rail', zh:'润滑导轨'},
        {w:'rail level', zh:'导轨水平'}
      ]
    },
    {
      a: 'level', zh: '水平',
      phr: [
        {w:'check the level', zh:'检查水平'},
        {w:'not level', zh:'不水平'},
        {w:'level adjustment', zh:'调平'},
        {w:'spirit level', zh:'水平仪'},
        {w:'level from left to right', zh:'从左到右找平'}
      ]
    }
  ]
};
