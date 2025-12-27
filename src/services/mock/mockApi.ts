export const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockError = (probability: number = 0.05) => {
  if (Math.random() < probability) {
    throw new Error('Network error simulated');
  }
};
