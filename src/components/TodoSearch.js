import React from 'react';
import '../style/todoSearch.css';

function TodoSearch({searchValue, setSearchValue}) {

    

    const onSearchValueChanged = (event) =>{
        console.log(event.target.value);
        setSearchValue(event.target.value);
    }

    return (
        <>
            <div className="TodoSearch">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Buscar" 
                    aria-label="Recipient's username" 
                    aria-describedby="basic-addon2"
                    value={searchValue}
                    onChange={onSearchValueChanged}
                /> 
            </div>  
            
        </>
    )
}

export default TodoSearch
