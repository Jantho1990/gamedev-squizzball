import pop from '../../pop/'
const { TileSprite, Texture, math } = pop
const texture = new Texture('res/img/player-walk.png')

class Squizz extends TileSprite {
  constructor(controls) {
    super(texture, 32, 32)
    this.controls = controls

    // Set up animations
    const { anims } = this
    anims.add('walk', [0, 1, 2, 3, 4, 4, 4, 4].map(x => ({ x, y: 0 })), 0.05)
    /* anims.add(
      'walk',
      [{ x: 0, y: 0}, { x: 1, y: 0 }, {x: 2, y: 1 }, { x: 3, y: 0 }],
      0.1
    ) */
    anims.add("power", [0, 1, 2, 3].map(x => ({ x, y: 1 })), 0.07)
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

    this.fixedPos = false // Allows entity to stand still
    this.isIdle = false // Entity should be still
  }

  powerUpFor(seconds = 3) {
    this.powerupTime = seconds
    this.anims.play("power")
  }

  get isPoweredUp() {
    return this.powerupTime > 0
  }

  idle() {
    this.isIdle = true
    this.speed = 0
    this.dir = {
      x: 0,
      y: 0
    }
    this.anims.play('idle')
    this.fixedPos = true
  }

  walk() {
    this.reset()
  }

  reset() {
    this.speed = this.minSpeed * 5
    this.powerupTime = 0
    this.fastTime = 0
    this.anims.play('walk')
    this.fixedPos = false
    this.isIdle = false
  }
  
  update(dt, t) {
    super.update(dt)

    const { pos, minSpeed, controls, dir, anims, scale, anchor } = this
    let speed = this.speed

    // pos.x += x * dt * 100 * speed // 100 = multiplier to scale speed

    
    if ((this.nextCell -= dt) <= 0) {
      this.nextCell += speed
      const { x, y } = controls
      // scale.x = Math.sign(x)
      // anchor.x = scale.x > 0 ? -16 : 16
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
    if ((this.fastTime -= dt) > 0) {
      speed /= 1.33;
    }

    // Trigger speed pause
    let cf = anims.getCurrentFrame()
    if (cf > 4) {
      this.fixedPos = true
    } else if (this.fixedPos && !this.isIdle) {
      this.fixedPos = false
    }

    if (!this.fixedPos) {
      pos.x += dir.x * dt * (32 / speed)
      pos.y += dir.y * dt * (32 / speed)
    }

    // Powerball blink mode!
    this.visible = true;
    if (this.powerupTime > 0) {
      const time = this.powerupTime -= dt
      // Blink when nearly done
      if (time < 1.5) {
        this.visible = t / 0.1 % 2 | 0
      }
      if (time < 0) {
        anims.play("walk")
      }
    }
  }
}

export default Squizz