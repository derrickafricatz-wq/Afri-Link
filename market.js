const marketAds = [

  {
  company: "MOUNT MERU HOTEL",
  phone: "+2550272970256",
  whatsapp: "",
  location: "Sanawari Road| Arusha, Tanzania",

  categories: ["Hotels"],

  expiresAt: "2026-10-22 00:59",  

  images: [
        "images/ca.jpg",
        "images/cb.jpg",
        "images/cc.jpg",
        "images/cd.jpg",
        "images/ce.jpg",
        "images/cf.jpg",
        "images/cg.jpg"
  ]
},

{
  company: "NGARE|SERO MOUNTAIN LODGE",
  phone: "+255782749010",
  whatsapp: "255782749010",
  location: "Leganga Road|Leganga Arumeru|0425",

  categories: ["Hotels"],

  expiresAt: "2026-10-22 00:59",  

  images: [
        "images/qa.jpg",
        "images/qb.jpg",
        "images/qc.jpg",
        "images/qd.jpg",
        "images/qe.jpg",
        "images/qf.jpg",
        "images/qg.jpg",
        "images/qh.jpg"
  ]
},

  {
  company: "UMBWE GATE TOURS",
  phone: "+255754490909",
  whatsapp: "255754490909",
  location: "AICC Ngorongoro wing 5thFloor|Arusha, Tanzania",

  categories: ["Tourism"],

  expiresAt: "2026-10-22 00:59",  

  images: [
    "images/ha.jpg",
    "images/hb.jpg",
    "images/hc.jpg",
    "images/hd.jpg"
  ]
},

{
  company: "YUTONG SPARE PARTS DEALER",
  phone: "+255752332728",
  whatsapp: "255752332728",
  location: "Near Bus Terminal|Arusha",

  categories: ["Services"],

  expiresAt: "2026-10-22 23:59",

  images: [
    "images/ya.png",
    "images/yb.png",
    "images/yc.png"
  ],

  banners: [
    "YUTONG. KEEP MOVING FORWARD.",
    "YUTONG. POWER YOUR JOURNEY.",
    "YUTONG. PERFORMANCE YOU CAN TRUST."
  ]
}, 

{
  company: "AFRIVIBE PRINTS|EVENTS",
  phone: "+255746644223",
  whatsapp: "255752434777",
  location: "Dodoma, Tanzania",

  categories: ["Printing", "Events"],

  expiresAt: "2026-10-22 23:59",

  images: [
    "images/o1.png",
    "images/o2.jpg"
  ]
},

  {
  company: "GLORY CHUPI CHUPI",
  phone: "+255754059023",
  whatsapp: "255754059023",
  location: "Yarazaq|Building. Near Bus Terminal|Arusha",

  categories: ["Fashion"],

  expiresAt: "2026-10-22 23:59",

  images: [
    "images/ab.jpg",
    "images/ac.jpg",
    "images/ad.jpg",
    "images/ae.jpg",
    "images/af.jpg",
    "images/ag.jpg",
    "images/ah.jpg",
    "images/ai.jpg",
    "images/aj.jpg",
    "images/ak.jpg",
    "images/al.jpg",
    "images/am.jpg",
    "images/an.jpg",
    "images/ao.jpg",
    "images/ap.jpg"
  ]
},

  {
  company: "Lux American",
  phone: "+255746644223",
  whatsapp: "255742097868",
  location: "New York City",

  categories: ["Transport"],

  expiresAt: "2026-12-22 23:59",

  images: [
    "images/l1.jpg"
  ]
},

  {
  company: "Lux Shanghai",
  phone: "+255746644223",
  whatsapp: "255742097868",
  location: "Shanghai City",

  categories: ["Transport"],

  expiresAt: "2026-12-22 23:59",

  images: [
    "images/l2.jpg"
  ]
},

  {
  company: "NEW DUNCAN FURNITURE",
  phone: "+255759376054",
  whatsapp: "255759376054",
  location: "Arusha, Tanzania",

  categories: ["Furniture", "Services"],
  service: "furniture",

  expiresAt: "2026-10-11 09:52",

  images: [
    "images/m1.jpg",
    "images/m3.png",
    "images/m11.png",
    "images/m4.png",
    "images/m10.jpg",
    "images/m5.jpg",
    "images/m2.png",
    "images/m9.jpg",
    "images/m6.jpg",
    "images/m7.jpg",
    "images/m8.png"
    
  ]
},

  
{
  company: "SHALOM PRODUCTS",
  phone: "+255759797373",
  whatsapp: "255759797373",
  location: "Kilimanjaro, Tanzania",

  categories: ["Agro & Natural Foods"],
  service: "agro",

  expiresAt: "2026-10-20 23:59",

  images: [
    "images/s1.png",
    "images/s2.jpg",
    "images/s3.jpg",
    "images/s4.jpg",
    "images/s5.png",
    "images/s6.png",
    "images/s7.png"
  ]
},

{
  company: "Ruere Arts",
  phone: "255746727716",
  whatsapp: "255746727716",
  location: "Arusha, Tanzania|Rd 15.Kinana, Themi",

  categories: ["Arts",],
  service: "arts",

  expiresAt: "2026-10-25 18:00",

  images: [
    "images/1.png",
    "images/2.jpg",
    "images/3.jpg",
    "images/6.jpg",
    "images/8.jpg",
    "images/10.jpg",
    "images/11.jpg",
   "images/13.jpg",
   "images/15.jpg",
   "images/21.jpg",
   "images/23.jpg",
   "images/19.jpg",
   "images/21.jpg",
   "images/20.jpg",
   "images/24.jpg"   
  ]
}

];

let selectedCategory = "All";

const marketCategories = [
  "All",
  "Technology",
  "Agro & Natural Foods",
  "Fashion",
  "Furniture",
  "Health",
  "Hotels",
  "Education",
  "Transport",
  "Tourism",
  "Arts",
  "Printing",
  "Events",
  "Services"
];

function selectCategory(category) {

  selectedCategory = category;

  renderMarket();

}

let marketStarted = false;

function startMarketRotations() {

  if (marketStarted) return;
  marketStarted = true;

  marketAds.forEach((company, index) => {

    let i = 0;

    const img = document.getElementById(`billboard-${index}`);
    if (!img) return;

    setInterval(() => {

      // START FADE OUT + ZOOM OUT
      img.style.opacity = "0";
      img.style.transform = "scale(1)";

      setTimeout(() => {

        // change image
        i = (i + 1) % company.images.length;
        img.src = company.images[i];

        // force reflow (important for smooth transition)
        void img.offsetWidth;

        // FADE IN + SLOW ZOOM IN (premium effect)
        img.style.opacity = "1";
        img.style.transform = "scale(1)";

      }, 1200); // fade-out duration

    }, 7000); // total cycle per image

  });
}
