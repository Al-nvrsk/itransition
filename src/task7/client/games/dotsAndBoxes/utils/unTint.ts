import { DotsAndBoxesGameState } from "../../../types/types";

interface UnTintProps {
    event: React.MouseEvent<HTMLInputElement>
    DotsAndBoxesGameState: DotsAndBoxesGameState
}

export const unTint = (props: UnTintProps) => {
    const {event, DotsAndBoxesGameState} = props
    if (!(event.target instanceof HTMLElement)) {
        return;
    }
    const currentCoord = event.target.dataset.coord
    if (currentCoord && DotsAndBoxesGameState.lineCoordinates[currentCoord] === 0) {
        event.target.style.backgroundColor = "rgb(255,255,255)"
    }
}
