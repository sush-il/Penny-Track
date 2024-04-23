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
