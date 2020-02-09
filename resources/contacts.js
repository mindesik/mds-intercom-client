const { callResult } = require('../helpers')

class Contacts {
  constructor(client) {
    this.client = client
  }
  
  /**
   * Create a contact
   * https://developers.intercom.com/intercom-api-reference/reference#create-contact
   * @param {Object} body
   */
  create(body) {
    return callResult(_ => {
      return this.client.post('/contacts', body)
    })
  }
  
  update(id, body) {
    return callResult(_ => {
      return this.client.put(`/contacts/${id}`, body)
    })
  }
  
  /**
   * Retrieve a contact
   * https://developers.intercom.com/intercom-api-reference/reference#get-contact
   * @param {String} id
   */
  retrieve(id) {
    return callResult(_ => {
      return this.client.get(`/contacts/${id}`)
    })
  }
  
  /**
   * Search for contacts
   * https://developers.intercom.com/intercom-api-reference/reference#search-for-contacts
   * @param {Object} body
   */
  search(body) {
    return callResult(_ => {
      return this.client.post('/contacts/search', body)
    })
  }
  
  /**
   * Delete a contact
   * https://developers.intercom.com/intercom-api-reference/reference#delete-contact
   * @param {String} id
   */
  delete(id) {
    return callResult(_ => {
      return this.client.delete(`/contacts/${id}`)
    })
  }
  
  // TODO: detaching tags is not working on intercom end
  /**
   * Attach a tag (Attach a contact)
   * https://developers.intercom.com/intercom-api-reference/reference#tag-contact
   * @param {String} id
   * @param {String} tagId
   */
  attachTag(id, tagId) {
    return callResult(_ => {
      return this.client.post(`/contacts/${id}/tags`, {
        id: tagId,
      })
    })
  }
  
  /**
   * Detach a tag (Detach a contact)
   * https://developers.intercom.com/intercom-api-reference/reference#detach-contact-from-company
   * @param {String} id
   * @param {String} tagId
   */
  detachTag(id, tagId) {
    return this.client.delete(`/contacts/${id}/tags`, {
      id: tagId,
    })
  }
}

module.exports = Contacts