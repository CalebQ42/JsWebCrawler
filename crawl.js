
module.exports = {
    normalizeURL
}

/**
 * @param {string} url - The URL to be normalized
 * @return {string} The normalized URL
 */
function normalizeURL(url){
    if(url.endsWith("/")){
        url = url.slice(0, -1);
    }
    if(url.includes("://")){
        url = url.slice(url.indexOf("://")+3)
    }
    return url
}

/**
 * 
 * @param {string} page - An html page in string format
 * @return {Array<string>} List of url links present on the page 
 */
function getURLsFromHTML(page){
    
}