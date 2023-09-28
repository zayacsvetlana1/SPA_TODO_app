import React, {useState} from 'react';
import {ITask} from "../models/ITask";

interface IBoard {
    id: number;
    title: string;
    tasks: ITask[]
}


const TaskPage = () => {
    const [boards, setBoards] = useState([
        {id: 1, title: 'Queue', tasks: [{id: 1, title: 'Задача 1', }, {id: 2, title: 'Задача 2', }, ] },
        {id: 2, title: 'Development', tasks: [{id: 3, title: 'Задача 3', }, {id: 4, title: 'Задача 4', }, ] },
        {id: 3, title: 'Done', tasks: [{id: 5, title: 'Задача 5', }, {id: 6, title: 'Задача 6', }, ] },

    ])
    const [currentBoard, setCurrentBoard] = useState<any> (null)
    const [currentTask, setCurrentTask] = useState<any> (null)


    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        const target = e.target as HTMLDivElement
        if (target.className == 'item') {
            target.style.boxShadow = '0 3px 3px lightgray'
        }

    }

    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        const target = e.target as HTMLDivElement
        target.style.boxShadow = 'none'
    }

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, board: IBoard , task: ITask) {
        setCurrentBoard(board)
        setCurrentTask(task)
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        const target = e.target as HTMLDivElement
        target.style.boxShadow = 'none'
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, board: IBoard, task: ITask ) {
        e.preventDefault()
        e.stopPropagation()
        const target = e.target as HTMLDivElement
        target.style.boxShadow = 'none'

        const currentIndex = currentBoard.tasks.indexOf(currentTask)
        currentBoard.tasks.splice(currentIndex, 1)
        const dropIndex = board.tasks.indexOf(task)
        board.tasks.splice(dropIndex + 1, 0, currentTask)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
            })
        )
    }

    function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: IBoard) {
        board.tasks.push(currentTask)
        const currentIndex = currentBoard.tasks.indexOf(currentTask)
        currentBoard.tasks.splice(currentIndex, 1)
        setBoards(boards.map(b => {
                if (b.id === board.id) {
                    return board
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            })
        )
    }

    return (
        <>
            {boards.map(board =>
                <div
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropCardHandler(e, board)}
                    className='board'
                >
                    <div className='board__title'> {board.title} </div>
                    <br/>
                    {board.tasks.map( task =>
                            <div
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={(e) => dragLeaveHandler(e)}
                                onDragStart={(e) => dragStartHandler(e, board, task)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDrop={(e) => dropHandler(e, board, task)}
                                className='item'
                                draggable={true}
                            >
                                {task.id}. {task.title}
                            </div>
                    )}
                </div>
            )}
        </>


    );
};

export default TaskPage;