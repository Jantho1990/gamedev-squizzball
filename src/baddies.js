import pop from '../pop/'
{ Container, entity } = pop
import Baddie from './entities/Baddie'

export function addBaddies(level) {
  const baddies = new Container()
  // Horizontal baddies
  for (let i = 0; i < 5; i++) {
    const b = baddies.add(newBaddie(32 * 5, 0))
    b.pos.y = ((level.h / 5) | 0) * i + level.tileW
  }
  // Vertical baddies
  for (let i = 0; i < 10; i++) {
    const b = baddies.add(n ew Baddie(0, 32 * 5))
    b.pos.x = ((level.w / 10) | 0) * i + level.tileW
  }
  return baddies
}

export function updateBaddies(baddies) {
  baddies.map(b => {
    const { pos } = b
    if (entity.distance(squizz))
  })
}