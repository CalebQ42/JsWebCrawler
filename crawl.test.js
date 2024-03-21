const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

test('testing normalizeURL', () => {
    const testURLs = [
        "https://blog.boot.dev/path/",
        "https://blog.boot.dev/path",
        "http://blog.boot.dev/path/",
        "http://blog.boot.dev/path"
    ]
    for(let t of testURLs){
        expect(normalizeURL(t)).toBe("blog.boot.dev/path")
    }
})

test('testing getURLsFromHTML', () =>{
    const testHTML = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path">Link</a>
            <div>
                <a href="https://darkstorm.tech">A nother one</a>
            </div>
            <a href="/swassistant">SWAssistant</a>
            <a href="favicon.png">favicon</a>
        </body>
    </html>
    `
    expect(getURLsFromHTML(testHTML, "https://darkstorm.tech")).toStrictEqual([
        "https://blog.boot.dev/path",
        "https://darkstorm.tech",
        "https://darkstorm.tech/swassistant",
        "https://darkstorm.tech/favicon.png"
    ])
})