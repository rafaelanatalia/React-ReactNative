import { useParams } from "react-router-dom";
import deleteImg from "../assets/images/delete.svg";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/room.scss";
import { useAuth } from "../hooks/useAuth";
import { QuestionsComponent } from "../components/QuestionsComponent";
import { useRoom } from "../hooks/UseRoom";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const navigate = useNavigate();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId as string);

  async function handleDeleteQuestion(questionsId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionsId}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      ended: new Date(),
    });

    navigate("/");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <div className="">
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((questions) => {
            return (
              <QuestionsComponent
                key={questions.id}
                content={questions.content}
                author={questions.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(questions.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </QuestionsComponent>
            );
          })}
          ;
        </div>
      </main>
    </div>
  );
}
