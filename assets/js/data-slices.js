/* ============================================================
   邪修英语 · 概念切片数据 data-slices.js
   理念：中文词是大粒度的（一个"装"字管一片语境），
        英语按"状态/语境"把这片拆成几个词，一个状态一个词。
        中英转换卡壳，多是拿大粒度中文词去找英语对等片。
   每组：c = 中文字锚点；items = 状态切片
     w    英语词（点行朗读）
     zh   状态标签（朗读，短）
     ctx  语境例句（展示，不朗读）
   与 ROOTS 同级独立，词根页"概念切片"模式渲染。
   v3：14 个大类（8 现场类 + 6 生活类），每类 5 片
   ============================================================ */
window.SLICES = {
  list: [
    /* ================= 现场 8 类 ================= */
    {
      c: '装',
      title: '装 · install 家族',
      note: '一个"装"字，英语按状态拆成几个词',
      items: [
        {w:'install', zh:'正在装（动作）', ctx:'Install the beam. 把梁装上。'},
        {w:'installation', zh:'安装（说过程/系统）', ctx:'Installation stage two. 安装第二步。'},
        {w:'installed', zh:'已装好（状态）', ctx:'Beam installed. 梁装好了。'},
        {w:'mount', zh:'装上（固定到面）', ctx:'Panel mounted. 板装上了。'},
        {w:'fit', zh:'配装（嵌得进去）', ctx:'Does it fit? 装得进去吗？'}
      ]
    },
    {
      c: '紧',
      title: '紧 · tighten 家族',
      note: '拧的动作、紧的状态、扭矩的说法',
      items: [
        {w:'tighten', zh:'拧紧（动作）', ctx:'Tighten the bolts. 拧紧螺栓。'},
        {w:'tight', zh:'紧的（状态）', ctx:'Make it tight. 拧到紧。'},
        {w:'torque', zh:'扭矩（数值）', ctx:'Check the torque. 查一下扭矩。'},
        {w:'secure', zh:'固定牢靠', ctx:'Make sure it is secure. 确认牢固。'},
        {w:'fasten', zh:'扣紧（盖板/绑带）', ctx:'Fasten the cover. 盖板扣紧。'}
      ]
    },
    {
      c: '正',
      title: '正 · 水平垂直家族',
      note: '现场找平找正，一个状态一个词',
      items: [
        {w:'level', zh:'水平的', ctx:'Not level. 不水平。'},
        {w:'plumb', zh:'垂直的', ctx:'Check if it is plumb. 看垂直不垂直。'},
        {w:'aligned', zh:'对齐的', ctx:'Get it aligned. 把它对齐。'},
        {w:'straight', zh:'笔直的', ctx:'Keep it straight. 保持笔直。'},
        {w:'square', zh:'成直角的', ctx:'Make it square. 摆成正角。'}
      ]
    },
    {
      c: '查',
      title: '查 · check 家族',
      note: '口语的查和正式的检验是不同词',
      items: [
        {w:'check', zh:'查一下（口语）', ctx:'Check the gap. 查一下缝。'},
        {w:'inspect', zh:'检验（正式）', ctx:'The inspector will inspect. 监理要来检验。'},
        {w:'measure', zh:'量（尺寸）', ctx:'Measure the height. 量一下高度。'},
        {w:'look at', zh:'看一眼', ctx:'Come look at this. 来看下这个。'},
        {w:'go over', zh:'过一遍', ctx:'Go over the list. 把清单过一遍。'}
      ]
    },
    {
      c: '问题',
      title: '问题 · 出错怎么说',
      note: '从"不对"到"开裂"，程度不同说法不同',
      items: [
        {w:'wrong', zh:'不对/装错了', ctx:'Something is wrong. 有地方不对。'},
        {w:'issue', zh:'有问题', ctx:'Any issues? 有问题吗？'},
        {w:'defect', zh:'缺陷（要上报）', ctx:'Report the defect. 上报这个缺陷。'},
        {w:'damage', zh:'损坏', ctx:'Check for damage. 查一下有没有损坏。'},
        {w:'cracked', zh:'开裂了', ctx:'It is cracked. 裂了。'}
      ]
    },
    {
      c: '固定',
      title: '固定 · fix 家族',
      note: '注意 fix 既固定也修理，听语境',
      items: [
        {w:'fix', zh:'固定（也是修理）', ctx:'Fix it in place. 固定到位。'},
        {w:'anchor', zh:'锚固（打地脚）', ctx:'Anchor the column. 立柱锚固。'},
        {w:'clamp', zh:'夹住', ctx:'Clamp it down. 夹紧。'},
        {w:'lock', zh:'锁死', ctx:'Lock the wheel. 轮子锁死。'},
        {w:'support', zh:'支撑', ctx:'Add a support. 加个支撑。'}
      ]
    },
    {
      c: '拆',
      title: '拆 · 反向操作',
      note: '拆的顺序词：先松、再拆',
      items: [
        {w:'loosen', zh:'松开（拆的前奏）', ctx:'Loosen the nut first. 先松螺母。'},
        {w:'remove', zh:'拆走', ctx:'Remove the cover. 拆掉盖板。'},
        {w:'dismantle', zh:'拆解（大件）', ctx:'Dismantle the rack. 拆货架。'},
        {w:'disassemble', zh:'拆开（成部件）', ctx:'Disassemble the unit. 把它拆开。'},
        {w:'uninstall', zh:'卸下（设备）', ctx:'Uninstall the motor. 卸电机。'}
      ]
    },
    {
      c: '调',
      title: '调 · adjust 家族',
      note: '调整、校准、归零，各是各的词',
      items: [
        {w:'adjust', zh:'调整', ctx:'Adjust the foot. 调一下底脚。'},
        {w:'align', zh:'对准', ctx:'Align the beam. 对准梁。'},
        {w:'calibrate', zh:'校准（仪器）', ctx:'Calibrate the sensor. 校准传感器。'},
        {w:'set', zh:'设定/归零', ctx:'Set to zero. 归零。'},
        {w:'tune', zh:'调校（设备）', ctx:'Tune the shuttle. 调穿梭车。'}
      ]
    },

    /* ================= 生活 6 类 ================= */
    {
      c: '松',
      title: '松 · loose 家族',
      note: '"紧"的反面：松了、松脱、晃动',
      items: [
        {w:'loose', zh:'松了（状态）', ctx:'The screw is loose. 螺丝松了。'},
        {w:'come loose', zh:'松脱了', ctx:'It came loose. 它松脱了。'},
        {w:'slack', zh:'松弛（皮带/绳）', ctx:'The belt is slack. 皮带松了。'},
        {w:'wiggle', zh:'晃动（能摇得动）', ctx:'It wiggles. 它能晃动。'},
        {w:'fall off', zh:'脱落/掉了', ctx:'It fell off. 它掉了。'}
      ]
    },
    {
      c: '开关',
      title: '开关 · switch 家族',
      note: '电的开关、门的开关，是不同的词',
      items: [
        {w:'turn on', zh:'打开（电/设备）', ctx:'Turn on the light. 开灯。'},
        {w:'turn off', zh:'关掉', ctx:'Turn off the machine. 关掉机器。'},
        {w:'open', zh:'打开（门/盖/箱）', ctx:'Open the box. 打开箱子。'},
        {w:'close', zh:'关上（门/盖）', ctx:'Close the door. 关上门。'},
        {w:'plug in', zh:'插上电', ctx:'Plug it in. 插上电。'}
      ]
    },
    {
      c: '拿',
      title: '拿 · take 家族',
      note: '拿的方向不同，词就不同',
      items: [
        {w:'take', zh:'拿走', ctx:'Take this one. 拿这个。'},
        {w:'bring', zh:'带来', ctx:'Bring it here. 拿过来。'},
        {w:'pick up', zh:'捡起/接', ctx:'Pick it up. 捡起来。'},
        {w:'hold', zh:'拿住/扶住', ctx:'Hold this. 扶住这个。'},
        {w:'carry', zh:'搬运', ctx:'Carry it over. 搬过去。'}
      ]
    },
    {
      c: '放',
      title: '放 · put 家族',
      note: '怎么放、放哪，一个状态一个词',
      items: [
        {w:'put', zh:'放', ctx:'Put it here. 放这儿。'},
        {w:'place', zh:'摆放到位', ctx:'Place it on the rack. 摆到架上。'},
        {w:'set down', zh:'放下', ctx:'Set it down. 放下来。'},
        {w:'stack', zh:'码放（叠起来）', ctx:'Stack them up. 码起来。'},
        {w:'lay', zh:'平放（横着放）', ctx:'Lay it flat. 平着放。'}
      ]
    },
    {
      c: '快慢',
      title: '快慢 · speed 家族',
      note: '说东西快慢、说人赶紧，是不同词',
      items: [
        {w:'fast', zh:'快的', ctx:'Too fast. 太快了。'},
        {w:'slow', zh:'慢的', ctx:'Go slow. 慢点。'},
        {w:'speed up', zh:'加速', ctx:'Speed it up. 加速。'},
        {w:'slow down', zh:'减速', ctx:'Slow down. 慢下来。'},
        {w:'hurry', zh:'赶紧（人）', ctx:'Hurry up. 赶紧的。'}
      ]
    },
    {
      c: '够',
      title: '够 · enough 家族',
      note: '够不够、多不多，一个量一个词',
      items: [
        {w:'enough', zh:'够了', ctx:'Enough. 够了。'},
        {w:'too much', zh:'太多了', ctx:'Too much. 太多了。'},
        {w:'more', zh:'多一点', ctx:'A little more. 再来一点。'},
        {w:'less', zh:'少一点', ctx:'A little less. 少一点。'},
        {w:'full', zh:'满了', ctx:'It is full. 满了。'}
      ]
    }
  ]
};
