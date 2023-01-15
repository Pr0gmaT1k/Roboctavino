/**
 * Code.gs
 * Roboctavino
 *
 * Created by Pr0gmaT1k on 01/08/2022
 * Copyright (C) 2023  Octava Compañia de Bomberos de Valparaíso
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * Main routine
 */
function main() {
  service = TwitterTools.getService();
  let centralTweets = TwitterTools.getLastTweet('CentralCBV', 2) // SHOULD BE CONSTANT
  if (centralTweets.length > 0) {
    let robotTweet = TwitterTools.getLastTweet('Zbiouw', 3) // SHOULD BE CONSTANT
    let alreadyQuoted = [... new Set(robotTweet.map(x => x['referenced_tweets'].map(y => y['id'])).flat())]
    let filtered = centralTweets.filter(x => alreadyQuoted.includes(x['id']) == false && x.text.split("*").length == 3).reverse()
    for (const toTweet of filtered) {
      let datas = extractDataFrom(toTweet.text)
      Logger.log(datas)
      TwitterTools.publish(datas[0], toTweet['id'], [TwitterTools.generateMediaIdsFrom(datas[1], datas[2], datas[3], datas[4], MapsTools.getMapImageFrom(datas[7]), slideID)]);
    }
  }
}

/**
 * Format the central tweet to Octava tweet and extract datas
 * Lack of description about the returned datas
 */
function extractDataFrom(text) {
  let splitted = text.split(' * ')
  // Units
  let is81 = splitted[0].includes('81')
  let is82 = splitted[0].includes('82')
  let otherUnits = splitted[0].split(' ').slice(0, -1).filter(x => (x != '81' && x != '82'))
  let isAlone = otherUnits.length == 0
  let isMoreThanOne = otherUnits.length > 1
  let lastUnit =  isMoreThanOne ? ' y ' + otherUnits.pop() : ''
  var unitTweet = is81 && is82 ? 'Nuestras unidades 81 y 82 ' : 'Nuestra unidad ' + (is81 ? '81' : '' + is82 ? '82' : '')
  var prezUnit = is81 && is82 ? 'Unidades 81, 82' : 'Unidad ' + (is81 ? '81' : '' + is82 ? '82' : '')
  if(is81 || is82){
    unitTweet += isAlone ? (is81 && is82 ? ' se dirigen ': ' se dirige ') : (' junto a ' + (isMoreThanOne ? ('las unidades ' + otherUnits.join(', ') + lastUnit) : ('la unidad ' + otherUnits.join(''))) + ' se dirige ')
    prezUnit += isAlone ? '' : ((isMoreThanOne ? (', ' + otherUnits.join(', ') + lastUnit) : ('y ' + otherUnits.join(''))))
  } else {
    unitTweet = isMoreThanOne ? 'Las unidades ' + otherUnits.join(', ') + lastUnit + ' se dirigen ' : 'La unidad ' + otherUnits.join('') + ' se dirige '
    prezUnit = isMoreThanOne ? 'Unidades ' + otherUnits.join(', ') + lastUnit : 'Unidad ' + otherUnits.join('')
  }
// Adress
var adress = ' en ' + titleCase(splitted[1])
// Emergency name
let key = splitted[2].split(' https')[0].replace('X-1  ', '')
let emergency = emergencyKeysTable[key][0]
// Hashtag
let tag = emergencyKeysTable[key][3]
// Text's Tweet
let tweet = "🚒 " + unitTweet + emergency + adress + " 🚒\n" + tag
return [tweet, prezUnit, titleCase(splitted[1]), emergencyKeysTable[key][2], emergencyKeysTable[key][1], is81, is82, splitted[2].split(' ').at(-1)]
}

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}


function doGet() {
  return HtmlService.createHtmlOutput(ScriptApp.getService().getUrl());
}
