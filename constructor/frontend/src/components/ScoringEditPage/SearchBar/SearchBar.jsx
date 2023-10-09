import React, { useState } from 'react';
import './SearchBar.module.css';
import MyButton from '../../UI/MyButton/MyButton';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";


const SearchBar = ({ attributes,  postlink }) => {

    const [expanded, setExpanded] = useState(false);
    const [selections, setSelections] = useState([]);

    const toggleExpanded = () => {
        if (!expanded) {
            setExpanded(true);
        } else {
            setExpanded(false);
        }
    }
    const handleChange = event => {
        if (event.target.checked) {
            return setSelections([...selections, event.target.name])
        }
        const filtered = selections.filter(name => name !== event.target.name)
        // postlink(selections);
        return setSelections(filtered);
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Submitted. Values are submitted', selections)
        postlink(selections);
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-1/2 h-16 text-black-100 flex items-center justify-center text-xl">
                <form onSubmit={handleSubmit} className='w-full'>
                    <div>
                        <div onClick={toggleExpanded}>
                            <h6>Вычисляемые аттрибуты</h6>
                            <div
                                className={`font-semibold cursor-pointer ${expanded ? "up-arrow" : "down-arrow"}`}
                            >
                                {selections.length
                                    ? selections.map((name, i) => {
                                        <span key={i}>
                                            {i ? ", " : null}
                                            {name}
                                        </span>
                                    }) 
                                    : "Атрибуты не выбраны"}
                            </div>
                        </div>
                        {expanded && (
                            <div className="border-gray-200 border border-solid">
                                {attributes.map((attribute, index) => (
                                    <label className='custom-select custom-select-lg mb-3'  key={index}>
                                        <input
                                            type='checkbox'
                                            name={attribute.id}
                                            value={attribute.name_counted_attr}
                                            onChange={handleChange}
                                            className='m-3 cursor-pointer' />
                                        {attribute.name_counted_attr}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="row">
                        <MyButton type="submit" onClick={handleSubmit}>Утвердить</MyButton>
                        <Link to={`/scoring`} className="btn btn-outline-secondary" type="submit">Выйти</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default SearchBar;
