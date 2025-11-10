// API Configuration for Christmas Drawing
// Replace this URL after deploying your AWS API Gateway

export const API_CONFIG = {
  // Replace with your API Gateway URL from Step 4 of AWS_SETUP_GUIDE.md
  // Example: 'https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod'
  baseUrl: 'https://wtxzrlhmyj.execute-api.us-east-2.amazonaws.com/prod',
  

  endpoints: {
    drawing: '/drawing'
  }
};

// Helper function to get full API URL
export function getApiUrl(endpoint: keyof typeof API_CONFIG.endpoints): string {
  return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[endpoint]}`;
}
