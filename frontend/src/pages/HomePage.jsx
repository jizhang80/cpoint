import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <main className="main-content">
      <section className="hero">
        <h1>Welcome to CPoint</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation.
        </p>
        <div className="hero-buttons">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="#about" className="btn">
                Learn More
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="features">
        <h2>Website Functions</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Easy Integration</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum 
              at risus mi. Aliquam in dictum nulla. Nullam consectetur, arcu vitae 
              tempus facilisis, nunc dolor sodales lectus.
            </p>
          </div>
          <div className="feature-card">
            <h3>Secure Platform</h3>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
              reprehenderit in voluptate.
            </p>
          </div>
          <div className="feature-card">
            <h3>Real-time Analytics</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa 
              quae ab illo inventore.
            </p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit 
              aut fugit, sed quia consequuntur magni dolores eos qui ratione 
              voluptatem sequi nesciunt.
            </p>
          </div>
          <div className="feature-card">
            <h3>Scalable Solution</h3>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
              consectetur, adipisci velit, sed quia non numquam eius modi 
              tempora incidunt.
            </p>
          </div>
          <div className="feature-card">
            <h3>Advanced Features</h3>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui 
              blanditiis praesentium voluptatum deleniti atque corrupti quos 
              dolores et quas molestias.
            </p>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-content">
          <h2>About CPoint</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
            in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </section>
    </main>
  );
};

export default HomePage;