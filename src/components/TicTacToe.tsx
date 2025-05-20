import { useState } from "react";
import styled from "styled-components";
import Board from "./Board";


const MainWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const TicTacToeGame = () => {
  const [history, setHistory] = useState<(string | null)[][]>([
    Array(9).fill(null),
  ]);

  const [isXActive, setIsXActive] = useState<boolean>(true);
  const [currentMove, setCurrentMove] = useState<number>(0);

  const currentSquares: (string | null)[] = history[currentMove];

  const handlePlay = (squares: (string | null)[]) => {
    //you got square of latest move
    //here you have to append it in the history of moves.
    //setHistory([...history, squares]);

    //here to implement time travel when click on past move.
    // you have to switch to that move and history state should have upto that index data.
    // and from here, when user changes - take it and append it into history.
    const nextHistory = [...history.slice(0, currentMove + 1), squares];
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length-1)
    setIsXActive(!isXActive);
  };

  const jumpTo = (moveInd: number) => {
     setCurrentMove(moveInd)
     setIsXActive(moveInd % 2 === 0)
  };

  const movesList = history.map((item, move) => {
    let description = "";
    if (move > 0) {
      description = `Go to move ${move}`;
    } else {
      description = `Go to game start`;
    }

    return (
      <li key={move} style={{border:'1px solid', borderRadius:'5px'}}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const restart = ()=>{
    setCurrentMove(0)
    setIsXActive(true);
  }

  return (
    <MainWrapper>
    
      <Board
        squares={currentSquares}
        onPlay={handlePlay}
        isXActive={isXActive}
        handleRestart={restart}
      />
        <ol>{movesList}</ol>
    </MainWrapper>
  );
};

export default TicTacToeGame;
