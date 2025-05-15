export type TsvString = string & { readonly __brand: "tsv" }; // data separated by tabs (\t)
export type ComposicionString = string & { readonly __brand: "composicion" }; // string like 5/10/5
export type spreadsheetString = string & { readonly __brand: "spreadsheet" }; // tsvString joined with newlines (\\n)
