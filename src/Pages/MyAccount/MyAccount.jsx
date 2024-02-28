import { useContext, useRef, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { CartContext } from "../../Context/Context";
import './MyAccount.css'

function MyAccount() {
  const context = useContext(CartContext)
  const [view, setView] = useState('user-info')
  const form = useRef(null)

  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  // Function to edit user data
  const editAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    // Update account 
    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    context.setAccount(data)
  }

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
          <input type="text" id="name" name="name" defaultValue={parsedAccount.name} placeholder="Your Name"/>
        </div>
        <div className="myAccText">
          <label htmlFor="email">Email: </label>
          <input type="text" id="email" name="email" defaultValue={parsedAccount.email0} placeholder="Example@example.com" />
        </div>
        <div className="myAccText">
          <label htmlFor="password">Password: </label>
          <input type="text" id="password" name="password" defaultValue={parsedAccount.password} placeholder="******"/>
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
        <h2 className="font-medium text-xl text-center mb-6 w-80">My account</h2>
        {renderView()}
      </Layout>
    )
  }
  
export default MyAccount;