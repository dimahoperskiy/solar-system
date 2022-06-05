import './App.css';
import Earth from "../Earth/Earth";
import SolarSystem from "../SolarSystem/SolarSystem";

const App = () => {
    return (
        <div className="app">
            {/*<h1 className="label">Welcome to the Universe!</h1>*/}
            <div className="canvas-wrapper">
                <h1 className="label">Welcome to the Solar System!</h1>
                <Earth/>
            </div>

            <section>
                <SolarSystem/>
            </section>
        </div>
    )
}

export default App;
