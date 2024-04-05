// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const images = [
        '🐶', '🐱', '🐰', '🐻', '🐼', '🦊',
        '🦁', '🐸', '🐙', '🐵', '🐔', '🦉'
    ];

    const generateCards = () => {
        const doubledImages = [...images, ...images];
        return doubledImages.sort(() => Math.random() - 0.5).map((image, index) => ({
            id: index,
            image,
            isFlipped: false,
            isMatched: false,
        }));
    };

    const [cards, setCards] = useState(generateCards());
    const [flippedCards, setFlippedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;

            if (card1.image === card2.image) {
                setCards((prevCards) => {
                    const updatedCards = [...prevCards];
                    updatedCards[card1.id].isMatched = true;
                    updatedCards[card2.id].isMatched = true;
                    return updatedCards;
                });
            }

            setTimeout(() => {
                setCards((prevCards) => {
                    const updatedCards = [...prevCards];
                    updatedCards[card1.id].isFlipped = false;
                    updatedCards[card2.id].isFlipped = false;
                    return updatedCards;
                });
                setFlippedCards([]);
                setMoves((prevMoves) => prevMoves + 1);
            }, 1000);
        }
    }, [flippedCards]);

    useEffect(() => {
        if (cards.every((card) => card.isMatched)) {
            setGameOver(true);
            setWon(true);
        }
    }, [cards]);

    const handleCardClick = (card) => {
        if (!gameOver && !card.isFlipped) {
            setCards((prevCards) => {
                const updatedCards = [...prevCards];
                updatedCards[card.id].isFlipped = true;
                return updatedCards;
            });
            setFlippedCards((prevFlippedCards) => [...prevFlippedCards, card]);
        }
    };

    const restartGame = () => {
        setCards(generateCards());
        setFlippedCards([]);
        setMoves(0);
        setGameOver(false);
        setWon(false);
    };

    return (
        <div className="App">
            <h1>Memory Game made by Susmita Shrestha</h1>
            <div className="game-info">
                <p>Moves: {moves}</p>
                <button onClick={restartGame}>Restart</button>
            </div>
            <div className={`game-board ${gameOver ? 'game-over' : ''}`}>
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
                        onClick={() => handleCardClick(card)}
                    >
                        {card.isFlipped || card.isMatched ? card.image : '❓'}
                    </div>
                ))}
            </div>
            {won && <div className="congratulations">Congratulations! You won!</div>}
        </div>
    );
}

export default App;
