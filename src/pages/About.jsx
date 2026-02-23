import React from 'react';
import { Award, Heart } from 'lucide-react';

export default function About() {
    return (
        <div className="glass-panel" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="text-center mb-8">
                <Heart size={48} className="text-secondary mb-4 mx-auto" />
                <h1 className="text-gradient">About the Framework</h1>
                <p className="text-muted text-lg mt-2">
                    Providing guidance on taking difficult decisions in uncertain times.
                </p>
            </div>

            <div className="mb-8" style={{ lineHeight: '1.8' }}>
                <h3 className="mb-4">The Challenge of Repatriation</h3>
                <p className="mb-4 text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    In today's uncertain world, professionals who have been working in a host country often face the complex, emotional decision of returning to their home country. The reasons for this shift vary widely - navigating visa uncertainties, prioritizing children's education in a specific culture, worrying about the health of aging parents back home, or simply answering the deep-seated desire to return to one's roots.
                </p>
                <p className="mb-8 text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    Making this call is incredibly difficult and rarely black-and-white. It impacts not just the individual, but their entire family ecosystem. This platform was built to digitize a structured mentoring and evaluation framework, helping individuals and families weigh their priorities across multiple dimensions to make an informed, balanced, and confident decision.
                </p>

                <h3 className="mb-4 mt-8">How Evaluation is Done</h3>
                <p className="mb-4 text-muted">
                    The framework uses a weighted scoring mechanism:
                </p>
                <ul className="mb-8 text-muted" style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                    <li><strong className="text-primary">Importance:</strong> You assign a weight (1-10) to each parameter based on how crucial it is to your life objectives.</li>
                    <li><strong className="text-primary">Probability Rate:</strong> For both your <em>Home Country</em> and <em>Current Country</em>, you rate (1-10) the likelihood of that parameter being fulfilled or its current state of satisfaction.</li>
                    <li><strong className="text-primary">Calculation:</strong> The final alignment score is calculated by multiplying the Importance by the Probability for each parameter, summing these values across the category, and returning normalized comparative scores.</li>
                </ul>
                <p className="mb-8">
                    This quantitative approach allows you to step back and rationally evaluate your priorities, reducing emotional bias and providing a logical comparison for your decision matrix.
                </p>
            </div>

            <div className="glass-panel" style={{ background: 'rgba(255, 255, 255, 0.05)', borderLeft: '4px solid var(--primary-color)' }}>
                <div className="flex items-center gap-3 mb-4">
                    <Award className="text-primary" size={28} />
                    <h3 style={{ margin: 0 }}>Acknowledgments & Credits</h3>
                </div>
                <p className="mb-4 text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    I would like to extend my sincere gratitude to <a href="https://www.linkedin.com/in/amitsaha5959/" target="_blank" rel="noreferrer" className="text-primary" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Mr. Amit Saha</a> for designing the original evaluation framework that serves as the foundation of this tool. His structured thinking and thoughtful insights created a powerful decision-making model that has potential to help many individuals navigate one of the most significant transitions in their professional and personal lives.
                </p>
                <p className="mb-4 text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    Initially developed as a well-organized excel framework, I have expanded upon his work by incorporating additional dimensions - particularly around dependents - and transforming it into a comprehensive digital platform for broader accessibility and usability.
                </p>
                <p className="mb-8 text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    I personally relied on this framework when making the decision to repatriate from Düsseldorf, Germany, to India in 2022. It provided clarity during a complex life decision, and I can confidently say that I have no regrets about that choice. This platform stands as both a continuation of that original vision and a testament to its effectiveness. <br /><br />
                    - Developed & Maintained by <a href="https://www.linkedin.com/in/sarathcakurathi/" target="_blank" rel="noreferrer" className="text-primary" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Sarath Chandra Raja Akurathi</a>
                </p>
            </div>
        </div>
    );
}
