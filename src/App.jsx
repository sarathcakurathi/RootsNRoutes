import React, { useState } from 'react';
import { Compass, BookOpen } from 'lucide-react';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import EvaluationForm from './components/EvaluationForm';
import ResultView from './components/ResultView';
import About from './pages/About';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'about'
  const [step, setStep] = useState(1); // 1: Personal, 2: Evaluation, 3: Results

  const [personalDetails, setPersonalDetails] = useState({
    fatherName: '',
    motherName: '',
    kids: [],
    dependents: [],
    currentStateCountry: '',
    homeStateCountry: '',
  });

  const [evaluationData, setEvaluationData] = useState({
    self: [],
    kids: [],
    dependents: []
  });

  const handleNextStep = () => {
    setStep(s => Math.min(s + 1, 3));
    window.scrollTo(0, 0);
  };

  const handlePrevStep = () => {
    setStep(s => Math.max(s - 1, 1));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header>
        <a href="#" className="logo text-gradient" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setStep(1); }}>
          <Compass size={28} className="text-primary" />
          Roots & Routes
        </a>
        <nav className="flex gap-4">
          <a href="#" className={currentPage === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Home</a>
          <a href="#" className={currentPage === 'about' ? 'active flex items-center gap-2' : 'flex items-center gap-2'} onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }}>
            <BookOpen size={18} /> About
          </a>
        </nav>
      </header>

      <main>
        {currentPage === 'about' ? (
          <About />
        ) : (
          <div className="glass-panel" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="text-center mb-8">
              <h1 className="text-gradient mb-6">Return Decision Matrix</h1>
              <div className="text-muted text-left mx-auto" style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '900px' }}>
                <p className="mb-6 text-center" style={{ fontSize: '1.25rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                  Are you feeling stuck between returning to your home country and continuing your life in your host country?
                </p>
                <p className="mb-4">
                  Many professionals reach this crossroads after gaining international exposure - but the decision to stay or return is rarely simple. It's not just about salary or job title. It involves career trajectory, financial stability, lifestyle preferences, family considerations, emotional well-being, long-term goals, and even identity.
                </p>
                <p className="mb-4">
                  Often, the real challenge isn't choosing - it's knowing <strong className="text-primary">what factors actually matter</strong> and how to evaluate them objectively.
                </p>
                <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                  <p className="m-0 text-center">
                    The Return Decision Matrix is a structured mentoring framework designed to help you make this decision with clarity and confidence. It guides you through a multi-dimensional evaluation of your situation.
                  </p>
                </div>
              </div>
            </div>

            <div className="steps">
              <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-label">Details</div>
              </div>
              <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
              <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-label">Evaluation</div>
              </div>
              <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-label">Results</div>
              </div>
            </div>

            {step === 1 && (
              <PersonalDetailsForm
                data={personalDetails}
                onChange={setPersonalDetails}
                onNext={handleNextStep}
              />
            )}

            {step === 2 && (
              <EvaluationForm
                personalDetails={personalDetails}
                data={evaluationData}
                onChange={setEvaluationData}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
              />
            )}

            {step === 3 && (
              <ResultView
                personalDetails={personalDetails}
                evaluationData={evaluationData}
                onPrev={handlePrevStep}
              />
            )}
          </div>
        )}
      </main>

      <footer style={{ textAlign: 'center', padding: '2rem 0', marginTop: '2rem', borderTop: '1px solid var(--surface-border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <p>© {new Date().getFullYear()} Roots & Routes. An open-source initiative.</p>
        <p>Built to help the global expatriate community make informed life decisions.</p>
      </footer>
    </>
  );
}

export default App;
