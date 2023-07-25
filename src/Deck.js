import React, { useState, useRef, useEffect } from 'react';
import './Deck.css';
import Card from './Card.js';
import axios from 'axios';
import { toBeEmpty } from '@testing-library/jest-dom/dist/matchers';

function Deck () {
    const [deckId, setDeckId] = useState(null);
    const [currentCardImg, setCurrentCardImg] = useState("https://deckofcardsapi.com/static/img/back.png");
    const [auto, setAuto] = useState(false);
    const timerId = useRef();
    const [remaining, setRemaining] = useState(52);

    // useEffect cannot be an async function itself. It must be used inside, and invoke it
    useEffect(() => {
        async function fetchDeck () {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");

            setDeckId(res.data.deck_id);
        };
        fetchDeck();

    }, []);

    useEffect(() => {
        if (auto && !timerId.current) {
            timerId.current = setInterval( async() => {
                console.log(`timerId: ${timerId}`);
                console.log(`timerId.current: ${timerId.current}`);
                await handleDraw();
            }, 1000)
        }

        return () => {
            clearInterval(timerId.current);
            timerId.current = null;
        }

    }, [auto, remaining])
    
    async function handleDraw () {
        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            setCurrentCardImg(res.data.cards[0].image);
            setRemaining(remaining - 1);
            console.log(res.data.cards[0].image);
        } catch (err) {
            alert("Error: no cards remaining!")
        }
    }

    function autoDraw () {
        setAuto(!auto);
        console.log(auto);
    }

    function refreshPage () {
        window.location.reload();
    }
  
    const currCard = <Card img={currentCardImg} />


    return (
        <div className='Deck'>
            <h1>Draw Cards From a New 52 Card Deck!</h1>
            <h3>Your Deck ID is: <span className="Deck-id">{`${deckId}`}</span></h3>
            <button onClick={handleDraw}>Draw Card</button>
            <button onClick={autoDraw}>Toggle Auto-Draw <span className="Deck-auto">{auto ? '(On)' : '(Off)'}</span></button>
            <button onClick={refreshPage}>Start New Deck</button>
            <div>
                {currCard ? currCard : null}
            </div>
            
            <h3>
                Cards Remaining: 
                <span className="Deck-remaining"><br/>{remaining}</span>
            </h3>
            
        </div>
    )
}

export default Deck;