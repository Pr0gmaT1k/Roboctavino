/**
 * SlidesTools.gs
 * Roboctavino
 *
 * Created by Pr0gmaT1k on 13/01/2023
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


class SlidesTools {
  static generateScreenshots(presentationId) {
    let presentation = SlidesApp.openById(presentationId)
    var baseUrl = 'https://slides.googleapis.com/v1/presentations/{presentationId}/pages/{pageObjectId}/thumbnail';
    var parameters = {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
      contentType: 'application/json',
      muteHttpExceptions: true,
    };

    var screenshots = [];
    var slides = presentation.getSlides().forEach(function (slide, index) {
     Logger.log(presentationId)
     Logger.log(slide.getObjectId())
     var url = baseUrl.replace('{presentationId}', presentationId).replace('{pageObjectId}', slide.getObjectId());
     var response = JSON.parse(UrlFetchApp.fetch(url, parameters));
     var blob = UrlFetchApp.fetch(response.contentUrl).getBlob();
     DriveApp.createFile(blob).setName(Date.now().toString() + '.jpg');
     screenshots.push(response.contentUrl);
    });
    return screenshots;
  }

  static modify(units, addr, incident, color, is81, is82, background, presentationId) {
    Logger.log([units, addr, incident, color, is81, is82, background, presentationId])
    let presentation = SlidesApp.openById(presentationId)
    let twitterPage = presentation.getSlides()[0]
    twitterPage.getBackground().setPictureFill(background)
    let unitImage = twitterPage.getPageElementById(UNIT_IMAGE_ID).asImage()
    let mapImage = twitterPage.getPageElementById(MAP_IMAGE_ID).asImage()
    let unitShape = twitterPage.getPageElementById(UNIT_SHAPE_ID).asShape()
    let keyShape = twitterPage.getPageElementById(KEY_SHAPE_ID).asShape()
    let adressShape = twitterPage.getPageElementById(ADRESS_SHAPE_ID).asShape()
    let socialShape = twitterPage.getPageElementById(SOCIAL_SHAPE_ID).asShape()
    let unitImageBlob = is81 || is82 ? is81 ? IMAGE_81 : IMAGE_82 : IMAGE_EMPTY_TRANSPARENT
    unitImage.replace(unitImageBlob, true)
    mapImage.replace(is81 || is82 ? background : IMAGE_EMPTY_TRANSPARENT, true)
    unitShape.getFill().setSolidFill(color)
    keyShape.getFill().setSolidFill(color)
    adressShape.getFill().setSolidFill(color)
    socialShape.getFill().setSolidFill(color)
    unitShape.getText().setText(units)
    keyShape.getText().setText(incident)
    adressShape.getText().setText(addr)
    presentation.saveAndClose()
    //presentation.getSlides()[0].getPageElements().forEach(function (pageElement, index) {
      //Logger.log(pageElement.getObjectId())
      //Logger.log(pageElement.getPageElementType())
    //})
  }
}
