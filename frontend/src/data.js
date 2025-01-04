export const FOOTERDATA = {
  資源: [
    { text: "加入會員", link: "/accounts" },
    { text: "傳送意見回饋", link: "/" },
  ],
  協助: [
    { text: "取得協助", link: "/help" },
    { text: "訂單狀態", link: "/" },
    { text: "出貨與寄送", link: "/" },
    { text: "退貨", link: "/" },
    { text: "付款選項", link: "/" },
  ],
  品牌: [
    {
      text: "關於 SH SELECT",
      link: "/",
    },
    {
      text: "最新消息",
      link: "/",
    },
  ],
};

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
