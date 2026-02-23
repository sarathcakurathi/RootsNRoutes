import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../utils/categories';

const EvaluationRow = ({ item, data, onChange, homeLabel, currentLabel }) => {
    const rowData = data.find(d => d.id === item.id) || {
        id: item.id,
        label: item.label,
        importance: 5,
        probHome: 5,
        probCurrent: 5,
        challenges: '',
        mitigation: ''
    };

    const updateField = (field, value) => {
        const newData = data.filter(d => d.id !== item.id);
        onChange([...newData, { ...rowData, [field]: value }]);
    };

    return (
        <>
            <tr style={{ borderBottom: '1px solid transparent', transition: 'background 0.2s' }} className="hover:bg-white/5">
                <td style={{ padding: '1rem', verticalAlign: 'top', width: '25%' }}>
                    <div className="text-primary font-bold mb-1">{item.label}</div>
                    <div className="text-muted text-sm" style={{ lineHeight: '1.4' }}>{item.description}</div>
                </td>
                <td style={{ padding: '1rem', verticalAlign: 'top', width: '25%' }}>
                    <div className="flex justify-between text-sm mb-2">
                        <span>Weight</span>
                        <span className="font-bold">{rowData.importance}/10</span>
                    </div>
                    <input
                        type="range" min="1" max="10"
                        value={rowData.importance}
                        onChange={(e) => updateField('importance', parseInt(e.target.value))}
                    />
                </td>
                <td style={{ padding: '1rem', verticalAlign: 'top', width: '25%' }}>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-accent truncate pr-1" title={homeLabel}>{homeLabel}</span>
                        <span className="font-bold text-accent">{rowData.probHome}/10</span>
                    </div>
                    <input
                        type="range" min="1" max="10"
                        value={rowData.probHome}
                        onChange={(e) => updateField('probHome', parseInt(e.target.value))}
                    />
                </td>
                <td style={{ padding: '1rem', verticalAlign: 'top', width: '25%' }}>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-secondary truncate pr-1" title={currentLabel}>{currentLabel}</span>
                        <span className="font-bold text-secondary">{rowData.probCurrent}/10</span>
                    </div>
                    <input
                        type="range" min="1" max="10"
                        value={rowData.probCurrent}
                        onChange={(e) => updateField('probCurrent', parseInt(e.target.value))}
                    />
                </td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                <td colSpan="4" style={{ padding: '0 1rem 1rem 1rem' }}>
                    <div className="flex gap-4">
                        <textarea
                            className="form-textarea text-sm"
                            style={{ padding: '0.5rem', minHeight: '40px', flex: 1 }}
                            rows="1"
                            value={rowData.challenges}
                            onChange={(e) => updateField('challenges', e.target.value)}
                            placeholder={`Challenges...`}
                        ></textarea>
                        <textarea
                            className="form-textarea text-sm"
                            style={{ padding: '0.5rem', minHeight: '40px', flex: 1 }}
                            rows="1"
                            value={rowData.mitigation}
                            onChange={(e) => updateField('mitigation', e.target.value)}
                            placeholder="Mitigation Plan..."
                        ></textarea>
                    </div>
                </td>
            </tr>
        </>
    );
};


export default function EvaluationForm({ personalDetails, data, onChange, onNext, onPrev }) {
    const [activeTab, setActiveTab] = useState('self'); // 'self', 'kids', 'dependents'

    // Initialize empty data if needed
    useEffect(() => {
        const initData = { ...data };
        let changed = false;

        // Auto-populate data lists with default values if they are empty
        if (initData.self.length === 0) {
            initData.self = CATEGORIES.self.map(item => ({ id: item.id, label: item.label, importance: 5, probHome: 5, probCurrent: 5, challenges: '', mitigation: '' }));
            changed = true;
        }
        if (initData.kids.length === 0 && personalDetails.kids.length > 0) {
            initData.kids = CATEGORIES.kids.map(item => ({ id: item.id, label: item.label, importance: 5, probHome: 5, probCurrent: 5, challenges: '', mitigation: '' }));
            changed = true;
        }
        if (initData.dependents.length === 0 && personalDetails.dependents.length > 0) {
            initData.dependents = CATEGORIES.dependents.map(item => ({ id: item.id, label: item.label, importance: 5, probHome: 5, probCurrent: 5, challenges: '', mitigation: '' }));
            changed = true;
        }

        if (changed) {
            onChange(initData);
        }
    }, []);

    const homeLabel = personalDetails.homeStateCountry || 'Home Country';
    const currentLabel = personalDetails.currentStateCountry || 'Current Country';

    const handleDataChange = (category, newData) => {
        onChange({ ...data, [category]: newData });
    };

    const hasKids = personalDetails.kids && personalDetails.kids.length > 0;
    const hasDependents = personalDetails.dependents && personalDetails.dependents.length > 0;

    return (
        <div>
            <div className="flex gap-4 mb-6" style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
                <button
                    className={`btn ${activeTab === 'self' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('self')}
                >
                    Self ({personalDetails.fatherName || 'You'} & {personalDetails.motherName || 'Spouse'})
                </button>

                {hasKids && (
                    <button
                        className={`btn ${activeTab === 'kids' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('kids')}
                    >
                        Kids ({personalDetails.kids.map(k => k.name).join(', ')})
                    </button>
                )}

                {hasDependents && (
                    <button
                        className={`btn ${activeTab === 'dependents' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('dependents')}
                    >
                        Dependents ({personalDetails.dependents.map(d => d.name).join(', ')})
                    </button>
                )}
            </div>

            <div className="glass-panel overflow-x-auto mb-8" style={{ padding: 0 }}>
                <table className="w-full text-left" style={{ borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid var(--surface-border)' }}>
                        <tr>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Parameter</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Importance</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Probability ({homeLabel})</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Probability ({currentLabel})</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeTab === 'self' && CATEGORIES.self.map(item => (
                            <EvaluationRow
                                key={item.id}
                                item={item}
                                data={data.self}
                                onChange={(newData) => handleDataChange('self', newData)}
                                homeLabel={homeLabel}
                                currentLabel={currentLabel}
                            />
                        ))}

                        {activeTab === 'kids' && CATEGORIES.kids.map(item => (
                            <EvaluationRow
                                key={item.id}
                                item={item}
                                data={data.kids}
                                onChange={(newData) => handleDataChange('kids', newData)}
                                homeLabel={homeLabel}
                                currentLabel={currentLabel}
                            />
                        ))}

                        {activeTab === 'dependents' && CATEGORIES.dependents.map(item => (
                            <EvaluationRow
                                key={item.id}
                                item={item}
                                data={data.dependents}
                                onChange={(newData) => handleDataChange('dependents', newData)}
                                homeLabel={homeLabel}
                                currentLabel={currentLabel}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between mt-8">
                <button type="button" onClick={onPrev} className="btn btn-secondary">
                    <ArrowLeft size={18} /> Back
                </button>
                <button type="button" onClick={onNext} className="btn btn-primary">
                    View Results <CheckCircle2 size={18} />
                </button>
            </div>
        </div>
    );
}
