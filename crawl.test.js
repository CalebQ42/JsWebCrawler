const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

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