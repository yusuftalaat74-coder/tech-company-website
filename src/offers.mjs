// Sector offers, launch pricing and FAQ for the home page and the three focus sector pages.
// Prices are in USD. The launch discount applies to setup fees only and ends at launchEnds.
export const launchEnds = '2026-12-31T23:59:59+02:00';
export const launchActive = (now = new Date()) => now <= new Date(launchEnds);

// sector: the solutions/<slug> page that shows the same card.
export const offerPlans = [
  {id: 'restaurants', sector: 'hospitality', icon: 'cup', plans: [
    {key: 'menu', official: 600, monthly: 30},
    {key: 'full', official: 1600, monthly: 50},
    {key: 'chain', official: 3000, monthly: 40, from: true, perBranch: true}
  ]},
  {id: 'clinics', sector: 'healthcare', icon: 'health', plans: [
    {key: 'clinic', official: 4000, monthly: 150, perBranch: true}
  ]},
  {id: 'cargo', sector: 'logistics', icon: 'truck', plans: [
    {key: 'cargo', official: 5000, monthly: 120, from: true}
  ]}
];

// Client testimonials. Only entries with approved:true are published.
// Send each draft to the client, publish only the wording they approve.
export const testimonials = [
  {client: 'Queen Secret', sector: 'clinics', approved: false, quote: {en: 'We ran 13 branches on separate tools. The Link brought booking, cashier and accounting into one place.'}},
  {client: 'Wimbi', sector: 'restaurants', approved: false, quote: {en: 'Guests order from the menu on their phone and the order reaches us on WhatsApp, ready, with no commission.'}},
  {client: 'Dubai Restaurant', sector: 'restaurants', approved: false, quote: {en: 'We change prices and dishes ourselves in minutes, without printing a new menu.'}},
  {client: 'West Wings Group', sector: 'cargo', approved: false, quote: {en: 'We operate in five countries and several languages. The new website gave us one clear face and made every station easy to reach.'}},
  {client: 'Switx Visions', sector: 'studios', approved: false, quote: {en: 'Website, dashboard and client galleries in one place. We deliver photos to clients with a single link.'}}
];

export const offerCopy = {
  en: {
    allPrices: 'See all prices',
    hero: {eyebrow: 'RESTAURANTS · CLINICS · CARGO', lines: ['Digital systems', 'for restaurants, clinics', 'and cargo companies.'], desc: 'Ready-made platforms, configured for your business. Local payments, four languages and support after launch. Already running for real businesses in Africa and the Gulf.', primary: 'See prices', secondary: 'Chat on WhatsApp'},
    eyebrow: 'LAUNCH OFFER · 50% OFF SETUP UNTIL 31 DECEMBER 2026',
    title: 'Three solutions.\nClear prices.',
    desc: 'Pick your sector, see what is included and what it costs. Book a free demo with your own name and logo before you pay anything.',
    badge: '−50% setup', regular: 'Regular setup', launch: 'Launch price', monthly: '/ month', perBranch: 'per branch', from: 'from', delivery: 'Typical delivery', demo: 'Free demo',
    note: 'Launch prices apply to projects confirmed by 31 December 2026. From 1 January 2027 the regular setup price applies. Monthly fees are not discounted. Prices in USD, excluding local taxes.',
    afterNote: 'Prices in USD, excluding local taxes. Monthly fees cover hosting, updates and support.',
    sectors: {
      restaurants: {name: 'Restaurants', product: 'Mesa', promise: 'A digital menu and WhatsApp ordering, with no commission per order.', proof: 'Live for Wimbi, Dubai Restaurant and Senior Kofta.', items: ['QR menu with photos and prices', 'Cart that sends the order ready to your WhatsApp', 'Change dishes and prices yourself', 'Restaurant website and table booking'], delivery: '7–14 days', cta: 'Get a free menu demo', wa: 'Hello AFRICA TECH, I want a free digital menu demo for my restaurant.'},
      clinics: {name: 'Clinics & medical centres', product: 'The Link', promise: 'One system instead of ten: booking to balance sheet, across every branch.', proof: 'Built with Queen Secret, a 13-branch clinic group in Egypt and the Gulf.', items: ['Booking, reception, doctor and session screens', 'Cashier, treasury and accounting in one chain', '“Left without service” report to find lost revenue', 'Daily follow-up list and full branch isolation'], delivery: '3–4 weeks', cta: 'Book a 30-minute tour', wa: 'Hello AFRICA TECH, I would like a tour of The Link clinic system.'},
      cargo: {name: 'Cargo & logistics', product: 'Cargo web', promise: 'A cargo website that brings quote requests, not just visitors.', proof: 'Built for West Wings Group across 5 African stations.', items: ['Quote request form to WhatsApp and email', 'Shipment tracking page', 'A page per station, with map and contacts', 'Arabic, French, Portuguese and English'], delivery: '3–4 weeks', cta: 'Get a free website review', wa: 'Hello AFRICA TECH, I would like a free review of our cargo website.'}
    },
    plans: {menu: 'Menu', full: 'Full restaurant', chain: 'Restaurant chain', clinic: 'Clinic system', cargo: 'Cargo website'},
    stepsTitle: 'How it works', steps: [['Free call', '20 minutes on WhatsApp to understand your business.'], ['Your demo', 'We show the system with your name, logo and data.'], ['Launch & training', 'We set it up, train your team and stay with you.']],
    faqTitle: 'Questions before you start', faqs: [
      ['How do I pay?', 'Bank transfer or local mobile money where available. Half of the setup on start, half on launch.'],
      ['Do I own my data?', 'Yes. Your data stays yours and can be exported at any time.'],
      ['What does the monthly fee include?', 'Hosting, security updates, backups and support by WhatsApp.'],
      ['Which countries do you serve?', 'Mozambique, South Africa and the rest of Africa, plus the Gulf. We work remotely in four languages.'],
      ['What if the demo is not right for me?', 'You pay nothing. The demo is free and has no obligation.']
    ]
  },
  ar: {
    allPrices: 'كل الأسعار',
    hero: {eyebrow: 'مطاعم · عيادات · شحن', lines: ['أنظمة رقمية', 'للمطاعم والعيادات', 'وشركات الشحن.'], desc: 'منصات جاهزة نجهزها لنشاطك: دفع محلي، أربع لغات، ودعم بعد الإطلاق. تعمل بالفعل لدى شركات حقيقية في أفريقيا والخليج.', primary: 'شاهد الأسعار', secondary: 'تواصل عبر واتساب'},
    eyebrow: 'عرض الإطلاق · خصم 50% على الإعداد حتى 31 ديسمبر 2026',
    title: 'ثلاثة حلول.\nأسعار واضحة.',
    desc: 'اختر قطاعك، واعرف ما يشمله الحل وتكلفته. احجز ديمو مجاني باسم نشاطك وشعاره قبل أن تدفع أي شيء.',
    badge: '−50% على الإعداد', regular: 'سعر الإعداد الرسمي', launch: 'سعر الإطلاق', monthly: '/ شهريًا', perBranch: 'لكل فرع', from: 'يبدأ من', delivery: 'مدة التسليم المعتادة', demo: 'ديمو مجاني',
    note: 'أسعار الإطلاق للمشاريع المؤكدة حتى 31 ديسمبر 2026. من 1 يناير 2027 يُطبَّق سعر الإعداد الرسمي. الاشتراك الشهري غير مشمول بالخصم. الأسعار بالدولار الأمريكي ولا تشمل الضرائب المحلية.',
    afterNote: 'الأسعار بالدولار الأمريكي ولا تشمل الضرائب المحلية. الاشتراك الشهري يشمل الاستضافة والتحديثات والدعم.',
    sectors: {
      restaurants: {name: 'المطاعم', product: 'Mesa', promise: 'منيو رقمي وطلب عبر واتساب، بدون عمولة على كل طلب.', proof: 'يعمل لدى Wimbi وDubai Restaurant وSenior Kofta.', items: ['منيو QR بالصور والأسعار', 'سلة ترسل الطلب جاهزًا إلى واتساب المطعم', 'تعديل الأصناف والأسعار بنفسك', 'موقع للمطعم وحجز طاولات'], delivery: '7–14 يومًا', cta: 'اطلب ديمو منيو مجاني', wa: 'مرحبًا AFRICA TECH، أريد ديمو مجاني لمنيو رقمي لمطعمي.'},
      clinics: {name: 'العيادات والمراكز الطبية', product: 'The Link', promise: 'نظام واحد بدل عشرة: من الحجز حتى الميزانية، لكل الفروع.', proof: 'بُني مع Queen Secret، مجموعة عيادات من 13 فرعًا في مصر والخليج.', items: ['شاشات الحجز والاستقبال والطبيب والجلسة', 'الكاشير والخزينة والمحاسبة في سلسلة واحدة', 'تقرير «انصرفوا بدون خدمة» لكشف الإيراد المفقود', 'قائمة متابعة يومية وعزل كامل بين الفروع'], delivery: '3–4 أسابيع', cta: 'احجز جولة 30 دقيقة', wa: 'مرحبًا AFRICA TECH، أريد جولة على نظام The Link للعيادات.'},
      cargo: {name: 'الشحن واللوجستيات', product: 'Cargo web', promise: 'موقع شحن يجلب طلبات عروض أسعار، لا مجرد زوار.', proof: 'نُفذ لـ West Wings Group في 5 محطات أفريقية.', items: ['نموذج طلب عرض سعر يصل إلى واتساب والبريد', 'صفحة تتبع الشحنات', 'صفحة لكل محطة بالخريطة وأرقام التواصل', 'عربي وفرنسي وبرتغالي وإنجليزي'], delivery: '3–4 أسابيع', cta: 'اطلب مراجعة مجانية لموقعك', wa: 'مرحبًا AFRICA TECH، أريد مراجعة مجانية لموقع شركة الشحن.'}
    },
    plans: {menu: 'المنيو', full: 'مطعم كامل', chain: 'سلسلة مطاعم', clinic: 'نظام العيادة', cargo: 'موقع شركة شحن'},
    stepsTitle: 'كيف نعمل', steps: [['مكالمة مجانية', '20 دقيقة على واتساب لنفهم نشاطك.'], ['الديمو الخاص بك', 'نعرض النظام باسمك وشعارك وبياناتك.'], ['الإطلاق والتدريب', 'نجهز النظام وندرب فريقك ونبقى معك.']],
    faqTitle: 'أسئلة قبل أن تبدأ', faqs: [
      ['كيف أدفع؟', 'تحويل بنكي أو محافظ الدفع المحلية حيث تتوفر. نصف الإعداد عند البدء والنصف عند الإطلاق.'],
      ['هل البيانات ملكي؟', 'نعم. بياناتك ملكك ويمكن تصديرها في أي وقت.'],
      ['ماذا يشمل الاشتراك الشهري؟', 'الاستضافة وتحديثات الأمان والنسخ الاحتياطي والدعم عبر واتساب.'],
      ['ما الدول التي تخدمونها؟', 'موزمبيق وجنوب أفريقيا وباقي أفريقيا، والخليج. نعمل عن بُعد بأربع لغات.'],
      ['وإذا لم يناسبني الديمو؟', 'لا تدفع شيئًا. الديمو مجاني وبدون أي التزام.']
    ]
  },
  fr: {
    allPrices: 'Voir tous les prix',
    hero: {eyebrow: 'RESTAURANTS · CLINIQUES · FRET', lines: ['Des systèmes numériques', 'pour restaurants, cliniques', 'et sociétés de fret.'], desc: 'Des plateformes prêtes, configurées pour votre activité. Paiements locaux, quatre langues et support après le lancement. Déjà en service chez de vraies entreprises en Afrique et dans le Golfe.', primary: 'Voir les prix', secondary: 'Écrire sur WhatsApp'},
    eyebrow: 'OFFRE DE LANCEMENT · −50 % SUR LA MISE EN PLACE JUSQU’AU 31 DÉCEMBRE 2026',
    title: 'Trois solutions.\nDes prix clairs.',
    desc: 'Choisissez votre secteur, voyez ce qui est inclus et combien cela coûte. Demandez une démo gratuite à votre nom avant de payer quoi que ce soit.',
    badge: '−50 % mise en place', regular: 'Mise en place standard', launch: 'Prix de lancement', monthly: '/ mois', perBranch: 'par site', from: 'à partir de', delivery: 'Délai habituel', demo: 'Démo gratuite',
    note: 'Les prix de lancement s’appliquent aux projets confirmés avant le 31 décembre 2026. À partir du 1er janvier 2027, le prix standard s’applique. Les abonnements mensuels ne sont pas remisés. Prix en USD, hors taxes locales.',
    afterNote: 'Prix en USD, hors taxes locales. L’abonnement mensuel couvre l’hébergement, les mises à jour et le support.',
    sectors: {
      restaurants: {name: 'Restaurants', product: 'Mesa', promise: 'Un menu numérique et la commande par WhatsApp, sans commission par commande.', proof: 'En service chez Wimbi, Dubai Restaurant et Senior Kofta.', items: ['Menu QR avec photos et prix', 'Panier qui envoie la commande prête sur votre WhatsApp', 'Modifiez plats et prix vous-même', 'Site du restaurant et réservation de tables'], delivery: '7–14 jours', cta: 'Demander une démo de menu', wa: 'Bonjour AFRICA TECH, je souhaite une démo gratuite de menu numérique pour mon restaurant.'},
      clinics: {name: 'Cliniques et centres médicaux', product: 'The Link', promise: 'Un seul système au lieu de dix : du rendez-vous au bilan, pour chaque site.', proof: 'Conçu avec Queen Secret, un groupe de 13 cliniques en Égypte et dans le Golfe.', items: ['Écrans rendez-vous, accueil, médecin et séance', 'Caisse, trésorerie et comptabilité en une seule chaîne', 'Rapport « partis sans service » pour retrouver le chiffre perdu', 'Liste de suivi quotidienne et isolation complète des sites'], delivery: '3–4 semaines', cta: 'Réserver une visite de 30 min', wa: 'Bonjour AFRICA TECH, je souhaite une visite du système The Link pour cliniques.'},
      cargo: {name: 'Fret et logistique', product: 'Cargo web', promise: 'Un site de fret qui génère des demandes de devis, pas seulement des visites.', proof: 'Réalisé pour West Wings Group sur 5 stations africaines.', items: ['Formulaire de devis vers WhatsApp et e-mail', 'Page de suivi des expéditions', 'Une page par station, avec carte et contacts', 'Arabe, français, portugais et anglais'], delivery: '3–4 semaines', cta: 'Audit gratuit de votre site', wa: 'Bonjour AFRICA TECH, je souhaite un audit gratuit de notre site de fret.'}
    },
    plans: {menu: 'Menu', full: 'Restaurant complet', chain: 'Chaîne de restaurants', clinic: 'Système clinique', cargo: 'Site de fret'},
    stepsTitle: 'Comment ça marche', steps: [['Appel gratuit', '20 minutes sur WhatsApp pour comprendre votre activité.'], ['Votre démo', 'Le système à votre nom, avec votre logo et vos données.'], ['Lancement et formation', 'Nous installons, formons votre équipe et restons à vos côtés.']],
    faqTitle: 'Questions avant de commencer', faqs: [
      ['Comment payer ?', 'Virement bancaire ou mobile money local selon le pays. Moitié de la mise en place au démarrage, moitié au lancement.'],
      ['Mes données m’appartiennent-elles ?', 'Oui. Vos données restent les vôtres et peuvent être exportées à tout moment.'],
      ['Que comprend l’abonnement mensuel ?', 'Hébergement, mises à jour de sécurité, sauvegardes et support par WhatsApp.'],
      ['Quels pays servez-vous ?', 'Le Mozambique, l’Afrique du Sud et le reste de l’Afrique, ainsi que le Golfe. Nous travaillons à distance en quatre langues.'],
      ['Et si la démo ne me convient pas ?', 'Vous ne payez rien. La démo est gratuite et sans engagement.']
    ]
  },
  pt: {
    allPrices: 'Ver todos os preços',
    hero: {eyebrow: 'RESTAURANTES · CLÍNICAS · CARGA', lines: ['Sistemas digitais', 'para restaurantes, clínicas', 'e empresas de carga.'], desc: 'Plataformas prontas, configuradas para o seu negócio. Pagamentos locais, quatro idiomas e suporte após o lançamento. Já em uso por empresas reais em África e no Golfo.', primary: 'Ver preços', secondary: 'Falar no WhatsApp'},
    eyebrow: 'OFERTA DE LANÇAMENTO · 50% DE DESCONTO NA CONFIGURAÇÃO ATÉ 31 DE DEZEMBRO DE 2026',
    title: 'Três soluções.\nPreços claros.',
    desc: 'Escolha o seu setor, veja o que está incluído e quanto custa. Peça uma demo grátis com o seu nome e logótipo antes de pagar qualquer coisa.',
    badge: '−50% configuração', regular: 'Configuração normal', launch: 'Preço de lançamento', monthly: '/ mês', perBranch: 'por filial', from: 'desde', delivery: 'Prazo habitual', demo: 'Demo grátis',
    note: 'Os preços de lançamento aplicam-se a projetos confirmados até 31 de dezembro de 2026. A partir de 1 de janeiro de 2027 aplica-se o preço normal. As mensalidades não têm desconto. Preços em USD, sem impostos locais.',
    afterNote: 'Preços em USD, sem impostos locais. A mensalidade inclui alojamento, atualizações e suporte.',
    sectors: {
      restaurants: {name: 'Restaurantes', product: 'Mesa', promise: 'Menu digital e pedidos por WhatsApp, sem comissão por pedido.', proof: 'Em uso no Wimbi, Dubai Restaurant e Senior Kofta.', items: ['Menu QR com fotos e preços', 'Carrinho que envia o pedido pronto para o seu WhatsApp', 'Altere pratos e preços sozinho', 'Site do restaurante e reserva de mesas'], delivery: '7–14 dias', cta: 'Pedir demo do menu grátis', wa: 'Olá AFRICA TECH, quero uma demo grátis de menu digital para o meu restaurante.'},
      clinics: {name: 'Clínicas e centros médicos', product: 'The Link', promise: 'Um sistema em vez de dez: da marcação ao balanço, em todas as filiais.', proof: 'Desenvolvido com a Queen Secret, um grupo de 13 clínicas no Egito e no Golfo.', items: ['Ecrãs de marcação, receção, médico e sessão', 'Caixa, tesouraria e contabilidade numa só cadeia', 'Relatório «saíram sem atendimento» para recuperar receita', 'Lista diária de seguimento e isolamento total entre filiais'], delivery: '3–4 semanas', cta: 'Marcar visita de 30 min', wa: 'Olá AFRICA TECH, gostaria de uma visita ao sistema The Link para clínicas.'},
      cargo: {name: 'Carga e logística', product: 'Cargo web', promise: 'Um site de carga que traz pedidos de cotação, não só visitas.', proof: 'Feito para a West Wings Group em 5 estações africanas.', items: ['Formulário de cotação para WhatsApp e e-mail', 'Página de rastreio de envios', 'Uma página por estação, com mapa e contactos', 'Árabe, francês, português e inglês'], delivery: '3–4 semanas', cta: 'Pedir análise grátis do site', wa: 'Olá AFRICA TECH, gostaria de uma análise grátis do nosso site de carga.'}
    },
    plans: {menu: 'Menu', full: 'Restaurante completo', chain: 'Cadeia de restaurantes', clinic: 'Sistema de clínica', cargo: 'Site de carga'},
    stepsTitle: 'Como funciona', steps: [['Chamada grátis', '20 minutos no WhatsApp para conhecer o seu negócio.'], ['A sua demo', 'Mostramos o sistema com o seu nome, logótipo e dados.'], ['Lançamento e formação', 'Configuramos, formamos a equipa e continuamos consigo.']],
    faqTitle: 'Perguntas antes de começar', faqs: [
      ['Como pago?', 'Transferência bancária ou mobile money local, onde existir. Metade da configuração no início, metade no lançamento.'],
      ['Os dados são meus?', 'Sim. Os seus dados são seus e podem ser exportados a qualquer momento.'],
      ['O que inclui a mensalidade?', 'Alojamento, atualizações de segurança, cópias de segurança e suporte por WhatsApp.'],
      ['Que países servem?', 'Moçambique, África do Sul e o resto de África, e o Golfo. Trabalhamos à distância em quatro idiomas.'],
      ['E se a demo não for para mim?', 'Não paga nada. A demo é grátis e sem compromisso.']
    ]
  }
};
