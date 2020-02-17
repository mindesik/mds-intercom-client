# mds-intercom-client

[![wercker status](https://app.wercker.com/status/cfad82b56def81730c3d72a1f27eaf30/s/ "wercker status")](https://app.wercker.com/project/byKey/cfad82b56def81730c3d72a1f27eaf30)

Simple intercom.io client with Promises for nodejs.

This library supports Intercom API v2.0, all parameters described in official documentarion at https://developers.intercom.com/intercom-api-reference/reference.

Functions returns a Promise with API response.

## Examples

```javascript
const Intercom = require('mds-intercom-client')
const intercom = new Intercom(apiKey)

// Create a contact
intercom.contacts.create({
  type: 'lead',
  email: 'john@example.com',
  name: 'John',
}).then(contact => {
  console.log(contact)
}).catch(err => {
  console.error(err)
})
```

## Status

### CONTACTS
- ✅ Create a contact
- ✅ Retrieve a contact
- ✅ Update a contact
- ✅ Delete a contact
- Merge two contacts
- ✅ Search for contacts
- List all contacts
- List attached companies
- List attached tags

### VISITORS
- Retrieve a visitor
- Update a visitor
- Delete a visitor
- ✅ Convert a visitor

### COMPANIES
- Create or update a company
- Retrieve a company
- Attach a contact
- Detach a contact
- List all companies
- Scroll over all companies
- List attached contacts

### DATA ATTRIBUTES
- Create a data attribute
- Update a data attribute
- List all data attributes

### DATA EVENTS
- ✅ Submit a data event
- ✅ List all data events

### TAGS
- ✅ Create or update a tag
- ✅ Delete a tag
- ✅ Attach a contact
- Attach a conversation
- Tag companies
- ✅ Detach a contact
- Detach a conversation
- Untag companies
- ✅ List all tags

## Testing

Create `.env` file with your Intercom application token and run `yarn test`:

```
echo $INTERCOM_TOKEN > .env
yarn install
yarn test
```
