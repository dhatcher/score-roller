export declare const getOverflowCount: ({ actionCount, height, groupCount }: {
  actionCount: number;
  height: number;
  groupCount: number;
}) => number;
export declare const queryActions: (el: HTMLElement) => HTMLCalciteActionElement[];
export declare const overflowActions: ({ actionGroups, expanded, overflowCount }: {
  actionGroups: HTMLCalciteActionGroupElement[];
  expanded: boolean;
  overflowCount: number;
}) => void;
