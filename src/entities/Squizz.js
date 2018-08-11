import pop from '../../pop/'
const { TileSprite, Texture, math } = pop
const texture = new Texture('res/img/player-walk.png')

class Squizz extends TileSprite {
  constructor(controls) {
    super(texture, 32, 32)
    this.controls = controls
    this.anchor = { x: -16, y: -16 }
    this.speed = math.randf(0.9, 1.2)

    // Set up animations
    const { anims } = this
    anims.add('walk', [0, 1, 2, 3].map(x => ({ x, y: 0 })), 0.07 * this.speed)
    anims.add(
      'idle',
      [{ x: 0, y: 0}, { x: 4, y: 0 }, {x: 4, y: 1 }, { x: 4, y: 0 }],
      0.15 * this.speed
    )

    // Play an animation
    anims.play('walk')
  }
  
  update(dt, t) {
    super.update(dt)

    const { pos, scale, speed, anchor, anims, controls } = this
    const { x } = controls

    pos.x += x * dt * 100 * speed // 100 = multiplier to scale speed

    if (x) {
      anims.play('walk')
      // Flip to correct direction
      scale.x = Math.sign(x)
      anchor.x = scale.x > 0 ? -16 : 16
    } else {
      anims.play('idle')
    }
  }
}

export default Squizz