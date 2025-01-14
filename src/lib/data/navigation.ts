import type { Category, KeyFigure } from '../types';

export const categories: Category[] = [
  {
    title: "帝紀 Imperial Chronicles",
    chapters: [
      { number: "001", title: "Emperor Xuan", href: "/chronicles/emperor-wu" },
      { number: "卷二", title: "晉惠帝紀", href: "/chronicles/emperor-hui" },
      { number: "卷三", title: "晉懷帝紀", href: "/chronicles/emperor-huai" },
      { number: "004", title: "晉懷帝紀", href: "/chronicles/emperor-huai" }
    ]
  },
  {
    title: "列傳 Biographies",
    chapters: [
      { number: "卷二十一", title: "王導傳", href: "/biographies/wang-dao" },
      { number: "卷二十二", title: "謝安傳", href: "/biographies/xie-an" },
      { number: "卷二十三", title: "桓溫傳", href: "/biographies/huan-wen" }
    ]
  },
  {
    title: "志 Treatises",
    chapters: [
      { number: "卷十一", title: "天文志", href: "/treatises/astronomy" },
      { number: "卷十二", title: "地理志", href: "/treatises/geography" },
      { number: "卷十三", title: "禮志", href: "/treatises/rites" }
    ]
  },
  {
    title: "載記 Chronicles",
    chapters: [
      { number: "卷一百一", title: "劉聰載記", href: "/records/liu-cong" },
      { number: "卷一百二", title: "石勒載記", href: "/records/shi-le" },
      { number: "卷一百三", title: "苻堅載記", href: "/records/fu-jian" }
    ]
  },
  {
    title: "表 Tables",
    chapters: [
      { number: "卷一", title: "帝王表", href: "/tables/emperors" },
      { number: "卷二", title: "后妃表", href: "/tables/empresses" },
      { number: "卷三", title: "王公表", href: "/tables/nobles" }
    ]
  }

];

export const keyFigures: KeyFigure[] = [
  { name: "司馬炎 Sima Yan", href: "/figures/sima-yan" },
  { name: "王導 Wang Dao", href: "/figures/wang-dao" },
  { name: "謝安 Xie An", href: "/figures/xie-an" },
  { name: "桓溫 Huan Wen", href: "/figures/huan-wen" }
];