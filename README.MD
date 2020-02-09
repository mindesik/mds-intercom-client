# mds-intercom-client

Simple intercom.io client with Promises

## Examples

All parameters described in official documentarion at https://developers.intercom.com/intercom-api-reference/reference#introduction.

All functions returns a Promise with API response.

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

## Testing

```
echo $INTERCOM_TOKEN > .env
yarn install
yarn test
```

## Status

### USERS
- Users

### LEADS
- Leads

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
- Convert a visitor

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
- Submit a data event
- List all data events

### TAGS
- ✅ Create or update a tag
- ✅ Delete a tag
- ✅ Attach a contact
- Attach a conversation
- Tag companies
- Detach a contact
- Detach a conversation
- Untag companies
- ✅ List all tags
