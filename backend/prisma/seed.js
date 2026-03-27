const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Default user
  const user = await prisma.user.upsert({
    where: { email: 'guest@flipkart.com' },
    update: {},
    create: { name: 'Guest User', email: 'guest@flipkart.com', phone: '9999999999' },
  });
  console.log('✅ User created:', user.email);

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 'mobiles' }, update: {}, create: { name: 'Mobiles', slug: 'mobiles', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200' } }),
    prisma.category.upsert({ where: { slug: 'laptops' }, update: {}, create: { name: 'Laptops', slug: 'laptops', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200' } }),
    prisma.category.upsert({ where: { slug: 'fashion' }, update: {}, create: { name: 'Fashion', slug: 'fashion', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' } }),
    prisma.category.upsert({ where: { slug: 'electronics' }, update: {}, create: { name: 'Electronics', slug: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' } }),
    prisma.category.upsert({ where: { slug: 'home-kitchen' }, update: {}, create: { name: 'Home & Kitchen', slug: 'home-kitchen', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200' } }),
    prisma.category.upsert({ where: { slug: 'books' }, update: {}, create: { name: 'Books', slug: 'books', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200' } }),
  ]);
  const [mobiles, laptops, fashion, electronics, homeKitchen, books] = categories;
  console.log('✅ Categories created');

  // Products data
  const productsData = [
    // Mobiles
    { name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-galaxy-s24-ultra', brand: 'Samsung', categoryId: mobiles.id, price: 124999, mrp: 134999, stock: 50, rating: 4.5, reviewCount: 2341,
      description: 'Experience the ultimate Galaxy with S24 Ultra featuring a 200MP camera, Snapdragon 8 Gen 3, and integrated S Pen.',
      images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500','https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=500','https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500'],
      specs: [['Display','6.8" QHD+ Dynamic AMOLED 2X'],['Processor','Snapdragon 8 Gen 3'],['RAM','12 GB'],['Storage','256 GB'],['Battery','5000 mAh'],['Camera','200 MP + 12 MP + 10 MP + 10 MP'],['OS','Android 14'],['5G','Yes']] },
    { name: 'Apple iPhone 15 Pro', slug: 'apple-iphone-15-pro', brand: 'Apple', categoryId: mobiles.id, price: 129900, mrp: 134900, stock: 35, rating: 4.7, reviewCount: 5678,
      description: 'iPhone 15 Pro with A17 Pro chip, titanium design, and pro camera system with 48MP main camera.',
      images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500','https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500','https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500'],
      specs: [['Display','6.1" Super Retina XDR OLED'],['Chip','Apple A17 Pro'],['RAM','8 GB'],['Storage','128 GB'],['Battery','3274 mAh'],['Camera','48 MP + 12 MP + 12 MP'],['OS','iOS 17'],['5G','Yes']] },
    { name: 'OnePlus 12R', slug: 'oneplus-12r', brand: 'OnePlus', categoryId: mobiles.id, price: 39999, mrp: 44999, stock: 80, rating: 4.4, reviewCount: 1234,
      description: 'OnePlus 12R with Snapdragon 8 Gen 2, 50MP triple camera, and 100W SUPERVOOC charging.',
      images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500','https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500','https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500'],
      specs: [['Display','6.78" LTPO AMOLED 120Hz'],['Processor','Snapdragon 8 Gen 2'],['RAM','8 GB'],['Storage','128 GB'],['Battery','5500 mAh'],['Charging','100W SUPERVOOC'],['Camera','50 MP + 8 MP + 2 MP'],['5G','Yes']] },
    { name: 'Realme GT 6', slug: 'realme-gt-6', brand: 'Realme', categoryId: mobiles.id, price: 34999, mrp: 39999, stock: 60, rating: 4.3, reviewCount: 876,
      description: 'Realme GT 6 powered by Snapdragon 8s Gen 3, 6000 mAh battery, and 120W charging.',
      images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500','https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500','https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'],
      specs: [['Display','6.78" AMOLED 120Hz'],['Processor','Snapdragon 8s Gen 3'],['RAM','12 GB'],['Storage','256 GB'],['Battery','6000 mAh'],['Charging','120W'],['Camera','50 MP + 8 MP + 2 MP'],['5G','Yes']] },
    { name: 'Xiaomi 14', slug: 'xiaomi-14', brand: 'Xiaomi', categoryId: mobiles.id, price: 69999, mrp: 74999, stock: 40, rating: 4.5, reviewCount: 543,
      description: 'Xiaomi 14 with Leica optics, Snapdragon 8 Gen 3, and 90W HyperCharge.',
      images: ['https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500','https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500','https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'],
      specs: [['Display','6.36" AMOLED 120Hz'],['Processor','Snapdragon 8 Gen 3'],['RAM','12 GB'],['Storage','256 GB'],['Battery','4610 mAh'],['Charging','90W'],['Camera','50 MP Leica + 50 MP + 50 MP'],['5G','Yes']] },
    // Laptops
    { name: 'Apple MacBook Air M3', slug: 'apple-macbook-air-m3', brand: 'Apple', categoryId: laptops.id, price: 114900, mrp: 119900, stock: 25, rating: 4.8, reviewCount: 3456,
      description: 'MacBook Air with M3 chip, 18-hour battery life, 13.6-inch Liquid Retina display.',
      images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500','https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500','https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500'],
      specs: [['Processor','Apple M3 8-core'],['RAM','8 GB Unified'],['Storage','256 GB SSD'],['Display','13.6" Liquid Retina'],['Battery','Up to 18 hours'],['OS','macOS Sonoma'],['Weight','1.24 kg'],['Ports','2x Thunderbolt 4, MagSafe 3']] },
    { name: 'Dell XPS 15', slug: 'dell-xps-15', brand: 'Dell', categoryId: laptops.id, price: 149990, mrp: 164990, stock: 20, rating: 4.6, reviewCount: 1234,
      description: 'Dell XPS 15 with Intel Core i7-13700H, NVIDIA RTX 4060, 15.6" OLED display.',
      images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500','https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500','https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500'],
      specs: [['Processor','Intel Core i7-13700H'],['RAM','16 GB DDR5'],['Storage','512 GB NVMe SSD'],['Display','15.6" OLED 3.5K'],['GPU','NVIDIA RTX 4060'],['Battery','86 WHr'],['OS','Windows 11 Home'],['Weight','1.86 kg']] },
    { name: 'HP Pavilion Aero 13', slug: 'hp-pavilion-aero-13', brand: 'HP', categoryId: laptops.id, price: 74990, mrp: 84990, stock: 30, rating: 4.4, reviewCount: 987,
      description: 'Ultra-light HP Pavilion Aero 13 with AMD Ryzen 7, weighing just 966g.',
      images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500','https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500','https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
      specs: [['Processor','AMD Ryzen 7 7735U'],['RAM','16 GB LPDDR5'],['Storage','512 GB NVMe SSD'],['Display','13.3" WUXGA IPS'],['GPU','AMD Radeon Graphics'],['Battery','43 WHr'],['OS','Windows 11 Home'],['Weight','966 g']] },
    { name: 'Lenovo IdeaPad Slim 5', slug: 'lenovo-ideapad-slim-5', brand: 'Lenovo', categoryId: laptops.id, price: 59990, mrp: 69990, stock: 45, rating: 4.3, reviewCount: 2109,
      description: 'Lenovo IdeaPad Slim 5 with AMD Ryzen 5, 14" display, and all-day battery.',
      images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500','https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500','https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500'],
      specs: [['Processor','AMD Ryzen 5 7530U'],['RAM','16 GB DDR4'],['Storage','512 GB SSD'],['Display','14" FHD IPS'],['GPU','AMD Radeon Graphics'],['Battery','Up to 10 hours'],['OS','Windows 11 Home'],['Weight','1.46 kg']] },
    // Fashion
    { name: 'Nike Air Max 270', slug: 'nike-air-max-270', brand: 'Nike', categoryId: fashion.id, price: 9995, mrp: 13995, stock: 100, rating: 4.5, reviewCount: 4567,
      description: 'Nike Air Max 270 with Max Air unit in the heel for all-day comfort and style.',
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500','https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500','https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500'],
      specs: [['Type','Running/Lifestyle'],['Upper','Mesh and synthetic'],['Sole','Rubber'],['Closure','Lace-up'],['Cushioning','Air Max unit'],['Gender','Unisex'],['Country','Vietnam'],['Warranty','6 months']] },
    { name: 'Adidas Ultraboost 23', slug: 'adidas-ultraboost-23', brand: 'Adidas', categoryId: fashion.id, price: 14999, mrp: 17999, stock: 75, rating: 4.6, reviewCount: 3210,
      description: 'Adidas Ultraboost 23 with BOOST midsole technology for ultimate energy return.',
      images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500','https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500','https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500'],
      specs: [['Type','Running'],['Upper','Primeknit+'],['Midsole','BOOST'],['Outsole','Continental Rubber'],['Drop','10 mm'],['Gender','Unisex'],['Weight','310 g'],['Warranty','6 months']] },
    { name: 'Puma RS-X3 Sneakers', slug: 'puma-rs-x3-sneakers', brand: 'Puma', categoryId: fashion.id, price: 5999, mrp: 8999, stock: 120, rating: 4.2, reviewCount: 1876,
      description: 'Puma RS-X3 with chunky RS running system technology for a retro-inspired look.',
      images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500','https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500','https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'],
      specs: [['Type','Lifestyle'],['Upper','Textile and synthetic'],['Midsole','RS foam'],['Closure','Lace-up'],['Gender','Unisex'],['Country','Vietnam'],['Heel Height','3.5 cm'],['Warranty','3 months']] },
    { name: 'H&M Slim Fit Jeans', slug: 'hm-slim-fit-jeans', brand: 'H&M', categoryId: fashion.id, price: 1499, mrp: 2499, stock: 200, rating: 4.1, reviewCount: 5432,
      description: 'H&M slim fit jeans in stretch denim, 5-pocket styling with zip fly and button.',
      images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500','https://images.unsplash.com/photo-1548536468-94a37f1f57f4?w=500','https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=500'],
      specs: [['Fit','Slim'],['Material','98% Cotton, 2% Elastane'],['Wash','Machine wash'],['Rise','Regular'],['Closure','Zip fly with button'],['Style','5-pocket'],['Care','Cold wash'],['Origin','Bangladesh']] },
    { name: 'Levi\'s 501 Original Jeans', slug: 'levis-501-original-jeans', brand: "Levi's", categoryId: fashion.id, price: 3299, mrp: 4599, stock: 150, rating: 4.5, reviewCount: 8765,
      description: "The original straight-leg jeans that started it all. Levi's 501 with button fly.",
      images: ['https://images.unsplash.com/photo-1548536468-94a37f1f57f4?w=500','https://images.unsplash.com/photo-1542272604-787c3835535d?w=500','https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=500'],
      specs: [['Fit','Straight'],['Material','100% Cotton'],['Closure','Button fly'],['Rise','Regular'],['Style','5-pocket'],['Care','Machine wash'],['Shrinkage','Shrink-to-fit'],['Origin','Bangladesh']] },
    // Electronics
    { name: 'Sony WH-1000XM5 Headphones', slug: 'sony-wh-1000xm5', brand: 'Sony', categoryId: electronics.id, price: 24990, mrp: 34990, stock: 60, rating: 4.7, reviewCount: 7654,
      description: 'Sony WH-1000XM5 with industry-leading noise cancellation, 30-hour battery life.',
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500','https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500','https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500'],
      specs: [['Type','Over-ear'],['Driver','30 mm'],['Frequency','4 Hz – 40 kHz'],['Battery','30 hours'],['Charging','USB-C, 3 min = 3 hrs'],['Noise Cancellation','Yes (8 mics)'],['Bluetooth','5.2'],['Weight','250 g']] },
    { name: 'JBL Flip 6 Speaker', slug: 'jbl-flip-6-speaker', brand: 'JBL', categoryId: electronics.id, price: 9999, mrp: 14999, stock: 85, rating: 4.5, reviewCount: 4321,
      description: 'JBL Flip 6 portable speaker with powerful sound, IP67 waterproof, 12h playtime.',
      images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500','https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500','https://images.unsplash.com/photo-1571125338780-a96dbb2e2c48?w=500'],
      specs: [['Output Power','30W'],['Battery','12 hours'],['Water Resistance','IP67'],['Bluetooth','5.1'],['Driver','1 tweeter + 1 woofer'],['Charging','USB-C'],['Weight','550 g'],['Dimensions','170 x 72 x 72 mm']] },
    { name: 'Samsung 55" 4K Smart TV', slug: 'samsung-55-4k-smart-tv', brand: 'Samsung', categoryId: electronics.id, price: 54990, mrp: 74990, stock: 30, rating: 4.5, reviewCount: 2345,
      description: 'Samsung Crystal 4K UHD Smart TV with Tizen OS, HDR, and Crystal Processor 4K.',
      images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500','https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=500','https://images.unsplash.com/photo-1601944177325-f8867652837f?w=500'],
      specs: [['Screen Size','55 inches'],['Resolution','4K Ultra HD (3840x2160)'],['Display','Crystal UHD'],['HDR','HDR10+'],['Smart TV','Tizen OS'],['HDMI Ports','3'],['USB Ports','2'],['Refresh Rate','60 Hz']] },
    { name: 'LG 32" Gaming Monitor', slug: 'lg-32-gaming-monitor', brand: 'LG', categoryId: electronics.id, price: 31990, mrp: 39990, stock: 40, rating: 4.4, reviewCount: 1567,
      description: 'LG 32" QHD gaming monitor with 165Hz refresh rate, 1ms response time, G-Sync compatible.',
      images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500','https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500','https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500'],
      specs: [['Size','32 inches'],['Resolution','QHD (2560x1440)'],['Panel','IPS'],['Refresh Rate','165 Hz'],['Response Time','1 ms'],['HDR','HDR10'],['Ports','DisplayPort 1.4, HDMI 2.0 x2'],['G-Sync','Compatible']] },
    // Home & Kitchen
    { name: 'Instant Pot Duo 7-in-1', slug: 'instant-pot-duo-7in1', brand: 'Instant Pot', categoryId: homeKitchen.id, price: 7999, mrp: 10999, stock: 70, rating: 4.6, reviewCount: 9876,
      description: 'Instant Pot Duo 7-in-1 electric pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, warmer.',
      images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500','https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=500','https://images.unsplash.com/photo-1585515320310-259814833e62?w=500'],
      specs: [['Capacity','6 Quart / 5.7 L'],['Functions','7-in-1'],['Power','1000 W'],['Programs','13 customizable'],['Material','Stainless Steel'],['Safety','10 safety mechanisms'],['Weight','5.4 kg'],['Warranty','1 year']] },
    { name: 'Dyson V15 Detect Vacuum', slug: 'dyson-v15-detect-vacuum', brand: 'Dyson', categoryId: homeKitchen.id, price: 62900, mrp: 72900, stock: 25, rating: 4.7, reviewCount: 2134,
      description: 'Dyson V15 Detect with laser dust detection, 60-minute battery, powerful suction.',
      images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500','https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=500','https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500'],
      specs: [['Suction','230 AW'],['Battery','Up to 60 min'],['Weight','3.1 kg'],['Bin Capacity','0.77 L'],['Filter','HEPA'],['Noise','73 dB'],['Charge Time','4.5 hours'],['Warranty','2 years']] },
    { name: 'Prestige IRIS 750W Mixer Grinder', slug: 'prestige-iris-mixer-grinder', brand: 'Prestige', categoryId: homeKitchen.id, price: 2799, mrp: 4499, stock: 150, rating: 4.3, reviewCount: 6543,
      description: 'Prestige IRIS 750W mixer grinder with 3 stainless steel jars and 3-speed control.',
      images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=500','https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500','https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=500'],
      specs: [['Power','750 W'],['Speed','3 speeds + pulse'],['Jars','3 (1.5L, 1.0L, 0.4L)'],['Material','Stainless Steel'],['Motor','Copper Motor'],['Safety','GFI Protected'],['Noise Reduction','Yes'],['Warranty','2 years']] },
    // Books
    { name: 'Clean Code by Robert C. Martin', slug: 'clean-code-robert-martin', brand: 'Pearson', categoryId: books.id, price: 549, mrp: 899, stock: 200, rating: 4.7, reviewCount: 12345,
      description: 'A Handbook of Agile Software Craftsmanship. Learn to write clean, readable, maintainable code.',
      images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500','https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500','https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500'],
      specs: [['Author','Robert C. Martin'],['Pages','431'],['Publisher','Prentice Hall'],['Language','English'],['Edition','1st'],['ISBN','978-0132350884'],['Format','Paperback'],['Genre','Programming']] },
    { name: 'Atomic Habits by James Clear', slug: 'atomic-habits-james-clear', brand: 'Penguin', categoryId: books.id, price: 399, mrp: 599, stock: 300, rating: 4.8, reviewCount: 45678,
      description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. #1 international bestseller.',
      images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500','https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500','https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500'],
      specs: [['Author','James Clear'],['Pages','319'],['Publisher','Avery'],['Language','English'],['ISBN','978-0735211292'],['Format','Paperback'],['Genre','Self-Help'],['Year','2018']] },
    { name: 'The Pragmatic Programmer', slug: 'pragmatic-programmer', brand: 'Addison-Wesley', categoryId: books.id, price: 699, mrp: 999, stock: 150, rating: 4.6, reviewCount: 8901,
      description: 'Your Journey to Mastery, 20th Anniversary Edition. Essential read for every developer.',
      images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500','https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500','https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500'],
      specs: [['Author','David Thomas & Andrew Hunt'],['Pages','352'],['Publisher','Addison-Wesley'],['Language','English'],['Edition','20th Anniversary'],['ISBN','978-0135957059'],['Format','Paperback'],['Genre','Programming']] },
  ];

  for (const p of productsData) {
    const discountPct = Math.round(((p.mrp - p.price) / p.mrp) * 100);
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name, slug: p.slug, brand: p.brand, categoryId: p.categoryId,
        price: p.price, mrp: p.mrp, discountPct,
        stock: p.stock, rating: p.rating, reviewCount: p.reviewCount,
        description: p.description,
        images: {
          create: p.images.map((url, i) => ({ url, isPrimary: i === 0, sortOrder: i }))
        },
        specs: {
          create: p.specs.map(([key, value]) => ({ key, value }))
        }
      }
    });
    console.log(`  ✅ Product: ${product.name}`);
  }

  console.log('\n🎉 Seeding complete!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
