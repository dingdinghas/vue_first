export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function initDatetime (date, hour, minute) {
  return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), hour, minute)
}

export const pickerOptions = {shortcuts: [{
  text: '最近一周',
  onClick (picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一个月',
  onClick (picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近三个月',
  onClick (picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [start, end])
  }
}]}

export function getLongTime (value, days) {
  if (value === '') {
    return new Date().getTime() - 3600 * 1000 * 24 * days + ',' + new Date().getTime()
  } else {
    return value[0].getTime() + ',' + value[1].getTime()
  }
}

export function getDefaultTime (days, days2) {
  const dateArray = []
  if (days2 === undefined) {
    if (days > 0) {
      dateArray[0] = new Date(new Date().getTime() - 3600 * 1000 * 24 * days)
      dateArray[1] = new Date()
    } else if (days <= 0) {
      dateArray[1] = new Date(new Date().getTime() - 3600 * 1000 * 24 * days)
      dateArray[0] = new Date()
    }
  } else {
    dateArray[0] = new Date(new Date().getTime() - 3600 * 1000 * 24 * days)
    dateArray[1] = new Date(new Date().getTime() + 3600 * 1000 * 24 * days2)
  }
  return dateArray
}

export function dateFromWeek (year, week, day) { // 0-6代表周一和周日
  var date = new Date(year, 0, 1)
  var dayMS = 24 * 60 * 60 * 1000
  var firstDay = (7 - date.getDay()) * dayMS
  var weekMS = (week - 2) * 7 * dayMS
  var result = date.getTime() + firstDay + weekMS + day * dayMS
  date.setTime(result)
  if (day === 6) {
    date.setDate(date.getDate() + 1)
  }
  return formatDate(date)
}

export function formatDate (time) {
  if (time === null) {
    return '--'
  }
  var date = new Date(time)
  var dateString = parseTime(date, '{y}年{m}月{d}日')
  if (dateString.charAt(8) === '0') {
    dateString = dateString.substring(0, 8) + dateString.substring(9)
  }
  if (dateString.charAt(5) === '0') {
    dateString = dateString.substring(0, 5) + dateString.substring(6)
  }
  return dateString
}

export function weekOfYear (year, month, day) { // year年 month月 day日  每周从周日开始
  var date1 = new Date(year, 0, 1)
  var date2 = new Date(year, month - 1, day, 1)
  var dayMS = 24 * 60 * 60 * 1000
  var firstDay = (7 - date1.getDay()) * dayMS
  var weekMS = 7 * dayMS
  date1 = date1.getTime()
  date2 = date2.getTime()
  return Math.ceil((date2 - date1 - firstDay) / weekMS) + 1
}

// 判断当前日期为当年第几周
export function getYearWeek (a, b, c) {
  // date1是当前日期
  // date2是当年第一天
  // d是当前日期是今年第多少天
  // 用d + 当前年的第一天的周差距的和在除以7就是本年第几周
  var date1 = new Date(a, parseInt(b) - 1, c)
  var date2 = new Date(a, 0, 1)
  var d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000)
  return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7)
}

// element ui 中根据时间date 获取是第几周的工具类
export function getWeekNumber (src) {
  var date = new Date(src.getTime())
  date.setHours(0, 0, 0, 0)
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4)
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}
