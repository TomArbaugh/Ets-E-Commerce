import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const validateForm = () => {
    const newErrors = {};
    if (password !== confirmPassword) newErrors.password =  "Confirm Password field must be the same as the Password field"
    if (password.length < 6 || password.length > 20) newErrors.passwordLength = "Password must be between 6 and 20 characters."
    if (!email.includes('@')) newErrors.email = "Please provide a valid email"
    if (username.length < 3 || username.length > 30) newErrors.username = "Username must be between 3 and 30 characters"
    if (first_name.length < 3 || first_name.length > 30) newErrors.firstName = "First name must be between 3 and 30 characters"
    if (last_name.length < 3 || last_name.length > 30) newErrors.lastName = "Last name must be between 3 and 30 characters"
   
    return newErrors;
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        first_name,
        last_name,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="signup-modal-container">
        <h2>Create your account</h2>
        <p>Registration is easy.</p>
        {errors.server && <p>{errors.server}</p>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
          <label>
            First Name
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p>{errors.firstName}</p>}
          <label>
            Last Name
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p>{errors.lastName}</p>}
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p>{errors.username}</p>}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p>{errors.password}</p>}
          {errors.passwordLength && <p>{errors.passwordLength}</p>}
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
