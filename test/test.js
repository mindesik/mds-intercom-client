require('dotenv').config()
const assert = require('assert')
const { describe, it } = require('mocha')

const Intercom = require('../index')
const intercom = new Intercom(process.env.INTERCOM_TOKEN)

describe('Tags', function() {
  this.timeout(30000)
  let timestamp = Date.now()
  let tagname = `${timestamp}_test`
  let tagId = null
  
  it('shoud create a tag', function(done) {
    intercom.tags.create({
      name: tagname,
    }).then(tag => {
      tagId = tag.id
      assert.equal(tag.name, tagname)
      done()
    }).catch(done)
  })
  
  it('should list all tags', function(done) {
    intercom.tags.list().then(response => {
      assert.ok(response.data.length > 0)
      done()
    }).catch(done)
  })
  
  it('should delete a tag', function(done) {
    intercom.tags.delete(tagId).then(tag => {
      done()
    }).catch(done)
  })
})

describe('Contacts', function() {
  this.timeout(30000)
  let timestamp = Date.now()
  let tagname = `${timestamp}_test`
  let tagId = null
  let email = `${timestamp}@example.com`
  let contactId = null
  
  it('should create a contact', function(done) {
    intercom.contacts.create({
      name: `Test`,
      role: `lead`,
      email: email,
    }).then(contact =>{
      assert.equal(contact.email, email)
      contactId = contact.id
      done()
    }).catch(done)
  })
  
  it('should retrieve a contact', function(done) {
    intercom.contacts.retrieve(contactId).then(contact => {
      assert.equal(contact.id, contactId)
      assert.equal(contact.email, email)
      done()
    }).catch(done)
  })
  
  it('should search a contacts', function(done) {
    intercom.contacts.search({
      query: {
        field: `email`,
        operator: `=`,
        value: email,
      },
    }).then(results => {
      assert.equal(typeof results.data, 'object')
      done()
    }).catch(done)
  })
  
  it('should update a contact', function(done) {
    intercom.contacts.update(contactId, {
      name: `Test updated`,
    }).then(contact => {
      assert.equal(contact.id, contactId)
      assert.equal(contact.name, `Test updated`)
      done()
    }).catch(done)
  })
  
  it('should attach a tag', function(done) {
    intercom.tags.create({
      name: tagname,
    }).then(tag => {
      tagId = tag.id
      return intercom.contacts.attachTag(contactId, tagId)
    // TODO: detaching tags is not working on intercom end
    // }).then(_ => {
      // return intercom.contacts.detachTag(contactId, tagId)
    }).then(tag => {
      assert.equal(tag.id, tagId)
      return intercom.tags.delete(tagId)
    }).then(_ => {
      done()
    }).catch(done)
  })
  
  it('should delete a contact', function(done) {
    intercom.contacts.delete(contactId).then(contact => {
      assert.equal(contact.id, contactId)
      done()
    }).catch(done)
  })
})