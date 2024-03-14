import { useContext, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { CartContext } from "../../Context/Context";
import Layout from "../../Components/Layout/Layout";

function SignIn() {
  const context = useContext(CartContext);
  const [view, setView] = useState('user-info')
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
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }
    // Create Account
    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    context.setAccount(data)
    // sign In
    handleSignIn()
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
          <span> {parsedAccount?.password} </span>
        </p>
        <Link
          to="/">
          <button
            className='bg-black disabled:bg-black/40 text-white  w-full rounded-lg py-3 mt-4 mb-2'
            onClick={() => handleSignIn()}
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
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='font-light text-sm'>Your email:</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={parsedAccount?.email}
            placeholder="Example@example.com"
            className='rounded-lg border border-black
            placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
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
          />
        </div>
        <Link to="/">
          <button
            className='bg-black text-white w-full rounded-lg py-3 mb-9'
            onClick={() => createAnAccount()}>
            Create
          </button>
        </Link>
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