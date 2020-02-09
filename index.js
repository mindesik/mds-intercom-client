const axios = require('axios')

const callResult = promise => {
  return new Promise((resolve, reject) => {
    promise().then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err.response.data)
    })
  })
}

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
   * List all tags
   * https://developers.intercom.com/intercom-api-reference/reference#list-tags-for-an-app
   */
  list() {
    return callResult(_ => {
      return this.client.get('/tags')
    })
  }
}

class Intercom {
  /**
   * 
   * @param {String} apiKey 
   */
  constructor(apiKey) {
    this.apiKey = apiKey
    this.client = axios.create({
      baseURL: 'https://api.intercom.io/',
      timeout: 3000,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    
    this.contacts = new Contacts(this.client)
    this.tags = new Tags(this.client)
  }
}

module.exports = Intercom