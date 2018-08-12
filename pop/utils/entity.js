import math from './math'

export function center(entity) {
  const { pos, w, h } = entity
  return {
    x: pos.x + w / 2,
    y: pos.y + h / 2
  }
}

export function distance(a, b) {
  return math.distance(center(a), center(b))
}

export default {
  center,
  distance
}