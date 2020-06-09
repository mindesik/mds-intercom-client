module.exports = {
  callResult: promise => {
    return new Promise((resolve, reject) => {
      promise().then(response => {
        return resolve(response.data)
      }).catch(err => {
        if (err.response) {
          if (err.response.data) {
            return reject(err.response.data)
          }
        }
        
        return reject(err)
      })
    })
  }
}