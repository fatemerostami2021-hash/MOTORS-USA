// DEMO DATA: prices/mileage are placeholders. Power, 0-100 and top speed are public manufacturer figures; verify before publishing.
export type Vehicle = { slug:string; make:string; model:string; year:number; price:number; mileage:number; body:string; fuel:string; transmission:string; hp:number; engine:string; accel:number|null; top:number|null; status:"available"|"sold"; featured:boolean; tagline?:{en:string;fa:string}; cc?:number; battery?:string; seats?:number; drive?:string; iceHp?:string; motors?:number; image:string; gallery:string[]; video?:string };
type R = [string,string,number,number,number,string,string,string,number,string,number|null,number|null,"available"|"sold",string];
const rows: R[] = [
 ["Porsche","918 Spyder",2015,1850000,4200,"Roadster","Hybrid","PDK",887,"4.6L V8 + 2 e-motors",2.6,345,"available","hero-poster.webp"],
 ["Ferrari","SF90 Stradale",2022,625000,3100,"Coupe","Hybrid","8-speed DCT",986,"4.0L V8 twin-turbo + 3 e-motors",2.5,340,"available","ferrari-sf90-stradale-2022.webp"],
 ["Ferrari","Purosangue",2023,520000,1200,"SUV","Gasoline","DCT",715,"6.5L V12",3.3,310,"available","ferrari-purosangue.webp"],
 ["Ferrari","488 Pista Spider",2019,480000,5200,"Convertible","Gasoline","DCT",710,"3.9L V8 twin-turbo",2.85,340,"available","ferrari-488-pista-spider.webp"],
 ["Ferrari","812 GTS",2021,560000,3100,"Convertible","Gasoline","DCT",789,"6.5L V12",3.0,340,"available","ferrari-812-gts.webp"],
 ["Lamborghini","Revuelto",2024,780000,900,"Coupe","Hybrid","DCT",1001,"6.5L V12 + 3 e-motors",2.5,350,"available","lamborghini-revuelto1.webp"],
 ["Lamborghini","Aventador SVJ",2019,690000,2800,"Coupe","Gasoline","ISR",759,"6.5L V12",2.8,350,"available","lamborghini-aventador-svj.webp"],
 ["Lamborghini","Veneno",2014,9500000,1500,"Coupe","Gasoline","ISR",740,"6.5L V12",2.9,355,"available","lamborghini-veneno.webp"],
 ["McLaren","Senna",2019,950000,1900,"Coupe","Gasoline","DCT",789,"4.0L V8 twin-turbo",2.8,340,"available","mclaren-senna.webp"],
 ["McLaren","Speedtail",2020,2400000,800,"Coupe","Hybrid","DCT",1055,"4.0L V8 twin-turbo + e-motor",null,403,"available","mclaren-speedtail.webp"],
 ["McLaren","P1 GTR",2015,3200000,600,"Coupe","Hybrid","DCT",986,"3.8L V8 twin-turbo + e-motor",null,null,"available","mclaren-p1-gtr.webp"],
 ["Mercedes-Benz","AMG ONE",2023,3100000,400,"Coupe","Hybrid","AMT",1063,"1.6L V6 turbo + 4 e-motors",2.9,352,"available","mercedes-benz-amg-one.webp"],
 ["Koenigsegg","Jesko Attack",2022,3700000,300,"Coupe","Gasoline","LST",1280,"5.0L V8 twin-turbo",null,null,"available","koenigsegg-jesko-attack.webp"],
 ["Rolls-Royce","Phantom Series",2022,520000,2000,"Sedan","Gasoline","Automatic",563,"6.75L V12 twin-turbo",5.3,250,"available","rolls-royce-phantom-series.webp"],
 ["Lamborghini","Aventador",2017,390000,12000,"Coupe","Gasoline","ISR",691,"6.5L V12",2.9,350,"sold","lamborghini-aventador.webp"],
 ["Porsche","Carrera GT",2006,1450000,9800,"Roadster","Gasoline","Manual",603,"5.7L V10",3.5,330,"sold","car-3.webp"],
];
// Which video belongs to which car (files live in frontend/public/video). Change freely.
const VIDEOS: Record<string, string> = { "ferrari-sf90-stradale-2022": "/video/ferari.mp4", "ferrari-488-pista-spider-2019": "/video/ferari-green.mp4", "ferrari-812-gts-2021": "/video/ferari1.mp4", "lamborghini-revuelto-2024": "/video/lumborgini.mp4", "rolls-royce-phantom-series-2022": "/video/collection-roys-ferari.mp4" };
export const mediaVideos: { file: string; title: string }[] = [{ file: "ferari.mp4", title: "Ferrari" }, { file: "ferari-green.mp4", title: "Ferrari 488 Pista Spider" }, { file: "ferari1.mp4", title: "Ferrari 812 GTS" }, { file: "lumborgini.mp4", title: "Lamborghini" }, { file: "collection-roys-ferari.mp4", title: "Rolls-Royce & Ferrari" }, { file: "Audi-RS7.mp4", title: "Audi RS7" }, { file: "bmw.mp4", title: "BMW" }, { file: "bmw1.mp4", title: "BMW" }];
const FEATURED = new Set(["porsche-918-spyder-2015","lamborghini-revuelto-2024","mclaren-speedtail-2020","mercedes-benz-amg-one-2023","ferrari-purosangue-2023","ferrari-sf90-stradale-2022"]);
export const vehicles: Vehicle[] = rows.map(r => ({ slug:`${r[0]}-${r[1]}-${r[2]}`.toLowerCase().replace(/[^a-z0-9]+/g,"-"), make:r[0],model:r[1],year:r[2],price:r[3],mileage:r[4],body:r[5],fuel:r[6],transmission:r[7],hp:r[8],engine:r[9],accel:r[10],top:r[11],status:r[12],featured:FEATURED.has(`${r[0]}-${r[1]}-${r[2]}`.toLowerCase().replace(/[^a-z0-9]+/g,"-")),image:`/cars/${r[13]}`, gallery:[`/cars/${r[13]}`], ...(r[1]==="SF90 Stradale"?{tagline:{en:"Plug-in Hybrid Supercar",fa:"سوپرکار هیبریدی پلاگین"},cc:3990,battery:"7.9 kWh",seats:2,drive:"AWD",iceHp:"780 CV",motors:3}:{}), ...(r[1]==="Revuelto"?{gallery:["/cars/lamborghini-revuelto1.webp","/cars/lumborghini1.webp","/cars/lumborghini2.webp"]}:{}), ...(r[1]==="918 Spyder"?{gallery:["/cars/hero-poster.webp","/cars/car-2.webp"]}:{}), ...(VIDEOS[`${r[0]}-${r[1]}-${r[2]}`.toLowerCase().replace(/[^a-z0-9]+/g,"-")] ? { video: VIDEOS[`${r[0]}-${r[1]}-${r[2]}`.toLowerCase().replace(/[^a-z0-9]+/g,"-")] } : {}) }));
export const usd = (n:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
export const makes = [...new Set(vehicles.map(v=>v.make))];
