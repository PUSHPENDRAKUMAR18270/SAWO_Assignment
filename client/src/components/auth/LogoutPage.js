import  { Redirect } from 'react-router-dom'

const LogoutPage = ()=>{
  localStorage.removeItem("user")
  return (<Redirect to='/'/>);
}

export default LogoutPage