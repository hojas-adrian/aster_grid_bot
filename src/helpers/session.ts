export type SessionData = {
  gridLow: number | undefined;
  gridTop: number | undefined;
  steps: number | undefined;
};

export const initial = (): SessionData => {
  return {
    gridLow: undefined,
    gridTop: undefined,
    steps: undefined,
  };
};
