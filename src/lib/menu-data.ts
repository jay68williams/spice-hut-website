/* ═══════════════════════════════════════════
   SMOK'D N SMASH'D - FULL MENU DATA
   Based on the Smok'd N Smash'd Northeast
   Comprehensive Audit
   ═══════════════════════════════════════════ */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  badge?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
}

export const CATEGORIES: MenuCategory[] = [
  { id: "special-box-meals", name: "Special Box Meals", description: "Signature combo boxes loaded with the best of Smok'd N Smash'd" },
  { id: "angus-smash-burgers", name: "Angus Smash Burgers", description: "6oz Angus beef patties, smashed & seared to perfection" },
  { id: "stack-burgers", name: "Stack Burgers", description: "Towering stacked patties, maximum flavour" },
  { id: "chicken-burgers", name: "Chicken, Fish & Veggie Burgers", description: "Crispy fillets, grilled thighs & plant-based options" },
  { id: "doner-kebabs", name: "Doner (Stir Fry) & Kebabs", description: "Sizzled on the grill with Naga, Shatkora & house sauces" },
  { id: "grill-philly", name: "Grill & Philly Steak", description: "Charcoal-grilled meats and Philly ribeye specials" },
  { id: "peri-peri", name: "Peri Peri", description: "Flame-grilled chicken with peri peri glaze" },
  { id: "wings", name: "Wings", description: "Crispy wings in Peri, Naga, Wild Mango & more" },
  { id: "loaded-fries", name: "Loaded Fries", description: "Skin-on fries with outrageous toppings" },
  { id: "wraps", name: "Wraps", description: "Loaded tortilla wraps with all the trimmings" },
  { id: "sides", name: "Sides & Extras", description: "Perfect additions to any order" },
  { id: "desserts", name: "Desserts", description: "Sweet finishes" },
  { id: "drinks", name: "Drinks", description: "Cold drinks and shakes" },
  { id: "sauces", name: "Sauces", description: "Dips and sauces" },
];

export const MENU_ITEMS: MenuItem[] = [
  /* ── Special Box Meals ──────────────────── */
  { id: "bx-1", name: "House Special Box", description: "3 Lamb Ribs OR Chops, Mix Doner, 4 Peri Grilled Wings, Smash Burger, Nacho Fries, and Drinks.", price: 24.99, category: "special-box-meals", badge: "Most Popular" },
  { id: "bx-2", name: "Loaded Box", description: "Smash Burger, 2 Lamb Chops/Ribs, 2 Wild Mango Wings, Mix Doner, and Nacho Cheesy Fries.", price: 21.99, category: "special-box-meals" },
  { id: "bx-3", name: "Philly Box Meal", description: "Philly Ribeye Steak, Hot & Creamy Doner, Crispy Chicken Loaded Fries, and 2 Wild Mango Wings.", price: 19.99, category: "special-box-meals" },
  { id: "bx-4", name: "Smok'd N Smash'd Box", description: "1/4 Chicken, Lamb Doner, Cheeseburger, 3 Naga Wings, and Chips/Fries.", price: 17.99, category: "special-box-meals" },
  { id: "bx-5", name: "Mix Grill Platter", description: "2 Lamb Chops, 2 Shish Kebabs, 1/4 Peri Chicken, 4 Peri Wings, Fries, and Naan.", price: 22.99, category: "special-box-meals", badge: "Sharing" },

  /* ── Angus Smash Burgers ────────────────── */
  { id: "ab-1", name: "American Smash", description: "6oz Angus Beef, Caramelised Onions, Gherkins, Onion Rings, and Melted Cheese on a Potato Bun.", price: 9.99, category: "angus-smash-burgers", badge: "Best Seller" },
  { id: "ab-2", name: "Mexican Smash", description: "6oz Angus Beef, Mexican Cheese, Salsa, Jalapeños, and Onion Rings.", price: 9.99, category: "angus-smash-burgers" },
  { id: "ab-3", name: "Smokey Bacon Smash", description: "Angus Beef (3oz/6oz), Turkey Bacon, BBQ Sauce, and Cheesy Sauce.", price: 9.49, category: "angus-smash-burgers" },
  { id: "ab-4", name: "The Royal Burger", description: "Butter Chicken and Beef Smash patties combined with special sauce.", price: 11.99, category: "angus-smash-burgers", badge: "Signature" },
  { id: "ab-5", name: "The O.G. Smash", description: "Double smash patty, American cheese, pickles, house sauce, brioche bun.", price: 8.50, category: "angus-smash-burgers" },
  { id: "ab-6", name: "Chilli Cheese Smash", description: "Double smash patty, chilli cheese sauce, jalapeños, sriracha mayo.", price: 10.00, category: "angus-smash-burgers" },
  { id: "ab-7", name: "Truffle Smash", description: "Double smash patty, truffle mayo, Swiss cheese, rocket, mushroom.", price: 11.00, category: "angus-smash-burgers" },

  /* ── Stack Burgers ──────────────────────── */
  { id: "stk-1", name: "Single Stack", description: "2× 45g smash patties, American cheese, pickles, house sauce.", price: 7.49, category: "stack-burgers" },
  { id: "stk-2", name: "Double Stack", description: "4× 45g smash patties, double cheese, pickles, house sauce.", price: 10.49, category: "stack-burgers" },
  { id: "stk-3", name: "Grand Stack", description: "3× 90g smash patties with Turkey Bacon, triple cheese, house sauce.", price: 13.99, category: "stack-burgers", badge: "Beast Mode" },
  { id: "stk-4", name: "Philly Stack", description: "Double patty, philly steak, peppers, onions, cheese sauce.", price: 12.50, category: "stack-burgers" },
  { id: "stk-5", name: "The Mac Stack", description: "Double patty, mac & cheese bites, bacon, cheese sauce.", price: 12.00, category: "stack-burgers" },

  /* ── Chicken, Fish & Veggie Burgers ─────── */
  { id: "cb-1", name: "Spicy Buttermilk Chicken", description: "Dipped in a medium-heat spicy special sauce with cheese and mayo.", price: 8.99, category: "chicken-burgers" },
  { id: "cb-2", name: "Sunrise Burger", description: "Grilled chicken thighs with cheddar cheese and sweet & spicy chilli jam.", price: 8.99, category: "chicken-burgers" },
  { id: "cb-3", name: "Tower Burger", description: "Chicken fillet, hash brown, onion ring, and cheese.", price: 9.49, category: "chicken-burgers" },
  { id: "cb-4", name: "Peri Peri Grilled Burger", description: "Charcoal-grilled chicken breast with customizable heat levels.", price: 8.99, category: "chicken-burgers" },
  { id: "cb-5", name: "Fillet-O-Fish", description: "100% fish fillet with cheese and fish sauce on a soft bun.", price: 7.99, category: "chicken-burgers" },
  { id: "cb-6", name: "Halloumi Burger", description: "Grilled halloumi, roasted peppers, rocket, sweet chilli sauce.", price: 7.50, category: "chicken-burgers" },

  /* ── Doner (Stir Fry) & Kebabs ─────────── */
  { id: "dk-1", name: "Naga Doner", description: "Extra hot flavour cooked with Naga chilli peppers. Served with chips and salad.", price: 9.49, category: "doner-kebabs", badge: "🔥 Extra Hot" },
  { id: "dk-2", name: "Shatkora Doner", description: "Cooked with chopped Shatkora lime for a unique citrus aroma.", price: 9.49, category: "doner-kebabs", badge: "Unique" },
  { id: "dk-3", name: "Creamy Naga Doner", description: "Hot doner tossed in a signature creamy sauce.", price: 9.99, category: "doner-kebabs" },
  { id: "dk-4", name: "Masala Doner", description: "Doner sizzler and fries tossed with house sauce on the grill.", price: 9.49, category: "doner-kebabs" },
  { id: "dk-5", name: "Mix Doner & Chips", description: "Lamb & chicken doner with chips, salad, and sauces.", price: 9.00, category: "doner-kebabs" },
  { id: "dk-6", name: "Lamb Doner & Chips", description: "Shaved lamb doner with chips, salad, and sauces.", price: 8.00, category: "doner-kebabs" },
  { id: "dk-7", name: "Chicken Doner & Chips", description: "Chicken doner with chips, salad, and sauces.", price: 8.00, category: "doner-kebabs" },
  { id: "dk-8", name: "Shish Kebab", description: "Tender marinated lamb pieces grilled on skewers.", price: 8.99, category: "doner-kebabs" },

  /* ── Grill & Philly Steak ──────────────── */
  { id: "gr-1", name: "Philly Ribeye Cheese Steak", description: "Finely cut ribeye steak with grilled peppers, onions, and creamy cheese sauce on a soft potato roll.", price: 11.99, category: "grill-philly", badge: "Premium" },
  { id: "gr-2", name: "Steak and Nacho Fries Tray", description: "70g ribeye steak served over loaded nacho fries.", price: 10.99, category: "grill-philly" },
  { id: "gr-3", name: "Lamb Chops (5pc) - Plain", description: "5 premium lamb chops, simply seasoned and charcoal-grilled.", price: 13.99, category: "grill-philly" },
  { id: "gr-4", name: "Lamb Chops (5pc) - Naga", description: "5 premium lamb chops glazed in fiery Naga chilli.", price: 14.49, category: "grill-philly", badge: "🔥 Hot" },
  { id: "gr-5", name: "Lamb Chops (5pc) - BBQ", description: "5 premium lamb chops with smoky BBQ glaze.", price: 14.49, category: "grill-philly" },
  { id: "gr-6", name: "Lamb Ribs (5pc) - Plain", description: "5 juicy lamb ribs, simply seasoned and charcoal-grilled.", price: 12.99, category: "grill-philly" },
  { id: "gr-7", name: "Lamb Ribs (5pc) - Naga", description: "5 juicy lamb ribs glazed in fiery Naga chilli.", price: 13.49, category: "grill-philly" },
  { id: "gr-8", name: "Peri Peri Whole Chicken", description: "Whole charcoal-grilled chicken with peri peri seasoning.", price: 14.99, category: "grill-philly" },
  { id: "gr-9", name: "Peri Peri Half Chicken", description: "Half charcoal-grilled chicken with peri peri seasoning.", price: 9.99, category: "grill-philly" },
  { id: "gr-10", name: "Peri Peri Quarter Chicken", description: "Quarter charcoal-grilled chicken with peri peri seasoning.", price: 6.99, category: "grill-philly" },

  /* ── Peri Peri ──────────────────────────── */
  { id: "pp-1", name: "Peri Peri Chicken Burger", description: "Grilled peri peri chicken fillet, slaw, peri peri mayo, brioche bun.", price: 8.50, category: "peri-peri" },
  { id: "pp-2", name: "Peri Peri Wrap", description: "Peri peri chicken, salad, peri peri mayo in a tortilla.", price: 7.50, category: "peri-peri" },
  { id: "pp-3", name: "Peri Peri Loaded Fries", description: "Fries, peri peri chicken, cheese sauce, peri peri drizzle.", price: 7.50, category: "peri-peri" },

  /* ── Wings ──────────────────────────────── */
  { id: "wg-1", name: "Peri Grilled Wings (4pc)", description: "Four flame-grilled wings glazed in peri peri sauce.", price: 5.49, category: "wings" },
  { id: "wg-2", name: "Peri Grilled Wings (6pc)", description: "Six flame-grilled wings glazed in peri peri sauce.", price: 6.99, category: "wings" },
  { id: "wg-3", name: "Peri Grilled Wings (10pc)", description: "Ten flame-grilled wings glazed in peri peri sauce.", price: 9.99, category: "wings" },
  { id: "wg-4", name: "Naga Wings (6pc)", description: "Six crispy wings coated in naga chilli glaze. VERY HOT.", price: 7.49, category: "wings", badge: "🔥 Hot" },
  { id: "wg-5", name: "Wild Mango Wings (4pc)", description: "Crispy wings tossed in a sweet and tangy wild mango glaze.", price: 5.99, category: "wings" },
  { id: "wg-6", name: "Wild Mango Wings (6pc)", description: "Six crispy wings in sweet and tangy wild mango glaze.", price: 7.49, category: "wings" },
  { id: "wg-7", name: "Honey Sriracha Wings (6pc)", description: "Crispy fried wings, honey sriracha glaze, sesame, spring onion.", price: 7.50, category: "wings" },

  /* ── Loaded Fries ───────────────────────── */
  { id: "lf-1", name: "Nacho Fries", description: "Skin-on fries, nacho cheese sauce, jalapeños, salsa.", price: 6.50, category: "loaded-fries" },
  { id: "lf-2", name: "Nacho Cheesy Fries", description: "Loaded nacho fries with extra melted cheese sauce.", price: 7.50, category: "loaded-fries" },
  { id: "lf-3", name: "Crispy Chicken Loaded Fries", description: "Fries topped with crispy chicken bites, cheese sauce, and garlic mayo.", price: 7.50, category: "loaded-fries" },
  { id: "lf-4", name: "Doner Loaded Fries", description: "Fries, lamb doner, cheese sauce, chilli sauce, garlic mayo.", price: 7.50, category: "loaded-fries" },
  { id: "lf-5", name: "Naga Loaded Fries", description: "Fries, naga chicken, cheese sauce, naga drizzle, spring onion.", price: 8.00, category: "loaded-fries", badge: "🔥 Hot" },
  { id: "lf-6", name: "BBQ Chicken Loaded Fries", description: "Fries, BBQ chicken, cheese sauce, crispy onions, ranch.", price: 7.50, category: "loaded-fries" },

  /* ── Wraps ──────────────────────────────── */
  { id: "wr-1", name: "Chicken Wrap", description: "Grilled chicken, lettuce, tomato, onion, garlic mayo in a tortilla.", price: 7.50, category: "wraps" },
  { id: "wr-2", name: "Spicy Chicken Wrap", description: "Crispy chicken, hot sauce, slaw, jalapeños, sriracha mayo.", price: 8.00, category: "wraps" },
  { id: "wr-3", name: "Lamb Doner Wrap", description: "Shaved lamb doner, salad, chilli sauce, garlic mayo.", price: 8.50, category: "wraps" },
  { id: "wr-4", name: "Naga Wrap", description: "Crispy chicken, naga sauce, slaw, cheese, jalapeños in a tortilla.", price: 8.00, category: "wraps" },
  { id: "wr-5", name: "Halloumi Wrap", description: "Grilled halloumi, roasted peppers, rocket, sweet chilli sauce.", price: 7.50, category: "wraps" },

  /* ── Sides & Extras ────────────────────── */
  { id: "sd-1", name: "Regular Fries", description: "Skin-on seasoned fries.", price: 3.00, category: "sides" },
  { id: "sd-2", name: "Cheesy Fries", description: "Fries topped with melted cheese sauce.", price: 4.00, category: "sides" },
  { id: "sd-3", name: "Onion Rings", description: "Crispy battered onion rings.", price: 3.50, category: "sides" },
  { id: "sd-4", name: "Chicken Strips (3pc)", description: "Three crispy chicken strips.", price: 4.50, category: "sides" },
  { id: "sd-5", name: "Chicken Strips (5pc)", description: "Five crispy chicken strips.", price: 6.50, category: "sides" },
  { id: "sd-6", name: "Halloumi Fries", description: "Crispy coated halloumi sticks.", price: 4.50, category: "sides" },
  { id: "sd-7", name: "Mac & Cheese Bites", description: "Six crispy mac and cheese bites.", price: 4.00, category: "sides" },
  { id: "sd-8", name: "Corn on the Cob", description: "Grilled corn with butter.", price: 2.50, category: "sides" },
  { id: "sd-9", name: "Coleslaw", description: "Creamy homestyle coleslaw.", price: 2.00, category: "sides" },
  { id: "sd-10", name: "Naan Bread", description: "Freshly baked naan.", price: 2.00, category: "sides" },

  /* ── Desserts ───────────────────────────── */
  { id: "ds-1", name: "Chocolate Brownie", description: "Warm chocolate brownie with chocolate sauce.", price: 4.00, category: "desserts" },
  { id: "ds-2", name: "Cookie Dough Bites", description: "Six warm cookie dough bites with caramel.", price: 4.50, category: "desserts" },
  { id: "ds-3", name: "Churros", description: "Cinnamon sugar churros with Nutella dip.", price: 4.50, category: "desserts" },
  { id: "ds-4", name: "Matilda Cake Slice", description: "Rich chocolate Matilda cake slice.", price: 3.50, category: "desserts" },

  /* ── Drinks ─────────────────────────────── */
  { id: "dr-1", name: "Coca-Cola", description: "330ml can.", price: 1.50, category: "drinks" },
  { id: "dr-2", name: "Diet Coke", description: "330ml can.", price: 1.50, category: "drinks" },
  { id: "dr-3", name: "Fanta Orange", description: "330ml can.", price: 1.50, category: "drinks" },
  { id: "dr-4", name: "Sprite", description: "330ml can.", price: 1.50, category: "drinks" },
  { id: "dr-5", name: "Rio Tropical", description: "330ml can.", price: 1.50, category: "drinks" },
  { id: "dr-6", name: "Water", description: "500ml bottle.", price: 1.00, category: "drinks" },
  { id: "dr-7", name: "Oreo Milkshake", description: "Thick Oreo milkshake.", price: 4.00, category: "drinks" },
  { id: "dr-8", name: "Biscoff Milkshake", description: "Thick Biscoff milkshake.", price: 4.00, category: "drinks" },
  { id: "dr-9", name: "Strawberry Milkshake", description: "Thick strawberry milkshake.", price: 3.50, category: "drinks" },

  /* ── Sauces ─────────────────────────────── */
  { id: "sc-1", name: "Garlic Mayo", description: "Creamy garlic mayonnaise dip.", price: 0.70, category: "sauces" },
  { id: "sc-2", name: "Chilli Sauce", description: "Medium heat chilli sauce.", price: 0.70, category: "sauces" },
  { id: "sc-3", name: "BBQ Sauce", description: "Smoky BBQ dipping sauce.", price: 0.70, category: "sauces" },
  { id: "sc-4", name: "Sriracha Mayo", description: "Creamy sriracha mayo.", price: 0.70, category: "sauces" },
  { id: "sc-5", name: "House Sauce", description: "Smok'd N Smash'd signature house sauce.", price: 0.70, category: "sauces" },
  { id: "sc-6", name: "Naga Sauce", description: "Extra hot naga chilli sauce.", price: 0.70, category: "sauces" },
  { id: "sc-7", name: "Peri Peri Sauce", description: "Medium-hot peri peri sauce.", price: 0.70, category: "sauces" },
];

/**
 * Get items for a specific category
 */
export function getItemsByCategory(categoryId: string): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.category === categoryId);
}
