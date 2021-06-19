import enquireJs from 'enquire.js'

export function isDef (v){
  return v !== undefined && v !== null
}

/**
 * Remove an item from an array.
 */
export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

export function enquireScreen(call) {
  const handler = {
    match: function () {
      call && call(true)
    },
    unmatch: function () {
      call && call(false)
    }
  }
  enquireJs.register('only screen and (max-width: 767.99px)', handler)
}

export function formatDuring(s) {
  var hours = parseInt((s % (60 * 60 * 24)) / ( 60 * 60))
  var minutes = parseInt((s % ( 60 * 60)) / (60))
  var seconds = (s % (60))
  hours = hours < 10 ? ('0' + hours) : hours
  minutes = minutes < 10 ? ('0' + minutes) : minutes
  seconds = seconds < 10 ? ('0' + seconds) : seconds
  return hours + '时' + minutes + '分' + seconds + '秒'
}


// 文件大小转换
export const byteToKb = (byte) => {
  return Math.floor(byte / 1024 ) + 'KB'
}

const _toString = Object.prototype.toString
