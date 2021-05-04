import './nav.css'
import PropTypes from 'prop-types'


 const Navbar = ({onNewGame}) =>{       return(
            <div className="navbar">
                <h5>Memory Game</h5>
                <button onClick={onNewGame}>New Game</button>
            </div>
        )
    }
    Navbar.propTypes = {
        onNewGame:PropTypes.func.isRequired
    }
export default Navbar;