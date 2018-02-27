/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  // Users Seed
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  // Products Seed
  const products = await Promise.all([
  Product.create(({
    brand: 'Karma Sauce',
    name: 'Bad Karma',
    description: 'An unusually addictive addition to any dish! Bad Karma Sauce add a sweet kick, full of red pepper, with a hearty texture coming from the butternut squash base. Finishing notes of aromatic spice from the honey & ginger. Delicious!',
    ingredients: 'red pepper, butternut squash, apple cider vinegar, onion, sweet potato, honey, garlic, salt, ginger',
    size: '5 oz',
    spiciness: 2.5,
    quantity: 40,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/548bc426d12bd321476b98f6ccff37b4.jpg?v=1508167630',
    tags: ['sweet', 'hearty texture', 'honey', 'ginger', 'not-too-hot', 'gluten free', 'award winner', 'medium-hot', 'mild-hot', 'karma-sauce']})),
  Product.create(({
    brand: 'Bravado Spice Co',
    name: 'Jalapeno & Green Apple Hot Sauce',
    description: 'The classic green of poblano & jalapeno peppers are familiar, but the Granny Smith apples packed into this hot sauce make it anything but ordinary. The mild heat passes quickly to reveal a zesty freshness that lingers. Finshes with a good helping of fresh garlic. Try it on a sandwich, or mixing it with mayo for a fresh take on aioli.',
    ingredients: 'granny smith apple, poblano peppers, jalapeno peppers, distilled vinegar, garlic, sea salt',
    size: '5 oz',
    spiciness: 2,
    quantity: 35,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/JALAPENOAPPLE_HOT_SAUCE.jpg?v=1511112689',
    tags: ['sweet', 'hearty texture', 'garlic', 'zesty', 'not-too-hot', 'mild-hot', 'bravado-spice-co']})),
  Product.create(({
    brand: 'Bravado Spice Co',
    name: 'Ghost Pepper & Blueberry Hot Sauce',
    description: 'The bold heat and fruit flavor of ghost pepper plays a confident counterpart to the blueberries and raspberries that make the base of this hot sauce. A healthy dose of ground black pepper makes its presence known in the finish. Pours easily, so watch out! Goes great with poultry, so definitely consider it for a chicken, turkey or game hen.',
    ingredients: 'blueberry, raspberry, distilled vinegar, ghost pepper mash (ghost pepper, vinegar, salt), ground black pepper, sea salt',
    size: '5 oz',
    spiciness: 6,
    quantity: 45,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/blueberryghostpepper-hotsauce.jpg?v=1511112881',
    tags: ['pretty-frikin-hot', 'fruity', 'ghost-pepper', 'hot-hot', 'hot-ones-sauce', 'bravado-spice-co']})),
  Product.create(({
    brand: 'Bravado Spice Co',
    name: 'Pineapple & Habanero Hot Sauce',
    description: 'Fresh pineapple dominates this sauce, shining through the habanero heat. Yellow bell pepper lends only a touch of sweetness. A great option for people who like fruit sauces but not overly sweet ones. Goes well with rice & beans, fish dishes, or mixed into a salad dressing.',
    ingredients: 'pineapple, habanero, yellow bell pepper, white wine vinegar, garlic, sea salt',
    size: '5 oz',
    spiciness: 4,
    quantity: 51,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/bravadopineapple1.jpg?v=1516838220',
    tags: ['fruity', 'habanero', 'medium-hot', 'bravado-spice-co']})),
  Product.create(({
    brand: 'Dawson\'s Hot Sauce',
    name: 'Heatonist #1',
    description: 'Sichuan Ghost Pepper Sauce Celebrating the one-year anniversary of HEATONIST\'s tasting room on Wythe Avenue, this sauce is a joining of smoke and citrus that highlights the unique flavors and sensory excitements of ghost pepper and Sichuan peppercorn. A sauce for the Heatonist in all of us.',
    ingredients: 'vinegar, extra virgin olive oil, garlic, ghost peppers, sichuan peppercorn, lemon, ginger, sea salt',
    size: '5 oz',
    spiciness: 9,
    quantity: 33,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/heatonist-1hotsauce.jpg?v=1510214734',
    tags: ['hottest-hot', 'ghost-pepper', 'heatonist', 'ginger', 'dawsons-hot-sauce']})),
  Product.create(({
    brand: 'Dirty Dick\'s',
    name: 'Hot Pepper Sauce with a Tropical Twist',
    description: 'Dirty Dick\'s Hot Sauce blends habanero peppers with tropical fruits for a sweet and spicy sauce. Let the sweetness of bananas, raisins, and pineapples linger on your palate and wait for the heat to kick in. Great for beef stir-fry, chicken wraps, and as a stand-alone dipping sauce for the daring.',
    ingredients: 'habanero Peppers, mangoes, pineapple, vinegar, bananas, brown sugar, raisins, onions, garlic, salt, spices',
    size: '5 oz',
    spiciness: 6,
    quantity: 37,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/DIRTY-DICKS-HOTSAUCE.jpg?v=1511112950',
    tags: ['hot-hot', 'medium-hot', 'tropical', 'sweet', 'dirty-dicks']})),
  Product.create(({
    brand: 'Queen Majesty',
    name: 'Jalapeno Tequila Lime Hot Sauce',
    description: 'Fresh Jalapeño gives this sauce a distinctly Baja zing, amplified by the clear flavors of white tequila & plenty of lime juice. What takes this sauce to the next level is the sweet/tart flavor that comes from the green apple. Try it with seafood dishes, or to punch-up a margarita.',
    ingredients: 'habanero peppers, mangoes, pineapple, vinegar, bananas, brown sugar, raisins, onions, garlic, salt, spices',
    size: '5 oz',
    spiciness: 3,
    quantity: 37,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/QMjalapenotequilalime1.jpg?v=1516315105',
    tags: ['zesty', 'lime', 'cilantro', 'medium-hot', 'queen-majesty']})),
  Product.create(({
    brand: 'Homeboy\'s Hot Sauce',
    name: 'Habanero',
    description: 'Have you ever wondered what a Lemonhead would taste like if it was in liquid form and packed with tons of habanero and spice? The closest you will get is Homeboy\'s Habanero hot sauce from Phoenix, Arizona. With hints of mustard and onion, this is a perfect tangy medium heat for multi-purpose saucing. Put a douse on your eggs in the morning for a zesty start to your day or jazz up a slice of pizza after a long one. Don\'t let the name fool you; homegirls will love this hot sauce just as much!',
    ingredients: 'habanero, vinegar, onion, carrot, mustard, salt, sugar, lemon juice',
    size: '4 oz',
    spiciness: 4.5,
    quantity: 37,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/8738c1ae89e1b7051edf909ed66d12b4.jpg?v=1508167906',
    tags: ['zesty', 'tangy', 'mustardy', 'medium-hot', 'homeboys']})),
  Product.create(({
    brand: 'Hot Ones',
    name: 'The Last Dab',
    description: 'One Dab to rule them all. The Last Dab. When Sean Evans and the Hot Ones team were looking for a sauce to deliver the final sendoff, to squeeze the last juicy secrets from their guests, they knew that no known pepper would do. So they came to HEATONIST. We partnered with Guinness World Record holding pepper breeder Smokin\' Ed Currie to create a sauce using his latest creation: Pepper X. More than simple mouth burn, Pepper X singes your soul. Starting with a pleasant burn in the mouth, the heat passes quickly, lulling you into a false confidence. You take another bite, enjoying the mustard and spice flavors. This would be great on jerk chicken, or Indian food! But then, WHAM! All of a sudden your skin goes cold and your stomach goes hot, and you realize the power of X. ** Limit 2 per order **',
    ingredients: 'pepper x peppers, distilled vinegar, ginger root, turmeric, coriander, cumin, dry mustard',
    size: '5 oz',
    spiciness: 10,
    quantity: 20,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/thelastdabhotsauce.jpg?v=1510679684',
    tags: ['hottest-hot', 'smokin-ed', 'pepper-x', 'west-indies-hot', 'hot-ones-sauce']})),
  Product.create(({
    brand: 'Dawson\'s Hot Sauce',
    name: 'Big Smoke',
    description: 'Loaded with pepper flavor, this sauce packs a flavorful punch. Look for the distinct tastes of Chipotle, Scotch Bonnet, Jalapeno and Red Sheppard, as well as fresh green chilis & spicy Vietnamese hots. This varied combination activates heat receptors all over the mouth making this sauce a unique tasting treat.',
    ingredients: 'chipotle peppers, vinegar, vietnamese chili, scotch bonnets, jalapeno, green chili, red sheppard, garlic, brown sugar, extra virgin olive oil, spices, sea salt',
    size: '5 oz',
    spiciness: 7,
    quantity: 33,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/641c269d2e8cef4fe9120ca05f2db08a.jpg?v=1508167587',
    tags: ['hot-hot', 'smoky', 'dawsons-hot-sauce']})),
  Product.create(({
    brand: 'Mellow Habanero',
    name: 'Hop in Heaven',
    description: 'Mellow Habanero Hop in Heaven is the hottest in the sauce lineup from ta-nm farm in Hyogo, Japan. The exquisite flavor of habanero fruit shines in this sauce, making it a wonderful pairing for a variety of foods, from omelettes to grilled meats to soups. A bit of dried mango cuts the sharpness of the heat just enough. With a captivating color, smooth texture and enticing habanero aroma, this sauce is a treat for the senses meant for aficionados of the habanero pepper.',
    ingredients: 'habanero peppers, rice vinegar, mangoes, salt, japanese peppers, hops',
    size: '120 ml (4.06 oz)',
    spiciness: 8,
    quantity: 24,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/HOPINHEAVEN1_ac19edfc-3830-4e97-ab1a-7cad569ec469.jpg?v=1517206603',
    tags: ['hot-hot', 'hottest-hot', 'mango', 'mellow-habanero']})),
  Product.create(({
    brand: 'Secret Aardvark Trading Co',
    name: 'Habanero Hot Sauce',
    description: 'Portland\'s famous table sauce, Secret Aardvark Habanero\'s unique Caribbean/Tex-Mex hybrid is made with flavorful Habanero peppers and roasted tomatoes. You\'ll want to use it on everything, so be careful if you only get one bottle.',
    ingredients: 'white wine vinegar, roasted tomatoes, habanero peppers, onion, carrot, sugar, prepared mustard, water, kosher salt, cornstarch, herbs, spices',
    size: '8 oz',
    spiciness: 5,
    quantity: 38,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/secretaardvark-hotsauce_3206989d-be63-428a-92ca-f9372222b3ec.jpg?v=1511210172',
    tags: ['medium-hot', 'caribbean', 'tex-mex', 'secret-aardvark-trading-co']})),
  Product.create(({
    brand: 'Secret Aardvark Trading Co',
    name: 'Drunken Jerk Sauce',
    description: 'Scotch Bonnet & Habanero peppers give this Jamaican-style Jerk sauce some serious heat. A touch of Caribbean dark rum keeps things cool & easy. Try this as a marinade on your favorite chicken or veggies to bring a bit of tropical sunshine to the dinner table.',
    ingredients: 'onions, soy sauce, apple cider vinegar, spices, habanero peppers, dark rum, canola oil, ginger, sugar, garlic',
    size: '8 oz',
    spiciness: 4,
    quantity: 17,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/secretaardvarkDRUNKENJERK-hotsauce.jpg?v=1510786587',
    tags: ['medium-hot', 'caribbean', 'secret-aardvark-trading-co']})),
  Product.create(({
    brand: 'High River Sauces',
    name: 'Hellacious Hot Sauce',
    description: 'Simply delicious, the Hellacious Hot Sauce has the right heat level to slather onto any dish. Slight sweetness from the agave & habanero is balanced by the tart lime juice. A touch of savory smokiness from the jalapeno rounds out the flavor. This sauce pours easily and goes well on a range of dishes - you\'ll want to keep it on your table.',
    ingredients: 'white vinegar, habanero mash, agave, chipotle powder, red pepper, garlic, lime juice',
    size: '5.4 oz',
    spiciness: 3,
    quantity: 13,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/d8d6a9f3536b200e5f0690fa63a8f0ca.jpg?v=1508167742',
    tags: ['mild-hot', 'bbq', 'high-river-sauces']})),
  Product.create(({
    brand: 'High River Sauces',
    name: 'Tears Of The Sun',
    description: 'Sweet fruits, including papaya, pineapple & mango, do a great job of balancing the heat profile of the Habaneros. Try it on fish, chicken, or even use it to spice up a guacamole - it\'s rare to see this level of heat in a sauce with so much fruit.',
    ingredients: 'white vinegar, habanero mash, agave, chipotle powder, red pepper, garlic, lime juice',
    size: '5.4 oz',
    spiciness: 5,
    quantity: 13,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/TEARSOFTHESUN1.jpg?v=1516677721',
    tags: ['medium-hot', 'fruity', 'tropical', 'zesty', 'high-river-sauces']})),
  Product.create(({
    brand: 'High River Sauces',
    name: 'Foo Foo Mama Choo',
    description: 'The exquisite flavor of the Carolina Reaper (at 1.5m Scoville units, the world\'s hottest) comes across beautifully in this painfully delicious sauce. Rice wine vinegar smoothes the opening, allowing the ginger & citrus notes of the Reaper to shine, then BAM! The moment the pepper makes its heat known is one you won\'t forget.',
    ingredients: 'roasted red peppers, fire roasted tomatoes, rice wine vinegar, reaper peppers, onions, brown sugar, garlic, soy sauce, ginger root, salt, white pepper, secret herbs, spices.',
    size: '5.4 oz',
    spiciness: 8.5,
    quantity: 13,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/92c332b73d028a4700cb206ae5420896.jpg?v=1508167765',
    tags: ['hottest-hot', 'carolina-reaper', 'smokin-ed', 'ginger', 'citrus', 'high-river-sauces']})),
  Product.create(({
    brand: 'Adoboloco Hot Sauce',
    name: 'Hamajang Kiawe Smoked Ghost Pepper',
    description: 'The combination of smoked Bhut Jolokia (Ghost Pepper) and fiery Habanero give this sauce an intense level of heat & flavor. Watch out, because the Ghost Pepper builds and may reach its hottest after 20-30 minutes. This sauce can add heat & flavor to your meal, just make sure you know what you\'re doing.',
    ingredients: 'apple cider vinegar, ghost peppers, habanero, sea salt, garlic',
    size: '5.6 oz',
    spiciness: 7,
    quantity: 24,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/adobolocohamajang.jpg?v=1510614455',
    tags: ['hot-hot', 'ghost-pepper', 'smoky', 'vinegary', 'savory', 'adoboloco-hot-sauce']})),
  Product.create(({
    brand: 'Légal Hot Sauce',
    name: 'Molho De Pimenta',
    description: 'Légal Hot sauce is made from a special recipe passed down by generations with a Brazilian pepper - the Malagueta. The pepper adds a touch of sweet to the vinegar base, along with other savory vegetable components. The name Légal means “cool” in Portuguese and is a nod to the carefree lifestyle of the Brazilian people. Don\'t think twice about splashing this sauce on fish, steak, eggs, pizza, or really anything!',
    ingredients: 'vegetables, vinegar, salt, spicy pepper',
    size: '5 oz',
    spiciness: 4,
    quantity: 19,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/legal1_1024x1024.jpg?v=1517200813',
    tags: ['mild-hot', 'not-too-hot', 'sweet', 'splashy', 'fresh', 'légal-hot-sauce']})),
  Product.create(({
    brand: 'Torchbearer Sauces',
    name: 'Zombie Apocalypse',
    description: 'The Zombie Apocalypse Hot Sauce lives up to its name, combining Ghost Peppers and Habaneros with a mix of spices, vegetables, and vinegar to create a slow burning blow torch. Some people will feel the heat right away, but others can take a few minutes for the full impact to set in. The heat can last up to 20 minutes, creating a perfect match between very high heat and amazing flavor. Try it on all your favorite foods - wings, chili, soups, steak or even a sandwich in need of a major kick.',
    ingredients: 'bhut jolokia peppers, habanero peppers, carrot, mandarin orange, tomatoes, distilled white vinegar, vegetable oil, garlic, sugar, spices',
    size: '5 oz',
    spiciness: 8,
    quantity: 48,
    imageUrl: 'https://cdn.shopify.com/s/files/1/2086/9287/products/Zombie-apocalypse-hotsauce_1024x1024.jpg?v=1510237943',
    tags: ['hot-hot', 'pepper-dense', 'citrus', 'complex-heat', 'torchbearer-sauces']}))
]);

  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)

  // Prices Seed
  const prices = await Promise.all([
    Price.create({price: 10.00, productId: 1}),
    Price.create({price: 10.00, productId: 2}),
    Price.create({price: 10.00, productId: 3}),
    Price.create({price: 10.00, productId: 4}),
    Price.create({price: 18.00, productId: 5}),
    Price.create({price: 10.00, productId: 6}),
    Price.create({price: 10.00, productId: 7}),
    Price.create({price: 10.00, productId: 8}),
    Price.create({price: 20.00, productId: 9}),
    Price.create({price: 12.00, productId: 10}),
    Price.create({price: 24.00, productId: 11}),
    Price.create({price: 8.00, productId: 12}),
    Price.create({price: 10.00, productId: 13}),
    Price.create({price: 10.00, productId: 14}),
    Price.create({price: 10.00, productId: 15}),
    Price.create({price: 12.00, productId: 16}),
    Price.create({price: 12.00, productId: 17}),
    Price.create({price: 10.00, productId: 18}),
    Price.create({price: 20.00, productId: 19})
  ]);

  console.log(`seeded ${prices.length} prices`)
  console.log(`seeded successfully`)

}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
