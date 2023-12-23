import { useState } from "react"
import createTodoRequest from "../api/createTodoRequest"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const CreateTodoForm = () => {

    const [text, setText] = useState("")
    const queryClient = useQueryClient()

    const { mutate: createMutation } = useMutation({
        mutationFn: (content) => createTodoRequest(content),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["todos"]})
    })

    const handleSubmit = e => {
        e.preventDefault()
        createMutation(text)
        setText("")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="New Todo"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}

export default CreateTodoForm