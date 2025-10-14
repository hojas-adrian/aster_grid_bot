export type SessionData =
  | {
      gridLow: number;
      gridTop: number;
      steps: number;
    }
  | undefined;

export const initial = (): SessionData => {
  return undefined;
};
