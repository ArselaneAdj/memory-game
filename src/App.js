import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import bane from './logo192.png';

function App() {
  
  const HEROES = {
    "https://w7.pngwing.com/pngs/664/275/png-transparent-himalayan-cat-thai-cat-siamese-cat-balinese-cat-birman-ragdoll-cat-mammal-animals-cat-like-mammal-thumbnail.png": bane,
    'https://w7.pngwing.com/pngs/817/323/png-transparent-cat-kitten-cats-mammal-animals-cat-like-mammal-thumbnail.png': 'lion',
    'https://w7.pngwing.com/pngs/614/838/png-transparent-cat-kitty-creative-cat-cat-thumbnail.png': 'faceless_void',
    'https://w7.pngwing.com/pngs/83/441/png-transparent-cat-kitten-dog-pet-sitting-cat-mammal-cat-like-mammal-animals-thumbnail.png': 'chaos_knight',
    'https://w7.pngwing.com/pngs/614/838/png-transparent-brown-tabby-cat-cat-dog-kitten-pet-dentistry-cat-mammal-animals-cat-like-mammal-thumbnail.png': 'lina',
    'https://w7.pngwing.com/pngs/148/825/png-transparent-siberian-cat-persian-cat-graphy-pet-collar-cats-miscellaneous-mammal-animals-thumbnail.png': 'wraith_king',
    'https://w7.pngwing.com/pngs/166/496/png-transparent-british-shorthair-kitten-dog-cat-relationship-cat-food-cat-short-haired-gray-cat-other-white-mammal-thumbnail.png': 'ember_spirit',
    'https://w7.pngwing.com/pngs/508/532/png-transparent-bengal-cat-bengal-cat-siberian-cat-sphynx-cat-somali-cat-siamese-cat-kitten-mammal-cat-like-mammal-animals-thumbnail.png': 'abaddon',
    'https://w7.pngwing.com/pngs/463/199/png-transparent-cat-kitty-creative-cat-cat-thumbnail.png': 'obsidian_destroyer',
    'https://w7.pngwing.com/pngs/174/600/png-transparent-cat-animal-lovely-cat-thumbnail.png': 'necrophos',
  }

  

  const [clickedHeroes, setClickedHeroes] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(()=>{
    const localValue = sessionStorage.getItem("ITEMS")
    if(localValue == null) return 0
    return JSON.parse(localValue)
  }, [])
  useEffect(()=>{
    sessionStorage.setItem("ITEMS", JSON.stringify(highScore))
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
        <h1>Score: {currentScore}-----High Score: {highScore}-----Target Score: {heroesNames.length}</h1>
      </div>
      {heroesNames.map((hero,index) => {
        return (<><img alt='s' src={hero} className="btn btn-dark" style={{margin:"20px"}} id='f' key={index} title={hero} onClick={()=>{shuffleCards();handleCardClick();setClickedHeroes([...clickedHeroes,hero]);if (clickedHeroes.includes(hero)) {
          resetScore()  
          console.log(clickedHeroes)
    
        } }}/>
        
        
        </>)

      })}
      
    </div>
  );
}

export default App;