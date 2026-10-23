
AI Rashed Music
================

এই ওয়েবসাইটটি নিজের তৈরি বাংলা অডিও ও ভিডিও গান প্রকাশের জন্য।

ফাইলসমূহ:
- index.html: ওয়েবসাইটের মূল পৃষ্ঠা
- style.css: ওয়েবসাইটের ডিজাইন
- config.js: Supabase সংযোগের সেটিংস
- app.js: ওয়েবসাইটের JavaScript
- schema.sql: ডেটাবেস তৈরির SQL

গুরুত্বপূর্ণ:
বর্তমান HTML ও JavaScript কোড একটি প্রাথমিক নমুনা।
এখনো Supabase-এর সঙ্গে প্রকৃত অনলাইন গান আপলোড যুক্ত হয়নি।

পরবর্তী কাজ:
1. Supabase Project তৈরি করা।
2. SQL Editor-এ schema.sql চালানো।
3. Audio, videos ও covers Storage bucket তৈরি করা।
4. অ্যাডমিন ব্যবহারকারী তৈরি করে অনুমতি দেওয়া।
5. config.js-এ Supabase Project URL ও Publishable/anon key বসানো।
6. HTML-এ style.css ও app.js যুক্ত করা।
7. Cloudflare Pages দিয়ে ওয়েবসাইট প্রকাশ করা।

নিরাপত্তা:
- Supabase service_role বা secret key কখনো
  ওয়েবসাইটের JavaScript ফাইলে রাখা যাবে না।
- অ্যাডমিনের অনুমতি ডেটাবেসে নিয়ন্ত্রণ করতে হবে।
- প্রকাশিত গান ও ভিডিওর লিংক অন্যরাও দেখতে পারবে।
