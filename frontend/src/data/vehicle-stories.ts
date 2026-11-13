// Model facts shown under "Condition & history" on each car page (English + Persian).
// Model facts come from public manufacturer information. Add car-specific details
// (colour, options, service record, owners) to a car's entry once you have the real car.
export type Story = { en: string; fa: string };

export const handover: Story = {
  en: "Every car offered through Motors USA goes through an inspection and a document check before handover. Ask us for the inspection report, service records and ownership papers of this specific car, and we will arrange a viewing or an independent inspection on request.",
  fa: "هر خودرویی که از طریق موتورز یو‌اس‌ای عرضه می‌شود پیش از تحویل بازرسی و بررسی مدارک می‌شود. گزارش بازرسی، سوابق سرویس و مدارک مالکیت همین خودرو را از ما بخواهید؛ در صورت درخواست، بازدید حضوری یا بازرسی مستقل هم هماهنگ می‌کنیم.",
};

export const stories: Record<string, Story> = {
  "porsche-918-spyder-2015": {
    en: "The 918 Spyder was built from 2013 to 2015 in a strictly limited run of 918 cars. It pairs a 4.6-litre V8 with two electric motors for a combined 887 hp, and in 2013 Porsche lapped the Nürburgring Nordschleife in 6:57, a record for production road cars at the time. It is often grouped with the LaFerrari and McLaren P1 as one of the defining hybrid hypercars of the 2010s.",
    fa: "پورشه ۹۱۸ اسپایدر بین سال‌های ۲۰۱۳ تا ۲۰۱۵ در تیراژی کاملاً محدود و فقط ۹۱۸ دستگاه ساخته شد. این خودرو موتور ۴٫۶ لیتری V8 را با دو موتور الکتریکی ترکیب می‌کند و مجموع قدرت آن به ۸۸۷ اسب بخار می‌رسد. پورشه در سال ۲۰۱۳ با آن مسیر نوربورگ‌رینگ نوردشلایفه را در ۶ دقیقه و ۵۷ ثانیه طی کرد؛ رکوردی که در آن زمان برای خودروهای تولیدی جاده‌ای ثبت شد. این مدل را معمولاً کنار لافراری و مک‌لارن P1 از شاخص‌ترین هایپرکارهای هیبریدی دهه ۲۰۱۰ می‌دانند.",
  },
  "ferrari-sf90-stradale-2022": {
    en: "Unveiled in 2019, the SF90 Stradale is Ferrari's first series-production plug-in hybrid and takes its name from the 90th anniversary of Scuderia Ferrari. A 4.0-litre twin-turbo V8 (780 CV) works with three electric motors, two on the front axle and one at the rear, for 986 hp and all-wheel drive, with a pure-electric mode for quiet low-speed driving.",
    fa: "SF90 استرادله که در سال ۲۰۱۹ معرفی شد، نخستین خودروی هیبریدی پلاگین تولید انبوه فراری است و نام آن از نودمین سالگرد تأسیس اسکودریا فراری گرفته شده است. موتور ۴٫۰ لیتری V8 دو توربو (۷۸۰ اسب بخار) با سه موتور الکتریکی، دو موتور در محور جلو و یکی در محور عقب، همکاری می‌کند تا مجموع قدرت به ۹۸۶ اسب بخار و دیفرانسیل چهارچرخ‌محرک برسد؛ ضمناً حالت تمام‌الکتریکی برای رانندگی آرام در سرعت پایین هم دارد.",
  },
  "ferrari-purosangue-2023": {
    en: "Introduced in 2022, the Purosangue is the first four-door, four-seat car in Ferrari's history; the name means 'thoroughbred' in Italian. It keeps a naturally aspirated 6.5-litre V12 producing 715 hp, paired with an advanced active suspension and all-wheel drive, so it can carry four adults and their luggage without giving up the character of a Ferrari V12.",
    fa: "پوروسانگوه که در سال ۲۰۲۲ معرفی شد، نخستین خودروی چهار در و چهار نفره در تاریخ فراری است و نام آن در ایتالیایی به معنای «اصیل‌زاده» است. این خودرو موتور ۶٫۵ لیتری V12 بدون توربو را با قدرت ۷۱۵ اسب بخار حفظ کرده و با سیستم تعلیق فعال پیشرفته و چهارچرخ‌محرک ترکیب شده است؛ نتیجه، خودرویی که چهار سرنشین و بار آن‌ها را جا می‌دهد، بی‌آنکه شخصیت یک V12 فراری را از دست بدهد.",
  },
  "ferrari-488-pista-spider-2019": {
    en: "The 488 Pista Spider is the open-top version of Ferrari's track-derived 488 Pista ('pista' means 'track' in Italian). Its 3.9-litre twin-turbo V8 makes 710 hp, drawing on technology from Ferrari's racing programmes, and a retractable hard top lets the driver switch between coupe and open-air driving at the touch of a button.",
    fa: "۴۸۸ پیستا اسپایدر نسخه‌ی کروک فراری ۴۸۸ پیستا است که از فناوری‌های مسابقه‌ای الهام گرفته؛ «پیستا» در ایتالیایی یعنی «پیست». موتور ۳٫۹ لیتری V8 دو توربو آن ۷۱۰ اسب بخار قدرت دارد و از تجربه‌ی فراری در مسابقات بهره برده است. سقف سخت جمع‌شونده هم با یک دکمه خودرو را از کوپه به کروک تبدیل می‌کند.",
  },
  "ferrari-812-gts-2021": {
    en: "Ferrari presented the 812 GTS in 2019 as its first series-production V12 spider since the 1969 365 GTS/4 Daytona Spider. Behind the front axle sits a naturally aspirated 6.5-litre V12 producing 789 hp and revving to 8,500 rpm, paired with a seven-speed dual-clutch gearbox in a rear-wheel-drive grand tourer with a retractable hard top.",
    fa: "فراری ۸۱۲ GTS را در سال ۲۰۱۹ به‌عنوان نخستین اسپایدر V12 تولید انبوه خود پس از ۳۶۵ GTS/4 دیتونا اسپایدر مدل ۱۹۶۹ معرفی کرد. موتور ۶٫۵ لیتری V12 بدون توربو با قدرت ۷۸۹ اسب بخار و دور موتور تا ۸٬۵۰۰ در دقیقه، با گیربکس دو کلاچه هفت سرعته در یک خودروی گرند تورر عقب‌محرک با سقف سخت جمع‌شونده کار می‌کند.",
  },
  "lamborghini-revuelto-2024": {
    en: "Unveiled in 2023, the Revuelto is Lamborghini's first series-production plug-in hybrid and the successor to the Aventador. A naturally aspirated 6.5-litre V12 is combined with three electric motors for about 1,000 hp, driving all four wheels through a new eight-speed dual-clutch gearbox, while a carbon-fibre monocoque keeps the structure light and rigid.",
    fa: "رووِلتو که در سال ۲۰۲۳ معرفی شد، نخستین خودروی هیبریدی پلاگین تولید انبوه لامبورگینی و جانشین آونتادور است. موتور ۶٫۵ لیتری V12 بدون توربو با سه موتور الکتریکی ترکیب شده و مجموع قدرت را به حدود ۱٬۰۰۰ اسب بخار می‌رساند؛ قدرت از طریق گیربکس جدید دو کلاچه هشت سرعته به هر چهار چرخ می‌رسد و شاسی تک‌پوسته‌ی فیبر کربن، سازه را سبک و سخت نگه می‌دارد.",
  },
  "lamborghini-aventador-svj-2019": {
    en: "The Aventador SVJ ('Superveloce Jota') arrived in 2018, limited to 900 coupés, with a 6.5-litre V12 producing 759 hp. Its ALA active aerodynamics system adjusts airflow through the wing and body for downforce or low drag, and in 2018 it set a production-car lap record at the Nürburgring Nordschleife with a time of 6:44.97.",
    fa: "آونتادور SVJ (سوپروِلوچه یوتا) در سال ۲۰۱۸ و در تیراژ محدود ۹۰۰ دستگاه کوپه عرضه شد و موتور ۶٫۵ لیتری V12 آن ۷۵۹ اسب بخار قدرت دارد. سیستم ایرودینامیک فعال ALA جریان هوا را از طریق بال و بدنه برای ایجاد نیروی فشاری یا کاهش مقاومت تنظیم می‌کند و در سال ۲۰۱۸ رکورد دور خودروهای تولیدی را در نوربورگ‌رینگ نوردشلایفه با زمان ۶:۴۴٫۹۷ ثبت کرد.",
  },
  "lamborghini-veneno-2014": {
    en: "The Veneno was unveiled at the 2013 Geneva Motor Show to celebrate Lamborghini's 50th anniversary, and only a handful were ever built, making it among the rarest Lamborghinis ever offered for the road. Its 6.5-litre V12 delivers 740 hp, and its bodywork was shaped by aerodynamics taken from motorsport, with a carbon-fibre monocoque at its core.",
    fa: "ونِنو در نمایشگاه خودروی ژنو ۲۰۱۳ و به مناسبت پنجاهمین سالگرد تأسیس لامبورگینی معرفی شد و تنها شمار انگشت‌شماری از آن ساخته شد؛ به همین دلیل از کمیاب‌ترین لامبورگینی‌هایی است که برای جاده عرضه شده‌اند. موتور ۶٫۵ لیتری V12 آن ۷۴۰ اسب بخار قدرت دارد و بدنه‌اش با ایرودینامیک الهام‌گرفته از مسابقات شکل گرفته و هسته‌ی سازه‌اش از فیبر کربن است.",
  },
  "mclaren-senna-2019": {
    en: "Named in honour of Ayrton Senna, the McLaren Senna launched in 2018 as the most track-focused road car McLaren had built, limited to 500 cars. A carbon-fibre monocoque and a 4.0-litre twin-turbo V8 producing 789 hp go together with aerodynamics capable of generating up to 800 kg of downforce.",
    fa: "مک‌لارن سنا به افتخار آیرتون سنا نام‌گذاری شد و در سال ۲۰۱۸ به‌عنوان پیست‌محورترین خودروی جاده‌ای مک‌لارن تا آن زمان و در تیراژ ۵۰۰ دستگاه عرضه شد. شاسی تک‌پوسته‌ی فیبر کربن و موتور ۴٫۰ لیتری V8 دو توربو با ۷۸۹ اسب بخار، همراه با ایرودینامیکی که تا ۸۰۰ کیلوگرم نیروی فشاری تولید می‌کند، ویژگی‌های اصلی آن است.",
  },
  "mclaren-speedtail-2020": {
    en: "Revealed in 2018 and limited to 106 cars, the Speedtail is McLaren's spiritual successor to the McLaren F1, with the same three-seat layout and a central driving position. A petrol-electric hybrid system delivers 1,055 hp, and McLaren states a top speed of 403 km/h (250 mph), making it the fastest McLaren road car.",
    fa: "اسپیدتیل که در سال ۲۰۱۸ معرفی شد و تیراژ آن به ۱۰۶ دستگاه محدود است، جانشین معنوی مک‌لارن F1 به‌شمار می‌آید؛ با همان چیدمان سه‌نفره و صندلی راننده در وسط. سیستم هیبریدی بنزینی-الکتریکی آن ۱٬۰۵۵ اسب بخار قدرت می‌دهد و مک‌لارن حداکثر سرعت ۴۰۳ کیلومتر بر ساعت (۲۵۰ مایل) را برای آن اعلام کرده است؛ سریع‌ترین خودروی جاده‌ای مک‌لارن.",
  },
  "mclaren-p1-gtr-2015": {
    en: "The P1 GTR is the track-focused evolution of the McLaren P1 hybrid hypercar, built in a very small run for P1 owners. Its 3.8-litre twin-turbo V8 and electric motor produce a combined 986 hp, with a wider body, a fixed rear wing and more downforce than the road car.",
    fa: "P1 GTR نسخه‌ی پیست‌محور و تکامل‌یافته‌ی هایپرکار هیبریدی مک‌لارن P1 است که در تیراژی بسیار محدود برای مالکان P1 ساخته شد. موتور ۳٫۸ لیتری V8 دو توربو و موتور الکتریکی آن روی هم ۹۸۶ اسب بخار قدرت می‌دهند و نسبت به نسخه‌ی جاده‌ای بدنه‌ی پهن‌تر، بال عقب ثابت و نیروی فشاری بیشتری دارد.",
  },
  "mercedes-benz-amg-one-2023": {
    en: "The Mercedes-AMG ONE brings a Formula 1 powertrain to the road: a 1.6-litre turbocharged V6 hybrid derived from the Mercedes-AMG Petronas F1 team's power unit, combined with four electric motors for 1,063 hp. Production is limited to 275 cars, and it has a rated top speed of 352 km/h.",
    fa: "مرسدس-AMG وان یک پیشرانه‌ی فرمول ۱ را به جاده آورده است: موتور ۱٫۶ لیتری V6 توربوی هیبریدی برگرفته از پیشرانه‌ی تیم مرسدس-AMG پترونس در فرمول ۱، همراه با چهار موتور الکتریکی که مجموع قدرت را به ۱٬۰۶۳ اسب بخار می‌رسانند. تیراژ آن به ۲۷۵ دستگاه محدود است و حداکثر سرعت اعلام‌شده‌ی آن ۳۵۲ کیلومتر بر ساعت است.",
  },
  "koenigsegg-jesko-attack-2022": {
    en: "Presented at the 2019 Geneva Motor Show, the Jesko is named after Christian von Koenigsegg's father, and the Attack is its high-downforce, track-focused version. A 5.0-litre twin-turbo V8 produces 1,280 hp on petrol and is paired with Koenigsegg's nine-speed Light Speed Transmission, with production limited to 125 cars across the Jesko range.",
    fa: "جسکو در نمایشگاه ژنو ۲۰۱۹ معرفی شد و نامش از پدر کریستین فون کوئنیگزگ گرفته شده است؛ نسخه‌ی اتک، مدل پیست‌محور و پرنیروی فشاری آن است. موتور ۵٫۰ لیتری V8 دو توربو با بنزین ۱٬۲۸۰ اسب بخار قدرت تولید می‌کند و با گیربکس نه‌سرعته‌ی «لایت اسپید» کوئنیگزگ همراه است؛ تولید کل خانواده‌ی جسکو به ۱۲۵ دستگاه محدود شده است.",
  },
  "rolls-royce-phantom-series-2022": {
    en: "The Rolls-Royce Phantom Series II, introduced in 2022, refines the eighth-generation Phantom, hand-built at the marque's Goodwood plant in England. A 6.75-litre twin-turbo V12 produces 563 hp and delivers it so smoothly that the car feels almost silent at speed, while the self-levelling air suspension and extensive Bespoke personalisation underline its place as the brand's flagship.",
    fa: "رولز-رویس فانتوم سری دوم که در سال ۲۰۲۲ معرفی شد، نسخه‌ی بازبینی‌شده‌ی فانتوم نسل هشتم است که با دست در کارخانه‌ی گودوود انگلستان ساخته می‌شود. موتور ۶٫۷۵ لیتری V12 دو توربو ۵۶۳ اسب بخار قدرت را چنان نرم منتقل می‌کند که در سرعت، کابین تقریباً بی‌صدا می‌ماند؛ تعلیق بادی خودتراز و امکان شخصی‌سازی گسترده‌ی بسپوک هم جایگاه آن را به‌عنوان پرچم‌دار برند نشان می‌دهد.",
  },
  "lamborghini-aventador-2017": {
    en: "The Aventador launched in 2011 as the successor to the Murciélago and remained the flagship of Lamborghini's V12 line-up until production ended in 2022. A 6.5-litre V12, a carbon-fibre monocoque and a single-clutch ISR gearbox gave it a dramatic, unmistakable character. This car has found its new owner and stays listed in our archive.",
    fa: "آونتادور در سال ۲۰۱۱ به‌عنوان جانشین مورسیه‌لاگو معرفی شد و تا پایان تولید در سال ۲۰۲۲ پرچم‌دار خانواده‌ی V12 لامبورگینی بود. موتور ۶٫۵ لیتری V12، شاسی تک‌پوسته‌ی فیبر کربن و گیربکس تک‌کلاچه‌ی ISR شخصیتی نمایشی و کاملاً متمایز به آن داده بود. این خودرو مالک جدید خود را پیدا کرده و در آرشیو ما باقی مانده است.",
  },
  "porsche-carrera-gt-2006": {
    en: "The Carrera GT was built from 2004 to 2006, with just 1,270 cars produced. Its 5.7-litre V10, originally developed for a Le Mans racing programme, sits behind the driver with a carbon-fibre monocoque and a six-speed manual gearbox, and it is remembered as one of the last truly analogue supercars. This car has found its new owner and stays listed in our archive.",
    fa: "کررا جی‌تی بین سال‌های ۲۰۰۴ تا ۲۰۰۶ و تنها در ۱٬۲۷۰ دستگاه تولید شد. موتور ۵٫۷ لیتری V10 آن که ابتدا برای یک برنامه‌ی مسابقه‌ای لمان توسعه یافته بود، پشت راننده قرار دارد و همراه با شاسی تک‌پوسته‌ی فیبر کربن و گیربکس دستی شش سرعته، آن را به یکی از آخرین سوپراسپورت‌های واقعاً آنالوگ تبدیل کرده است. این خودرو مالک جدید خود را پیدا کرده و در آرشیو ما باقی مانده است.",
  },
};
