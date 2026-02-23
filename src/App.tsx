import { useState } from 'react';
import { Compass, BookOpen, ArrowRight } from 'lucide-react';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import EvaluationForm from './components/EvaluationForm';
import ResultView from './components/ResultView';
import About from './pages/About';
import { PersonalDetailsData, EvaluationData } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home'); // 'home', 'about'
  const [step, setStep] = useState<number>(1); // 1: Personal, 2: Evaluation, 3: Results

  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsData>({
    fatherName: '',
    motherName: '',
    kids: [],
    dependents: [],
    currentStateCountry: '',
    homeStateCountry: '',
  });

  const [evaluationData, setEvaluationData] = useState<EvaluationData>({
    self: [],
    kids: [],
    dependents: []
  });

  const handleStepClick = (newStep: number) => {
    if (step === 1 && newStep > 1) {
      const form = document.getElementById('personal-details-form') as HTMLFormElement;
      if (form && !form.reportValidity()) {
        return;
      }
    }
    setStep(newStep);
    window.scrollTo(0, 0);
  };

  const handleNextStep = () => {
    handleStepClick(Math.min(step + 1, 3));
  };

  const handlePrevStep = () => {
    handleStepClick(Math.max(step - 1, 1));
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
              <h1 className="text-gradient mb-6">The Homecoming Compass</h1>
              {step === 1 && (
                <div className="text-muted text-left mx-auto" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  <p className="mb-4">
                    Are you feeling stuck between returning to your home country and continuing your life in your host country?
                  </p>
                  <p className="mb-4">
                    Many professionals reach this crossroads after gaining international exposure -
                    but the decision to stay or return is rarely simple. It’s not just about salary or job title. It involves career trajectory, financial stability, lifestyle preferences, family considerations, emotional well-being, long-term goals, and even identity.
                  </p>
                  <p className="mb-4">
                    Often, the real challenge isn’t choosing - it’s knowing what factors actually matter and how to evaluate them objectively.
                  </p>
                  <p className="mb-6">
                    The The Homecoming Compass is a structured mentoring framework designed to help you make this decision with clarity and confidence. It guides you through a multi-dimensional evaluation of your situation, including:
                  </p>

                  <div className="features-grid">
                    {/* Card 1 */}
                    <div className="glass-panel criteria-card" style={{ borderTop: '4px solid var(--primary-color)' }}>
                      <ul className="m-0 text-left text-muted" style={{ listStyleType: 'none', padding: 0 }}>
                        <li className="dynamic-list-item" style={{ marginBottom: '0.5rem', padding: '0.75rem' }}><span className="text-primary mt-1">•</span> Career growth and opportunity landscape</li>
                        <li className="dynamic-list-item" style={{ marginBottom: '0.5rem', padding: '0.75rem' }}><span className="text-primary mt-1">•</span> Compensation and long-term wealth creation</li>
                        <li className="dynamic-list-item" style={{ marginBottom: '0.5rem', padding: '0.75rem' }}><span className="text-primary mt-1">•</span> Cost of living and financial security</li>
                        <li className="dynamic-list-item" style={{ marginBottom: '0.5rem', padding: '0.75rem' }}><span className="text-primary mt-1">•</span> Professional network strength</li>
                        <li className="dynamic-list-item" style={{ marginBottom: '0.5rem', padding: '0.75rem' }}><span className="text-primary mt-1">•</span> Family priorities and support systems</li>
                        <li className="dynamic-list-item" style={{ marginBottom: '0.5rem', padding: '0.75rem' }}><span className="text-primary mt-1">•</span> Lifestyle alignment and personal fulfillment</li>
                        <li className="dynamic-list-item" style={{ marginBottom: '0.5rem', padding: '0.75rem' }}><span className="text-primary mt-1">•</span> Immigration stability and future certainty</li>
                        <li className="dynamic-list-item" style={{ marginBottom: '0', padding: '0.75rem' }}><span className="text-primary mt-1">•</span> Emotional readiness and long-term vision</li>
                      </ul>
                    </div>

                    {/* Arrow Iterator */}
                    <div className="desktop-arrow">
                      <ArrowRight size={28} />
                    </div>

                    {/* Card 2 */}
                    <div className="glass-panel criteria-card" style={{ borderTop: '4px solid var(--secondary-color)', background: 'rgba(99, 102, 241, 0.03)' }}>
                      <p className="mb-4 font-bold text-primary text-left">
                        Instead of relying on impulse, peer pressure, or short-term discomfort, this framework helps you:
                      </p>
                      <ul className="m-0 text-left text-muted" style={{ listStyleType: 'none', padding: 0 }}>
                        <li className="dynamic-list-item" style={{ marginBottom: '0.5rem', padding: '0.75rem' }}><span className="text-secondary mt-1 font-bold">✓</span> Define your decision criteria clearly</li>
                        <li className="dynamic-list-item" style={{ marginBottom: '0.5rem', padding: '0.75rem' }}><span className="text-secondary mt-1 font-bold">✓</span> Assign weight to what truly matters to you</li>
                        <li className="dynamic-list-item" style={{ marginBottom: '0.5rem', padding: '0.75rem' }}><span className="text-secondary mt-1 font-bold">✓</span> Compare both options objectively</li>
                        <li className="dynamic-list-item" style={{ marginBottom: '0.5rem', padding: '0.75rem' }}><span className="text-secondary mt-1 font-bold">✓</span> Identify trade-offs and hidden risks</li>
                        <li className="dynamic-list-item" style={{ marginBottom: '0', padding: '0.75rem' }}><span className="text-secondary mt-1 font-bold">✓</span> Arrive at a reasoned, personalized decision</li>
                      </ul>
                    </div>
                  </div>
                  <div className="glass-panel mt-8 mb-6" style={{ borderTop: '4px solid var(--primary-color)', background: 'linear-gradient(to right, rgba(99, 102, 241, 0.03), rgba(236, 72, 153, 0.03))' }}>
                    <p className="m-0 text-center font-bold text-primary" style={{ fontSize: '1.15rem', lineHeight: '1.6' }}>
                      <span className="text-gradient" style={{ fontSize: '1.35rem' }}>
                        Whether you're considering repatriation for family, career advancement, financial reasons, or simply a change in direction, the The Homecoming Compass provides a systematic approach to evaluate your options holistically.<br />
                        <b>Make your next move intentional - not reactive.</b>
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="steps">
              <div
                className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}
                onClick={() => handleStepClick(1)}
                style={{ cursor: 'pointer' }}
              >
                <div className="step-number">1</div>
                <div className="step-label">Details</div>
              </div>
              <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
              <div
                className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}
                onClick={() => handleStepClick(2)}
                style={{ cursor: 'pointer' }}
              >
                <div className="step-number">2</div>
                <div className="step-label">Evaluation</div>
              </div>
              <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
              <div
                className={`step ${step >= 3 ? 'active' : ''}`}
                onClick={() => handleStepClick(3)}
                style={{ cursor: 'pointer' }}
              >
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
