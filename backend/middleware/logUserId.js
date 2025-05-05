const logUserId = (req, res, next) => {
    const userId = req.headers['user-id'] || req.body?.userId || req.query?.userId || req.params?.userId;
    req.userId = userId;
  
    console.log(`[${new Date().toISOString()}] Endpoint: ${req.originalUrl} [${req.method}] | User ID: ${userId || 'unknown'}`);
  
    next();
  };
  
  module.exports = logUserId;
  