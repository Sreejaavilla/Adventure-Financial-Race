export type Screen = 'login' | 'occupation' | 'mode' | 'budget' | 'investment' | 'insurance' | 'tax' | 'dashboard';

export interface Budget {
    savings: number;
    rent: number;
    groceries: number;
    entertainment: number;
    investments: number;
}

export type InvestmentPath = 'bonds' | 'indexFunds' | 'stocks';

export type InvestmentAllocation = Record<InvestmentPath, number>;

export interface Expense {
    id: string;
    name: string;
    cost: number;
    isDeductible: boolean;
}

export interface Choice {
    text: string;
    action: () => void;
}

export interface Scenario {
    title: string;
    description: string;
    choices: Choice[];
}