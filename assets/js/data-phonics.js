/* ============================================================
   邪修英语 · 自然拼读数据（46 规则组 / 7 阶段 + 字母前置组）
   词结构：{ w: 单词, ipa: 音标, zh: 中文释义 }
   M1 已填充：阶段0 字母(26) / 阶段1 短元音(50) / 阶段2 辅音组合(72)
   阶段3-7：组骨架已建，词池 M2 填充
   Tricky Words：M2 填充
   ============================================================ */
window.PHONICS = {
  stages: [
    /* ---------- 阶段0：字母单音（默认跳过，可在设置打开） ---------- */
    {
      id: 0, key: 'letters', name: '字母单音',
      groups: [
        {
          id: 'abc', title: '26 个字母基础发音', pattern: 'a → z',
          tip: '字母最常见的发音，成人快速带过即可。',
          words: [
            {w:'apple',ipa:'/ˈæpl/',zh:'苹果'},{w:'ball',ipa:'/bɔːl/',zh:'球'},
            {w:'cat',ipa:'/kæt/',zh:'猫'},{w:'dog',ipa:'/dɒɡ/',zh:'狗'},
            {w:'egg',ipa:'/eɡ/',zh:'鸡蛋'},{w:'fish',ipa:'/fɪʃ/',zh:'鱼'},
            {w:'goat',ipa:'/ɡəʊt/',zh:'山羊'},{w:'hat',ipa:'/hæt/',zh:'帽子'},
            {w:'igloo',ipa:'/ˈɪɡluː/',zh:'冰屋'},{w:'jam',ipa:'/dʒæm/',zh:'果酱'},
            {w:'king',ipa:'/kɪŋ/',zh:'国王'},{w:'lion',ipa:'/ˈlaɪən/',zh:'狮子'},
            {w:'map',ipa:'/mæp/',zh:'地图'},{w:'net',ipa:'/net/',zh:'网'},
            {w:'octopus',ipa:'/ˈɒktəpəs/',zh:'章鱼'},{w:'pen',ipa:'/pen/',zh:'钢笔'},
            {w:'queen',ipa:'/kwiːn/',zh:'女王'},{w:'rat',ipa:'/ræt/',zh:'老鼠'},
            {w:'sun',ipa:'/sʌn/',zh:'太阳'},{w:'tiger',ipa:'/ˈtaɪɡə/',zh:'老虎'},
            {w:'umbrella',ipa:'/ʌmˈbrelə/',zh:'雨伞'},{w:'van',ipa:'/væn/',zh:'面包车'},
            {w:'watch',ipa:'/wɒtʃ/',zh:'手表'},{w:'box',ipa:'/bɒks/',zh:'盒子（x=/ks/）'},
            {w:'yo-yo',ipa:'/ˈjəʊjəʊ/',zh:'悠悠球'},{w:'zoo',ipa:'/zuː/',zh:'动物园'}
          ]
        }
      ]
    },

    /* ---------- 阶段1：短元音 CVC ---------- */
    {
      id: 1, key: 'short-vowels', name: '短元音 CVC',
      groups: [
        {
          id:'sv-a', title:'短元音 a', pattern:'/æ/ 如 cat',
          tip:'嘴张大，嘴角向两侧，短促的“哎”。',
          words:[
            {w:'cat',ipa:'/kæt/',zh:'猫'},{w:'bag',ipa:'/bæɡ/',zh:'袋子'},
            {w:'map',ipa:'/mæp/',zh:'地图'},{w:'hat',ipa:'/hæt/',zh:'帽子'},
            {w:'fan',ipa:'/fæn/',zh:'风扇；粉丝'},{w:'bat',ipa:'/bæt/',zh:'球棒；蝙蝠'},
            {w:'jam',ipa:'/dʒæm/',zh:'果酱；卡住'},{w:'van',ipa:'/væn/',zh:'面包车'},
            {w:'cap',ipa:'/kæp/',zh:'帽子'},{w:'rat',ipa:'/ræt/',zh:'老鼠'}
          ]
        },
        {
          id:'sv-e', title:'短元音 e', pattern:'/e/ 如 bed',
          tip:'嘴半开，短促的“哎”，比 /æ/ 嘴张小。',
          words:[
            {w:'bed',ipa:'/bed/',zh:'床'},{w:'red',ipa:'/red/',zh:'红色'},
            {w:'pen',ipa:'/pen/',zh:'钢笔'},{w:'ten',ipa:'/ten/',zh:'十'},
            {w:'hen',ipa:'/hen/',zh:'母鸡'},{w:'leg',ipa:'/leɡ/',zh:'腿'},
            {w:'net',ipa:'/net/',zh:'网'},{w:'web',ipa:'/web/',zh:'网'},
            {w:'jet',ipa:'/dʒet/',zh:'喷气式飞机'},{w:'wet',ipa:'/wet/',zh:'湿的'}
          ]
        },
        {
          id:'sv-i', title:'短元音 i', pattern:'/ɪ/ 如 sit',
          tip:'短促放松的“伊”，不要读成长的 /iː/。',
          words:[
            {w:'sit',ipa:'/sɪt/',zh:'坐'},{w:'big',ipa:'/bɪɡ/',zh:'大的'},
            {w:'pig',ipa:'/pɪɡ/',zh:'猪'},{w:'six',ipa:'/sɪks/',zh:'六'},
            {w:'fin',ipa:'/fɪn/',zh:'鱼鳍'},{w:'lid',ipa:'/lɪd/',zh:'盖子'},
            {w:'dip',ipa:'/dɪp/',zh:'蘸；浸'},{w:'mix',ipa:'/mɪks/',zh:'混合'},
            {w:'rib',ipa:'/rɪb/',zh:'肋骨'},{w:'win',ipa:'/wɪn/',zh:'赢'}
          ]
        },
        {
          id:'sv-o', title:'短元音 o', pattern:'/ɒ/ 如 hot',
          tip:'嘴张圆，短促的“奥”。',
          words:[
            {w:'dog',ipa:'/dɒɡ/',zh:'狗'},{w:'hot',ipa:'/hɒt/',zh:'热的'},
            {w:'box',ipa:'/bɒks/',zh:'盒子'},{w:'pot',ipa:'/pɒt/',zh:'锅'},
            {w:'mop',ipa:'/mɒp/',zh:'拖把'},{w:'fox',ipa:'/fɒks/',zh:'狐狸'},
            {w:'log',ipa:'/lɒɡ/',zh:'原木；日志'},{w:'top',ipa:'/tɒp/',zh:'顶部'},
            {w:'cob',ipa:'/kɒb/',zh:'玉米穗'},{w:'jog',ipa:'/dʒɒɡ/',zh:'慢跑'}
          ]
        },
        {
          id:'sv-u', title:'短元音 u', pattern:'/ʌ/ 如 cup',
          tip:'嘴自然张开，喉咙放松的短促“阿”。',
          words:[
            {w:'cup',ipa:'/kʌp/',zh:'杯子'},{w:'sun',ipa:'/sʌn/',zh:'太阳'},
            {w:'bus',ipa:'/bʌs/',zh:'公共汽车'},{w:'run',ipa:'/rʌn/',zh:'跑'},
            {w:'mud',ipa:'/mʌd/',zh:'泥'},{w:'cut',ipa:'/kʌt/',zh:'切'},
            {w:'bug',ipa:'/bʌɡ/',zh:'虫子；故障'},{w:'hug',ipa:'/hʌɡ/',zh:'拥抱'},
            {w:'nut',ipa:'/nʌt/',zh:'坚果'},{w:'jug',ipa:'/dʒʌɡ/',zh:'壶'}
          ]
        }
      ]
    },

    /* ---------- 阶段2：辅音组合 ---------- */
    {
      id: 2, key: 'consonant-digraphs', name: '辅音组合',
      groups: [
        {
          id:'dg-sh', title:'辅音组合 sh', pattern:'/ʃ/',
          tip:'舌尖接近上腭，出气摩擦，“嘘”的音。',
          words:[
            {w:'ship',ipa:'/ʃɪp/',zh:'船'},{w:'shop',ipa:'/ʃɒp/',zh:'商店'},
            {w:'fish',ipa:'/fɪʃ/',zh:'鱼'},{w:'dish',ipa:'/dɪʃ/',zh:'盘子；菜'},
            {w:'shell',ipa:'/ʃel/',zh:'贝壳'},{w:'shoe',ipa:'/ʃuː/',zh:'鞋'},
            {w:'wash',ipa:'/wɒʃ/',zh:'洗'},{w:'brush',ipa:'/brʌʃ/',zh:'刷子'}
          ]
        },
        {
          id:'dg-ch', title:'辅音组合 ch', pattern:'/tʃ/',
          tip:'先堵住再摩擦送出，“吃”的起首音。',
          words:[
            {w:'chair',ipa:'/tʃeə/',zh:'椅子'},{w:'chick',ipa:'/tʃɪk/',zh:'小鸡'},
            {w:'chip',ipa:'/tʃɪp/',zh:'碎片；芯片'},{w:'chop',ipa:'/tʃɒp/',zh:'砍；排骨'},
            {w:'lunch',ipa:'/lʌntʃ/',zh:'午餐'},{w:'bench',ipa:'/bentʃ/',zh:'长凳'},
            {w:'rich',ipa:'/rɪtʃ/',zh:'富有的'},{w:'chat',ipa:'/tʃæt/',zh:'聊天'}
          ]
        },
        {
          id:'dg-th-voiceless', title:'th 清辅音', pattern:'/θ/ 如 think',
          tip:'舌尖轻放上下齿之间，送气不出声，摸喉咙不振动。',
          words:[
            {w:'think',ipa:'/θɪŋk/',zh:'思考；认为'},{w:'three',ipa:'/θriː/',zh:'三'},
            {w:'thin',ipa:'/θɪn/',zh:'薄的；瘦的'},{w:'bath',ipa:'/bɑːθ/',zh:'洗澡'},
            {w:'mouth',ipa:'/maʊθ/',zh:'嘴'},{w:'thumb',ipa:'/θʌm/',zh:'拇指'},
            {w:'tooth',ipa:'/tuːθ/',zh:'牙齿'},{w:'math',ipa:'/mæθ/',zh:'数学'}
          ]
        },
        {
          id:'dg-th-voiced', title:'th 浊辅音', pattern:'/ð/ 如 this',
          tip:'舌位同清 th，但喉咙振动出声。',
          words:[
            {w:'this',ipa:'/ðɪs/',zh:'这个'},{w:'that',ipa:'/ðæt/',zh:'那个'},
            {w:'them',ipa:'/ðem/',zh:'他们（宾格）'},{w:'then',ipa:'/ðen/',zh:'然后'},
            {w:'with',ipa:'/wɪð/',zh:'和……一起'},{w:'mother',ipa:'/ˈmʌðə/',zh:'母亲'},
            {w:'feather',ipa:'/ˈfeðə/',zh:'羽毛'},{w:'weather',ipa:'/ˈweðə/',zh:'天气'}
          ]
        },
        {
          id:'dg-ck', title:'辅音组合 ck', pattern:'/k/',
          tip:'短元音后面用 ck 发 /k/，一个短音。',
          words:[
            {w:'duck',ipa:'/dʌk/',zh:'鸭子'},{w:'sock',ipa:'/sɒk/',zh:'袜子'},
            {w:'kick',ipa:'/kɪk/',zh:'踢'},{w:'rock',ipa:'/rɒk/',zh:'岩石'},
            {w:'neck',ipa:'/nek/',zh:'脖子'},{w:'pick',ipa:'/pɪk/',zh:'捡起；挑选'},
            {w:'lock',ipa:'/lɒk/',zh:'锁'},{w:'snack',ipa:'/snæk/',zh:'小吃'}
          ]
        },
        {
          id:'dg-ng', title:'辅音组合 ng', pattern:'/ŋ/',
          tip:'舌根抬起抵住软腭，鼻音收尾，不要读出 /ɡ/。',
          words:[
            {w:'sing',ipa:'/sɪŋ/',zh:'唱歌'},{w:'long',ipa:'/lɒŋ/',zh:'长的'},
            {w:'ring',ipa:'/rɪŋ/',zh:'戒指；响铃'},{w:'king',ipa:'/kɪŋ/',zh:'国王'},
            {w:'song',ipa:'/sɒŋ/',zh:'歌曲'},{w:'wing',ipa:'/wɪŋ/',zh:'翅膀'},
            {w:'hang',ipa:'/hæŋ/',zh:'悬挂'},{w:'strong',ipa:'/strɒŋ/',zh:'强壮的'}
          ]
        },
        {
          id:'dg-qu', title:'辅音组合 qu', pattern:'/kw/',
          tip:'q 永远带着 u，一起读 /kw/。',
          words:[
            {w:'queen',ipa:'/kwiːn/',zh:'女王'},{w:'quick',ipa:'/kwɪk/',zh:'快的'},
            {w:'quack',ipa:'/kwæk/',zh:'鸭叫声'},{w:'quiet',ipa:'/ˈkwaɪət/',zh:'安静的'},
            {w:'quilt',ipa:'/kwɪlt/',zh:'被子'},{w:'quiz',ipa:'/kwɪz/',zh:'测验'},
            {w:'quill',ipa:'/kwɪl/',zh:'羽毛笔'},{w:'quart',ipa:'/kwɔːt/',zh:'夸脱（单位）'}
          ]
        },
        {
          id:'dg-wh', title:'辅音组合 wh', pattern:'/w/',
          tip:'多数情况下 h 不发音，读 /w/，嘴型收圆。',
          words:[
            {w:'what',ipa:'/wɒt/',zh:'什么'},{w:'when',ipa:'/wen/',zh:'什么时候'},
            {w:'why',ipa:'/waɪ/',zh:'为什么'},{w:'where',ipa:'/weə/',zh:'哪里'},
            {w:'which',ipa:'/wɪtʃ/',zh:'哪一个'},{w:'whip',ipa:'/wɪp/',zh:'鞭子；抽打'},
            {w:'wheel',ipa:'/wiːl/',zh:'轮子'},{w:'whisk',ipa:'/wɪsk/',zh:'搅拌器'}
          ]
        },
        {
          id:'dg-ph', title:'辅音组合 ph', pattern:'/f/',
          tip:'ph 发 /f/，上齿轻咬下唇送气。',
          words:[
            {w:'phone',ipa:'/fəʊn/',zh:'电话'},{w:'photo',ipa:'/ˈfəʊtəʊ/',zh:'照片'},
            {w:'graph',ipa:'/ɡrɑːf/',zh:'图表'},{w:'dolphin',ipa:'/ˈdɒlfɪn/',zh:'海豚'},
            {w:'elephant',ipa:'/ˈelɪfənt/',zh:'大象'},{w:'phonics',ipa:'/ˈfɒnɪks/',zh:'自然拼读'},
            {w:'phrase',ipa:'/freɪz/',zh:'短语'},{w:'trophy',ipa:'/ˈtrəʊfi/',zh:'奖杯'}
          ]
        }
      ]
    },

    /* ---------- 阶段3：辅音连缀（M2 填充） ---------- */
    {
      id: 3, key: 'consonant-blends', name: '辅音连缀',
      groups: [
        {id:'bl-l', title:'l 家族连缀', pattern:'bl cl fl gl pl sl', tip:'两个辅音都要发音，快速滑过，中间不加元音。',
          words:[
            {w:'black',ipa:'/blæk/',zh:'黑色'},{w:'block',ipa:'/blɒk/',zh:'块；阻挡'},{w:'blue',ipa:'/bluː/',zh:'蓝色'},
            {w:'clap',ipa:'/klæp/',zh:'拍手'},{w:'class',ipa:'/klɑːs/',zh:'班级；等级'},{w:'clip',ipa:'/klɪp/',zh:'夹子；夹住'},
            {w:'flag',ipa:'/flæɡ/',zh:'旗帜'},{w:'flat',ipa:'/flæt/',zh:'平的'},{w:'fly',ipa:'/flaɪ/',zh:'飞'},
            {w:'glass',ipa:'/ɡlɑːs/',zh:'玻璃'},{w:'glad',ipa:'/ɡlæd/',zh:'高兴的'},{w:'glue',ipa:'/ɡluː/',zh:'胶水'},
            {w:'plate',ipa:'/pleɪt/',zh:'盘子'},{w:'plant',ipa:'/plɑːnt/',zh:'植物；工厂'},{w:'plug',ipa:'/plʌɡ/',zh:'插头；塞子'},
            {w:'slip',ipa:'/slɪp/',zh:'滑倒；溜'},{w:'slide',ipa:'/slaɪd/',zh:'滑动；滑梯'},{w:'slot',ipa:'/slɒt/',zh:'槽位'}
          ]},
        {id:'bl-r', title:'r 家族连缀', pattern:'br cr dr fr gr pr tr', tip:'注意卷舌，两个音都不能丢。',
          words:[
            {w:'brick',ipa:'/brɪk/',zh:'砖'},{w:'bring',ipa:'/brɪŋ/',zh:'带来'},{w:'brush',ipa:'/brʌʃ/',zh:'刷子'},
            {w:'crab',ipa:'/kræb/',zh:'螃蟹'},{w:'crane',ipa:'/kreɪn/',zh:'起重机；鹤'},{w:'crop',ipa:'/krɒp/',zh:'庄稼；裁切'},
            {w:'drum',ipa:'/drʌm/',zh:'鼓'},{w:'drink',ipa:'/drɪŋk/',zh:'喝'},{w:'drive',ipa:'/draɪv/',zh:'驾驶；驱动'},
            {w:'frog',ipa:'/frɒɡ/',zh:'青蛙'},{w:'from',ipa:'/frɒm/',zh:'从'},{w:'fruit',ipa:'/fruːt/',zh:'水果'},
            {w:'grass',ipa:'/ɡrɑːs/',zh:'草'},{w:'green',ipa:'/ɡriːn/',zh:'绿色'},{w:'grip',ipa:'/ɡrɪp/',zh:'握紧'},
            {w:'press',ipa:'/pres/',zh:'按；压'},{w:'print',ipa:'/prɪnt/',zh:'打印'},{w:'tray',ipa:'/treɪ/',zh:'托盘'},
            {w:'tree',ipa:'/triː/',zh:'树'},{w:'truck',ipa:'/trʌk/',zh:'卡车'}
          ]},
        {id:'bl-s', title:'s 家族连缀', pattern:'sc sk sm sn sp st sw', tip:'s 后轻读，不要把后面辅音读成送气音。',
          words:[
            {w:'scarf',ipa:'/skɑːf/',zh:'围巾'},{w:'scoop',ipa:'/skuːp/',zh:'勺子；舀'},
            {w:'skip',ipa:'/skɪp/',zh:'跳过'},{w:'skirt',ipa:'/skɜːt/',zh:'裙子'},{w:'sky',ipa:'/skaɪ/',zh:'天空'},
            {w:'smile',ipa:'/smaɪl/',zh:'微笑'},{w:'smoke',ipa:'/sməʊk/',zh:'烟；冒烟'},
            {w:'snack',ipa:'/snæk/',zh:'小吃'},{w:'snail',ipa:'/sneɪl/',zh:'蜗牛'},{w:'snow',ipa:'/snəʊ/',zh:'雪'},
            {w:'space',ipa:'/speɪs/',zh:'空间'},{w:'spell',ipa:'/spel/',zh:'拼写'},{w:'spot',ipa:'/spɒt/',zh:'地点；斑点'},
            {w:'star',ipa:'/stɑː/',zh:'星星'},{w:'stop',ipa:'/stɒp/',zh:'停止'},{w:'store',ipa:'/stɔː/',zh:'仓库；商店'},
            {w:'swim',ipa:'/swɪm/',zh:'游泳'},{w:'swing',ipa:'/swɪŋ/',zh:'摆动；秋千'}
          ]},
        {id:'bl-3', title:'三辅音连缀', pattern:'scr spl spr str squ', tip:'三个辅音连贯滑出，不要拆开。',
          words:[
            {w:'scream',ipa:'/skriːm/',zh:'尖叫'},{w:'screen',ipa:'/skriːn/',zh:'屏幕'},{w:'screw',ipa:'/skruː/',zh:'螺丝'},
            {w:'splash',ipa:'/splæʃ/',zh:'溅'},{w:'split',ipa:'/splɪt/',zh:'劈开；分开'},{w:'splint',ipa:'/splɪnt/',zh:'夹板'},
            {w:'spray',ipa:'/spreɪ/',zh:'喷洒'},{w:'spring',ipa:'/sprɪŋ/',zh:'春天；弹簧'},{w:'spread',ipa:'/spred/',zh:'展开'},
            {w:'strap',ipa:'/stræp/',zh:'带子；捆扎'},{w:'street',ipa:'/striːt/',zh:'街道'},{w:'strong',ipa:'/strɒŋ/',zh:'强壮的'},
            {w:'square',ipa:'/skweə/',zh:'正方形；广场'},{w:'squeeze',ipa:'/skwiːz/',zh:'挤压'},{w:'squirrel',ipa:'/ˈskwɪrəl/',zh:'松鼠'}
          ]}
      ]
    },

    /* ---------- 阶段4：Magic E ---------- */
    {
      id: 4, key: 'magic-e', name: 'Magic E',
      groups: [
        {id:'me-a', title:'Magic E：a_e', pattern:'/eɪ/', tip:'词尾哑巴 e，前面 a 读字母本身的名字 /eɪ/。',
          words:[
            {w:'cake',ipa:'/keɪk/',zh:'蛋糕'},{w:'name',ipa:'/neɪm/',zh:'名字'},{w:'tape',ipa:'/teɪp/',zh:'胶带；卷尺'},
            {w:'cape',ipa:'/keɪp/',zh:'斗篷'},{w:'gate',ipa:'/ɡeɪt/',zh:'大门'},{w:'make',ipa:'/meɪk/',zh:'制作'},
            {w:'snake',ipa:'/sneɪk/',zh:'蛇'},{w:'plate',ipa:'/pleɪt/',zh:'盘子'},{w:'crane',ipa:'/kreɪn/',zh:'起重机'},{w:'frame',ipa:'/freɪm/',zh:'框架'}
          ]},
        {id:'me-i', title:'Magic E：i_e', pattern:'/aɪ/', tip:'哑巴 e 让 i 读 /aɪ/。',
          words:[
            {w:'kite',ipa:'/kaɪt/',zh:'风筝'},{w:'five',ipa:'/faɪv/',zh:'五'},{w:'nine',ipa:'/naɪn/',zh:'九'},
            {w:'ride',ipa:'/raɪd/',zh:'骑'},{w:'side',ipa:'/saɪd/',zh:'侧面'},{w:'time',ipa:'/taɪm/',zh:'时间'},
            {w:'fine',ipa:'/faɪn/',zh:'好的；罚款'},{w:'line',ipa:'/laɪn/',zh:'线'},{w:'pipe',ipa:'/paɪp/',zh:'管子'},{w:'drive',ipa:'/draɪv/',zh:'驱动'}
          ]},
        {id:'me-o', title:'Magic E：o_e', pattern:'/əʊ/', tip:'哑巴 e 让 o 读 /əʊ/。',
          words:[
            {w:'home',ipa:'/həʊm/',zh:'家'},{w:'nose',ipa:'/nəʊz/',zh:'鼻子'},{w:'rope',ipa:'/rəʊp/',zh:'绳子'},
            {w:'stone',ipa:'/stəʊn/',zh:'石头'},{w:'note',ipa:'/nəʊt/',zh:'笔记；注意'},{w:'hole',ipa:'/həʊl/',zh:'洞'},
            {w:'pole',ipa:'/pəʊl/',zh:'杆子'},{w:'rose',ipa:'/rəʊz/',zh:'玫瑰'},{w:'vote',ipa:'/vəʊt/',zh:'投票'},{w:'close',ipa:'/kləʊz/',zh:'关闭'}
          ]},
        {id:'me-u', title:'Magic E：u_e', pattern:'/juː/', tip:'哑巴 e 让 u 读字母名 /juː/。',
          words:[
            {w:'cute',ipa:'/kjuːt/',zh:'可爱的'},{w:'tube',ipa:'/tjuːb/',zh:'管子'},{w:'tune',ipa:'/tjuːn/',zh:'曲调'},
            {w:'cube',ipa:'/kjuːb/',zh:'立方体'},{w:'fuse',ipa:'/fjuːz/',zh:'保险丝；融合'},{w:'huge',ipa:'/hjuːdʒ/',zh:'巨大的'},
            {w:'mule',ipa:'/mjuːl/',zh:'骡子'},{w:'use',ipa:'/juːz/',zh:'使用'},{w:'flute',ipa:'/fluːt/',zh:'长笛'},{w:'refuse',ipa:'/rɪˈfjuːz/',zh:'拒绝'}
          ]},
        {id:'me-e', title:'Magic E：e_e', pattern:'/iː/', tip:'哑巴 e 让前面的 e 读长音 /iː/。',
          words:[
            {w:'these',ipa:'/ðiːz/',zh:'这些'},{w:'theme',ipa:'/θiːm/',zh:'主题'},{w:'Pete',ipa:'/piːt/',zh:'皮特（人名）'},
            {w:'eve',ipa:'/iːv/',zh:'前夕'},{w:'gene',ipa:'/dʒiːn/',zh:'基因'},{w:'complete',ipa:'/kəmˈpliːt/',zh:'完成'},
            {w:'concrete',ipa:'/ˈkɒŋkriːt/',zh:'混凝土'},{w:'delete',ipa:'/dɪˈliːt/',zh:'删除'},{w:'athlete',ipa:'/ˈæθliːt/',zh:'运动员'},{w:'impede',ipa:'/ɪmˈpiːd/',zh:'妨碍'}
          ]}
      ]
    },

    /* ---------- 阶段5：长元音组合 ---------- */
    {
      id: 5, key: 'long-vowel-teams', name: '长元音组合',
      groups: [
        {id:'lv-aiay', title:'元音组合 ai / ay', pattern:'/eɪ/', tip:'“俩兄弟走路，a 说话”，a 读名，i/y 不发音。',
          words:[
            {w:'rain',ipa:'/reɪn/',zh:'雨'},{w:'train',ipa:'/treɪn/',zh:'火车'},{w:'wait',ipa:'/weɪt/',zh:'等待'},
            {w:'paint',ipa:'/peɪnt/',zh:'油漆；绘画'},{w:'tail',ipa:'/teɪl/',zh:'尾巴'},{w:'main',ipa:'/meɪn/',zh:'主要的'},
            {w:'day',ipa:'/deɪ/',zh:'天'},{w:'way',ipa:'/weɪ/',zh:'路；方式'},{w:'say',ipa:'/seɪ/',zh:'说'},
            {w:'play',ipa:'/pleɪ/',zh:'玩'},{w:'stay',ipa:'/steɪ/',zh:'停留'},{w:'tray',ipa:'/treɪ/',zh:'托盘'}
          ]},
        {id:'lv-eeea', title:'元音组合 ee / ea / y', pattern:'/iː/（词尾 y 读短 /i/）', tip:'常见长“伊”；y 在多音节词尾读轻轻的 /i/。',
          words:[
            {w:'see',ipa:'/siː/',zh:'看见'},{w:'tree',ipa:'/triː/',zh:'树'},{w:'green',ipa:'/ɡriːn/',zh:'绿色'},
            {w:'sheep',ipa:'/ʃiːp/',zh:'绵羊'},{w:'three',ipa:'/θriː/',zh:'三'},{w:'sleep',ipa:'/sliːp/',zh:'睡觉'},
            {w:'sea',ipa:'/siː/',zh:'海'},{w:'tea',ipa:'/tiː/',zh:'茶'},{w:'eat',ipa:'/iːt/',zh:'吃'},
            {w:'read',ipa:'/riːd/',zh:'读'},{w:'meat',ipa:'/miːt/',zh:'肉'},{w:'team',ipa:'/tiːm/',zh:'团队'},
            {w:'happy',ipa:'/ˈhæpi/',zh:'快乐的'},{w:'baby',ipa:'/ˈbeɪbi/',zh:'婴儿'},{w:'city',ipa:'/ˈsɪti/',zh:'城市'}
          ]},
        {id:'lv-ieigh', title:'元音组合 ie / igh', pattern:'/aɪ/', tip:'i 读名字，gh 不发音。',
          words:[
            {w:'pie',ipa:'/paɪ/',zh:'馅饼'},{w:'tie',ipa:'/taɪ/',zh:'领带；系'},{w:'die',ipa:'/daɪ/',zh:'死'},
            {w:'lie',ipa:'/laɪ/',zh:'躺；谎言'},{w:'high',ipa:'/haɪ/',zh:'高的'},{w:'night',ipa:'/naɪt/',zh:'夜晚'},
            {w:'light',ipa:'/laɪt/',zh:'光；轻的'},{w:'right',ipa:'/raɪt/',zh:'正确的；右边'},{w:'sight',ipa:'/saɪt/',zh:'视线'},
            {w:'tight',ipa:'/taɪt/',zh:'紧的'},{w:'bright',ipa:'/braɪt/',zh:'明亮的'},{w:'flight',ipa:'/flaɪt/',zh:'航班；飞行'}
          ]},
        {id:'lv-oaowoe', title:'元音组合 oa / ow / oe', pattern:'/əʊ/', tip:'o 读名字。',
          words:[
            {w:'boat',ipa:'/bəʊt/',zh:'船'},{w:'coat',ipa:'/kəʊt/',zh:'外套'},{w:'road',ipa:'/rəʊd/',zh:'道路'},
            {w:'soap',ipa:'/səʊp/',zh:'肥皂'},{w:'float',ipa:'/fləʊt/',zh:'漂浮'},{w:'goal',ipa:'/ɡəʊl/',zh:'目标；球门'},
            {w:'snow',ipa:'/snəʊ/',zh:'雪'},{w:'low',ipa:'/ləʊ/',zh:'低的'},{w:'grow',ipa:'/ɡrəʊ/',zh:'生长'},
            {w:'yellow',ipa:'/ˈjeləʊ/',zh:'黄色'},{w:'window',ipa:'/ˈwɪndəʊ/',zh:'窗户'},{w:'bowl',ipa:'/bəʊl/',zh:'碗'},
            {w:'toe',ipa:'/təʊ/',zh:'脚趾'},{w:'goes',ipa:'/ɡəʊz/',zh:'去（三单）'},{w:'oboe',ipa:'/ˈəʊbəʊ/',zh:'双簧管'}
          ]},
        {id:'lv-ueewoo', title:'元音组合 ue / ew / oo', pattern:'/uː/', tip:'长“乌”。',
          words:[
            {w:'blue',ipa:'/bluː/',zh:'蓝色'},{w:'true',ipa:'/truː/',zh:'真的'},{w:'glue',ipa:'/ɡluː/',zh:'胶水'},{w:'clue',ipa:'/kluː/',zh:'线索'},
            {w:'new',ipa:'/njuː/',zh:'新的'},{w:'few',ipa:'/fjuː/',zh:'几个'},{w:'grew',ipa:'/ɡruː/',zh:'成长（过去式）'},
            {w:'flew',ipa:'/fluː/',zh:'飞（过去式）'},{w:'chew',ipa:'/tʃuː/',zh:'咀嚼'},{w:'stew',ipa:'/stjuː/',zh:'炖'},
            {w:'moon',ipa:'/muːn/',zh:'月亮'},{w:'food',ipa:'/fuːd/',zh:'食物'},{w:'school',ipa:'/skuːl/',zh:'学校'},
            {w:'room',ipa:'/ruːm/',zh:'房间'},{w:'zoo',ipa:'/zuː/',zh:'动物园'},{w:'spoon',ipa:'/spuːn/',zh:'勺子'},{w:'cool',ipa:'/kuːl/',zh:'凉爽'}
          ]},
        {id:'lv-eightey', title:'元音组合 eigh / ey', pattern:'/eɪ/', tip:'gh 不发音；convey（输送）就在这一组。',
          words:[
            {w:'eight',ipa:'/eɪt/',zh:'八'},{w:'weigh',ipa:'/weɪ/',zh:'称重'},{w:'weight',ipa:'/weɪt/',zh:'重量'},
            {w:'neighbor',ipa:'/ˈneɪbə/',zh:'邻居'},{w:'eighteen',ipa:'/eɪˈtiːn/',zh:'十八'},{w:'sleigh',ipa:'/sleɪ/',zh:'雪橇'},
            {w:'they',ipa:'/ðeɪ/',zh:'他们'},{w:'grey',ipa:'/ɡreɪ/',zh:'灰色'},{w:'obey',ipa:'/əˈbeɪ/',zh:'遵守'},
            {w:'hey',ipa:'/heɪ/',zh:'嘿'},{w:'prey',ipa:'/preɪ/',zh:'猎物'},{w:'convey',ipa:'/kənˈveɪ/',zh:'输送；传送'}
          ]}
      ]
    },

    /* ---------- 阶段6：复合元音 & r 控制音 ---------- */
    {
      id: 6, key: 'diphthongs-r', name: '复合元音 & r 音',
      groups: [
        {id:'rv-ooshort', title:'oo 短音', pattern:'/ʊ/ 如 book', tip:'短促放松的“乌”。',
          words:[
            {w:'book',ipa:'/bʊk/',zh:'书'},{w:'look',ipa:'/lʊk/',zh:'看'},{w:'cook',ipa:'/kʊk/',zh:'做饭'},
            {w:'foot',ipa:'/fʊt/',zh:'脚'},{w:'good',ipa:'/ɡʊd/',zh:'好的'},{w:'wood',ipa:'/wʊd/',zh:'木头'},
            {w:'wool',ipa:'/wʊl/',zh:'羊毛'},{w:'hook',ipa:'/hʊk/',zh:'钩子'},{w:'stood',ipa:'/stʊd/',zh:'站立（过去式）'},{w:'shook',ipa:'/ʃʊk/',zh:'摇晃（过去式）'}
          ]},
        {id:'rv-ouow', title:'ou / ow', pattern:'/aʊ/', tip:'从 /a/ 滑向 /ʊ/，“奥”。',
          words:[
            {w:'out',ipa:'/aʊt/',zh:'外面'},{w:'house',ipa:'/haʊs/',zh:'房子'},{w:'mouth',ipa:'/maʊθ/',zh:'嘴'},
            {w:'cloud',ipa:'/klaʊd/',zh:'云'},{w:'loud',ipa:'/laʊd/',zh:'大声的'},{w:'south',ipa:'/saʊθ/',zh:'南方'},
            {w:'cow',ipa:'/kaʊ/',zh:'奶牛'},{w:'how',ipa:'/haʊ/',zh:'怎样'},{w:'now',ipa:'/naʊ/',zh:'现在'},
            {w:'down',ipa:'/daʊn/',zh:'向下'},{w:'brown',ipa:'/braʊn/',zh:'棕色'},{w:'town',ipa:'/taʊn/',zh:'城镇'}
          ]},
        {id:'rv-oioy', title:'oi / oy', pattern:'/ɔɪ/', tip:'“奥伊”。',
          words:[
            {w:'oil',ipa:'/ɔɪl/',zh:'油'},{w:'coin',ipa:'/kɔɪn/',zh:'硬币'},{w:'join',ipa:'/dʒɔɪn/',zh:'加入'},
            {w:'point',ipa:'/pɔɪnt/',zh:'点；要点'},{w:'noise',ipa:'/nɔɪz/',zh:'噪音'},{w:'voice',ipa:'/vɔɪs/',zh:'声音'},
            {w:'choice',ipa:'/tʃɔɪs/',zh:'选择'},{w:'boil',ipa:'/bɔɪl/',zh:'煮沸'},
            {w:'boy',ipa:'/bɔɪ/',zh:'男孩'},{w:'toy',ipa:'/tɔɪ/',zh:'玩具'},{w:'joy',ipa:'/dʒɔɪ/',zh:'喜悦'},
            {w:'enjoy',ipa:'/ɪnˈdʒɔɪ/',zh:'享受'},{w:'destroy',ipa:'/dɪˈstrɔɪ/',zh:'破坏'},{w:'royal',ipa:'/ˈrɔɪəl/',zh:'皇家的'}
          ]},
        {id:'rv-auawal', title:'au / aw / al', pattern:'/ɔː/', tip:'长“奥”，嘴张圆。',
          words:[
            {w:'August',ipa:'/ˈɔːɡəst/',zh:'八月'},{w:'autumn',ipa:'/ˈɔːtəm/',zh:'秋天'},{w:'author',ipa:'/ˈɔːθə/',zh:'作者'},
            {w:'because',ipa:'/bɪˈkɒz/',zh:'因为'},{w:'sauce',ipa:'/sɔːs/',zh:'酱汁'},{w:'launch',ipa:'/lɔːntʃ/',zh:'启动；发射'},
            {w:'saw',ipa:'/sɔː/',zh:'看见（过去式）'},{w:'draw',ipa:'/drɔː/',zh:'画'},{w:'law',ipa:'/lɔː/',zh:'法律'},
            {w:'raw',ipa:'/rɔː/',zh:'生的'},{w:'yawn',ipa:'/jɔːn/',zh:'打哈欠'},{w:'awful',ipa:'/ˈɔːfl/',zh:'糟糕的'},
            {w:'wall',ipa:'/wɔːl/',zh:'墙'},{w:'tall',ipa:'/tɔːl/',zh:'高的'},{w:'walk',ipa:'/wɔːk/',zh:'走路'},{w:'always',ipa:'/ˈɔːlweɪz/',zh:'总是'}
          ]},
        {id:'rv-ar', title:'r 控制：ar', pattern:'/ɑː/', tip:'卷舌的“啊”。',
          words:[
            {w:'car',ipa:'/kɑː/',zh:'汽车'},{w:'far',ipa:'/fɑː/',zh:'远的'},{w:'star',ipa:'/stɑː/',zh:'星星'},{w:'park',ipa:'/pɑːk/',zh:'公园；停车'},
            {w:'dark',ipa:'/dɑːk/',zh:'黑暗的'},{w:'hard',ipa:'/hɑːd/',zh:'硬的；困难的'},{w:'arm',ipa:'/ɑːm/',zh:'手臂'},
            {w:'farm',ipa:'/fɑːm/',zh:'农场'},{w:'yard',ipa:'/jɑːd/',zh:'院子；码'},{w:'start',ipa:'/stɑːt/',zh:'开始'},{w:'smart',ipa:'/smɑːt/',zh:'聪明的'}
          ]},
        {id:'rv-or', title:'r 控制：or', pattern:'/ɔː/', tip:'卷舌的“奥”。',
          words:[
            {w:'for',ipa:'/fɔː/',zh:'为了'},{w:'short',ipa:'/ʃɔːt/',zh:'短的'},{w:'sport',ipa:'/spɔːt/',zh:'运动'},{w:'north',ipa:'/nɔːθ/',zh:'北方'},
            {w:'fork',ipa:'/fɔːk/',zh:'叉子；分叉点'},{w:'born',ipa:'/bɔːn/',zh:'出生'},{w:'corn',ipa:'/kɔːn/',zh:'玉米'},
            {w:'horse',ipa:'/hɔːs/',zh:'马'},{w:'morning',ipa:'/ˈmɔːnɪŋ/',zh:'早晨'},{w:'order',ipa:'/ˈɔːdə/',zh:'顺序；命令'}
          ]},
        {id:'rv-erirur', title:'r 控制：er / ir / ur', pattern:'/ɜː/', tip:'三种拼写一个音，卷舌长音。',
          words:[
            {w:'her',ipa:'/hɜː/',zh:'她的'},{w:'term',ipa:'/tɜːm/',zh:'术语；学期'},{w:'person',ipa:'/ˈpɜːsn/',zh:'人'},{w:'under',ipa:'/ˈʌndə/',zh:'在……下面'},
            {w:'bird',ipa:'/bɜːd/',zh:'鸟'},{w:'girl',ipa:'/ɡɜːl/',zh:'女孩'},{w:'first',ipa:'/fɜːst/',zh:'第一'},{w:'third',ipa:'/θɜːd/',zh:'第三'},
            {w:'shirt',ipa:'/ʃɜːt/',zh:'衬衫'},{w:'skirt',ipa:'/skɜːt/',zh:'裙子'},{w:'circle',ipa:'/ˈsɜːkl/',zh:'圆圈'},
            {w:'turn',ipa:'/tɜːn/',zh:'转动'},{w:'burn',ipa:'/bɜːn/',zh:'燃烧'},{w:'hurt',ipa:'/hɜːt/',zh:'伤害'},{w:'nurse',ipa:'/nɜːs/',zh:'护士'},{w:'return',ipa:'/rɪˈtɜːn/',zh:'返回'}
          ]},
        {id:'rv-areair', title:'are / air', pattern:'/eə/', tip:'“艾尔”。',
          words:[
            {w:'care',ipa:'/keə/',zh:'关心；小心'},{w:'share',ipa:'/ʃeə/',zh:'分享'},{w:'stare',ipa:'/steə/',zh:'盯着看'},{w:'square',ipa:'/skweə/',zh:'正方形'},
            {w:'prepare',ipa:'/prɪˈpeə/',zh:'准备'},{w:'compare',ipa:'/kəmˈpeə/',zh:'比较'},{w:'spare',ipa:'/speə/',zh:'备用的'},
            {w:'hair',ipa:'/heə/',zh:'头发'},{w:'pair',ipa:'/peə/',zh:'一对'},{w:'chair',ipa:'/tʃeə/',zh:'椅子'},{w:'stair',ipa:'/steə/',zh:'楼梯'},{w:'airport',ipa:'/ˈeəpɔːt/',zh:'机场'}
          ]},
        {id:'rv-eareer', title:'ear / eer', pattern:'/ɪə/', tip:'“伊尔”。',
          words:[
            {w:'ear',ipa:'/ɪə/',zh:'耳朵'},{w:'dear',ipa:'/dɪə/',zh:'亲爱的'},{w:'near',ipa:'/nɪə/',zh:'近的'},{w:'hear',ipa:'/hɪə/',zh:'听见'},
            {w:'clear',ipa:'/klɪə/',zh:'清楚的'},{w:'year',ipa:'/jɪə/',zh:'年'},{w:'appear',ipa:'/əˈpɪə/',zh:'出现'},{w:'engineer',ipa:'/ˌendʒɪˈnɪə/',zh:'工程师'},
            {w:'deer',ipa:'/dɪə/',zh:'鹿'},{w:'beer',ipa:'/bɪə/',zh:'啤酒'},{w:'cheer',ipa:'/tʃɪə/',zh:'欢呼'},{w:'career',ipa:'/kəˈrɪə/',zh:'职业'},{w:'volunteer',ipa:'/ˌvɒlənˈtɪə/',zh:'志愿者'}
          ]},
        {id:'rv-oreoar', title:'ore / oar', pattern:'/ɔː/', tip:'卷舌长“奥”。',
          words:[
            {w:'more',ipa:'/mɔː/',zh:'更多'},{w:'store',ipa:'/stɔː/',zh:'仓库；商店'},{w:'before',ipa:'/bɪˈfɔː/',zh:'在……之前'},{w:'score',ipa:'/skɔː/',zh:'得分'},
            {w:'shore',ipa:'/ʃɔː/',zh:'岸边'},{w:'core',ipa:'/kɔː/',zh:'核心'},{w:'ignore',ipa:'/ɪɡˈnɔː/',zh:'忽视'},
            {w:'board',ipa:'/bɔːd/',zh:'板；董事会'},{w:'roar',ipa:'/rɔː/',zh:'吼叫'},{w:'coarse',ipa:'/kɔːs/',zh:'粗糙的'},{w:'hoarse',ipa:'/hɔːs/',zh:'沙哑的'},{w:'keyboard',ipa:'/ˈkiːbɔːd/',zh:'键盘'}
          ]},
        {id:'rv-schwa', title:'弱读 schwa', pattern:'/ə/ 如 about', tip:'英语最高频的音：轻读、含糊、最短的“呃”。',
          words:[
            {w:'about',ipa:'/əˈbaʊt/',zh:'关于'},{w:'above',ipa:'/əˈbʌv/',zh:'在……上面'},{w:'again',ipa:'/əˈɡen/',zh:'再次'},{w:'around',ipa:'/əˈraʊnd/',zh:'周围'},
            {w:'away',ipa:'/əˈweɪ/',zh:'离开'},{w:'sofa',ipa:'/ˈsəʊfə/',zh:'沙发'},{w:'china',ipa:'/ˈtʃaɪnə/',zh:'瓷器；中国'},{w:'panda',ipa:'/ˈpændə/',zh:'熊猫'},
            {w:'banana',ipa:'/bəˈnɑːnə/',zh:'香蕉'},{w:'support',ipa:'/səˈpɔːt/',zh:'支撑；支持'},{w:'supply',ipa:'/səˈplaɪ/',zh:'供应'},{w:'machine',ipa:'/məˈʃiːn/',zh:'机器'}
          ]}
      ]
    },

    /* ---------- 阶段7：特殊拼写模式 ---------- */
    {
      id: 7, key: 'special-patterns', name: '特殊拼写',
      groups: [
        {id:'sp-softcg', title:'软音 c / g', pattern:'city / gym', tip:'c/g 后接 e/i/y 时发软音 /s/ /dʒ/。',
          words:[
            {w:'city',ipa:'/ˈsɪti/',zh:'城市'},{w:'face',ipa:'/feɪs/',zh:'脸'},{w:'cent',ipa:'/sent/',zh:'分（钱）'},{w:'ice',ipa:'/aɪs/',zh:'冰'},
            {w:'nice',ipa:'/naɪs/',zh:'好的'},{w:'pencil',ipa:'/ˈpensl/',zh:'铅笔'},{w:'space',ipa:'/speɪs/',zh:'空间'},{w:'force',ipa:'/fɔːs/',zh:'力量'},
            {w:'gym',ipa:'/dʒɪm/',zh:'健身房'},{w:'giraffe',ipa:'/dʒəˈrɑːf/',zh:'长颈鹿'},{w:'gentle',ipa:'/ˈdʒentl/',zh:'温和的'},{w:'giant',ipa:'/ˈdʒaɪənt/',zh:'巨大的'},
            {w:'page',ipa:'/peɪdʒ/',zh:'页'},{w:'orange',ipa:'/ˈɒrɪndʒ/',zh:'橙子'},{w:'huge',ipa:'/hjuːdʒ/',zh:'巨大的'},{w:'bridge',ipa:'/brɪdʒ/',zh:'桥'}
          ]},
        {id:'sp-dgetch', title:'dge / tch', pattern:'/dʒ/ /tʃ/', tip:'短元音后的加固拼写。',
          words:[
            {w:'bridge',ipa:'/brɪdʒ/',zh:'桥'},{w:'edge',ipa:'/edʒ/',zh:'边缘'},{w:'judge',ipa:'/dʒʌdʒ/',zh:'判断；法官'},{w:'badge',ipa:'/bædʒ/',zh:'徽章'},
            {w:'lodge',ipa:'/lɒdʒ/',zh:'小屋；暂住'},{w:'fridge',ipa:'/frɪdʒ/',zh:'冰箱'},
            {w:'watch',ipa:'/wɒtʃ/',zh:'手表；看'},{w:'catch',ipa:'/kætʃ/',zh:'抓住'},{w:'match',ipa:'/mætʃ/',zh:'比赛；匹配'},{w:'patch',ipa:'/pætʃ/',zh:'补丁'},
            {w:'kitchen',ipa:'/ˈkɪtʃɪn/',zh:'厨房'},{w:'fetch',ipa:'/fetʃ/',zh:'取来'},{w:'switch',ipa:'/swɪtʃ/',zh:'开关'}
          ]},
        {id:'sp-le', title:'词尾 -le', pattern:'/-l/', tip:'词尾的“呃欧”，和前面的辅音拼成一个音节。',
          words:[
            {w:'apple',ipa:'/ˈæpl/',zh:'苹果'},{w:'table',ipa:'/ˈteɪbl/',zh:'桌子'},{w:'little',ipa:'/ˈlɪtl/',zh:'小的'},{w:'middle',ipa:'/ˈmɪdl/',zh:'中间'},
            {w:'uncle',ipa:'/ˈʌŋkl/',zh:'叔叔'},{w:'bottle',ipa:'/ˈbɒtl/',zh:'瓶子'},{w:'circle',ipa:'/ˈsɜːkl/',zh:'圆圈'},{w:'people',ipa:'/ˈpiːpl/',zh:'人们'},
            {w:'simple',ipa:'/ˈsɪmpl/',zh:'简单的'},{w:'example',ipa:'/ɪɡˈzɑːmpl/',zh:'例子'}
          ]},
        {id:'sp-silent', title:'哑音字母', pattern:'kn wr mb gn', tip:'看得见，读不出。',
          words:[
            {w:'knee',ipa:'/niː/',zh:'膝盖'},{w:'knife',ipa:'/naɪf/',zh:'刀'},{w:'knock',ipa:'/nɒk/',zh:'敲'},{w:'know',ipa:'/nəʊ/',zh:'知道'},{w:'knot',ipa:'/nɒt/',zh:'绳结'},{w:'knight',ipa:'/naɪt/',zh:'骑士'},
            {w:'write',ipa:'/raɪt/',zh:'写'},{w:'wrong',ipa:'/rɒŋ/',zh:'错误的'},{w:'wrap',ipa:'/ræp/',zh:'包裹'},{w:'wrist',ipa:'/rɪst/',zh:'手腕'},
            {w:'lamb',ipa:'/læm/',zh:'羊羔'},{w:'climb',ipa:'/klaɪm/',zh:'攀爬'},{w:'thumb',ipa:'/θʌm/',zh:'拇指'},{w:'bomb',ipa:'/bɒm/',zh:'炸弹'},{w:'comb',ipa:'/kəʊm/',zh:'梳子'},{w:'plumber',ipa:'/ˈplʌmə/',zh:'水管工'},
            {w:'sign',ipa:'/saɪn/',zh:'标志；签名'},{w:'design',ipa:'/dɪˈzaɪn/',zh:'设计'},{w:'foreign',ipa:'/ˈfɒrən/',zh:'外国的'}
          ]},
        {id:'sp-tion', title:'后缀 -tion / -sion', pattern:'/ʃn/ /ʒn/', tip:'高频名词尾巴，现场文件里到处都是。',
          words:[
            {w:'station',ipa:'/ˈsteɪʃn/',zh:'车站；工位'},{w:'action',ipa:'/ˈækʃn/',zh:'行动'},{w:'nation',ipa:'/ˈneɪʃn/',zh:'国家'},{w:'motion',ipa:'/ˈməʊʃn/',zh:'运动'},
            {w:'section',ipa:'/ˈsekʃn/',zh:'部分；截面'},{w:'position',ipa:'/pəˈzɪʃn/',zh:'位置'},{w:'installation',ipa:'/ˌɪnstəˈleɪʃn/',zh:'安装'},{w:'inspection',ipa:'/ɪnˈspekʃn/',zh:'检验'},
            {w:'specification',ipa:'/ˌspesɪfɪˈkeɪʃn/',zh:'规格说明'},
            {w:'vision',ipa:'/ˈvɪʒn/',zh:'视野'},{w:'decision',ipa:'/dɪˈsɪʒn/',zh:'决定'},{w:'version',ipa:'/ˈvɜːʒn/',zh:'版本'},{w:'television',ipa:'/ˈtelɪvɪʒn/',zh:'电视'},{w:'conclusion',ipa:'/kənˈkluːʒn/',zh:'结论'},{w:'occasion',ipa:'/əˈkeɪʒn/',zh:'场合'}
          ]},
        {id:'sp-eds', title:'-ed 三音 / -s 三音', pattern:'/t/ /d/ /ɪd/；/s/ /z/ /ɪz/', tip:'清辅音后读 /t/、浊音后读 /d/、t/d 后读 /ɪd/；复数同理 /s/ /z/ /ɪz/。',
          words:[
            {w:'stopped',ipa:'/stɒpt/',zh:'停止（/t/）'},{w:'washed',ipa:'/wɒʃt/',zh:'洗（/t/）'},{w:'missed',ipa:'/mɪst/',zh:'错过（/t/）'},
            {w:'played',ipa:'/pleɪd/',zh:'玩（/d/）'},{w:'cleaned',ipa:'/kliːnd/',zh:'清洁（/d/）'},{w:'moved',ipa:'/muːvd/',zh:'移动（/d/）'},
            {w:'wanted',ipa:'/ˈwɒntɪd/',zh:'想要（/ɪd/）'},{w:'needed',ipa:'/ˈniːdɪd/',zh:'需要（/ɪd/）'},{w:'lifted',ipa:'/ˈlɪftɪd/',zh:'抬起（/ɪd/）'},
            {w:'cats',ipa:'/kæts/',zh:'猫（/s/）'},{w:'books',ipa:'/bʊks/',zh:'书（/s/）'},{w:'dogs',ipa:'/dɒɡz/',zh:'狗（/z/）'},
            {w:'pens',ipa:'/penz/',zh:'钢笔（/z/）'},{w:'buses',ipa:'/ˈbʌsɪz/',zh:'公交（/ɪz/）'},{w:'boxes',ipa:'/ˈbɒksɪz/',zh:'盒子（/ɪz/）'},{w:'watches',ipa:'/ˈwɒtʃɪz/',zh:'手表（/ɪz/）'}
          ]}
      ]
    }
  ],

  /* 不规则高频词（不进熟读规则组，直接进磨耳朵硬听） */
  tricky: [
    {w:'the',ipa:'/ðə/',zh:'这个（定冠词）'},{w:'of',ipa:'/əv/',zh:'……的'},{w:'to',ipa:'/tə/',zh:'到；向'},
    {w:'and',ipa:'/ænd/',zh:'和'},{w:'is',ipa:'/ɪz/',zh:'是'},{w:'are',ipa:'/ɑː/',zh:'是'},
    {w:'was',ipa:'/wɒz/',zh:'是（过去）'},{w:'were',ipa:'/wɜː/',zh:'是（过去复数）'},{w:'said',ipa:'/sed/',zh:'说（过去）'},
    {w:'says',ipa:'/sez/',zh:'说（三单）'},{w:'have',ipa:'/hæv/',zh:'有'},{w:'has',ipa:'/hæz/',zh:'有（三单）'},
    {w:'had',ipa:'/hæd/',zh:'有（过去）'},{w:'do',ipa:'/duː/',zh:'做'},{w:'does',ipa:'/dʌz/',zh:'做（三单）'},
    {w:'done',ipa:'/dʌn/',zh:'做（过去分词）'},{w:'go',ipa:'/ɡəʊ/',zh:'去'},{w:'goes',ipa:'/ɡəʊz/',zh:'去（三单）'},
    {w:'gone',ipa:'/ɡɒn/',zh:'去（过去分词）'},{w:'come',ipa:'/kʌm/',zh:'来'},{w:'some',ipa:'/sʌm/',zh:'一些'},
    {w:'from',ipa:'/frɒm/',zh:'从'},{w:'love',ipa:'/lʌv/',zh:'爱'},{w:'give',ipa:'/ɡɪv/',zh:'给'},
    {w:'live',ipa:'/lɪv/',zh:'居住'},{w:'many',ipa:'/ˈmeni/',zh:'许多'},{w:'any',ipa:'/ˈeni/',zh:'任何'},
    {w:'only',ipa:'/ˈəʊnli/',zh:'只'},{w:'once',ipa:'/wʌns/',zh:'一次'},{w:'one',ipa:'/wʌn/',zh:'一'},
    {w:'two',ipa:'/tuː/',zh:'二'},{w:'four',ipa:'/fɔː/',zh:'四'},{w:'eight',ipa:'/eɪt/',zh:'八'},
    {w:'could',ipa:'/kʊd/',zh:'能（过去）'},{w:'would',ipa:'/wʊd/',zh:'将；会'},{w:'should',ipa:'/ʃʊd/',zh:'应该'},
    {w:'people',ipa:'/ˈpiːpl/',zh:'人们'},{w:'friend',ipa:'/frend/',zh:'朋友'},{w:'because',ipa:'/bɪˈkɒz/',zh:'因为'},
    {w:'beautiful',ipa:'/ˈbjuːtɪfl/',zh:'美丽的'},{w:'busy',ipa:'/ˈbɪzi/',zh:'忙的'},{w:'build',ipa:'/bɪld/',zh:'建造'},
    {w:'built',ipa:'/bɪlt/',zh:'建造（过去）'},{w:'bought',ipa:'/bɔːt/',zh:'买（过去）'},{w:'brought',ipa:'/brɔːt/',zh:'带来（过去）'},
    {w:'thought',ipa:'/θɔːt/',zh:'想（过去）'},{w:'caught',ipa:'/kɔːt/',zh:'抓住（过去）'},{w:'taught',ipa:'/tɔːt/',zh:'教（过去）'},
    {w:'through',ipa:'/θruː/',zh:'穿过'},{w:'though',ipa:'/ðəʊ/',zh:'虽然'},{w:'although',ipa:'/ɔːlˈðəʊ/',zh:'尽管'},
    {w:'enough',ipa:'/ɪˈnʌf/',zh:'足够'},{w:'tough',ipa:'/tʌf/',zh:'坚硬的'},{w:'laugh',ipa:'/lɑːf/',zh:'笑'},
    {w:'eye',ipa:'/aɪ/',zh:'眼睛'},{w:'head',ipa:'/hed/',zh:'头'},{w:'bread',ipa:'/bred/',zh:'面包'},
    {w:'break',ipa:'/breɪk/',zh:'打破'},{w:'great',ipa:'/ɡreɪt/',zh:'伟大的'},{w:'steak',ipa:'/steɪk/',zh:'牛排'},
    {w:'heart',ipa:'/hɑːt/',zh:'心'},{w:'learn',ipa:'/lɜːn/',zh:'学习'},{w:'early',ipa:'/ˈɜːli/',zh:'早的'},
    {w:'earth',ipa:'/ɜːθ/',zh:'地球'},{w:'heard',ipa:'/hɜːd/',zh:'听见（过去）'},{w:'word',ipa:'/wɜːd/',zh:'单词'},
    {w:'work',ipa:'/wɜːk/',zh:'工作'},{w:'world',ipa:'/wɜːld/',zh:'世界'},{w:'your',ipa:'/jɔː/',zh:'你的'},
    {w:'door',ipa:'/dɔː/',zh:'门'},{w:'floor',ipa:'/flɔː/',zh:'地板'},{w:'poor',ipa:'/pʊə/',zh:'穷的'},
    {w:'sure',ipa:'/ʃʊə/',zh:'确定'},{w:'who',ipa:'/huː/',zh:'谁'},{w:'whom',ipa:'/huːm/',zh:'谁（宾格）'},
    {w:'whose',ipa:'/huːz/',zh:'谁的'},{w:'whole',ipa:'/həʊl/',zh:'整个'},{w:'answer',ipa:'/ˈɑːnsə/',zh:'回答'},
    {w:'listen',ipa:'/ˈlɪsn/',zh:'听'},{w:'often',ipa:'/ˈɒfn/',zh:'经常'},{w:'island',ipa:'/ˈaɪlənd/',zh:'岛屿'},
    {w:'there',ipa:'/ðeə/',zh:'那里'},{w:'here',ipa:'/hɪə/',zh:'这里'}
  ]
};

/* 工具：拍平所有已填充词（磨耳朵 M1 数据源，自动去重） */
window.PHONICS.allWords = (function () {
  const seen = new Set();
  const out = [];
  window.PHONICS.stages.forEach(function (st) {
    st.groups.forEach(function (g) {
      g.words.forEach(function (item) {
        const key = item.w.toLowerCase();
        if (!seen.has(key)) { seen.add(key); out.push(item); }
      });
    });
  });
  return out;
})();
