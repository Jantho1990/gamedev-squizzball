import pop from '../pop/'
const { Game, KeyControls, Texture, math, TileMap } = pop
import Squizz from './entities/Squizz'
import Level from './Level'

const game = new Game(640, 320)
const { scene, w, h } = game

const level = new Level(w, h)
scene.add(level)

const controls = new KeyControls()

const squizz = new Squizz(controls)
squizz.pos = {
  x: w / 2,
  y: h / 2
}
scene.add(squizz)
/* for (let i = 0; i < 20; i++) {
  squizz.pos = {
    x: Math.random() * w,
    y: Math.random() * h
  }
  scene.add(squizz)
} */

game.run(() => {
  const { pos } = squizz
  const { bounds : { top, bottom, right, left }} = level
  // Confine player pos to the bounds area
  pos.x = math.clamp(pos.x, left, right)
  pos.y = math.clamp(pos.y, top, bottom)
})