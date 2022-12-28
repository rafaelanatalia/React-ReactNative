import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type roomCodeProps={
    code:string | undefined;
}

export function RoomCode(props:roomCodeProps){


    function copyRoomToClipboard(){
        navigator.clipboard.writeText(props.code as string)
    }


    return(
        <button className="room-code" onClick={copyRoomToClipboard}>
            <div>
            <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{props.code}</span>

        </button>
    )
}