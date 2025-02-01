export const aiChatApiUrl = () => {
  const server = window.location.origin;
  return `${server}/api/ai/get-learn-content`;
};
