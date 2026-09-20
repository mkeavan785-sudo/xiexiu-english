/* ============================================================
   邪修英语 · 磨耳朵场景词库（独立，不从其他模块喂入）
   选词条原则：
   1) 高频实用、外国人天天说；避开 cat/bed 这类低级词与生僻词
   2) 允许小词组（get up / watch out / line up）
   3) 按逻辑场景编排，顺序教学：起床 → 通勤 → 工地 → 收工 → 海外
   条目：{ w: 英文, zh: 中文 }
   ============================================================ */
window.IMMERSION = {
  scenes: [
    {
      name: '起床洗漱',
      items: [
        {w:'wake up', zh:'醒来；叫醒'},
        {w:'alarm goes off', zh:'闹钟响了'},
        {w:'get up', zh:'起床'},
        {w:'turn off', zh:'关掉（闹钟）'},
        {w:'stretch', zh:'伸懒腰'},
        {w:'make the bed', zh:'铺床'},
        {w:'wash up', zh:'洗漱'},
        {w:'wash your face', zh:'洗脸'},
        {w:'brush your teeth', zh:'刷牙'},
        {w:'shave', zh:'刮胡子'},
        {w:'comb your hair', zh:'梳头'},
        {w:'take a shower', zh:'冲个澡'},
        {w:'get dressed', zh:'穿衣服'},
        {w:'put on', zh:'穿上；戴上'},
        {w:'zip up', zh:'拉上拉链'},
        {w:'tie your shoes', zh:'系鞋带'}
      ]
    },
    {
      name: '早餐',
      items: [
        {w:'boil water', zh:'烧水'},
        {w:'make coffee', zh:'煮咖啡'},
        {w:'fry an egg', zh:'煎蛋'},
        {w:'toast bread', zh:'烤面包'},
        {w:'pour milk', zh:'倒牛奶'},
        {w:'cut fruit', zh:'切水果'},
        {w:'have breakfast', zh:'吃早餐'},
        {w:'set the table', zh:'摆碗筷'},
        {w:'eat up', zh:'吃完'},
        {w:'wash the dishes', zh:'洗碗'},
        {w:'wipe the table', zh:'擦桌子'},
        {w:'grab and go', zh:'拿上就走'},
        {w:'heat up', zh:'加热'}
      ]
    },
    {
      name: '出门通勤',
      items: [
        {w:'take your keys', zh:'拿钥匙'},
        {w:'lock the door', zh:'锁门'},
        {w:'take the elevator', zh:'坐电梯'},
        {w:'get in the car', zh:'上车（轿车）'},
        {w:'fasten your seatbelt', zh:'系安全带'},
        {w:'start the engine', zh:'发动汽车'},
        {w:'pull out', zh:'驶出；开出来'},
        {w:'drive to work', zh:'开车上班'},
        {w:'hit traffic', zh:'遇上堵车'},
        {w:'slow down', zh:'减速'},
        {w:'speed up', zh:'加速'},
        {w:'pull over', zh:'靠边停车'},
        {w:'refuel', zh:'加油'},
        {w:'fill it up', zh:'加满油'},
        {w:'park the car', zh:'停车'},
        {w:'back up', zh:'倒车'},
        {w:'get off', zh:'下车'},
        {w:'punch in', zh:'打卡上班'}
      ]
    },
    {
      name: '到岗与晨会',
      items: [
        {w:'put on your helmet', zh:'戴上安全帽'},
        {w:'wear the vest', zh:'穿上反光背心'},
        {w:'gather the tools', zh:'集合工具'},
        {w:'attend a meeting', zh:'参加晨会'},
        {w:'assign tasks', zh:'分配任务'},
        {w:'go over the plan', zh:'过一遍方案'},
        {w:'split up', zh:'分头行动'},
        {w:'head to the site', zh:'前往现场'},
        {w:'check the schedule', zh:'查看进度'},
        {w:'clock in', zh:'签到'},
        {w:'get started', zh:'开工'},
        {w:'stand by', zh:'待命；准备好'}
      ]
    },
    {
      name: '工地指挥口令',
      items: [
        {w:'watch out', zh:'小心；躲开'},
        {w:'get back', zh:'退后'},
        {w:'step back', zh:'往后退'},
        {w:'move away', zh:'躲开；挪开'},
        {w:'keep clear', zh:'保持远离'},
        {w:'hold it', zh:'停住；别动'},
        {w:'hold on', zh:'等一下'},
        {w:'wait a second', zh:'稍等'},
        {w:'go ahead', zh:'继续；可以了'},
        {w:'lift it up', zh:'抬起来'},
        {w:'lower it down', zh:'往下放'},
        {w:'move left', zh:'往左移'},
        {w:'move right', zh:'往右移'},
        {w:'push', zh:'推'},
        {w:'pull', zh:'拉'},
        {w:'hold steady', zh:'扶稳'},
        {w:'set it down', zh:'放下'},
        {w:'easy does it', zh:'慢点；轻点'},
        {w:'one more meter', zh:'再来一米'},
        {w:'line it up', zh:'对齐'},
        {w:'take it away', zh:'吊走；拿走'}
      ]
    },
    {
      name: '手动工具与操作',
      items: [
        {w:'tighten', zh:'拧紧'},
        {w:'loosen', zh:'拧松'},
        {w:'twist', zh:'拧；转动'},
        {w:'screw it in', zh:'拧进去'},
        {w:'unscrew', zh:'拧开；拧下来'},
        {w:'bolt it', zh:'用螺栓固定'},
        {w:'hammer', zh:'锤；敲打'},
        {w:'cut', zh:'切割'},
        {w:'saw', zh:'锯'},
        {w:'drill a hole', zh:'钻孔'},
        {w:'use the wrench', zh:'用扳手拧'},
        {w:'measure', zh:'测量'},
        {w:'mark it', zh:'做标记'},
        {w:'level it', zh:'找水平'},
        {w:'clamp it', zh:'夹住固定'},
        {w:'plug in', zh:'插上电源'},
        {w:'unplug', zh:'拔掉电源'},
        {w:'turn on', zh:'打开（设备）'},
        {w:'turn off', zh:'关闭（设备）'},
        {w:'switch over', zh:'切换'}
      ]
    },
    {
      name: '安装作业',
      items: [
        {w:'unpack', zh:'拆箱'},
        {w:'take it out', zh:'取出来'},
        {w:'inspect', zh:'检查'},
        {w:'sort the parts', zh:'分拣零件'},
        {w:'assemble', zh:'组装'},
        {w:'put it together', zh:'拼起来'},
        {w:'mount', zh:'安装固定'},
        {w:'hang it up', zh:'挂上去'},
        {w:'connect', zh:'连接'},
        {w:'join together', zh:'对接起来'},
        {w:'secure it', zh:'固定牢固'},
        {w:'fix it in place', zh:'固定到位'},
        {w:'adjust', zh:'调整'},
        {w:'calibrate', zh:'校准'},
        {w:'test run', zh:'试运行'},
        {w:'tighten up', zh:'全部紧固'},
        {w:'finish up', zh:'收尾'},
        {w:'hand over', zh:'交接'}
      ]
    },
    {
      name: '午餐与休息',
      items: [
        {w:'take a break', zh:'休息一下'},
        {w:'wash your hands', zh:'洗手'},
        {w:'have lunch', zh:'吃午饭'},
        {w:'order food', zh:'点餐'},
        {w:'takeout', zh:'外卖'},
        {w:'eat out', zh:'出去吃'},
        {w:'grab a bite', zh:'随便吃点'},
        {w:'drink water', zh:'喝水'},
        {w:'fill it up', zh:'（杯子）接满'},
        {w:'take a nap', zh:'午睡'},
        {w:'have a chat', zh:'聊会儿天'},
        {w:'check the phone', zh:'看手机'},
        {w:'get back to work', zh:'回去干活'}
      ]
    },
    {
      name: '问题处理',
      items: [
        {w:'find a problem', zh:'发现问题'},
        {w:'what’s wrong', zh:'出什么问题了'},
        {w:'figure it out', zh:'弄清楚；想办法'},
        {w:'check it again', zh:'再检查一遍'},
        {w:'take it apart', zh:'拆开'},
        {w:'redo it', zh:'重做'},
        {w:'fix it', zh:'修好'},
        {w:'replace it', zh:'更换'},
        {w:'wait for parts', zh:'等配件'},
        {w:'call the supplier', zh:'联系供应商'},
        {w:'report it', zh:'汇报'},
        {w:'confirm', zh:'确认'},
        {w:'make sure', zh:'确保'},
        {w:'sort it out', zh:'解决掉'},
        {w:'clean up', zh:'清理干净'}
      ]
    },
    {
      name: '安全提醒',
      items: [
        {w:'be careful', zh:'当心'},
        {w:'stand back', zh:'靠后站'},
        {w:'no entry', zh:'禁止入内'},
        {w:'lock out the power', zh:'断电上锁'},
        {w:'wear gloves', zh:'戴手套'},
        {w:'hold the rail', zh:'扶好栏杆'},
        {w:'climb down', zh:'爬下来'},
        {w:'watch your step', zh:'注意脚下'},
        {w:'watch your head', zh:'小心碰头'},
        {w:'watch your hands', zh:'小心夹手'},
        {w:'keep away', zh:'远离'},
        {w:'stay alert', zh:'保持警惕'},
        {w:'safety first', zh:'安全第一'}
      ]
    },
    {
      name: '下班收工',
      items: [
        {w:'pack up', zh:'收拾工具'},
        {w:'put away', zh:'归位放好'},
        {w:'lock it up', zh:'锁好'},
        {w:'turn off the power', zh:'断电'},
        {w:'clean the area', zh:'清扫区域'},
        {w:'take off the vest', zh:'脱掉背心'},
        {w:'clock out', zh:'签退下班'},
        {w:'call it a day', zh:'今天就到这儿'},
        {w:'drive home', zh:'开车回家'},
        {w:'stop by', zh:'顺路去（某地）'},
        {w:'pick up', zh:'接人；取东西'},
        {w:'get home', zh:'到家'}
      ]
    },
    {
      name: '晚间生活',
      items: [
        {w:'open the door', zh:'开门'},
        {w:'change clothes', zh:'换衣服'},
        {w:'take a shower', zh:'冲澡'},
        {w:'cook dinner', zh:'做晚饭'},
        {w:'have dinner', zh:'吃晚饭'},
        {w:'do the laundry', zh:'洗衣服'},
        {w:'hang the clothes', zh:'晾衣服'},
        {w:'lie down', zh:'躺下'},
        {w:'check messages', zh:'看消息'},
        {w:'watch videos', zh:'看视频'},
        {w:'relax', zh:'放松'},
        {w:'go to bed', zh:'上床睡觉'},
        {w:'turn off the light', zh:'关灯'},
        {w:'fall asleep', zh:'睡着'}
      ]
    },
    {
      name: '海外出差·机场',
      items: [
        {w:'book a ticket', zh:'订票'},
        {w:'check in', zh:'值机办理'},
        {w:'show your passport', zh:'出示护照'},
        {w:'check the luggage', zh:'托运行李'},
        {w:'go through security', zh:'过安检'},
        {w:'board the plane', zh:'登机'},
        {w:'take off', zh:'起飞'},
        {w:'land', zh:'降落'},
        {w:'go through customs', zh:'过海关'},
        {w:'claim your luggage', zh:'提取行李'},
        {w:'take a taxi', zh:'打车'},
        {w:'check into the hotel', zh:'入住酒店'},
        {w:'fill out the form', zh:'填表'},
        {w:'ask the way', zh:'问路'},
        {w:'check out', zh:'退房'}
      ]
    },
    {
      name: '海外日常·餐厅商店',
      items: [
        {w:'look at the menu', zh:'看菜单'},
        {w:'order', zh:'点餐'},
        {w:'what do you recommend', zh:'你推荐什么'},
        {w:'more water please', zh:'请再加点水'},
        {w:'check please', zh:'买单'},
        {w:'pay by card', zh:'刷卡支付'},
        {w:'pay in cash', zh:'付现金'},
        {w:'try it on', zh:'试穿'},
        {w:'how much is it', zh:'多少钱'},
        {w:'too expensive', zh:'太贵了'},
        {w:'any discount', zh:'有折扣吗'},
        {w:'keep the receipt', zh:'留好小票'},
        {w:'keep the change', zh:'不用找零'}
      ]
    },
    {
      name: '超市购物',
      items: [
        {w:'shopping list', zh:'购物清单'},
        {w:'shopping cart', zh:'购物车'},
        {w:'shopping basket', zh:'购物篮'},
        {w:'aisle', zh:'货架通道'},
        {w:'on sale', zh:'特价中'},
        {w:'price tag', zh:'价签'},
        {w:'expiry date', zh:'保质期'},
        {w:'instant noodles', zh:'方便面'},
        {w:'bottled water', zh:'瓶装水'},
        {w:'snacks', zh:'零食'},
        {w:'fruit and veggies', zh:'果蔬'},
        {w:'checkout counter', zh:'收银台'},
        {w:'cash or card', zh:'现金还是刷卡'},
        {w:'receipt', zh:'购物小票'},
        {w:'plastic bag', zh:'塑料袋'},
        {w:'bring your own bag', zh:'自带购物袋'}
      ]
    },
    {
      name: '地面交通',
      items: [
        {w:'taxi stand', zh:'出租车上客点'},
        {w:'hail a taxi', zh:'招手打车'},
        {w:'ride-hailing app', zh:'打车软件'},
        {w:'one-way trip', zh:'单程'},
        {w:'meter', zh:'计价器'},
        {w:'fare', zh:'车费'},
        {w:'drop me off here', zh:'在这里放下我'},
        {w:'keep the change', zh:'不用找了'},
        {w:'bus stop', zh:'公交站'},
        {w:'get on', zh:'上车'},
        {w:'get off', zh:'下车'},
        {w:'transfer', zh:'换乘'},
        {w:'metro station', zh:'地铁站'},
        {w:'ticket machine', zh:'自助售票机'},
        {w:'traffic jam', zh:'堵车'},
        {w:'take a detour', zh:'绕路'}
      ]
    },
    {
      name: '药店就医',
      items: [
        {w:'pharmacy', zh:'药店'},
        {w:'drugstore', zh:'药妆店'},
        {w:'painkiller', zh:'止痛药'},
        {w:'cold medicine', zh:'感冒药'},
        {w:'stomachache', zh:'胃疼'},
        {w:'fever', zh:'发烧'},
        {w:'cough', zh:'咳嗽'},
        {w:'band-aid', zh:'创可贴'},
        {w:'ointment', zh:'药膏'},
        {w:'allergic to', zh:'对……过敏'},
        {w:'prescription', zh:'处方'},
        {w:'dosage', zh:'用法用量'},
        {w:'take twice a day', zh:'一天吃两次'},
        {w:'clinic', zh:'诊所'},
        {w:'emergency room', zh:'急诊室'},
        {w:'health insurance', zh:'医疗保险'}
      ]
    },
    {
      name: '住宿酒店',
      items: [
        {w:'check in', zh:'入住登记'},
        {w:'check out', zh:'退房'},
        {w:'reservation', zh:'预订'},
        {w:'room card', zh:'房卡'},
        {w:'deposit', zh:'押金'},
        {w:'front desk', zh:'前台'},
        {w:'single room', zh:'单人间'},
        {w:'twin room', zh:'双床房'},
        {w:'breakfast included', zh:'含早餐'},
        {w:'room service', zh:'客房服务'},
        {w:'towels', zh:'毛巾'},
        {w:'air conditioning', zh:'空调'},
        {w:'hot water', zh:'热水'},
        {w:'wifi password', zh:'无线密码'},
        {w:'wake-up call', zh:'叫醒服务'},
        {w:'extend my stay', zh:'延长住宿'}
      ]
    },
    {
      name: '手机卡与网络',
      items: [
        {w:'sim card', zh:'电话卡'},
        {w:'prepaid card', zh:'预付卡'},
        {w:'data plan', zh:'流量套餐'},
        {w:'top up', zh:'充值'},
        {w:'local number', zh:'本地号码'},
        {w:'plug adapter', zh:'转换插头'},
        {w:'voltage', zh:'电压'},
        {w:'charger', zh:'充电器'},
        {w:'power bank', zh:'充电宝'},
        {w:'charging cable', zh:'数据线'},
        {w:'hotspot', zh:'手机热点'},
        {w:'no signal', zh:'没信号'},
        {w:'slow connection', zh:'网速慢'},
        {w:'connect to wifi', zh:'连无线网'},
        {w:'roaming', zh:'漫游'},
        {w:'screen cracked', zh:'屏幕碎了'}
      ]
    },
    {
      name: '天气与寒暄',
      items: [
        {w:'weather forecast', zh:'天气预报'},
        {w:'sunny', zh:'晴天'},
        {w:'cloudy', zh:'多云'},
        {w:'raining', zh:'下雨'},
        {w:'windy', zh:'起风了'},
        {w:'freezing', zh:'冷得要命'},
        {w:'scorching', zh:'热得要命'},
        {w:'umbrella', zh:'雨伞'},
        {w:'raincoat', zh:'雨衣'},
        {w:'where are you from', zh:'你来自哪里'},
        {w:'how long is your stay', zh:'你待多久'},
        {w:'what do you do', zh:'你做什么工作'},
        {w:'nice to meet you', zh:'幸会'},
        {w:'see you tomorrow', zh:'明天见'},
        {w:'take care', zh:'保重'},
        {w:'have a good one', zh:'祝顺利'}
      ]
    },
    {
      name: '行业·仓储系统',
      items: [
        {w:'warehouse', zh:'仓库'},
        {w:'rack', zh:'货架'},
        {w:'pallet', zh:'托盘'},
        {w:'storage location', zh:'货位；储位'},
        {w:'inventory', zh:'库存'},
        {w:'inbound', zh:'入库'},
        {w:'outbound', zh:'出库'},
        {w:'sorting', zh:'分拣'},
        {w:'loading', zh:'装载'},
        {w:'unloading', zh:'卸货'},
        {w:'automated warehouse', zh:'自动化仓储'},
        {w:'AS/RS', zh:'立体库'},
        {w:'pallet racking', zh:'重型货架'},
        {w:'radio shuttle racking', zh:'穿梭式货架'},
        {w:'double-deep pallet racking', zh:'双深式货架'},
        {w:'VNA racking', zh:'窄巷式货架'}
      ]
    },
    {
      name: '行业·货架部件',
      items: [
        {w:'upright', zh:'立柱'},
        {w:'upright frame', zh:'立柱片'},
        {w:'beam', zh:'横梁'},
        {w:'load beam', zh:'载重梁'},
        {w:'cross beam', zh:'跨梁'},
        {w:'rear beam', zh:'穿梭横梁'},
        {w:'rear stop beam', zh:'背档梁'},
        {w:'beam support', zh:'牛腿'},
        {w:'steel planks', zh:'楼板'},
        {w:'mezzanine', zh:'钢平台'},
        {w:'drive-in racking', zh:'驶入式货架'},
        {w:'push-back racking', zh:'后推式货架'},
        {w:'intensive storage racking', zh:'密集存储货架'},
        {w:'general racking', zh:'通用型货架'},
        {w:'carrier and shuttle rack', zh:'子母穿梭立库'},
        {w:'crane and shuttle rack', zh:'堆垛机穿梭式'}
      ]
    },
    {
      name: '行业·拉撑与网片',
      items: [
        {w:'horizontal brace', zh:'横撑'},
        {w:'diagonal brace', zh:'斜撑'},
        {w:'crosswise support', zh:'横斜撑'},
        {w:'wire deck', zh:'层网'},
        {w:'back mesh', zh:'背网'},
        {w:'row spacer', zh:'连拉杆'},
        {w:'rectangular row spacer', zh:'方管连拉杆'},
        {w:'round row spacer', zh:'圆管连拉杆'},
        {w:'horizontal row spacer', zh:'水平拉杆'},
        {w:'rear row spacer', zh:'背拉杆'},
        {w:'frame barrier', zh:'护栏'},
        {w:'transverse', zh:'横向'},
        {w:'longitudinal', zh:'纵向'},
        {w:'horizontal load', zh:'水平荷载'},
        {w:'displacement', zh:'位移'},
        {w:'lateral displacement', zh:'侧移'}
      ]
    },
    {
      name: '行业·底脚与防护',
      items: [
        {w:'base plate', zh:'柱底脚'},
        {w:'adjustable foot', zh:'可调底脚'},
        {w:'column guard', zh:'护脚'},
        {w:'stop plate', zh:'防撞座'},
        {w:'protection pole', zh:'防撞杆'},
        {w:'forklift limiter', zh:'叉车限位件'},
        {w:'forklift passage', zh:'叉车通道'},
        {w:'rail', zh:'导轨'},
        {w:'ground rail', zh:'地导轨'},
        {w:'rail with deceleration hole', zh:'减速孔导轨'},
        {w:'counterweight', zh:'平衡重'},
        {w:'max turning radius', zh:'最大旋转半径'},
        {w:'clearance height', zh:'净空高度'},
        {w:'storage height', zh:'储物高度'},
        {w:'anchor bolt', zh:'地脚螺栓'},
        {w:'shim', zh:'垫片调平'}
      ]
    },
    {
      name: '行业·螺栓五金',
      items: [
        {w:'bolt', zh:'螺栓'},
        {w:'nut', zh:'螺母'},
        {w:'washer', zh:'垫片'},
        {w:'screw', zh:'螺丝；螺钉'},
        {w:'self-tapping screw', zh:'自攻钉'},
        {w:'hex bolt', zh:'六角螺栓'},
        {w:'full thread', zh:'全螺纹'},
        {w:'torque wrench', zh:'扭矩扳手'},
        {w:'torque value', zh:'扭矩值'},
        {w:'tighten to spec', zh:'按规范紧固'},
        {w:'impact driver', zh:'电动起子'},
        {w:'socket', zh:'套筒'},
        {w:'level', zh:'水平仪'},
        {w:'tape measure', zh:'卷尺'},
        {w:'chalk line', zh:'墨线'},
        {w:'plumb bob', zh:'线锤'}
      ]
    },
    {
      name: '行业·设备与叉车',
      items: [
        {w:'crane', zh:'堆垛机'},
        {w:'shuttle car', zh:'穿梭台车'},
        {w:'carrier', zh:'子母车'},
        {w:'forklift', zh:'叉车'},
        {w:'VNA forklift', zh:'VNA专用叉车'},
        {w:'forward forklift', zh:'前移式叉车'},
        {w:'pallet shuttle', zh:'托盘穿梭车'},
        {w:'limit switch', zh:'限位开关'},
        {w:'bumper', zh:'缓冲器'},
        {w:'guide rail', zh:'导向轨'},
        {w:'charging station', zh:'充电位'},
        {w:'remote control', zh:'遥控器'},
        {w:'pallet position', zh:'托盘位'},
        {w:'first in first out', zh:'先进先出'},
        {w:'lane', zh:'巷道；库道'},
        {w:'bay', zh:'货格'}
      ]
    },
    {
      name: '行业·工艺处理',
      items: [
        {w:'welding', zh:'焊接'},
        {w:'cutting', zh:'切割'},
        {w:'drilling', zh:'钻孔'},
        {w:'grinding', zh:'打磨'},
        {w:'rolling', zh:'轧制'},
        {w:'forming', zh:'成形'},
        {w:'machining', zh:'加工'},
        {w:'assembly', zh:'组装'},
        {w:'galvanizing', zh:'镀锌'},
        {w:'painting', zh:'喷涂；上漆'},
        {w:'powder coating', zh:'粉末喷涂'},
        {w:'heat treatment', zh:'热处理'},
        {w:'polishing', zh:'抛光'},
        {w:'packing', zh:'包装'},
        {w:'batch distribution', zh:'分批运输'},
        {w:'after-sale service', zh:'售后服务'}
      ]
    },
    {
      name: '行业·品质验收',
      items: [
        {w:'inspection', zh:'检查；检验'},
        {w:'check and accept', zh:'验收'},
        {w:'acceptance form', zh:'验收单'},
        {w:'installation plan', zh:'安装方案'},
        {w:'installation order', zh:'安装顺序'},
        {w:'on-site photos', zh:'现场照片'},
        {w:'on-site investigation', zh:'现场踏勘'},
        {w:'installation process monitoring', zh:'安装过程监控'},
        {w:'tolerance', zh:'公差'},
        {w:'deformation', zh:'变形'},
        {w:'crack', zh:'开裂'},
        {w:'adhesion', zh:'附着力'},
        {w:'wear resistance', zh:'耐磨性'},
        {w:'tensile strength', zh:'抗拉强度'},
        {w:'stability', zh:'稳定性'},
        {w:'industrial standard', zh:'行业标准'}
      ]
    }
  ]
};

/* 工具：全量条目（用于总数显示） */
window.IMMERSION.total = function () {
  return window.IMMERSION.scenes.reduce(function (n, s) { return n + s.items.length; }, 0);
};
