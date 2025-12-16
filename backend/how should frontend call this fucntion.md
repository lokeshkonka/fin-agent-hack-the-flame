<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# how should frontend call this fucntion

Here's how frontend calls the **Dashboard API**:

## React + Supabase Frontend Code

```javascript
// utils/api.js
const API_BASE_URL = 'http://localhost:8080';

export const fetchUserDashboard = async (supabaseAccessToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/dashboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${supabaseAccessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data; // Extract dashboard data from ApiResponse wrapper
  } catch (error) {
    console.error('Dashboard fetch failed:', error);
    throw error;
  }
};
```


## Complete React Hook Component

```javascript
// components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { fetchUserDashboard } from '../utils/api';

const Dashboard = () => {
  const supabase = useSupabaseClient();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        
        // Get session token from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.access_token) {
          throw new Error('No valid session found');
        }

        // Fetch dashboard with JWT token
        const dashboardData = await fetchUserDashboard(session.access_token);
        setDashboard(dashboardData);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [supabase]);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {/* Account Info */}
      <div className="account-info">
        <h2>Account: {dashboard.accountNumber}</h2>
        <p>Balance: ₹{dashboard.balance?.toLocaleString()}</p>
        <p>Daily Limit: ₹{dashboard.dailyTransactionLimit?.toLocaleString()}</p>
        <p>Daily Remaining: ₹{dashboard.dailyTransactionLimitRemaining?.toLocaleString()}</p>
        <p>Fraud Status: {dashboard.isFlaggedFraud ? '⚠️ Flagged' : '✅ Safe'}</p>
      </div>

      {/* Recent Transactions */}
      <div className="transactions">
        <h3>Recent Transactions</h3>
        {dashboard.recentTransactions?.map((txn) => (
          <div key={txn.id} className={`transaction ${txn.isFraud ? 'fraud' : ''}`}>
            <div>
              <strong>{txn.hour} - {txn.weekDay}</strong>
              <span>{txn.date}</span>
            </div>
            <div>
              <span>₹{txn.amount.toLocaleString()}</span>
              <span>{txn.originAccount} → {txn.destinationAccount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
```


## Vanilla JavaScript Version

```javascript
// Simple fetch example
async function getDashboard() {
  // Get Supabase token from localStorage or session
  const token = localStorage.getItem('supabase_token');
  
  const response = await fetch('http://localhost:8080/api/user/dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const result = await response.json();
  console.log('Dashboard:', result.data);
  
  return result.data;
}

// Usage
getDashboard().then(dashboard => {
  document.getElementById('balance').textContent = `₹${dashboard.balance}`;
});
```


## Supabase Auth Flow (Complete)

```javascript
// 1. User logs in (handled by Supabase)
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// 2. Get session token
const { data: { session } } = await supabase.auth.getSession();
const jwtToken = session.access_token;

// 3. Call dashboard API
const dashboard = await fetchUserDashboard(jwtToken);
```


## cURL Test (for debugging)

```bash
curl -X GET http://localhost:8080/api/user/dashboard \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```


## Error Handling

```javascript
const response = await fetch(`${API_BASE_URL}/api/user/dashboard`, {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

const data = await response.json();

if (!data.success) {
  console.error('API Error:', data.message);
  // Handle errors like "User not found", "Invalid token"
  return;
}

const dashboard = data.data;
```

**Frontend just needs the Supabase JWT token in Authorization header!** ✅

