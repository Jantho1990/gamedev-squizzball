import pop from '../pop/'
const { Game, KeyControls, Texture, math, TileMap } = pop
import Squizz from './entities/Squizz'

const game = new Game(640, 320)
const { scene, w, h } = game

const controls = new KeyControls()

const texture = new Texture("res/img/tiles.png")
const tileSize = 32
const mapW = Math.floor(w / tileSize)
const mapH = Math.floor(h / tileSize)

// Make a random level of tile indexes
const level = []
for (let y = 0; y < mapH; y++) {
  for (let x = 0; x < mapW; x++) {
    level.push({
      x: math.rand(5),
      y: math.rand(2)
    })
  }
}

const map = new TileMap(level, mapW, mapH, tileSize, tileSize, texture)

scene.add(map)

for (let i = 0; i < 20; i++) {
  const squizz = new Squizz(controls)
  squizz.pos = {
    x: Math.random() * w,
    y: Math.random() * h
  }
  scene.add(squizz)
}

game.run()