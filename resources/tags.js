const { callResult } = require('../helpers')

class Tags {
  constructor(client) {
    this.client = client
  }
  
  /**
   * Create or update a tag
   * https://developers.intercom.com/intercom-api-reference/reference#create-and-update-tags
   * @param {Obect} body
   */
  create(body) {
    return callResult(_ => {
      return this.client.post('/tags', body)
    })
  }
  
  /**
   * Delete a tag
   * https://developers.intercom.com/intercom-api-reference/reference#delete-a-tag
   * @param {String} id
   */
  delete(id) {
    return callResult(_ => {
      return this.client.delete(`/tags/${id}`)
    })
  }
  
  /**
   * List all tags
   * https://developers.intercom.com/intercom-api-reference/reference#list-tags-for-an-app
   */
  list() {
    return callResult(_ => {
      return this.client.get('/tags')
    })
  }
}

module.exports = Tags