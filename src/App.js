import React, { Component } from 'react';
import Card from './card';
import shuffle from 'shuffle-array'
import Navbar from './nav'
import './App.css'

const CardState= {
  HIDING:0,
  SHOWING:1,
  MATCHING:2
}


class App extends Component {
  constructor(props) {
    super(props)

   let cards = [
     { id:1, cardState:CardState.HIDING, backgroundColor:'red'},
     { id:2, cardState:CardState.HIDING, backgroundColor:'red'},
     { id:3, cardState:CardState.HIDING, backgroundColor:'navy'},
     { id:4, cardState:CardState.HIDING, backgroundColor:'navy'},
     { id:5, cardState:CardState.HIDING, backgroundColor:'yellow'},
     { id:6, cardState:CardState.HIDING, backgroundColor:'yellow'},
     { id:7, cardState:CardState.HIDING, backgroundColor:'black'},
     { id:8, cardState:CardState.HIDING, backgroundColor:'black'},
     { id:9, cardState:CardState.HIDING, backgroundColor:'purple'},
     { id:10, cardState:CardState.HIDING, backgroundColor:'purple'},
     { id:11, cardState:CardState.HIDING, backgroundColor:'pink'},
     { id:12, cardState:CardState.HIDING, backgroundColor:'pink'},
     { id:13, cardState:CardState.HIDING, backgroundColor:'green'},
     { id:14, cardState:CardState.HIDING, backgroundColor:'green'},
     { id:15, cardState:CardState.HIDING, backgroundColor:'lightskyblue'},
     { id:16, cardState:CardState.HIDING, backgroundColor:'lightskyblue'},
   ];
  
  cards = shuffle(cards)
  this.state = { cards, noClick: false }
  this.handleClick = this.handleClick.bind(this)
  this.handleNewGame = this.handleNewGame.bind(this)
}

handleClick(id){
 const mapCardState = (cards, idsToChange, newCardState) => {
   return cards.map(c => {
     if(idsToChange.includes(c.id)){
       return {
         ...c,
         cardState:newCardState
       };
     }
     return c;
   })
 }
 
    const foundCard = this.state.cards.find(c => c.id === id) //the card just clicked on
    
    if(this.state.noClick  || foundCard.cardState !== CardState.HIDING) {
      return
    }
    
    let noClick = false;
    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING) //maps the card that was clicked on and changes it to be showing
    
    const showingCards = cards.filter((c)=> c.cardState === CardState.SHOWING) // returns back the array of showing cards

    const ids = showingCards.map(c => c.id) //the ids of the showing cards

    //At this stage we have an array of cards that are showing with their ids. The following logic decides what to do
    //if the showing cards match or not as well as not to stop the cards from being clickable if there are two showing cards

    if(showingCards.length === 2 && showingCards[0].backgroundColor === showingCards[1].backgroundColor){
      cards = mapCardState(cards, ids, CardState.MATCHING);
    }else if (showingCards.length === 2){
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);

      noClick = true;
//the below function sets the showing cards back to hiding after 1.3 seconds if they do not match
      this.setState({cards, noClick}, ()=> {
        setTimeout(()=> {
          this.setState({cards:hidingCards, noClick:false})
        },1300);
      })
      return;
    }
    this.setState({cards, noClick})
}

handleNewGame(){
  let cards= this.state.cards.map( c =>({
    ...c,
    cardState: CardState.HIDING
  }))
  cards = shuffle(cards)
  this.setState({cards})
}

  render(){
    const cards = this.state.cards.map((card, index)=>(
      <Card key={card.id}
       showing={card.cardState !== CardState.HIDING}
        backgroundColor={card.backgroundColor}
        onClick={()=>this.handleClick(card.id)}/>
    ))
    return(
      <div className="container">
        <Navbar onNewGame={this.handleNewGame}/>
        {cards}
      </div>
    )
  }
}

export default App;
