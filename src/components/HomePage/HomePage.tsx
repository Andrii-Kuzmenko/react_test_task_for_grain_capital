import './HomePage.scss';

export const HomePage = () => {
  return (
    <>
      <h2 className="homePage">Hello, this is the home page!</h2>
      <p className="homePage">
        This is an application that fetches users data from the server 
        and displays it in a table format.
        You can search for users by name or username, 
        view user data, update their information, and add new users
      </p>
      
      <p>Used technologies:</p>
      <ul>
        <li>Redux</li>
        <li>React</li>
        <li>Typescript</li>
        <li>JavaScript</li>
        <li>HTML</li>
        <li>SCSS</li>
        <li>React Router</li>
      </ul>
    </>
  )
}