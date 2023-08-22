function loadSitemap(url) {

    return fetch(url).then(function(rsp) {

    return rsp.text();

    }).then(function(text) {

    return (new window.DOMParser()).parseFromString(text, 'text/xml');

    }).catch(function(error) {});

}

function expandSitemapIndex(index) {

    let sitemapindex = [];

    for (let sitemap of index.children) {

    let loc = sitemap.getElementsByTagName('loc');

    if (loc.length != 1) {

        throw new Error('Invalid sitemap.xml file');

    }

    sitemapindex.push(convertSitemapToCsv(loc[0].textContent));

    }

    return Promise.all(sitemapindex);

}

function expandUrlSet(urlset) {

    let urls = [];

    for (let url of urlset.children) {

    let row = {};

    for (let prop of url.children) {

        row[prop.tagName] = prop.textContent;

    }

    urls.push(row);

    }

    return Promise.resolve(urls);

}

function processSitemap(sitemap) {

    sitemap = sitemap.documentElement;

    switch (sitemap.tagName) {

    case 'urlset':

    return expandUrlSet(sitemap);

    case 'sitemapindex':

    return expandSitemapIndex(sitemap).then(collapseCsv);

    default:

    }

    return Promise.resolve([]);

}

function convertSitemapToCsv(url) {

    return loadSitemap(url).then(processSitemap);

}

function collapseCsv(values) {

    return values.reduce(function(accumulator, current) {

    return accumulator.concat(current);

    }, []);

}

function makeCsv(csv) {

    let fields = ['loc'];
    let contents = [fields.join(',')];

    csv.forEach(function(row) {

    let entry = new Array(fields.length);

    entry.fill('');

    fields.forEach(function(key, index) { 

        if (key in row) {

        entry[index] = '"' + row[key] + '"';

        }

    });

    contents.push(entry.join(','));

    });

    return contents.join('\n');

}


function downloadCsv(csv) {

    let blob = new Blob([csv], {

    type: 'text/csv'

    });

    let url = URL.createObjectURL(blob);

    window.location.href = url;

}

convertSitemapToCsv("/sitemap.xml").then(makeCsv).then(downloadCsv);
