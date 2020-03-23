require('dotenv').config()
const assert = require('assert')
const { describe, it } = require('mocha')

const Intercom = require('../index')
const intercom = new Intercom(process.env.INTERCOM_TOKEN)

const generateData = _ => {
  let timestamp = Date.now()
  
  return {
    tagname: `${timestamp}_test`,
    email: `${timestamp}@example.com`,
  }
}

describe('Contacts', function() {
  this.timeout(30000)
  let { tagname, email } = generateData()
  let email2 = `2_${email}`
  let tagId = null
  let contactId = null
  let contactId2 = null
  
  it('should create a contact (lead)', function(done) {
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
    }).then(tag => {
      assert.equal(tag.id, tagId)
      return intercom.contacts.detachTag(contactId, tagId)
    }).then(tag => {
      assert.equal(tag.id, tagId)
      return intercom.tags.delete(tagId)
    }).then(_ => {
      done()
    }).catch(err => {
      console.error(err)
      done(err)
    })
  })
  
  it('should create a contact (user)', function(done) {
    intercom.contacts.create({
      name: `Test 2`,
      role: `user`,
      email: email2,
    }).then(contact =>{
      assert.equal(contact.email, email2)
      contactId2 = contact.id
      done()
    }).catch(done)
  })
  
  it('should merge two contacts (from lead into user)', function(done) {
    intercom.contacts.merge(contactId, contactId2).then(contact => {
      assert.equal(contact.id, contactId2)
      done()
    }).catch(done)
  })
  
  it('should delete a contact (user)', function(done) {
    intercom.contacts.delete(contactId2).then(contact => {
      assert.equal(contact.id, contactId2)
      done()
    }).catch(done)
  })
})

describe('Tags', function() {
  this.timeout(30000)
  let { tagname } = generateData()
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

describe('Events', function() {
  let { email } = generateData()
  
  it('should create a contact', function(done) {
    intercom.contacts.create({
      name: `Test`,
      role: `user`,
      email: email,
    }).then(contact =>{
      assert.equal(contact.email, email)
      done()
    }).catch(done)
  })
  
  it('should submit an event', function(done) {
    intercom.events.submit({
      event_name : 'test-event',
      created_at: Math.round(Date.now()/1000),
      email: email,
    }).then(result => {
      done()
    }).catch(done)
  })
  
  it('should list an events', function(done) {
    intercom.events.list({
      type: 'user',
      email: email,
    }).then(result => {
      assert.ok(result.events.length > 0)
      assert.equal(result.events[0].email, email)
      done()
    }).catch(done)
  })
})
