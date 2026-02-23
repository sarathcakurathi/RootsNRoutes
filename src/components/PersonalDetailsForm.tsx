import { ChangeEvent, FormEvent } from 'react';
import { Plus, Trash2, ArrowRight } from 'lucide-react';
import { PersonalDetailsData } from '../types';

interface PersonalDetailsFormProps {
    data: PersonalDetailsData;
    onChange: (data: PersonalDetailsData) => void;
    onNext: () => void;
}

export default function PersonalDetailsForm({ data, onChange, onNext }: PersonalDetailsFormProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    const addKid = () => {
        onChange({ ...data, kids: [...data.kids, { name: '', age: '' }] });
    };

    const removeKid = (index: number) => {
        const newKids = [...data.kids];
        newKids.splice(index, 1);
        onChange({ ...data, kids: newKids });
    };

    const updateKid = (index: number, field: keyof PersonalDetailsData['kids'][0], value: string) => {
        const newKids = [...data.kids];
        newKids[index] = { ...newKids[index], [field]: value };
        onChange({ ...data, kids: newKids });
    };

    const addDependent = () => {
        onChange({ ...data, dependents: [...data.dependents, { name: '', relation: '' }] });
    };

    const removeDependent = (index: number) => {
        const newDependents = [...data.dependents];
        newDependents.splice(index, 1);
        onChange({ ...data, dependents: newDependents });
    };

    const updateDependent = (index: number, field: keyof PersonalDetailsData['dependents'][0], value: string) => {
        const newDependents = [...data.dependents];
        newDependents[index] = { ...newDependents[index], [field]: value };
        onChange({ ...data, dependents: newDependents });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form id="personal-details-form" onSubmit={handleSubmit} className="flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mb-6">
                <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input
                        type="text"
                        name="fatherName"
                        className="form-input"
                        value={data.fatherName}
                        onChange={handleChange}
                        required
                        placeholder=""
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Spouse's Name</label>
                    <input
                        type="text"
                        name="motherName"
                        className="form-input"
                        value={data.motherName}
                        onChange={handleChange}
                        required
                        placeholder=""
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mb-8">
                <div className="form-group">
                    <label className="form-label">Current State & Country</label>
                    <input
                        type="text"
                        name="currentStateCountry"
                        className="form-input"
                        value={data.currentStateCountry}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Munich, Germany"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Home State & Country</label>
                    <input
                        type="text"
                        name="homeStateCountry"
                        className="form-input"
                        value={data.homeStateCountry}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Hyderabad, India"
                    />
                </div>
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <label className="form-label" style={{ marginBottom: 0 }}>Kids Details</label>
                    <button type="button" onClick={addKid} className="btn btn-secondary btn-icon-only" title="Add Kid">
                        <Plus size={18} /> Add
                    </button>
                </div>

                {data.kids.length === 0 ? (
                    <p className="text-muted text-sm italic">No kids added yet.</p>
                ) : (
                    data.kids.map((kid, index) => (
                        <div key={index} className="dynamic-list-item flex gap-4">
                            <div className="form-group" style={{ flex: 2 }}>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={kid.name}
                                    onChange={(e) => updateKid(index, 'name', e.target.value)}
                                    placeholder="Kid's Name"
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={kid.age}
                                    onChange={(e) => updateKid(index, 'age', e.target.value)}
                                    placeholder="Age"
                                    min="0"
                                />
                            </div>
                            <button type="button" onClick={() => removeKid(index)} className="btn btn-danger btn-icon-only">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <label className="form-label" style={{ marginBottom: 0 }}>Dependents Details (Parents / In-laws)</label>
                    <button type="button" onClick={addDependent} className="btn btn-secondary btn-icon-only" title="Add Dependent">
                        <Plus size={18} /> Add
                    </button>
                </div>

                {data.dependents.length === 0 ? (
                    <p className="text-muted text-sm italic">No dependents added yet.</p>
                ) : (
                    data.dependents.map((dep, index) => (
                        <div key={index} className="dynamic-list-item flex gap-4">
                            <div className="form-group" style={{ flex: 2 }}>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={dep.name}
                                    onChange={(e) => updateDependent(index, 'name', e.target.value)}
                                    placeholder="Dependent's Name"
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={dep.relation}
                                    onChange={(e) => updateDependent(index, 'relation', e.target.value)}
                                    placeholder="Relation (e.g. Father-in-law)"
                                    required
                                />
                            </div>
                            <button type="button" onClick={() => removeDependent(index)} className="btn btn-danger btn-icon-only">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-center mt-8">
                <button type="submit" className="btn btn-primary">
                    Continue to Evaluation <ArrowRight size={18} />
                </button>
            </div>
        </form>
    );
}
