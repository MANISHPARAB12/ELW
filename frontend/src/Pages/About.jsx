
import "../Css/About.css";

export const About = () => {
  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <span className="about-badge">ABOUT ELW</span>

        <h1>
          Discover the Joy of
          <span> Reading</span>
        </h1>

        <p>
          ELW is your digital library, designed to make discovering,
          borrowing, and enjoying books simple and accessible.
        </p>

        <a href="/Home" className="about-primary-btn">
          Explore Books <span>→</span>
        </a>
      </section>

      {/* About Section */}
      <section className="about-intro">
        <div className="about-intro-content">
          <span className="about-section-label">WHO WE ARE</span>

          <h2>Your Library, Anytime, Anywhere.</h2>

          <p>
            ELW (E-Library Website) is a digital platform built to
            help readers explore books and manage their borrowing
            activities in one convenient place.
          </p>

          <p>
            Whether you want to discover a new author, explore
            different subjects, or keep track of borrowed books,
            ELW brings your reading experience together in one
            simple interface.
          </p>
        </div>

        <div className="about-book-illustration">
          <div className="about-book-icon">📚</div>
          <h3>A World of Knowledge</h3>
          <p>Every book opens a new possibility.</p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="about-purpose">
        <div className="about-purpose-card">
          <div className="about-purpose-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>
            To make book discovery and library management easier
            through a simple, accessible digital reading experience.
          </p>
        </div>

        <div className="about-purpose-card">
          <div className="about-purpose-icon">🌍</div>
          <h3>Our Vision</h3>
          <p>
            To encourage lifelong learning by helping more people
            discover books, explore knowledge, and build reading habits.
          </p>
        </div>

        <div className="about-purpose-card">
          <div className="about-purpose-icon">💡</div>
          <h3>Our Values</h3>
          <p>
            Accessibility, simplicity, curiosity, and a commitment
            to making the reading journey more convenient.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="about-features">
        <div className="about-features-heading">
          <span className="about-section-label">WHY CHOOSE ELW</span>
          <h2>Everything You Need for Your Reading Journey</h2>
          <p>
            Explore a library experience designed around readers.
          </p>
        </div>

        <div className="about-features-grid">
          <article className="about-feature-card">
            <div className="about-feature-icon">🔎</div>
            <h3>Discover Books</h3>
            <p>
              Explore available books and find your next read with ease.
            </p>
          </article>

          <article className="about-feature-card">
            <div className="about-feature-icon">📖</div>
            <h3>Easy Borrowing</h3>
            <p>
              Keep track of your borrowed books from your account.
            </p>
          </article>

          <article className="about-feature-card">
            <div className="about-feature-icon">👤</div>
            <h3>Your Account</h3>
            <p>
              Access your profile and manage your library activities.
            </p>
          </article>

          <article className="about-feature-card">
            <div className="about-feature-icon">💬</div>
            <h3>Reader Support</h3>
            <p>
              Contact us if you have questions or need assistance.
            </p>
          </article>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <h2>Ready to Find Your Next Favourite Book?</h2>
        <p>
          Start exploring the ELW library and make reading part
          of your everyday journey.
        </p>

        <a href="/Home" className="about-cta-btn">
          Start Exploring <span>→</span>
        </a>
      </section>
    </main>
  );
};

export default About;
