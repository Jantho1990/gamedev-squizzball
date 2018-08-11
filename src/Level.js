import pop from '../pop/'
const { TileMap, Texture, math } = pop

const texture = new Texture('../res/img/tiles.png')

class Level extends TileMap {
  constructor(w, h) {
    const tileSize = 32
    const mapW = Math.ceil(w / tileSize)
    const mapH = Math.ceil(h / tileSize)

    /* const level = []
    for (let i = 0; i < mapW * mapH; i++) {
      const isTopOrBottom = i < mapW || Math.floor(i / mapW) === mapH - 1
    } */

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

    super(level, mapW, mapH, tileSize, tileSize, texture)
  }
}

export default Level