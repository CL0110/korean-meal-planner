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

const SEED_INGREDIENTS = [
  {id:"ig1",name:"Spinach",korean:"시금치",emoji:"🥬",category:"vegetable",keyNutrient:"Iron & Folate",benefits:["Strengthens bones","Boosts brain function","Fights anemia","Rich in antioxidants"],color:"#3a7a3a"},
  {id:"ig2",name:"Soybean Sprouts",korean:"콩나물",emoji:"🌱",category:"vegetable",keyNutrient:"Vitamin C & Folate",benefits:["Boosts immunity","Aids digestion","Reduces inflammation","Hangover remedy"],color:"#a8b84a"},
  {id:"ig3",name:"Mung Bean Sprouts",korean:"숙주",emoji:"🌱",category:"vegetable",keyNutrient:"Vitamin K & C",benefits:["Supports bone health","Low calorie nutrition","Aids detoxification","Heart protective"],color:"#b8c86a"},
  {id:"ig4",name:"Perilla Leaves",korean:"깻잎",emoji:"🌿",category:"vegetable",keyNutrient:"Omega-3 & Vitamin A",benefits:["Anti-allergenic","Rich in omega-3 fats","Antimicrobial","Supports skin health"],color:"#2d5a2d"},
  {id:"ig5",name:"Water Parsley",korean:"미나리",emoji:"🌿",category:"vegetable",keyNutrient:"Vitamin A & Iron",benefits:["Natural detoxifier","Purifies blood","Liver protection","Reduces heavy metals"],color:"#3a8a3a"},
  {id:"ig6",name:"Asian Chives",korean:"부추",emoji:"🌿",category:"vegetable",keyNutrient:"Allicin & Vitamin K",benefits:["Boosts circulation","Antibacterial","Warms the body","Aids digestion"],color:"#2d7a3d"},
  {id:"ig7",name:"Bok Choy",korean:"청경채",emoji:"🥬",category:"vegetable",keyNutrient:"Calcium & Vitamin C",benefits:["Strengthens bones","Cancer-fighting compounds","Heart health","Low calorie superfood"],color:"#4a8a4a"},
  {id:"ig8",name:"Lettuce",korean:"상추",emoji:"🥬",category:"vegetable",keyNutrient:"Vitamin A & Lactucarium",benefits:["Natural sleep aid","Calms nerves","Hydrating","Aids digestion"],color:"#5a9a4a"},
  {id:"ig9",name:"Green Onion",korean:"파",emoji:"🧅",category:"vegetable",keyNutrient:"Vitamin K & Allicin",benefits:["Antibacterial","Boosts immunity","Aids digestion","Reduces cold symptoms"],color:"#4a8a4a"},
  {id:"ig10",name:"Broccoli",korean:"브로콜리",emoji:"🥦",category:"vegetable",keyNutrient:"Sulforaphane",benefits:["Cancer prevention","Liver detox","Anti-aging","Bone strength"],color:"#2d7a3d"},
  {id:"ig11",name:"Carrot",korean:"당근",emoji:"🥕",category:"vegetable",keyNutrient:"Beta-carotene",benefits:["Fights skin aging","Improves vision","Boosts immunity","Heart health"],color:"#d47a1a"},
  {id:"ig12",name:"Radish",korean:"무",emoji:"🥔",category:"vegetable",keyNutrient:"Vitamin C & Enzymes",benefits:["Aids digestion","Natural decongestant","Detoxifying","Anti-inflammatory"],color:"#c8b8a8"},
  {id:"ig13",name:"Zucchini",korean:"애호박",emoji:"🥒",category:"vegetable",keyNutrient:"Vitamin A & Potassium",benefits:["Supports eye health","Heart health","Low calorie","Aids weight management"],color:"#5a8a3a"},
  {id:"ig14",name:"Cucumber",korean:"오이",emoji:"🥒",category:"vegetable",keyNutrient:"Hydration & Silica",benefits:["Hydrating for skin","Reduces puffiness","Cooling effect","Anti-inflammatory"],color:"#3a7a4a"},
  {id:"ig15",name:"Eggplant",korean:"가지",emoji:"🍆",category:"vegetable",keyNutrient:"Anthocyanins",benefits:["Brain protection","Heart health","Cancer prevention","Rich in fiber"],color:"#5a2d6a"},
  {id:"ig16",name:"Napa Cabbage",korean:"배추",emoji:"🥬",category:"vegetable",keyNutrient:"Vitamin C & Fiber",benefits:["Gut health","Immune support","Weight management","Anti-inflammatory"],color:"#8aaa5a"},
  {id:"ig17",name:"Cabbage",korean:"양배추",emoji:"🥬",category:"vegetable",keyNutrient:"Vitamin K & Glutamine",benefits:["Heals stomach lining","Anti-inflammatory","Detoxification","Digestive health"],color:"#7a9a5a"},
  {id:"ig18",name:"Potato",korean:"감자",emoji:"🥔",category:"vegetable",keyNutrient:"Potassium & Vitamin C",benefits:["Heart health","Sustained energy","Resistant starch for gut","Blood pressure control"],color:"#b89a6a"},
  {id:"ig19",name:"Lotus Root",korean:"연근",emoji:"🪷",category:"vegetable",keyNutrient:"Fiber & Vitamin C",benefits:["Aids digestion","Boosts energy","Supports immunity","Blood health"],color:"#c4a882"},
  {id:"ig20",name:"Onion",korean:"양파",emoji:"🧅",category:"vegetable",keyNutrient:"Quercetin",benefits:["Anti-allergenic","Heart protection","Blood sugar regulation","Antibacterial"],color:"#c4954a"},
  {id:"ig21",name:"Bellflower Root",korean:"도라지",emoji:"🌿",category:"vegetable",keyNutrient:"Saponins",benefits:["Respiratory health","Sore throat relief","Expectorant","Anti-inflammatory"],color:"#c4b494"},
  {id:"ig22",name:"Fernbrake",korean:"고사리",emoji:"🌿",category:"vegetable",keyNutrient:"Beta-carotene & Fiber",benefits:["Bone health","Rich in minerals","Aids digestion","Antioxidant"],color:"#6a5a3a"},
  {id:"ig23",name:"Green Chili",korean:"고추",emoji:"🌶️",category:"vegetable",keyNutrient:"Capsaicin & Vitamin C",benefits:["Metabolism booster","Pain relief","Heart health","Fat burning"],color:"#2d8a2d"},
  {id:"ig24",name:"Asparagus",korean:"아스파라거스",emoji:"🌿",category:"vegetable",keyNutrient:"Folate & Vitamin K",benefits:["Anti-aging","Natural diuretic","Supports fertility","Brain health"],color:"#5a8a3a"},
  {id:"ig25",name:"Mushroom",korean:"버섯",emoji:"🍄",category:"vegetable",keyNutrient:"Selenium & Vitamin D",benefits:["Immune support","Brain health","Anti-cancer","Rich in antioxidants"],color:"#8a7a60"},
  {id:"ig26",name:"Garlic Scapes",korean:"마늘쫑",emoji:"🌿",category:"vegetable",keyNutrient:"Allicin & Manganese",benefits:["Immune booster","Heart protective","Antibacterial","Antioxidant"],color:"#5a9a4a"},
  {id:"ig27",name:"Seaweed",korean:"미역/김",emoji:"🌊",category:"sea-vegetable",keyNutrient:"Iodine & Calcium",benefits:["Thyroid health","Postpartum recovery","Bone strength","Detoxification"],color:"#2d5a4a"},
  {id:"ig28",name:"Tofu",korean:"두부",emoji:"🧈",category:"protein",keyNutrient:"Plant Protein & Calcium",benefits:["Heart health","Bone strength","Menopausal relief","Low calorie protein"],color:"#e8dcc4"},
  {id:"ig29",name:"Egg",korean:"계란",emoji:"🥚",category:"protein",keyNutrient:"Choline & Protein",benefits:["Brain health","Eye protection","Muscle building","Complete nutrition"],color:"#e8d4b0"},
  {id:"ig30",name:"Beef",korean:"소고기",emoji:"🥩",category:"protein",keyNutrient:"Iron & B12",benefits:["Prevents anemia","Muscle growth","Brain function","Energy production"],color:"#8a3a2a"},
  {id:"ig31",name:"Pork",korean:"돼지고기",emoji:"🥩",category:"protein",keyNutrient:"Thiamine (B1)",benefits:["Energy metabolism","Muscle recovery","Nervous system support","Rich in selenium"],color:"#c47a6a"},
  {id:"ig32",name:"Chicken",korean:"닭고기",emoji:"🍗",category:"protein",keyNutrient:"Lean Protein & Niacin",benefits:["Muscle building","Heart health","Mood regulation","Immune support"],color:"#d4a46a"},
  {id:"ig33",name:"Mackerel",korean:"고등어",emoji:"🐟",category:"seafood",keyNutrient:"Omega-3 & DHA",benefits:["Brain health","Heart protection","Anti-inflammatory","Vision support"],color:"#4a6a8a"},
  {id:"ig34",name:"Shrimp",korean:"새우",emoji:"🦐",category:"seafood",keyNutrient:"Selenium & B12",benefits:["Thyroid health","Anti-aging","Brain function","Bone strength"],color:"#e08a6a"},
  {id:"ig35",name:"Squid",korean:"오징어",emoji:"🦑",category:"seafood",keyNutrient:"Protein & Copper",benefits:["Blood health","Immune support","Low fat protein","Rich in minerals"],color:"#8a6a7a"},
  {id:"ig36",name:"Clam",korean:"조개",emoji:"🦪",category:"seafood",keyNutrient:"Iron & B12",benefits:["Fights anemia","Nervous system health","Energy boost","Heart health"],color:"#9a8878"},
  {id:"ig37",name:"Oyster",korean:"굴",emoji:"🦪",category:"seafood",keyNutrient:"Zinc & B12",benefits:["Immune powerhouse","Skin health","Hormone balance","Brain function"],color:"#7a8878"},
  {id:"ig38",name:"Octopus",korean:"문어",emoji:"🐙",category:"seafood",keyNutrient:"B12 & Iron",benefits:["Brain health","Fights fatigue","Heart protection","Rich in taurine"],color:"#8a4a5a"},
  {id:"ig39",name:"Anchovy",korean:"멸치",emoji:"🐟",category:"seafood",keyNutrient:"Calcium & Omega-3",benefits:["Bone strength","Heart health","Brain development","Rich in protein"],color:"#6a7a8a"},
  {id:"ig40",name:"Kimchi",korean:"김치",emoji:"🥬",category:"fermented",keyNutrient:"Probiotics & Vitamin C",benefits:["Gut microbiome health","Immune boost","Anti-aging","Weight management"],color:"#c44a2a"},
  {id:"ig41",name:"Doenjang",korean:"된장",emoji:"🫘",category:"fermented",keyNutrient:"Probiotics & Isoflavones",benefits:["Cancer prevention","Gut health","Protein source","Antioxidant"],color:"#8a6a3a"},
  {id:"ig42",name:"Gochujang",korean:"고추장",emoji:"🌶️",category:"fermented",keyNutrient:"Capsaicin & Probiotics",benefits:["Metabolism boost","Gut health","Anti-inflammatory","Fat burning"],color:"#a42a1a"},
  {id:"ig43",name:"Garlic",korean:"마늘",emoji:"🧄",category:"spice",keyNutrient:"Allicin",benefits:["Natural antibiotic","Heart protection","Immune booster","Cancer prevention"],color:"#d8c8a8"},
  {id:"ig44",name:"Ginger",korean:"생강",emoji:"🫚",category:"spice",keyNutrient:"Gingerol",benefits:["Anti-nausea","Reduces muscle pain","Anti-inflammatory","Aids digestion"],color:"#c4a44a"},
  {id:"ig45",name:"Sesame Seeds",korean:"참깨",emoji:"🌰",category:"spice",keyNutrient:"Calcium & Lignans",benefits:["Bone health","Hormone balance","Heart protection","Anti-aging"],color:"#c4a868"},
  {id:"ig46",name:"Red Pepper Flakes",korean:"고춧가루",emoji:"🌶️",category:"spice",keyNutrient:"Capsaicin & Vitamin A",benefits:["Pain relief","Metabolism boost","Rich in vitamin C","Antibacterial"],color:"#b42a1a"},
  {id:"ig47",name:"Sesame Oil",korean:"참기름",emoji:"🫒",category:"spice",keyNutrient:"Vitamin E & Sesamol",benefits:["Anti-aging skin care","Heart protection","Anti-inflammatory","Rich in antioxidants"],color:"#9a8a3a"},
  {id:"ig48",name:"Ginseng",korean:"인삼",emoji:"🌿",category:"special",keyNutrient:"Ginsenosides",benefits:["Energy & stamina","Stress reduction","Immune boost","Cognitive function"],color:"#8a7a4a"},
  {id:"ig49",name:"Rice",korean:"쌀",emoji:"🍚",category:"grain",keyNutrient:"B Vitamins & Energy",benefits:["Sustained energy","Gluten-free","Easy digestion","Brain fuel"],color:"#e8dcc0"},
  {id:"ig50",name:"Glass Noodles",korean:"당면",emoji:"🍜",category:"grain",keyNutrient:"Iron & Complex Carbs",benefits:["Sustained energy","Gluten-free","Low fat","Mineral source"],color:"#c8b898"},
  {id:"ig51",name:"Pear",korean:"배",emoji:"🍐",category:"fruit",keyNutrient:"Fiber & Vitamin C",benefits:["Digestive health","Natural meat tenderizer","Hangover remedy","Cooling effect"],color:"#b8a84a"},
  {id:"ig52",name:"Jujube",korean:"대추",emoji:"🫐",category:"special",keyNutrient:"Vitamin C & Antioxidants",benefits:["Sleep quality","Stress relief","Digestive health","Immune support"],color:"#8a3a2a"},
  {id:"ig53",name:"Acorn Jelly",korean:"도토리묵",emoji:"🟤",category:"special",keyNutrient:"Tannins & Fiber",benefits:["Detoxification","Weight management","Blood sugar control","Anti-fatigue"],color:"#7a6a5a"},
  {id:"ig54",name:"Perilla Oil",korean:"들기름",emoji:"🫒",category:"spice",keyNutrient:"Alpha-linolenic (ALA)",benefits:["Brain health","Omega-3 source","Heart protection","Anti-inflammatory"],color:"#6a7a3a"},
  {id:"ig55",name:"Mustard Greens",korean:"갓",emoji:"🥬",category:"vegetable",keyNutrient:"Glucosinolates",benefits:["Cancer prevention","Detoxification","Anti-inflammatory","Rich in vitamin K"],color:"#3a6a2d"},
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
function buildGroceryList(dishes){const map=new Map();dishes.forEach(d=>d.ingredients.forEach(ing=>{const k=ing.toLowerCase();if(!map.has(k))map.set(k,{ing,dishNames:new Set()});map.get(k).dishNames.add(d.name);}));return Array.from(map.values()).map(({ing,dishNames})=>({ing,dishes:Array.from(dishNames)})).sort((a,b)=>a.ing.localeCompare(b.ing,"en"));}
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
const STORAGE_INGREDIENTS="kmp-ingredients-en-v1";

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

  const listText=items.map(x=>typeof x==="string"?x:x.ing).join("\n");
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
      {items.map((item,i)=>{
        const ingText=typeof item==="string"?item:item.ing;
        const dishTags=typeof item==="string"?[]:(item.dishes||[]);
        return(
          <div key={i} style={{display:"flex",alignItems:"flex-start",gap:6,padding:"6px 2px",borderBottom:"1px solid #f9f9f9"}}>
            <div style={{flex:1,minWidth:0}}>
              <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:checked[ingText]?"#9ca3af":"#374151",textDecoration:checked[ingText]?"line-through":"none"}}>
                <input type="checkbox" checked={!!checked[ingText]} onChange={()=>toggle(ingText)} style={{accentColor:"#c2410c",width:15,height:15,flexShrink:0}}/>
                {ingText}
              </label>
              {dishTags.length>0?(
                <div style={{display:"flex",flexWrap:"wrap",gap:3,marginTop:3,marginLeft:23}}>
                  {dishTags.slice(0,4).map(d=>(
                    <span key={d} style={{fontSize:10,background:"#f0f4ff",color:"#3b5bdb",borderRadius:4,padding:"1px 6px",fontWeight:600}}>{d}</span>
                  ))}
                  {dishTags.length>4?<span style={{fontSize:10,color:"#9ca3af",padding:"1px 4px"}}>+{dishTags.length-4}</span>:null}
                </div>
              ):null}
            </div>
            <a href={hmartUrl(ingText)} target="_blank" rel="noopener noreferrer"
              style={Object.assign({},iconBtn,{background:"#e8f4e8",color:"#1a6e1a",textDecoration:"none",display:"inline-block",marginTop:1})}>
              {"H Mart"}
            </a>
            <a href={instacartUrl(ingText)} target="_blank" rel="noopener noreferrer"
              style={Object.assign({},iconBtn,{background:"#fff0e6",color:"#cc4e00",textDecoration:"none",display:"inline-block",marginTop:1})}>
              {"Instacart"}
            </a>
          </div>
        );
      })}
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

function dishCardGradient(d){
  const s=(d.name+" "+(d.romanized||"")+" "+(d.desc||"")).toLowerCase();
  const has=function(){for(let i=0;i<arguments.length;i++){if(s.indexOf(arguments[i])>=0)return true;}return false;};
  if(has("찌개","jjigae","stew"))return["#b45309","#78350f"];
  if((has("국","탕","guk","tang","soup"))&&!has("탕수","tangsu"))return["#d97706","#92400e"];
  if(has("전","jeon","pancake"))return["#ca8a04","#854d0e"];
  if(has("새우","오징어","문어","낙지","꽃게","굴","조개","홍합","생선","고등어","갈치","꽁치","대구","코다리","북어","삼치","fish","shrimp","squid","octopus","crab","oyster","clam","mackerel"))return["#0e7490","#1e3a5f"];
  if(has("닭","chicken","dak"))return["#ea580c","#9a3412"];
  if(has("김치","kimchi"))return["#dc2626","#7f1d1d"];
  if(has("돼지","불고기","갈비","pork","beef","bulgogi","meat","spam","ham","sausage","jokbal","bossam"))return["#b91c1c","#7c2d12"];
  if(has("계란","egg","gyeran"))return["#d97706","#b45309"];
  if(has("당면","noodle","japchae","myeon"))return["#92400e","#78350f"];
  if(has("밥","bap","rice"))return["#78716c","#44403c"];
  if(has("버섯","mushroom"))return["#6d28d9","#4c1d95"];
  if(has("감자","potato"))return["#a16207","#78350f"];
  if(d.category==="namul")return["#15803d","#064e3b"];
  if(d.category==="banchan")return["#4338ca","#312e81"];
  return["#6d28d9","#4c1d95"];
}

function dishSvg(d){
  const s=(d.name+" "+(d.romanized||"")+" "+(d.desc||"")).toLowerCase();
  const has=function(){for(let i=0;i<arguments.length;i++){if(s.indexOf(arguments[i])>=0)return true;}return false;};
  const st={width:"100%",height:"100%",position:"absolute",top:0,left:0};
  if(has("찌개","jjigae","stew","국","탕","guk","tang","soup")&&!has("탕수","tangsu"))
    return(<svg viewBox="0 0 100 70" style={st}><ellipse cx="50" cy="50" rx="34" ry="13" fill="currentColor"/><path d="M16 50Q16 32 50 32Q84 32 84 50" fill="currentColor"/><path d="M30 26Q33 18 30 10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M50 23Q53 15 50 7" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M70 26Q73 18 70 10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><ellipse cx="50" cy="32" rx="28" ry="5" fill="currentColor" opacity="0.3"/></svg>);
  if(has("전","jeon","pancake"))
    return(<svg viewBox="0 0 100 70" style={st}><ellipse cx="42" cy="40" rx="28" ry="20" fill="currentColor"/><rect x="68" y="37" width="22" height="6" rx="3" fill="currentColor"/><ellipse cx="42" cy="38" rx="20" ry="13" fill="currentColor" opacity="0.35"/><circle cx="34" cy="35" r="3" fill="currentColor" opacity="0.25"/><circle cx="48" cy="40" r="2.5" fill="currentColor" opacity="0.25"/><circle cx="38" cy="44" r="2" fill="currentColor" opacity="0.25"/></svg>);
  if(has("새우","오징어","문어","낙지","꽃게","굴","조개","홍합","생선","고등어","갈치","꽁치","대구","코다리","북어","삼치","fish","shrimp","squid","octopus","crab","clam","mackerel"))
    return(<svg viewBox="0 0 100 70" style={st}><path d="M18 35Q35 18 62 28Q75 32 75 35Q75 38 62 42Q35 52 18 35Z" fill="currentColor"/><path d="M75 35L88 25L88 45Z" fill="currentColor"/><circle cx="30" cy="32" r="2.5" fill="currentColor" opacity="0.3"/><path d="M22 48Q28 58 40 56" stroke="currentColor" strokeWidth="1.8" fill="none" opacity="0.25" strokeLinecap="round"/><path d="M42 50Q48 60 60 58" stroke="currentColor" strokeWidth="1.8" fill="none" opacity="0.25" strokeLinecap="round"/><path d="M62 46Q68 54 76 50" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" strokeLinecap="round"/></svg>);
  if(has("닭","chicken","dak"))
    return(<svg viewBox="0 0 100 70" style={st}><ellipse cx="40" cy="32" rx="22" ry="17" fill="currentColor"/><path d="M58 38Q68 44 78 50" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/><circle cx="58" cy="50" r="4" fill="currentColor" opacity="0.3"/><path d="M30 22Q35 12 28 8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round"/><path d="M45 20Q50 10 43 6" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round"/></svg>);
  if(has("김치","kimchi"))
    return(<svg viewBox="0 0 100 70" style={st}><path d="M32 14Q28 14 27 18Q24 28 24 40Q24 55 34 58Q40 59 50 59Q60 59 66 58Q76 55 76 40Q76 28 73 18Q72 14 68 14Z" fill="currentColor"/><rect x="35" y="10" width="30" height="6" rx="3" fill="currentColor"/><ellipse cx="50" cy="10" rx="16" ry="4" fill="currentColor" opacity="0.4"/><path d="M38 30Q50 38 62 30" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/><path d="M36 40Q50 48 64 40" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/></svg>);
  if(has("돼지","불고기","갈비","pork","beef","bulgogi","meat","spam","ham","sausage","jokbal","bossam"))
    return(<svg viewBox="0 0 100 70" style={st}><rect x="14" y="28" width="72" height="22" rx="4" fill="currentColor"/><line x1="26" y1="28" x2="26" y2="50" stroke="currentColor" strokeWidth="2.5" opacity="0.3"/><line x1="40" y1="28" x2="40" y2="50" stroke="currentColor" strokeWidth="2.5" opacity="0.3"/><line x1="54" y1="28" x2="54" y2="50" stroke="currentColor" strokeWidth="2.5" opacity="0.3"/><line x1="68" y1="28" x2="68" y2="50" stroke="currentColor" strokeWidth="2.5" opacity="0.3"/><path d="M30 22Q33 14 30 6" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round"/><path d="M55 20Q58 12 55 4" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round"/></svg>);
  if(has("계란","egg","gyeran"))
    return(<svg viewBox="0 0 100 70" style={st}><ellipse cx="50" cy="38" rx="28" ry="22" fill="currentColor"/><ellipse cx="50" cy="36" rx="14" ry="11" fill="currentColor" opacity="0.35"/></svg>);
  if(has("당면","noodle","japchae","myeon"))
    return(<svg viewBox="0 0 100 70" style={st}><ellipse cx="45" cy="48" rx="32" ry="12" fill="currentColor"/><path d="M13 48Q13 30 45 30Q77 30 77 48" fill="currentColor"/><path d="M28 30Q34 18 30 8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round"/><path d="M45 30Q42 20 46 10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round"/><path d="M62 30Q56 18 60 8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round"/><line x1="78" y1="10" x2="74" y2="42" stroke="currentColor" strokeWidth="2" opacity="0.4" strokeLinecap="round"/><line x1="83" y1="12" x2="79" y2="44" stroke="currentColor" strokeWidth="2" opacity="0.4" strokeLinecap="round"/></svg>);
  if(has("밥","bap","rice"))
    return(<svg viewBox="0 0 100 70" style={st}><ellipse cx="50" cy="46" rx="32" ry="12" fill="currentColor"/><path d="M18 46Q18 32 50 32Q82 32 82 46" fill="currentColor"/><ellipse cx="50" cy="32" rx="24" ry="7" fill="currentColor" opacity="0.35"/><circle cx="40" cy="30" r="3" fill="currentColor" opacity="0.2"/><circle cx="54" cy="28" r="2.5" fill="currentColor" opacity="0.2"/><circle cx="48" cy="34" r="2" fill="currentColor" opacity="0.2"/></svg>);
  if(has("버섯","mushroom"))
    return(<svg viewBox="0 0 100 70" style={st}><path d="M22 38Q22 16 50 12Q78 16 78 38Z" fill="currentColor"/><rect x="42" y="38" width="16" height="22" rx="4" fill="currentColor" opacity="0.6"/><circle cx="35" cy="26" r="3" fill="currentColor" opacity="0.2"/><circle cx="55" cy="22" r="2.5" fill="currentColor" opacity="0.2"/><circle cx="62" cy="32" r="2" fill="currentColor" opacity="0.2"/></svg>);
  if(has("감자","potato"))
    return(<svg viewBox="0 0 100 70" style={st}><ellipse cx="50" cy="38" rx="30" ry="20" fill="currentColor"/><circle cx="38" cy="30" r="2" fill="currentColor" opacity="0.3"/><circle cx="55" cy="28" r="1.5" fill="currentColor" opacity="0.3"/><circle cx="60" cy="40" r="2" fill="currentColor" opacity="0.3"/><circle cx="42" cy="44" r="1.5" fill="currentColor" opacity="0.3"/></svg>);
  if(d.category==="namul")
    return(<svg viewBox="0 0 100 70" style={st}><ellipse cx="50" cy="44" rx="32" ry="16" fill="currentColor"/><path d="M35 36Q30 20 38 8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round"/><path d="M50 34Q48 18 55 6" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round"/><path d="M65 36Q68 20 62 8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round"/><path d="M35 36Q32 28 38 20" fill="currentColor" opacity="0.2"/><path d="M65 36Q68 28 62 20" fill="currentColor" opacity="0.2"/></svg>);
  return(<svg viewBox="0 0 100 70" style={st}><ellipse cx="34" cy="36" rx="22" ry="12" fill="currentColor"/><ellipse cx="68" cy="28" rx="18" ry="10" fill="currentColor" opacity="0.7"/><ellipse cx="65" cy="50" rx="16" ry="9" fill="currentColor" opacity="0.5"/></svg>);
}

const MealVisual=({mealData})=>{
  const sides=[...mealData.namul,...mealData.nonNamul];
  const pos=[[80,48],[200,40],[320,48]];
  const trunc=s=>s.length>17?s.slice(0,16)+"…":s;
  return(
    <svg viewBox="0 0 400 190" style={{width:"100%",borderRadius:12,display:"block"}}>
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
  const[selected,setSelected]=useState(null);
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

  const swapDays=useCallback((a,b)=>{
    if(!plan||a===b)return;
    const d=Object.assign({},plan.mealDays);
    const tmp=d[a];d[a]=d[b];d[b]=tmp;
    savePlan(Object.assign({},plan,{mealDays:d}));
  },[plan,savePlan]);

  const handleDrop=(toDay)=>{
    if(dragging==null||!plan||dragging===toDay){setDragging(null);setDragOver(null);return;}
    swapDays(dragging,toDay);
    setDragging(null);setDragOver(null);
  };

  const monthGrocery=plan?buildGroceryList(Object.values(plan.mealDays).filter(Boolean).flatMap(m=>[...m.namul,...m.nonNamul,m.main])):[];
  const copyList=list=>{navigator.clipboard.writeText(list.map(x=>typeof x==="string"?x:x.ing).join("\n")).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});};

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
            <button key={plan?plan.year+"-"+plan.month+"-"+(Object.keys(plan.mealDays).length):"init"} onClick={generatePlan} className={plan?"btn-nudge":""} style={{background:"#c2410c",color:"#fff",border:"none",borderRadius:9,padding:"8px 16px",fontWeight:700,fontSize:13,cursor:"pointer"}}>
              {plan?"↻ Regenerate":"Plan This Month"}
            </button>
            {plan?<button onClick={()=>window.print()} style={{background:"#374151",color:"#fff",border:"none",borderRadius:9,padding:"8px 16px",fontWeight:700,fontSize:13,cursor:"pointer"}}>Print</button>:null}
          </div>
        </div>
        {plan?<div style={{fontSize:12,color:"#6b7280"}}>{"Cooking "+Object.values(plan.mealDays).filter(Boolean).length+" times this month · tap ⇄ to swap days"}</div>:null}
        {selected!==null?<div style={{background:"#fef9c3",border:"1px solid #f59e0b",borderRadius:8,padding:"7px 12px",marginTop:8,fontSize:12,color:"#78350f",textAlign:"center"}}>{"Day "+selected+" selected — tap another day to swap, or tap it again to cancel"}</div>:null}
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
            const isSel=selected===day;
            return(
              <div key={day}
                data-day={day}
                style={{minHeight:68,borderRadius:10,padding:"5px 4px",background:isSel?"#fef9c3":isOvr?"#fef3c7":meal?"#fff7ed":"#fff",border:isSel?"2px solid #f59e0b":isOvr?"2px dashed #c2410c":isDrg?"2px dashed #d1d5db":meal?"1.5px solid #fed7aa":"1.5px solid #f3f4f6",cursor:meal?"pointer":"default",opacity:isDrg?0.5:1,position:"relative",overflow:"hidden"}}
                draggable={!!meal}
                onDragStart={()=>setDragging(day)}
                onDragOver={e=>{e.preventDefault();setDragOver(day);}}
                onDrop={()=>handleDrop(day)}
                onDragEnd={()=>{setDragging(null);setDragOver(null);}}
                onClick={()=>{
                  if(!meal)return;
                  if(selected!==null){
                    if(selected===day)setSelected(null);
                    else{swapDays(selected,day);setSelected(null);}
                  }else{
                    setExpanded(expanded===day?null:day);
                  }
                }}>
                <div style={{fontSize:10,fontWeight:isToday(day)?800:500,color:isToday(day)?"#c2410c":"#6b7280",marginBottom:1}}>{day}</div>
                {meal?(
                  <div>
                    <div style={{fontSize:10,fontWeight:700,color:"#c2410c",lineHeight:1.2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:1}}>{meal.main.name}</div>
                    <div style={{fontSize:8,color:"#9ca3af",lineHeight:1.3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{[...meal.namul,...meal.nonNamul].map(b=>b.name).join(", ")}</div>
                    <button onClick={e=>{e.stopPropagation();setSelected(isSel?null:day);}} style={{position:"absolute",top:2,right:14,background:"none",border:"none",cursor:"pointer",fontSize:10,color:isSel?"#f59e0b":"#d1d5db",padding:0,lineHeight:1}}>{"⇄"}</button>
                    <button onClick={e=>{e.stopPropagation();rerollDay(day);}} style={{position:"absolute",top:2,right:2,background:"none",border:"none",cursor:"pointer",fontSize:9,color:"#d1d5db",padding:0,lineHeight:1}}>{"↻"}</button>
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
          <button onClick={()=>setShowMG(p=>!p)} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"100%",padding:"10px 20px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:14,background:"#15803d",color:"#fff",marginBottom:showMG?12:0}}>
            {showMG?"Hide Grocery List":"Build Grocery List ("+monthGrocery.length+" items)"}
          </button>
          {showMG?(
            <div>
              <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}>
                <button onClick={()=>copyList(monthGrocery)} style={{background:"#f3f4f6",border:"none",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600}}>{copied?"Copied":"Copy"}</button>
              </div>
              <GroceryChecklist items={monthGrocery} showExport={true}/>
            </div>
          ):null}
        </div>
      ):null}
      {!plan?<div style={{textAlign:"center",color:"#9ca3af",fontSize:13,padding:"32px 0"}}>{"Press the button above to plan this month"}</div>:null}
    </div>
  );
}

function findDishesForIngredient(ing,namulList,banchanList,mainList){
  const terms=[ing.name.toLowerCase()];
  const n=ing.name.toLowerCase();
  if(n.endsWith("s")&&!n.endsWith("ss"))terms.push(n.slice(0,-1));
  const matches=d=>d.ingredients.some(i=>{const lo=i.toLowerCase();return terms.some(t=>lo.includes(t));});
  return{namul:namulList.filter(matches),banchan:banchanList.filter(matches),main:mainList.filter(matches)};
}

function AddIngredientForm({onAdd,onClose}){
  const[form,setForm]=useState({name:"",korean:"",emoji:"🌿",keyNutrient:"",benefitsRaw:"",color:"#3a7a3a"});
  const[error,setError]=useState("");
  const handleSubmit=()=>{
    if(!form.name.trim()){setError("Please enter a name.");return;}
    if(!form.benefitsRaw.trim()){setError("Please enter at least one benefit.");return;}
    const benefits=form.benefitsRaw.split("\n").map(s=>s.trim()).filter(Boolean);
    onAdd({id:genId("ig"),name:form.name.trim(),korean:form.korean.trim(),emoji:form.emoji||"🌿",category:"custom",keyNutrient:form.keyNutrient.trim(),benefits,color:form.color,custom:true});
    onClose();
  };
  const inp={width:"100%",boxSizing:"border-box",border:"1.5px solid #e5e7eb",borderRadius:8,padding:"9px 11px",fontSize:14,fontFamily:"inherit",outline:"none",marginTop:4};
  return(
    <div style={{background:"#fff",border:"2px solid #15803d",borderRadius:12,padding:16,marginBottom:14}}>
      <div style={{fontWeight:700,fontSize:14,marginBottom:12,color:"#15803d"}}>+ Add Ingredient</div>
      {[["Name *","name"],["Korean","korean"],["Emoji","emoji"],["Key Nutrient","keyNutrient"]].map(p=>(
        <div key={p[1]} style={{marginBottom:9}}>
          <label style={{fontSize:11,fontWeight:700,color:"#374151"}}>{p[0]}</label>
          <input style={inp} value={form[p[1]]} onChange={e=>{const v=e.target.value;setForm(pr=>({...pr,[p[1]]:v}));}}/>
        </div>
      ))}
      <div style={{marginBottom:9}}>
        <label style={{fontSize:11,fontWeight:700,color:"#374151"}}>Card Color</label>
        <input type="color" value={form.color} onChange={e=>setForm(p=>({...p,color:e.target.value}))} style={{width:48,height:32,border:"none",borderRadius:6,cursor:"pointer",marginTop:4,display:"block"}}/>
      </div>
      <div style={{marginBottom:12}}>
        <label style={{fontSize:11,fontWeight:700,color:"#374151"}}>Health Benefits * (one per line)</label>
        <textarea style={{...inp,minHeight:70,resize:"vertical"}} value={form.benefitsRaw} onChange={e=>setForm(p=>({...p,benefitsRaw:e.target.value}))}/>
      </div>
      {error?<div style={{fontSize:12,color:"#dc2626",marginBottom:8}}>{error}</div>:null}
      <div style={{display:"flex",gap:8}}>
        <button onClick={handleSubmit} style={{background:"#15803d",color:"#fff",border:"none",borderRadius:8,padding:"9px 18px",fontWeight:700,fontSize:13,cursor:"pointer"}}>Save</button>
        <button onClick={onClose} style={{background:"#f3f4f6",color:"#374151",border:"none",borderRadius:8,padding:"9px 14px",fontWeight:600,fontSize:13,cursor:"pointer"}}>Cancel</button>
      </div>
    </div>
  );
}

function FoodMedicineTab({ingredientList,namulList,banchanList,mainList,onAdd,onDelete}){
  const[flippedId,setFlippedId]=useState(null);
  const[selectedIng,setSelectedIng]=useState(null);
  const[showAdd,setShowAdd]=useState(false);
  const[cols,setCols]=useState(8);
  const gridRef=useRef(null);
  const detailRef=useRef(null);

  useEffect(()=>{
    const update=()=>{const w=window.innerWidth;setCols(w<420?4:w<600?5:w<800?6:w<1024?7:8);};
    update();window.addEventListener("resize",update);return()=>window.removeEventListener("resize",update);
  },[]);

  const handleMouseMove=useCallback((e)=>{
    const grid=gridRef.current;if(!grid)return;
    const rect=grid.getBoundingClientRect();
    const mx=e.clientX-rect.left,my=e.clientY-rect.top;
    const cards=grid.querySelectorAll("[data-ing]");
    cards.forEach(card=>{
      const cr=card.getBoundingClientRect();
      const cx=cr.left-rect.left+cr.width/2,cy=cr.top-rect.top+cr.height/2;
      const dist=Math.hypot(mx-cx,my-cy);
      const radius=150,t=Math.max(0,1-dist/radius);
      const scale=0.82+0.58*t;
      card.style.transform="scale("+scale.toFixed(3)+")";
      card.style.zIndex=String(Math.round(t*10));
    });
  },[]);

  const handleMouseLeave=useCallback(()=>{
    const cards=gridRef.current&&gridRef.current.querySelectorAll("[data-ing]");
    if(cards)cards.forEach(card=>{card.style.transform="scale(1)";card.style.zIndex="0";});
  },[]);

  const handleCardClick=useCallback((ing)=>{
    if(selectedIng&&selectedIng.id===ing.id){setSelectedIng(null);setFlippedId(null);}
    else{setSelectedIng(ing);setFlippedId(ing.id);setTimeout(()=>{if(detailRef.current)detailRef.current.scrollIntoView({behavior:"smooth",block:"start"});},350);}
  },[selectedIng]);

  const matched=selectedIng?findDishesForIngredient(selectedIng,namulList,banchanList,mainList):null;
  const totalMatched=matched?matched.namul.length+matched.banchan.length+matched.main.length:0;

  const rows=[];
  for(let i=0;i<ingredientList.length;i+=cols)rows.push(ingredientList.slice(i,Math.min(i+cols,ingredientList.length)));
  const CARD=cols<=4?66:cols<=5?72:80;
  const GAP=cols<=4?6:10;

  return(
    <div style={{padding:"14px 14px 0"}}>
      <style>{[
        ".ing-flip-inner{transition:transform 0.6s cubic-bezier(0.4,0,0.2,1);transform-style:preserve-3d;width:100%;height:100%;position:relative;}",
        ".ing-flip-inner.flipped{transform:rotateY(180deg);}",
        ".ing-flip-face{position:absolute;width:100%;height:100%;backface-visibility:hidden;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;}",
        ".ing-flip-back{transform:rotateY(180deg);}",
      ].join("\n")}</style>

      <div style={{background:"linear-gradient(135deg,#f0fdf4,#fff7ed)",borderRadius:16,padding:"20px 16px",marginBottom:18,boxShadow:"0 2px 12px rgba(0,0,0,0.06)",textAlign:"center"}}>
        <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:"#15803d",marginBottom:4}}>Discover</div>
        <div style={{fontSize:26,fontWeight:900,color:"#1a1a1a",marginBottom:6,lineHeight:1.2}}>Food is Medicine</div>
        <div style={{fontSize:13,color:"#6b7280",lineHeight:1.5,maxWidth:420,margin:"0 auto 12px"}}>Every ingredient heals. Hover to explore, tap to discover nutrients, and find Korean dishes that nourish your body.</div>
        <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
          {[{l:"Anti-aging",c:"#c2410c"},{l:"Immunity",c:"#15803d"},{l:"Gut Health",c:"#7c3aed"},{l:"Brain Health",c:"#1d4ed8"},{l:"Anti-inflammatory",c:"#b45309"}].map(cat=>(
            <span key={cat.l} style={{fontSize:9,fontWeight:700,padding:"3px 10px",borderRadius:99,background:cat.c+"18",color:cat.c,letterSpacing:"0.04em"}}>{cat.l}</span>
          ))}
        </div>
      </div>

      <div ref={gridRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0,padding:"10px 0 20px",position:"relative",cursor:"default"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"100%",height:"100%",borderRadius:"50%",background:"radial-gradient(circle,rgba(21,128,61,0.04) 0%,rgba(21,128,61,0.02) 40%,transparent 70%)",pointerEvents:"none"}}/>
        {rows.map((row,ri)=>(
          <div key={ri} style={{display:"flex",justifyContent:"center",gap:GAP,marginLeft:ri%2===1?(CARD+GAP)/2:0,marginTop:ri>0?-4:0,position:"relative"}}>
            {row.map(ing=>{
              const isFlipped=flippedId===ing.id;
              const isSel=selectedIng&&selectedIng.id===ing.id;
              return(
                <div key={ing.id} data-ing onClick={()=>handleCardClick(ing)}
                  style={{width:CARD,height:CARD,perspective:800,cursor:"pointer",transition:"transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",flexShrink:0}}>
                  <div className={"ing-flip-inner"+(isFlipped?" flipped":"")}>
                    <div className="ing-flip-face" style={{
                      background:"radial-gradient(circle at 30% 25%,"+ing.color+"66,"+ing.color+"dd)",
                      boxShadow:isSel?"0 0 0 3px #15803d,0 4px 16px "+ing.color+"88":"0 2px 10px "+ing.color+"55,inset 0 1px 2px rgba(255,255,255,0.25)",
                      border:"2px solid "+(isSel?"#15803d":ing.color+"aa"),
                    }}>
                      <span style={{fontSize:CARD*0.38,filter:"drop-shadow(0 2px 3px rgba(0,0,0,0.25))"}}>{ing.emoji}</span>
                      <span style={{fontSize:CARD<=66?7:8,fontWeight:700,color:"#fff",textShadow:"0 1px 3px rgba(0,0,0,0.6)",marginTop:2,lineHeight:1,textAlign:"center",padding:"0 4px",maxWidth:"92%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ing.name}</span>
                      <span style={{fontSize:CARD<=66?5:6,color:"rgba(255,255,255,0.85)",textShadow:"0 1px 2px rgba(0,0,0,0.5)",marginTop:1,textAlign:"center",padding:"0 3px",lineHeight:1}}>{ing.keyNutrient}</span>
                    </div>
                    <div className="ing-flip-face ing-flip-back" style={{
                      background:"radial-gradient(circle at 70% 75%,"+ing.color+"cc,"+ing.color+"ee)",
                      boxShadow:"0 0 0 3px #15803d,0 4px 16px "+ing.color+"88",
                      border:"2px solid #15803d",padding:6,
                    }}>
                      <span style={{fontSize:CARD<=66?6.5:7.5,fontWeight:700,color:"#fff",textShadow:"0 1px 2px rgba(0,0,0,0.5)",textAlign:"center",lineHeight:1.4}}>
                        {ing.benefits.slice(0,3).map((b,i)=><span key={i}>{(i>0?" · ":"")}{b}</span>)}
                      </span>
                      <span style={{fontSize:CARD<=66?6:7,color:"rgba(255,255,255,0.8)",marginTop:3}}>{"tap for dishes"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {selectedIng&&matched?(
        <div ref={detailRef} style={{background:"#fff",borderRadius:16,padding:20,marginBottom:16,boxShadow:"0 2px 16px rgba(0,0,0,0.08)",border:"2px solid #15803d22",animation:"slideUp 0.3s ease-out"}}>
          <style>{"@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}"}</style>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
            <div style={{width:56,height:56,borderRadius:"50%",background:"radial-gradient(circle at 30% 30%,"+selectedIng.color+"55,"+selectedIng.color+"cc)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,flexShrink:0,boxShadow:"0 2px 10px "+selectedIng.color+"44"}}>{selectedIng.emoji}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:20,fontWeight:800,color:"#111"}}>{selectedIng.name} <span style={{fontSize:14,fontWeight:400,color:"#9ca3af"}}>{selectedIng.korean}</span></div>
              <div style={{fontSize:13,fontWeight:700,color:"#15803d"}}>{selectedIng.keyNutrient}</div>
            </div>
            <div style={{display:"flex",gap:6,flexShrink:0}}>
              {selectedIng.custom?<button onClick={(e)=>{e.stopPropagation();onDelete(selectedIng.id);setSelectedIng(null);setFlippedId(null);}} style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:8,padding:"6px 12px",fontWeight:700,fontSize:11,cursor:"pointer"}}>Delete</button>:null}
              <button onClick={()=>{setSelectedIng(null);setFlippedId(null);}} style={{background:"#f3f4f6",border:"none",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:600}}>Close</button>
            </div>
          </div>

          <div style={{marginBottom:18}}>
            <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",color:"#9ca3af",letterSpacing:"0.08em",marginBottom:8}}>Health Benefits</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {selectedIng.benefits.map((b,i)=>(
                <span key={i} style={{fontSize:12,padding:"5px 12px",borderRadius:99,background:"#f0fdf4",color:"#15803d",fontWeight:600,border:"1px solid #15803d22"}}>{"✦ "+b}</span>
              ))}
            </div>
          </div>

          <div>
            <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",color:"#9ca3af",letterSpacing:"0.08em",marginBottom:8}}>
              {"Korean Dishes with "+selectedIng.name+" ("+totalMatched+")"}
            </div>
            {[{label:"Namul",dishes:matched.namul,color:"#15803d"},{label:"Banchan",dishes:matched.banchan,color:"#1d4ed8"},{label:"Main / Soup",dishes:matched.main,color:"#c2410c"}].map(sec=>sec.dishes.length>0?(
              <div key={sec.label} style={{marginBottom:10}}>
                <div style={{fontSize:11,fontWeight:700,color:sec.color,marginBottom:5}}>{sec.label+" ("+sec.dishes.length+")"}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                  {sec.dishes.map(d=>(
                    <div key={d.id} style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:12,background:"#f8f5f0",borderRadius:8,padding:"6px 11px",border:"1px solid #e8e0d4"}}>
                      <span style={{fontWeight:600}}>{d.name}</span>
                      <span style={{fontSize:10,color:"#9ca3af"}}>{d.romanized}</span>
                      {d.maangchi?<MaangchiLink slug={d.maangchi}/>:null}
                    </div>
                  ))}
                </div>
              </div>
            ):null)}
            {totalMatched===0?<div style={{fontSize:13,color:"#9ca3af",padding:"12px 0",textAlign:"center"}}>No dishes found with this ingredient yet. Add one in the Recipe List tab.</div>:null}
          </div>
        </div>
      ):null}

      <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
        <button onClick={()=>setShowAdd(!showAdd)} style={{background:"#15803d",color:"#fff",border:"none",borderRadius:10,padding:"10px 22px",fontWeight:700,fontSize:13,cursor:"pointer"}}>
          {showAdd?"Cancel":"+ Add Ingredient"}
        </button>
      </div>
      {showAdd?<AddIngredientForm onAdd={onAdd} onClose={()=>setShowAdd(false)}/>:null}
    </div>
  );
}

function RecipeListTab({namulList,banchanList,mainList,addDish,deleteDish}){
  const[search,setSearch]=useState("");
  const[activeCategory,setActiveCategory]=useState("all");
  const[expandedDish,setExpandedDish]=useState(null);
  const[addingTo,setAddingTo]=useState(null);

  const allDishes=[
    ...namulList.map(d=>({...d,category:"namul"})),
    ...banchanList.map(d=>({...d,category:"banchan"})),
    ...mainList.map(d=>({...d,category:"main"})),
  ];

  const filtered=allDishes.filter(d=>{
    if(activeCategory!=="all"&&d.category!==activeCategory)return false;
    if(!search.trim())return true;
    const q=search.toLowerCase();
    const haystack=(d.name+" "+d.romanized+" "+(d.desc||"")+" "+d.ingredients.join(" ")).toLowerCase();
    return q.split(/\s+/).every(w=>haystack.includes(w));
  });

  const catLabel=c=>c==="namul"?"Namul":c==="banchan"?"Banchan":"Main/Soup";
  const catColor=c=>c==="namul"?"#15803d":c==="banchan"?"#1d4ed8":"#c2410c";

  return(
    <div style={{padding:"14px 14px 0"}}>
      <div style={{background:"#fff",borderRadius:14,padding:"16px 16px 14px",marginBottom:14,boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
        <div style={{position:"relative",marginBottom:12}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:16,color:"#9ca3af",pointerEvents:"none"}}>{"🔍"}</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={"Search by dish, ingredient, or keyword..."}
            style={{width:"100%",boxSizing:"border-box",border:"2px solid #e5e7eb",borderRadius:12,padding:"12px 14px 12px 40px",fontSize:15,fontFamily:"inherit",outline:"none",background:"#fafaf8",transition:"border-color 0.2s"}}
            onFocus={e=>{e.target.style.borderColor="#c2410c";}}
            onBlur={e=>{e.target.style.borderColor="#e5e7eb";}}/>
          {search?<button onClick={()=>setSearch("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"#e5e7eb",border:"none",borderRadius:"50%",width:22,height:22,cursor:"pointer",fontSize:12,color:"#6b7280",display:"flex",alignItems:"center",justifyContent:"center"}}>{"✕"}</button>:null}
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {[["all","All Dishes"],["namul","Namul"],["banchan","Banchan"],["main","Main/Soup"]].map(([k,l])=>(
            <button key={k} onClick={()=>setActiveCategory(k)}
              style={{padding:"7px 16px",borderRadius:99,border:activeCategory===k?"2px solid "+(k==="all"?"#374151":catColor(k)):"2px solid #e5e7eb",background:activeCategory===k?(k==="all"?"#374151":catColor(k)):"#fff",color:activeCategory===k?"#fff":(k==="all"?"#374151":catColor(k)),fontWeight:700,fontSize:12,cursor:"pointer",transition:"all 0.2s"}}>
              {l}{k!=="all"?" ("+(k==="namul"?namulList:k==="banchan"?banchanList:mainList).length+")":""}
            </button>
          ))}
        </div>
        <div style={{fontSize:12,color:"#9ca3af",marginTop:8}}>{filtered.length+" dish"+(filtered.length!==1?"es":"")+" found"}{search?" for \""+search+"\"":""}</div>
      </div>

      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
        {["namul","banchan","main"].map(k=>(
          <button key={k} onClick={()=>setAddingTo(addingTo===k?null:k)}
            style={{padding:"7px 14px",borderRadius:8,border:"none",background:addingTo===k?"#fee2e2":"#fff",color:addingTo===k?"#dc2626":catColor(k),fontWeight:700,fontSize:12,cursor:"pointer",boxShadow:"0 1px 3px rgba(0,0,0,0.06)"}}>
            {addingTo===k?"Cancel":"+ Add "+catLabel(k)}
          </button>
        ))}
      </div>
      {addingTo?<AddDishForm category={addingTo} onAdd={d=>addDish(addingTo,d)} onClose={()=>setAddingTo(null)}/>:null}

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))",gap:12}}>
        {filtered.map(d=>{
          const isExpanded=expandedDish&&expandedDish.id===d.id;
          const g=dishCardGradient(d);
          return(
            <div key={d.id+d.category} onClick={()=>setExpandedDish(isExpanded?null:d)}
              style={{borderRadius:14,overflow:"hidden",cursor:"pointer",background:"#fff",boxShadow:isExpanded?"0 0 0 3px "+catColor(d.category)+",0 8px 24px rgba(0,0,0,0.16)":"0 2px 12px rgba(0,0,0,0.08)",transition:"box-shadow 0.25s, transform 0.25s",position:"relative"}}>
              <div style={{width:"100%",aspectRatio:"16/11",background:"linear-gradient(145deg,"+g[0]+","+g[1]+")",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",inset:0,color:"rgba(255,255,255,0.15)"}}>
                  {dishSvg(d)}
                </div>
                <div style={{position:"absolute",top:"42%",left:"50%",transform:"translate(-50%,-50%)",width:72,height:72,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,0.18) 0%,transparent 70%)"}}/>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",paddingBottom:20}}>
                  <span style={{fontSize:52,filter:"drop-shadow(0 3px 10px rgba(0,0,0,0.3))"}}>{dishEmoji(d)}</span>
                </div>
                <div style={{position:"absolute",top:6,left:6}}>
                  <span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:99,background:"rgba(0,0,0,0.3)",backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)",color:"#fff",textTransform:"uppercase",letterSpacing:"0.05em"}}>{catLabel(d.category)}</span>
                </div>
                {d.maangchi?(
                  <a href={"https://www.maangchi.com/recipe/"+d.maangchi} target="_blank" rel="noopener noreferrer"
                    onClick={e=>e.stopPropagation()}
                    style={{position:"absolute",top:6,right:6,width:26,height:20,background:"rgba(255,0,0,0.85)",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none"}}>
                    <span style={{display:"inline-block",width:0,height:0,borderTop:"4px solid transparent",borderBottom:"4px solid transparent",borderLeft:"7px solid #fff",marginLeft:1}}/>
                  </a>
                ):null}
                <div style={{position:"absolute",bottom:0,left:0,right:0,height:"55%",background:"linear-gradient(transparent,rgba(0,0,0,0.6))"}}/>
                <div style={{position:"absolute",bottom:7,left:8,right:8}}>
                  <div style={{fontSize:13,fontWeight:800,color:"#fff",textShadow:"0 1px 4px rgba(0,0,0,0.5)",lineHeight:1.15,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.name}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.88)",fontWeight:500,textShadow:"0 1px 3px rgba(0,0,0,0.4)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.romanized}</div>
                </div>
              </div>
              {isExpanded?(
                <div style={{padding:"10px 10px 12px",borderTop:"2px solid "+catColor(d.category)+"22",animation:"slideUp 0.2s ease-out"}}>
                  {d.desc?<div style={{fontSize:12,color:"#6b7280",marginBottom:8,lineHeight:1.4}}>{d.desc}</div>:null}
                  <div style={{fontSize:10,fontWeight:700,color:catColor(d.category),textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:5,opacity:0.7}}>Ingredients</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                    {d.ingredients.map((ing,j)=>(
                      <span key={j} style={{fontSize:11,background:catColor(d.category)+"10",border:"1px solid "+catColor(d.category)+"20",borderRadius:5,padding:"2px 7px",color:"#374151"}}>{ing}</span>
                    ))}
                  </div>
                  {d.custom?(
                    <button onClick={e=>{e.stopPropagation();deleteDish(d.category,d.id);setExpandedDish(null);}}
                      style={{marginTop:8,background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:8,padding:"5px 12px",fontWeight:700,fontSize:11,cursor:"pointer"}}>Delete</button>
                  ):null}
                </div>
              ):null}
            </div>
          );
        })}
      </div>
      {filtered.length===0?(
        <div style={{textAlign:"center",padding:"40px 20px",color:"#9ca3af"}}>
          <div style={{fontSize:36,marginBottom:8}}>{"🔍"}</div>
          <div style={{fontSize:14,fontWeight:600}}>No dishes match your search</div>
          <div style={{fontSize:12,marginTop:4}}>Try a different keyword like "tofu", "seafood", or "kimchi"</div>
        </div>
      ):null}
    </div>
  );
}

export default function KoreanMealPlanner(){
  const[loaded,setLoaded]=useState(false);
  const[namulList,setNamulList]=useState(SEED_NAMUL);
  const[banchanList,setBanchanList]=useState(SEED_BANCHAN);
  const[mainList,setMainList]=useState(SEED_MAIN);
  const[ingredientList,setIngredientList]=useState(SEED_INGREDIENTS);
  const[tab,setTab]=useState("medicine");
  const[meal,setMeal]=useState(null);
  const[showGrocery,setShowGrocery]=useState(false);
  const[copied,setCopied]=useState(false);
  const[manualNamul,setManualNamul]=useState([]);
  const[manualNonNamul,setManualNonNamul]=useState([]);
  const[manualMain,setManualMain]=useState(null);
  const[manualMeal,setManualMeal]=useState(null);
  const banchanRef=useRef(null);
  const mainRef=useRef(null);
  const buildRef=useRef(null);

  useEffect(()=>{
    Promise.all([loadStore(STORAGE_DISHES),loadStore(STORAGE_INGREDIENTS)]).then(([saved,savedIng])=>{
      if(saved){
        if(saved.namul&&saved.namul.length)setNamulList(saved.namul);
        if(saved.banchan&&saved.banchan.length)setBanchanList(saved.banchan);
        if(saved.main&&saved.main.length)setMainList(saved.main);
      }
      if(savedIng&&savedIng.length)setIngredientList(savedIng);
      setLoaded(true);
    });
  },[]);

  useEffect(()=>{
    if(!loaded)return;
    saveStore(STORAGE_DISHES,{namul:namulList,banchan:banchanList,main:mainList});
  },[namulList,banchanList,mainList,loaded]);

  useEffect(()=>{
    if(!loaded)return;
    saveStore(STORAGE_INGREDIENTS,ingredientList);
  },[ingredientList,loaded]);

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
  const copyList=list=>{navigator.clipboard.writeText(list.map(x=>typeof x==="string"?x:x.ing).join("\n")).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});};

  const card={background:"#fff",borderRadius:12,padding:16,marginBottom:12,boxShadow:"0 1px 4px rgba(0,0,0,0.07)"};
  const btnPrimary={display:"inline-flex",alignItems:"center",gap:5,padding:"10px 20px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:14,background:"#c2410c",color:"#fff"};
  const btnGhost={display:"inline-flex",alignItems:"center",gap:5,padding:"7px 14px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:"#f3f4f6",color:"#374151"};
  const btnGreen={display:"inline-flex",alignItems:"center",gap:5,padding:"10px 20px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:14,background:"#15803d",color:"#fff"};


  const MealResult=({mealData})=>(
    <div style={card}>
      <div style={{marginBottom:12}}>
        <span style={{fontWeight:700,fontSize:15}}>{"Today's Table"}</span>
      </div>
      <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
        <div style={{flexShrink:0,width:"42%"}}>
          <MealVisual mealData={mealData}/>
        </div>
        <div style={{flex:1,minWidth:0}}>
          {[
            {label:"Namul",desc:"Korean Plant-Based Side",dishes:mealData.namul,color:"#15803d",tag:{label:"Namul",color:"green"}},
            {label:"Banchan",desc:"Side Dishes",dishes:mealData.nonNamul,color:"#1d4ed8",tag:null},
            {label:"Main / Soup",desc:"Main Course",dishes:[mealData.main],color:"#c2410c",tag:{label:"MAIN",color:"blue"}}
          ].map((sec,si)=>(
            <div key={sec.label}>
              <div style={{marginTop:si>0?12:0,marginBottom:6,paddingBottom:4,borderBottom:"2px solid "+sec.color,display:"flex",alignItems:"baseline",gap:6}}>
                <span style={{fontSize:13,fontWeight:800,color:sec.color}}>{sec.label}</span>
                <span style={{fontSize:10,color:"#9ca3af"}}>{sec.desc}</span>
              </div>
              {sec.dishes.map(d=>(
                <div key={d.id} style={{padding:"6px 0",borderBottom:"1px solid #f3f4f6"}}>
                  <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
                    <span style={{fontWeight:600,fontSize:13}}>{d.name}</span>
                    {d.maangchi?<MaangchiLink slug={d.maangchi}/>:null}
                  </div>
                  {d.desc?<div style={{fontSize:11,color:"#6b7280"}}>{d.desc}</div>:null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if(!loaded)return <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#9ca3af",fontFamily:"sans-serif"}}>{"Loading..."}</div>;

  const tabs=[["medicine","Food is Medicine"],["generate","Auto Generate"],["manual","Pick Dishes"],["monthly","Monthly Plan"],["browse","Recipe List"]];

  return(
    <div style={{fontFamily:"'Noto Sans KR','Apple SD Gothic Neo',sans-serif",minHeight:"100vh",background:"#f8f5f0",paddingBottom:48}}>
      <div style={{background:"#1a1a1a",padding:"18px 20px 14px",color:"#fff"}}>
        <div style={{fontSize:20,fontWeight:800,letterSpacing:"-0.02em"}}>{"Korean Meal Planner"}</div>
        <div style={{fontSize:12,color:"#a3a3a3",marginTop:3}}>{"Namul "+namulList.length+" - Banchan "+banchanList.length+" - Mains/Soups "+mainList.length}</div>
      </div>
      <div style={{display:"flex",background:"#fff",borderBottom:"2px solid #e5e7eb",padding:"0 14px",overflowX:"auto"}}>
        {tabs.map(t=>(
          <button key={t[0]} onClick={()=>setTab(t[0])}
            style={{padding:"13px 10px",fontSize:14,fontWeight:tab===t[0]?700:500,color:tab===t[0]?"#c2410c":"#6b7280",border:"none",background:"none",borderBottom:tab===t[0]?"3px solid #c2410c":"3px solid transparent",cursor:"pointer",marginBottom:-2,whiteSpace:"nowrap"}}>
            {t[1]}
          </button>
        ))}
      </div>

      {tab==="medicine"?<FoodMedicineTab ingredientList={ingredientList} namulList={namulList} banchanList={banchanList} mainList={mainList} onAdd={ing=>setIngredientList(p=>[...p,ing])} onDelete={id=>setIngredientList(p=>p.filter(i=>i.id!==id))}/>:null}

      {tab==="generate"?(
        <div style={{padding:"14px 14px 0"}}>
          <div style={Object.assign({},card,{background:"#fff7ed",border:"1px solid #fed7aa"})}>
            <div style={{fontSize:13,color:"#92400e",lineHeight:1.6,marginBottom:12}}>
              {"Every meal includes one V — namul, a Korean seasoned vegetable side. Click the video icons for Maangchi recipes."}
            </div>
            <button key={meal?meal.id:"init"} className={meal?"btn-nudge":""} style={btnPrimary} onClick={generateMeal}>
              {meal?"↻ Try a Different Meal":"Generate Today's Meal"}
            </button>
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
            <div key={sec.type} ref={sec.type==="nonnamul"?banchanRef:sec.type==="main"?mainRef:null} style={Object.assign({},card,{marginBottom:20})}>
              <div style={{fontWeight:800,fontSize:20,marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
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
              <GroceryChecklist items={manualMeal.grocery} showExport={true}/>
            </div>
          ):null}
        </div>
      ):null}

      {tab==="monthly"?<MonthlyPlanner namulList={namulList} banchanList={banchanList} mainList={mainList}/>:null}

      {tab==="browse"?<RecipeListTab namulList={namulList} banchanList={banchanList} mainList={mainList} addDish={addDish} deleteDish={deleteDish}/>:null}
      <div style={{textAlign:"center",marginTop:24}}>
        <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{fontSize:15,fontWeight:800,padding:"12px 26px",background:"#1a1a1a",color:"#fff",border:"none",borderRadius:10,cursor:"pointer"}}>{"↑ Back to Top"}</button>
      </div>
    </div>
  );
}
