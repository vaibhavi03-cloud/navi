import type { Product, FloorArea, NavigationNode } from './types';

export const floorAreas: FloorArea[] = [
  // Floor 1 (10 Shops)
  { id: 'f1_entrance', name: { en: 'Main Entrance', kn: 'ಮುಖ್ಯ ದ್ವಾರ', hi: 'मुख्य द्वार' }, type: 'entrance', x: 40, y: 85, width: 20, height: 10, color: 'bg-transparent', textColor: 'text-gray-500 font-semibold', floor: 1, entrancePoint: { x: 50, y: 95, floor: 1 } },
  { id: 'f1_exit', name: { en: 'Exit', kn: 'ನಿರ್ಗಮನ', hi: 'बाहर' }, type: 'exit', x: 80, y: 85, width: 10, height: 10, color: 'bg-gray-200', textColor: 'text-gray-600', floor: 1, entrancePoint: { x: 85, y: 95, floor: 1 } },
  { id: 'f1_produce', name: { en: 'Fresh Produce', kn: 'ತಾಜಾ ಉತ್ಪನ್ನಗಳು', hi: 'ताज़ी उपज' }, type: 'shop', x: 5, y: 10, width: 30, height: 40, color: 'bg-green-200', textColor: 'text-green-800', floor: 1, entrancePoint: { x: 20, y: 51, floor: 1 } },
  { id: 'f1_butcher', name: { en: 'Butcher Shop', kn: 'ಕಟುಕನ ಅಂಗಡಿ', hi: 'कसाई की दुकान' }, type: 'shop', x: 5, y: 55, width: 30, height: 25, color: 'bg-red-200', textColor: 'text-red-800', floor: 1, entrancePoint: { x: 20, y: 54, floor: 1 } },
  { id: 'f1_bakery', name: { en: 'Bakery', kn: 'ಬೇಕರಿ', hi: 'बेकरी' }, type: 'shop', x: 40, y: 10, width: 25, height: 25, color: 'bg-amber-200', textColor: 'text-amber-800', floor: 1, entrancePoint: { x: 52.5, y: 36, floor: 1 } },
  { id: 'f1_dairy', name: { en: 'Dairy & Cheese', kn: 'ಡೈರಿ ಮತ್ತು ಚೀಸ್', hi: 'डेयरी और पनीर' }, type: 'shop', x: 40, y: 40, width: 25, height: 25, color: 'bg-blue-200', textColor: 'text-blue-800', floor: 1, entrancePoint: { x: 52.5, y: 39, floor: 1 } },
  { id: 'f1_washroom_m', name: { en: "Men's Washroom", kn: 'ಪುರುಷರ ಶೌಚಾಲಯ', hi: 'पुरुषों का शौचालय' }, type: 'washroom', gender: 'male', x: 75, y: 10, width: 20, height: 15, color: 'bg-gray-300', textColor: 'text-gray-600', floor: 1, entrancePoint: { x: 85, y: 26, floor: 1 } },
  { id: 'f1_washroom_f', name: { en: "Women's Washroom", kn: 'ಮಹಿಳೆಯರ ಶೌಚಾಲಯ', hi: 'महिलाओं का शौचालय' }, type: 'washroom', gender: 'female', x: 75, y: 30, width: 20, height: 15, color: 'bg-gray-300', textColor: 'text-gray-600', floor: 1, entrancePoint: { x: 85, y: 29, floor: 1 } },
  { id: 'f1_pantry_goods', name: { en: 'Pantry Goods', kn: 'ಪ್ಯಾಂಟ್ರಿ ಸರಕುಗಳು', hi: 'पेंट्री का सामान' }, type: 'shop', x: 70, y: 50, width: 25, height: 15, color: 'bg-yellow-200', textColor: 'text-yellow-800', floor: 1, entrancePoint: { x: 82.5, y: 49, floor: 1 } },
  { id: 'f1_beverages', name: { en: 'Beverages', kn: 'ಪಾನೀಯಗಳು', hi: 'पेय पदार्थ' }, type: 'shop', x: 70, y: 70, width: 25, height: 10, color: 'bg-teal-200', textColor: 'text-teal-800', floor: 1, entrancePoint: { x: 82.5, y: 69, floor: 1 } },
  { id: 'f1_pet_supplies', name: { en: 'Pet Supplies', kn: 'ಸಾಕುಪ್ರಾಣಿ ಸರಬರಾಜು', hi: 'पालतू पशुओं का सामान' }, type: 'shop', x: 5, y: 85, width: 15, height: 10, color: 'bg-orange-300', textColor: 'text-orange-900', floor: 1, entrancePoint: { x: 12.5, y: 84, floor: 1 } },
  { id: 'f1_baby_care', name: { en: 'Baby Care', kn: 'ಮಕ್ಕಳ ಆರೈಕೆ', hi: 'शिशु देखभाल' }, type: 'shop', x: 22, y: 85, width: 15, height: 10, color: 'bg-pink-200', textColor: 'text-pink-800', floor: 1, entrancePoint: { x: 29.5, y: 84, floor: 1 } },
  { id: 'f1_cleaning', name: { en: 'Cleaning Supplies', kn: 'ಸ್ವಚ್ಛಗೊಳಿಸುವ ಸಾಮಗ್ರಿಗಳು', hi: 'सफाई की आपूर्ति' }, type: 'shop', x: 60, y: 85, width: 15, height: 10, color: 'bg-cyan-200', textColor: 'text-cyan-800', floor: 1, entrancePoint: { x: 67.5, y: 84, floor: 1 } },
  { id: 'f1_florist', name: { en: 'Florist', kn: 'ಹೂಗಾರ', hi: 'फूलवाला' }, type: 'shop', x: 40, y: 68, width: 25, height: 12, color: 'bg-rose-200', textColor: 'text-rose-800', floor: 1, entrancePoint: { x: 52.5, y: 67, floor: 1 } },

  // Floor 2 (10 Shops)
  { id: 'f2_frozen', name: { en: 'Frozen Foods', kn: 'ಹೆಪ್ಪುಗಟ್ಟಿದ ಆಹಾರಗಳು', hi: 'जमे हुए खाद्य पदार्थ' }, type: 'shop', x: 5, y: 10, width: 30, height: 20, color: 'bg-cyan-200', textColor: 'text-cyan-800', floor: 2, entrancePoint: { x: 20, y: 31, floor: 2 } },
  { id: 'f2_canned', name: { en: 'Canned Goods', kn: 'ಡಬ್ಬಿಗಳು', hi: 'डिब्बाबंद सामान' }, type: 'shop', x: 5, y: 45, width: 30, height: 25, color: 'bg-gray-400', textColor: 'text-white', floor: 2, entrancePoint: { x: 20, y: 44, floor: 2 } },
  { id: 'f2_snacks', name: { en: 'Snacks', kn: 'ತಿಂಡಿಗಳು', hi: 'स्नैक्स' }, type: 'shop', x: 40, y: 10, width: 55, height: 20, color: 'bg-orange-200', textColor: 'text-orange-800', floor: 2, entrancePoint: { x: 67.5, y: 31, floor: 2 } },
  { id: 'f2_checkout', name: { en: 'Checkout', kn: 'ಚೆಕ್ಔಟ್', hi: 'चेक आउट' }, type: 'shop', x: 40, y: 45, width: 45, height: 25, color: 'bg-indigo-300', textColor: 'text-indigo-800', floor: 2, entrancePoint: { x: 62.5, y: 44, floor: 2 } },
  { id: 'f2_washroom_m', name: { en: "Men's Washroom", kn: 'ಪುರುಷರ ಶೌಚಾಲಯ', hi: 'पुरुषों का शौचालय' }, type: 'washroom', gender: 'male', x: 80, y: 83, width: 15, height: 12, color: 'bg-gray-300', textColor: 'text-gray-600', floor: 2, entrancePoint: { x: 87.5, y: 82, floor: 2 } },
  { id: 'f2_washroom_f', name: { en: "Women's Washroom", kn: 'ಮಹಿಳೆಯರ ಶೌಚಾಲಯ', hi: 'महिलाओं का शौचालय' }, type: 'washroom', gender: 'female', x: 60, y: 83, width: 15, height: 12, color: 'bg-gray-300', textColor: 'text-gray-600', floor: 2, entrancePoint: { x: 67.5, y: 82, floor: 2 } },
  { id: 'f2_beverages_2', name: { en: 'Beverages', kn: 'ಪಾನೀಯಗಳು', hi: 'पेय पदार्थ' }, type: 'shop', x: 5, y: 32, width: 30, height: 11, color: 'bg-teal-200', textColor: 'text-teal-800', floor: 2, entrancePoint: { x: 20, y: 44, floor: 2 } },
  { id: 'f2_packaged_goods', name: { en: 'Packaged Goods', kn: 'ಪ್ಯಾಕೇಜ್ ಮಾಡಿದ ಸರಕುಗಳು', hi: 'पैकेज्ड सामान' }, type: 'shop', x: 40, y: 32, width: 25, height: 11, color: 'bg-amber-200', textColor: 'text-amber-800', floor: 2, entrancePoint: { x: 52.5, y: 44, floor: 2 } },
  { id: 'f2_household', name: { en: 'Household Supplies', kn: 'ಮನೆಬಳಕೆ ವಸ್ತುಗಳು', hi: 'घरेलू सामान' }, type: 'shop', x: 68, y: 32, width: 27, height: 11, color: 'bg-cyan-300', textColor: 'text-cyan-900', floor: 2, entrancePoint: { x: 81.5, y: 44, floor: 2 } },
  { id: 'f2_deli', name: { en: 'Deli', kn: 'ಡೆಲಿ', hi: 'डेली' }, type: 'shop', x: 5, y: 72, width: 30, height: 10, color: 'bg-red-300', textColor: 'text-red-900', floor: 2, entrancePoint: { x: 20, y: 71, floor: 2 } },
  { id: 'f2_international', name: { en: 'International Foods', kn: 'ಅಂತರರಾಷ್ಟ್ರೀಯ ಆಹಾರಗಳು', hi: 'अंतर्राष्ट्रीय खाद्य पदार्थ' }, type: 'shop', x: 40, y: 72, width: 25, height: 10, color: 'bg-orange-300', textColor: 'text-orange-900', floor: 2, entrancePoint: { x: 52.5, y: 71, floor: 2 } },
  { id: 'f2_pharmacy', name: { en: 'Pharmacy', kn: 'ಔಷಧಾಲಯ', hi: 'फार्मेसी' }, type: 'shop', x: 87, y: 45, width: 8, height: 25, color: 'bg-green-300', textColor: 'text-green-900', floor: 2, entrancePoint: { x: 86, y: 57.5, floor: 2 } },

  // Floor 3 (10 Shops)
  { id: 'f3_electronics', name: { en: 'Electronics', kn: 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್', hi: 'इलेक्ट्रानिक्स' }, type: 'shop', x: 5, y: 10, width: 40, height: 30, color: 'bg-slate-400', textColor: 'text-white', floor: 3, entrancePoint: { x: 46, y: 25, floor: 3 } },
  { id: 'f3_home', name: { en: 'Home Goods', kn: 'ಗೃಹಬಳಕೆಯ ವಸ್ತುಗಳು', hi: 'घर का सामान' }, type: 'shop', x: 50, y: 10, width: 45, height: 20, color: 'bg-violet-200', textColor: 'text-violet-800', floor: 3, entrancePoint: { x: 49, y: 20, floor: 3 } },
  { id: 'f3_office', name: { en: 'Mall Office', kn: 'ಮಾಲ್ ಕಚೇರಿ', hi: 'मॉल कार्यालय' }, type: 'utility', x: 50, y: 55, width: 20, height: 25, color: 'bg-gray-300', textColor: 'text-gray-600', floor: 3, entrancePoint: { x: 60, y: 54, floor: 3 } },
  { id: 'f3_washroom_m', name: { en: "Men's Washroom", kn: 'ಪುರುಷರ ಶೌಚಾಲಯ', hi: 'पुरुषों का शौचालय' }, type: 'washroom', gender: 'male', x: 75, y: 55, width: 20, height: 12, color: 'bg-gray-300', textColor: 'text-gray-600', floor: 3, entrancePoint: { x: 85, y: 68, floor: 3 } },
  { id: 'f3_washroom_f', name: { en: "Women's Washroom", kn: 'ಮಹಿಳೆಯರ ಶೌಚಾಲಯ', hi: 'महिलाओं का शौचालय' }, type: 'washroom', gender: 'female', x: 75, y: 70, width: 20, height: 12, color: 'bg-gray-300', textColor: 'text-gray-600', floor: 3, entrancePoint: { x: 85, y: 69, floor: 3 } },
  { id: 'f3_clothing_m', name: { en: "Men's Clothing", kn: 'ಪುರುಷರ ಉಡುಪು', hi: 'पुरुषों के कपड़े' }, type: 'shop', x: 5, y: 85, width: 20, height: 10, color: 'bg-blue-300', textColor: 'text-blue-900', floor: 3, entrancePoint: { x: 15, y: 84, floor: 3 } },
  { id: 'f3_clothing_w', name: { en: "Women's Clothing", kn: 'ಮಹಿಳೆಯರ ಉಡುಪು', hi: 'महिलाओं के कपड़े' }, type: 'shop', x: 30, y: 85, width: 20, height: 10, color: 'bg-pink-300', textColor: 'text-pink-900', floor: 3, entrancePoint: { x: 40, y: 84, floor: 3 } },
  { id: 'f3_clothing_k', name: { en: "Kids' Clothing", kn: 'ಮಕ್ಕಳ ಉಡುಪು', hi: 'बच्चों के कपड़े' }, type: 'shop', x: 55, y: 85, width: 20, height: 10, color: 'bg-yellow-300', textColor: 'text-yellow-900', floor: 3, entrancePoint: { x: 65, y: 84, floor: 3 } },
  { id: 'f3_shoes', name: { en: 'Shoes', kn: 'ಶೂಗಳು', hi: 'जूते' }, type: 'shop', x: 80, y: 85, width: 15, height: 10, color: 'bg-gray-500', textColor: 'text-white', floor: 3, entrancePoint: { x: 87.5, y: 84, floor: 3 } },
  { id: 'f3_toys', name: { en: 'Toys & Games', kn: 'ಆಟಿಕೆಗಳು ಮತ್ತು ಆಟಗಳು', hi: 'खिलौने और खेल' }, type: 'shop', x: 5, y: 45, width: 18, height: 35, color: 'bg-red-200', textColor: 'text-red-800', floor: 3, entrancePoint: { x: 14, y: 44, floor: 3 } },
  { id: 'f3_sports', name: { en: 'Sporting Goods', kn: 'ಕ್ರೀಡಾ ಸಾಮಗ್ರಿಗಳು', hi: 'खेल का सामान' }, type: 'shop', x: 27, y: 45, width: 18, height: 35, color: 'bg-green-200', textColor: 'text-green-800', floor: 3, entrancePoint: { x: 36, y: 44, floor: 3 } },
  { id: 'f3_gifts', name: { en: 'Gifts & Souvenirs', kn: 'ಉಡುಗೊರೆಗಳು ಮತ್ತು ಸ್ಮರಣಿಕೆಗಳು', hi: 'उपहार और स्मृति चिन्ह' }, type: 'shop', x: 50, y: 32, width: 21, height: 18, color: 'bg-purple-200', textColor: 'text-purple-800', floor: 3, entrancePoint: { x: 60.5, y: 51, floor: 3 } },
  { id: 'f3_luggage', name: { en: 'Luggage', kn: 'ಲಗೇಜ್', hi: 'सामान' }, type: 'shop', x: 74, y: 32, width: 21, height: 18, color: 'bg-orange-200', textColor: 'text-orange-800', floor: 3, entrancePoint: { x: 84.5, y: 51, floor: 3 } },

  // Floor 4 (10 Shops)
  { id: 'f4_cafe', name: { en: 'Cafe', kn: 'ಕೆಫೆ', hi: 'कैफे' }, type: 'shop', x: 5, y: 10, width: 40, height: 20, color: 'bg-amber-300', textColor: 'text-amber-800', floor: 4, entrancePoint: { x: 46, y: 20, floor: 4 } },
  { id: 'f4_books', name: { en: 'Bookstore', kn: 'ಪುಸ್ತಕದಂಗಡಿ', hi: 'किताबों की दुकान' }, type: 'shop', x: 50, y: 10, width: 45, height: 30, color: 'bg-sky-200', textColor: 'text-sky-800', floor: 4, entrancePoint: { x: 49, y: 25, floor: 4 } },
  { id: 'f4_patio', name: { en: 'Rooftop Patio', kn: 'ರೂಫ್‌ಟಾಪ್ ಪ್ಯಾಟಿಯೊ', hi: 'रूफटॉप आंगन' }, type: 'utility', x: 5, y: 55, width: 40, height: 15, color: 'bg-lime-200', textColor: 'text-lime-800', floor: 4, entrancePoint: { x: 46, y: 62.5, floor: 4 } },
  { id: 'f4_washroom_m', name: { en: "Men's Washroom", kn: 'ಪುರುಷರ ಶೌಚಾಲಯ', hi: 'पुरुषों का शौचालय' }, type: 'washroom', gender: 'male', x: 80, y: 83, width: 15, height: 12, color: 'bg-gray-300', textColor: 'text-gray-600', floor: 4, entrancePoint: { x: 87.5, y: 82, floor: 4 } },
  { id: 'f4_washroom_f', name: { en: "Women's Washroom", kn: 'ಮಹಿಳೆಯರ ಶೌಚಾಲಯ', hi: 'महिलाओं का शौचालय' }, type: 'washroom', gender: 'female', x: 60, y: 83, width: 15, height: 12, color: 'bg-gray-300', textColor: 'text-gray-600', floor: 4, entrancePoint: { x: 67.5, y: 82, floor: 4 } },
  { id: 'f4_food_1', name: { en: 'Pizza Place', kn: 'ಪಿಜ್ಜಾ ಸ್ಥಳ', hi: 'पिज़्ज़ा की जगह' }, type: 'shop', x: 5, y: 32, width: 18, height: 18, color: 'bg-yellow-200', textColor: 'text-yellow-800', floor: 4, entrancePoint: { x: 14, y: 51, floor: 4 } },
  { id: 'f4_food_2', name: { en: 'Burger Joint', kn: 'ಬರ್ಗರ್ ಜಾಯಿಂಟ್', hi: 'बर्गर जॉइंट' }, type: 'shop', x: 27, y: 32, width: 18, height: 18, color: 'bg-orange-200', textColor: 'text-orange-800', floor: 4, entrancePoint: { x: 36, y: 51, floor: 4 } },
  { id: 'f4_jewelry', name: { en: 'Jewelry Store', kn: 'ಆಭರಣ ಅಂಗಡಿ', hi: 'आभूषण की दुकान' }, type: 'shop', x: 50, y: 45, width: 21, height: 35, color: 'bg-purple-200', textColor: 'text-purple-800', floor: 4, entrancePoint: { x: 60.5, y: 44, floor: 4 } },
  { id: 'f4_watches', name: { en: 'Watch Shop', kn: 'ವಾಚ್ ಅಂಗಡಿ', hi: 'घड़ी की दुकान' }, type: 'shop', x: 74, y: 45, width: 21, height: 35, color: 'bg-gray-500', textColor: 'text-white', floor: 4, entrancePoint: { x: 84.5, y: 44, floor: 4 } },
  { id: 'f4_arcade', name: { en: 'Arcade', kn: 'ಆರ್ಕೇಡ್', hi: 'आर्केड' }, type: 'shop', x: 5, y: 72, width: 40, height: 10, color: 'bg-indigo-300', textColor: 'text-indigo-800', floor: 4, entrancePoint: { x: 25, y: 71, floor: 4 } },
  { id: 'f4_cinema_1', name: { en: 'Cinema 1', kn: 'ಸಿನಿಮಾ 1', hi: 'सिनेमा 1' }, type: 'shop', x: 5, y: 85, width: 25, height: 10, color: 'bg-red-400', textColor: 'text-white', floor: 4, entrancePoint: { x: 17.5, y: 84, floor: 4 } },
  { id: 'f4_cinema_2', name: { en: 'Cinema 2', kn: 'ಸಿನಿಮಾ 2', hi: 'सिनेमा 2' }, type: 'shop', x: 35, y: 85, width: 20, height: 10, color: 'bg-red-400', textColor: 'text-white', floor: 4, entrancePoint: { x: 45, y: 84, floor: 4 } },
  { id: 'f4_food_court', name: { en: 'Food Court', kn: 'ಫುಡ್ ಕೋರ್ಟ್', hi: 'फ़ूड कोर्ट' }, type: 'shop', x: 50, y: 83, width: 8, height: 12, color: 'bg-green-200', textColor: 'text-green-800', floor: 4, entrancePoint: { x: 54, y: 82, floor: 4 } },
];


export const navigationNodes: NavigationNode[] = [
    // Stairs (Left side)
    { id: 's1_left', type: 'stairs', floor: 1, x: 2.5, y: 45, links: [{ floor: 2, id: 's2_left' }] },
    { id: 's2_left', type: 'stairs', floor: 2, x: 2.5, y: 45, links: [{ floor: 1, id: 's1_left' }, { floor: 3, id: 's3_left' }] },
    { id: 's3_left', type: 'stairs', floor: 3, x: 2.5, y: 45, links: [{ floor: 2, id: 's2_left' }, { floor: 4, id: 's4_left' }] },
    { id: 's4_left', type: 'stairs', floor: 4, x: 2.5, y: 45, links: [{ floor: 3, id: 's3_left' }] },
    // Escalators (Center)
    { id: 'e1_center', type: 'escalator', floor: 1, x: 52.5, y: 80, links: [{ floor: 2, id: 'e2_center' }] },
    { id: 'e2_center', type: 'escalator', floor: 2, x: 52.5, y: 80, links: [{ floor: 1, id: 'e1_center' }, { floor: 3, id: 'e3_center' }] },
    { id: 'e3_center', type: 'escalator', floor: 3, x: 52.5, y: 85, links: [{ floor: 2, id: 'e2_center' }] },
    // Lifts (Right side)
    { id: 'l1_right', type: 'lift', floor: 1, x: 97.5, y: 45, links: [{ floor: 2, id: 'l2_right' }, { floor: 3, id: 'l3_right' }, { floor: 4, id: 'l4_right' }] },
    { id: 'l2_right', type: 'lift', floor: 2, x: 97.5, y: 45, links: [{ floor: 1, id: 'l1_right' }, { floor: 3, id: 'l3_right' }, { floor: 4, id: 'l4_right' }] },
    { id: 'l3_right', type: 'lift', floor: 3, x: 97.5, y: 45, links: [{ floor: 1, id: 'l1_right' }, { floor: 2, id: 'l2_right' }, { floor: 4, id: 'l4_right' }] },
    { id: 'l4_right', type: 'lift', floor: 4, x: 97.5, y: 45, links: [{ floor: 1, id: 'l1_right' }, { floor: 2, id: 'l2_right' }, { floor: 3, id: 'l3_right' }] },
];

export const initialProducts: Product[] = [
  // Floor 1 Products
  { id: 1, name: { en: 'Avocados', kn: 'ಆವಕಾಡೊಗಳು', hi: 'एवोकाडो' }, price: 1.75, category: { en: 'Fruits & Vegetables', kn: 'ಹಣ್ಣುಗಳು ಮತ್ತು ತರಕಾರಿಗಳು', hi: 'फल और सब्जियां' }, shopId: 'f1_produce', floor: 1 },
  { id: 2, name: { en: 'Cheddar Cheese', kn: 'ಚೆಡ್ಡಾರ್ ಚೀಸ್', hi: 'चेडर चीज़' }, price: 8.00, category: { en: 'Dairy', kn: 'ಡೈರಿ', hi: 'डेयरी' }, shopId: 'f1_dairy', floor: 1 },
  { id: 3, name: { en: 'Croissants', kn: 'ಕ್ರೋಸೆಂಟ್‌ಗಳು', hi: 'क्रोइसैन' }, price: 2.50, category: { en: 'Bakery', kn: 'ಬೇಕರಿ', hi: 'बेकरी' }, shopId: 'f1_bakery', floor: 1 },
  { id: 5, name: { en: 'Ground Beef (lb)', kn: 'ಕೊಚ್ಚಿದ ಗೋಮಾಂಸ (lb)', hi: 'कीमा बनाया हुआ बीफ़ (lb)' }, price: 6.50, category: { en: 'Meat', kn: 'ಮಾಂಸ', hi: 'मांस' }, shopId: 'f1_butcher', floor: 1 },
  { id: 6, name: { en: 'Organic Milk', kn: 'ಸಾವಯವ ಹಾಲು', hi: 'ऑर्गेनिक दूध' }, price: 4.20, category: { en: 'Dairy', kn: 'ಡೈರಿ', hi: 'डेयरी' }, shopId: 'f1_dairy', floor: 1 },
  { id: 7, name: { en: 'Artisan Bread', kn: 'ಕುಶಲಕರ್ಮಿ ಬ್ರೆಡ್', hi: 'कारीगर रोटी' }, price: 5.50, category: { en: 'Bakery', kn: 'ಬೇಕರಿ', hi: 'बेकरी' }, shopId: 'f1_bakery', floor: 1 },
  { id: 15, name: { en: 'Apples', kn: 'ಸೇಬುಗಳು', hi: 'सेब' }, price: 2.50, category: { en: 'Fruits & Vegetables', kn: 'ಹಣ್ಣುಗಳು ಮತ್ತು ತರಕಾರಿಗಳು', hi: 'फल और सब्जियां' }, shopId: 'f1_produce', floor: 1 },
  { id: 16, name: { en: 'Bananas', kn: 'ಬಾಳೆಹಣ್ಣುಗಳು', hi: 'केले' }, price: 1.20, category: { en: 'Fruits & Vegetables', kn: 'ಹಣ್ಣುಗಳು ಮತ್ತು ತರಕಾರಿಗಳು', hi: 'फल और सब्जियां' }, shopId: 'f1_produce', floor: 1 },
  { id: 17, name: { en: 'Carrots (bunch)', kn: 'ಕ್ಯಾರೆಟ್ (ಗುಂಪು)', hi: 'गाजर (गुच्छा)' }, price: 1.80, category: { en: 'Fruits & Vegetables', kn: 'ಹಣ್ಣುಗಳು ಮತ್ತು ತರಕಾರಿಗಳು', hi: 'फल और सब्जियां' }, shopId: 'f1_produce', floor: 1 },
  { id: 20, name: { en: 'Chicken Breast (lb)', kn: 'ಚಿಕನ್ ಸ್ತನ (lb)', hi: 'चिकन ब्रेस्ट (lb)' }, price: 5.99, category: { en: 'Meat', kn: 'ಮಾಂಸ', hi: 'मांस' }, shopId: 'f1_butcher', floor: 1 },
  { id: 65, name: { en: 'Pasta', kn: 'ಪಾಸ್ತಾ', hi: 'पास्ता' }, price: 2.30, category: { en: 'Pantry', kn: 'ಪ್ಯಾಂಟ್ರಿ', hi: 'पेंट्री' }, shopId: 'f1_pantry_goods', floor: 1 },
  { id: 66, name: { en: 'Mineral Water', kn: 'ಖನಿಜಯುಕ್ತ ನೀರು', hi: 'मिनरल वॉटर' }, price: 1.50, category: { en: 'Beverages', kn: 'ಪಾನೀಯಗಳು', hi: 'पेय पदार्थ' }, shopId: 'f1_beverages', floor: 1 },
  { id: 67, name: { en: 'Dog Food', kn: 'ನಾಯಿ ಆಹಾರ', hi: 'कुत्ते का खाना' }, price: 15.00, category: { en: 'Pet Supplies', kn: 'ಸಾಕುಪ್ರಾಣಿ ಸರಬರಾಜು', hi: 'पालतू पशुओं का सामान' }, shopId: 'f1_pet_supplies', floor: 1 },
  { id: 68, name: { en: 'Diapers', kn: 'ಡೈಪರ್ಸ್', hi: 'डायपर' }, price: 22.00, category: { en: 'Baby Care', kn: 'ಮಕ್ಕಳ ಆರೈಕೆ', hi: 'शिशु देखभाल' }, shopId: 'f1_baby_care', floor: 1 },
  { id: 69, name: { en: 'Laundry Detergent', kn: 'ಲಾಂಡ್ರಿ ಡಿಟರ್ಜೆಂಟ್', hi: 'कपड़े धोने का डिटर्जेंट' }, price: 12.50, category: { en: 'Cleaning', kn: 'ಸ್ವಚ್ಛಗೊಳಿಸುವಿಕೆ', hi: 'सफाई' }, shopId: 'f1_cleaning', floor: 1 },
  { id: 70, name: { en: 'Bouquet of Roses', kn: 'ಗುಲಾಬಿಗಳ ಪುಷ್ಪಗುಚ್ಛ', hi: 'गुलाब का गुलदस्ता' }, price: 25.00, category: { en: 'Flowers', kn: 'ಹೂವುಗಳು', hi: 'फूल' }, shopId: 'f1_florist', floor: 1 },
  
  // Floor 2 Products
  { id: 4, name: { en: 'Frozen Pizza', kn: 'ಹೆಪ್ಪುಗಟ್ಟಿದ ಪಿಜ್ಜಾ', hi: 'फ्रोजन पिज्जा' }, price: 7.99, category: { en: 'Frozen', kn: 'ಹೆಪ್ಪುಗಟ್ಟಿದ', hi: 'जमे हुए' }, shopId: 'f2_frozen', floor: 2 },
  { id: 8, name: { en: 'Potato Chips', kn: 'ಆಲೂಗೆಡ್ಡೆ ಚಿಪ್ಸ್', hi: 'आलू के चिप्स' }, price: 3.25, category: { en: 'Snacks', kn: 'ತಿಂಡಿಗಳು', hi: 'स्नैक्स' }, shopId: 'f2_snacks', floor: 2 },
  { id: 13, name: { en: 'Canned Tomatoes', kn: 'ಡಬ್ಬಿಯಲ್ಲಿಟ್ಟ ಟೊಮ್ಯಾಟೊ', hi: 'डिब्बाबंद टमाटर' }, price: 1.50, category: { en: 'Pantry', kn: 'ಪ್ಯಾಂಟ್ರಿ', hi: 'पेंट्री' }, shopId: 'f2_canned', floor: 2 },
  { id: 32, name: { en: 'Vanilla Ice Cream', kn: 'ವೆನಿಲ್ಲಾ ಐಸ್ ಕ್ರೀಮ್', hi: 'वेनिला आइसक्रीम' }, price: 6.50, category: { en: 'Frozen', kn: 'ಹೆಪ್ಪುಗಟ್ಟಿದ', hi: 'जमे हुए' }, shopId: 'f2_frozen', floor: 2 },
  { id: 36, name: { en: 'Canned Chickpeas', kn: 'ಡಬ್ಬಿಯಲ್ಲಿಟ್ಟ ಕಡಲೆ', hi: 'डिब्बाबंद चने' }, price: 1.25, category: { en: 'Pantry', kn: 'ಪ್ಯಾಂಟ್ರಿ', hi: 'पेंट्री' }, shopId: 'f2_canned', floor: 2 },
  { id: 40, name: { en: 'Salted Pretzels', kn: 'ಉಪ್ಪುಸಹಿತ ಪ್ರೆಟ್ಜೆಲ್‌ಗಳು', hi: 'नमकीन प्रेट्ज़ेल' }, price: 3.00, category: { en: 'Snacks', kn: 'ತಿಂಡಿಗಳು', hi: 'स्नैक्स' }, shopId: 'f2_snacks', floor: 2 },
  { id: 71, name: { en: 'Cola', kn: 'ಕೋಲಾ', hi: 'कोला' }, price: 1.80, category: { en: 'Beverages', kn: 'ಪಾನೀಯಗಳು', hi: 'पेय पदार्थ' }, shopId: 'f2_beverages_2', floor: 2 },
  { id: 72, name: { en: 'Sliced Bread', kn: 'ತುಂಡರಿಸಿದ ಬ್ರೆಡ್', hi: 'कटी हुई ब्रेड' }, price: 3.50, category: { en: 'Packaged Goods', kn: 'ಪ್ಯಾಕೇಜ್ ಮಾಡಿದ ಸರಕುಗಳು', hi: 'पैकेज्ड सामान' }, shopId: 'f2_packaged_goods', floor: 2 },
  { id: 73, name: { en: 'Paper Towels', kn: 'ಪೇಪರ್ ಟವೆಲ್', hi: 'कागज़ के तौलिये' }, price: 4.00, category: { en: 'Household', kn: 'ಮನೆಬಳಕೆ', hi: 'घरेलू' }, shopId: 'f2_household', floor: 2 },
  { id: 74, name: { en: 'Sliced Ham', kn: 'ತುಂಡರಿಸಿದ ಹ್ಯಾಮ್', hi: 'कटा हुआ हैम' }, price: 8.50, category: { en: 'Deli', kn: 'ಡೆಲಿ', hi: 'डेली' }, shopId: 'f2_deli', floor: 2 },
  { id: 75, name: { en: 'Soy Sauce', kn: 'ಸೋಯಾ ಸಾಸ್', hi: 'सोया सॉस' }, price: 3.75, category: { en: 'International', kn: 'ಅಂತರರಾಷ್ಟ್ರೀಯ', hi: 'अंतर्राष्ट्रीय' }, shopId: 'f2_international', floor: 2 },
  { id: 76, name: { en: 'Pain Relievers', kn: 'ನೋವು ನಿವಾರಕಗಳು', hi: 'दर्द निवारक' }, price: 9.99, category: { en: 'Pharmacy', kn: 'ಔಷಧಾಲಯ', hi: 'फार्मेसी' }, shopId: 'f2_pharmacy', floor: 2 },

  // Floor 3 Products
  { id: 9, name: { en: 'Headphones', kn: 'ಹೆಡ್‌ಫೋನ್‌ಗಳು', hi: 'हेडफोन' }, price: 149.99, category: { en: 'Electronics', kn: 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್', hi: 'इलेक्ट्रानिक्स' }, shopId: 'f3_electronics', floor: 3 },
  { id: 10, name: { en: 'Throw Pillow', kn: 'ಥ್ರೋ ಪಿಲ್ಲೊ', hi: 'थ्रो पिलो' }, price: 25.00, category: { en: 'Home Decor', kn: 'ಮನೆ ಅಲಂಕಾರ', hi: 'गृह सज्जा' }, shopId: 'f3_home', floor: 3 },
  { id: 14, name: { en: 'Smart TV', kn: 'ಸ್ಮಾರ್ಟ್ ಟಿವಿ', hi: 'स्मार्ट टीवी' }, price: 499.99, category: { en: 'Electronics', kn: 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್', hi: 'इलेक्ट्रानिक्स' }, shopId: 'f3_electronics', floor: 3 },
  { id: 45, name: { en: 'Smartphone', kn: 'ಸ್ಮಾರ್ಟ್ಫೋನ್', hi: 'स्मार्टफोन' }, price: 699.00, category: { en: 'Electronics', kn: 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್', hi: 'इलेक्ट्रानिक्स' }, shopId: 'f3_electronics', floor: 3 },
  { id: 50, name: { en: 'Scented Candle', kn: 'ಸುವಾಸಿತ ಮೇಣದಬತ್ತಿ', hi: 'सुगंधित मोमबत्ती' }, price: 15.00, category: { en: 'Home Decor', kn: 'ಮನೆ ಅಲಂಕಾರ', hi: 'गृह सज्जा' }, shopId: 'f3_home', floor: 3 },
  { id: 77, name: { en: 'T-Shirt', kn: 'ಟಿ-ಶರ್ಟ್', hi: 'टी-शर्ट' }, price: 20.00, category: { en: 'Clothing', kn: 'ಉಡುಪು', hi: 'कपड़े' }, shopId: 'f3_clothing_m', floor: 3 },
  { id: 78, name: { en: 'Summer Dress', kn: 'ಬೇಸಿಗೆ ಉಡುಗೆ', hi: 'गर्मी की पोशाक' }, price: 45.00, category: { en: 'Clothing', kn: 'ಉಡುಪು', hi: 'कपड़े' }, shopId: 'f3_clothing_w', floor: 3 },
  { id: 79, name: { en: 'Baby Onesie', kn: 'ಬೇಬಿ ಒನ್ಸಿ', hi: 'बेबी वनसी' }, price: 15.00, category: { en: 'Clothing', kn: 'ಉಡುಪು', hi: 'कपड़े' }, shopId: 'f3_clothing_k', floor: 3 },
  { id: 80, name: { en: 'Running Shoes', kn: 'ಚಾಲನೆಯಲ್ಲಿರುವ ಶೂಗಳು', hi: 'दौड़ने वाले जूते' }, price: 80.00, category: { en: 'Shoes', kn: 'ಶೂಗಳು', hi: 'जूते' }, shopId: 'f3_shoes', floor: 3 },
  { id: 81, name: { en: 'Action Figure', kn: 'ಆಕ್ಷನ್ ಫಿಗರ್', hi: 'एक्शन फिगर' }, price: 12.99, category: { en: 'Toys', kn: 'ಆಟಿಕೆಗಳು', hi: 'खिलौने' }, shopId: 'f3_toys', floor: 3 },
  { id: 82, name: { en: 'Basketball', kn: 'ಬ್ಯಾಸ್ಕೆಟ್‌ಬಾಲ್', hi: 'बास्केटबॉल' }, price: 30.00, category: { en: 'Sports', kn: 'ಕ್ರೀಡೆ', hi: 'खेल' }, shopId: 'f3_sports', floor: 3 },
  { id: 83, name: { en: 'City Keychain', kn: 'ಸಿಟಿ ಕೀಚೈನ್', hi: 'शहर की चाबी का गुच्छा' }, price: 5.00, category: { en: 'Gifts', kn: 'ಉಡುಗೊರೆಗಳು', hi: 'उपहार' }, shopId: 'f3_gifts', floor: 3 },
  { id: 84, name: { en: 'Carry-on Suitcase', kn: 'ಕ್ಯಾರಿ-ಆನ್ ಸೂಟ್‌ಕೇಸ್', hi: 'कैरी-ऑन सूटकेस' }, price: 120.00, category: { en: 'Luggage', kn: 'ಲಗೇಜ್', hi: 'सामान' }, shopId: 'f3_luggage', floor: 3 },

  // Floor 4 Products
  { id: 11, name: { en: 'Espresso', kn: 'ಎಸ್ಪ್ರೆಸೊ', hi: 'एस्प्रेसो' }, price: 3.75, category: { en: 'Beverages', kn: 'ಪಾನೀಯಗಳು', hi: 'पेय पदार्थ' }, shopId: 'f4_cafe', floor: 4 },
  { id: 12, name: { en: 'Bestseller Novel', kn: 'ಅತ್ಯುತ್ತಮ ಮಾರಾಟವಾದ ಕಾದಂಬರಿ', hi: 'सबसे ज्यादा बिकने वाला उपन्यास' }, price: 18.99, category: { en: 'Books', kn: 'ಪುಸ್ತಕಗಳು', hi: 'किताबें' }, shopId: 'f4_books', floor: 4 },
  { id: 55, name: { en: 'Cappuccino', kn: 'ಕ್ಯಾಪುಸಿನೊ', hi: 'कैपुचीनो' }, price: 4.50, category: { en: 'Beverages', kn: 'ಪಾನೀಯಗಳು', hi: 'पेय पदार्थ' }, shopId: 'f4_cafe', floor: 4 },
  { id: 60, name: { en: 'Science Fiction Novel', kn: 'ವಿಜ್ಞಾನ ಕಾದಂಬರಿ', hi: 'विज्ञान कथा उपन्यास' }, price: 22.00, category: { en: 'Books', kn: 'ಪುಸ್ತಕಗಳು', hi: 'किताबें' }, shopId: 'f4_books', floor: 4 },
  { id: 61, name: { en: 'Leather Journal', kn: 'ಚರ್ಮದ ಜರ್ನಲ್', hi: 'चमड़े की पत्रिका' }, price: 25.00, category: { en: 'Stationery', kn: 'ಲೇಖನ ಸಾಮಗ್ರಿ', hi: 'स्टेशनरी' }, shopId: 'f4_books', floor: 4 },
  { id: 85, name: { en: 'Slice of Pizza', kn: 'ಪಿಜ್ಜಾ ತುಂಡು', hi: 'पिज़्ज़ा का टुकड़ा' }, price: 4.00, category: { en: 'Food', kn: 'ಆಹಾರ', hi: 'खाना' }, shopId: 'f4_food_1', floor: 4 },
  { id: 86, name: { en: 'Cheeseburger', kn: 'ಚೀಸ್ ಬರ್ಗರ್', hi: 'चीज़बर्गर' }, price: 8.00, category: { en: 'Food', kn: 'ಆಹಾರ', hi: 'खाना' }, shopId: 'f4_food_2', floor: 4 },
  { id: 87, name: { en: 'Silver Necklace', kn: 'ಬೆಳ್ಳಿ ಹಾರ', hi: 'चांदी का हार' }, price: 150.00, category: { en: 'Jewelry', kn: 'ಆಭರಣ', hi: 'आभूषण' }, shopId: 'f4_jewelry', floor: 4 },
  { id: 88, name: { en: 'Sports Watch', kn: 'ಕ್ರೀಡಾ ವಾಚ್', hi: 'खेल घड़ी' }, price: 250.00, category: { en: 'Watches', kn: 'ಕೈಗಡಿಯಾರಗಳು', hi: 'घड़ियाँ' }, shopId: 'f4_watches', floor: 4 },
  { id: 89, name: { en: 'Arcade Token', kn: 'ಆರ್ಕೇಡ್ ಟೋಕನ್', hi: 'आर्केड टोकन' }, price: 1.00, category: { en: 'Entertainment', kn: 'ಮನರಂಜನೆ', hi: 'मनोरंजन' }, shopId: 'f4_arcade', floor: 4 },
  { id: 90, name: { en: 'Movie Ticket', kn: 'ಚಲನಚಿತ್ರ ಟಿಕೆಟ್', hi: 'फिल्म का टिकट' }, price: 15.00, category: { en: 'Entertainment', kn: 'ಮನರಂಜನೆ', hi: 'मनोरंजन' }, shopId: 'f4_cinema_1', floor: 4 },
  { id: 91, name: { en: 'Tacos', kn: 'ಟ್ಯಾಕೋಗಳು', hi: 'टैकोस' }, price: 9.50, category: { en: 'Food', kn: 'ಆಹಾರ', hi: 'खाना' }, shopId: 'f4_food_court', floor: 4 },
];
