import React from 'react'
import { IoMdClose, IoMdTrash, IoMdCheckmark } from 'react-icons/io'
import { AiFillEdit, AiOutlineLoading3Quarters } from 'react-icons/ai'

import { format, parseISO } from 'date-fns'

export const TaskExpanded = ({ show, todo, handleExpandedTaskClose, handleCompletedClick, handleEditClick, handleDeleteClick, completed }) => {
    return (
        <div className={`expandedTask__modal ${show ? '' : 'd-none'}`}>

                <IoMdClose className="nav__closeModal" onClick={ handleExpandedTaskClose }/>

                <div className="expandedTask__card">

                    <div>
                        
                        <h2 className={todo.completed ? 'text-decoration-line-through' : ''}>
                            {
                                todo.completed ?
                                <IoMdCheckmark className="expandedTask__checkmark" onClick={ handleCompletedClick }/>
                                : null
                            }
                            {todo.title}
                            <AiFillEdit className="expandedTask__editBtn app__pointer" onClick={ handleEditClick }/>
                        </h2>
                    </div>
    
                    <div className="expandedTask__flexDiv">
                        <h4>Due date: </h4>
                        <p>{format(parseISO(todo.dueDate), 'dd/MM/yyyy')}</p>
                    </div>
    
                    <div className="expandedTask__flexDiv">
                        <h4>Priority:</h4>
                        <p>
                            <span className={`expandedTask__priority${
                                todo.priority === 'low' ? ' expandedTask__low' : todo.priority === 'mid' ? ' expandedTask__medium' : ' expandedTask__high'
                            }`}></span>
                            {
                                todo.priority === 'low' ? 'Low' : todo.priority === 'mid' ? 'Medium' : 'High'
                            }
                        </p>
                    </div>
    
                    <div className="expandedTask__description">
                        <h4>Content:</h4>
                        <p>{todo.description}</p>
                    </div>
    
                    <div className="expandedTask__btns">
                        {
                            completed 
                            ? 
                            <button className="btn btn-primary btn-block" onClick={handleCompletedClick}>
                                <AiOutlineLoading3Quarters className="app__loadingIcon" />
                            </button>
                            :
                            <button className="btn btn-primary btn-block" onClick={handleCompletedClick}>
                                {
                                    todo.completed ? 'Mark as pending  ' : 'Mark as completed  '
                                }
                                {
                                    todo.completed ? <IoMdClose className="expandedTask__icon"/> : <IoMdCheckmark className="expandedTask__icon"/>
                                }
                            </button>
                        }
                        
                        <IoMdTrash className={`expandedTask__trashCan app__pointer`} onClick={ handleDeleteClick }/>

                    </div>
    
                </div>
            </div>
    )
}
