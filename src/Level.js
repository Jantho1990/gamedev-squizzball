import pop from '../pop/'
const { TileMap, Texture, math } = pop

const texture = new Texture('../res/img/tiles.png')

class Level extends TileMap {
  constructor(w, h) {
    const tileSize = 32
    const mapW = Math.ceil(w / tileSize)
    const mapH = Math.ceil(h / tileSize)

    const level = []
    for (let i = 0; i < mapW * mapH; i++) {
      const isTopOrBottom = i < mapW || Math.floor(i / mapW) === mapH - 1
      const isLeft = i % mapW === 0
      const isRight = i % mapW === mapW - 1
      const isSecondRow = ((i / mapW) | 0) === 1 // Bitwise OR returns 1 if (i / mapW) is 1

      if (isTopOrBottom) {
        level.push({ x: 2, y: 1 })
      } else if (isLeft) {
        level.push({ x: 1, y: 1})
      } else if (isRight) {
        level.push({ x: 3, y: 1 })
      } else if (isSecondRow) {
        level.push({ x: 4, y: 1 })
      } else {
        // Random ground tile
        level.push({ x: math.rand(1, 5), y: 0 })
      }
    }

    // Make a random level of tile indexes
    /* const level = []
    for (let y = 0; y < mapH; y++) {
      for (let x = 0; x < mapW; x++) {
        level.push({
          x: math.rand(5),
          y: math.rand(2)
        })
      }
    } */

    super(level, mapW, mapH, tileSize, tileSize, texture)

    this.bounds = {
      left: tileSize,
      right: w - tileSize * 2,
      top: tileSize * 2,
      bottom: h - tileSize * 2
    }
  }
}

export default Level