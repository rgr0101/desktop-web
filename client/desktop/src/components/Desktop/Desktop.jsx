import { useState } from "react";
import Modal from "react-modal";
import TaskModal from "../TaskModal/TaskModal";
import ChuckNorrisModal from "../ChuckNorrisModal/ChuckNorrisModal";
import MealModal from "../MealModal/MealModal";
import CocktailModal from "../CocktailModal/CocktailModal";
import NumberConversionModal from "../NumberConversionModal/NumberConversionModal";
import AddNumberModal from "../AddNumberModal/AddNumberModal";
import MultiplyNumberModal from "../MultiplyNumberModal/MultiplyNumberModal";
import "./Desktop.css";

Modal.setAppElement("#root");

const Desktop = () => {
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showChuckNorrisModal, setShowChuckNorrisModal] = useState(false);
    const [showMealModal, setShowMealModal] = useState(false);
    const [showCocktailModal, setShowCocktailModal] = useState(false);
    const [showNumberConversionModal, setShowNumberConversionModal] =
        useState(false);
    const [showAddNumberModal, setShowAddNumberModal] = useState(false);
    const [showMultiplyNumberModal, setShowMultiplyNumberModal] = useState(false);

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

    const openNumberConversionModal = () => {
        setShowNumberConversionModal(true);
    };

    const closeNumberConversionModal = () => {
        setShowNumberConversionModal(false);
    };

    const openAddNumberModal = () => setShowAddNumberModal(true);
    const closeAddNumberModal = () => setShowAddNumberModal(false);

    const openMultiplyNumberModal = () => setShowMultiplyNumberModal(true);
    const closeMultiplyNumberModal = () => setShowMultiplyNumberModal(false);

    return (
        <div className='desktop'>
            <h2>APLICACIONES DISPONIBLES</h2>
            <div className='buttons'>
                <button onClick={openTaskModal}>Tareas</button>
                <button onClick={openChuckNorrisModal}>Chuck Norris</button>
                <button onClick={openMealModal}>Buscar Meal</button>
                <button onClick={openCocktailModal}>Buscar Cóctel</button>
                <button onClick={openNumberConversionModal}>
                    Convertir Número
                </button>
                <button onClick={openAddNumberModal}>Sumar Número</button>
                <button onClick={openMultiplyNumberModal}>Multiplicar Número</button>
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

            <Modal
                isOpen={showNumberConversionModal}
                onRequestClose={closeNumberConversionModal}
                contentLabel='Number Conversion Modal'
            >
                <NumberConversionModal onClose={closeNumberConversionModal} />
            </Modal>

            <Modal
                isOpen={showAddNumberModal}
                onRequestClose={closeAddNumberModal}
                contentLabel='Add Number Modal'
            >
                <AddNumberModal onClose={closeAddNumberModal} />
            </Modal>

            <Modal
                isOpen={showMultiplyNumberModal}
                onRequestClose={closeMultiplyNumberModal}
                contentLabel='Multiply Number Modal'
            >
                <MultiplyNumberModal onClose={closeMultiplyNumberModal} />
            </Modal>
        </div>
    );
};

export default Desktop;
