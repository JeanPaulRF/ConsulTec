import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"


function RegisterContainer() {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError("")
    try {
      await signup(user.email, user.password)
      navigate('/home')
    } catch (error) {
        setError(error.message);
    }
  }

  return (

    <div>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>

        <label htmlFor="email"> Email </label>
        <input
          type="email"
          name="email"
          placeholder="micorreo@direccion.com"
          onChange={handleChange}
        />

        <label htmlFor="password"> Contraseña </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="******"
          onChange={handleChange}
        />


        <button>Registrarse</button>
      </form>
    </div>
  )
}

export default RegisterContainer;