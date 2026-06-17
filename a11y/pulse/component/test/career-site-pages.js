(() => {

    "use strict";

    const shadowHost = document.querySelector("a11y-pulse-component");
    const shadowContainer = shadowHost.shadowRoot;
    const careerSitePagesLang = document.documentElement.lang.toLowerCase();
    const hasList = shadowContainer.querySelector(".status-container--career-site-pages ul");

    if(hasList) {

        hasList.remove();

    } 

    const ul = document.createElement("ul");
    const statusContainer = shadowContainer.querySelector(".status-container--career-site-pages");
    statusContainer.appendChild(ul);

    const statusList = shadowContainer.querySelector(".status-container--career-site-pages ul");
    const statusMessage = shadowContainer.querySelector(".status-message--career-site-pages");

    statusMessage.classList.remove("status-message--complete"); 
    statusMessage.textContent = "🔎 Fetching pages. Please be patient. Go make a sandwich. Actually, make me one too. Mmmm sammiches.";

    const loadSitemap = async (url) => {

        const response = await fetch(url);
        const text = await response.text();
        return (new DOMParser()).parseFromString(text, "text/xml");

    };

    const checkAjdInput = async (loc) => {

        try {

            const response = await fetch(loc);
            const html = await response.text();
            const dom = new DOMParser().parseFromString(html, "text/html");
            return dom.querySelector("#ajd-header") !== null;

        } catch {

            return false;

        }

    };

    const expandUrlSet = async (urlset) => {

        const urls = [];
        const subfolderCounts = {};
        const urlElements = Array.from(urlset.children);

        let ajdJobsIncluded = 0;
        let regularJobsIncluded = 0;

        const allowedSubfolders = (() => {

            const foldersByLang = {
        
                "ar": ["الفئة", "الموقع", "التوظبف", "الوظيفة", "موقع-الوظيفة", "البحث-عن-وظائف", "المحتوى", "العمل", "الإحالة"],
                "bg": ["категория", "местоположение", "наемане-на-работа", "работа", "местоположение-на-работата", "работи-за-търсене", "съдържание", "бизнес", "препращане"],
                "ca": ["categoria", "ubicació", "ocupació", "treball", "ubicació-del-treball", "cerqueu-feines", "content", "negocis", "derivació"],
                "zh-hans": ["类别", "位置", "雇用", "工作", "工作地点", "求职", "内容", "公司", "推荐"],
                "zh-hant": ["類別", "位置", "僱用", "工作", "工作地點", "搜索工作", "內容", "公司", "推薦"],
                "hr": ["kategorija", "lokacija", "zapošljavanje", "posao", "posao-lokacija", "pretraga-poslova", "sadržaj", "poslovanje", "upućivanje"],
                "cs": ["kategorie", "místo", "zaměstnanost", "práce", "místo-práce", "vyhledávat-nabídky", "obsah", "faseta", "doporučení"],
                "da": ["kategori", "placering", "ansaettelse", "job", "jobplacering", "soeg-jobs", "indhold", "virksomhed", "henvisning"],
                "nl": ["categorie", "plaats", "werk", "banen", "banen-locatie", "jobs-zoeken", "inhoud", "firma", "doorverwijzing"],
                "en": ["category", "location", "employment", "job", "job_location", "search-jobs", "content", "business", "referral"],
                "en-gb": ["category", "location", "employment", "job", "job_location", "search-jobs", "content", "business", "referral"],
                "et": ["kategooria", "asukoht", "teenistus", "tööpakkumine", "töö-asukoht", "otsi-tööpakkumisi", "sisu", "ettevõte", "saatekiri"],
                "fi": ["kategoria", "sijainti", "tyollistaminen", "tyopaikka", "tyopaikan-sijainti", "hae-tyopaikkoja", "sisalto", "liiketoiminta", "lähetys"],
                "fr": ["catégorie", "lieu", "emplois", "emploi", "lieu-de-travail", "recherche-d'offres", "contenu", "entreprise", "référence"],
                "fr-ca": ["catégorie", "lieu", "emplois", "emploi", "lieu-de-travail", "recherche-d'offres", "contenu", "entreprise", "référence"],
                "de": ["berufsfeld", "länderauswahl", "beschäftigung", "stellenbeschreibung", "arbeitsort", "jobsuche", "inhalt", "firma", "verweisung"],
                "el": ["κατηγορία", "τοποθεσία", "εργασία", "δουλειά", "τοποθεσία-εργασίας", "εργασίες-αναζήτησης", "περιεχόμενο", "επιχείρηση", "παραπομπή"],
                "he": ["קטגוריה", "מקום", "תעסוקה", "עבודה", "עבודה-מיקום", "חיפוש-משרות", "תוֹכֶן", "עֵסֶק", "הפניה"],
                "hu": ["kategória", "hely", "foglalkoztatás", "állás", "munkahelye", "álláskeresés", "tartalom", "vállalkozás", "beterjesztés"],
                "is": ["flokkur", "staður", "ráðning", "starf", "starf-staðsetning", "leit-störf", "efnisinnihald", "viðskipti", "tilvísun"],
                "id": ["kategori", "lokasi", "hubungan-kerja", "pekerjaan", "lokasi-pekerjaan", "cari-pekerjaan", "konten", "bisnis", "rujukan"],
                "it": ["categoria", "luogo", "occupazione", "lavoro", "luogo-di-lavoro", "lavori-di-ricerca", "contenuto", "azienda", "rinvio"],
                "ja": ["カテゴリー", "ロケーション", "雇用", "ジョブ", "仕事の場所", "検索ジョブ", "コンテンツ", "会社", "照会"],
                "ko": ["범주", "위치", "고용", "직무", "직무-위치", "검색-직무", "내용", "사업", "추천"],
                "lv": ["kategorija", "atrašanās-vieta", "nodarbinātība", "vakance", "vakances-atrašanās-vieta", "meklēt-darbu", "saturs", "uzņēmums", "nodošana"],
                "lt": ["kategorija", "vieta", "įdarbinimas", "darbas", "darbo-vieta", "ieškoti-darbų", "turinys", "veikla", "siuntimas"],
                "ms": ["kategori", "lokasi", "pekerjaan", "kerja", "lokasi-pekerjaan", "cari-pekerjaan", "kandungan", "perniagaan", "rujukan"],
                "no": ["kategori", "sted", "ansettelse", "jobb", "jobb-sted", "søk-jobber", "innhold", "virksomhet", "henvisning"],
                "pl": ["kategoria", "lokalizacja", "zatrudnienie", "praca", "miejsce-pracy", "szukanie-pracy", "zawartość", "faseta", "skierowanie"],
                "pt-pt": ["área", "localização", "emprego", "vaga", "sub-localização", "busca-de-vagas", "conteúdo", "firma", "referência"],
                "pt-br": ["área", "localização", "emprego", "vaga", "sub-localização", "busca-de-vagas", "conteúdo", "firma", "referência"],
                "ro": ["categorie", "loc", "angajare", "post-vacant", "loc-post-vacant", "căutare-posturi-vacante", "conținut", "afaceri", "recomandare"],
                "ru": ["kатегория", "место", "занятость", "pабота", "место-работы", "поиск-вакансий", "cодержание", "бизнес", "направления"],
                "sr": ["kategorija", "lokacija", "zaposlenje", "posao", "lokacija-posla", "pretraži-poslove", "sadržaj", "poslovanje", "упућивање"],
                "sk": ["kategória", "umiestnenie", "zamestnanosť", "pracovné-miesto", "umiestnenie-pracovného-miesta", "vyhľadávať-pracovné-miesta", "obsah", "podnik", "odporúčanie"],
                "sl": ["kategorija", "lokacija", "zaposlitev", "delovno-mesto", "delovno-mesto-lokacija", "iskanje-delovna-mesta", "vsebina", "podjetje", "napotitev"],
                "es": ["categoría", "ubicación", "empleo", "trabajo", "ciudad-o-región", "buscar-trabajo", "contenido", "empresa", "remisión"],
                "sv": ["kategori", "plats", "sysselsättning", "jobb", "arbetsplats", "jobbsökande", "innehåll", "firma", "remiss"],
                "th": ["ประเภท", "สถานที่ตั้ง", "การจ้างงาน", "งาน", "งานสถานที่ตั้ง", "ค้นหาตำแหน่งงาน", "เนื้อหา", "ธุรกิจ", "การอ้างอิง"],
                "tr": ["kategori", "konum", "işe-alım", "iş", "iş-bulma", "iş-arama", "içerik", "işletme", "referans"],
                "uk": ["категорія", "місцезнаходження", "зайнятість", "вакансія", "місцезнаходження-вакансії", "пошук-вакансій", "контент", "бізнес", "направлення"],
                "vi": ["danh-mục", "địa-điểm", "tuyển-dụng", "công-việc", "công-việc-địa-điểm", "tìm-kiếm-công-việc", "nội-dung", "kinh-doanh", "giới-thiệu"],
                "default": ["category", "location", "employment", "job", "job_location", "search-jobs", "content", "business", "referral"]  
                
                // TODO: default is also en, remove one of them.
            
            };

            const rawFolders = foldersByLang[careerSitePagesLang] || foldersByLang["default"];

            // Always add leading slash and encode once
    
            return rawFolders.map(f => encodeURI(`/${f}/`).toLowerCase());

        })();

        const isJobPage = (loc) => {
    
            const jobPathByLang = {
        
                "ar": "الوظيفة",
                "bg": "работа",
                "ca": "treball",
                "zh-hans": "工作",
                "zh-hant": "工作",
                "hr": "posao",
                "cs": "práce",
                "da": "job",
                "nl": "banen",
                "en": "job",
                "en-gb": "job",
                "et": "tööpakkumine",
                "fi": "tyopaikka",
                "fr": "emploi",
                "fr-ca": "emploi",
                "de": "stellenbeschreibung",
                "el": "δουλειά",
                "he": "עבודה",
                "hu": "állás",
                "is": "starf",
                "id": "pekerjaan",
                "it": "lavoro",
                "ja": "ジョブ",
                "ko": "직무",
                "lv": "vakance",
                "lt": "darbas",
                "ms": "kerja",
                "no": "jobb",
                "pl": "praca",
                "pt-pt": "vaga",
                "pt-br": "vaga",
                "ro": "post-vacant",
                "ru": "pабота",
                "sr": "posao",
                "sk": "pracovné-miesto",
                "sl": "delovno-mesto",
                "es": "trabajo",
                "sv": "jobb",
                "th": "งาน",
                "tr": "iş",
                "uk": "вакансія",
                "vi": "công-việc",
                "default": "job"

                // TODO: Default is also en. Remove one of them.
    
            };

            const rawJobPath = jobPathByLang[careerSitePagesLang] || jobPathByLang["default"];
            const encodedJobPath = encodeURI(`/${rawJobPath}/`);

            return loc.includes(encodedJobPath);

        };

        const currentPath = window.location.pathname;
        const subfolderPrefix = currentPath.split('/').filter(Boolean)[0];
        const expectedPrefix = `${window.location.origin}/${subfolderPrefix}/`;

        if (urlElements.length && urlElements[0].querySelector("loc") && urlElements[0].querySelector("loc").textContent === window.location.origin && subfolderPrefix) {

            urlElements[0].querySelector("loc").textContent = expectedPrefix;

        }

        for (const url of urlElements) {
    
            const loc = url.querySelector("loc").textContent;
            const path = new URL(loc).pathname.toLowerCase();

            console.log(`🔍 Checking URL: ${loc}`);  
            console.log(`📁 Normalized path: ${path}`);

            let found = false;

            for (const subfolder of allowedSubfolders) {
    
                console.log(`   ↪ Checking if path includes: ${subfolder}`);

                if (path.includes(subfolder)) {
        
                    console.log(`✅ Match found: ${subfolder}`);

                    found = true;
        
                    const matchedSubfolder = subfolder;

                    if (isJobPage(loc)) {
            
                        if (ajdJobsIncluded >= 2 && regularJobsIncluded >= 2) {
                
                            console.log("🚫 Job page limits reached. Skipping.");
                
                            break;
            
                        }

                        const hasAjd = await checkAjdInput(loc);
            
                        console.log(`   🔎 AJD check for ${loc}: ${hasAjd}`);

                        if (hasAjd && ajdJobsIncluded < 2) {
                
                            ajdJobsIncluded++;
                            
                            console.log(`   ✅ Adding AJD job (${ajdJobsIncluded}/2): ${loc}`);
                
                            urls.push({ loc, ajd: true });
            
                        } else if (!hasAjd && regularJobsIncluded < 2) {
                
                            regularJobsIncluded++;
                
                            console.log(`   ✅ Adding regular job (${regularJobsIncluded}/2): ${loc}`);
                
                            urls.push({ loc });
            
                        }
        
                    } else {
            
                        subfolderCounts[matchedSubfolder] = (subfolderCounts[matchedSubfolder] || 0) + 1;

                        console.log(`📊 Subfolder count for ${matchedSubfolder}: ${subfolderCounts[matchedSubfolder]}`);

                        if (subfolderCounts[matchedSubfolder] <= 2) {
                
                            console.log(`   ✅ Adding category/content page: ${loc}`);
                            
                            urls.push({ loc });
            
                        } else {
                
                            console.log(`   🚫 Skipping (limit reached): ${loc}`);
                        
                        }
        
                    }

                    break;
    
                }

            }

            if (!found) {
    
                console.log("🚫 No subfolder match — including anyway.");
    
                urls.push({ loc });

            }

            const allSubfoldersDone = allowedSubfolders.every(
    
                (sub) => (subfolderCounts[sub] || 0) >= 2

            );

            if (
    
                ajdJobsIncluded >= 2 &&
                regularJobsIncluded >= 2 &&
                allSubfoldersDone

            ) {
    
                console.log("🎯 All limits met — exiting early.");
                
                break;
            
            }

        }

        return urls;

    };

    const processSitemap = (sitemap) => {

        sitemap = sitemap.documentElement;

        return sitemap.tagName === "urlset" ? expandUrlSet(sitemap) : Promise.resolve([]);

    };

    const getPageInsights = async (urlObj) => {

        const url = urlObj.loc;
        const isAjd = urlObj.ajd;

        try {

            const response = await fetch(url);
            const html = await response.text();
            const dom = new DOMParser().parseFromString(html, "text/html");

            const titleElement = dom.querySelector("title");
            const paddedID = String(urlObj.id).padStart(3, "0");
            
            let title = titleElement && titleElement.textContent.trim() ? titleElement.textContent.trim() : `No Page Title - A11Y${paddedID}`;

            urlObj.missingTitle = !titleElement || titleElement.textContent.trim() === "";

            if (isAjd) title = "(AJD) " + title;

            const isCmsContent = dom.querySelector('meta[name="career-site-page-type"][content="ContentPage-CMS"]');

            if (isCmsContent) title = "(CMS Content) " + title;

            urlObj.title = title;
            urlObj.hasSlick = !!dom.querySelector('[class*="slick"]') || !!dom.querySelector('[class*="slide"]');
            urlObj.hasTabcordion = !!dom.querySelector('[class*="tab-accordion"]') || !!dom.querySelector('[class*="tabcordion"]');

            const li = document.createElement("li");
            const a = document.createElement("a");
            const img = document.createElement("img");

            if (statusList.children.length) {

                statusMessage.textContent = "🛠️ One moment. Building page inventory...";
        
            }

            a.href = url;
            a.textContent = url;
            a.target = "_blank";
            img.src = "https://radancy.dev/a11y/pulse/component/img/new-tab.png";
            img.alt = "(Opens in new window)";

            a.appendChild(img);
            li.appendChild(a);
        
            statusList.prepend(li);

            return title;

        } catch {

            const li = document.createElement("li");
            const a = document.createElement("a");
            const img = document.createElement("img");

            if (statusList.children.length) {

                statusMessage.textContent = "🛠️ One moment. Building page inventory...";
        
            }

            a.href = url;
            a.textContent = "Error retrieving: " + url;
            a.target = "_blank";
            img.src = "https://radancy.dev/a11y/pulse/component/img/new-tab.png";
            img.alt = "(Opens in new window)";

            a.appendChild(img);
            li.appendChild(a);
            li.classList.add("status-error");

            statusList.prepend(li);

            urlObj.title = `Title not found - A11Y${urlObj.id}`;
            urlObj.hasSlick = false;
            urlObj.hasTabcordion = false;
            urlObj.missingTitle = true;

            return urlObj.title;
                
        }

    };

    const convertSitemapToArray = async (url) => {
            
        const sitemap = await loadSitemap(url);
        const urls = await processSitemap(sitemap);
        const generateRandomID = () => Math.floor(100000 + Math.random() * 900000);
        const usedIDs = new Set();

        urls.forEach((url) => {
            
            let randomID;

            do {
                    
                randomID = generateRandomID();

            } while (
                    
                usedIDs.has(randomID)
            
            );
            
            usedIDs.add(randomID);
            url.id = randomID;
                
        });

        return urls;
                
    };

    const enrichUrlsWithInsights = async (urls) => {

        for (const url of urls) {

            await getPageInsights(url);

        }

        return urls;

    };

    const makeCsv = (data) => {

        let csv = "Title, URL, ID, Heading Validation, WAVE Validation, Slick, Tabcordion, Heading Issue, Missing Page Title, W3C Validation\n";

        data.forEach((row) => {

            csv += `"${row.title}","${row.loc}","A11Y${row.id}","https://validator.w3.org/nu/?showoutline=yes&doc=${row.loc}#headingoutline","https://wave.webaim.org/report#/${row.loc}","${row.hasSlick ? "X" : ""}","${row.hasTabcordion ? "X" : ""}"," ","${row.missingTitle ? "X" : ""}","https://validator.w3.org/nu/?showsource=yes&showoutline=yes&showimagereport=yes&doc=${row.loc}"\n`;

            // TODO: Remove W3C Validation
        
        });

        return csv;

    };

    const triggerDownload = (csv, file) => {

        const BOM = "\uFEFF"; // UTF-8 BOM - Finally working! 
        const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", file);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    };

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const isLangFolder = /^[a-z]{2,3}(-[a-z]{2,4})?$/.test(pathSegments[0]);
    const sitemapUrl = isLangFolder ? `${location.origin}/${pathSegments[0]}/sitemap.xml` : `${location.origin}/sitemap.xml`;

    convertSitemapToArray(sitemapUrl).then((data) => {

        return enrichUrlsWithInsights(data);

    }).then((data) => {

        const csv = makeCsv(data);
        const domain = location.hostname.replace(/\./g, '-');
        const firstSubfolder = location.pathname.split('/').filter(Boolean)[0] || null;
        const file = `${domain}${firstSubfolder ? `-${firstSubfolder}` : ''}-inventory.csv`;

        triggerDownload(csv, file);
    
        statusMessage.classList.add("status-message--complete");
        statusMessage.textContent = `🎉 Complete! Please check your download folder (${file}).`;
    
    });

})();
