import React from 'react';
import '../style/todoButton.css';

function CreateTodoButton(props) {
    
    return (
        <>
            <button 
                className="CreateTodoButton"
                onClick={props.onClickButton}
            >
                +
            </button>
        </>
    )
}

export default CreateTodoButton