import { useContext, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/Context";
import Layout from "../../Components/Layout/Layout";

function SignIn() {
  const context = useContext(CartContext);
  const [view, setView] = useState('user-info')
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const form = useRef(null)

  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  // Has an account
  const withoutAccountInLStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const withoutAccountInLState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAcount = !withoutAccountInLStorage || !withoutAccountInLState 

  const handleSignIn = () => {
    const currentSignOutState = localStorage.getItem('sign-out')
    if (currentSignOutState === 'false') {
      return;
    }

    const stringifiedSignOut = JSON.stringify(true)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.signOut(true)

    // Redirigir al usuario a la página principal
    return <Navigate replace to={'/'} />
  }

  const createAnAccount = () => {
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
      return;
    }

    const data = { name, email, password };

    // Create Account
    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem('account', stringifiedAccount);
    context.setAccount(data);

     // sign In
    handleSignIn()

    // Redirigir a la página de inicio
    navigate('/');
  }

  const rederLogin = () => {
    return (
      <div className='flex flex-col w-80'>
        <h2>
          <span className='font-light text-sm'>Email: </span>
          <span> {parsedAccount?.email} </span>
        </h2>
        <p>
          <span className='font-light text-sm'>Password: </span>
          <input type="password" value={parsedAccount?.password} disabled />
        </p>
        <Link
          to="/">
          <button
            className='bg-black disabled:bg-black/40 text-white  w-full rounded-lg py-3 mt-4 mb-2'
            onClick={createAnAccount}
            disabled={!hasUserAnAcount}>
            Login
          </button>
        </Link>
        <div className='text-center'>
          <a className='font-light text-xs underline underline-offset-4' href='/'>Forgot my password</a>
        </div>
        <button
          className='border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3 mb-9'
          onClick={() => setView('create-user-info')}
          disabled={hasUserAnAcount}>
          Sign up
        </button>
      </div>
    )
  }

  const renderCreateUserInfo = () => {
    return (
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='font-light text-sm'>Your name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount?.name}
            placeholder="Name"
            className='rounded-lg border border-black placeholder:font-light
            placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
            required
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='font-light text-sm'>Your email:</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={parsedAccount?.email}
            placeholder="Example@example.com"
            className='rounded-lg border border-black
            placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password" className='font-light text-sm'>Your password:</label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={parsedAccount?.password}
            placeholder="******"
            className='rounded-lg border border-black
            placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
          <button
            type="button"
            className='bg-black text-white w-full rounded-lg py-3 mb-9'
            onClick={() => createAnAccount()}>
            Create
          </button>
      </form>
    )
  }

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : rederLogin()

  return (
    <Layout>
      <h1 className="font-medium text-xl text-center mb-6 w-80 mt-16">Welcome</h1>
      {renderView()}
    </Layout>
  )
}

export default SignIn;