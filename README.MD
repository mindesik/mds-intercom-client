# mds-intercom-client

## Usage

All functions returns a Promise

```javascript
const Intercom = require('mds-intercom-client')
const intercom = new Intercom(apiKey)

// Create a contact
intercom.contacts.create({
  type: 'lead',
  email: 'john@example.com',
  name: 'John',
})

// List tags
intercom.tags.list()

// Attach a tag
intercom.contacts.attachTag(contactId, tagId)

// Detach a tag
intercom.contacts.detachTag(contactId, tagId)

```