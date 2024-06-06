import { Dispatch, SetStateAction } from 'react';

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

export interface dropdownAccountProp {
    id:string, 
    name:string
}

export interface dropdownProp {
    dropdownDataType: string;
    dropdownData: dropdownAccountProp[] | string[];
    setChoiceCallback: Dispatch<SetStateAction<string>>
}

export interface incomingOutgoingProp{
    incoming: number[]
    outgoing: number[]
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

