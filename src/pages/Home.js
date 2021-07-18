import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function Home() {
  return (
    <div>
      <br></br>
      <section>
        <div className="jumbotron jumbotron-fluid py-5">
          <div className="container text-center py-5">
            <h1 className="display-4">Welcome to Praxis</h1>
            <p className="lead">A smart spreadsheet for all your data needs.</p>
            <div className="mt-4">
              <Link className="btn btn-primary px-5 mr-3" to="/signup">
                Create New Account
              </Link>
              <Link className="btn px-5" to="/login">
                Login to Your Account
              </Link>
            </div>
            <br></br>
            <a href="/projects">Projects</a>
            <br></br>
            <a href="/kanban">Project Board</a>
            <br></br>
            <a href="/grid">Grid</a>
            <br></br>
            <a href="/pivot">Pivot</a>
            <br></br>
            <a href="#">Settings</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
