module.exports = {
    printReport
}

/**
 * 
 * @param {Object<string, number>} crawlResult 
 */
function printReport(crawlResult){
    console.log("Starting report...")
    const sorted = Object.entries(crawlResult).sort((a, b) => b[1] - a[1])
    for(let s of sorted){
        console.log(`Found ${s[1]} internal links to ${s[0]}`)
    }
}