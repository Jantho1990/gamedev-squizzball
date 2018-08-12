import pop from '../pop/'
const { Game, KeyControls } = pop
import LogoScreen from './screens/LogoScreen'
import TitleScreen from './screens/TitleScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

const game = new Game(640, 480)
const controls = new KeyControls()

function titleScreen () {
  game.scene = new TitleScreen(game, controls, newGame)
}

function gameOverScreen (result) {
  game.scene = new GameOverScreen(game, controls, result, titleScreen)
}

function newGame () {
  game.scene = new GameScreen(game, controls, gameOverScreen)
}

try {
  game.scene = new LogoScreen(game, titleScreen)
  game.run()
} catch (e) {
  console.log(e)
}