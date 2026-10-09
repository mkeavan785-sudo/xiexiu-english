/* ============================================================
   邪修英语 · 拼读速听数据 data-blends.js
   外国孩子学自然拼读的 1/2/3 字母组合清单。
   播法三层（内嵌两遍）：
     字母名 → 组合自然发音（"sh as in ship"：sh，如 ship 里的音）
     → 例词强化
   sound 字段 = 组合与自然发音的搭配（画面展示）；
   say 字段 = TTS 文本（音频按此生成，一条含两遍）。
   1 字母与 Magic E 无独立音素搭配，say 为字母名+例词。
   ============================================================ */
window.BLENDS = {
  list: [
    /* ---- 1 字母：短元音代表 ---- */
    {c:'A',  word:'apple', zh:'苹果', say:'A. Apple. A. Apple.'},
    {c:'E',  word:'egg',   zh:'鸡蛋', say:'E. Egg. E. Egg.'},
    {c:'I',  word:'ink',   zh:'墨水', say:'I. Ink. I. Ink.'},
    {c:'O',  word:'ox',    zh:'公牛', say:'O. Ox. O. Ox.'},
    {c:'U',  word:'up',    zh:'向上', say:'U. Up. U. Up.'},

    /* ---- 2 字母：辅音组合 ---- */
    {c:'SH', sound:'sh as in ship',   word:'ship',  zh:'轮船', say:'S, H. Sh as in ship. Ship. S, H. Sh as in ship. Ship.'},
    {c:'CH', sound:'ch as in chair',  word:'chair', zh:'椅子', say:'C, H. Ch as in chair. Chair. C, H. Ch as in chair. Chair.'},
    {c:'TH', sound:'th as in think',  word:'think', zh:'想（清音）', say:'T, H. Th as in think. Think. T, H. Th as in think. Think.'},
    {c:'TH', sound:'th as in this',   word:'this',  zh:'这个（浊音）', say:'T, H. Th as in this. This. T, H. Th as in this. This.'},
    {c:'CK', sound:'ck as in duck',   word:'duck',  zh:'鸭子', say:'C, K. Ck as in duck. Duck. C, K. Ck as in duck. Duck.'},
    {c:'NG', sound:'ng as in ring',   word:'ring',  zh:'戒指', say:'N, G. Ng as in ring. Ring. N, G. Ng as in ring. Ring.'},
    {c:'QU', sound:'qu as in queen',  word:'queen', zh:'女王', say:'Q, U. Qu as in queen. Queen. Q, U. Qu as in queen. Queen.'},
    {c:'WH', sound:'wh as in wheel',  word:'wheel', zh:'轮子', say:'W, H. Wh as in wheel. Wheel. W, H. Wh as in wheel. Wheel.'},
    {c:'PH', sound:'ph as in phone',  word:'phone', zh:'电话', say:'P, H. Ph as in phone. Phone. P, H. Ph as in phone. Phone.'},

    /* ---- 2 字母：元音组合 ---- */
    {c:'EE', sound:'ee as in see',    word:'see',   zh:'看见', say:'E, E. Ee as in see. See. E, E. Ee as in see. See.'},
    {c:'EA', sound:'ea as in sea',    word:'sea',   zh:'大海', say:'E, A. Ea as in sea. Sea. E, A. Ea as in sea. Sea.'},
    {c:'AI', sound:'ai as in rain',   word:'rain',  zh:'下雨', say:'A, I. Ai as in rain. Rain. A, I. Ai as in rain. Rain.'},
    {c:'AY', sound:'ay as in play',   word:'play',  zh:'玩', say:'A, Y. Ay as in play. Play. A, Y. Ay as in play. Play.'},
    {c:'OO', sound:'oo as in moon',   word:'moon',  zh:'月亮（长音）', say:'O, O. Oo as in moon. Moon. O, O. Oo as in moon. Moon.'},
    {c:'OO', sound:'oo as in book',   word:'book',  zh:'书（短音）', say:'O, O. Oo as in book. Book. O, O. Oo as in book. Book.'},
    {c:'OW', sound:'ow as in cow',    word:'cow',   zh:'奶牛', say:'O, W. Ow as in cow. Cow. O, W. Ow as in cow. Cow.'},
    {c:'OW', sound:'ow as in snow',   word:'snow',  zh:'雪', say:'O, W. Ow as in snow. Snow. O, W. Ow as in snow. Snow.'},
    {c:'OU', sound:'ou as in mouse',  word:'mouse', zh:'老鼠', say:'O, U. Ou as in mouse. Mouse. O, U. Ou as in mouse. Mouse.'},
    {c:'OI', sound:'oi as in coin',   word:'coin',  zh:'硬币', say:'O, I. Oi as in coin. Coin. O, I. Oi as in coin. Coin.'},
    {c:'OY', sound:'oy as in toy',    word:'toy',   zh:'玩具', say:'O, Y. Oy as in toy. Toy. O, Y. Oy as in toy. Toy.'},
    {c:'AR', sound:'ar as in car',    word:'car',   zh:'汽车', say:'A, R. Ar as in car. Car. A, R. Ar as in car. Car.'},
    {c:'OR', sound:'or as in fork',   word:'fork',  zh:'叉子', say:'O, R. Or as in fork. Fork. O, R. Or as in fork. Fork.'},
    {c:'ER', sound:'er as in her',    word:'her',   zh:'她的', say:'E, R. Er as in her. Her. E, R. Er as in her. Her.'},
    {c:'IR', sound:'ir as in bird',   word:'bird',  zh:'鸟', say:'I, R. Ir as in bird. Bird. I, R. Ir as in bird. Bird.'},
    {c:'UR', sound:'ur as in nurse',  word:'nurse', zh:'护士', say:'U, R. Ur as in nurse. Nurse. U, R. Ur as in nurse. Nurse.'},
    {c:'AW', sound:'aw as in paw',    word:'paw',   zh:'爪子', say:'A, W. Aw as in paw. Paw. A, W. Aw as in paw. Paw.'},
    {c:'EW', sound:'ew as in new',    word:'new',   zh:'新的', say:'E, W. Ew as in new. New. E, W. Ew as in new. New.'},

    /* ---- Magic E：元音+E 不发音，元音读本音 ---- */
    {c:'A-E', word:'cake', zh:'蛋糕', say:'A, E. Cake. A, E. Cake.'},
    {c:'I-E', word:'bike', zh:'自行车', say:'I, E. Bike. I, E. Bike.'},
    {c:'O-E', word:'home', zh:'家', say:'O, E. Home. O, E. Home.'},
    {c:'U-E', word:'cute', zh:'可爱', say:'U, E. Cute. U, E. Cute.'},

    /* ---- 3 字母组合 ---- */
    {c:'OUT', word:'out',   zh:'出去', say:'O, U, T. Out. O, U, T. Out.'},
    {c:'TCH', sound:'tch as in catch',  word:'catch', zh:'抓住', say:'T, C, H. Tch as in catch. Catch. T, C, H. Tch as in catch. Catch.'},
    {c:'DGE', sound:'dge as in bridge', word:'bridge',zh:'桥', say:'D, G, E. Dge as in bridge. Bridge. D, G, E. Dge as in bridge. Bridge.'},
    {c:'IGH', sound:'igh as in high',   word:'high',  zh:'高的', say:'I, G, H. Igh as in high. High. I, G, H. Igh as in high. High.'},
    {c:'AIR', sound:'air as in hair',   word:'hair',  zh:'头发', say:'A, I, R. Air as in hair. Hair. A, I, R. Air as in hair. Hair.'},
    {c:'EAR', sound:'ear as in hear',   word:'hear',  zh:'听见', say:'E, A, R. Ear as in hear. Hear. E, A, R. Ear as in hear. Hear.'},
    {c:'ALL', sound:'all as in ball',   word:'ball',  zh:'球', say:'A, L, L. All as in ball. Ball. A, L, L. All as in ball. Ball.'},
    {c:'ING', sound:'ing as in sing',   word:'sing',  zh:'唱', say:'I, N, G. Ing as in sing. Sing. I, N, G. Ing as in sing. Sing.'},
    {c:'ONG', sound:'ong as in song',   word:'song',  zh:'歌', say:'O, N, G. Ong as in song. Song. O, N, G. Ong as in song. Song.'},
    {c:'UCK', sound:'uck as in truck',  word:'truck', zh:'卡车', say:'U, C, K. Uck as in truck. Truck. U, C, K. Uck as in truck. Truck.'},
    {c:'ACK', sound:'ack as in back',   word:'back',  zh:'后面', say:'A, C, K. Ack as in back. Back. A, C, K. Ack as in back. Back.'},
    {c:'ICK', sound:'ick as in kick',   word:'kick',  zh:'踢', say:'I, C, K. Ick as in kick. Kick. I, C, K. Ick as in kick. Kick.'},
    {c:'OCK', sound:'ock as in lock',   word:'lock',  zh:'锁', say:'O, C, K. Ock as in lock. Lock. O, C, K. Ock as in lock. Lock.'}
  ]
};
