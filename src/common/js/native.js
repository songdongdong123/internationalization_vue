const getScroll = function () {
  // 获取页面被卷曲的高度
  return {
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  }
}

const scrollToTop = function () {
  // 使页面滚动到固定的位置
  let timer = setInterval(() => {
    let leader = 0
    let target = getScroll().top
    let speed = (target - leader) / 10
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
    leader = leader + speed
    scrollTo(target - leader, 0)
    if (target === 0) {
      clearInterval(timer)
    }
  }, 0)
}

const scrollTo = function () {
  // 使页面滚动到固定的位置
  let timer = setInterval(() => {
    let leader = 0
    let target = 1000
    let speed = (target - leader) / 10
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
    leader = leader + speed
    scrollTo(target - leader, 0)
    if (target === 0) {
      clearInterval(timer)
    }
  }, 0)
}

const hasClass = function (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

const addClass = function (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export {
  scrollToTop,
  getScroll,
  scrollTo,
  addClass
}
