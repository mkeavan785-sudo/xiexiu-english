/* ============================================================
   邪修英语 · 拼读速听数据 data-blends.js
   外国孩子学自然拼读的 2/3 字母组合清单（纯组合，无单字母）。
   播法（每条内嵌两轮完整演示，字母间用句号断出思维间隔）：
     第一轮：逐字母名（S. H.）→ 组合自然发音两遍（"sh as in ship"）
     第二轮：重复上述全流程
   sound 字段 = 组合与自然发音的搭配（画面展示）；
   say 字段 = TTS 文本（音频按此生成，一条含两轮）。
   Magic E / 整词型组合无独立音素搭配，say 为字母名+例词两遍。
   ============================================================ */
window.BLENDS = {
  list: [
    /* ---- 2 字母：辅音组合 ---- */
    {c:'SH', sound:'sh as in ship',   word:'ship',  zh:'轮船', say:'S. H. Sh as in ship. Sh as in ship. S. H. Sh as in ship. Sh as in ship.'},
    {c:'CH', sound:'ch as in chair',  word:'chair', zh:'椅子', say:'C. H. Ch as in chair. Ch as in chair. C. H. Ch as in chair. Ch as in chair.'},
    {c:'TH', sound:'th as in think',  word:'think', zh:'想（清音）', say:'T. H. Th as in think. Th as in think. T. H. Th as in think. Th as in think.'},
    {c:'TH', sound:'th as in this',   word:'this',  zh:'这个（浊音）', say:'T. H. Th as in this. Th as in this. T. H. Th as in this. Th as in this.'},
    {c:'CK', sound:'ck as in duck',   word:'duck',  zh:'鸭子', say:'C. K. Ck as in duck. Ck as in duck. C. K. Ck as in duck. Ck as in duck.'},
    {c:'NG', sound:'ng as in ring',   word:'ring',  zh:'戒指', say:'N. G. Ng as in ring. Ng as in ring. N. G. Ng as in ring. Ng as in ring.'},
    {c:'QU', sound:'qu as in queen',  word:'queen', zh:'女王', say:'Q. U. Qu as in queen. Qu as in queen. Q. U. Qu as in queen. Qu as in queen.'},
    {c:'WH', sound:'wh as in wheel',  word:'wheel', zh:'轮子', say:'W. H. Wh as in wheel. Wh as in wheel. W. H. Wh as in wheel. Wh as in wheel.'},
    {c:'PH', sound:'ph as in phone',  word:'phone', zh:'电话', say:'P. H. Ph as in phone. Ph as in phone. P. H. Ph as in phone. Ph as in phone.'},

    /* ---- 2 字母：元音组合 ---- */
    {c:'EE', sound:'ee as in see',    word:'see',   zh:'看见', say:'E. E. Ee as in see. Ee as in see. E. E. Ee as in see. Ee as in see.'},
    {c:'EA', sound:'ea as in sea',    word:'sea',   zh:'大海', say:'E. A. Ea as in sea. Ea as in sea. E. A. Ea as in sea. Ea as in sea.'},
    {c:'AI', sound:'ai as in rain',   word:'rain',  zh:'下雨', say:'A. I. Ai as in rain. Ai as in rain. A. I. Ai as in rain. Ai as in rain.'},
    {c:'AY', sound:'ay as in play',   word:'play',  zh:'玩', say:'A. Y. Ay as in play. Ay as in play. A. Y. Ay as in play. Ay as in play.'},
    {c:'OO', sound:'oo as in moon',   word:'moon',  zh:'月亮（长音）', say:'O. O. Oo as in moon. Oo as in moon. O. O. Oo as in moon. Oo as in moon.'},
    {c:'OO', sound:'oo as in book',   word:'book',  zh:'书（短音）', say:'O. O. Oo as in book. Oo as in book. O. O. Oo as in book. Oo as in book.'},
    {c:'OW', sound:'ow as in cow',    word:'cow',   zh:'奶牛', say:'O. W. Ow as in cow. Ow as in cow. O. W. Ow as in cow. Ow as in cow.'},
    {c:'OW', sound:'ow as in snow',   word:'snow',  zh:'雪', say:'O. W. Ow as in snow. Ow as in snow. O. W. Ow as in snow. Ow as in snow.'},
    {c:'OU', sound:'ou as in mouse',  word:'mouse', zh:'老鼠', say:'O. U. Ou as in mouse. Ou as in mouse. O. U. Ou as in mouse. Ou as in mouse.'},
    {c:'OI', sound:'oi as in coin',   word:'coin',  zh:'硬币', say:'O. I. Oi as in coin. Oi as in coin. O. I. Oi as in coin. Oi as in coin.'},
    {c:'OY', sound:'oy as in toy',    word:'toy',   zh:'玩具', say:'O. Y. Oy as in toy. Oy as in toy. O. Y. Oy as in toy. Oy as in toy.'},
    {c:'AR', sound:'ar as in car',    word:'car',   zh:'汽车', say:'A. R. Ar as in car. Ar as in car. A. R. Ar as in car. Ar as in car.'},
    {c:'OR', sound:'or as in fork',   word:'fork',  zh:'叉子', say:'O. R. Or as in fork. Or as in fork. O. R. Or as in fork. Or as in fork.'},
    {c:'ER', sound:'er as in her',    word:'her',   zh:'她的', say:'E. R. Er as in her. Er as in her. E. R. Er as in her. Er as in her.'},
    {c:'IR', sound:'ir as in bird',   word:'bird',  zh:'鸟', say:'I. R. Ir as in bird. Ir as in bird. I. R. Ir as in bird. Ir as in bird.'},
    {c:'UR', sound:'ur as in nurse',  word:'nurse', zh:'护士', say:'U. R. Ur as in nurse. Ur as in nurse. U. R. Ur as in nurse. Ur as in nurse.'},
    {c:'AW', sound:'aw as in paw',    word:'paw',   zh:'爪子', say:'A. W. Aw as in paw. Aw as in paw. A. W. Aw as in paw. Aw as in paw.'},
    {c:'EW', sound:'ew as in new',    word:'new',   zh:'新的', say:'E. W. Ew as in new. Ew as in new. E. W. Ew as in new. Ew as in new.'},

    /* ---- Magic E：元音+E 不发音，元音读本音（组合音=例词本身） ---- */
    {c:'A-E', word:'cake', zh:'蛋糕', say:'A. E. Cake. Cake. A. E. Cake. Cake.'},
    {c:'I-E', word:'bike', zh:'自行车', say:'I. E. Bike. Bike. I. E. Bike. Bike.'},
    {c:'O-E', word:'home', zh:'家', say:'O. E. Home. Home. O. E. Home. Home.'},
    {c:'U-E', word:'cute', zh:'可爱', say:'U. E. Cute. Cute. U. E. Cute. Cute.'},

    /* ---- 3 字母组合 ---- */
    {c:'OUT', word:'out',   zh:'出去', say:'O. U. T. Out. Out. O. U. T. Out. Out.'},
    {c:'TCH', sound:'tch as in catch',  word:'catch', zh:'抓住', say:'T. C. H. Tch as in catch. Tch as in catch. T. C. H. Tch as in catch. Tch as in catch.'},
    {c:'DGE', sound:'dge as in bridge', word:'bridge',zh:'桥', say:'D. G. E. Dge as in bridge. Dge as in bridge. D. G. E. Dge as in bridge. Dge as in bridge.'},
    {c:'IGH', sound:'igh as in high',   word:'high',  zh:'高的', say:'I. G. H. Igh as in high. Igh as in high. I. G. H. Igh as in high. Igh as in high.'},
    {c:'AIR', sound:'air as in hair',   word:'hair',  zh:'头发', say:'A. I. R. Air as in hair. Air as in hair. A. I. R. Air as in hair. Air as in hair.'},
    {c:'EAR', sound:'ear as in hear',   word:'hear',  zh:'听见', say:'E. A. R. Ear as in hear. Ear as in hear. E. A. R. Ear as in hear. Ear as in hear.'},
    {c:'ALL', sound:'all as in ball',   word:'ball',  zh:'球', say:'A. L. L. All as in ball. All as in ball. A. L. L. All as in ball. All as in ball.'},
    {c:'ING', sound:'ing as in sing',   word:'sing',  zh:'唱', say:'I. N. G. Ing as in sing. Ing as in sing. I. N. G. Ing as in sing. Ing as in sing.'},
    {c:'ONG', sound:'ong as in song',   word:'song',  zh:'歌', say:'O. N. G. Ong as in song. Ong as in song. O. N. G. Ong as in song. Ong as in song.'},
    {c:'UCK', sound:'uck as in truck',  word:'truck', zh:'卡车', say:'U. C. K. Uck as in truck. Uck as in truck. U. C. K. Uck as in truck. Uck as in truck.'},
    {c:'ACK', sound:'ack as in back',   word:'back',  zh:'后面', say:'A. C. K. Ack as in back. Ack as in back. A. C. K. Ack as in back. Ack as in back.'},
    {c:'ICK', sound:'ick as in kick',   word:'kick',  zh:'踢', say:'I. C. K. Ick as in kick. Ick as in kick. I. C. K. Ick as in kick. Ick as in kick.'},
    {c:'OCK', sound:'ock as in lock',   word:'lock',  zh:'锁', say:'O. C. K. Ock as in lock. Ock as in lock. O. C. K. Ock as in lock. Ock as in lock.'}
  ]
};
