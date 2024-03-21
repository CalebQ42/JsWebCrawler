const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main(){
    if(process.argv.length != 3){
        console.log("Please provice exactly one argument: the page's url")
        return
    }
    const url = process.argv[2]
    console.log(`Starting crawl from ${url}`)
    printReport(await crawlPage(url, url, {}))
}

main()