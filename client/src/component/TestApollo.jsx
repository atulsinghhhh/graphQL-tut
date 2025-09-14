import React from 'react';

// Test if basic import works
try {
  const apolloClient = require('@apollo/client');
  console.log('Apollo Client exports:', Object.keys(apolloClient));
} catch (e) {
  console.error('Apollo import error:', e);
}

function TestApollo() {
  return <div>Testing Apollo imports</div>;
}

export default TestApollo;