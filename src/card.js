import PropTypes from 'prop-types'
import './card.css'

const Card = (props) => {
    let style ={};
    if(props.showing){
        style.backgroundColor = props.backgroundColor
    }
    return  <div className="card" onClick={props.onClick} style={style}></div>
  }

Card.propTypes = {
    showing:PropTypes.bool.isRequired,
    backgroundColor:PropTypes.string.isRequired,
    onClick:PropTypes.func.isRequired
}
export default Card;