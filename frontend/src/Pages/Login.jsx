import "../Css/Login.css"

export const Login = () => {
  return (
    <>
      <div className="form-container">
          <form className="form">
            <div className="input-group">

            <label htmlFor="email">Email</label>
            
            <br />  
            <input type="email" />
            </div>
            
            <br />
            <div className="input-group">

            <label htmlFor="password">Password</label>
            
            <br />
            <input type="password" />
            </div>
            
            <br />
            <button className="btn">Login</button>
          </form>
      </div>
    </>
  )
}