import pop from "../pop/index"
const { CanvasRenderer, Container, KeyControls, Sprite, Text, Texture } = pop

// Game setup
const w = 640
const h = 300
const renderer = new CanvasRenderer(w, h)
document.querySelector("#board").appendChild(renderer.view)

const scene = new Container()
const controls = new KeyControls()

const textures = {
  background: new Texture("res/img/bkgd1.png"),
  spaceship: new Texture("res/img/spaceship.png"),
  bullet: new Texture("res/img/laser-bullet.png"),
  baddie: new Texture("res/img/ufo.png")
}

// Make a spaceship.
const ship = scene.add(new Sprite(textures.spaceship))
ship.pos.x = 120
ship.pos.y = h / 2 - 43.5
console.log('y',ship.pos.y)
ship.update = function (dt, t) {
  // Update the player position
  const { pos } = this
  pos.x += controls.x * dt * 200
  pos.y += controls.y * dt * 200
  
  if (pos.x < 0) pos.x = 0
  if (pos.x > w - 73) pos.x = w - 73
  if (pos.y < 0) pos.y = 0
  if (pos.y > h - 87) pos.y = h - 87
  
  // Wobbly ship
  const { scale } = this
  scale.x = Math.abs(Math.sin(t)) + 1
  scale.y = Math.abs(Math.sin(t * 1.33)) + 1
}
console.log(ship)
console.log(scene)

// Bullets
const bullets = new Container()
function fireBullet(x, y) {
  const bullet = new Sprite(textures.bullet)
  bullet.pos.x = x
  bullet.pos.y = y
  bullet.update = function(dt) {
    this.pos.x += 400 * dt
  }
  bullets.add(bullet)
}
// Game state variables
let lastShot = 0

// Bad guys
const baddies = new Container()
function spawnBaddie(x, y, speed) {
  const baddie = new Sprite(textures.baddie)
  baddie.pos.x = x
  baddie.pos.y = y
  baddie.update = function(dt) {
    this.pos.x += speed * dt
  }
  baddies.add(baddie)
}
// Game state variables
let lastSpawn = 0
let spawnSpeed = 1.0

// Add the score game object
const score = new Text("score:", {
  font: "20px sans-serif",
  fill: "#8b8994",
  align: "center"
})
score.pos.x = w / 2
score.pos.y = h - 30
// Game state variables
let scoreAmount = 0
let gameOver = false

// Game Over
function doGameOver() {
  const gameOverMessage = new Text("Game Over", {
    font: "30pt sans-serif",
    fill: "#8B8994",
    align: "center"
  })
  gameOverMessage.pos.x = w / 2
  gameOverMessage.pos.y = 120
  scene.add(gameOverMessage)
  scene.remove(ship)
  gameOver = true
}

// Add everything to the scene container
scene.add(new Sprite(textures.background))
// scene.add(ship)
scene.add(bullets)
scene.add(baddies)
scene.add(score)

// Time variables
let dt = 0
let last = 0

function loop (ms) {
    requestAnimationFrame(loop)

    const t = ms / 1000
    dt = t - last
    last = t

    // Game logic code

    // Fire bullets
    if (!gameOver && controls.action && t - lastShot > 0.15) {
      lastShot = t
      let offset = {x: 46, y: 39 } // half ship height - half bullet height
      fireBullet(ship.pos.x + offset.x, ship.pos.y + offset.y)
    }

    // Spawn bad guys
    if (t - lastSpawn > spawnSpeed) {
      lastSpawn = t
      const speed = -50 - (Math.random() * Math.random() * 100)
      const position = Math.random() * (h - 50)
      spawnBaddie(w, position, speed)

      // Accelerating for the next spawn
      spawnSpeed = spawnSpeed < 0.05 ? 0.6 : spawnSpeed * 0.97 + 0.001
    }

    // Check for collisions and/or offscreen
    baddies.map(baddie => {
      bullets.map(bullet => {
        // Check distance between baddie and bullet
        const dx = baddie.pos.x + 25 - (bullet.pos.x + 10)
        const dy = baddie.pos.y + 25 - (bullet.pos.y + 4)
        if (Math.sqrt(dx * dx + dy * dy) < 35) {
          // A hit!
          baddie.dead = bullet.dead = true
          scoreAmount += Math.floor(t)
        }
        if (bullet.pos.x >= w + 20) {
          bullet.dead = true
        }
      })
      if (baddie.pos.x <  - 50) {
        if (!gameOver) {
          doGameOver()
        }
        baddie.dead = true
      }
    })

    score.text = `score: ${scoreAmount}`

    scene.update(dt, t)
    renderer.render(scene)
}
requestAnimationFrame(loop)