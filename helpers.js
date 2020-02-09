module.exports = {
  callResult: promise => {
    return new Promise((resolve, reject) => {
      promise().then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err.response.data)
      })
    })
  }
}