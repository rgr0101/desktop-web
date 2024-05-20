import { useState } from "react";
import Modal from "react-modal";
import TaskModal from "../TaskModal/TaskModal";
import ChuckNorrisModal from "../ChuckNorrisModal/ChuckNorrisModal";
import MealModal from "../MealModal/MealModal";
import CocktailModal from "../CocktailModal/CocktailModal";
import "./Desktop.css";

Modal.setAppElement("#root");

const Desktop = () => {
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showChuckNorrisModal, setShowChuckNorrisModal] = useState(false);
    const [showMealModal, setShowMealModal] = useState(false);
    const [showCocktailModal, setShowCocktailModal] = useState(false);
    const token = localStorage.getItem("token");

    const openTaskModal = () => {
        setShowTaskModal(true);
    };

    const closeTaskModal = () => {
        setShowTaskModal(false);
    };

    const openChuckNorrisModal = () => {
        setShowChuckNorrisModal(true);
    };

    const closeChuckNorrisModal = () => {
        setShowChuckNorrisModal(false);
    };

    const openMealModal = () => {
        setShowMealModal(true);
    };

    const closeMealModal = () => {
        setShowMealModal(false);
    };

    const openCocktailModal = () => {
        setShowCocktailModal(true);
    };

    const closeCocktailModal = () => {
        setShowCocktailModal(false);
    };

    return (
        <div className='desktop'>
            <h2>APLICACIONES DISPONIBLES</h2>
            <div className='buttons'>
                <button onClick={openTaskModal}>Tareas</button>
                <button onClick={openChuckNorrisModal}>Chuck Norris</button>
                <button onClick={openMealModal}>Buscar Meal</button>
                <button onClick={openCocktailModal}>Buscar Cóctel</button>
            </div>

            <div></div>
            <Modal
                isOpen={showTaskModal}
                onRequestClose={closeTaskModal}
                contentLabel='Task Modal'
            >
                <TaskModal onClose={closeTaskModal} token={token} />
            </Modal>

            <Modal
                isOpen={showChuckNorrisModal}
                onRequestClose={closeChuckNorrisModal}
                contentLabel='Chuck Norris Modal'
            >
                <ChuckNorrisModal onClose={closeChuckNorrisModal} />
            </Modal>

            <Modal
                isOpen={showMealModal}
                onRequestClose={closeMealModal}
                contentLabel='Meal Modal'
            >
                <MealModal onClose={closeMealModal} />
            </Modal>

            <Modal
                isOpen={showCocktailModal}
                onRequestClose={closeCocktailModal}
                contentLabel='Cocktail Modal'
            >
                <CocktailModal onClose={closeCocktailModal} />
            </Modal>
        </div>
    );
};

export default Desktop;
