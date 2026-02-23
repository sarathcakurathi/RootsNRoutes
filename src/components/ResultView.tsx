import { ArrowLeft, Download, FileSpreadsheet, TrendingUp } from 'lucide-react';
import * as XLSX from 'xlsx';
import { CATEGORIES } from '../utils/categories';
import { PersonalDetailsData, EvaluationData, EvaluationItem } from '../types';

interface ResultViewProps {
    personalDetails: PersonalDetailsData;
    evaluationData: EvaluationData;
    onPrev: () => void;
}

export default function ResultView({ personalDetails, evaluationData, onPrev }: ResultViewProps) {

    const calculateScore = (dataGroup: EvaluationItem[]) => {
        let homeScore = 0;
        let currentScore = 0;
        let totalImportance = 0;

        dataGroup.forEach(item => {
            // Weighted score
            homeScore += (item.probHome * item.importance);
            currentScore += (item.probCurrent * item.importance);
            totalImportance += item.importance;
        });

        // Normalize out of 100 if we have items
        if (totalImportance === 0) return { home: 0, current: 0 };

        return {
            home: Math.round((homeScore / (totalImportance * 10)) * 100),
            current: Math.round((currentScore / (totalImportance * 10)) * 100)
        };
    };

    const selfScores = calculateScore(evaluationData.self);
    const kidsScores = calculateScore(evaluationData.kids);
    const depsScores = calculateScore(evaluationData.dependents);

    const hasKids = personalDetails.kids && personalDetails.kids.length > 0;
    const hasDependents = personalDetails.dependents && personalDetails.dependents.length > 0;

    const getHighlights = (isHome: boolean) => {
        let all: EvaluationItem[] = [...evaluationData.self];
        if (hasKids) all = [...all, ...evaluationData.kids];
        if (hasDependents) all = [...all, ...evaluationData.dependents];

        return all.map(item => {
            const homeScore = item.probHome * item.importance;
            const currentScore = item.probCurrent * item.importance;
            const scoreDiff = isHome ? (homeScore - currentScore) : (currentScore - homeScore);
            return { ...item, scoreDiff };
        })
            .filter(item => item.scoreDiff > 0)
            .sort((a, b) => b.scoreDiff - a.scoreDiff)
            .slice(0, 3);
    };

    const homeHighlights = getHighlights(true);
    const currentHighlights = getHighlights(false);

    const handleDownloadExcel = () => {
        const wb = XLSX.utils.book_new();

        // 1. Personal Info Sheet
        const personalInfoData: any[][] = [
            ['Repatriation Mentoring Framework Details'],
            [],
            ['Father\'s Name', personalDetails.fatherName],
            ['Mother\'s Name', personalDetails.motherName],
            ['Current Location', personalDetails.currentStateCountry],
            ['Home Location', personalDetails.homeStateCountry],
            [],
            ['Kids'],
            ['Name', 'Age']
        ];

        personalDetails.kids.forEach(kid => {
            personalInfoData.push([kid.name, kid.age]);
        });

        personalInfoData.push([], ['Dependents'], ['Name', 'Relation']);
        personalDetails.dependents.forEach(dep => {
            personalInfoData.push([dep.name, dep.relation]);
        });

        const wsPersonalInfo = XLSX.utils.aoa_to_sheet(personalInfoData);
        XLSX.utils.book_append_sheet(wb, wsPersonalInfo, 'Personal Details');

        // 2. Evaluation Sheet
        const evaluationRows: any[][] = [
            ['Objectives', 'Description', 'Scores (1-10)', '', '', 'Challenges', 'Mitigation'],
            ['', '', 'Importance', `Probability (${personalDetails.homeStateCountry || 'Home'})`, `Probability (${personalDetails.currentStateCountry || 'Current'})`, '', '']
        ];

        const addSection = (title: string, data: EvaluationItem[]) => {
            if (data.length === 0) return;
            evaluationRows.push([title, '', '', '', '', '', '']); // Section header
            data.forEach(item => {
                // Need to find the description from the origin category if not in state, but label is in state.
                // Let's find it from the categorization logic or just use the description since it's not saved to state.
                // Wait, the item saved in state `evaluationData` only has id, label, importance, etc.
                // I should find the description using the ID.
                let desc = '';
                if (title === 'Self') desc = CATEGORIES.self.find(c => c.id === item.id)?.description || '';
                if (title === 'Kids') desc = CATEGORIES.kids.find(c => c.id === item.id)?.description || '';
                if (title === 'Dependents') desc = CATEGORIES.dependents.find(c => c.id === item.id)?.description || '';

                evaluationRows.push([
                    item.label,
                    desc,
                    item.importance,
                    item.probHome,
                    item.probCurrent,
                    item.challenges,
                    item.mitigation
                ]);
            });
            evaluationRows.push([]); // Empty row spacing
        };

        addSection('Self', evaluationData.self);
        if (hasKids) addSection('Kids', evaluationData.kids);
        if (hasDependents) addSection('Dependents', evaluationData.dependents);

        const wsEvaluation = XLSX.utils.aoa_to_sheet(evaluationRows);

        // Auto-fit column widths
        const colWidths = [
            { wch: 30 }, // Objectives
            { wch: 50 }, // Description
            { wch: 15 }, // Importance
            { wch: 25 }, // Home
            { wch: 25 }, // Current
            { wch: 40 }, // Challenges
            { wch: 40 }  // Mitigation
        ];
        wsEvaluation['!cols'] = colWidths;

        XLSX.utils.book_append_sheet(wb, wsEvaluation, 'Evaluation Matrix');

        // Save
        XLSX.writeFile(wb, 'RootsNRoutes-Decision-Matrix.xlsx');
    };

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="mb-2">Your Assessment Results</h2>
                <p className="text-muted">Based on the factors you evaluated, here is a comparative view of your alignment.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-6 mb-8">
                <div className="glass-panel" style={{ borderLeft: '4px solid var(--accent-color)' }}>
                    <h3 className="mb-4">{personalDetails.homeStateCountry || 'Home Country'}</h3>

                    <div className="mb-4">
                        <div className="flex justify-between mb-1">
                            <span className="text-sm">Self Alignment</span>
                            <span className="font-bold">{selfScores.home}%</span>
                        </div>
                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                            <div className="bg-accent h-full" style={{ width: `${selfScores.home}%`, background: 'var(--accent-color)' }}></div>
                        </div>
                    </div>

                    {hasKids && (
                        <div className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm">Kids Alignment</span>
                                <span className="font-bold">{kidsScores.home}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                <div className="h-full" style={{ width: `${kidsScores.home}%`, background: 'var(--accent-color)' }}></div>
                            </div>
                        </div>
                    )}

                    {hasDependents && (
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm">Dependents Alignment</span>
                                <span className="font-bold">{depsScores.home}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                <div className="h-full" style={{ width: `${depsScores.home}%`, background: 'var(--accent-color)' }}></div>
                            </div>
                        </div>
                    )}

                    {homeHighlights.length > 0 && (
                        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--surface-border)' }}>
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp size={18} className="text-accent" />
                                <h4 className="font-bold text-sm text-muted m-0">Key Driving Factors</h4>
                            </div>
                            <ul className="space-y-3 p-0 m-0" style={{ listStyle: 'none' }}>
                                {homeHighlights.map(item => (
                                    <li key={item.id} className="text-sm flex flex-col gap-1 p-3 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)' }}>
                                        <strong className="text-primary">{item.label}</strong>
                                        <div className="flex justify-between text-muted" style={{ fontSize: '0.75rem' }}>
                                            <span>Importance: {item.importance}/10</span>
                                            <span>Probability: {item.probHome}/10</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="glass-panel" style={{ borderLeft: '4px solid var(--secondary-color)' }}>
                    <h3 className="mb-4">{personalDetails.currentStateCountry || 'Current Country'}</h3>

                    <div className="mb-4">
                        <div className="flex justify-between mb-1">
                            <span className="text-sm">Self Alignment</span>
                            <span className="font-bold">{selfScores.current}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                            <div className="h-full" style={{ width: `${selfScores.current}%`, background: 'var(--secondary-color)' }}></div>
                        </div>
                    </div>

                    {hasKids && (
                        <div className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm">Kids Alignment</span>
                                <span className="font-bold">{kidsScores.current}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                <div className="h-full" style={{ width: `${kidsScores.current}%`, background: 'var(--secondary-color)' }}></div>
                            </div>
                        </div>
                    )}

                    {hasDependents && (
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm">Dependents Alignment</span>
                                <span className="font-bold">{depsScores.current}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                <div className="h-full" style={{ width: `${depsScores.current}%`, background: 'var(--secondary-color)' }}></div>
                            </div>
                        </div>
                    )}

                    {currentHighlights.length > 0 && (
                        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--surface-border)' }}>
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp size={18} className="text-secondary" />
                                <h4 className="font-bold text-sm text-muted m-0">Key Driving Factors</h4>
                            </div>
                            <ul className="space-y-3 p-0 m-0" style={{ listStyle: 'none' }}>
                                {currentHighlights.map(item => (
                                    <li key={item.id} className="text-sm flex flex-col gap-1 p-3 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)' }}>
                                        <strong className="text-primary">{item.label}</strong>
                                        <div className="flex justify-between text-muted" style={{ fontSize: '0.75rem' }}>
                                            <span>Importance: {item.importance}/10</span>
                                            <span>Probability: {item.probCurrent}/10</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="glass-panel text-center mb-8 bg-opacity-50">
                <FileSpreadsheet size={48} className="text-primary mb-4 mx-auto" />
                <h3 className="mb-2">Download Your Framework</h3>
                <p className="text-muted mb-6">
                    Export your detailed assessment to Excel for further reflection and to share with your family or mentor.
                </p>
                <button onClick={handleDownloadExcel} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                    <Download size={20} /> Download Excel Matrix
                </button>
            </div>

            <div className="flex justify-start">
                <button type="button" onClick={onPrev} className="btn btn-secondary">
                    <ArrowLeft size={18} /> Back to Edit
                </button>
            </div>
        </div>
    );
}
