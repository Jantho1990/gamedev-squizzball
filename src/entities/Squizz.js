import pop from '../../pop/'
const { TileSprite, Texture, math } = pop
const texture = new Texture('res/img/player-walk.png')

class Squizz extends TileSprite {
  constructor(controls) {
    super(texture, 32, 32)
    this.controls = controls

    // Set up animations
    const { anims } = this
    anims.add('walk', [0, 1, 2, 3].map(x => ({ x, y: 0 })), 0.1)
    anims.add(
      'idle',
      [{ x: 0, y: 0}, { x: 4, y: 0 }, {x: 4, y: 1 }, { x: 4, y: 0 }],
      0.1
    )

    this.minSpeed = 0.5
    this.reset()

    this.speed = 0.15 // number of seconds it takes to travel to one tile
    this.dir = {
      x: 1,
      y: 0
    }
    this.nextCell = this.speed // enables us to "snap" to the next cell by being equal to the speed
  }

  reset() {
    this.speed = this.minSpeed * 5
    this.anims.play('walk')
  }
  
  update(dt, t) {
    super.update(dt)

    const { pos, minSpeed, speed, controls, dir, anims } = this

    // pos.x += x * dt * 100 * speed // 100 = multiplier to scale speed

    if ((this.nextCell -= dt) <= 0) {
      this.nextCell += speed
      const { x, y } = controls
      if (x && x !== dir.x) {
        dir.x = x
        dir.y = 0
        pos.y = Math.round(pos.y / 32) * 32
      } else if (y && y !== dir.y) {
        dir.x = 0
        dir.y = y
        pos.x = Math.round(pos.x / 32) * 32
      }
    }

    // Speed adjustments
    if (this.speed > minSpeed) {
      this.speed -= dt
    }

    pos.x += dir.x * dt * (32 / speed)
    pos.y += dir.y * dt * (32 / speed)
  }
}

export default Squizz