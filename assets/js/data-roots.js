/* ============================================================
   邪修英语 · 词根库数据（50 个词根/词缀）
   条目格式：[英文, 中文, 构词拆解, 行业?]
     构词拆解用 " | " 分段，段内首个空格前为词缀形式：
     "in- 进入 | stall 放置 | -ation 名词后缀"
     第4位 1 = 仓储安装行业词 ⭐
   ============================================================ */
window.ROOTS = {
  list: [
    {r:'port', m:'搬运、携带', w:[
      ['transport','运输；运输工具','trans- 跨越 | port 搬运',1],
      ['export','出口','ex- 向外 | port 运送'],
      ['import','进口；导入','im- 向内 | port 运送'],
      ['portable','便携的','port 携带 | -able 可…的'],
      ['support','支撑；支持','sup-(sub) 从下 | port 承载',1],
      ['report','报告','re- 回 | port 带回（带回消息）'],
      ['porter','搬运工','port 搬运 | -er 人'],
      ['portion','一部分','port 分配 | -ion 名词']]},

    {r:'spect / spec', m:'看', w:[
      ['inspect','检验；检查','in- 向内 | spect 看',1],
      ['respect','尊重','re- 回 | spect 看（回头看）'],
      ['expect','预期；期待','ex- 向外 | spect 看（向外望）'],
      ['aspect','方面','a-(ad) 朝向 | spect 看（看的方向）'],
      ['spectator','观众','spect 看 | -ator 人'],
      ['spectacle','景象；眼镜','spect 看 | -acle 物'],
      ['specify','明确规定','spec 看 | -ify 使（使人看清）',1],
      ['specimen','样本；试件','spec 看 | -men 物（供查看之物）',1]]},

    {r:'stall', m:'放置', w:[
      ['install','安装','in- 进入 | stall 放置',1],
      ['installation','安装（名词）','in- 进入 | stall 放置 | -ation 名词后缀',1],
      ['stall','货摊；工位','stall 放置（放置之处）',1],
      ['installment','安装；分期','in- 进入 | stall 放置 | -ment 名词后缀'],
      ['forestall','预先阻止','fore- 预先 | stall 放置']]},

    {r:'struct', m:'建造、构建', w:[
      ['construct','建造；施工','con- 一起 | struct 建造',1],
      ['structure','结构','struct 建造 | -ure 名词',1],
      ['instruct','指导；指示','in- 向内 | struct 建造（在心里建立）'],
      ['destroy','破坏','de- 去除 | stru(struct) 建造（反向建）'],
      ['infrastructure','基础设施','infra- 在下面 | structure 结构',1],
      ['obstruction','障碍物','ob- 阻挡 | struct 建造 | -ion 名词']]},

    {r:'pos / pon', m:'放置', w:[
      ['position','位置','pos 放置 | -ition 名词',1],
      ['compose','组成；作曲','com- 一起 | pos 放置'],
      ['expose','暴露','ex- 向外 | pos 放'],
      ['oppose','反对','op-(ob) 对面 | pos 放'],
      ['propose','提议','pro- 向前 | pos 放'],
      ['suppose','假设；认为','sup-(sub) 在下 | pos 放（放在底下）'],
      ['deposit','存放；沉积物','de- 向下 | pos 放'],
      ['component','部件；组成的','com- 一起 | pon 放置 | -ent 物',1],
      ['postpone','推迟','post- 在后 | pon 放']]},

    {r:'duct', m:'引导', w:[
      ['conduct','实施；指挥；传导','con- 一起/加强 | duct 引导',1],
      ['deduct','扣除','de- 向下 | duct 引导'],
      ['deduce','推断','de- 向下 | duc 引导'],
      ['induce','引起','in- 向内 | duc 引导'],
      ['introduce','引进；介绍','intro- 向内 | duc 引导'],
      ['produce','生产','pro- 向前 | duc 引导'],
      ['reduce','减少','re- 回 | duc 引导（往回引）'],
      ['aqueduct','渡槽','aque 水 | duct 引导',1]]},

    {r:'fer', m:'带来、承载', w:[
      ['transfer','转移；换乘','trans- 跨越 | fer 带',1],
      ['refer','参考；提及','re- 回 | fer 带（带回查）'],
      ['prefer','更喜欢','pre- 前 | fer 带（带到前面）'],
      ['differ','不同','dif-(dis) 分开 | fer 带（被带开）'],
      ['offer','提供','of-(ob) 向 | fer 拿'],
      ['suffer','遭受','suf-(sub) 在下 | fer 承受'],
      ['infer','推断','in- 向内 | fer 带（带入结论）'],
      ['conference','会议','con- 一起 | fer 带 | -ence 名词']]},

    {r:'form', m:'形状、成形', w:[
      ['perform','执行；表演','per- 贯穿 | form 成形（全程成形）',1],
      ['reform','改革','re- 再 | form 形状'],
      ['inform','通知','in- 向内 | form 形状（使心里成形）'],
      ['transform','转变；变换','trans- 跨越 | form 形状',1],
      ['uniform','制服；统一的','uni- 一 | form 形式',1],
      ['formal','正式的','form 形式 | -al 形容词'],
      ['format','格式','form 形状 | -at 后缀',1],
      ['formula','公式；配方','form 形式 | -ula 小称']]},

    {r:'mit / miss', m:'送出、放出', w:[
      ['admit','承认；允许进入','ad- 向 | mit 送（允许送入）'],
      ['commit','承诺；投入','com- 加强 | mit 送（交出）'],
      ['permit','允许；许可证','per- 贯穿 | mit 送（允许通过）'],
      ['submit','提交；服从','sub- 下 | mit 送（从下送上）'],
      ['transmit','传输；传送','trans- 跨越 | mit 送',1],
      ['mission','任务','miss 送 | -ion 名词'],
      ['dismiss','解散；驳回','dis- 离开 | miss 送'],
      ['promise','承诺','pro- 向前 | miss 送（送出话）']]},

    {r:'scrib / script', m:'写', w:[
      ['describe','描述','de- 向下 | scrib 写'],
      ['prescribe','规定；开处方','pre- 预先 | scrib 写'],
      ['subscribe','订阅；赞成','sub- 下 | scrib 写（在下面签名）'],
      ['manuscript','手稿','manu 手 | script 写'],
      ['script','脚本','script 写（写本）',1],
      ['inscription','铭文','in- 在上 | script 写 | -ion 名词']]},

    {r:'ceed / cess', m:'走、前行', w:[
      ['proceed','继续进行','pro- 向前 | ceed 走',1],
      ['succeed','成功；继任','suc-(sub) 接近 | ceed 走（跟在后面）'],
      ['exceed','超过','ex- 向外 | ceed 走'],
      ['access','进入；通道','ac-(ad) 向 | cess 走'],
      ['process','过程；流程','pro- 向前 | cess 走',1],
      ['success','成功','suc-(sub) 接近 | cess 走'],
      ['recess','休息；凹槽','re- 回 | cess 走（走回）'],
      ['necessary','必要的','ne- 不 | cess 走 | -ary（走不开的）']]},

    {r:'ven / vent', m:'来', w:[
      ['prevent','预防','pre- 前 | vent 来（先来挡住）',1],
      ['invent','发明','in- 向内 | vent 来（想出来）'],
      ['event','事件','e-(ex) 出 | vent 来（冒出来的事）',1],
      ['convene','集合；召开','con- 一起 | ven 来'],
      ['avenue','大道','a-(ad) 向 | ven 来 | -ue（来的路）'],
      ['revenue','收入','re- 回 | ven 来（回来的钱）'],
      ['adventure','冒险','ad- 向 | vent 来 | -ure'],
      ['conventional','常规的','con- 一起 | vent 来 | -ion | -al']]},

    {r:'ten / tain', m:'握住、保持', w:[
      ['contain','包含','con- 一起 | tain 握',1],
      ['obtain','获得','ob- 向 | tain 握（握住）'],
      ['maintain','维护；维持','main(manu) 手 | tain 握（手持）',1],
      ['sustain','支撑；持续','sus-(sub) 下 | tain 握（下面撑住）',1],
      ['entertain','娱乐；招待','enter-(inter) 之间 | tain 持'],
      ['tenant','租户','ten 持 | -ant 人（持有房屋者）'],
      ['tenure','任期','ten 持 | -ure'],
      ['content','内容；满足的','con- 一起 | tent 持',1]]},

    {r:'tract', m:'拉、拖', w:[
      ['attract','吸引','at-(ad) 向 | tract 拉'],
      ['distract','使分心','dis- 分开 | tract 拉'],
      ['extract','提取；拔出','ex- 向外 | tract 拉'],
      ['subtract','减去','sub- 下 | tract 拉'],
      ['contract','合同；收缩','con- 一起 | tract 拉（拉到一起）',1],
      ['tractor','拖拉机','tract 拉 | -or 物'],
      ['abstract','抽象的；摘要','abs- 离开 | tract 拉（抽离）']]},

    {r:'press', m:'压', w:[
      ['express','表达；快速的','ex- 向外 | press 压'],
      ['impress','给……印象','im- 向内 | press 压'],
      ['compress','压缩','com- 一起 | press 压'],
      ['depress','使沮丧；按下','de- 向下 | press 压'],
      ['oppress','压迫','op-(ob) 对 | press 压'],
      ['pressure','压力','press 压 | -ure 名词',1]]},

    {r:'vers / vert', m:'转动', w:[
      ['convert','转换；改装','con- 加强 | vert 转',1],
      ['reverse','反向的；倒车','re- 回 | vers 转',1],
      ['divert','使改道','di-(dis) 分开 | vert 转'],
      ['advertise','做广告','ad- 向 | vert 转 | -ise（转人注意）'],
      ['universe','宇宙','uni- 一 | vers 转（转为一体）'],
      ['version','版本','vers 转 | -ion（转写本）',1],
      ['vertical','垂直的','vert 转 | -ic | -al（转轴方向）',1],
      ['conversation','对话','con- 一起 | vers 转 | -ation']]},

    {r:'vis / vid', m:'看见', w:[
      ['visible','可见的','vis 看 | -ible 可…的'],
      ['vision','视野；愿景','vis 看 | -ion 名词'],
      ['advise','建议','ad- 向 | vis 看（给出看法）'],
      ['device','设备；装置','de- 分开 | vic(vid) 看',1],
      ['revise','修订','re- 再 | vis 看'],
      ['supervise','监督','super- 上 | vis 看（从上看）',1],
      ['evidence','证据','e-(ex) 出 | vid 看 | -ence'],
      ['video','视频','vid 看 | -eo（影像）']]},

    {r:'dict', m:'说、宣告', w:[
      ['predict','预测','pre- 预先 | dict 说'],
      ['dictate','口述；命令','dict 说 | -ate 动词'],
      ['dictionary','词典','dict 说 | -ion | -ary（说法的集子）'],
      ['contradict','反驳；矛盾','contra- 反 | dict 说'],
      ['indicate','表明；指出','in- 向 | dic 说 | -ate',1],
      ['verdict','裁定','ver 真实 | dict 说']]},

    {r:'ject', m:'投掷', w:[
      ['project','项目；投射','pro- 向前 | ject 投',1],
      ['reject','拒绝','re- 回 | ject 投（扔回）'],
      ['inject','注射；注入','in- 向内 | ject 投'],
      ['object','物体；反对','ob- 对 | ject 投（投在对面）',1],
      ['subject','主题；使服从','sub- 下 | ject 投（投于其下）'],
      ['eject','弹出；排出','e-(ex) 外 | ject 投']]},

    {r:'pend', m:'悬挂', w:[
      ['depend','取决于；依靠','de- 下 | pend 挂（挂在…上）',1],
      ['suspend','暂停；悬挂','sus-(sub) 下 | pend 挂',1],
      ['spend','花费','s-(ex) 出 | pend 支付'],
      ['pending','待定的','pend 悬挂 | -ing'],
      ['independent','独立的','in- 不 | de- 下 | pend 挂 | -ent']]},

    {r:'sist / sta', m:'站立', w:[
      ['assist','协助','as-(ad) 旁 | sist 站（站旁边）'],
      ['consist','组成','con- 一起 | sist 站'],
      ['exist','存在','ex- 向外 | sist 站（站出来）'],
      ['insist','坚持','in- 加强 | sist 站'],
      ['resist','抵抗','re- 反 | sist 站'],
      ['stable','稳定的','sta 站 | -ble 能（站得住）'],
      ['station','工位；车站','sta 站 | -tion 名词',1],
      ['status','状态','sta 站 | -tus 名词',1],
      ['distance','距离','di-(dis) 分开 | sta 站 | -nce'],
      ['constant','恒定的','con- 一起 | sta 站 | -ant',1]]},

    {r:'mov / mot', m:'移动', w:[
      ['motion','运动','mot 动 | -ion 名词',1],
      ['motive','动机','mot 动 | -ive'],
      ['promote','促进；晋升','pro- 向前 | mot 动',1],
      ['remote','远程的；遥远的','re- 离 | mot 动（移到远处）',1],
      ['emotion','情绪','e-(ex) 出 | mot 动（动于外）'],
      ['motor','电机；马达','mot 动 | -or 物',1]]},

    {r:'cap / cept', m:'抓住、拿取', w:[
      ['capture','捕获','cap 抓 | -ture'],
      ['accept','接受；验收','ac-(ad) 向 | cept 抓',1],
      ['concept','概念','con- 一起 | cept 抓（抓到一起的想法）'],
      ['except','除了','ex- 外 | cept 抓（抓出去）'],
      ['capacity','容量；能力','cap 抓 | -acity 能力',1],
      ['escape','逃跑','es-(ex) 外 | cape(cap) 抓（挣脱抓）'],
      ['recipient','接收方','re- 回 | cip 抓 | -ent 人']]},

    {r:'grad / gress', m:'迈步、等级', w:[
      ['grade','等级；年级','grad 等级（词根本词）'],
      ['gradual','逐渐的','grad 步 | -ual 形容词'],
      ['graduate','毕业','grad 级 | -uate（走完一级）'],
      ['progress','进度；进展','pro- 向前 | gress 走',1],
      ['aggressive','好斗的','ag-(ad) 向 | gress 走 | -ive'],
      ['congress','国会；大会','con- 一起 | gress 走（走到一起）'],
      ['degree','程度；学位','de- 向下 | gree(grad) 级']]},

    {r:'fin', m:'结束、界限', w:[
      ['final','最终的','fin 末尾 | -al'],
      ['finish','完成','fin 结束 | -ish 动词'],
      ['define','定义；明确','de- 下 | fin 界限（定下界限）',1],
      ['confine','限制','con- 加强 | fin 界限'],
      ['refine','精炼','re- 再 | fin 精细'],
      ['finance','财务','fin 结清 | -ance（结清账目）'],
      ['infinite','无限的','in- 无 | fin 界限 | -ite']]},

    {r:'flu', m:'流动', w:[
      ['fluid','流体；流动的','flu 流 | -id',1],
      ['influence','影响','in- 向内 | flu 流 | -ence（流入）'],
      ['flush','冲洗；齐平的','flu 流 | -sh 动词'],
      ['fluent','流利的','flu 流 | -ent'],
      ['influx','涌入','in- 向内 | flux 流'],
      ['fluctuate','波动','flu 流 | -ctuate']]},

    {r:'graph / gram', m:'写、画、记录', w:[
      ['photograph','照片','photo 光 | graph 画'],
      ['telegraph','电报','tele 远 | graph 写'],
      ['diagram','示意图','dia- 穿过 | gram 画',1],
      ['grammar','语法','gram 写 | -ar（写法规则）'],
      ['program','程序；方案','pro- 前 | gram 写（先写好的）',1],
      ['graphic','图形的；生动的','graph 画 | -ic']]},

    {r:'meter', m:'测量', w:[
      ['diameter','直径','dia- 穿过 | meter 测量',1],
      ['thermometer','温度计','thermo 热 | meter 测量'],
      ['centimeter','厘米','centi 百分之一 | meter 米',1],
      ['metric','公制的','meter 测量 | -ic'],
      ['parameter','参数','para- 旁 | meter 测量（旁测量）',1]]},

    {r:'log', m:'话语、理性', w:[
      ['logic','逻辑','log 理性 | -ic'],
      ['catalog','目录','cata- 全 | log 列（全部列出）'],
      ['dialog','对话','dia- 之间 | log 说话'],
      ['biology','生物学','bio 生命 | logy 学问'],
      ['technology','技术','techno 技艺 | logy 学问'],
      ['apology','道歉','apo- 分开 | log 说话（分辩的话）'],
      ['logistics','物流；后勤','log 计算 | -istics（调度计算之术）',1]]},

    {r:'manu', m:'手', w:[
      ['manual','手册；手动的','manu 手 | -al',1],
      ['manufacture','制造','manu 手 | fact 做 | -ure',1],
      ['manage','管理','man(manu) 手 | -age（用手处理）'],
      ['manipulate','操控','mani 手 | pul 拉 | -ate（用手拉弄）']]},

    {r:'oper', m:'工作、运行', w:[
      ['operate','操作；运行','oper 工作 | -ate',1],
      ['cooperate','合作','co- 一起 | oper 工作 | -ate'],
      ['operation','运营；作业','oper 工作 | -ation',1],
      ['operator','操作人员','oper 工作 | -ator 人',1]]},

    {r:'equ', m:'相等、平等', w:[
      ['equal','相等的','equ 相等 | -al'],
      ['equipment','设备','equip 装备 | -ment 名词',1],
      ['equivalent','等效的','equi 相等 | val 价值 | -ent',1],
      ['equation','方程式','equ 相等 | -ation']]},

    {r:'fix', m:'固定', w:[
      ['fix','固定；修理','fix 固定（词根本词）',1],
      ['fixture','工装夹具；固定件','fix 固定 | -ture 物',1],
      ['prefix','前缀','pre- 前 | fix 固定（固定在前面）'],
      ['suffix','后缀','suf-(sub) 后 | fix 固定'],
      ['transfix','刺穿','trans- 穿过 | fix 钉']]},

    {r:'bat', m:'击打', w:[
      ['battle','战斗','bat 打 | -tle 反复动作'],
      ['debate','辩论','de- 相反 | bat 打（对打）'],
      ['combat','战斗；应对','com- 一起 | bat 打'],
      ['battery','电池；排炮','bat 打 | -tery（连续打击）']]},

    {r:'cid / cis', m:'切、割', w:[
      ['decide','决定','de- 完全 | cid 切（切下决断）'],
      ['precise','精确的','pre- 预先 | cis 切（预先切准）',1],
      ['concise','简洁的','con- 一起 | cis 切（切短）'],
      ['scissors','剪刀','cis 切 | -sors 物'],
      ['accident','事故','ac-(ad) 向 | cid 落 | -ent（落下的事）']]},

    {r:'clud / clus', m:'关闭', w:[
      ['include','包括','in- 内 | clud 关',1],
      ['exclude','排除','ex- 外 | clud 关'],
      ['conclude','总结；结束','con- 全 | clud 关（全部关完）'],
      ['conclusion','结论','con- 全 | clus 关 | -ion'],
      ['enclose','围住；随函附上','en- 使 | close 关']]},

    {r:'pli / ply', m:'折叠、弯', w:[
      ['apply','应用；申请','ap-(ad) 向 | ply 贴（贴近去做）',1],
      ['comply','遵守','com- 一起 | ply 折（折身顺从）'],
      ['reply','回复','re- 回 | ply 折（折回）'],
      ['supply','供应','sup-(sub) 下 | ply 补（从下补上）',1],
      ['multiply','乘以；增加','multi 多 | ply 折叠（多叠）'],
      ['plywood','胶合板','ply 层 | wood 木']]},

    {r:'sect', m:'切割', w:[
      ['section','区段；截面','sect 切 | -ion（切下的部分）',1],
      ['insect','昆虫','in- 入 | sect 切（身体分节）'],
      ['intersect','相交；交叉','inter- 之间 | sect 切（互相切）',1],
      ['sector','扇形；行业','sect 切 | -or 物'],
      ['segment','分段；扇区','seg(sect) 切 | -ment 物',1]]},

    {r:'quer / quest', m:'询问、寻求', w:[
      ['request','请求','re- 再 | quest 求',1],
      ['question','问题','quest 问 | -ion'],
      ['require','需要；要求','re- 再 | quir 求',1],
      ['inquire','询问','in- 向内 | quir 问'],
      ['acquire','获得','ac-(ad) 向 | quir 求'],
      ['conquest','征服','con- 加强 | quest 求']]},

    {r:'rupt', m:'破裂', w:[
      ['interrupt','打断','inter- 之间 | rupt 断',1],
      ['corrupt','腐败的','cor-(com) 完全 | rupt 断（全坏）'],
      ['erupt','爆发','e-(ex) 出 | rupt 断'],
      ['bankrupt','破产的','bank 钱摊 | rupt 断（摊断了）'],
      ['disrupt','扰乱','dis- 分开 | rupt 断']]},

    {r:'serv', m:'服务、保护', w:[
      ['serve','服务；供应','serv 服务（词根本词）'],
      ['preserve','保存；防护','pre- 预先 | serv 保护',1],
      ['reserve','预留；备用','re- 回 | serv 保留',1],
      ['observe','观察；遵守','ob- 向 | serv 守/看',1],
      ['deserve','值得','de- 完全 | serve 服务（完全配得上）'],
      ['service','服务；保养','serv 服务 | -ice',1]]},

    {r:'sign', m:'记号', w:[
      ['signal','信号','sign 记号 | -al',1],
      ['signature','签名','sign 签 | -ature'],
      ['assign','指派；分配','as-(ad) 向 | sign 记号（做记号分派）'],
      ['design','设计','de- 出 | sign 记号（画出记号）',1],
      ['significant','重要的；显著的','sign 记号 | -ific | -ant（有记号的）']]},

    {r:'vac', m:'空的', w:[
      ['vacuum','真空；吸尘器','vac 空 | -uum 名词',1],
      ['vacant','空置的','vac 空 | -ant'],
      ['evacuate','撤离；排空','e-(ex) 出 | vac 空 | -uate'],
      ['vacation','假期','vac 空 | -ation（空闲期）']]},

    {r:'ware', m:'物品、制品', w:[
      ['hardware','五金件；硬件','hard 硬 | ware 器物',1],
      ['software','软件','soft 软 | ware 器物',1],
      ['warehouse','仓库','ware 货物 | house 房子',1],
      ['aware','意识到的','a- 加强 | ware 留神']]},

    {r:'chron', m:'时间', w:[
      ['chronic','慢性的；长期的','chron 时间 | -ic（长时间的）'],
      ['synchronize','同步','syn- 同 | chron 时间 | -ize',1],
      ['chronological','按时间顺序的','chron 时间 | -logical 顺序的']]},

    {r:'therm', m:'热', w:[
      ['thermal','热力的；保暖的','therm 热 | -al',1],
      ['thermometer','温度计','thermo 热 | meter 测量'],
      ['thermostat','恒温器','thermo 热 | stat 保持恒定',1]]},

    {r:'hydr', m:'水', w:[
      ['hydraulic','液压的','hydr 水 | -aulic 管道的（水管传动）',1],
      ['hydrogen','氢气','hydro 水 | gen 产生（生成水）'],
      ['hydrate','水合物','hydr 水 | -ate']]},

    {r:'electr', m:'电', w:[
      ['electric','电动的','electr 电 | -ic',1],
      ['electrical','电气的','electr 电 | -ic | -al',1],
      ['electricity','电；电力','electr 电 | -icity'],
      ['electronic','电子的','electr 电 | -on | -ic',1]]},

    {r:'auto', m:'自己、自动', w:[
      ['automatic','自动的','auto 自己 | mat 思考 | -ic（自己会动）',1],
      ['automate','使自动化','auto 自己 | mat 动 | -e',1],
      ['autonomy','自主权','auto 自己 | nomy 法则'],
      ['automobile','汽车','auto 自己 | mob 动 | -ile']]},

    {r:'tele', m:'远', w:[
      ['telephone','电话','tele 远 | phon 声音'],
      ['telescope','望远镜','tele 远 | scope 看'],
      ['telegram','电报','tele 远 | gram 写'],
      ['television','电视','tele 远 | vis 看 | -ion']]}
  ]
};

/* 拆解串解析：[{t:'in-', m:'进入'}, ...] */
window.ROOTS.parseParts = function (p) {
  return String(p).split('|').map(function (seg) {
    var s = seg.trim();
    var sp = s.indexOf(' ');
    if (sp < 0) return { t: s, m: '' };
    return { t: s.slice(0, sp).trim(), m: s.slice(sp + 1).trim() };
  }).filter(function (x) { return x.t; });
};

/* 按单词查词根条目（保留兼容） */
window.ROOTS.findWord = function (word) {
  var key = word.toLowerCase();
  for (var i = 0; i < window.ROOTS.list.length; i++) {
    var root = window.ROOTS.list[i];
    for (var j = 0; j < root.w.length; j++) {
      if (root.w[j][0].toLowerCase() === key) return { root: root, item: root.w[j] };
    }
  }
  return null;
};
