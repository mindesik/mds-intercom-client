const { callResult } = require('../helpers')

class Visitors {
  constructor(client) {
    this.client = client
  }
  
  /**
   * Convert a visitor
   * https://developers.intercom.com/intercom-api-reference/reference#convert-a-visitor-to-a-user
   * @param {Object} visitor 
   * @param {Object} user 
   * @param {String} type 
   */
  convert(visitor, user, type) {
    return callResult(_ => {
      return this.client.post('/visitors/convert', {
        visitor: visitor,
        user: user,
        type: type,
      })
    })
  }
}

module.exports = Visitors