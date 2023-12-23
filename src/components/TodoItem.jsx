import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import updateTodoRequest from "../api/updateTodoRequest"
import deleteTodoRequest from "../api/deleteTodoRequest"

const TodoItem = ({ todo }) => {

    const queryClient = useQueryClient()
    const [text, setText] = useState(todo.text)

    const updateMutation = useMutation({
        mutationFn: (todoObj) => updateTodoRequest(todoObj),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["todos"]})
    }) 

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteTodoRequest(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["todos"]})
    })

    const handleSubmit = e => {
        e.preventDefault()
        updateMutation.mutate({...todo, text})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={e => setText(e.target.value)}/>
            </form>
            <input type="checkbox" checked={todo.completed} onChange={() => updateMutation.mutate({...todo, completed: !todo.completed})}/>
            <button onClick={() => deleteMutation.mutate(todo.id)}>Delete</button>
        </div>
    )
}

export default TodoItem