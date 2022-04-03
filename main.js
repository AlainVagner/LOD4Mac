const fs = require('fs')
const ejs = require('ejs')
const cheerio = require('cheerio')
const parser = require('xml2json')
const array_unique = require('lodash.uniq')
const debug = false

// get the latest folder with the data coming from lod-extract
const srcDir = fs.readdirSync('.').filter(e => { return e.match(/-lod-opendata/) })
if (srcDir.length == 0) {
  console.error('Missing data, please run `npm install`')
  process.exit(1)
}
const src = srcDir[0] + '/json'

// get the latest word list from data.public.lu
const wlFile = fs.readdirSync('./data/').filter(e => { return e.match(/-lod-wl.xml/) })
if (wlFile.length == 0) {
  console.error('Missing data, please save the latest lod word list into ./data')
  process.exit(1)
}
const wl = parser.toJson(fs.readFileSync('./data/' + wlFile[0]), { 'object': true })
const wordsList = wl['lod-wl']['item']

function normalizeArray(a) {
  if (!Array.isArray(a)) {
    a = [a]
  }
  return a
}

let index = {}

// build the word index
wordsList.forEach(item => {
  let graphie = item['graphie']

  if (graphie['$t'] !== undefined) {
    graphie = [graphie['$t'], graphie['ouni-n']]
  } else {
    graphie = [graphie]
  }

  if (item['lod-artikel'] !== undefined) {
    normalizeArray(item['lod-artikel']).map(e => { return e.id }).forEach(id => {
      if (index[id] === undefined) {
        index[id] = graphie
      } else {
        index[id] = index[id].concat(graphie)
      }
    })
  }
})

Object.keys(index).forEach(key => {
  index[key] = array_unique(index[key])
})

let allArticles = []

fs.readdirSync(src).forEach(file => {
  allArticles.push(require('./' + src + '/' + file))
});

let articlesNotFound = 0

// when debug is true, we generate only a few words
const allowList = ['STOUSSEN1', 'ZWECK1', 'SINN1', 'RISEG1', 'FENNEF1', 'SEIER2', 'DOMAT1', 'ECH1', 'GEINT1', 'MEE2', 'ZWAR1', 'ENG1', 'DAJEE1', 'DAITSCHLAND1', 'REIMECH1', 'UELZECHT1']


allArticles = allArticles.map(article => {

  if (!debug || allowList.includes(article['lod:meta']['lod:id'])) {
    const id = article['lod:meta']['lod:id']
    console.log(id)
    const audioLink = '<a class="audio" href="https://www.lod.lu/audio/' + id.toLowerCase() + '.mp3">lauschteren</a>'


    try { // manage the case where the definition has not been crawled
      const $ = cheerio.load(fs.readFileSync('./data/crawled/' + id + '.html'))
      let desc = $('.artikel')

      // description cleanup
      desc.find('[style]').removeAttr('style')
      desc.find('[onclick]').removeAttr('onclick')

      desc.find('div.ftm-buttons').remove() // remove sharing buttons
      desc.find('a').replaceWith(function () { // remove links on all words
        return $(this).contents();
      });

      desc.find('img[title="Gebäerdesprooch"]').replaceWith(function () { // replace sign language buttons with a link
        const href = $(this).next().find('iframe[title="vimeo-player"]').attr('src')
        if (href !== undefined) {
          return $('<a class="sign-language" href="' + href + '">Gebäerdesprooch</a>');
        } else {
          return '';
        }
      });
      desc.find('iframe').remove() // videos
      desc.find('#audiobutton').replaceWith(function () { // replace audio buttons with external links
        return $(audioLink);
      });
      desc.find('span.info_icon').replaceWith(function () { // replace audio buttons with external links
        return $('<span class="info_icon" aria-hidden="true">ℹ️ </span><span class="sr-only">Informatioun</span>');
      });
      if (desc.find('#ipa').text().trim().length !== 0) { // short version of IPA available in the panel
        const klass = ($('.klass + .klass').length !== 0)?$('.klass + .klass'):$('.klass') // manage case when multiple .klass in a def
        klass.prepend($(' <span class="ipa"> | ' + desc.find('#ipa').text() + ' | </span> ')) 
      }

      const invalidIds = ['ipa', 'op', 'zou', 'sprangop'] // remove duplicate ids
      invalidIds.forEach((id) => {
        desc.find('#'+id).addClass(id).removeAttr('id')
      })

      desc.find('.adress.mentioun_adress').attr('role', 'heading').attr('aria-level', '1')

      desc = desc.html().replace(/&nbsp;/g, ' ') // FIXME: html entities are not accepted in the xml output.

      const title = (article['lod:article']['$text']) ? article['lod:article']['$text'] : article['lod:article']['lod:item-adresse']['$text']

      let idx = index[id]
      if (!idx.includes(title)) {
        idx.push(title)
      }

      return {
        id: id,
        title: title,
        desc: desc,
        index: idx
      }
    } catch (e) {
      console.log('not found: ' + id)
      articlesNotFound++
      return undefined;
    }
  }
})
allArticles = allArticles.filter(f => { return f !== undefined })
ejs.renderFile('./main.ejs', { allArticles: allArticles }, function (err, str) {
  if (err !== null) {
    console.error(err)
    process.exit(1)
  }
  fs.writeFileSync('./data/lod.xml', str)
});

ejs.renderFile('./test.ejs', { allArticles: allArticles }, function (err, str) {
  if (err !== null) {
    console.error(err)
    process.exit(1)
  }
  fs.writeFileSync('./data/test.html', str)
});


console.error('Articles Not Found:', articlesNotFound)