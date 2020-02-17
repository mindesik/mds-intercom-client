const { callResult } = require('../helpers')
const qsStringify = require('querystring').stringify

class Events {
  constructor(client) {
    this.client = client
  }
  
  /**
   * Submit a data event
   * https://developers.intercom.com/intercom-api-reference/reference#submitting-events
   * @param {Obect} body
   */
  submit(body) {
    return callResult(_ => {
      return this.client.post('/events', body)
    })
  }
  
  /**
   * List all data events
   * https://developers.intercom.com/intercom-api-reference/reference#list-user-events
   * @param {Object} query 
   */
  list(query) {
    let queryString = qsStringify(query)
    return callResult(_ => {
      return this.client.get(`/events?${queryString}`)
    })
  }
}

module.exports = Events