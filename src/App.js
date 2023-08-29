import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const HEROES = {
    'Bane': 'bane',
    'Lion': 'lion',
    'Faceless Void': 'faceless_void',
    'Chaos Knight': 'chaos_knight',
    'Lina': 'lina',
    'Wraith King': 'wraith_king',
    'Ember Spirit': 'ember_spirit',
    'Abaddon': 'abaddon',
    'Obsidian Destroyer': 'obsidian_destroyer',
    'Necrophos': 'necrophos',
  }

  

  const [clickedHeroes, setClickedHeroes] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(()=>{
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) return 0
    return JSON.parse(localValue)
  }, [])
  useEffect(()=>{
    localStorage.setItem("ITEMS", JSON.stringify(highScore))
  }, [highScore])

  const [heroesNames, setHeroesNames] = useState(Object.keys(HEROES))

  const shuffleCards = () => {
    const shuffleCards = [...heroesNames]

    for (let i = shuffleCards.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1))
      let temp = shuffleCards[randomIndex]
      shuffleCards[randomIndex] = shuffleCards[i]
      shuffleCards[i] = temp
    }

    setHeroesNames(shuffleCards)
  }



  const handleCardClick = hero => {
    if (clickedHeroes.includes(hero)) {
      resetScore()  
      console.log(clickedHeroes)

    } else {
      
      updateScore()
      console.log(clickedHeroes)
      // [...clickedHeroes, heroesNames]
    }
  } 

  

  const updateScore = () => {
    setCurrentScore(currentScore + 1)
    if (currentScore >= highScore){
      setHighScore(currentScore +1)
    }

  }

  const resetScore = () => {
    setCurrentScore(0)
    setClickedHeroes([])
  }
  
  return (
    <div className="App">
      <div>
        <h1>Score: {currentScore}</h1>
        <h1>High Score: {highScore}</h1>
        <h1>Target Score: {heroesNames.length}</h1>
      </div>
      {heroesNames.map((hero,index) => {
        return (<button className="btn btn-dark" style={{margin:"20px"}} id='f' key={index} title={hero} onClick={()=>{shuffleCards();handleCardClick();setClickedHeroes([...clickedHeroes,hero]);if (clickedHeroes.includes(hero)) {
          resetScore()  
          console.log(clickedHeroes)
    
        } }}>{hero}</button>)

      })}
      
    </div>
  );
}

export default App;