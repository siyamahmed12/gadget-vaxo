GADGET VAXO — FREE STARTER E-COMMERCE WEBSITE
================================================

ফাইলগুলো:
- index.html : ওয়েবসাইটের পেজ
- style.css  : ডিজাইন
- app.js     : ১০টি নমুনা পণ্য, কার্ট, COD অর্ডার ও ডেমো অ্যাডমিন
- README-BN.txt : এই নির্দেশনা

মোবাইলে পরীক্ষা:
1. ZIP ফাইলটি Extract/Unzip করুন।
2. index.html ফাইলটি ব্রাউজারে খুলুন। কিছু ফোনে file:// থেকে JavaScript/স্টোরেজ সীমাবদ্ধ হতে পারে; অনলাইনে হোস্ট করলে ভালো কাজ করবে।
3. Admin চাপুন। ডেমো পাসওয়ার্ড: vaxo123
4. একটি পণ্য কার্টে যোগ করে COD দিয়ে অর্ডার পরীক্ষা করুন।
5. Admin → Open dashboard থেকে অর্ডার দেখুন, স্ট্যাটাস বদলান এবং CSV export করুন।

পণ্য ও দাম বদলানো:
app.js খুলে PRODUCTS তালিকার name, category, price, emoji, tag, desc পরিবর্তন করুন।
প্রকাশের আগে নমুনা পণ্যের নাম/দাম/বিবরণ আপনার আসল তথ্য দিয়ে বদলাবেন।

ফ্রিতে প্রকাশ (মোবাইল দিয়ে):
A) GitHub Pages:
1. github.com-এ অ্যাকাউন্ট তৈরি/লগইন করুন।
2. নতুন public repository তৈরি করুন, যেমন gadget-vaxo-store।
3. Add file → Upload files দিয়ে index.html, style.css, app.js আপলোড করুন (ZIP নয়; ZIP আগে Extract করুন)।
4. Commit changes চাপুন।
5. Repository Settings → Pages → Deploy from a branch → main → /(root) → Save।
6. Pages-এ দেখানো URL দিয়ে ওয়েবসাইট খুলুন। প্রকাশ হতে কয়েক মিনিট লাগতে পারে।

গুরুত্বপূর্ণ সীমাবদ্ধতা — আগে পড়ুন:
- এই সংস্করণে cart ও order localStorage-এ থাকে; একই ব্রাউজার/ডিভাইসে দেখা যায়। অন্য ফোন/কম্পিউটার থেকে Admin-এ অর্ডার দেখা যাবে না।
- Admin password শুধু demo gate; নিরাপদ authentication নয়। আসল কাস্টমার তথ্য নিয়ে লাইভ ব্যবসায় ব্যবহার করবেন না।
- Online payment gateway যুক্ত নয়; Online payment নির্বাচন করলে অর্ডার জমা হবে না। আপাতত COD demo পরীক্ষা করুন।
- প্রকৃত অর্ডার সংরক্ষণ, একাধিক ডিভাইস থেকে Admin access, নিরাপদ লগইন ও payment gateway-এর জন্য backend/database/authentication এবং gateway setup দরকার।
- Free hosting বিনামূল্যে হলেও provider-এর নিয়ম/সীমা বদলাতে পারে। নিজের domain সাধারণত আলাদা খরচের।
- Google Fonts না লোড হলে সাইট সিস্টেম ফন্টে চলবে।

ডেমো Admin password বদলানো:
app.js-এর শুরুতে ADMIN_PASSWORD = "vaxo123" পরিবর্তন করুন। মনে রাখবেন, front-end-এ রাখা পাসওয়ার্ড নিরাপদ নয়।
