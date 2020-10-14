export type Slug = string;

export type Flow = {
  options: FlowOptions;
  type: 'olo' | 'imtr';
  checkers: Slug[]
}

export type FlowOptions = {
  shouldAlwaysDisplayMonumentStatus: boolean;
}
