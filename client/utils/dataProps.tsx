export interface accountBalanceProp {
    currency: string,
    available: number,
    current: number,
    overdraft: number,
    updateTimestamp: string
}

export interface accountDetailProp{
    accountId: string,
    accountType: string,
    displayName: string,
    accountNumber: accountNumberProp,
    provider: providerDetailProp
}

export interface accountNumberProp{
    iban: string,
    swiftBic: string,
    number: string,
    sortCode: string,
}

export interface providerDetailProp {
    displayName: string,
    providerId: string,
    logoUri: string,
}

export interface transactionsProp {
    transactionId: string,
    timestamp: string,
    amount: number,
    currency: string,
    transactionClassification: string[],
    merchantName: string,
}

