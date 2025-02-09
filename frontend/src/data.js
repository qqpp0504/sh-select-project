import nikeImg from "./assets/nike-logo.jpg";
import asicsImg from "./assets/asics-logo.jpg";
import theNorthFaceImg from "./assets/the-north-face-logo.jpg";
import mizunoImg from "./assets/mizuno-logo.jpg";
import adidasImg from "./assets/adidas-logo.jpg";
import nauticaImg from "./assets/nautica-logo.jpg";
import converseImg from "./assets/converse-logo.jpg";
import ordinaryImg from "./assets/ordinary-logo.jpg";
import carharttImg from "./assets/carhartt-logo.jpg";

export const BRANDS = [
  {
    image: nikeImg,
    alt: "Nike Logo圖片",
    title: "Nike",
    link: "/products?brands=nike",
    description:
      "Nike 的使命是「將靈感與創新帶給世上每位運動員」。此外，Nike 的宗旨是「創造美好未來，讓所有人不論背景、膚色、運動水平和喜好都能茁壯成長」。耐克官方網站這些使命和宗旨反映了 Nike 致力於為全球運動員提供創新產品和服務的承諾。",
  },
  {
    image: asicsImg,
    alt: "Asics Logo圖片",
    title: "Asics",
    link: "/products?brands=asics",
    description:
      "Asics 源自拉丁語「Anima Sana in Corpore Sano」，意為「健全的心靈寓於健全的體魄」，體現品牌透過運動促進身心健康的理念。創辦人鬼塚喜八郎以「健全的精神源自健康的體魄」為信念，致力於為運動員打造真正的運動鞋，展現 Asics 對運動員身心健康的承諾。",
  },
  {
    image: theNorthFaceImg,
    alt: "The North Face Logo圖片",
    title: "The North Face",
    link: "/products?brands=theNorthFace",
    description:
      "The North Face 鼓勵人們探索戶外，並提供高品質的戶外裝備，讓人們能夠在極限環境中挑戰自我，並實現身心的健全。該品牌的理念體現於他們的口號「Never Stop Exploring」，鼓勵每個人都不斷挑戰自己，探索自然，並享受戶外活動的樂趣。",
  },
  {
    image: mizunoImg,
    alt: "Mizuno Logo圖片",
    title: "Mizuno",
    link: "/products?brands=mizuno",
    description:
      "美津濃（Mizuno）以「優良運動用品與振興體育貢獻社會」為宗旨。受美國棒球文化影響，創辦人水野利八推廣棒球產品，強調「方便運動、穿著舒適」，展現品牌對高品質運動用品與體育發展的承諾。",
  },
  {
    image: adidasImg,
    alt: "Adidas Logo圖片",
    title: "Adidas",
    link: "/products?brands=adidas",
    description:
      "Adidas 的創立宗旨是「為運動員提供最佳的運動裝備，幫助他們發揮最佳表現」。創辦人阿道夫·達斯勒（Adolf Dassler）自1920年起便致力於開發高品質的運動鞋，並於1949年創立了 Adidas 品牌。他秉持「開發最好的技術，幫助運動員表現更好」的理念，這也是 Adidas 的核心宗旨。",
  },
  {
    image: nauticaImg,
    alt: "Nautica Logo圖片",
    title: "Nautica",
    link: "/products?brands=nautica",
    description:
      "Nautica 於 1983 年創立，品牌名源自拉丁文「Nauticus」，意為「船隻」，展現海洋靈感設計。其宗旨為將海洋元素融入日常時尚，強調自然與平衡，服裝風格充滿活力且自在。",
  },
  {
    image: converseImg,
    alt: "Converse Logo圖片",
    title: "Converse",
    link: "/products?brands=converse",
    description:
      "Converse 於 1908 年創立，最初專注橡膠鞋墊，後轉型為運動鞋與休閒服飾品牌。秉持「為街頭而生」的宗旨，設計展現個人風格與文化趨勢，並涉足滑板、籃球及藝術合作，體現對創新與多元文化的承諾。",
  },
  {
    image: ordinaryImg,
    alt: "Oridnary Logo圖片",
    title: "Ordinary",
    link: "/products?brands=ordinary",
    description:
      'Ordinary 代表"普通"，"平凡"的涵義，以創造理想價格並兼具設計與質量的產品為核心，致力於回歸服裝最基本的表層-版型訴求，如同早晨起床能夠不加思索的隨意穿上的 Living 理念，採用鯨魚為品牌 Logo 創作，鯨魚是一種美麗且巨大生靈，偉大的貢獻者如同品牌致力回歸探索衣服版型。',
  },
  {
    image: carharttImg,
    alt: "Carhartt Logo圖片",
    title: "Carhartt",
    link: "/products?brands=carhartt",
    description:
      "Carhartt 於 1889 年創立，原為勞動者打造耐用舒適的工作服，強調「品質、舒適、耐用性」。後來推出 Carhartt WIP，將工裝設計融入時尚，兼顧品質與風格。",
  },
];

export const PRODUCTSNAV = [
  { param: "top", filterName: "上衣" },
  { param: "jacket", filterName: "外套及背心" },
  { param: "bottom", filterName: "下著" },
  { param: "sportsbar", filterName: "運動內衣" },
  { param: "socks", filterName: "襪子" },
  { param: "shoes", filterName: "鞋款" },
  { param: "other", filterName: "其他配件" },
];

export const PRODUCTSNAVMEN = [
  { param: "top", filterName: "上衣" },
  { param: "jacket", filterName: "外套及背心" },
  { param: "bottom", filterName: "下著" },
  { param: "socks", filterName: "襪子" },
  { param: "shoes", filterName: "鞋款" },
  { param: "other", filterName: "其他配件" },
];

export const FILTERS = {
  gender: [
    { param: "men", filterName: "男子" },
    { param: "women", filterName: "女子" },
  ],
  genderWomen: [{ param: "women", filterName: "女子" }],
  new: [{ param: "new", filterName: "新品推薦" }],
  onSale: [{ param: "sale", filterName: "超值優惠商品" }],
  brandsTop: [
    { param: "adidas", filterName: "Adidas" },
    { param: "asics", filterName: "Asics" },
    { param: "carhartt", filterName: "Carhartt" },
    { param: "converse", filterName: "Converse" },
  ],
  brandsBottom: [
    { param: "mizuno", filterName: "Mizuno" },
    { param: "nautica", filterName: "Nautica" },
    { param: "nike", filterName: "Nike" },
    { param: "ordinary", filterName: "Ordinary" },
    { param: "theNorthFace", filterName: "The North Face" },
  ],
};

const commonNew = [
  { item: "新品發售", link: "/products?newProduct=new" },
  { item: "選購所有特惠商品", link: "/products?onSale=sale" },
];
const commonBrands = [
  { item: "Adidas", link: "/products?brands=adidas" },
  { item: "Asics", link: "/products?brands=asics" },
  { item: "Carhartt", link: "/products?brands=carhartt" },
  { item: "Converse", link: "/products?brands=converse" },
  { item: "Mizuno", link: "/products?brands=mizuno" },
  { item: "Nautica", link: "/products?brands=nautica" },
  { item: "Nike", link: "/products?brands=nike" },
  { item: "Ordinary", link: "/products?brands=ordinary" },
  { item: "The North Face", link: "/products?brands=theNorthFace" },
];

export const NAVITEMS = [
  {
    label: "新品和精選",
    items: {
      精選: [
        { item: "新品發售", link: "/products?newProduct=new" },
        { item: "選購所有特惠商品", link: "/products?onSale=sale" },
      ],
      依品牌選購: commonBrands,
    },
    link: "/",
  },
  {
    label: "男款",
    items: {
      精選: commonNew,
      服飾與鞋款: [
        { item: "上衣", link: "/products?category=top" },
        { item: "外套及背心", link: "/products?category=jacket" },
        { item: "下著", link: "/products?category=bottom" },
        { item: "襪子", link: "/products?category=socks" },
        { item: "鞋款", link: "/products?category=shoes" },
        { item: "其他配件", link: "/products?category=other" },
      ],
      依品牌選購: commonBrands,
    },
    link: "men",
  },
  {
    label: "女款",
    items: {
      精選: commonNew,
      服飾與鞋款: [
        { item: "上衣", link: "/products?category=top" },
        { item: "外套及背心", link: "/products?category=jacket" },
        { item: "下著", link: "/products?category=bottom" },
        { item: "運動內衣", link: "/products?category=sportsbar" },
        { item: "襪子", link: "/products?category=socks" },
        { item: "鞋款", link: "/products?category=shoes" },
        { item: "其他配件", link: "/products?category=other" },
      ],
      依品牌選購: commonBrands,
    },
    link: "female",
  },
  {
    label: "品牌",
    items: {
      精選: commonNew,
      依品牌選購: commonBrands,
    },
    link: "brands",
  },
];
