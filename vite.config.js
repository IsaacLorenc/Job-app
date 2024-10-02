export default {
  server: {
    hmr: {
      host: 'job-app-70wg.onrender.com',  // e.g., 'job-app-70wg.onrender.com'
      protocol: 'wss',
      port: 443,  // Standard WebSocket over HTTPS
    }
  },
  preview: {
    port: process.env.PORT || 5317  // Ensure your production server listens on the correct port
  }
};


