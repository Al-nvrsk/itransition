import { DotsAndBoxesGameState } from "../../../types/types";

interface TintProps {
    event: React.MouseEvent<HTMLInputElement>
    DotsAndBoxesGameState: DotsAndBoxesGameState
    currentUserName?: string
    turnUserName?: string
}

export const tint = (props: TintProps) => {
    const {event, DotsAndBoxesGameState, currentUserName,turnUserName} = props
    if (
        !(event.target instanceof HTMLElement) ||
        currentUserName !== turnUserName 
        ) {
            return;
    }
    const currentCoord = event.target.dataset.coord
    if (currentCoord && DotsAndBoxesGameState.lineCoordinates[currentCoord] == 0) {
        if (DotsAndBoxesGameState.turn === "red") {
            event.target.style.backgroundColor = "rgba(255,0,0,0.5)"
        } else {
            event.target.style.backgroundColor = "rgba(0,0,255,0.5)"
        }
    }
}
