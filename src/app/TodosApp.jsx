import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import readTodosRequest from "../api/readTodosRequest"
import { ClipLoader } from "react-spinners"
import TodoItem from "../components/TodoItem"
import CreateTodoForm from "../components/CreateTodoForm"

const TodosApp = () => {

    const {data: todos, isLoading, isError, error} = useQuery({
        queryKey: ["todos"],
        queryFn: () => readTodosRequest()
    })

    if (isLoading) return <ClipLoader size={150}/>

    return (
        <div>
            <h1>Todos App</h1>
            <CreateTodoForm />
            {todos.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
        </div>
    )
}

export default TodosApp