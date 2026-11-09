// DEMO DATA — replace with your real inventory (or move to PostgreSQL via prisma/schema.prisma)
export type Vehicle = { slug:string; make:string; model:string; year:number; price:number; mileage:number; body:string; fuel:string; transmission:string; hp:number; engine:string; color:string; status:"available"|"sold"; image:string; blurb:string };
const imgs = ["/cars/hero-poster.jpg","/cars/car-2.jpg","/cars/car-3.jpg"];
const rows: [string,string,number,number,number,string,string,string,number,string,string,"available"|"sold"][] = [
 ["Porsche","918 Spyder",2015,1850000,4200,"Roadster","Hybrid","PDK",887,"4.6L V8 + 2 e-motors","Liquid Metal Silver","available"],
 ["Ferrari","SF90 Stradale",2022,625000,3100,"Coupe","Hybrid","DCT",986,"4.0L V8 twin-turbo + 3 e-motors","Verde Britannico","available"],
 ["Lamborghini","Revuelto",2024,780000,900,"Coupe","Hybrid","DCT",1001,"6.5L V12 + 3 e-motors","Arancio Xanto","available"],
 ["McLaren","P1",2015,1650000,6500,"Coupe","Hybrid","DCT",903,"3.8L V8 twin-turbo + e-motor","Volcano Orange","available"],
 ["Ford","GT",2018,1200000,1800,"Coupe","Gasoline","DCT",647,"3.5L V6 twin-turbo","Liquid Blue","available"],
 ["Bugatti","Chiron Sport",2021,3300000,2550,"Coupe","Gasoline","DCT",1479,"8.0L W16 quad-turbo","Nocturne Black","available"],
 ["Chevrolet","Corvette Z06",2023,145000,1500,"Coupe","Gasoline","DCT",670,"5.5L flat-plane V8","Torch Red","available"],
 ["Porsche","Carrera GT",2006,1450000,9800,"Roadster","Gasoline","Manual",603,"5.7L V10","GT Silver","sold"],
];
export const vehicles: Vehicle[] = rows.map((r,i)=>({ slug:`${r[0]}-${r[1]}-${r[2]}`.toLowerCase().replace(/[^a-z0-9]+/g,"-"), make:r[0],model:r[1],year:r[2],price:r[3],mileage:r[4],body:r[5],fuel:r[6],transmission:r[7],hp:r[8],engine:r[9],color:r[10],status:r[11],image:imgs[i%3],blurb:`${r[2]} ${r[0]} ${r[1]}. Demo listing — replace with verified specs, service history and documents.` }));
export const usd = (n:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
export const makes = [...new Set(vehicles.map(v=>v.make))];
