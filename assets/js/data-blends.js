/* ============================================================
   邪修英语 · 拼读速听数据 data-blends.js
   外国孩子学自然拼读的 1/2/3 字母组合清单。
   播法（spelling drill）：逐字母名 → 整词，自动内嵌两遍，
   如 "O, U, T. Out. O, U, T. Out."
   say 字段 = TTS 文本（音频按此生成，一条含两遍）。
   word = 组合的代表词；zh = 释义。
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
    {c:'SH', word:'ship',  zh:'轮船', say:'S, H. Ship. S, H. Ship.'},
    {c:'CH', word:'chair', zh:'椅子', say:'C, H. Chair. C, H. Chair.'},
    {c:'TH', word:'think', zh:'想（清音）', say:'T, H. Think. T, H. Think.'},
    {c:'TH', word:'this',  zh:'这个（浊音）', say:'T, H. This. T, H. This.'},
    {c:'CK', word:'duck',  zh:'鸭子', say:'C, K. Duck. C, K. Duck.'},
    {c:'NG', word:'ring',  zh:'戒指', say:'N, G. Ring. N, G. Ring.'},
    {c:'QU', word:'queen', zh:'女王', say:'Q, U. Queen. Q, U. Queen.'},
    {c:'WH', word:'wheel', zh:'轮子', say:'W, H. Wheel. W, H. Wheel.'},
    {c:'PH', word:'phone', zh:'电话', say:'P, H. Phone. P, H. Phone.'},

    /* ---- 2 字母：元音组合 ---- */
    {c:'EE', word:'see',   zh:'看见', say:'E, E. See. E, E. See.'},
    {c:'EA', word:'sea',   zh:'大海', say:'E, A. Sea. E, A. Sea.'},
    {c:'AI', word:'rain',  zh:'下雨', say:'A, I. Rain. A, I. Rain.'},
    {c:'AY', word:'play',  zh:'玩', say:'A, Y. Play. A, Y. Play.'},
    {c:'OO', word:'moon',  zh:'月亮（长音）', say:'O, O. Moon. O, O. Moon.'},
    {c:'OO', word:'book',  zh:'书（短音）', say:'O, O. Book. O, O. Book.'},
    {c:'OW', word:'cow',   zh:'奶牛', say:'O, W. Cow. O, W. Cow.'},
    {c:'OW', word:'snow',  zh:'雪', say:'O, W. Snow. O, W. Snow.'},
    {c:'OU', word:'mouse', zh:'老鼠', say:'O, U. Mouse. O, U. Mouse.'},
    {c:'OI', word:'coin',  zh:'硬币', say:'O, I. Coin. O, I. Coin.'},
    {c:'OY', word:'toy',   zh:'玩具', say:'O, Y. Toy. O, Y. Toy.'},
    {c:'AR', word:'car',   zh:'汽车', say:'A, R. Car. A, R. Car.'},
    {c:'OR', word:'fork',  zh:'叉子', say:'O, R. Fork. O, R. Fork.'},
    {c:'ER', word:'her',   zh:'她的', say:'E, R. Her. E, R. Her.'},
    {c:'IR', word:'bird',  zh:'鸟', say:'I, R. Bird. I, R. Bird.'},
    {c:'UR', word:'nurse', zh:'护士', say:'U, R. Nurse. U, R. Nurse.'},
    {c:'AW', word:'paw',   zh:'爪子', say:'A, W. Paw. A, W. Paw.'},
    {c:'EW', word:'new',   zh:'新的', say:'E, W. New. E, W. New.'},

    /* ---- Magic E：元音+E 不发音，元音读本音 ---- */
    {c:'A-E', word:'cake', zh:'蛋糕', say:'A, E. Cake. A, E. Cake.'},
    {c:'I-E', word:'bike', zh:'自行车', say:'I, E. Bike. I, E. Bike.'},
    {c:'O-E', word:'home', zh:'家', say:'O, E. Home. O, E. Home.'},
    {c:'U-E', word:'cute', zh:'可爱', say:'U, E. Cute. U, E. Cute.'},

    /* ---- 3 字母组合 ---- */
    {c:'OUT', word:'out',   zh:'出去', say:'O, U, T. Out. O, U, T. Out.'},
    {c:'TCH', word:'catch', zh:'抓住', say:'T, C, H. Catch. T, C, H. Catch.'},
    {c:'DGE', word:'bridge',zh:'桥', say:'D, G, E. Bridge. D, G, E. Bridge.'},
    {c:'IGH', word:'high',  zh:'高的', say:'I, G, H. High. I, G, H. High.'},
    {c:'AIR', word:'air',   zh:'空气', say:'A, I, R. Air. A, I, R. Air.'},
    {c:'EAR', word:'ear',   zh:'耳朵', say:'E, A, R. Ear. E, A, R. Ear.'},
    {c:'ALL', word:'ball',  zh:'球', say:'A, L, L. Ball. A, L, L. Ball.'},
    {c:'ING', word:'sing',  zh:'唱', say:'I, N, G. Sing. I, N, G. Sing.'},
    {c:'ONG', word:'song',  zh:'歌', say:'O, N, G. Song. O, N, G. Song.'},
    {c:'UCK', word:'truck', zh:'卡车', say:'U, C, K. Truck. U, C, K. Truck.'},
    {c:'ACK', word:'back',  zh:'后面', say:'A, C, K. Back. A, C, K. Back.'},
    {c:'ICK', word:'kick',  zh:'踢', say:'I, C, K. Kick. I, C, K. Kick.'},
    {c:'OCK', word:'lock',  zh:'锁', say:'O, C, K. Lock. O, C, K. Lock.'}
  ]
};
