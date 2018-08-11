import pop from '../pop/'
const { Game, KeyControls, Texture, math, TileMap } = pop
import Squizz from './entities/Squizz'
import Level from './Level'

const game = new Game(640, 320)
const { scene, w, h } = game

const level = new Level(w, h)
scene.add(level)

const controls = new KeyControls()

for (let i = 0; i < 20; i++) {
  const squizz = new Squizz(controls)
  squizz.pos = {
    x: Math.random() * w,
    y: Math.random() * h
  }
  scene.add(squizz)
}

game.run()