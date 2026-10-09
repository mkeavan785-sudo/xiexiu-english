/* ============================================================
   邪修英语 · 拼读速听数据 data-blends.js
   纯组合教学：只有字母组合 + 组合读音，不含任何例词。
   播法（每条内嵌两轮完整演示，字母间句号断出思维间隔）：
     第一轮：逐字母名（S. H.）→ 组合读音两遍（Shh. Shh.）
     第二轮：重复上述全流程
   ipa 字段 = 组合读音音标（画面展示）；
   say  字段 = TTS 文本，组合读音用"同音拼写"表达
   （shh/chuh/thuh…），由 en-slow 慢速声道特配生成，
   保证字正腔圆、吐字清晰。
   ============================================================ */
window.BLENDS = {
  list: [
    /* ---- 2 字母：辅音组合 ---- */
    {c:'SH', ipa:'/ʃ/',  say:'S. H. Shh. Shh. S. H. Shh. Shh.'},
    {c:'CH', ipa:'/tʃ/', say:'C. H. Chuh. Chuh. C. H. Chuh. Chuh.'},
    {c:'TH', ipa:'/θ/',  say:'T. H. Thuh. Thuh. T. H. Thuh. Thuh.'},
    {c:'TH', ipa:'/ð/',  say:'T. H. the. the. T. H. the. the.'},
    {c:'CK', ipa:'/k/',  say:'C. K. Kuh. Kuh. C. K. Kuh. Kuh.'},
    {c:'NG', ipa:'/ŋ/',  say:'N. G. Ung. Ung. N. G. Ung. Ung.'},
    {c:'QU', ipa:'/kw/', say:'Q. U. Kwuh. Kwuh. Q. U. Kwuh. Kwuh.'},
    {c:'WH', ipa:'/w/',  say:'W. H. Wuh. Wuh. W. H. Wuh. Wuh.'},
    {c:'PH', ipa:'/f/',  say:'P. H. Fuh. Fuh. P. H. Fuh. Fuh.'},

    /* ---- 2 字母：元音组合 ---- */
    {c:'EE', ipa:'/iː/', say:'E. E. Ee. Ee. E. E. Ee. Ee.'},
    {c:'EA', ipa:'/iː/', say:'E. A. Ee. Ee. E. A. Ee. Ee.'},
    {c:'AI', ipa:'/eɪ/', say:'A. I. Ay. Ay. A. I. Ay. Ay.'},
    {c:'AY', ipa:'/eɪ/', say:'A. Y. Ay. Ay. A. Y. Ay. Ay.'},
    {c:'OO', ipa:'/uː/', say:'O. O. Oo. Oo. O. O. Oo. Oo.'},
    {c:'OO', ipa:'/ʊ/',  say:'O. O. Uh. Uh. O. O. Uh. Uh.'},
    {c:'OW', ipa:'/aʊ/', say:'O. W. Ow. Ow. O. W. Ow. Ow.'},
    {c:'OW', ipa:'/əʊ/', say:'O. W. Oh. Oh. O. W. Oh. Oh.'},
    {c:'OU', ipa:'/aʊ/', say:'O. U. Ow. Ow. O. U. Ow. Ow.'},
    {c:'OI', ipa:'/ɔɪ/', say:'O. I. Oy. Oy. O. I. Oy. Oy.'},
    {c:'OY', ipa:'/ɔɪ/', say:'O. Y. Oy. Oy. O. Y. Oy. Oy.'},
    {c:'AR', ipa:'/ɑː/', say:'A. R. Ar. Ar. A. R. Ar. Ar.'},
    {c:'OR', ipa:'/ɔː/', say:'O. R. Or. Or. O. R. Or. Or.'},
    {c:'ER', ipa:'/ɜː/', say:'E. R. Er. Er. E. R. Er. Er.'},
    {c:'IR', ipa:'/ɜː/', say:'I. R. Er. Er. I. R. Er. Er.'},
    {c:'UR', ipa:'/ɜː/', say:'U. R. Er. Er. U. R. Er. Er.'},
    {c:'AW', ipa:'/ɔː/', say:'A. W. Aw. Aw. A. W. Aw. Aw.'},
    {c:'EW', ipa:'/juː/',say:'E. W. Ew. Ew. E. W. Ew. Ew.'},

    /* ---- Magic E：元音+E 不发音，元音读本音 ---- */
    {c:'A-E', ipa:'/eɪ/', say:'A. E. Ay. Ay. A. E. Ay. Ay.'},
    {c:'I-E', ipa:'/aɪ/', say:'I. E. Eye. Eye. I. E. Eye. Eye.'},
    {c:'O-E', ipa:'/əʊ/', say:'O. E. Oh. Oh. O. E. Oh. Oh.'},
    {c:'U-E', ipa:'/juː/',say:'U. E. You. You. U. E. You. You.'},

    /* ---- 3 字母组合 ---- */
    {c:'OUT', ipa:'/aʊt/', say:'O. U. T. Owt. Owt. O. U. T. Owt. Owt.'},
    {c:'TCH', ipa:'/tʃ/',  say:'T. C. H. Chuh. Chuh. T. C. H. Chuh. Chuh.'},
    {c:'DGE', ipa:'/dʒ/',  say:'D. G. E. Juh. Juh. D. G. E. Juh. Juh.'},
    {c:'IGH', ipa:'/aɪ/',  say:'I. G. H. Eye. Eye. I. G. H. Eye. Eye.'},
    {c:'AIR', ipa:'/eə/',  say:'A. I. R. Air. Air. A. I. R. Air. Air.'},
    {c:'EAR', ipa:'/ɪə/',  say:'E. A. R. Ear. Ear. E. A. R. Ear. Ear.'},
    {c:'ALL', ipa:'/ɔːl/', say:'A. L. L. Awl. Awl. A. L. L. Awl. Awl.'},
    {c:'ING', ipa:'/ɪŋ/',  say:'I. N. G. Ing. Ing. I. N. G. Ing. Ing.'},
    {c:'ONG', ipa:'/ɒŋ/',  say:'O. N. G. Awng. Awng. O. N. G. Awng. Awng.'},
    {c:'UCK', ipa:'/ʌk/',  say:'U. C. K. Uck. Uck. U. C. K. Uck. Uck.'},
    {c:'ACK', ipa:'/æk/',  say:'A. C. K. Ack. Ack. A. C. K. Ack. Ack.'},
    {c:'ICK', ipa:'/ɪk/',  say:'I. C. K. Ick. Ick. I. C. K. Ick. Ick.'},
    {c:'OCK', ipa:'/ɒk/',  say:'O. C. K. Ock. Ock. O. C. K. Ock. Ock.'}
  ]
};
