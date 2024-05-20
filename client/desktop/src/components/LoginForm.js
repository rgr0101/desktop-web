import tech from '../assets/tech.png';

export const LoginForm = () => {
  return (
    <div className="login-container">
    <div className="login-box">

    <div className="login-welcome__img">
          <img src={tech} alt="Technology" />
    </div>

    <h2>Welcome!</h2>
        
      
     
      <form>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button className="btm_submit" type="submit">Login</button>
      </form>
    </div>
  </div>
  )
}
