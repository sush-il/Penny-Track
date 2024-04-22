export interface accountDetailProp{
    accountId: string,
    accountType: string,
    displayName: string,
    accountNumber: accountNumberProp,
    provider: providerDetailProp
}
export interface accountNumberProp{
    iban: string,
    swift_bic: string,
    number: string,
    sort_code: string,
}

export interface providerDetailProp {
    displayName: string,
    providerId: string,
    logoUri: string,
  }
