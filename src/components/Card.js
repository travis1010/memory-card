import '../styles/Card.css'

const Card = (props) => {
  const img = require(`../assets/${props.img}`);
  return (
    <div className='card' onClick={props.onClick} name={props.name}>
      <img src={img} name={props.name}/>
      <div className='name' name={props.name}>{props.name}</div>
    </div>
  )
}

export default Card;