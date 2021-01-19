import logo from './logo.svg';
import githubLogo from './GitHub_Logo_White.png';
import octocat from './Octocat.png';
import linkedIn from './LI-Logo.png';

const Home = () => (
    <>
        <img src={logo} className="App-logo" alt="logo" />
        <br />
        <p className="home-desc">
            Hello World!
            <br />
            This website is hosted on a Raspberry Pi in my home.
        </p>
        <br />
        <a
            className="App-link"
            href="https://github.com/esantini/eSantini"
            target="_blank"
            rel="noopener noreferrer"
            style={{width: '30%'}}
        >
            <img src={octocat} alt="octocat" style={{width: '30%'}} />
            <img src={githubLogo} alt="github logo" style={{width: '60%'}} />
        </a>
        <br />
        <a
            className="App-link"
            href="https://www.linkedin.com/in/estebansantini/"
            target="_blank"
            rel="noopener noreferrer"
            style={{width: '20%'}}
        >
            <img src={linkedIn} alt="linkedIn logo" style={{width: '80%'}} />
        </a>
    </>
);

export default Home;
