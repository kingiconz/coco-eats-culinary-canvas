import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Star, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/site/Layout";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";
import menuPdf from "@/assets/coco-eats-menu.pdf.asset.json";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import dish5 from "@/assets/dish-5.jpg";
import dish6 from "@/assets/dish-6.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — CocoEats" },
      { name: "description", content: "Browse our seasonal menu — breakfast, lunch, dinner, desserts and craft drinks." },
      { property: "og:title", content: "Menu — CocoEats" },
      { property: "og:description", content: "Seasonal plates, signature dishes, and craft drinks." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

type Item = { name: string; desc: string; price: string; img: string; rating: number; cat: string };

const items: Item[] = [
  // BREAKFAST - Morning Special
  { name: "Coco Breakfast", desc: "Egg your way, hash browns, pork bacon, chicken frankfurter, sloppy joe, mini pancakes, maple syrup, sliced bread", price: "220 GH₵", img: dish1, rating: 4.9, cat: "Breakfast" },
  { name: "English Breakfast", desc: "Chicken or pork sausage, egg your way, pork bacon, sautéed mushrooms, grilled tomatoes, jam, baked beans, sliced bread", price: "190 GH₵", img: dish2, rating: 4.8, cat: "Breakfast" },
  
  // BREAKFAST - Eggs Your Way
  { name: "Scrambled, Sunny Side Up or Omelette", desc: "Served with sliced bread", price: "95 GH₵", img: dish4, rating: 4.7, cat: "Breakfast" },
  
  // BREAKFAST - Coco's Signature
  { name: "Halloumi Pomodoro", desc: "Pistachio, sun-dried tomatoes, pomodoro sauce, sliced baguette", price: "160 GH₵", img: dish5, rating: 4.9, cat: "Breakfast" },
  { name: "Coco's Truffle Croissant", desc: "Tornado egg, smoked ham or turkey, mozzarella, cheddar, truffle mushrooms spread, chives mayo", price: "190 GH₵", img: dish1, rating: 5.0, cat: "Breakfast" },

  // OATS & YOGHURT BOWL
  { name: "Power Oats", desc: "Banana, peanut butter, chocolate", price: "100 GH₵", img: dish3, rating: 4.7, cat: "Oats & Yoghurt" },
  { name: "Coco Oats", desc: "Almond flakes, mixed berries, chia seeds", price: "110 GH₵", img: dish5, rating: 4.8, cat: "Oats & Yoghurt" },
  { name: "Cinnamon Banana Oats", desc: "Banana, toasted almond flakes, cinnamon, chia seeds, raisins", price: "100 GH₵", img: dish3, rating: 4.7, cat: "Oats & Yoghurt" },
  { name: "Mango Yoghurt Bowl", desc: "Sweet Greek yoghurt, coconut milk, granola, chia seeds, honey", price: "95 GH₵", img: dish5, rating: 4.8, cat: "Oats & Yoghurt" },
  { name: "Mixed Berry Yoghurt Bowl", desc: "Sweet Greek yoghurt, coconut milk, granola, chia seeds, honey", price: "95 GH₵", img: dish3, rating: 4.7, cat: "Oats & Yoghurt" },

  // SANDWICHES
  { name: "Breakfast Wrap", desc: "Soft tortilla, scrambled eggs, pork bacon, cheddar, jalapeños, mayo", price: "160 GH₵", img: dish2, rating: 4.8, cat: "Sandwiches" },
  { name: "Smoked Turkey Fusion", desc: "White or brown baguette, smoked turkey, sundried tomatoes, fresh mushrooms, arugula, parmesan, peppercorn honey mustard", price: "160 GH₵", img: dish4, rating: 4.9, cat: "Sandwiches" },
  { name: "Grilled Halloumi Sandwich", desc: "White or brown baguette, tomatoes, cucumber, mint leaves, olive paste", price: "160 GH₵", img: dish5, rating: 4.7, cat: "Sandwiches" },
  { name: "Coco's Club Sandwich", desc: "Bacon or smoked turkey, sliced bread, chicken strips, fried egg, cheddar, mashed avocado, arugula, gherkins, sun-dried tomatoes", price: "175 GH₵", img: dish2, rating: 4.9, cat: "Sandwiches" },
  { name: "Croque Monsieur", desc: "Sliced bread, smoked turkey or pork ham, Gruyère cheese, béchamel sauce", price: "160 GH₵", img: dish4, rating: 4.8, cat: "Sandwiches" },

  // TO SHARE
  { name: "Tacos Chicken Shawarma", desc: "Homemade tacos, chicken slices, cheddar, lettuce, gherkins, crispy potato sprinkle, pico de gallo, garlic mayo sauce", price: "150 GH₵", img: dish1, rating: 4.8, cat: "To Share" },
  { name: "Tacos Beef Burger", desc: "Homemade tacos, beef patty, cheddar, lettuce, gherkins, avocado, pico de gallo, thousand island sauce", price: "150 GH₵", img: dish2, rating: 4.8, cat: "To Share" },
  { name: "Creamy Truffle Fries", desc: "Topped with parmesan", price: "150 GH₵", img: dish6, rating: 4.9, cat: "To Share" },
  { name: "Baked Brie", desc: "Spicy fig jam, caramelized walnuts, rosemary, sliced baguette", price: "250 GH₵", img: dish5, rating: 5.0, cat: "To Share" },
  { name: "Meat The Pie", desc: "Mini pie stuffed with spicy lamb, sour cream dip", price: "150 GH₵", img: dish4, rating: 4.7, cat: "To Share" },
  { name: "Chef's Truffle Hummus", desc: "Angus beef chunks, cashew nuts, sliced baguette", price: "250 GH₵", img: dish6, rating: 4.9, cat: "To Share" },
  { name: "Coco's Chips Basket", desc: "Sweet potatoes, yam, cassava, guacamole, spicy salsa dip", price: "90 GH₵", img: dish5, rating: 4.6, cat: "To Share" },
  { name: "Chicken Sticks", desc: "Fried chicken strips coated with panko, sweet chilli mayo dip", price: "135 GH₵", img: dish1, rating: 4.7, cat: "To Share" },
  { name: "Chicken Wings", desc: "Choice of spicy green chilli, honey mustard, BBQ or sweet chilli", price: "145 GH₵", img: dish2, rating: 4.8, cat: "To Share" },
  { name: "Calamari Fritto", desc: "Fried calamari chunks, shallot, garlic, capsicum, red chilli, tartar dip", price: "200 GH₵", img: dish4, rating: 4.8, cat: "To Share" },
  { name: "Ajillo Prawns", desc: "Pan-seared prawns, garlic lemon butter sauce, sliced baguette", price: "235 GH₵", img: dish6, rating: 4.9, cat: "To Share" },
  { name: "Shrimps Lovers", desc: "Fried shrimp coated with chef's special crumbs, spicy-sweet mayo sauce", price: "210 GH₵", img: dish1, rating: 4.8, cat: "To Share" },

  // CROFFLES
  { name: "Lotus Croffle", desc: "Lotus biscoff spread and crumbles", price: "100 GH₵", img: dish3, rating: 4.8, cat: "Desserts" },
  { name: "Chocolate Croffle", desc: "Rich chocolate ganache", price: "100 GH₵", img: dish3, rating: 4.7, cat: "Desserts" },
  { name: "Oreo White Chocolate Croffle", desc: "Oreo crumbles and white chocolate", price: "100 GH₵", img: dish3, rating: 4.8, cat: "Desserts" },

  // PANCAKES
  { name: "Classic Pancake", desc: "Maple syrup and butter", price: "90 GH₵", img: dish3, rating: 4.6, cat: "Desserts" },
  { name: "Choco-Banana Pancake", desc: "Chocolate, banana, chocolate syrup", price: "110 GH₵", img: dish3, rating: 4.8, cat: "Desserts" },
  { name: "Strawberry Cream Pancake", desc: "Fresh strawberry, sweetened cream cheese, strawberry sauce, lotus crumbles", price: "140 GH₵", img: dish3, rating: 4.9, cat: "Desserts" },

  // TARTINES
  { name: "Smashed Avocado Tartine", desc: "Fibre loaf bread, mashed avocado, pickled radish, cherry tomatoes", price: "110 GH₵", img: dish5, rating: 4.7, cat: "Sandwiches" },
  { name: "Salmon Egg Hollandaise Tartine", desc: "Fibre loaf bread, scrambled egg, smoked salmon, mashed avocado, arugula, baby spinach, sauce Hollandaise", price: "180 GH₵", img: dish4, rating: 4.9, cat: "Sandwiches" },

  // SALADS
  { name: "Kale Fattoush", desc: "Kale, lettuce, tomatoes, cucumber, scallion, radish, capsicum, mint, fried pita bread, Fattoush dressing", price: "170 GH₵", img: dish5, rating: 4.8, cat: "Salads" },
  { name: "Caesar Salad", desc: "Iceberg lettuce, croutons, parmesan, cashew nuts, sundried tomatoes, Caesar dressing", price: "180 GH₵", img: dish1, rating: 4.7, cat: "Salads" },
  { name: "Quinoa Fiesta", desc: "Quinoa, arugula, avocado, cucumber, cherry tomatoes, hazelnuts, black sesame, fig jam, balsamic dressing", price: "210 GH₵", img: dish5, rating: 4.9, cat: "Salads" },
  { name: "Goat Cheese Salad", desc: "Mixed greens, caramelized walnuts, dried cranberry, cherry tomatoes, avocado, mango, cucumber, goat cheese, honey vinaigrette dressing", price: "265 GH₵", img: dish5, rating: 4.9, cat: "Salads" },
  { name: "Cobb Salad", desc: "Iceberg lettuce, chicken fillet, pork bacon, boiled egg, blue cheese, avocado, cherry tomatoes, cucumber, scallion, herby mayo dressing", price: "225 GH₵", img: dish1, rating: 4.8, cat: "Salads" },
  { name: "Shrimp Rolls", desc: "Rice paper stuffed with shrimp, rice stick noodles, black beans, avocado, mango, edamame, carrot, cucumber, lettuce, sesame soy dressing", price: "210 GH₵", img: dish4, rating: 4.8, cat: "Salads" },
  { name: "Grilled Salmon Avocado Salad", desc: "Kale, lettuce, baby spinach, scallion, radish, cherry tomatoes, avocado, cashew nuts, edamame, honey glazed salmon, teriyaki mayo dressing", price: "285 GH₵", img: dish4, rating: 5.0, cat: "Salads" },

  // BURGERS
  { name: "Coco Smash Burger", desc: "Double smashed patties, cheddar, gherkins, grilled onions, crispy potato chips, thousand island sauce", price: "250 GH₵", img: dish2, rating: 4.9, cat: "Burgers" },
  { name: "The Classic Burger", desc: "Beef patty, cheddar, grilled onions, tomatoes, lettuce, gherkins, mayonnaise", price: "250 GH₵", img: dish2, rating: 4.7, cat: "Burgers" },
  { name: "B.B.Q Burger", desc: "Beef patty, cheddar, pork bacon, lettuce, grilled onion, avocado, BBQ sauce", price: "290 GH₵", img: dish2, rating: 4.8, cat: "Burgers" },
  { name: "Swiss Mushroom Truffle Burger", desc: "Beef patty, swiss cheese, sautéed mushroom, caramelized onion, arugula, creamy garlic-truffle sauce", price: "300 GH₵", img: dish2, rating: 5.0, cat: "Burgers" },
  { name: "Crispy Chicken Burger", desc: "Breaded chicken fillet, lettuce, arugula, avocado, honey mustard sauce", price: "250 GH₵", img: dish1, rating: 4.8, cat: "Burgers" },

  // PIZZAS
  { name: "Margherita Pizza", desc: "Tomato sauce, mozzarella, parmesan", price: "140 GH₵", img: dish5, rating: 4.6, cat: "Pizzas" },
  { name: "Creamy Truffle Mushroom Pizza", desc: "Truffle cream cheese sauce, mushrooms, mozzarella, parmesan", price: "220 GH₵", img: dish5, rating: 4.9, cat: "Pizzas" },
  { name: "Smoked Pepperoni Pizza", desc: "Tomato sauce, mozzarella cheese, smoked pork pepperoni", price: "185 GH₵", img: dish1, rating: 4.8, cat: "Pizzas" },
  { name: "Chili Beef Pizza", desc: "Tomato sauce, mozzarella cheese, minced beef, red chili", price: "180 GH₵", img: dish2, rating: 4.7, cat: "Pizzas" },
  { name: "Chicken B.B.Q Pizza", desc: "Tomato sauce, mozzarella cheese, sweet corn, chicken fillet, onion, BBQ sauce", price: "180 GH₵", img: dish1, rating: 4.8, cat: "Pizzas" },

  // PASTAS
  { name: "Penne Arabiata", desc: "Spicy Pomodoro, olives, parmesan cheese", price: "190 GH₵", img: dish1, rating: 4.6, cat: "Pastas" },
  { name: "Ragu Alla Bolognese", desc: "Spaghetti, Bolognese sauce, parmesan cheese", price: "210 GH₵", img: dish2, rating: 4.8, cat: "Pastas" },
  { name: "Fettuccine De Polo", desc: "Tagliatelle, chicken, mushrooms, cream sauce, parmesan cheese", price: "245 GH₵", img: dish1, rating: 4.9, cat: "Pastas" },

  // RICE & NOODLES
  { name: "Meat Medley Rice/Noodles", desc: "Chicken fillet, beef tenderloin strips, vegetables. Choice of Fried Rice, Jollof, or Egg Noodles", price: "From 195 GH₵", img: dish1, rating: 4.8, cat: "Rice & Noodles" },
  { name: "Chimichurri Beef Rice", desc: "Beef tenderloin slices, green peas rice, chimichurri salsa", price: "260 GH₵", img: dish2, rating: 4.9, cat: "Rice & Noodles" },
  { name: "Chicken Coconut Rice", desc: "Yellow rice, chicken, vegetables", price: "185 GH₵", img: dish1, rating: 4.7, cat: "Rice & Noodles" },
  { name: "Chipotle B.B.Q Pork Chops Rice", desc: "Mexican-style rice, pork chops, spicy potato sprinkles, tomato sauce", price: "235 GH₵", img: dish4, rating: 4.8, cat: "Rice & Noodles" },
  { name: "Black Rice Selection", desc: "Grilled salmon or shrimps, edamame, garlic, onion, green peas, teriyaki sauce", price: "265 GH₵", img: dish4, rating: 5.0, cat: "Rice & Noodles" },
  { name: "Spicy Shrimp Rice/Noodles", desc: "Shrimps, scallion, chilli flakes, sesame. Choice of Rice or Egg Noodles", price: "From 230 GH₵", img: dish6, rating: 4.9, cat: "Rice & Noodles" },

  // SIDE ORDERS
  { name: "Steamed Rice", desc: "Perfectly fluffy steamed rice", price: "55 GH₵", img: dish5, rating: 4.5, cat: "Sides" },
  { name: "Fried Rice", desc: "Savory stir-fried rice", price: "80 GH₵", img: dish1, rating: 4.6, cat: "Sides" },
  { name: "Jollof Rice", desc: "Traditional flavorful Jollof", price: "85 GH₵", img: dish2, rating: 4.8, cat: "Sides" },
  { name: "French Fries", desc: "Crispy golden fries", price: "85 GH₵", img: dish3, rating: 4.7, cat: "Sides" },
  { name: "Parmesan Baked Potato", desc: "Oven-baked with savory parmesan", price: "70 GH₵", img: dish3, rating: 4.8, cat: "Sides" },
  { name: "Mashed Potato", desc: "Creamy whipped potatoes", price: "70 GH₵", img: dish3, rating: 4.7, cat: "Sides" },
  { name: "Sauteed Vegetables", desc: "Seasonal mix of fresh vegetables", price: "45 GH₵", img: dish5, rating: 4.6, cat: "Sides" },
  { name: "Garlic Herb Bread", desc: "Toasted with aromatic garlic and herbs", price: "45 GH₵", img: dish4, rating: 4.7, cat: "Sides" },

  // THE MAIN
  { name: "Rib-Eye Steak", desc: "Imported ribeye, broccoli, soy-butter reduction sauce, served with potato wedges", price: "490 GH₵", img: dish2, rating: 4.9, cat: "Mains" },
  { name: "Steak & Fries", desc: "Imported beef tenderloin, mushroom or peppercorn sauce, served with French fries", price: "395 GH₵", img: dish2, rating: 4.8, cat: "Mains" },
  { name: "Teriyaki Lamb Cutlets", desc: "Char-grilled lamb cutlet tossed in teriyaki sauce, chili flakes, edamame, served with sesame braised potato", price: "520 GH₵", img: dish4, rating: 5.0, cat: "Mains" },
  { name: "Chicken Dinner", desc: "Fried or char-grilled fillet, sautéed corn, garlic mayo & honey mustard dip, served with your choice of rice or French fries", price: "300 GH₵", img: dish1, rating: 4.8, cat: "Mains" },
  { name: "Chicken Mushrooms", desc: "Char-grilled fillet, mushroom sauce, served with mashed potatoes", price: "300 GH₵", img: dish1, rating: 4.7, cat: "Mains" },
  { name: "Shrimpy Grouper", desc: "Grouper fillet tossed in lemon creamy sauce topped with clarified shrimps, sautéed vegetables, served with your choice of fried or plain rice", price: "390 GH₵", img: dish4, rating: 4.9, cat: "Mains" },
  { name: "Pan-Seared Salmon Steak", desc: "Richly flavoured salmon fillet, broccoli, creamy pesto sauce, served with potato fondue", price: "410 GH₵", img: dish4, rating: 4.9, cat: "Mains" },

  // COFFEE & BEVERAGES - Hot Coffee
  { name: "Espresso", desc: "Rich and bold single shot", price: "45 GH₵", img: dish6, rating: 4.6, cat: "Coffee & Drinks" },
  { name: "Cappuccino", desc: "Espresso with steamed milk foam", price: "70 GH₵", img: dish6, rating: 4.7, cat: "Coffee & Drinks" },
  { name: "Latte", desc: "Smooth espresso with steamed milk", price: "70 GH₵", img: dish6, rating: 4.7, cat: "Coffee & Drinks" },
  { name: "Coco Signature Latte", desc: "Our house special latte blend", price: "80 GH₵", img: dish6, rating: 4.9, cat: "Coffee & Drinks" },
  { name: "Hot Chocolate", desc: "Choice of Milk, Dark, White or Coco Marshmallow", price: "From 75 GH₵", img: dish6, rating: 4.8, cat: "Coffee & Drinks" },

  // COFFEE & BEVERAGES - Cold & Iced
  { name: "Iced Latte", desc: "Chilled espresso with milk (Vanilla, Caramel, or Hazelnut)", price: "80 GH₵", img: dish6, rating: 4.7, cat: "Coffee & Drinks" },
  { name: "Frappuccino", desc: "Blended coffee drink, classic or caramel", price: "70 GH₵", img: dish6, rating: 4.6, cat: "Coffee & Drinks" },
  { name: "Milkshakes", desc: "Chocolate, Vanilla, Strawberry, Oreo, or Gummy Bear", price: "From 100 GH₵", img: dish6, rating: 4.8, cat: "Coffee & Drinks" },
  { name: "Smoothies", desc: "Lemonade & Mint, Peanut Coco, Mixed Berries, Go Green, Mango Madness, or Coco", price: "85 GH₵", img: dish6, rating: 4.7, cat: "Coffee & Drinks" },
  { name: "Fresh Juices", desc: "Pineapple, Beetroot, Ginger, Mixed Fruit, or Orange & Carrots", price: "70 GH₵", img: dish6, rating: 4.8, cat: "Coffee & Drinks" },

  // SIGNATURE COCKTAILS
  { name: "Red Red", desc: "Tequila, beetroot, orange, carrot, agave", price: "150 GH₵", img: dish6, rating: 4.8, cat: "Cocktails" },
  { name: "Coco Nut", desc: "Tequila, malibu, coconut milk", price: "150 GH₵", img: dish6, rating: 4.9, cat: "Cocktails" },
  { name: "Black Mojito", desc: "Rum, lime, mint, charcoal, sambuca", price: "150 GH₵", img: dish6, rating: 4.7, cat: "Cocktails" },
  { name: "Eden", desc: "Gin, pineapple, moringa, elderflower", price: "150 GH₵", img: dish6, rating: 4.8, cat: "Cocktails" },
  { name: "Coco Iced Tea", desc: "Earl Grey-infused vodka, apricot brandy, mint", price: "150 GH₵", img: dish6, rating: 4.9, cat: "Cocktails" },
  { name: "Batida De Coco", desc: "Rum, coconut milk, passion fruit, pineapple, mango", price: "150 GH₵", img: dish6, rating: 4.8, cat: "Cocktails" },
  { name: "Tiramisu Martini", desc: "Baileys, cream cheese, vanilla, espresso", price: "150 GH₵", img: dish6, rating: 4.9, cat: "Cocktails" },

  // CLASSIC COCKTAILS
  { name: "Aperol Spritz", desc: "Aperol, prosecco, soda", price: "135 GH₵", img: dish6, rating: 4.7, cat: "Cocktails" },
  { name: "Negroni", desc: "Gin, campari, sweet vermouth", price: "135 GH₵", img: dish6, rating: 4.8, cat: "Cocktails" },
  { name: "Old Fashioned", desc: "Bourbon, angostura bitters", price: "135 GH₵", img: dish6, rating: 4.8, cat: "Cocktails" },
  { name: "Espresso Martini", desc: "Vodka, espresso, kahlúa", price: "135 GH₵", img: dish6, rating: 4.9, cat: "Cocktails" },
  { name: "Mojito", desc: "Rum, lime, mint", price: "135 GH₵", img: dish6, rating: 4.7, cat: "Cocktails" },
  { name: "Whiskey Sour", desc: "Bourbon, lemon, simple syrup", price: "135 GH₵", img: dish6, rating: 4.8, cat: "Cocktails" },
  { name: "Mai Tai", desc: "Rum, lime, orgeat syrup", price: "135 GH₵", img: dish6, rating: 4.7, cat: "Cocktails" },
  { name: "Margarita", desc: "Tequila, lime, triple sec", price: "135 GH₵", img: dish6, rating: 4.8, cat: "Cocktails" },
  { name: "Piña Colada", desc: "Rum, malibu, pineapple, coconut milk", price: "135 GH₵", img: dish6, rating: 4.8, cat: "Cocktails" },
  { name: "Amaretto Sour", desc: "Amaretto liquor, simple syrup, lemon", price: "135 GH₵", img: dish6, rating: 4.7, cat: "Cocktails" },
  { name: "Exotic Mimosa", desc: "Prosecco, passion fruit, grenadine syrup, pineapple", price: "135 GH₵", img: dish6, rating: 4.9, cat: "Cocktails" },

  // NON-ALCOHOLIC COCKTAILS
  { name: "Cucupine", desc: "Pineapple, cucumber, ginger, basil", price: "120 GH₵", img: dish6, rating: 4.7, cat: "Coffee & Drinks" },
  { name: "Cocoberry", desc: "Mixed berries, banana, coconut milk, cream", price: "120 GH₵", img: dish6, rating: 4.8, cat: "Coffee & Drinks" },
  { name: "Berrybana", desc: "Strawberry, banana, lemon", price: "120 GH₵", img: dish6, rating: 4.7, cat: "Coffee & Drinks" },
  { name: "Virgin Piña Colada", desc: "Pineapple, coconut milk, coconut syrup", price: "120 GH₵", img: dish6, rating: 4.8, cat: "Coffee & Drinks" },
  { name: "Candy Crush", desc: "Pineapple, orange, passion fruit, candies", price: "140 GH₵", img: dish6, rating: 4.9, cat: "Coffee & Drinks" },

  // SPIRITS (Categorized under Spirits)
  { name: "Premium Gins", desc: "Gordons, Beefeater, Bombay, Tanqueray, Tanqueray 10, Hendrick's, Monkey 47", price: "From 50 GH₵", img: dish6, rating: 4.8, cat: "Spirits" },
  { name: "Vodka Selection", desc: "Skyy, Smirnoff, Absolut, Ciroc, Belvedere, Grey Goose", price: "From 50 GH₵", img: dish6, rating: 4.8, cat: "Spirits" },
  { name: "Cognac & Brandy", desc: "Hennessy VS, Hennessy VSOP, Hennessy XO", price: "From 70 GH₵", img: dish6, rating: 4.9, cat: "Spirits" },
  { name: "Tequila Collection", desc: "Olmeca, Don Julio, 1800 (Silver, Gold, Reposado, Anejo)", price: "From 50 GH₵", img: dish6, rating: 4.9, cat: "Spirits" },
  { name: "Whiskey & Single Malt", desc: "Jack Daniels, Wild Turkey, Jameson, JW Black/Gold/Blue, Chivas, Glenfiddich, Macallan", price: "From 50 GH₵", img: dish6, rating: 5.0, cat: "Spirits" },
  { name: "Premium Rum", desc: "Saint James, Bacardi, Havana Club, Captain Morgan", price: "From 50 GH₵", img: dish6, rating: 4.7, cat: "Spirits" },

  // DESSERT MENU
  { name: "Pain Perdu", desc: "Pan-fried soaked French bread, filled with Nutella and lotus crust topped with vanilla ice cream, caramel sauce", price: "135 GH₵", img: dish3, rating: 4.9, cat: "Desserts" },
  { name: "Coco's Brownie", desc: "Diced brownies, vanilla ice cream, roasted almond, chocolate & caramel sauce", price: "140 GH₵", img: dish3, rating: 5.0, cat: "Desserts" },
  { name: "Red Velvet", desc: "Moist sponge cake, topped with cream cheese frosting", price: "140 GH₵", img: dish3, rating: 4.8, cat: "Desserts" },
  { name: "Sticky Toffee Pudding", desc: "Moist sponge cake made with dates and walnuts, dipped in vanilla custard, topped with toffee sauce", price: "140 GH₵", img: dish3, rating: 4.9, cat: "Desserts" },
  { name: "Carrot Cake", desc: "Sweet spice cake made with toasted nuts and carrots, topped with pecan cream cheese frosting", price: "140 GH₵", img: dish3, rating: 4.8, cat: "Desserts" },
  { name: "Lemon Berry Cheesecake", desc: "Creamy cheesecake with a zesty lemon and berry twist", price: "140 GH₵", img: dish3, rating: 4.9, cat: "Desserts" },

  // WINE & CHAMPAGNE - Sparkling & Prosecco
  { name: "Veuve du Vernay Ice", desc: "France | Crisp and refreshing sparkling wine", price: "95/450 GH₵", img: dish6, rating: 4.7, cat: "Wine & Champagne" },
  { name: "Veuve du Vernay Ice Rosé", desc: "France | Elegant pink bubbles", price: "500 GH₵", img: dish6, rating: 4.8, cat: "Wine & Champagne" },
  { name: "Mionetto DOC Treviso Brut", desc: "Italy | Classic Italian prosecco", price: "500 GH₵", img: dish6, rating: 4.7, cat: "Wine & Champagne" },
  { name: "Mionetto Rosé DOC", desc: "Italy | Vibrant and fruity sparkling rosé", price: "600 GH₵", img: dish6, rating: 4.8, cat: "Wine & Champagne" },

  // WINE & CHAMPAGNE - Champagne
  { name: "Moët & Chandon Impérial Brut", desc: "Iconic French champagne, perfectly balanced", price: "2300 GH₵", img: dish6, rating: 5.0, cat: "Wine & Champagne" },
  { name: "Moët & Chandon Impérial Rosé", desc: "Radiant and romantic French champagne", price: "2600 GH₵", img: dish6, rating: 5.0, cat: "Wine & Champagne" },
  { name: "Moët & Chandon Nectar Impérial Brut", desc: "Rich and exotic champagne experience", price: "2900 GH₵", img: dish6, rating: 4.9, cat: "Wine & Champagne" },
  { name: "Moët & Chandon Nectar Impérial Rosé", desc: "Deep and sophisticated champagne", price: "2900 GH₵", img: dish6, rating: 5.0, cat: "Wine & Champagne" },
  { name: "Laurent-Perrier Brut", desc: "Freshness, finesse, and elegance from France", price: "2900 GH₵", img: dish6, rating: 4.9, cat: "Wine & Champagne" },

  // WINE & CHAMPAGNE - White Wine
  { name: "L'o Dalet Chardonnay", desc: "France | Clean and classic chardonnay", price: "95/450 GH₵", img: dish6, rating: 4.6, cat: "Wine & Champagne" },
  { name: "Baron Philippe de Rothschild", desc: "Bordeaux, France | Prestigious and refined", price: "500 GH₵", img: dish6, rating: 4.8, cat: "Wine & Champagne" },
  { name: "Matua Sauvignon Blanc", desc: "New Zealand | Bright and tropical notes", price: "630 GH₵", img: dish6, rating: 4.7, cat: "Wine & Champagne" },
  { name: "Pouilly Fumé", desc: "France | Sophisticated flinty white", price: "850 GH₵", img: dish6, rating: 4.9, cat: "Wine & Champagne" },
  { name: "Sancerre Terroirs", desc: "France | Pure and elegant Sauvignon Blanc", price: "950 GH₵", img: dish6, rating: 4.9, cat: "Wine & Champagne" },
  { name: "Gavi di Gavi Figlio", desc: "Italy | Distinguished Italian white", price: "765 GH₵", img: dish6, rating: 4.8, cat: "Wine & Champagne" },

  // WINE & CHAMPAGNE - Red Wine
  { name: "Casa Solis Cabernet Sauvignon", desc: "Chile | Bold and structured red", price: "95/450 GH₵", img: dish6, rating: 4.6, cat: "Wine & Champagne" },
  { name: "Arnegui Tempranillo Rioja", desc: "Spain | Traditional Spanish character", price: "450 GH₵", img: dish6, rating: 4.7, cat: "Wine & Champagne" },
  { name: "Matua Pinot Noir", desc: "New Zealand | Silky and red-fruit forward", price: "630 GH₵", img: dish6, rating: 4.8, cat: "Wine & Champagne" },
  { name: "Escudo Rojo Syrah", desc: "Chile | Intense and spicy notes", price: "700 GH₵", img: dish6, rating: 4.7, cat: "Wine & Champagne" },
  { name: "Mouton Cadet Bordeaux", desc: "France | Classic and harmonious blend", price: "700 GH₵", img: dish6, rating: 4.8, cat: "Wine & Champagne" },

  // WINE & CHAMPAGNE - Rosé & Sweet
  { name: "Marius Rosé d'Oc", desc: "France | Delicate and summery rosé", price: "95/450 GH₵", img: dish6, rating: 4.7, cat: "Wine & Champagne" },
  { name: "Whispering Angel", desc: "Côte de Provence, France | The world's most famous rosé", price: "830 GH₵", img: dish6, rating: 5.0, cat: "Wine & Champagne" },
  { name: "Jam Jar Red Shiraz", desc: "South Africa | Fruity and approachable sweet red", price: "95/450 GH₵", img: dish6, rating: 4.6, cat: "Wine & Champagne" },
  { name: "Jam Jar White Moscato", desc: "South Africa | Light and floral sweet white", price: "95/450 GH₵", img: dish6, rating: 4.6, cat: "Wine & Champagne" },
  { name: "Mosketto Delicate Sparkling Rosé", desc: "Italy | Lightly bubbling and sweet", price: "95/450 GH₵", img: dish6, rating: 4.7, cat: "Wine & Champagne" },
];

const cats = ["All", "Breakfast", "Salads", "Burgers", "Mains", "Sandwiches", "Pizzas", "Pastas", "Rice & Noodles", "To Share", "Desserts", "Coffee & Drinks", "Cocktails", "Wine & Champagne", "Spirits", "Sides"] as const;

function MenuPage() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<string[]>([]);

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (cat === "All" || i.cat === cat) &&
          (q === "" || i.name.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, q],
  );

  return (
    <Layout>
      <section className="bg-gradient-ivory pt-16 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <SectionEyebrow>The Menu</SectionEyebrow>
          <Reveal delay={0.1}>
            <h1 className="font-display text-6xl md:text-8xl mt-5 leading-[1] max-w-4xl mx-auto">
              Composed with <span className="italic text-primary">care</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-muted-foreground text-lg max-w-xl mx-auto">
              From sunrise plates to midnight pours — every dish honors the season and the maker.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border-y border-border/50 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-3">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 pb-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    "text-[10px] md:text-[11px] uppercase tracking-[0.15em] transition-all duration-300 relative py-1 whitespace-nowrap group",
                    cat === c ? "text-primary" : "text-foreground/60 hover:text-foreground"
                  )}
                >
                  {c}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-px bg-primary transition-all duration-500",
                    cat === c ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </button>
              ))}
            </div>
            
            <div className="relative max-w-md mx-auto w-full">
              <Search size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the menu..."
                className="w-full pl-10 pr-4 py-1.5 bg-background border border-border/60 rounded-full text-xs outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/40"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((d, i) => (
                <motion.article
                  key={d.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                  className="group bg-card rounded-sm overflow-hidden hover-lift"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={d.img} alt={d.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-background/90 text-[10px] uppercase tracking-[0.2em]">{d.cat}</div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-background/90 text-[11px] flex items-center gap-1">
                      <Star size={11} className="text-gold" fill="currentColor" />
                      {d.rating}
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl">{d.name}</h3>
                      <span className="text-primary font-medium text-lg">{d.price}</span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                    <button
                      onClick={() => setCart((c) => [...c, d.name])}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 border border-foreground rounded-full text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
                    >
                      <Plus size={14} /> Add to order
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No dishes found.</p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-foreground text-background px-6 py-4 rounded-full shadow-luxe flex items-center gap-4"
          >
            <span className="text-sm">{cart.length} item{cart.length > 1 ? "s" : ""} in your order</span>
            <button onClick={() => setCart([])} className="text-xs uppercase tracking-[0.2em] text-gold hover:underline">
              Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
