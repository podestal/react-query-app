import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import createUser from "../api/createUser"


const Register = () => {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [pwd, setPwd] = useState("")

    const {mutate: registerMutation} = useMutation({
        mutationFn: (user) => createUser(user)
    })

    const handleSubmit = e => {
        e.preventDefault()
        registerMutation({
            email,
            username,
            password: pwd
        })
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={pwd}
                    onChange={e => setPwd(e.target.value)}
                />
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register