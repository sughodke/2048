// https://stackoverflow.com/a/58719294/721564

// Tune deltaMin according to your needs. Near 0 it will almost
// always trigger, with a big value it can never trigger.
export function detectSwipe(id, func, deltaMin = 90) {
  const swipe_det = {
    sX: 0,
    sY: 0,
    eX: 0,
    eY: 0
  }
  // Directions enumeration
  const directions = Object.freeze({
    UP: 'up',
    DOWN: 'down',
    RIGHT: 'right',
    LEFT: 'left'
  })
  let direction = null
  const el = document // .getElementById(id)

  function touchstart(e) {
    const t = e.touches[0]
    swipe_det.sX = t.screenX
    swipe_det.sY = t.screenY
  }
  function touchmove(e) {
    // Prevent default will stop user from scrolling, use with care
    // e.preventDefault();
    const t = e.touches[0]
    swipe_det.eX = t.screenX
    swipe_det.eY = t.screenY
  }
  function touchend(e) {
    const deltaX = swipe_det.eX - swipe_det.sX
    const deltaY = swipe_det.eY - swipe_det.sY
    // Min swipe distance, you could use absolute value rather
    // than square. It just felt better for personnal use
    if (deltaX ** 2 + deltaY ** 2 < deltaMin ** 2) return
    // horizontal
    if (deltaY === 0 || Math.abs(deltaX / deltaY) > 1)
      direction = deltaX > 0 ? directions.RIGHT : directions.LEFT
    else // vertical
      direction = deltaY > 0 ? directions.UP : directions.DOWN

    if (direction && typeof func === 'function') func(el, direction)

    direction = null
  }
  el.addEventListener('touchstart', touchstart
    , false)
  el.addEventListener('touchmove', touchmove
    , false)
  el.addEventListener('touchend', touchend
    , false)

  return { touchstart, touchend, touchmove }
}
