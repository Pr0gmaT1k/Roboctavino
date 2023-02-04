/**
 * TwitterTools.gs
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


class TwitterTools {
  /**
  * Get last tweet that include
  * from: Case sensitive @Account
  * lastMin: minutes range
  */
  static getLastTweet(from, lastMin) {
   var date = new Date();
   date.setMinutes(date.getMinutes() - lastMin)
   var url = 'https://api.twitter.com/2/tweets/search/recent?tweet.fields=referenced_tweets&start_time=' + encodeURIComponent(date.toISOString()) + '&query=' + encodeURIComponent('from:' + from);
    var response = service.fetch(url);
   return JSON.parse(response.getContentText())['data'] || [];
}

  /**
  * Publish a tweet
  * text: the tweet to text
  * id: the reference tweet to quote
  */
  static publish(text, id, media_ids) {
   var url = 'https://api.twitter.com/2/tweets';
   var payload = {
     'text': text,
     'quote_tweet_id': id,
     'media': { 'media_ids': media_ids }
    }
    var response = service.fetch(url, {
      method: 'post',
     contentType: "application/json",
     muteHttpExceptions: true,
     payload: JSON.stringify(payload)
    });
    var result = JSON.parse(response.getContentText());
  }

  /**
  * Upload an image to twitter and get a media ids to tweet it later
  * imageUrl: the url of the image to upload
  */
  static upload(imageUrl) {
   var response = UrlFetchApp.fetch(imageUrl);
   var blob = response.getBlob();
   var bytes = blob.getBytes();
   var base64String = Utilities.base64Encode(bytes);
   var url = 'https://upload.twitter.com/1.1/media/upload.json';
   var payload = {
     "media_data": base64String
   }
   var response = service.fetch(url, {
     method: 'post',
     payload: payload
   });
   var result = JSON.parse(response.getContentText());
   return result['media_id_string']
  }

  static generateMediaIdsFrom(units, addr, incident, color, is81, is82, background, slideID) {
   SlidesTools.modify(units, addr, incident, color, is81, is82, background, slideID)
   return TwitterTools.upload(SlidesTools.generateScreenshots(slideID))
  }

  /**
  * Reset the authorization state, so that it can be re-tested.
  */
  static reset() {
   var service = getService();
   service.reset();
  }

  /**
  * Configures the service.
  */
  static getService() {
   return OAuth1.createService('Twitter')
     .setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
     .setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
     .setAuthorizationUrl('https://api.twitter.com/oauth/authorize')
     .setConsumerKey(CONSUMER_KEY)
     .setConsumerSecret(CONSUMER_SECRET)
     .setAccessToken(TOKEN, TOKEN_SECRET)
     .setCallbackFunction('authCallback')
  }
}
