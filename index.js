const axios = require('axios')
const Contacts = require('./resources/contacts')
const Tags = require('./resources/tags')
const Visitors = require('./resources/visitors')
const Events = require('./resources/events')

class Intercom {
  /**
   * 
   * @param {String} apiKey 
   */
  constructor(apiKey) {
    this.apiKey = apiKey
    this.client = axios.create({
      baseURL: 'https://api.intercom.io/',
      timeout: 5000,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    
    this.contacts = new Contacts(this.client)
    this.tags = new Tags(this.client)
    this.visitors = new Visitors(this.client)
    this.events = new Events(this.client)
  }
}

module.exports = Intercom