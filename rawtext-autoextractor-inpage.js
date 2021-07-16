//console.clear();
let separator = '===================================================================================';
let rawArticle = '';
let htmlTextsFromPage = extractPageText()

function extractPageText() {
    // html texts in page
    return Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p'))
        .map(x => x.innerText.trim())
        .join('\n')
}

function insertHeader() {
    rawArticle = '\n\nRAWTEXT-AUTOEXTRACTOR-INPAGE => INJECTED FROM CJS CHROME EXTENSION'
        + '\n\n' + 'Code location : C:\Users\hypno\Dropbox\Extension for Google Chrome\RawText-Autoextractor-InPage\rawtext-autoextractor-inpage.js'
        + '\n\n' + separator + '\n\n'
        + 'URL : ' + window.location
        + '\n\n' + separator + '\n\n';
}

/**
 *
 * @param {string} tagName The tagname of the HTML element as string.
 * @param {string} innerText The innerText of the HTML element as string.
 * @param {string} charSuite Example "H2" become "##", "H3" become "###", "H4" become "####"...
 * @returns
 */
function titleToSymbol(tagName, innerText, charSuite) {
    // get the digit from tagname
    let tabCount = /\d+/.exec(tagName) * 1
    // set the tabulations seperators
    let tabsBefore = new Array(tabCount).fill(charSuite).join('') + ' '
    return {
        type: tagName,
        text: tabsBefore + innerText.trim(),
    }
}

/**
 * Extraction of all titles within the page.
 *
 */
function extractAllTitles() {
    rawArticle += 'TITLES : \n\n';
    rawArticle += '-------- \n\n';

    Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'))
        .map(x =>
            titleToSymbol(x.tagName, x.innerText, '----'))
        .filter(x => x.text.length > 0)
        .forEach(x => rawArticle += '|' + x.type + '|' + x.text + '\n');

    // add separator after titles list
    rawArticle += '\n' + separator + '\n\n';
}

/**
 * Extraction of all readeable content within the page.
 */
function extractTextFromMainBody() {
    rawArticle += 'MAIN CONTENT : \n\n';
    rawArticle += '------------- \n\n';

    // html texts in page
    let htmlTexts = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p'))
        .map(x => {
            return {
                type: x.tagName,
                text: x.innerText.trim(),
            }
        });

    htmlTexts.forEach(line => {
        if (line.type == 'P') {
            let tempText = line.text
            // insert splitter X2 after "linebreaks" OR "ponctuations" or "brackets"
            tempText = tempText.replace(/\r|\n|:|\.{1,}|\?{1,}|!{1,}|\)|\]|\}/gmi, x => x + '<__SPLIT__> <__SPLIT__>')
            // insert splitter X1 after "ponctuations"
            tempText = tempText.replace(/,|;/gmi, x => x + '<__SPLIT__>')
            // insert splitter before "brackets"
            tempText = tempText.replace(/\(|\[|\{/gmi, x => '<__SPLIT__> <__SPLIT__>' + x)
            // insert splitter before words as "pronouns"
            tempText = tempText.replace(/(^\b|\s)(je|tu|il|nous|vous|ils|on)(\b)/gim, x => '<__SPLIT__>' + x)
            // insert splitter before words as "articles"
            tempText = tempText.replace(/(^\b|\s)(à|au|au|aux|de|des|du|du|l\'|la|le|les|un|une)(\b)/gim, x => '<__SPLIT__>' + x)
            // insert splitter before words as "Co-ordinating conjunction"
            tempText = tempText.replace(/(^\b|\s)(mais|où|et|donc|or|ni|car)(\b)/gim, x => '<__SPLIT__>' + x)
            // insert splitter before words as "possessive adjectives"
            tempText = tempText.replace(/(^\b|\s)(mon|ton|son|ma|ta|sa|mes|tes|ses|notre|votre|leur|nos|vos|leurs|mien|tien|sien|leur|miens|tiens|siens|nôtres|vôtres|mienne|tienne|sienne|miennes|tiennes|siennes)(\b)/gim, x => '<__SPLIT__>' + x)
            // insert splitter before words as "prepositions"
            tempText = tempText.replace(/(^\b|\s)(à|après|au|avant|avec|chez|contre|dans|de|depuis|derrière|devant|en|entre|envers|jusqu|malgré|par|pendant|pour|sans|sauf|sous|sur|vers)(\b)/gim, x => '<__SPLIT__>' + x)

            let splits = tempText.split(/<__SPLIT__>/g)
            splits.forEach(split => {
                rawArticle += split + '\n'
            })
        } else {
            let title = '\n\n\n' + titleToSymbol(line.type, line.text, '#').text + ' ' + '\n\n'
            rawArticle += title
        }
    });
    // always display results in console
    rawArticle += '\n\n' + separator + '\n\n';
}

/**
 * Extract portions of text that match regex formula
 * @param {string} titleAsType Example : "ARTICLES", "PRONOUNS"...
 * @param {string} regExFormula Example : "je|tu|il|nous|vous|ils|on"
 */
function extractTextPortion(titleAsType = "ARTICLES", regExFormula = "de|des|du|un|une") {
    rawArticle += titleAsType + ' : \n\n';
    rawArticle += '------------- \n\n';

    let tempText = ""
    let matchs = []
    let regexs = regExFormula.split('|')
    regexs.forEach(regx => {
        // extraction of text portion
        const regex = new RegExp('(\\b)(' + regx + ')(\\b)([^,;.:!?\\r\\n]*)([,;.:!?]*)', 'gmi');
        matchs = matchs.concat(htmlTextsFromPage.match(regex) || ['No data available.'])
    });
    tempText = matchs
        .map(x => x.trim())
        .reduce((acc, val) => {
            if (!acc.includes(val)) {
                acc.push(val)
            }
            return acc
        }, [])
        .sort()
        .join('\n')

    rawArticle += tempText

    // always display results in console
    rawArticle += '\n\n' + separator + '\n\n';
}

function getWordsOccurencesReport() {
    rawArticle += 'WORDS OCCURENCES REPORT' + ' : \n\n';
    rawArticle += '------------- \n\n';

    let blacklist = 'je|tu|il|nous|vous|ils|on|à|au|au|aux|de|des|du|du|l\'|la|le|les|un|une|mais|où|et|donc|or|ni|car|mon|ton|son|ma|ta|sa|mes|tes|ses|notre|votre|leur|nos|vos|leurs|mien|tien|sien|leur|miens|tiens|siens|nôtres|vôtres|mienne|tienne|sienne|miennes|tiennes|siennes|à|après|au|avant|avec|chez|contre|dans|de|depuis|derrière|devant|en|entre|envers|jusqu|malgré|par|pendant|pour|sans|sauf|sous|sur|vers'
    let text = htmlTextsFromPage.toLowerCase()
    let allWords = text.match(/[^,;.:!?\(\)\[\]\{\}"'\r\n\s]*/gmi)
    let occurencesReport = allWords
        .filter(x => x.length > 0)
        .reduce((acc, val) => {
            if (!acc.includes(val)) {
                acc.push(val)
            }
            return acc
        }, [])
        .map(x => {
            let occurences = allWords.filter(y => y == x).length
            return {
                text: x,
                occurences
            }
        })
        .sort((a, b) => b.occurences - a.occurences)


    let formattedReport = occurencesReport
        .filter(x => !blacklist.includes(x))
        .map((x, i) => {
            let rank = (i + 1).toString().padStart(4, '0')
            let spaces = new Array(Math.abs(33 - x.text.length)).join(' ')
            return `${rank} -\t ${x.text} ${spaces} ${x.occurences}`
        })
        .join('\n')

    rawArticle += formattedReport

    // always display results in console
    rawArticle += '\n\n' + separator + '\n\n';

    console.table(occurencesReport)
}


/**
 * Insert destructured data into HTML page with a "pre" tag.
 */
function injectPreInHTML() {
    if (window) {
        let pre = document.createElement("PRE")
        pre.innerText = rawArticle
        pre.style.margin = '1.1rem';
        pre.style.padding = '1.1rem';
        pre.style.paddingTop = '3.1rem';
        pre.style.paddingLeft = '3.1rem';
        pre.style.paddingBottom = '3.1rem';
        pre.style.backgroundColor = 'black';
        pre.style.color = 'lightGray';
        pre.style.fontFamily = '"Lucida Console", "Courier New", monospace';
        pre.style.zIndex = '99999';
        document.body.appendChild(pre)
    }
}


insertHeader()
extractAllTitles()
extractTextFromMainBody()
extractTextPortion("PRONOMS", 'je|tu|il|nous|vous|ils|on')
extractTextPortion("ARTICLES", 'à|au|au|aux|de|des|du|du|l\'|la|le|les|un|une')
extractTextPortion("COORDINATING CONJUNCTIONS", 'mais|o|et|donc|or|ni|car')
extractTextPortion("POSSESIFS", 'mon|ton|son|ma|ta|sa|mes|tes|ses|nos|vos')
extractTextPortion("PREPOSITIONS", 'à|après|au|avant|avec|chez|contre|dans|de|depuis|derrière|devant|en|entre|envers|jusqu|malgré|par|pendant|pour|sans|sauf|sous|sur|vers')
getWordsOccurencesReport()

console.log(rawArticle);
injectPreInHTML()


