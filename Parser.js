const fs = require('fs')
const path = require('path')

class Parser {
  constructor() {
    this.path = path.join(__dirname, 'full_log.txt')
    this.data = fs.readFileSync(this.path).toString().trim().split('\n')
    this.siegeData = Parser.getData(this.data, 'GetGuildSiegeMatchupInfo')
    this.getLastSiegeData = this.siegeData[this.siegeData.length - 1]
    Parser.createJson('siege.json', this.getLastSiegeData)
  }

  /**
   * @description Return an array that contains str
   * @param {Array} arr 
   * @param {String} str 
   */
  static getData(arr, str) {
    let data = []
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].includes(str)) {
        data.push(arr[i])
      }
    }
    return data
  }

  /**
   * @description Create json from a string
   * @param {String} file
   * @param {String} content 
   */
  static createJson(file, content) {
    fs.writeFile(file, content, (err) => {
      if (err) throw err
      console.log('Successfully created JSON file')
    })
  }
}

new Parser