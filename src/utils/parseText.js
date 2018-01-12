let getNameByID = function (items, id) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i].name
    }
  }
  return '无效ID'
}

let parseFunction = {
  getNameByID: getNameByID
}

export default parseFunction
