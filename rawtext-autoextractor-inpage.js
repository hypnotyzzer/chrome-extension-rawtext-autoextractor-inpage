//console.clear();
let commonWordsDictionnary = ''
let separator = '===================================================================================';
let rawArticle = '';
let htmlTextsFromPage = ''

// function findHighestElementArea(htmlElement) {
//     let elm = Array.from(htmlElement)
//         //.filter(x=>x.tagName != 'SCRIPT')
//         //.map(x=>x.getBoundingClientRect().width * x.getBoundingClientRect().height).sort((a,b)=>b-a)
//         .reduce((max, elm) => {
//             let area1 = elm.getBoundingClientRect().width * elm.getBoundingClientRect().height
//             let area2 = max ? max.getBoundingClientRect().width * max.getBoundingClientRect().height : 0
//             let highest = area1 > area2 ? elm : area1 < area2 ? max : elm
//             max = highest
//             return max
//         }, null)
//     findHighestElementArea(elm)
//     return elm
// }

function setCommonWordsDictionnary() {
    // set Common Words Dictionnary
    return commonWordsDictionnary = getDictionnary() || []
}

function extractPageText() {
    // html texts in page
    return htmlTextsFromPage = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p'))
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
    rawArticle += 'MAIN CONTENT (RAW) : \n\n';
    rawArticle += '------------- \n\n';

    // html texts in page
    let htmlTexts = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p'))
        .map(x => {
            return {
                type: x.tagName,
                text: x.innerText.trim(),
            }
        })
        .filter(x => x.text.length > 0)

    rawArticle += htmlTexts.map(x => {
        let t = x.type == 'P' ? x.text : titleToSymbol(x.type, x.text, '#').text
        return t
    })
        .join('\n')
        .replace(/:|\.{1,}|;{1,}|\?{1,}|!{1,}|\)|\]|\}/gmi, x => x + '\n')
        .replace(/[^\n\r]+/gmi, x => x + '\n')


    // always display results in console
    rawArticle += '\n\n' + separator + '\n\n';

    rawArticle += 'MAIN CONTENT (SPLIT) : \n\n';
    rawArticle += '------------- \n\n';

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
        .filter(x => blacklist.includes(x) == false)
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

function getWordsOccurencesReportHTML() {

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

    let tableHtml = `
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;width:50%;margin:auto;padding:1.2rem;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-10ea{background-color:#000000;border-color:inherit;color:#000000;
  font-family:"Lucida Console", Monaco, monospace !important;;text-align:center;vertical-align:top}
.tg .tg-n5dg{background-color:#ffccc9;border-color:inherit;font-family:"Lucida Console", Monaco, monospace !important;;
  text-align:center;vertical-align:top}
.tg .tg-igmv{background-color:#e2e2e2;border-color:inherit;font-family:"Lucida Console", Monaco, monospace !important;;
  text-align:center;vertical-align:top}
.tg .tg-xhg5{border-color:inherit;font-family:"Lucida Console", Monaco, monospace !important;;text-align:center;vertical-align:top}
.tg .tg-5nj1{border-color:inherit;font-family:"Lucida Console", Monaco, monospace !important;;text-align:left;vertical-align:top}
</style>
<table id="words-occurences-report-html" class="tg">
<thead>
  <tr>
    <th class="tg-n5dg" colspan="3" width="40%">STRONG WORDS</th>
    <th class="tg-xhg5" width="20%">COUNT_ROWS_ITEMS</th>
    <th class="tg-igmv" colspan="3" width="40%">COMMON WORDS</th>
  </tr>
</thead>
<tbody>
  <tr style="border-bottom: 7px solid black;">
    <td class="tg-n5dg">Word <button id="copy-all-words">Copy all</button></td>
    <td class="tg-n5dg">Occurences</td>
    <td class="tg-n5dg">Action</td>
    <td class="tg-10ea"><span style="color:#FFF">Rank</span></td>
    <td class="tg-igmv">Action</td>
    <td class="tg-igmv">Word</td>
    <td class="tg-igmv">Occurences</td>
  </tr>
  {{ROWS_ITEMS}}
</tbody>
</table>`

    let emptyTableRow = `
<tr>
    <td class="tg-n5dg">ROW_1</td>
    <td class="tg-n5dg">ROW_2</td>
    <td class="tg-n5dg"><button class="btn-words" data-text="ROW_1" data-occurences="ROW_2" data-action="add">➡</button></td>
    <td class="tg-10ea"><span style="color:#FFF">ROW_3</span></td>
    <td class="tg-igmv"><button class="btn-words" data-text="ROW_4" data-occurences="ROW_5" data-action="remove">❌</button></td>
    <td class="tg-igmv">ROW_4</td>
    <td class="tg-igmv">ROW_5</td>
</tr>`

    // inject full table with data
    let strongWords = occurencesReport.filter(x => commonWordsDictionnary.includes(x.text) == false)
    let commonWords = occurencesReport.filter(x => commonWordsDictionnary.includes(x.text) == true)
    let htmlRowsAsText = ''
    let count = Math.max(commonWords.length, strongWords.length)
    for (let i = 0; i < count; i++) {
        const commonWord = commonWords[i] || { text: '', occurences: '' };
        const strongWord = strongWords[i] || { text: '', occurences: '' };
        let newRow = emptyTableRow
            .replace(/ROW_1/g, strongWord.text).replace(/ROW_2/g, strongWord.occurences)
            .replace(/ROW_3/g, i + 1)
            .replace(/ROW_4/g, commonWord.text).replace(/ROW_5/g, commonWord.occurences)
        htmlRowsAsText += newRow + '\n'
    }

    tableHtml = tableHtml.replace('{{ROWS_ITEMS}}', htmlRowsAsText).replace('COUNT_ROWS_ITEMS', count)

    // inject HTML
    let div = document.createElement('DIV')
    div.id = 'getWordsOccurencesReportHTML'
    div.innerHTML = tableHtml
    document.body.appendChild(div)

    // btns to move words in table
    let btns = document.querySelectorAll('.btn-words')
    btns.forEach(elm => {
        elm.addEventListener('click', (e) => {
            if (e.currentTarget.dataset.action == "add") {
                // add the word to the "common list"
                commonWordsDictionnary.push(e.currentTarget.dataset.text)
            } else if (e.currentTarget.dataset.action == "remove") {
                // remove the word from the "common list"
                commonWordsDictionnary = commonWordsDictionnary.filter(x => x != e.currentTarget.dataset.text)
            }
            // save localeStorage
            console.log('✅ for GITHUB => save NEW commonWordsDictionnary', JSON.stringify(commonWordsDictionnary))
            // remove table to refresh it
            var element = document.getElementById("words-occurences-report-html");
            element.parentNode.removeChild(element);
            // call refresh
            getWordsOccurencesReportHTML()
        })
    });

    // btn for copy all to clipboard
    let btnCopyAll = document.querySelector('#copy-all-words')
    btnCopyAll.addEventListener('click', (e) => {
        let allWords = Array.from(document.querySelectorAll("#words-occurences-report-html > tbody > tr:not(:first-child) > td:nth-child(1)"))
            .map(x => x.innerText)
            .join('\n')
        let txtarea = document.createElement('TEXTAREA')
        document.body.appendChild(txtarea)
        txtarea.value = allWords
        txtarea.style.bottom = 0
        txtarea.style.left = '999px'
        txtarea.select();
        txtarea.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");
        document.body.removeChild(txtarea)
        console.log('💌 All words are in the clipboard !')
    })

    console.table(occurencesReport)
}


/**
 * Useful for easier & faster reading of the native html content
 * Opacity of common words are lowered
 */
function mutateHtmlTextsOpacity() {
    // rawArticle += 'STRONG WORDS SENTENCES (filter by common words dictionary)' + ' : \n\n';
    // rawArticle += '------------- \n\n';

    let outputText = ''
    let elms = Array.from(document.querySelectorAll('a,b,blockquote,button,dd,del,dt,em,h1,h2,h3,h4,h5,h6,i,ins,label,li,mark,p,small,span,strong,sub,sup,td,th'))
    elms.forEach(elm => {
        let words = elm.innerText.split(/\s/g)
            .map(x => {
                if (commonWordsDictionnary.includes(x.toLowerCase()) == true) {
                    return '<span data-trigger="orasyo-low" style="opacity:0.44;">' + x.trim() + '</span>'
                } else {
                    return '<span data-trigger="orasyo-high">' + x + '</span>'
                }
            })

        elm.innerHTML = words.join(' ')

        // write in "pre"
        // outputText += Array.from(elm.children)
        //     .filter(x => x.dataset.trigger == 'orasyo-high')
        //     .map(x => x.innerText)
        //     .reduce((acc, val) => {
        //         if (acc.includes(val))
        //             acc.push(val)
        //         return acc
        //     }, [])
        //     .join(' ') + '\n';
    })

    // rawArticle += outputText

    // // always display results in console
    // rawArticle += '\n\n' + separator + '\n\n';
}


/**
 * Insert destructured data into HTML page with a "pre" tag.
 */
function injectPreInHTML() {
    if (window) {
        let pre = document.createElement("PRE")
        pre.id = 'orasyo-rawArticle'
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
        pre.scrollIntoView({ behavior: 'smooth' })
    }
}


/**
 * Insert destructured data into HTML page with a "pre" tag.
 */
function injectButtonInHTML() {
    if (window) {
        try {
            let btn = document.createElement("button")
            btn.innerText = 'Get Orasyo report'
            btn.style.position = 'fixed';
            btn.style.bottom = '33px';
            btn.style.right = '13px';
            btn.style.padding = '0.33rem';
            btn.style.backgroundColor = 'black';
            btn.style.color = 'dodgerblue';
            btn.style.fontFamily = '"Lucida Console", "Courier New", monospace';
            btn.style.zIndex = '99999';
            btn.style.opacity = .33;
            btn.onmouseover = () => {
                btn.style.opacity = 1
            }
            btn.onmouseleave = () => {
                btn.style.opacity = .33
            }
            btn.onclick = () => {
                setCommonWordsDictionnary()
                extractPageText()
                insertHeader()
                extractAllTitles()
                extractTextFromMainBody()
                extractTextPortion("PRONOMS", 'je|tu|il|nous|vous|ils|on')
                extractTextPortion("ARTICLES", 'à|au|au|aux|de|des|du|du|l\'|la|le|les|un|une')
                extractTextPortion("COORDINATING CONJUNCTIONS", 'mais|o|et|donc|or|ni|car')
                extractTextPortion("POSSESIFS", 'mon|ton|son|ma|ta|sa|mes|tes|ses|nos|vos')
                extractTextPortion("PREPOSITIONS", 'à|après|au|avant|avec|chez|contre|dans|de|depuis|derrière|devant|en|entre|envers|jusqu|malgré|par|pendant|pour|sans|sauf|sous|sur|vers')
                // getWordsOccurencesReport()
                mutateHtmlTextsOpacity()
                console.log(rawArticle);

                injectPreInHTML()
                getWordsOccurencesReportHTML()
            }
            document.body.appendChild(btn)
        } catch (error) {
            console.log('💥', '[ error in injectButtonInHTML() ] : ', error)
            alert.log('[ 💥 error in injectButtonInHTML() ] : \n\n' + error)
        }
    }
}



injectButtonInHTML()


