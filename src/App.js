import './styles/App.css'
import uniqid from 'uniqid';
import Card from './components/Card.js'
import { useState, useEffect } from 'react';

export default function App() {
  const [cards, setCards] = useState([
    {name: 'Ape', img: 'ape.png', id: uniqid()},
    {name: 'Archangel', img: 'archangel.png', id: uniqid()},
    {name: 'Cheetah', img: 'cheetah.png', id: uniqid()},
    {name: 'Eagle', img: 'eagle.png', id: uniqid()},
    {name: 'Firebird', img: 'firebird.png', id: uniqid()},
    {name: 'Roc', img: 'roc.png', id: uniqid()},
    {name: 'Shark', img: 'shark.png', id: uniqid()},
    {name: 'Sidewinder', img: 'sidewinder.png', id: uniqid()},
    {name: 'Skeeter', img: 'skeeter.png', id: uniqid()},
    {name: 'Tee-Bird', img: 'teebird.png', id: uniqid()},
    {name: 'Whippet', img: 'whippet.png', id: uniqid()},
    {name: 'Wraith', img: 'wraith.png', id: uniqid()}
  ]);

  const [alreadyPicked, setAlreadyPicked] = useState([]);
  const [score, setScore] = useState(0);

  const shuffleCards = () => {
    const array = [...cards];
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    } 
    setCards(array);
  }

  const clickCard = (e) => {
    const name = e.target.getAttribute('name');
    if (alreadyPicked.includes(name)) {
      displayNotification('Game Over!', `You scored ${score} out of ${cards.length}.`);
    } else {
      setAlreadyPicked([...alreadyPicked, name]);
    }
  }

  const newGame = () => {
    shuffleCards();
    setAlreadyPicked([]);
    document.querySelector('.notification').style.display = 'none';
  }

  const displayNotification = (line1, line2 = '') => {
    document.getElementById('result1').textContent = line1;
    document.getElementById('result2').textContent = line2;
    document.querySelector('.notification').style.display = 'flex';
  }

  useEffect(() => {
    setScore(alreadyPicked.length);
    if(alreadyPicked.length === cards.length) {
      displayNotification('You Win!')
    } else {
      shuffleCards();
    }
 }, [alreadyPicked]);

  //first mount
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Disc Golf Memory Game</h1>
      <p>Click each disc only once! If you click the same disc twice you lose.</p>
      <div className='score'>Score: {score} / {cards.length}</div>
      <div className="card-container">
        <div className='notification'>
          <h2 id='result1'></h2>
          <h3 id='result2'></h3>
          <button type='button' onClick={newGame}>New Game</button>
        </div>
        {
          cards.map((card) => (
            <Card name={card.name} img={card.img} key={card.id}
            shuffle={shuffleCards} onClick={clickCard}/>
          )) 
        }
      </div>
    </div>
  );
}


