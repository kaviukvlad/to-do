
import { useForm } from "../../hooks/useForm"
import { useContext } from 'react';
import { AuthContext } from "../../context/authContext";

export const Register = () => {

    const { handleRegisterWithCredentials } = useContext(AuthContext)

    const { handleChange, email, pass } = useForm({
        initialState: {
            email: '',
            pass: ''
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleRegisterWithCredentials(email, pass)
    }


    return (
        <div className="container-auth">
            <h2>Create an account</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    onChange={handleChange}
                    value={email}
                />
                <input
                    name="pass"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={pass}
                />
                <div className="container-buttons">
                    <button type="submit">Sign up</button>
                </div>
            </form>
        </div>
    )
}
