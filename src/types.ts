export interface Kid {
    name: string;
    age: string | number;
}

export interface Dependent {
    name: string;
    relation: string;
}

export interface PersonalDetailsData {
    fatherName: string;
    motherName: string;
    currentStateCountry: string;
    homeStateCountry: string;
    kids: Kid[];
    dependents: Dependent[];
}

export interface EvaluationItem {
    id: string;
    label: string;
    importance: number;
    probHome: number;
    probCurrent: number;
    challenges: string;
    mitigation: string;
}

export interface EvaluationData {
    self: EvaluationItem[];
    kids: EvaluationItem[];
    dependents: EvaluationItem[];
}
