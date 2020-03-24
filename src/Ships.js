import React from 'react';
import "./ShipStyles/App.css"
import "./ShipStyles/ShipsStyle.css"
import "./ShipStyles/ScoreStyle.css"
import "./ShipStyles/BoardStyle.css"
import shipImg from "./ShipStyles/shipImg.png"
import hit from "./ShipStyles/hits.png"
import water from "./ShipStyles/water.png"

class Ships extends React.Component {

  state = {
    startGame: false,
    board: [],
    counter: 0,
    message: "Ognia!",
    locationShips: [],
    ships: [["destroyer", 4, false], ["aircraftcarrier", 4, false],
    ["cruiser", 3, false], ["tanker", 3, false], ["galeon", 2, false], ["frigate", 2, false]],
    sunkShips: [],
    activeShips: [],
    shipsToRender: [],
    endGame: false,
    letters: ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }

  componentDidMount() {
    this.setBoard()
    this.generateShips()
  }

  setBoard = () => {
    let ships = this.state.ships
    let letters = this.state.letters
    let numbers = this.state.numbers
    if (window.innerWidth < 767) {
      ships.splice(0, 1)
      ships.splice(0, 1)
      ships.splice(0, 1)
      letters.splice(6, 4)
      numbers.splice(6, 4)
      this.setState({ ships, letters, numbers })
    }
  }

  generateNewGame = () => {
    if (window.innerWidth < 767) {
      this.setState({
        startGame: false,
        board: [],
        counter: 0,
        message: "Ognia!",
        locationShips: [],
        ships: [["tanker", 3, false], ["galeon", 2, false], ["frigate", 2, false]],
        sunkShips: [],
        activeShips: [],
        shipsToRender: [],
        endGame: false,
      })
    }
    else {
      this.setState({
        startGame: false,
        board: [],
        counter: 0,
        message: "Ognia!",
        locationShips: [],
        ships: [["destroyer", 4, false], ["aircraftcarrier", 4, false],
        ["cruiser", 3, false], ["tanker", 3, false], ["galeon", 2, false], ["frigate", 2, false]],
        sunkShips: [],
        activeShips: [],
        shipsToRender: [],
        endGame: false,
      })
    }
    this.generateShips()
  }

  generateShips = () => {
    let board = []
    let ships = this.state.ships
    let locationShips = []
    let activeShips = []
    let boardSize
    if (window.innerWidth < 767) boardSize = 6
    else boardSize = 10

    for (let i = 1; i <= boardSize; i++) {
      for (let j = 1; j <= boardSize; j++) {
        board.push(<div className="field" id={`X${j}Y${i}`}> </div>)
        locationShips.push(false)
        activeShips.push("")
      }
    }
    ships.map(item => {
      let directionHorizontal = Math.random()
      let randomX
      let randomY
      let validate = true
      if (directionHorizontal > 0.5) {
        // FOR X
        do {
          validate = true
          randomX = Math.floor(Math.random() * boardSize)
          randomY = Math.floor(Math.random() * boardSize)
          for (let i = 0; i < item[1]; i++) {
            if (randomX === 0) {
              if (locationShips[randomX + randomY * boardSize + i] === true ||
                locationShips[randomX + randomY * boardSize + i + 1] === true ||
                locationShips[randomX + randomY * boardSize + i + boardSize] === true ||
                locationShips[randomX + randomY * boardSize + i + (boardSize - 1)] === true ||
                locationShips[randomX + randomY * boardSize + i + (boardSize + 1)] === true ||
                locationShips[randomX + randomY * boardSize + i - boardSize] === true) {
                validate = false
              }
            }
            else
              if (locationShips[randomX + randomY * boardSize + i] === true ||
                locationShips[randomX + randomY * boardSize + i + 1] === true ||
                locationShips[randomX + randomY * boardSize + i - 1] === true ||
                locationShips[randomX + randomY * boardSize + i + boardSize] === true ||
                locationShips[randomX + randomY * boardSize + i + (boardSize + 1)] === true ||
                locationShips[randomX + randomY * boardSize + i - (boardSize + 1)] === true ||
                locationShips[randomX + randomY * boardSize + i - (boardSize - 1)] === true ||
                locationShips[randomX + randomY * boardSize + i + (boardSize - 1)] === true ||
                locationShips[randomX + randomY * boardSize + i - boardSize] === true) {
                validate = false
              }
          }
          console.log("PETLA X", ships)

          if (((randomX + (item[1] - 1)) < boardSize) && validate) break
        }
        while (true)
        for (let i = 0; i < item[1]; i++) {
          locationShips[randomX + randomY * boardSize + i] = true
          activeShips[randomX + randomY * boardSize + i] = item
        }
      }
      else {
        // FOR Y
        do {
          validate = true
          randomX = Math.floor(Math.random() * boardSize)
          randomY = Math.floor(Math.random() * boardSize)
          for (let i = 0; i < item[1]; i++) {
            if (randomX === 0) {
              if (locationShips[(randomY * boardSize) + (i * boardSize) + randomX] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX - boardSize] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX + 1] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX + boardSize] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX - (boardSize - 1)] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX + (boardSize + 1)] === true) {
                validate = false
              }
            }
            else if (randomX === (boardSize - 1)) {
              if (locationShips[(randomY * boardSize) + (i * boardSize) + randomX] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX - boardSize] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX + boardSize] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX - 1] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX + (boardSize - 1)] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX - (boardSize - 1)] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX - (boardSize + 1)] === true) {
                validate = false
              }
            }
            else
              if (locationShips[(randomY * boardSize) + (i * boardSize) + randomX] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX - boardSize] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX + 1] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX - 1] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX + boardSize] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX - (boardSize - 1)] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX + (boardSize - 1)] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX + (boardSize + 1)] === true ||
                locationShips[(randomY * boardSize) + (i * boardSize) + randomX - (boardSize + 1)] === true) {
                validate = false
              }
          }
          console.log("PETLA Y", ships)
          if (((randomY + item[1] - 1) < boardSize) && validate) break
        }
        while (true)
        for (let i = 0; i < item[1]; i++) {
          locationShips[(randomY * boardSize) + (i * boardSize) + randomX] = true
          activeShips[(randomY * boardSize) + (i * boardSize) + randomX] = item
        }
      }
      return item
    })

    this.setState({ board, locationShips, activeShips, endGame: false })
  }

  checkShips = (ship) => {
    let ships = this.state.ships
    let sunkShips = this.state.sunkShips
    let shipsToRender = this.state.shipsToRender
    let hits = 0
    sunkShips.map(item => {
      if (ship === item) {
        hits++
      }
      return item
    })
    ships.map((item, index) => {
      if (item[0] === ship && hits === item[1]) {
        shipsToRender.push(item[0])
        ships[index][2] = true
        this.setState({ message: "Trafiony, zatopiony!" })
      }
      return item
    })
    if (shipsToRender.length === ships.length) {
      this.setState({ endGame: true, ships })
    }
  }

  handleShoot = (e, index) => {
    let array = this.state.board
    let board = this.state.locationShips
    let activeShips = this.state.activeShips
    let sunkShips = this.state.sunkShips
    if (e.target.className === "hitPicture") {
      this.setState({ message: "Wybierz inne współrzędne!" })
    }
    else if (e.target.className === "waterPicture") {
      this.setState({ message: "Pudło!" })
    }
    else if (board[index]) {
      array[index] = <div className="hitField"><img className="hitPicture" src={hit} alt="ship" /> </div>
      this.setState({ message: "Trafiony, płynie!", counter: this.state.counter + 1 })
      sunkShips.push(activeShips[index][0])
      this.checkShips(activeShips[index][0])

    }
    else if (board[index] === false) {
      array[index] = <div className="waterField">
        <img className="waterPicture" src={water} alt="water" /> </div>
      this.setState({ array, counter: this.state.counter + 1, message: "Pudło!" })
    }
  }

  render() {
    console.log(this.state.ships)
    if (this.state.endGame) {
      return (
        <div className="shipsContainer" >
          <div className="result">
            <p style={{ fontSize: "30px" }}>Gratulacje!</p>
            <p style={{ marginTop: "30px" }}>Zniszczyłeś wszystkie statki w {this.state.counter} ruchach</p>
            <div className="startButton" onClick={() => this.generateNewGame()} > ROZPOCZNIJ NOWĄ GRĘ</div>
          </div>
        </div>
      )
    }
    else if (!this.state.startGame) {
      return (
        <div className="shipsContainer" >
          <div className="startWrapper">
            <div className="startPicture" />
            <div className="startButton" onClick={() => this.setState({ startGame: true })} > ROZPOCZNIJ GRĘ</div>
          </div>
        </div>
      )
    }
    else
      return (
        <div className="shipsContainer" >

          <div className="map">
            <div className="letters" >
              {this.state.letters.map((item, index) => <div className="field" key={index}> {item}</div>)}
            </div>
            <div className="so">
              <div className="numbers" >
                {this.state.numbers.map((item, index) => <div className="field" key={index} > {item}</div>)}
              </div>
              <div className="fields" onClick={this.handleShoot}>
                {this.state.board.map((item, index) => <div className="board" key={index} onClick={(e) => this.handleShoot(e, index)}> {item}</div>)}
              </div>
            </div>
          </div>

          <div className="scoreContainer">
            <div className="messsageElement">{this.state.message}</div>
            <div className="sunkShips">  {this.state.ships.map((item, index) =>
              item[2] ?
                <div className="imgContainer" key={index}>
                  <h3 style={{ color: "green" }}>   {item[1]}</h3> < img src={shipImg} alt="ship" className="picture" />

                </div>
                :

                <div className="imgContainer" key={index}>
                  <h3> {item[1]}</h3> <img src={shipImg} alt="ship" className="picture" />
                </div>
            )}
            </div>
            <div className="counterElement">Liczba ruchów: {this.state.counter} </div>
          </div>
        </div >
      );
  }
}
export default Ships;


