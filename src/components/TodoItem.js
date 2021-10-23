import React from 'react';
import '../style/todoItem.css';

function TodoItem(props) {

    return (
        <li className="TodoItem">
            <span 
                className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
                onClick={props.onComplete}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8"/>
                </svg>
            </span>
            <p 
                className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}
                >
                {props.text}
            </p>
            <span 
                className="Icon Icon-delete"
                onClick={props.onDelete}>
                X
            </span>
        </li>
    )
}

export default TodoItem
