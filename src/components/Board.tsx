import { Typography } from "@mui/material";
import styled from "styled-components";
import Square from "./Square";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 100px;
    width: 300px;
    height: 300px;
`;

const SubWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 300px;
    border: 1px solid orange;
`;

const RestartButton = styled.div`
    padding: 1rem;
    border: 2px solid;
    border-radius: 5px;
    color: black;
`;

const Board = (props: {
    squares: (string | null)[];
    isXActive: boolean;
    handleRestart: () => void;
    onPlay: (squares: (string | null)[]) => void;
}) => {
    const { squares, isXActive, onPlay, handleRestart } = props;

    const handleClick = (val: number) => {
        if (squares[val] || calculateWinner(squares)) {
            return;
        }
        const copiedValues: (string | null)[] = [...squares];
        if (isXActive) {
            copiedValues[val] = "X";
        } else {
            copiedValues[val] = "O";
        }
        onPlay(copiedValues);
    };

    const calculateWinner = (values: (string | null)[]) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        //do forEach on eachtime user click.
        // compare if any matches then user winner else nothing
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (values[a] && values[a] === values[b] && values[a] === values[c]) {
                return values[a]; // Return the winner ('X' or 'O')
            }
        }
        return null; // Return null if no winner
    };

    const Winner: string | null = calculateWinner(squares);

    const startGame = squares.every((e) => e === null);
    const reStartGame = squares.every((e) => e !== null);

    return (
        <Wrapper>
            <Typography variant="h4">
                {Winner
                    ? `Winner is ${Winner}`
                    : startGame
                    ? `Start the Game!`
                    : reStartGame
                    ? `Restart the Game`
                    : `Next turn is ${isXActive ? "X" : "O"}`}
            </Typography>

            <SubWrapper>
                <Square value={squares[0]} onClick={() => handleClick(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} />
            </SubWrapper>
            <SubWrapper>
                <Square value={squares[3]} onClick={() => handleClick(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} />
            </SubWrapper>
            <SubWrapper>
                <Square value={squares[6]} onClick={() => handleClick(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} />
            </SubWrapper>
            <RestartButton onClick={handleRestart}>Restart</RestartButton>
        </Wrapper>
    );
};

export default Board;
