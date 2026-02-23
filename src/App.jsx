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
              <h1 className="text-gradient mb-4">Return Decision Matrix</h1>
              <div className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                <p>Are you having difficulty deciding whether to go back to your home country or stay in your host country?</p>
                <p>Couldn't decide on what parameters should be evaluated to make the right choice?</p>
              </div>
              <p className="text-primary font-bold">
                Use this structured mentoring framework to evaluate your repatriation decision across multiple dimensions.
              </p>
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
