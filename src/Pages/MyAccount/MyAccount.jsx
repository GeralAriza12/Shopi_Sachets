import { useContext, useRef, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { CartContext } from "../../Context/Context";
import './MyAccount.css'

function MyAccount() {
  const context = useContext(CartContext);
  const [view, setView] = useState('user-info');
  const [errors, setErrors] = useState({});
  const form = useRef(null);

  // Account
  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);

  // Function to edit user data
  const editAccount = () => {
    const formData = new FormData(form.current);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const newErrors = {};

    // Validations
    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!password.trim()) {
      newErrors.password = 'Please enter your password';
    } else {
      // Check password strength
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
      if (!passwordRegex.test(password)) {
        newErrors.password = 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.';
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Evita continuar si hay errores
    }

    const data = { name, email, password };

    // Update account 
    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem('account', stringifiedAccount);
    context.setAccount(data);
    setView('user-info');
  };

  const renderUserInfo = () => {
    return (
      <div className='flex flex-col w-80'>
        <h2>
          <span className='font-light text-sm pr-3'>Name: </span>
          <span>{parsedAccount?.name}</span>
        </h2>
        <h2>
          <span className='font-light text-sm pr-3'>Email: </span>
          <span>{parsedAccount?.email}</span>
        </h2>
        <button
          className='border border-black rounded-lg mt-6 py-3 mb-9'
          onClick={() => setView('edit-user-info')}>
          Edit
        </button>
      </div>
    )
  }

  const renderEditUserInfo = () => {
    return (
      <form ref={form} >
        <div className="myAccText">
          <label htmlFor="name">Your name: </label>
          <input type="text" id="name" name="name" defaultValue={parsedAccount.name} placeholder="Your Name" required/>
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="myAccText">
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" defaultValue={parsedAccount.email} placeholder="Example@example.com" required />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="myAccText">
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" defaultValue={parsedAccount.password} placeholder="******" required />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <button
          className='bg-black text-white w-full rounded-lg py-3 mb-9'
          onClick={() => {setView('user-info'), editAccount()}}>
          Edit
        </button>
      </form>
    )
  }

  const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()

    return (
      <Layout>
        <h2 className="font-medium text-xl text-center mb-6 mt-11 w-80">My account</h2>
        {renderView()}
      </Layout>
    )
  }
  
export default MyAccount;