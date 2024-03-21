const { JSDOM } = require('jsdom');

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}

/**
 * 
 * @param {string} url - The URL to be normalized
 * @return {string} The normalized URL
 */
function normalizeURL(url){
    const u = new URL(url)
    return u.host + u.pathname
}

/**
 * 
 * @param {string} page - An html page in string format
 * @param {string} pageURL - page's url for relative link parsing
 * @return {Array<string>} List of url links present on the page 
 */
function getURLsFromHTML(page, pageURL){
    if(pageURL.endsWith("/")){
        pageURL = pageURL.slice(0, -1)
    }
    const mainUrl = new URL(pageURL)
    const dom = new JSDOM(page)
    const links = dom.window.document.querySelectorAll("a")
    const out = []
    for(let l of links){
        let href = l.href
        if(!href.includes("://")){
            if(href.startsWith("/")){
                href = mainUrl.protocol + "//" + mainUrl.host + href
            }else{
                href = pageURL + "/" + href
            }
        }
        if(href.endsWith("/")){
            href = href.slice(0, -1)
        }
        out.push(href)
    }
    return out
}

/**
 * 
 * @param {string} baseURL - the start URL
 * @param {string} currentURL - the current URL
 * @param {Object<string, number>} pages - the amount of times a page is linked during a crawl
 * @returns {Object<string, number>} the amount of times a page is linked during a crawl
 */
async function crawlPage(baseURL, currentURL, pages){
    let page = ""
    try{
        const resp = await fetch(currentURL)
        if(!resp.ok){
            console.log(`fetching ${currentURL} returns non-ok status: ${resp.status}`)
            return pages
        }
        page = await resp.text()
    }catch(err){
        console.log(`fetching ${currentURL} resulted in an error: ${err.message}`)
        return pages
    }
    if(!page){
        return pages
    }
    const baseU = new URL(baseURL)
    for(let l of getURLsFromHTML(page, currentURL)){
        const u = new URL(l)
        if(u.host != baseU.host){
            continue
        }
        const normal = normalizeURL(l)
        if(!pages[normal]){
            pages[normal] = 1
            console.log(`crawling to ${l}`)
            pages = await crawlPage(baseURL, l, pages)
        }else{
            pages[normal]++
        }
    }
    return pages
}