# AFRICA TECH

الموقع: https://tech.yusuftalaat.tech

المستودع: https://github.com/yusuftalaat74-coder/tech-company-website

موقع شركة تكنولوجيا بهوية مؤقتة قابلة للتخصيص، بالعربية والإنجليزية، جاهز للرفع إلى GitHub والنشر على GitHub Pages.

## ما تم تنفيذه

- 36 صفحة مولّدة مسبقًا: 18 صفحة لكل لغة.
- الرئيسية، الخدمات، 6 صفحات خدمة، القطاعات، 6 صفحات قطاع، منهج العمل، التواصل، الخصوصية.
- تصميم متجاوب، اتجاه عربي RTL، وقائمة هاتف تعمل بلوحة المفاتيح.
- نموذجان تفاعليان ببيانات توضيحية: إدارة عيادة وإدارة شحنات.
- نموذج مشروع يتحقق من البيانات، يعرض موجزًا ويحمّله كملف نصي.
- خطوط وصور محلية، من دون مكتبات وقت تشغيل أو طلبات لطرف ثالث داخل الصفحة.
- عناوين ووصف لكل صفحة، وملف sitemap وروابط canonical عند إضافة الدومين.
- إعداد GitHub Actions للنشر التلقائي.

هذه نسخة تنفيذية بهوية ومحتوى تعريفي مبدئي. لا تتضمن ادعاءات عن عملاء أو إنجازات أو مقرات غير مؤكدة. الواجهات والأرقام داخل العروض هي بيانات تجريبية وموسومة بذلك.

## التشغيل

يتطلب Node.js 20 أو أحدث. لا تحتاج إلى `npm install`.

```sh
npm run build
npm run check
npm run dev
```

افتح الرابط الذي يظهر في الطرفية. المنفذ الافتراضي 4173؛ إذا كان مستخدمًا:

```sh
PORT=4186 npm run dev
```

صفحة الإنجليزية: `/en/`، والعربية: `/ar/`.

بعد تعديل ملفات المصدر شغّل `npm run build` ثم حدّث المتصفح. الخادم لا يعيد البناء تلقائيًا.

## تغيير الشركة من ملف واحد

عدّل `src/brand.mjs`:

- `name`: اسم الشركة.
- `accent`, `accentBright`, `surface`, `ink`: ألوان الهوية.
- `email`: بريد استقبال الطلبات الحقيقي. عند إضافته يظهر زر فتح البريد بالموجز.
- `whatsapp`: رقم دولي بالأرقام فقط؛ يظهر رابط واتساب عند إضافته.
- `bookingUrl`: رابط الحجز الفعلي الاختياري.
- `siteUrl`: عنوان الموقع النهائي، مثل `https://company.com` أو `https://username.github.io/repository`.
- `description`: الوصف التعريفي للغتين.

يمكن الاحتفاظ بعدة ملفات إعدادات لشركات مختلفة:

```sh
cp src/brand.mjs src/brand-other.mjs
# عدّل بيانات الشركة الجديدة في الملف المنسوخ
BRAND_FILE=src/brand-other.mjs npm run build
```

هذا الأمر يستبدل `dist/` بالنسخة الجديدة. احتفظ بكل نسخة في مستودع مستقل أو انسخ مجلد `dist/` قبل بناء النسخة التالية.

لتغيير المحتوى والترجمات والخدمات والقطاعات، عدّل `src/content.mjs`. لتغيير الشعار الهندسي، عدّل `mark` في `src/templates.mjs`. الصورة الرئيسية `assets/globe.webp` تستخدم لونًا برتقاليًا داخل الصورة؛ استبدلها بأصل بصري مناسب عند تغيير الهوية جذريًا.

## النشر على GitHub Pages

1. أنشئ مستودع GitHub وارفع محتويات هذا المجلد إلى جذر المستودع، بما فيها `.github`.
2. استخدم الفرع `main`، أو عدّل اسم الفرع في `.github/workflows/pages.yml`.
3. من Settings → Pages اختر **GitHub Actions** كمصدر النشر.
4. شغّل workflow المسمى **Deploy website to GitHub Pages** أو ادفع تعديلًا إلى `main`.
5. يظهر الرابط في نتيجة النشر. حدّث `siteUrl` بهذا الرابط ثم أعد البناء والنشر.

جميع روابط الصفحات والأصول نسبية؛ تعمل أيضًا عند نشر الموقع تحت مسار مستودع GitHub.

## استقبال طلبات العملاء

بدون بيانات تواصل، النموذج يجهّز موجزًا على جهاز الزائر ويحمّله فقط. لا توجد رسالة نجاح توحي بإرسال طلب لم يحدث.

إضافة `email` تتيح فتح برنامج البريد بالموجز، لكنها لا ترسل الرسائل آليًا. إذا أردت نموذج استقبال مباشر إلى البريد أو CRM، يلزم ربط خدمة نماذج أو واجهة خادم؛ GitHub Pages لا يشغّل خادمًا لاستقبال الطلبات. لا تضع أي مفتاح سري في ملفات الموقع.

## قبل الإطلاق بالاسم النهائي

- أضف اسم الشركة وبيانات التواصل والدومين الحقيقي.
- راجع صياغة الخدمات وفق الخدمات التي تقدمها الشركة فعليًا.
- استبدل الأمثلة التوضيحية بأعمال ومشروعات موثقة عندما تتوفر.
- حدّث صفحة الخصوصية بالبيانات الفعلية وآلية استقبال الطلبات.
- وجود `siteUrl` يولّد `sitemap.xml` ويتيح الفهرسة في `robots.txt`. النسخة التي لا تحتوي دومينًا نهائيًا تمنع الفهرسة عمدًا.

## بنية المشروع

```text
src/brand.mjs        بيانات الشركة والهوية
src/content.mjs      المحتوى والترجمات
src/templates.mjs    قوالب الصفحات
assets/style.css     التصميم والتجاوب وRTL
assets/app.js        التفاعلات والنموذج والعروض
assets/globe.webp    الصورة الرئيسية المحسّنة
scripts/build.mjs    توليد الصفحات والأصول
scripts/check.mjs    فحص الروابط والأصول واللغات
scripts/serve.mjs    خادم المعاينة المحلي
.github/workflows/   النشر على GitHub Pages
dist/               الموقع الجاهز للنشر
licenses/           تراخيص الخطوط
```

## التحقق المنفذ

تم التحقق من جميع الروابط والأصول المحلية، ومن تفرّد معرفات العناصر، وتحديد اللغة واتجاه العربية. وتم اختبار الموقع في Chromium على عروض 1440 و390 و320 بكسل، مع اختبار القائمة والعروض التفاعلية وموجز المشروع والتنزيل. لا يوجد تقرير Lighthouse مدّعى أو اختبار على أجهزة فعلية.

## الأصول

الخط الإنجليزي Manrope والخط العربي Noto Sans Arabic، محفوظان محليًا وفق ترخيص SIL Open Font License المرفق. صورة الكرة الأرضية تم توليدها خصيصًا لهذه النسخة بأداة توليد الصور المدمجة، وتحويلها إلى WebP لتقليل الحجم. تفاصيل الأصل في `ASSETS.md`.


## Expanded company website

The site now builds 88 pages across English, Arabic (RTL), French and Portuguese.

- Seven platform profiles with industry filters and links that preselect the platform in the project brief.
- Eight industry pages, including photography studios and public services.
- Approved portfolio: Queen Secret, Wimbi, Switx Visions and West Wings. Text and abstract project artwork describe scope; they are not screenshots of customer systems.
- Local payment planning, offline workflow options, language support and hosting considerations. These are project capabilities, not active payment integrations or compliance certifications.
- Clinic and fleet interface concepts remain explicitly labelled as illustrative sample data.
- Country and platform fields are included in the downloadable brief. No enquiry is transmitted unless an actual contact integration is configured.

Edit `src/expansion.mjs` for platform/portfolio copy, `src/locales.mjs` for French and Portuguese, and `src/demo-copy.mjs` for interactive demo translations. Clear or replace `portfolio` in the brand file when reusing the site for another company. Configure the real email, WhatsApp number or booking URL in `src/brand.mjs` to activate those contact channels.
