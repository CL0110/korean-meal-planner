import { useState, useCallback, useEffect, useRef } from "react";

const SEED_NAMUL = [
  { id:"n1", name:"Kongnamul Muchim", romanized:"콩나물 무침", desc:"Seasoned soybean sprouts", maangchi:"kongnamul-muchim", ingredients:["Soybean sprouts","Soy sauce","Sesame oil","Minced garlic","Sesame seeds","Green onion"] },
  { id:"n2", name:"Sigeumchi Muchim", romanized:"시금치 무침", desc:"Seasoned blanched spinach", maangchi:"sigeumchi-namul", ingredients:["Spinach","Soy sauce","Sesame oil","Minced garlic","Sesame seeds"] },
  { id:"n3", name:"Doraji Muchim", romanized:"도라지 무침", desc:"Seasoned bellflower root", maangchi:"doraji-muchim", ingredients:["Bellflower root","Gochujang","Vinegar","Sugar","Sesame oil","Sesame seeds"] },
  { id:"n4", name:"Gosari Namul", romanized:"고사리 나물", desc:"Braised fernbrake", maangchi:"gosari-namul", ingredients:["Fernbrake","Soy sauce","Sesame oil","Minced garlic","Sesame seeds","Perilla oil"] },
  { id:"n5", name:"Mu Saengchae", romanized:"무 생채", desc:"Raw spicy radish salad", maangchi:"sigol-mu-saengchae", ingredients:["Radish","Red pepper flakes","Vinegar","Sugar","Salt","Minced garlic","Sesame seeds"] },
  { id:"n6", name:"Aehobak Bokkeum", romanized:"애호박 볶음", desc:"Stir-fried zucchini", maangchi:"aehobak-saeu-bokkeum", ingredients:["Zucchini","Salt","Minced garlic","Sesame oil","Sesame seeds","Cooking oil"] },
  { id:"n7", name:"Kkaennip Muchim", romanized:"깻잎 무침", desc:"Seasoned perilla leaves", maangchi:null, ingredients:["Perilla leaves","Soy sauce","Red pepper flakes","Sesame oil","Minced garlic","Sugar","Sesame seeds"] },
  { id:"n8", name:"Sukju Namul", romanized:"숙주 나물", desc:"Seasoned mung bean sprouts", maangchi:"sukjunamul-muchim", ingredients:["Mung bean sprouts","Salt","Sesame oil","Minced garlic","Sesame seeds"] },
  { id:"n9", name:"Oi Bokkeum", romanized:"오이 볶음", desc:"Sauteed cucumbers", maangchi:"oi-bokkeum", ingredients:["Cucumber","Minced garlic","Salt","Sesame oil","Sesame seeds","Cooking oil"] },
  { id:"n10", name:"Minari Muchim", romanized:"미나리 무침", desc:"Seasoned water parsley", maangchi:"minari-muchim", ingredients:["Water parsley","Gochujang","Vinegar","Sugar","Sesame seeds"] },
  { id:"n11", name:"Asparagus Muchim", romanized:"아스파라거스 무침", desc:"Seasoned asparagus", maangchi:"asparagus-muchim", ingredients:["Asparagus","Soy sauce","Sesame oil","Minced garlic","Sesame seeds"] },
  { id:"n12", name:"Broccoli Dubu-muchim", romanized:"브로콜리 두부무침", desc:"Broccoli with tofu", maangchi:"broccoli-dubu-muchim", ingredients:["Broccoli","Tofu","Doenjang paste","Minced garlic","Sesame oil","Sesame seeds"] },
  { id:"n13", name:"Gim-muchim", romanized:"김무침", desc:"Seasoned seaweed", maangchi:"gim-muchim", ingredients:["Dried seaweed","Soy sauce","Sesame oil","Sesame seeds","Red pepper flakes"] },
  { id:"n14", name:"Neutari-beoseot Bokkeum", romanized:"느타리버섯 볶음", desc:"Stir-fried oyster mushrooms", maangchi:"neutari-beoseot-bokkeum", ingredients:["Oyster mushrooms","Minced garlic","Salt","Sesame oil","Sesame seeds","Cooking oil"] },
  { id:"n15", name:"Chwinamul", romanized:"취나물", desc:"Seasoned aster scaber", maangchi:"chwinamul", ingredients:["Aster scaber","Soy sauce","Sesame oil","Minced garlic","Perilla oil","Sesame seeds"] },
  { id:"n16", name:"Gaji Namul", romanized:"가지 나물", desc:"Seasoned eggplant", maangchi:"gaji-namul", ingredients:["Eggplant","Soy sauce","Sesame oil","Minced garlic","Red pepper flakes","Sesame seeds"] },
  { id:"n17", name:"Muwoonamul", romanized:"무나물", desc:"Cooked radish side dish", maangchi:"muwoonamul", ingredients:["Radish","Sesame oil","Minced garlic","Salt","Sesame seeds"] },
  { id:"n18", name:"Miyeok Muchim", romanized:"미역 무침", desc:"Sweet & sour seaweed salad", maangchi:"miyeok-muchim", ingredients:["Seaweed","Vinegar","Sugar","Soy sauce","Sesame seeds","Minced garlic"] },
  { id:"n19", name:"Oi Muchim", romanized:"오이무침", desc:"Spicy cucumber side dish", maangchi:"oi-muchim", ingredients:["Cucumber","Red pepper flakes","Vinegar","Sugar","Salt","Minced garlic","Sesame seeds"] },
  { id:"n20", name:"Maneuljjong Bokkeum", romanized:"마늘쫑 볶음", desc:"Stir-fried garlic scapes", maangchi:"maneuljjong-bokkeum", ingredients:["Garlic scapes","Soy sauce","Gochujang","Sugar","Sesame oil","Sesame seeds"] },
  { id:"n21", name:"Kkeopjilkong Maneul Bokkeum", romanized:"껍질콩 마늘 볶음", desc:"Garlic green beans", maangchi:"kkeopjilkong-maneul-bokkeum", ingredients:["Green beans","Garlic","Olive oil","Salt","Sesame seeds"] },
  { id:"n22", name:"Miyeokjulgi Bokkeum", romanized:"미역줄기 볶음", desc:"Sauteed sea plant stems", maangchi:"miyeok-julgi-bokkeum", ingredients:["Seaweed stems","Minced garlic","Sesame oil","Soy sauce","Sesame seeds","Cooking oil"] },
  { id:"n23", name:"Sukju-oi Namul", romanized:"숙주오이 나물", desc:"Mung bean sprout and cucumber", maangchi:"sukju-oi-namul", ingredients:["Mung bean sprouts","Cucumber","Salt","Sesame oil","Minced garlic","Sesame seeds"] },
  { id:"n24", name:"Dotorimuk Muchim", romanized:"도토리묵 무침", desc:"Seasoned acorn jelly", maangchi:"dotorimuk-muchim", ingredients:["Acorn jelly","Soy sauce","Red pepper flakes","Sesame oil","Minced garlic","Green onion","Sesame seeds"] },
  { id:"n25", name:"Cheongpomuk Muchim", romanized:"청포묵 무침", desc:"Mung bean jelly side dish", maangchi:"cheongpomuk-muchim", ingredients:["Mung bean jelly","Soy sauce","Sesame oil","Green onion","Sesame seeds","Red pepper flakes"] },
  { id:"n26", name:"Musaengchae", romanized:"무생채", desc:"Radish salad", maangchi:"musaeng-chae", ingredients:["Radish","Red pepper flakes","Vinegar","Sugar","Salt","Green onion","Sesame seeds"] },
  { id:"n27", name:"Gochu Bokkeum", romanized:"고추 볶음", desc:"Stir-fried green chili peppers", maangchi:"gochu-bokkeum", ingredients:["Green chili peppers","Soy sauce","Sugar","Corn syrup","Sesame oil","Sesame seeds","Cooking oil"] },
  { id:"n28", name:"Bugeopo Gochujang-muchim", romanized:"북어포 고추장무침", desc:"Dried pollock with gochujang", maangchi:"bugeopo-gochujang-muchim", ingredients:["Dried shredded pollock","Gochujang","Corn syrup","Sugar","Sesame oil","Sesame seeds"] },
];

const SEED_BANCHAN = [
  { id:"b1", name:"Gyeran Mari", romanized:"계란말이", desc:"Rolled omelette", maangchi:"gyeran-mari", ingredients:["Eggs","Carrot","Green onion","Salt","Cooking oil"] },
  { id:"b2", name:"Dubu Jorim", romanized:"두부 조림", desc:"Braised spicy tofu", maangchi:"dubu-jorim", ingredients:["Tofu","Red pepper flakes","Soy sauce","Sugar","Minced garlic","Green onion","Sesame oil","Cooking oil"] },
  { id:"b3", name:"Myeolchi Bokkeum", romanized:"멸치 볶음", desc:"Stir-fried anchovies", maangchi:"myeolchi-bokkeum", ingredients:["Dried anchovies","Soy sauce","Sugar","Corn syrup","Minced garlic","Sesame oil","Sesame seeds","Cooking oil"] },
  { id:"b4", name:"Tongbaechu Kimchi", romanized:"배추김치", desc:"Fermented napa cabbage kimchi", maangchi:"tongbaechu-kimchi", ingredients:["Napa cabbage kimchi"] },
  { id:"b5", name:"Spam Gui", romanized:"스팸 구이", desc:"Pan-fried spam slices", maangchi:null, ingredients:["Spam","Cooking oil"] },
  { id:"b6", name:"Gamja Jorim", romanized:"감자 조림", desc:"Braised potatoes", maangchi:"gamja-bokkeum", ingredients:["Potatoes","Soy sauce","Sugar","Corn syrup","Minced garlic","Sesame oil","Cooking oil"] },
  { id:"b7", name:"Kong Jorim", romanized:"콩조림", desc:"Braised black beans", maangchi:"geomeun-kongjorim", ingredients:["Black beans","Soy sauce","Sugar","Corn syrup","Sesame oil"] },
  { id:"b8", name:"Metturyal Jangjorim", romanized:"메추리알 장조림", desc:"Soy-braised quail eggs", maangchi:"jangjorim-with-eggs", ingredients:["Quail eggs","Soy sauce","Sugar","Garlic","Water"] },
  { id:"b9", name:"Eomuk Bokkeum", romanized:"어묵 볶음", desc:"Stir-fried fish cake", maangchi:"uhmook-bokkeum", ingredients:["Fish cake","Soy sauce","Sugar","Red pepper flakes","Sesame oil","Green onion","Cooking oil"] },
  { id:"b10", name:"Kkakdugi", romanized:"깍두기", desc:"Cubed radish kimchi", maangchi:"kkakdugi", ingredients:["Radish kimchi"] },
  { id:"b11", name:"Pa-kimchi", romanized:"파김치", desc:"Green onion kimchi", maangchi:"pa-kimchi", ingredients:["Green onion","Red pepper flakes","Fish sauce","Minced garlic","Ginger","Sugar"] },
  { id:"b12", name:"Gat-kimchi", romanized:"갓김치", desc:"Mustard greens kimchi", maangchi:"gat-kimchi", ingredients:["Mustard greens","Red pepper flakes","Fish sauce","Minced garlic","Ginger"] },
  { id:"b13", name:"Chonggak-kimchi", romanized:"총각김치", desc:"Ponytail radish kimchi", maangchi:"chonggak-kimchi", ingredients:["Ponytail radish","Red pepper flakes","Fish sauce","Minced garlic","Ginger","Green onion"] },
  { id:"b14", name:"Baek-kimchi", romanized:"백김치", desc:"Non-spicy", maangchi:"baekkimchi", ingredients:["Napa cabbage","Radish","Garlic","Ginger","Salt","Green onion"] },
  { id:"b15", name:"Kkaennip Kimchi", romanized:"깻잎김치", desc:"Perilla leaf kimchi", maangchi:"kkaennip-kimchi", ingredients:["Perilla leaves","Soy sauce","Red pepper flakes","Minced garlic","Sugar","Sesame oil"] },
  { id:"b16", name:"Baechu Geotjeori", romanized:"배추겉절이", desc:"Quick fresh kimchi", maangchi:"baechu-geotjeori", ingredients:["Napa cabbage","Red pepper flakes","Fish sauce","Minced garlic","Sugar","Sesame oil","Sesame seeds"] },
  { id:"b17", name:"Buchu Kimchi", romanized:"부추김치", desc:"Asian chive kimchi", maangchi:"buchu-kimchi", ingredients:["Asian chives","Red pepper flakes","Fish sauce","Minced garlic","Sugar","Sesame seeds"] },
  { id:"b18", name:"Oisobagi Kimchi", romanized:"오이소박이", desc:"Spicy stuffed cucumber kimchi", maangchi:"oisobagi-kimchi", ingredients:["Cucumber","Asian chives","Red pepper flakes","Fish sauce","Minced garlic","Ginger"] },
  { id:"b19", name:"Yangbaechu Kimchi", romanized:"양배추김치", desc:"Cabbage kimchi", maangchi:"yangbaechu-kimchi", ingredients:["Cabbage","Red pepper flakes","Minced garlic","Salt","Sugar","Vinegar"] },
  { id:"b20", name:"Yangbaechu Pickle", romanized:"양배추피클", desc:"Shredded cabbage pickles", maangchi:"yangbaechu-pickle", ingredients:["Cabbage","Vinegar","Sugar","Salt","Water"] },
  { id:"b21", name:"Tongmaneul Jangajji", romanized:"통마늘 장아찌", desc:"Whole garlic pickles", maangchi:"tongmaneul-jangajji", ingredients:["Whole garlic","Soy sauce","Vinegar","Sugar","Water"] },
  { id:"b22", name:"Kkaennip Jangajji", romanized:"깻잎 장아찌", desc:"Perilla leaf pickles", maangchi:"kkaennip-jangajji", ingredients:["Perilla leaves","Soy sauce","Vinegar","Sugar","Red pepper flakes","Minced garlic"] },
  { id:"b23", name:"Oi Jangajji", romanized:"오이 장아찌", desc:"Cucumber pickles", maangchi:"oijangajji", ingredients:["Cucumber","Soy sauce","Vinegar","Sugar","Red pepper flakes"] },
  { id:"b24", name:"Gochu Jangajji", romanized:"고추 장아찌", desc:"Green chili pepper pickles", maangchi:"gochu-jangajji", ingredients:["Green chili peppers","Soy sauce","Vinegar","Sugar","Water"] },
  { id:"b25", name:"Gochu-jeotguk Jangajji", romanized:"고추젓국 장아찌", desc:"Pepper pickles in fish sauce", maangchi:"pepper-pickles-in-fish-sauce", ingredients:["Green chili peppers","Salted shrimp","Fish sauce","Soy sauce"] },
  { id:"b26", name:"Kimchijeon", romanized:"김치전", desc:"Kimchi pancake", maangchi:"kimchijeon", ingredients:["Kimchi","Pancake mix","Egg","Green onion","Cooking oil"] },
  { id:"b27", name:"Baechujeon", romanized:"배추전", desc:"Cabbage pancake", maangchi:"baechujeon", ingredients:["Napa cabbage","Pancake mix","Egg","Salt","Cooking oil"] },
  { id:"b28", name:"Haemuljeon", romanized:"해물전", desc:"Seafood pancakes", maangchi:"haemuljeon", ingredients:["Squid","Shrimp","Clams","Pancake mix","Egg","Cooking oil"] },
  { id:"b29", name:"Saeujeon", romanized:"새우전", desc:"Shrimp pancakes", maangchi:"saeujeon", ingredients:["Shrimp","Pancake mix","Egg","Cooking oil"] },
  { id:"b30", name:"Buchujeon", romanized:"부추전", desc:"Chive pancake", maangchi:"buchujeon", ingredients:["Asian chives","Pancake mix","Egg","Cooking oil"] },
  { id:"b31", name:"Kkaennip Jeon", romanized:"깻잎전", desc:"Pan-fried perilla leaves", maangchi:"kkaennip-jeon", ingredients:["Perilla leaves","Beef","Tofu","Flour","Egg","Cooking oil"] },
  { id:"b32", name:"Wanja Jeon", romanized:"완자전", desc:"Pan-fried meat and tofu patties", maangchi:"wanja-jeon", ingredients:["Beef","Tofu","Egg","Flour","Salt","Cooking oil"] },
  { id:"b33", name:"Soegogi Jeon", romanized:"쇠고기전", desc:"Beef pancakes", maangchi:"soegogi-jeon", ingredients:["Beef","Egg","Flour","Salt","Cooking oil"] },
  { id:"b34", name:"Chamchijeon", romanized:"참치전", desc:"Tuna pancake", maangchi:"tuna-pancakes", ingredients:["Canned tuna","Egg","Flour","Salt","Cooking oil"] },
  { id:"b35", name:"Gochujeon", romanized:"고추전", desc:"Green chili pepper pancake", maangchi:"gochujeon", ingredients:["Green chili peppers","Beef","Egg","Flour","Cooking oil"] },
  { id:"b36", name:"Dongtaejeon", romanized:"동태전", desc:"Pollock pancake", maangchi:"dongtaejeon", ingredients:["Pollock fillet","Egg","Flour","Salt","Cooking oil"] },
  { id:"b37", name:"Gyeranjjim", romanized:"계란찜", desc:"Steamed egg side dish", maangchi:"gyeranjjim", ingredients:["Eggs","Green onion","Salt","Sesame oil","Water"] },
  { id:"b38", name:"Ttukbaegi Gyeranjjim", romanized:"뚝배기 계란찜", desc:"Steamed egg in earthenware bowl", maangchi:"ttukbaegi-gyeranjjim", ingredients:["Eggs","Green onion","Salt","Sesame oil","Water"] },
  { id:"b39", name:"Gyeran Jangjorim", romanized:"계란 장조림", desc:"Eggs braised in soy broth", maangchi:"gyeran-jangjorim", ingredients:["Eggs","Soy sauce","Sugar","Garlic","Chili pepper","Water"] },
  { id:"b43", name:"Ojingeochae Muchim", romanized:"오징어채 무침", desc:"Seasoned dried shredded squid", maangchi:"ojingeochae-muchim", ingredients:["Dried shredded squid","Gochujang","Corn syrup","Sugar","Sesame oil","Sesame seeds"] },
  { id:"b50", name:"Jangjorim", romanized:"장조림", desc:"Braised beef in soy sauce", maangchi:"jangjorim", ingredients:["Beef","Eggs","Chili pepper","Soy sauce","Sugar","Garlic","Water"] },
  { id:"b51", name:"Wanja", romanized:"완자", desc:"Korean meatballs with sauce", maangchi:"wanja", ingredients:["Beef","Tofu","Egg","Flour","Soy sauce","Sugar","Cooking oil"] },
  { id:"b52", name:"Kimchi Bokkeum", romanized:"김치 볶음", desc:"Stir-fried kimchi", maangchi:"kimchi-bokkeum", ingredients:["Kimchi","Pork","Sesame oil","Sugar","Cooking oil"] },
  { id:"b54", name:"Ganjang-beoteo Dakgui", romanized:"간장버터 닭구이", desc:"Soy butter pan-grilled chicken", maangchi:"ganjang-beoteo-dakgui", ingredients:["Chicken","Soy sauce","Butter","Minced garlic","Sugar","Sesame oil"] },
  { id:"b56", name:"Dwaeji Bulgogi", romanized:"돼지불고기", desc:"Spicy pork bulgogi", maangchi:"dwaeji-bulgogi", ingredients:["Pork","Gochujang","Soy sauce","Sugar","Sesame oil","Minced garlic","Ginger","Onion"] },
  { id:"b57", name:"Sundae Bokkeum", romanized:"순대볶음", desc:"Spicy stir-fried blood sausage", maangchi:"sundae-bokkeum", ingredients:["Korean blood sausage","Onion","Perilla leaves","Red pepper flakes","Gochujang","Soy sauce","Sugar","Cooking oil"] },
  { id:"b58", name:"Tteokgalbi", romanized:"떡갈비", desc:"Minced seasoned grilled beef ribs", maangchi:"tteokgalbi", ingredients:["Beef short ribs","Soy sauce","Sugar","Pear juice","Minced garlic","Sesame oil","Sesame seeds"] },
  { id:"b59", name:"Ttukbaegi Bulgogi", romanized:"뚝배기불고기", desc:"Bulgogi stew in earthenware pot", maangchi:"ttukbaegi-bulgogi", ingredients:["Beef","Onion","Mushroom","Glass noodles","Soy sauce","Sugar","Sesame oil","Minced garlic"] },
  { id:"b60", name:"Gamja-haem Bokkeum", romanized:"감자햄 볶음", desc:"Stir-fried potato and ham", maangchi:"gamja-haem-bokkeum", ingredients:["Potato","Ham","Onion","Soy sauce","Sugar","Sesame oil","Cooking oil"] },
  { id:"b61", name:"Maeun Gamja Jorim", romanized:"매운감자 조림", desc:"Spicy braised potatoes", maangchi:"maeun-gamja-jorim", ingredients:["Potatoes","Gochujang","Soy sauce","Sugar","Corn syrup","Minced garlic","Sesame oil"] },
  { id:"b62", name:"Algamja Jorim", romanized:"알감자 조림", desc:"Braised baby potatoes", maangchi:"algamja-jorim", ingredients:["Baby potatoes","Soy sauce","Sugar","Corn syrup","Minced garlic","Sesame oil"] },
  { id:"b63", name:"Gamjachae Bokkeum", romanized:"감자채 볶음", desc:"Stir-fried shredded potato", maangchi:"gamjachae-bokkeum", ingredients:["Potato","Salt","Minced garlic","Vinegar","Sesame oil","Cooking oil"] },
  { id:"b64", name:"Gamja Salad", romanized:"감자 샐러드", desc:"Korean-style potato salad", maangchi:"gamja-salad", ingredients:["Potato","Mayonnaise","Carrot","Cucumber","Egg","Salt","Sugar"] },
  { id:"b65", name:"Yeon-geun Jorim", romanized:"연근 조림", desc:"Braised lotus roots", maangchi:"yeon-geun-jorim", ingredients:["Lotus root","Soy sauce","Sugar","Corn syrup","Sesame oil","Sesame seeds"] },
  { id:"b66", name:"Dubu Gangjeong", romanized:"두부강정", desc:"Sweet and crunchy tofu", maangchi:"dubu-gangjeong", ingredients:["Tofu","Gochujang","Soy sauce","Sugar","Corn syrup","Minced garlic","Sesame oil","Cooking oil"] },
  { id:"b67", name:"Dububuchim Yangnyeomjang", romanized:"두부부침 양념장", desc:"Pan fried tofu with spicy sauce", maangchi:"dububuchim-yangnyeomjang", ingredients:["Tofu","Soy sauce","Red pepper flakes","Minced garlic","Sesame oil","Green onion","Cooking oil"] },
  { id:"b68", name:"Kkwarigochu Jjim", romanized:"꽈리고추찜", desc:"Steamed shishito peppers", maangchi:"kkwarigochu-jjim", ingredients:["Shishito peppers","Dried anchovies","Soy sauce","Sugar","Sesame oil","Sesame seeds","Cooking oil"] },
  { id:"b69", name:"Gochujang Gaji Jjim", romanized:"고추장 가지찜", desc:"Spicy stuffed steamed eggplant", maangchi:"gochujang-gaji-jjim", ingredients:["Eggplant","Beef","Gochujang","Soy sauce","Minced garlic","Sesame oil","Sesame seeds"] },
  { id:"b70", name:"Kkaennipjjim", romanized:"깻잎찜", desc:"Steamed perilla leaves", maangchi:"kkaennipjjim", ingredients:["Perilla leaves","Soy sauce","Red pepper flakes","Minced garlic","Sugar","Sesame oil","Sesame seeds"] },
  { id:"b71", name:"Beoseot Tangsu", romanized:"버섯탕수", desc:"Sweet, sour and crispy mushrooms", maangchi:"beoseot-tangsu", ingredients:["Mushrooms","Starch","Vinegar","Sugar","Soy sauce","Onion","Carrot","Cooking oil"] },
  { id:"b72", name:"Gim Gui", romanized:"김구이", desc:"Roasted seaweed sheets", maangchi:"gim-gui", ingredients:["Seaweed sheets","Sesame oil","Salt"] },
  { id:"b73", name:"Sangchu Geotjeori", romanized:"상추겉절이", desc:"Korean lettuce salad", maangchi:"sangchu-geotjeori", ingredients:["Lettuce","Red pepper flakes","Soy sauce","Vinegar","Sugar","Minced garlic","Sesame oil","Sesame seeds"] },
  { id:"b74", name:"Cheonggyeongchae Doenjang-muchim", romanized:"청경채 된장무침", desc:"Bok choy with soybean paste", maangchi:"bok-choy-muchim", ingredients:["Bok choy","Doenjang paste","Minced garlic","Sesame oil","Sesame seeds"] },
  { id:"b75", name:"Myeolchi Muchim", romanized:"멸치무침", desc:"Cold", maangchi:"myeolchi-muchim", ingredients:["Dried anchovies","Gochujang","Vinegar","Sugar","Corn syrup","Sesame oil","Sesame seeds"] },
  { id:"b76", name:"Ojingeo Silchae Bokkeum", romanized:"오징어실채 볶음", desc:"Crunchy squid threads", maangchi:"ojingeo-silchae-bokkeum", ingredients:["Squid threads","Gochujang","Corn syrup","Sugar","Sesame oil","Sesame seeds","Cooking oil"] },
];

const SEED_MAIN = [
  { id:"m1", name:"Doenjang Jjigae", romanized:"된장찌개", desc:"Fermented soybean paste stew", maangchi:"doenjang-jjigae", ingredients:["Doenjang paste","Tofu","Zucchini","Potato","Onion","Mushroom","Minced garlic","Anchovy broth"] },
  { id:"m2", name:"Kimchi Jjigae", romanized:"김치찌개", desc:"Kimchi stew with pork", maangchi:"kimchi-jjigae", ingredients:["Kimchi","Pork belly","Tofu","Onion","Green onion","Red pepper flakes","Sesame oil"] },
  { id:"m3", name:"Bulgogi", romanized:"불고기", desc:"Marinated grilled beef", maangchi:"bulgogi", ingredients:["Beef sirloin","Soy sauce","Sugar","Sesame oil","Minced garlic","Pear juice","Onion","Sesame seeds","Green onion"] },
  { id:"m4", name:"Jeyuk Bokkeum", romanized:"제육볶음", desc:"Spicy stir-fried pork", maangchi:"dwaejigogi-bokkeum", ingredients:["Pork","Gochujang","Red pepper flakes","Soy sauce","Sugar","Sesame oil","Minced garlic","Ginger","Onion","Green onion"] },
  { id:"m5", name:"Sundubu Jjigae", romanized:"순두부찌개", desc:"Soft tofu stew with seafood", maangchi:"haemul-sundubu-jjigae", ingredients:["Soft tofu","Clams","Egg","Red pepper flakes","Minced garlic","Sesame oil","Anchovy broth","Green onion"] },
  { id:"m6", name:"Galbitang", romanized:"갈비탕", desc:"Beef short rib soup", maangchi:"galbitang", ingredients:["Beef short ribs","Radish","Garlic","Ginger","Green onion","Salt","Black pepper"] },
  { id:"m7", name:"Samgyeopsal Gui", romanized:"삼겹살 구이", desc:"Grilled pork belly", maangchi:"samgyeopsal-gui", ingredients:["Pork belly","Lettuce","Garlic","Ssamjang","Kimchi"] },
  { id:"m8", name:"Dakbokkeum Tang", romanized:"닭볶음탕", desc:"Traditional", maangchi:"traditional-dakbokkeumtang", ingredients:["Chicken","Potato","Carrot","Onion","Gochujang","Red pepper flakes","Soy sauce","Sugar","Minced garlic","Ginger"] },
  { id:"m9", name:"Haemul Pajeon", romanized:"해물파전", desc:"Seafood and green onion pancake", maangchi:"haemul-pajeon", ingredients:["Green onion","Squid","Shrimp","Clams","Pancake mix","Egg","Cooking oil"] },
  { id:"m10", name:"Japchae", romanized:"잡채", desc:"Glass noodles with vegetables", maangchi:"japchae", ingredients:["Glass noodles","Spinach","Carrot","Onion","Mushroom","Beef","Soy sauce","Sugar","Sesame oil","Sesame seeds"] },
  { id:"m11", name:"Miyeokguk", romanized:"미역국", desc:"Seaweed soup with beef", maangchi:"miyeokguk", ingredients:["Dried seaweed","Beef","Soy sauce","Sesame oil","Minced garlic","Water"] },
  { id:"m12", name:"Kongnamulguk", romanized:"콩나물국", desc:"Soybean sprout soup", maangchi:"kongnamulguk", ingredients:["Soybean sprouts","Minced garlic","Green onion","Salt","Water"] },
  { id:"m13", name:"Bugeoguk", romanized:"북어국", desc:"Dried pollock soup", maangchi:"bugeoguk", ingredients:["Shredded dried pollock","Tofu","Egg","Minced garlic","Sesame oil","Salt","Green onion"] },
  { id:"m14", name:"Kimchi-guk", romanized:"김치국", desc:"Kimchi soup", maangchi:"kimchi-guk", ingredients:["Kimchi","Tofu","Pork","Minced garlic","Water","Green onion"] },
  { id:"m15", name:"Baechu Doenjangguk", romanized:"배추된장국", desc:"Soybean paste soup with cabbage", maangchi:"baechu-doenjang-guk", ingredients:["Napa cabbage","Doenjang paste","Minced garlic","Anchovy broth","Green onion"] },
  { id:"m16", name:"Soegogi Muguk", romanized:"쇠고기무국", desc:"Beef and radish soup", maangchi:"soegogi-muguk", ingredients:["Beef","Radish","Minced garlic","Soy sauce","Sesame oil","Water","Green onion"] },
  { id:"m17", name:"Sigeumchi-jogae Doenjangguk", romanized:"시금치조개 된장국", desc:"Soybean paste soup with spinach and clams", maangchi:"sigeumchi-jogae-doenjangguk", ingredients:["Spinach","Clams","Doenjang paste","Minced garlic","Anchovy broth"] },
  { id:"m18", name:"Oi Naengguk", romanized:"오이냉국", desc:"Cold cucumber soup", maangchi:"oi-naengguk", ingredients:["Cucumber","Vinegar","Soy sauce","Sugar","Red pepper flakes","Sesame seeds","Water"] },
  { id:"m19", name:"Mandu-guk", romanized:"만두국", desc:"Dumpling soup", maangchi:"mandu-guk", ingredients:["Dumplings","Egg","Green onion","Soy sauce","Water"] },
  { id:"m20", name:"Eomukguk", romanized:"어묵국", desc:"Fish cake soup", maangchi:"eomukguk", ingredients:["Fish cake","Radish","Green onion","Soy sauce","Water"] },
  { id:"m21", name:"Kongnamul Gukbap", romanized:"콩나물국밥", desc:"Soybean sprout soup with rice", maangchi:"kongnamul-gukbap", ingredients:["Soybean sprouts","Kimchi","Rice","Minced garlic","Green onion","Salt"] },
  { id:"m22", name:"Gamjatang", romanized:"감자탕", desc:"Pork bones soup", maangchi:"gamjatang", ingredients:["Pork spine bones","Potato","Cabbage","Perilla seeds powder","Gochujang","Doenjang paste","Minced garlic","Ginger"] },
  { id:"m23", name:"Yukgaejang", romanized:"육개장", desc:"Spicy beef and vegetable soup", maangchi:"yukgaejang", ingredients:["Beef brisket","Fernbrake","Bean sprouts","Green onion","Red pepper flakes","Sesame oil","Minced garlic","Water"] },
  { id:"m24", name:"Sokkoritang", romanized:"소꼬리탕", desc:"Oxtail soup", maangchi:"sokkoritang", ingredients:["Oxtail","Radish","Garlic","Ginger","Salt","Green onion","Black pepper"] },
  { id:"m25", name:"Dakgaejang", romanized:"닭개장", desc:"Spicy chicken and vegetable soup", maangchi:"dakgaejang", ingredients:["Chicken","Fernbrake","Bean sprouts","Green onion","Red pepper flakes","Sesame oil","Minced garlic"] },
  { id:"m26", name:"Samgyetang", romanized:"삼계탕", desc:"Ginseng chicken soup", maangchi:"samgyetang", ingredients:["Young chicken","Glutinous rice","Ginseng","Garlic","Jujube","Water","Salt"] },
  { id:"m27", name:"Honghap Miyeokguk", romanized:"홍합미역국", desc:"Seaweed soup with mussels", maangchi:"honghap-miyeokguk", ingredients:["Mussels","Dried seaweed","Sesame oil","Soy sauce","Minced garlic","Water"] },
  { id:"m28", name:"Kongnamul-kimchiguk", romanized:"콩나물김치국", desc:"Soybean sprout and kimchi soup", maangchi:"kongnamul-kimchiguk", ingredients:["Soybean sprouts","Kimchi","Tofu","Minced garlic","Green onion","Water"] },
  { id:"m29", name:"Seolleongtang", romanized:"설렁탕", desc:"Ox-bone soup", maangchi:"seolleongtang", ingredients:["Beef bones","Beef brisket","Salt","Green onion","Black pepper","Water"] },
  { id:"m30", name:"Gomtang", romanized:"곰탕", desc:"Beef soup", maangchi:"gomtang", ingredients:["Beef brisket","Beef shank","Salt","Green onion","Black pepper","Water"] },
  { id:"m31", name:"Galbi-jjim", romanized:"갈비찜", desc:"Braised beef short ribs", maangchi:"galbi-jjim", ingredients:["Beef short ribs","Radish","Carrot","Onion","Soy sauce","Sugar","Sesame oil","Minced garlic","Ginger","Sesame seeds"] },
  { id:"m32", name:"Jjimdak", romanized:"닭찜", desc:"Braised chicken with vegetables and noodles", maangchi:"dakjjim", ingredients:["Chicken","Glass noodles","Potato","Carrot","Onion","Soy sauce","Sugar","Gochujang","Minced garlic","Sesame oil"] },
  { id:"m33", name:"Gogi Sundubu Jjigae", romanized:"고기 순두부찌개", desc:"Spicy soft tofu stew with beef", maangchi:"gogi-sundubu-jjigae", ingredients:["Soft tofu","Beef","Egg","Red pepper flakes","Minced garlic","Sesame oil","Anchovy broth","Green onion"] },
  { id:"m34", name:"Kimchi Sundubu Jjigae", romanized:"김치 순두부찌개", desc:"Soft tofu stew with kimchi and pork", maangchi:"sundubu-jjigae", ingredients:["Soft tofu","Kimchi","Pork belly","Egg","Red pepper flakes","Sesame oil","Anchovy broth"] },
  { id:"m35", name:"Cheonggukjang Jjigae", romanized:"청국장찌개", desc:"Extra-strong fermented soybean paste stew", maangchi:"cheonggukjang-jjigae", ingredients:["Cheonggukjang paste","Tofu","Kimchi","Onion","Zucchini","Minced garlic","Anchovy broth"] },
  { id:"m36", name:"Chamchi Jjigae", romanized:"참치찌개", desc:"Spicy tuna stew", maangchi:"chamchi-jjigae", ingredients:["Canned tuna","Kimchi","Tofu","Onion","Gochujang","Minced garlic","Green onion"] },
  { id:"m37", name:"Dwaeji-kimchi Duruchigi", romanized:"돼지김치 두루치기", desc:"Spicy stir-fried pork and kimchi", maangchi:"dwaeji-kimchi-duruchigi", ingredients:["Pork","Kimchi","Onion","Gochujang","Red pepper flakes","Soy sauce","Sugar","Minced garlic","Sesame oil"] },
  { id:"m38", name:"Jeyuk Deopbap", romanized:"제육덮밥", desc:"Spicy pork and vegetables over rice", maangchi:"jeyuk-deopbap", ingredients:["Pork","Onion","Zucchini","Gochujang","Soy sauce","Sugar","Minced garlic","Sesame oil","Rice"] },
  { id:"m39", name:"LA Galbi", romanized:"LA갈비", desc:"LA style grilled beef short ribs", maangchi:"la-galbi", ingredients:["LA short ribs","Soy sauce","Sugar","Pear juice","Sesame oil","Minced garlic","Onion","Sesame seeds"] },
  { id:"m40", name:"Nakji Bokkeum", romanized:"낙지볶음", desc:"Spicy stir-fried octopus", maangchi:"nakji-bokkeum", ingredients:["Octopus","Onion","Green onion","Gochujang","Red pepper flakes","Soy sauce","Sugar","Minced garlic","Sesame oil","Cooking oil"] },
  { id:"m41", name:"Bibimbap", romanized:"비빔밥", desc:"Rice mixed with vegetables, meat, egg and chili paste", maangchi:"bibimbap", ingredients:["Rice","Spinach","Soybean sprouts","Fernbrake","Carrot","Beef","Egg","Gochujang","Sesame oil","Sesame seeds"] },
  { id:"m42", name:"Kimchi Bokkeumbap", romanized:"김치볶음밥", desc:"Kimchi fried rice", maangchi:"kimchi-bokkeumbap", ingredients:["Kimchi","Rice","Pork","Egg","Sesame oil","Soy sauce","Cooking oil","Seaweed"] },
  { id:"m43", name:"Dakgangjeong", romanized:"닭강정", desc:"Sweet and crispy fried chicken", maangchi:"dakgangjeong", ingredients:["Chicken","Starch","Gochujang","Soy sauce","Sugar","Corn syrup","Minced garlic","Ginger","Cooking oil"] },
  { id:"m44", name:"Maeuntang", romanized:"매운탕", desc:"Spicy fish stew", maangchi:"maeuntang", ingredients:["Fish","Radish","Zucchini","Tofu","Gochujang","Red pepper flakes","Doenjang paste","Minced garlic","Green onion"] },
  { id:"m45", name:"Eundaegu Jorim", romanized:"은대구조림", desc:"Braised black cod with radish", maangchi:"eundaegu-jorim", ingredients:["Black cod","Radish","Soy sauce","Gochujang","Red pepper flakes","Sugar","Minced garlic","Ginger"] },
  { id:"m46", name:"Jjajangmyeon", romanized:"짜장면", desc:"Noodles with black bean sauce", maangchi:"jjajangmyeon", ingredients:["Chinese noodles","Black bean paste","Pork","Onion","Zucchini","Potato","Cooking oil","Starch"] },
  { id:"m47", name:"Tteokguk", romanized:"떡국", desc:"Rice cake soup", maangchi:"tteokguk", ingredients:["Rice cake","Beef","Egg","Green onion","Soy sauce","Salt","Water","Seaweed"] },
  { id:"m48", name:"Sujebi", romanized:"수제비", desc:"Hand-torn noodle soup", maangchi:"sujebi", ingredients:["Flour","Potato","Zucchini","Onion","Minced garlic","Anchovy broth","Soy sauce","Green onion"] },
  { id:"m49", name:"Tangsuyuk", romanized:"탕수육", desc:"Sweet and sour pork", maangchi:"tangsuyuk", ingredients:["Pork","Starch","Carrot","Onion","Cucumber","Vinegar","Sugar","Soy sauce","Corn syrup","Cooking oil"] },
  { id:"m50", name:"Bossam", romanized:"보쌈", desc:"Pork wraps", maangchi:"bo-ssam", ingredients:["Pork belly","Doenjang paste","Ginger","Garlic","Lettuce","Perilla leaves","Oysters","Salted shrimp"] },
  { id:"m51", name:"Jokbal", romanized:"족발", desc:"Braised pig trotters", maangchi:"jokbal", ingredients:["Pig trotters","Soy sauce","Sugar","Garlic","Ginger","Cinnamon","Star anise","Water"] },
  { id:"m52", name:"Kkotgetang", romanized:"꽃게탕", desc:"Korean crab stew", maangchi:"kkotgetang", ingredients:["Blue crab","Radish","Zucchini","Tofu","Gochujang","Doenjang paste","Red pepper flakes","Minced garlic","Anchovy broth"] },
  { id:"m53", name:"Godeungeo Jorim", romanized:"고등어조림", desc:"Braised mackerel with radish", maangchi:"godeungeo-jorim", ingredients:["Mackerel","Radish","Soy sauce","Red pepper flakes","Minced garlic","Ginger","Sugar","Green onion"] },
  { id:"m54", name:"Ojingeo Bokkeum", romanized:"오징어볶음", desc:"Spicy stir-fried squid", maangchi:"ojingeo-bokkeum", ingredients:["Squid","Onion","Green onion","Gochujang","Red pepper flakes","Soy sauce","Sugar","Minced garlic","Sesame oil","Cooking oil"] },
  { id:"m55", name:"Dakbokkeumtang", romanized:"가슴살", desc:"Spicy braised chicken breasts", maangchi:"dakbokkeumtang", ingredients:["Chicken breast","Potato","Onion","Carrot","Gochujang","Red pepper flakes","Soy sauce","Sugar","Minced garlic"] },
  { id:"m56", name:"Dwaejigogi Jjigae", romanized:"돼지고기찌개", desc:"Spicy pork stew", maangchi:"dwaejigogi-jjigae", ingredients:["Pork","Tofu","Zucchini","Potato","Gochujang","Doenjang paste","Minced garlic","Anchovy broth"] },
  { id:"m57", name:"Galchi Jorim", romanized:"갈치조림", desc:"Braised beltfish", maangchi:"galchi-jorim", ingredients:["Beltfish","Radish","Soy sauce","Red pepper flakes","Minced garlic","Ginger","Sugar","Green onion"] },
  { id:"m58", name:"Kongbiji Jjigae", romanized:"콩비지찌개", desc:"Ground soybean stew", maangchi:"kongbiji-jjigae", ingredients:["Ground soybean","Kimchi","Pork","Minced garlic","Sesame oil","Anchovy broth","Green onion"] },
  { id:"m59", name:"Paeju Doenjang Jjigae", romanized:"패주 된장찌개", desc:"Soybean paste stew with scallops", maangchi:"paeju-doenjang-jjigae", ingredients:["Scallops","Doenjang paste","Tofu","Zucchini","Onion","Minced garlic","Anchovy broth"] },
  { id:"m60", name:"Sogogi Doenjang Jjigae", romanized:"소고기 된장찌개", desc:"Soybean paste stew with beef", maangchi:"sogogi-doenjang-jjigae", ingredients:["Beef","Doenjang paste","Tofu","Zucchini","Potato","Onion","Minced garlic","Anchovy broth"] },
  { id:"m61", name:"Gang-doenjang", romanized:"강된장", desc:"Thick soybean paste stew", maangchi:"gang-doenjang", ingredients:["Doenjang paste","Tofu","Mushroom","Zucchini","Minced garlic","Chili pepper","Perilla oil","Water"] },
  { id:"m62", name:"Mapadubu", romanized:"마파두부", desc:"Korean-style mapo tofu", maangchi:"korean-style-mapo-tofu", ingredients:["Tofu","Pork","Gochujang","Soy sauce","Minced garlic","Ginger","Green onion","Starch","Cooking oil"] },
  { id:"m63", name:"Kimchijjim", romanized:"김치찜", desc:"Braised kimchi & pork", maangchi:"kimchijjim", ingredients:["Kimchi","Pork belly","Tofu","Green onion","Sugar"] },
  { id:"m64", name:"Makgalbi Jjim", romanized:"막갈비찜", desc:"Easy braised beef short ribs", maangchi:"makgalbi-jjim", ingredients:["Beef short ribs","Soy sauce","Sugar","Minced garlic","Ginger","Pear juice","Sesame oil"] },
  { id:"m65", name:"Godeungeo Gui", romanized:"고등어 구이", desc:"Grilled mackerel", maangchi:"godeungeo-gui", ingredients:["Mackerel","Salt","Cooking oil"] },
  { id:"m66", name:"Samchi Yangnyeom-gui", romanized:"삼치 양념구이", desc:"Pan-fried seasoned Spanish mackerel", maangchi:"samchi-yangnyeom-gui", ingredients:["Spanish mackerel","Soy sauce","Gochujang","Sugar","Minced garlic","Sesame oil","Cooking oil"] },
  { id:"m67", name:"Saeu Sogeum-gui", romanized:"새우 소금구이", desc:"Salt-roasted shrimp", maangchi:"saeu-sogeum-gui", ingredients:["Shrimp","Salt","Cooking oil"] },
  { id:"m68", name:"Gulmuchim", romanized:"굴무침", desc:"Seasoned fresh oysters", maangchi:"gulmuchim", ingredients:["Oysters","Red pepper flakes","Minced garlic","Vinegar","Green onion","Sesame oil","Sesame seeds"] },
  { id:"m69", name:"Kodari Jorim", romanized:"코다리 조림", desc:"Braised semi-dried pollock", maangchi:"kodari-jorim", ingredients:["Semi-dried pollock","Radish","Soy sauce","Red pepper flakes","Minced garlic","Ginger","Sugar"] },
  { id:"m70", name:"Kkongchi Jorim", romanized:"꽁치 조림", desc:"Braised saury", maangchi:"kkongchi-jorim", ingredients:["Pacific saury","Radish","Soy sauce","Red pepper flakes","Minced garlic","Ginger","Sugar"] },
  { id:"m71", name:"Daegusal Jorim", romanized:"대구살 조림", desc:"Spicy cod fillets", maangchi:"daegusal-jorim", ingredients:["Cod","Radish","Gochujang","Soy sauce","Sugar","Minced garlic","Ginger"] },
  { id:"m72", name:"Muneo Jorim", romanized:"문어 조림", desc:"Braised octopus", maangchi:"muneo-jorim", ingredients:["Octopus","Soy sauce","Sugar","Corn syrup","Minced garlic","Sesame oil","Sesame seeds"] },
  { id:"m73", name:"Ojingeo Tonggui", romanized:"오징어 통구이", desc:"Spicy grilled squid", maangchi:"ojingeo-tonggui", ingredients:["Squid","Gochujang","Soy sauce","Sugar","Minced garlic","Sesame oil"] },
];

// HELPERS
function pickRandom(arr,n){const c=[...arr],r=[];for(let i=0;i<n&&c.length;i++){r.push(c.splice(Math.floor(Math.random()*c.length),1)[0]);}return r;}

function dishFamily(dish){
  const n=dish.name+" "+(dish.romanized||"");
  if(n.indexOf("김치")>=0||n.indexOf("깍두기")>=0||n.indexOf("결절이")>=0)return "kimchi";
  if(n.indexOf("전")>=0&&n.indexOf("전분")<0)return "jeon";
  if(n.indexOf("장아찌")>=0||n.indexOf("피클")>=0)return "pickle";
  if(n.indexOf("조림")>=0)return "jorim";
  if(n.indexOf("계란")>=0||n.indexOf("메추리알")>=0)return "egg";
  return null;
}

const SEAFOOD_KEYS=["생선","고등어","갈치","꽁치","대구","코다리","문어","오징어","낙지","새우","굴","조개","홍합","꽃게","참치","삼치","어묵","북어","해물","매운탕","패주","관자"];
function isSeafood(dish){
  const n=dish.name+" "+(dish.romanized||"");
  if(n.indexOf("새우젓")>=0&&n.indexOf("새우 ")<0)return false;
  for(let i=0;i<SEAFOOD_KEYS.length;i++){if(n.indexOf(SEAFOOD_KEYS[i])>=0)return true;}
  const fresh=["조개 ","홍합 ","관자 ","오징어 ","낙지 ","꽃게 ","clam","mussel","scallop","squid","octopus","crab","shrimp","oyster"];
  return dish.ingredients.some(ing=>fresh.some(k=>ing.toLowerCase().indexOf(k)>=0));
}
function isStew(dish){
  const n=dish.name+" "+(dish.romanized||"");
  if(n.indexOf("찌개")>=0)return true;
  if(n.indexOf("탕")>=0&&n.indexOf("탕수")<0)return true;
  if(n.indexOf("국")>=0)return true;
  if(n.indexOf("찜")>=0)return true;
  return false;
}

function pickBanchanVaried(banchanList,n){
  const result=[];
  let pool=[...banchanList];
  for(let i=0;i<n&&pool.length;i++){
    const pick=pool[Math.floor(Math.random()*pool.length)];
    result.push(pick);
    const fam=dishFamily(pick);
    pool=pool.filter(d=>d.id!==pick.id&&(fam===null||dishFamily(d)!==fam));
  }
  return result;
}
function buildGroceryList(dishes){const s=new Set(),l=[];dishes.forEach(d=>d.ingredients.forEach(ing=>{const k=ing.toLowerCase();if(!s.has(k)){s.add(k);l.push(ing);}}));return l.sort((a,b)=>a.localeCompare(b,"en"));}
function genId(p){return p+Date.now()+Math.random().toString(36).slice(2,6);}

function generateVariedMeals(namulList,banchanList,mainList,count){
  const meals=[],mc={},W=3,sh=a=>[...a].sort(()=>Math.random()-0.5);
  const pickMain=(filterFn,wIds)=>{
    let el=mainList.filter(m=>!wIds.has(m.id)&&(mc[m.id]||0)<2&&(!filterFn||filterFn(m)));
    if(!el.length)el=mainList.filter(m=>!wIds.has(m.id)&&(!filterFn||filterFn(m)));
    if(!el.length)el=mainList.filter(m=>!wIds.has(m.id)&&(mc[m.id]||0)<2);
    if(!el.length)el=mainList.filter(m=>!wIds.has(m.id));
    if(!el.length)el=mainList;
    return sh(el)[0];
  };
  const mains=[];
  for(let w=0;w*W<count;w++){
    const slots=Math.min(W,count-w*W);
    const wIds=new Set();
    const weekMains=[];
    if(slots>=2){
      const sf=pickMain(isSeafood,wIds);
      weekMains.push(sf);wIds.add(sf.id);
      const st=pickMain(m=>isStew(m)&&!isSeafood(m),wIds);
      weekMains.push(st);wIds.add(st.id);
      while(weekMains.length<slots){
        const x=pickMain(null,wIds);
        weekMains.push(x);wIds.add(x.id);
      }
    }else{
      const x=pickMain(m=>isStew(m)||isSeafood(m),wIds);
      weekMains.push(x);
    }
    sh(weekMains).forEach(m=>{mains.push(m);mc[m.id]=(mc[m.id]||0)+1;});
  }
  for(let i=0;i<count;i++){
    const main=mains[i];
    const namul=pickRandom(namulList,1),nonNamul=pickBanchanVaried(banchanList,2);
    meals.push({id:genId("meal"),main,namul,nonNamul,grocery:buildGroceryList([...namul,...nonNamul,main])});
  }
  return meals;
}

function getDaysInMonth(y,m){return new Date(y,m+1,0).getDate();}
function getFirstDayOfWeek(y,m){return new Date(y,m,1).getDay();}
function distributeMealDays(year,month,count){
  const days=getDaysInMonth(year,month),slots=[],step=days/count;
  for(let i=0;i<count;i++){const d=Math.round(1+i*step+step*0.3);if(d>=1&&d<=days&&!slots.includes(d))slots.push(d);}
  let d=2;while(slots.length<count&&d<=days){if(!slots.includes(d))slots.push(d);d++;}
  return slots.sort((a,b)=>a-b).slice(0,count);
}

const MONTH_KO=["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_KO=["S","M","T","W","T","F","S"];
const STORAGE_DISHES="kmp-dishes-en-v1";
const STORAGE_PLANS="kmp-plans-en-v1";

// localStorage-backed persistence (replaces window.storage)
async function loadStore(key){try{const r=localStorage.getItem(key);if(r)return JSON.parse(r);}catch(e){}return null;}
async function saveStore(key,data){try{localStorage.setItem(key,JSON.stringify(data));}catch(e){}}

const MaangchiLink=({slug})=>{
  if(!slug)return null;
  return(
    <a href={"https://www.maangchi.com/recipe/"+slug} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
      style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:28,height:20,background:"#FF0000",borderRadius:4,textDecoration:"none",flexShrink:0}} title="Watch recipe video on Maangchi">
      <span style={{display:"inline-block",width:0,height:0,borderTop:"5px solid transparent",borderBottom:"5px solid transparent",borderLeft:"9px solid #fff",marginLeft:2}}/>
    </a>
  );
};

const TAG=({label,color})=>(
  <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.06em",padding:"2px 7px",borderRadius:99,
    background:color==="green"?"#dcfce7":color==="amber"?"#fef3c7":color==="purple"?"#f3e8ff":"#dbeafe",
    color:color==="green"?"#15803d":color==="amber"?"#92400e":color==="purple"?"#7e22ce":"#1d4ed8",
    textTransform:"uppercase"}}>{label}</span>
);

const GroceryChecklist=({items,showExport})=>{
  const[checked,setChecked]=useState({});
  useEffect(()=>{setChecked({});},[items]);
  const toggle=ing=>setChecked(p=>{const n=Object.assign({},p);n[ing]=!n[ing];return n;});

  const koTerm=ing=>{const m=ing.match(/^([^(]+)/);return m?encodeURIComponent(m[1].trim()):encodeURIComponent(ing);};
  const enTerm=ing=>{const m=ing.match(/\(([^)]+)\)/);return m?encodeURIComponent(m[1].trim()):encodeURIComponent(ing);};

  const hmartUrl=ing=>"https://www.hmart.com/search?q="+koTerm(ing);
  const instacartUrl=ing=>"https://www.instacart.com/store/s?k="+enTerm(ing);

  const listText=items.join("\n");
  const exportEmail=()=>window.open("mailto:?subject="+encodeURIComponent("Grocery List")+"&body="+encodeURIComponent(listText));
  const exportWhatsApp=()=>window.open("https://wa.me/?text="+encodeURIComponent(listText));
  const exportAppleNotes=()=>window.open("mobilenotes://add?body="+encodeURIComponent(listText));
  const exportTxt=()=>{
    const blob=new Blob([listText],{type:"text/plain"});
    const a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download="grocery-list.txt";
    a.click();
  };

  const iconBtn={fontSize:11,fontWeight:700,padding:"3px 8px",border:"none",borderRadius:6,cursor:"pointer",whiteSpace:"nowrap"};

  return(
    <div>
      {showExport?(
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14,paddingBottom:12,borderBottom:"1px solid #f3f4f6"}}>
          <span style={{fontSize:11,fontWeight:700,color:"#9ca3af",alignSelf:"center",marginRight:4}}>Export:</span>
          <button onClick={()=>navigator.clipboard.writeText(listText)} style={Object.assign({},iconBtn,{background:"#f3f4f6",color:"#374151"})}>{"📋 Copy"}</button>
          <button onClick={exportTxt} style={Object.assign({},iconBtn,{background:"#f3f4f6",color:"#374151"})}>{"📥 .txt"}</button>
          <button onClick={exportEmail} style={Object.assign({},iconBtn,{background:"#f3f4f6",color:"#374151"})}>{"✉️ Email"}</button>
          <button onClick={exportWhatsApp} style={Object.assign({},iconBtn,{background:"#25D366",color:"#fff"})}>{"💬 WhatsApp"}</button>
          <button onClick={exportAppleNotes} style={Object.assign({},iconBtn,{background:"#FFD60A",color:"#1a1a1a"})}>{"📝 Notes"}</button>
        </div>
      ):null}
      {items.map((ing,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 2px",borderBottom:"1px solid #f9f9f9"}}>
          <label style={{display:"flex",alignItems:"center",gap:8,flex:1,cursor:"pointer",fontSize:13,color:checked[ing]?"#9ca3af":"#374151",textDecoration:checked[ing]?"line-through":"none"}}>
            <input type="checkbox" checked={!!checked[ing]} onChange={()=>toggle(ing)} style={{accentColor:"#c2410c",width:15,height:15,flexShrink:0}}/>
            {ing}
          </label>
          <a href={hmartUrl(ing)} target="_blank" rel="noopener noreferrer"
            style={Object.assign({},iconBtn,{background:"#e8f4e8",color:"#1a6e1a",textDecoration:"none",display:"inline-block"})}>
            {"H Mart"}
          </a>
          <a href={instacartUrl(ing)} target="_blank" rel="noopener noreferrer"
            style={Object.assign({},iconBtn,{background:"#fff0e6",color:"#cc4e00",textDecoration:"none",display:"inline-block"})}>
            {"Instacart"}
          </a>
        </div>
      ))}
    </div>
  );
};

function dishEmoji(d){
  const s=(d.name+" "+(d.romanized||"")+" "+(d.desc||"")).toLowerCase();
  const has=function(){for(let i=0;i<arguments.length;i++){if(s.indexOf(arguments[i])>=0)return true;}return false;};
  if(has("전","jeon","pancake"))return "🥞";
  if(has("찌개","jjigae","stew"))return "🍲";
  if((has("국","탕","guk","tang","soup"))&&!has("탕수","tangsu"))return "🥣";
  if(has("새우","shrimp"))return "🦐";
  if(has("오징어","squid"))return "🦑";
  if(has("문어","낙지","octopus"))return "🐙";
  if(has("꽃게","crab"))return "🦀";
  if(has("굴","조개","홍합","관자","oyster","clam","mussel","scallop"))return "🦪";
  if(has("생선","고등어","갈치","꽁치","대구","코다리","북어","삼치","fish","mackerel","cod","pollock","beltfish","saury"))return "🐟";
  if(has("닭","chicken","dak"))return "🍗";
  if(has("계란","egg","gyeran"))return "🍳";
  if(has("당면","noodle","japchae","myeon"))return "🍜";
  if(has("밥","bap"))return "🍚";
  if(has("버섯","mushroom"))return "🍄";
  if(has("감자","potato"))return "🥔";
  if(has("김치","kimchi"))return "🌶";
  if(has("돼지","불고기","갈비","pork","beef","bulgogi","meat","spam","ham","sausage","jokbal","bossam"))return "🥩";
  return "🥬";
}

const MealVisual=({mealData})=>{
  const sides=[...mealData.namul,...mealData.nonNamul];
  const pos=[[80,48],[200,40],[320,48]];
  const trunc=s=>s.length>17?s.slice(0,16)+"…":s;
  return(
    <svg viewBox="0 0 400 190" style={{width:"100%",borderRadius:12,marginBottom:12,display:"block"}}>
      <rect x="0" y="0" width="400" height="190" rx="14" fill="#7c5f43"/>
      <rect x="8" y="8" width="384" height="174" rx="10" fill="#8d6e4f"/>
      {sides.map((d,i)=>(
        <g key={d.id}>
          <circle cx={pos[i][0]} cy={pos[i][1]} r="30" fill="#f5f0e8" stroke="#ddd2c2" strokeWidth="2"/>
          <text x={pos[i][0]} y={pos[i][1]+8} textAnchor="middle" fontSize="22">{dishEmoji(d)}</text>
          <text x={pos[i][0]} y={pos[i][1]+44} textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">{trunc(d.name)}</text>
        </g>
      ))}
      <circle cx="150" cy="134" r="39" fill="#3b3531" stroke="#2a2522" strokeWidth="3"/>
      <text x="150" y="145" textAnchor="middle" fontSize="28">{dishEmoji(mealData.main)}</text>
      <text x="150" y="182" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">{trunc(mealData.main.name)}</text>
      <circle cx="300" cy="134" r="30" fill="#f5f0e8" stroke="#ddd2c2" strokeWidth="2"/>
      <text x="300" y="143" textAnchor="middle" fontSize="22">{"🍚"}</text>
      <text x="300" y="173" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">Rice</text>
    </svg>
  );
};

function AddDishForm({category,onAdd,onClose}){
  const[form,setForm]=useState({name:"",romanized:"",desc:"",maangchi:"",ingredientsRaw:""});
  const[error,setError]=useState("");
  const label=category==="namul"?"Namul":category==="banchan"?"Banchan":"Main/Soup";
  const handleSubmit=()=>{
    if(!form.name.trim()){setError("Please enter a dish name.");return;}
    const ingredients=form.ingredientsRaw.split("\n").map(s=>s.trim()).filter(Boolean);
    if(!ingredients.length){setError("Please enter at least one ingredient.");return;}
    const prefix=category==="namul"?"nu":category==="banchan"?"bu":"mu";
    onAdd({id:genId(prefix),name:form.name.trim(),romanized:form.romanized.trim(),desc:form.desc.trim(),maangchi:form.maangchi.trim()||null,ingredients,custom:true});
    onClose();
  };
  const inp={width:"100%",boxSizing:"border-box",border:"1.5px solid #e5e7eb",borderRadius:8,padding:"9px 11px",fontSize:14,fontFamily:"inherit",outline:"none",marginTop:4};
  const fields=[["Name *","name"],["Romanized","romanized"],["Description","desc"],["Maangchi slug","maangchi"]];
  return(
    <div style={{background:"#fff",border:"2px solid #c2410c",borderRadius:12,padding:16,marginBottom:14}}>
      <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>+ Add {label}</div>
      {fields.map(pair=>(
        <div key={pair[1]} style={{marginBottom:9}}>
          <label style={{fontSize:11,fontWeight:700,color:"#374151"}}>{pair[0]}</label>
          <input style={inp} value={form[pair[1]]} onChange={e=>{const v=e.target.value;setForm(p=>({...p,[pair[1]]:v}));}}/>
        </div>
      ))}
      <div style={{marginBottom:12}}>
        <label style={{fontSize:11,fontWeight:700,color:"#374151"}}>Ingredients * (one per line)</label>
        <textarea style={{...inp,minHeight:80,resize:"vertical"}} value={form.ingredientsRaw} onChange={e=>{const v=e.target.value;setForm(p=>({...p,ingredientsRaw:v}));}}/>
      </div>
      {error?<div style={{fontSize:12,color:"#dc2626",marginBottom:8}}>{error}</div>:null}
      <div style={{display:"flex",gap:8}}>
        <button onClick={handleSubmit} style={{background:"#c2410c",color:"#fff",border:"none",borderRadius:8,padding:"9px 18px",fontWeight:700,fontSize:13,cursor:"pointer"}}>Save</button>
        <button onClick={onClose} style={{background:"#f3f4f6",color:"#374151",border:"none",borderRadius:8,padding:"9px 14px",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
      </div>
    </div>
  );
}

const DishCard=({dish,type,selected,onToggle})=>{
  const isNamul=type==="namul",isMain=type==="main";
  return(
    <div onClick={()=>onToggle(dish)} style={{border:"2px solid "+(selected?(isMain?"#c2410c":isNamul?"#15803d":"#1d4ed8"):"#e5e7eb"),borderRadius:10,padding:"10px 12px",cursor:"pointer",background:selected?(isMain?"#fff7ed":isNamul?"#f0fdf4":"#eff6ff"):"#fff",userSelect:"none"}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:4,marginBottom:2}}>
        <span style={{fontSize:13,fontWeight:700,color:"#111",flex:1}}>{dish.name}</span>
        {dish.custom?<TAG label={"MINE"} color="purple"/>:null}
        {selected?<span style={{fontSize:14}}>{"✓"}</span>:null}
      </div>
      <div style={{fontSize:11,color:"#6b7280",marginBottom:dish.maangchi?5:0}}>{dish.romanized}{dish.desc?" - "+dish.desc:""}</div>
      {dish.maangchi?<MaangchiLink slug={dish.maangchi}/>:null}
    </div>
  );
};

function MonthlyPlanner({namulList,banchanList,mainList}){
  const now=new Date();
  const[year,setYear]=useState(now.getFullYear());
  const[month,setMonth]=useState(now.getMonth());
  const[plan,setPlan]=useState(null);
  const[expanded,setExpanded]=useState(null);
  const[showMG,setShowMG]=useState(false);
  const[copied,setCopied]=useState(false);
  const[dragging,setDragging]=useState(null);
  const[dragOver,setDragOver]=useState(null);
  const planKey=year+"-"+month;

  useEffect(()=>{loadStore(STORAGE_PLANS).then(s=>{setPlan(s&&s[planKey]?s[planKey]:null);});},[planKey]);

  const savePlan=useCallback((np)=>{
    setPlan(np);
    loadStore(STORAGE_PLANS).then(all=>{const u=Object.assign({},all||{});u[planKey]=np;saveStore(STORAGE_PLANS,u);});
  },[planKey]);

  const generatePlan=useCallback(()=>{
    const days=distributeMealDays(year,month,13);
    const meals=generateVariedMeals(namulList,banchanList,mainList,13);
    const mealDays={};
    days.forEach((day,i)=>{mealDays[day]=meals[i];});
    savePlan({year,month,mealDays});setExpanded(null);
  },[year,month,namulList,banchanList,mainList,savePlan]);

  const rerollDay=useCallback((day)=>{
    if(!plan)return;
    const mc={};Object.values(plan.mealDays).filter(Boolean).forEach(m=>{mc[m.main.id]=(mc[m.main.id]||0)+1;});
    const sd=Object.keys(plan.mealDays).map(Number).sort((a,b)=>a-b);
    const idx=sd.indexOf(day),ws=Math.floor(idx/3)*3;
    const others=sd.slice(ws,ws+3).filter(d=>d!==day).map(d=>plan.mealDays[d]&&plan.mealDays[d].main?plan.mealDays[d].main:null).filter(Boolean);
    const wIds=new Set(others.map(m=>m.id));
    const needSf=!others.some(isSeafood);
    const needSt=!others.some(isStew);
    const fits=m=>(!needSf||isSeafood(m))&&(!needSt||isStew(m));
    let el=mainList.filter(m=>!wIds.has(m.id)&&(mc[m.id]||0)<2&&fits(m));
    if(!el.length)el=mainList.filter(m=>!wIds.has(m.id)&&fits(m));
    if(!el.length)el=mainList.filter(m=>!wIds.has(m.id));
    if(!el.length)el=mainList;
    const main=el[Math.floor(Math.random()*el.length)];
    const namul=pickRandom(namulList,1),nonNamul=pickBanchanVaried(banchanList,2);
    const nd=Object.assign({},plan.mealDays);
    nd[day]={id:genId("meal"),main,namul,nonNamul,grocery:buildGroceryList([...namul,...nonNamul,main])};
    savePlan(Object.assign({},plan,{mealDays:nd}));
  },[plan,namulList,banchanList,mainList,savePlan]);

  const handleDrop=(toDay)=>{
    if(dragging==null||!plan||dragging===toDay){setDragging(null);setDragOver(null);return;}
    const d=Object.assign({},plan.mealDays);
    const tmp=d[dragging];d[dragging]=d[toDay];d[toDay]=tmp;
    savePlan(Object.assign({},plan,{mealDays:d}));
    setDragging(null);setDragOver(null);
  };

  const monthGrocery=plan?buildGroceryList(Object.values(plan.mealDays).filter(Boolean).flatMap(m=>[...m.namul,...m.nonNamul,m.main])):[];
  const copyList=list=>{navigator.clipboard.writeText(list.join("\n")).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});};

  const dim=getDaysInMonth(year,month),fd=getFirstDayOfWeek(year,month);
  const cells=[];
  for(let i=0;i<fd;i++)cells.push(null);
  for(let d=1;d<=dim;d++)cells.push(d);
  while(cells.length%7!==0)cells.push(null);
  const today=new Date();
  const isToday=d=>d&&year===today.getFullYear()&&month===today.getMonth()&&d===today.getDate();
  const prevMonth=()=>{if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1);};
  const nextMonth=()=>{if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1);};

  const expandedMeal=expanded&&plan&&plan.mealDays?plan.mealDays[expanded]:null;

  return(
    <div style={{padding:"14px 14px 0"}}>
      <style>{"@media print{button{display:none !important;}}"}</style>
      <div style={{background:"#fff",borderRadius:12,padding:"14px 16px",marginBottom:12,boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:plan?10:0}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button onClick={prevMonth} style={{background:"#f3f4f6",border:"none",borderRadius:7,padding:"5px 10px",cursor:"pointer",fontSize:14}}>{"<"}</button>
            <span style={{fontWeight:800,fontSize:16}}>{MONTH_KO[month]} {year}</span>
            <button onClick={nextMonth} style={{background:"#f3f4f6",border:"none",borderRadius:7,padding:"5px 10px",cursor:"pointer",fontSize:14}}>{">"}</button>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={generatePlan} style={{background:"#c2410c",color:"#fff",border:"none",borderRadius:9,padding:"8px 16px",fontWeight:700,fontSize:13,cursor:"pointer"}}>
              {plan?"Regenerate":"Plan This Month"}
            </button>
            {plan?<button onClick={()=>window.print()} style={{background:"#374151",color:"#fff",border:"none",borderRadius:9,padding:"8px 16px",fontWeight:700,fontSize:13,cursor:"pointer"}}>Print</button>:null}
          </div>
        </div>
        {plan?<div style={{fontSize:12,color:"#6b7280"}}>{"Cooking "+Object.values(plan.mealDays).filter(Boolean).length+" times this month - drag to swap days"}</div>:null}
      </div>

      <div style={{background:"#fff",borderRadius:12,padding:"12px 10px",marginBottom:12,boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:6}}>
          {DAY_KO.map((d,i)=><div key={i} style={{textAlign:"center",fontSize:10,fontWeight:700,color:i===0?"#dc2626":i===6?"#2563eb":"#9ca3af"}}>{d}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
          {cells.map((day,idx)=>{
            if(!day)return <div key={"e"+idx}/>;
            const meal=plan&&plan.mealDays?plan.mealDays[day]:null;
            const isDrg=dragging===day,isOvr=dragOver===day&&dragging!==day;
            return(
              <div key={day}
                style={{minHeight:68,borderRadius:10,padding:"5px 5px",background:isOvr?"#fef3c7":meal?"#fff7ed":"#fff",border:isOvr?"2px dashed #c2410c":isDrg?"2px dashed #d1d5db":meal?"1.5px solid #fed7aa":"1.5px solid #f3f4f6",cursor:meal?"grab":"default",opacity:isDrg?0.5:1,position:"relative"}}
                draggable={!!meal}
                onDragStart={()=>setDragging(day)}
                onDragOver={e=>{e.preventDefault();setDragOver(day);}}
                onDrop={()=>handleDrop(day)}
                onDragEnd={()=>{setDragging(null);setDragOver(null);}}
                onClick={()=>{if(meal)setExpanded(expanded===day?null:day);}}>
                <div style={{fontSize:10,fontWeight:isToday(day)?800:500,color:isToday(day)?"#c2410c":"#6b7280",marginBottom:2}}>{day}</div>
                {meal?(
                  <div>
                    <div style={{fontSize:10,fontWeight:700,color:"#c2410c",lineHeight:1.3,marginBottom:1}}>{meal.main.name}</div>
                    <div style={{fontSize:9,color:"#9ca3af",lineHeight:1.4}}>{[...meal.namul,...meal.nonNamul].map(b=>b.name).join(", ")}</div>
                    <button onClick={e=>{e.stopPropagation();rerollDay(day);}} style={{position:"absolute",top:3,right:3,background:"none",border:"none",cursor:"pointer",fontSize:9,color:"#d1d5db",padding:0}}>{"↻"}</button>
                  </div>
                ):null}
              </div>
            );
          })}
        </div>
      </div>

      {expandedMeal?(
        <div style={{background:"#fff",borderRadius:12,padding:16,marginBottom:12,boxShadow:"0 1px 4px rgba(0,0,0,0.07)",border:"2px solid #fed7aa"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <span style={{fontWeight:700,fontSize:14}}>{MONTH_KO[month]+" "+expanded}</span>
            <button onClick={()=>setExpanded(null)} style={{background:"#f3f4f6",border:"none",borderRadius:6,padding:"3px 8px",cursor:"pointer",fontSize:12}}>{"Close"}</button>
          </div>
          {[
            {label:"Namul",dishes:expandedMeal.namul,tag:{label:"NAMUL",color:"green"}},
            {label:"Banchan",dishes:expandedMeal.nonNamul,tag:null},
            {label:"Main/Soup",dishes:[expandedMeal.main],tag:{label:"MAIN",color:"blue"}}
          ].map(sec=>(
            <div key={sec.label} style={{marginBottom:8}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#9ca3af",marginBottom:4}}>{sec.label}</div>
              {sec.dishes.map(d=>(
                <div key={d.id} style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}>
                  <span style={{fontWeight:600,fontSize:13}}>{d.name}</span><span style={{color:"#9ca3af",fontSize:11}}>{d.romanized}</span>
                  {sec.tag?<TAG label={sec.tag.label} color={sec.tag.color}/>:null}
                  {d.maangchi?<MaangchiLink slug={d.maangchi}/>:null}
                </div>
              ))}
            </div>
          ))}
          <div style={{marginTop:10,background:"#f8f5f0",borderRadius:8,padding:10}}>
            <div style={{fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>{"Groceries"}</div>
            <GroceryChecklist items={expandedMeal.grocery}/>
          </div>
        </div>
      ):null}

      {plan?(
        <div style={{background:"#fff",borderRadius:12,padding:16,marginBottom:16,boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontWeight:700,fontSize:14}}>{"Monthly Groceries ("+monthGrocery.length+")"}</span>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setShowMG(p=>!p)} style={{background:"#15803d",color:"#fff",border:"none",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:700}}>{showMG?"Hide":"Show"}</button>
              {showMG?<button onClick={()=>copyList(monthGrocery)} style={{background:"#f3f4f6",border:"none",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600}}>{copied?"Copied":"Copy"}</button>:null}
            </div>
          </div>
          {showMG?<div style={{marginTop:10}}><GroceryChecklist items={monthGrocery} showExport={true}/></div>:null}
        </div>
      ):null}
      {!plan?<div style={{textAlign:"center",color:"#9ca3af",fontSize:13,padding:"32px 0"}}>{"Press the button above to plan this month"}</div>:null}
    </div>
  );
}

export default function KoreanMealPlanner(){
  const[loaded,setLoaded]=useState(false);
  const[namulList,setNamulList]=useState(SEED_NAMUL);
  const[banchanList,setBanchanList]=useState(SEED_BANCHAN);
  const[mainList,setMainList]=useState(SEED_MAIN);
  const[tab,setTab]=useState("generate");
  const[meal,setMeal]=useState(null);
  const[showGrocery,setShowGrocery]=useState(false);
  const[copied,setCopied]=useState(false);
  const[manualNamul,setManualNamul]=useState([]);
  const[manualNonNamul,setManualNonNamul]=useState([]);
  const[manualMain,setManualMain]=useState(null);
  const[manualMeal,setManualMeal]=useState(null);
  const[addingTo,setAddingTo]=useState(null);
  const banchanRef=useRef(null);
  const mainRef=useRef(null);
  const buildRef=useRef(null);

  useEffect(()=>{
    loadStore(STORAGE_DISHES).then(saved=>{
      if(saved){
        if(saved.namul&&saved.namul.length)setNamulList(saved.namul);
        if(saved.banchan&&saved.banchan.length)setBanchanList(saved.banchan);
        if(saved.main&&saved.main.length)setMainList(saved.main);
      }
      setLoaded(true);
    });
  },[]);

  useEffect(()=>{
    if(!loaded)return;
    saveStore(STORAGE_DISHES,{namul:namulList,banchan:banchanList,main:mainList});
  },[namulList,banchanList,mainList,loaded]);

  const addDish=useCallback((cat,dish)=>{
    if(cat==="namul")setNamulList(p=>[...p,dish]);
    else if(cat==="banchan")setBanchanList(p=>[...p,dish]);
    else setMainList(p=>[...p,dish]);
    setAddingTo(null);
  },[]);

  const deleteDish=useCallback((cat,id)=>{
    if(cat==="namul")setNamulList(p=>p.filter(d=>d.id!==id));
    else if(cat==="banchan")setBanchanList(p=>p.filter(d=>d.id!==id));
    else setMainList(p=>p.filter(d=>d.id!==id));
  },[]);

  const generateMeal=useCallback(()=>{
    const arr=generateVariedMeals(namulList,banchanList,mainList,1);
    setMeal(arr[0]);setShowGrocery(false);
  },[namulList,banchanList,mainList]);

  const toggleManualNamul=d=>{
    const has=manualNamul.find(x=>x.id===d.id);
    setManualNamul(has?manualNamul.filter(x=>x.id!==d.id):[d]);
    if(!has)setTimeout(()=>{if(banchanRef.current)banchanRef.current.scrollIntoView({behavior:"smooth",block:"start"});},150);
  };
  const toggleManualMain=d=>{
    const was=manualMain&&manualMain.id===d.id;
    setManualMain(was?null:d);
    if(!was)setTimeout(()=>{if(buildRef.current)buildRef.current.scrollIntoView({behavior:"smooth",block:"center"});},150);
  };
  const toggleManualNonNamul=d=>{
    const has=manualNonNamul.find(x=>x.id===d.id);
    const next=has?manualNonNamul.filter(x=>x.id!==d.id):manualNonNamul.length<2?[...manualNonNamul,d]:manualNonNamul;
    setManualNonNamul(next);
    if(!has&&next.length===2)setTimeout(()=>{if(mainRef.current)mainRef.current.scrollIntoView({behavior:"smooth",block:"start"});},150);
  };
  const buildManualMeal=()=>{
    if(!manualNamul.length||manualNonNamul.length<2||!manualMain)return;
    setManualMeal({namul:manualNamul,nonNamul:manualNonNamul,main:manualMain,grocery:buildGroceryList([...manualNamul,...manualNonNamul,manualMain])});
  };
  const copyList=list=>{navigator.clipboard.writeText(list.join("\n")).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});};

  const card={background:"#fff",borderRadius:12,padding:16,marginBottom:12,boxShadow:"0 1px 4px rgba(0,0,0,0.07)"};
  const chip={display:"inline-block",fontSize:11,background:"#f3f4f6",borderRadius:6,padding:"2px 8px",margin:"2px 2px 2px 0",color:"#374151"};
  const sLabel={fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#9ca3af",marginBottom:5};
  const btnPrimary={display:"inline-flex",alignItems:"center",gap:5,padding:"10px 20px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:14,background:"#c2410c",color:"#fff"};
  const btnGhost={display:"inline-flex",alignItems:"center",gap:5,padding:"7px 14px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:"#f3f4f6",color:"#374151"};
  const btnGreen={display:"inline-flex",alignItems:"center",gap:5,padding:"10px 20px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:14,background:"#15803d",color:"#fff"};
  const btnRed={display:"inline-flex",alignItems:"center",gap:5,padding:"3px 9px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,background:"#fee2e2",color:"#dc2626"};

  const DishRow=({d,category,last})=>(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"9px 0",borderBottom:last?"none":"1px solid #f3f4f6"}}>
      <div style={{flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:2}}>
          <span style={{fontWeight:600,fontSize:14}}>{d.name}</span><span style={{color:"#9ca3af",fontSize:12}}>{d.romanized}</span>
          {d.custom?<TAG label={"MINE"} color="purple"/>:null}
          {d.maangchi?<MaangchiLink slug={d.maangchi}/>:null}
        </div>
        {d.desc?<div style={{fontSize:11,color:"#6b7280",marginBottom:3}}>{d.desc}</div>:null}
        <div>{d.ingredients.map((ing,j)=><span key={j} style={chip}>{ing}</span>)}</div>
      </div>
      {d.custom?<button onClick={()=>deleteDish(category,d.id)} style={Object.assign({},btnRed,{marginLeft:8,marginTop:2})}>{"Delete"}</button>:null}
    </div>
  );

  const MealResult=({mealData})=>(
    <div style={card}>
      <div style={{marginBottom:12}}>
        <span style={{fontWeight:700,fontSize:15}}>{"Today's Table"}</span>
      </div>
      {[
        {label:"Namul",desc:"Korean Plant-Based Side",dishes:mealData.namul,color:"#15803d",tag:{label:"Namul",color:"green"}},
        {label:"Banchan",desc:"Side Dishes",dishes:mealData.nonNamul,color:"#1d4ed8",tag:null},
        {label:"Main / Soup",desc:"Main Course",dishes:[mealData.main],color:"#c2410c",tag:{label:"MAIN",color:"blue"}}
      ].map((sec,si)=>(
        <div key={sec.label}>
          <div style={{marginTop:si>0?16:0,marginBottom:8,paddingBottom:5,borderBottom:"2px solid "+sec.color,display:"flex",alignItems:"baseline",gap:8}}>
            <span style={{fontSize:14,fontWeight:800,color:sec.color}}>{sec.label}</span>
            <span style={{fontSize:11,color:"#9ca3af"}}>{sec.desc}</span>
          </div>
          {sec.dishes.map(d=>(
            <div key={d.id} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"9px 0",borderBottom:"1px solid #f3f4f6"}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                  <span style={{fontWeight:600}}>{d.name}</span><span style={{color:"#9ca3af",fontSize:12}}>{d.romanized}</span>
                  {sec.tag?<TAG label={sec.tag.label} color={sec.tag.color}/>:null}
                  {d.maangchi?<MaangchiLink slug={d.maangchi}/>:null}
                </div>
                {d.desc?<div style={{fontSize:11,color:"#6b7280"}}>{d.desc}</div>:null}
              </div>
            </div>
          ))}
        </div>
      ))}
      <MealVisual mealData={mealData}/>
    </div>
  );

  if(!loaded)return <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#9ca3af",fontFamily:"sans-serif"}}>{"Loading..."}</div>;

  const tabs=[["generate","Auto Generate"],["manual","Pick Dishes"],["monthly","Monthly Plan"],["browse","Recipe List"]];

  return(
    <div style={{fontFamily:"'Noto Sans KR','Apple SD Gothic Neo',sans-serif",minHeight:"100vh",background:"#f8f5f0",paddingBottom:48}}>
      <div style={{background:"#1a1a1a",padding:"18px 20px 14px",color:"#fff"}}>
        <div style={{fontSize:20,fontWeight:800,letterSpacing:"-0.02em"}}>{"Korean Meal Planner"}</div>
        <div style={{fontSize:12,color:"#a3a3a3",marginTop:3}}>{"Namul "+namulList.length+" - Banchan "+banchanList.length+" - Mains/Soups "+mainList.length}</div>
      </div>
      <div style={{display:"flex",background:"#fff",borderBottom:"2px solid #e5e7eb",padding:"0 14px",overflowX:"auto"}}>
        {tabs.map(t=>(
          <button key={t[0]} onClick={()=>setTab(t[0])}
            style={{padding:"11px 12px",fontSize:12,fontWeight:tab===t[0]?700:400,color:tab===t[0]?"#c2410c":"#6b7280",border:"none",background:"none",borderBottom:tab===t[0]?"2px solid #c2410c":"2px solid transparent",cursor:"pointer",marginBottom:-2,whiteSpace:"nowrap"}}>
            {t[1]}
          </button>
        ))}
      </div>

      {tab==="generate"?(
        <div style={{padding:"14px 14px 0"}}>
          <div style={Object.assign({},card,{background:"#fff7ed",border:"1px solid #fed7aa"})}>
            <div style={{fontSize:13,color:"#92400e",lineHeight:1.6,marginBottom:12}}>
              {"Every meal includes one V — namul, a Korean seasoned vegetable side. Click the video icons for Maangchi recipes."}
            </div>
            <button style={btnPrimary} onClick={generateMeal}>{"Generate Today's Meal"}</button>
          </div>
          {meal?<MealResult mealData={meal}/>:null}
          {meal?(
            <div style={Object.assign({},card,{textAlign:"center"})}>
              <button style={Object.assign({},btnGreen,{justifyContent:"center",width:"100%",marginBottom:showGrocery?12:0})} onClick={()=>setShowGrocery(p=>!p)}>
                {showGrocery?"Hide Grocery List":"Show Grocery List"}
              </button>
              {showGrocery?(
                <div style={{textAlign:"left"}}>
                  <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}>
                    <button style={btnGhost} onClick={()=>copyList(meal.grocery)}>{copied?"Copied":"Copy"}</button>
                  </div>
                  <GroceryChecklist items={meal.grocery} showExport={true}/>
                </div>
              ):null}
            </div>
          ):null}
        </div>
      ):null}

      {tab==="manual"?(
        <div style={{padding:"14px 14px 0"}}>
          <button onClick={()=>{if(buildRef.current)buildRef.current.scrollIntoView({behavior:"smooth",block:"center"});}}
            style={{width:"100%",justifyContent:"center",display:"inline-flex",alignItems:"center",gap:5,padding:"10px 20px",borderRadius:8,border:"2px dashed #15803d",cursor:"pointer",fontWeight:700,fontSize:13,background:"#f0fdf4",color:"#15803d",marginBottom:12}}>
            {"↓ Jump to Grocery Builder"}
          </button>
          {[
            {list:namulList,type:"namul",label:"Namul 나물",req:"(seasoned vegetable - pick 1)",ok:!!manualNamul.length,color:"#15803d",toggle:toggleManualNamul,sel:d=>!!manualNamul.find(x=>x.id===d.id),count:manualNamul.length+"/1"},
            {list:banchanList,type:"nonnamul",label:"Banchan",req:"(pick 2)",ok:manualNonNamul.length===2,color:"#1d4ed8",toggle:toggleManualNonNamul,sel:d=>!!manualNonNamul.find(x=>x.id===d.id),count:manualNonNamul.length+"/2"},
            {list:mainList,type:"main",label:"Main/Soup",req:"(pick 1)",ok:!!manualMain,color:"#c2410c",toggle:toggleManualMain,sel:d=>!!(manualMain&&manualMain.id===d.id),count:manualMain?"1/1":"0/1"}
          ].map(sec=>(
            <div key={sec.type} ref={sec.type==="nonnamul"?banchanRef:sec.type==="main"?mainRef:null} style={card}>
              <div style={{fontWeight:800,fontSize:17,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                <span style={{color:sec.color}}>{sec.label} <span style={{color:"#9ca3af",fontWeight:400,fontSize:13}}>{sec.req}</span></span>
                <span style={{color:sec.ok?sec.color:"#9ca3af",fontSize:15}}>{sec.count}</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                {sec.list.map(d=><DishCard key={d.id} dish={d} type={sec.type} selected={sec.sel(d)} onToggle={sec.toggle}/>)}
              </div>
            </div>
          ))}
          <button ref={buildRef} style={Object.assign({},btnGreen,{width:"100%",justifyContent:"center",marginBottom:12,opacity:(manualNamul.length&&manualNonNamul.length===2&&manualMain)?1:0.35})}
            disabled={!manualNamul.length||manualNonNamul.length<2||!manualMain} onClick={buildManualMeal}>
            {"Build Grocery List from This Meal"}
          </button>
          {manualMeal?(
            <div style={card}>
              <div style={{fontWeight:700,marginBottom:8}}>{"Grocery List ("+manualMeal.grocery.length+")"}</div>
              <GroceryChecklist items={manualMeal.grocery}/>
              <button style={Object.assign({},btnGhost,{marginTop:10})} onClick={()=>copyList(manualMeal.grocery)}>{copied?"Copied":"Copy"}</button>
            </div>
          ):null}
        </div>
      ):null}

      {tab==="monthly"?<MonthlyPlanner namulList={namulList} banchanList={banchanList} mainList={mainList}/>:null}

      {tab==="browse"?(
        <div style={{padding:"14px 14px 0"}}>
          {[
            {key:"namul",label:"Namul",list:namulList},
            {key:"banchan",label:"Banchan",list:banchanList},
            {key:"main",label:"Main/Soup",list:mainList}
          ].map(sec=>(
            <div key={sec.key} style={card}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <span style={{fontWeight:700,fontSize:14}}>{sec.label+" ("+sec.list.length+")"}</span>
                <button style={btnPrimary} onClick={()=>setAddingTo(addingTo===sec.key?null:sec.key)}>{addingTo===sec.key?"Close":"+ Add"}</button>
              </div>
              {addingTo===sec.key?<AddDishForm category={sec.key} onAdd={d=>addDish(sec.key,d)} onClose={()=>setAddingTo(null)}/>:null}
              {sec.list.map((d,i)=><DishRow key={d.id} d={d} category={sec.key} last={i===sec.list.length-1}/>)}
            </div>
          ))}
        </div>
      ):null}
      <div style={{textAlign:"center",marginTop:24}}>
        <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{fontSize:15,fontWeight:800,padding:"12px 26px",background:"#1a1a1a",color:"#fff",border:"none",borderRadius:10,cursor:"pointer"}}>{"↑ Back to Top"}</button>
      </div>
    </div>
  );
}
