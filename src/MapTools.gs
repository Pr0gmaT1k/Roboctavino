/**
 * MapTools.gs
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


class MapsTools {
  /**
  * Returns the redirect location of a url.
  *
  * @param {string} input The source URL being redirected.
  * @return The destination location/URL.
  * @customfunction
  */
  static getRedirectLocation(input) {
    try { if (!validator.isURL(input)) return "INVALID_URL"
    } catch (err) { console.log(err) }
    if (input == null || input == undefined || input.toString().includes("@") || !input.toString().includes(".")) return "INVALID_URL"
    let response
    try {
      response = UrlFetchApp.fetch(input, {
        muteHttpExceptions: true,
        followRedirects: false,
        validateHttpsCertificates: false
      })
    } catch (error) {
     console.log(error)
     return error.toString()
    }
    if (/3\d\d/.test(response.getResponseCode())) {
     return response.getAllHeaders().Location
    } else {
     return "NO_REDIRECTS_FOUND"
    }
  }

  static getMapImageFrom(cbvMapLink) {
    let finalLink = MapsTools.getRedirectLocation(cbvMapLink)
    let coords = finalLink.split('query=').pop().split('%2C')
    return Maps.newStaticMap().setSize(1600, 900).setCenter(coords[0], coords[1]).addMarker(coords[0], coords[1]).setZoom(15).getBlob()
  }
}
