// クッキーの値を取得する
// @param {String} searchKey 検索するキー
// @returns {String} キーに対応する値

export function getCookieValue (searchKey) {
  if (typeof searchKey === 'undefined') {
    return ''
  }

  let val = ''

  // document.cookie によってクッキーは以下の形式で参照できる  ex) name=12345;token=67890;key=abcde
  // ; で split してさらに = で split することで引数の searchKey と一致するものを探している
  document.cookie.split(';').forEach(cookie => {
    const [key, value] = cookie.split('=')
    if (key === searchKey) {
      return val = value
    }
  })

  return val
}