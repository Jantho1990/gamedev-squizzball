import pop from '../../pop/'
const {
  Container,
  Camera,
  entity,
  math
} = pop

import Squizz from '../entities/Squizz'
import Baddie from '../entities/Baddie'
import Level from '../Level'

class GameScreen extends Container {
  constructor(game, controls) {
    super()

    const level = new Level(game.w * 3, game.h * 2)
    const squizz = new Squizz(controls)
    squizz.pos = {
      x: (level.w / 2) | 0, // Bitwise ORing any number with 0 yields the number
      y: (level.h / 2) | 0
    }

    const camera = this.add(
      new Camera(
        squizz, {
          w: game.w,
          h: game.h
        }, {
          w: level.w,
          h: level.h
        },
        0.08 // Why is this here? As best as I can tell it's never used...
      )
    )

    // Add roaming baddies
    this.baddies = this.addBaddies(level)

    camera.add(level)
    camera.add(this.baddies)
    camera.add(squizz)

    // Keep references for update
    this.level = level
    this.camera = camera
    this.squizz = squizz
  }

  addBaddies(level) {
    const baddies = new Container()
    // Horizontal baddies
    for (let i = 0; i < 5; i++) {
      const b = baddies.add(new Baddie(32 * 5, 0))
      b.pos.y = ((level.h / 5) | 0) * i + level.tileH * 2
    }
    // Vertical baddies
    for (let i = 0; i < 10; i++) {
      const b = baddies.add(new Baddie(0, 32 * 5))
      b.pos.x = ((level.w / 10) | 0) * i + level.tileW
    }
    return baddies
  }

  update(dt, t) {
    super.update(dt, t)
    const { squizz, level } = this

    // Make the game harder the longer you play
    squizz.speed -= 0.003 * dt

    // Update game containers
    this.updateBaddies()

    // Confine player to the level bounds
    const { pos } = squizz
    const { bounds : { top, bottom, right, left }} = level
    pos.x = math.clamp(pos.x, left, right)
    pos.y = math.clamp(pos.y, top, bottom)

    // See if we're on new ground
    const ground = level.checkGround(entity.center(squizz))
    if (ground === 'cleared') {
      squizz.dead = true
    }
  }

  updateBaddies() {
    const { squizz, level } = this
    this.baddies.map(b => {
      const { pos } = b
      if (entity.distance(squizz, b) < 32) {
        // A hit!
        squizz.dead = true

        // Send off screen for a bit
        if (b.xSpeed) pos.x = -level.w
        else pos.y = -level.h
      }

      // Screen wrap
      if (pos.x > level.w) pos.x = -32
      if (pos.y > level.h) pos.y = -32
    })
  }
}

export default GameScreen