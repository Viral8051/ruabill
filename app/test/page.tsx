export default function TestPage() {
  // Just display if the MongoDB URI exists
  const hasMongoDBURI = !!process.env.MONGODB_URI;
  const uri = process.env.MONGODB_URI || 'Not found';
  
  // Hide the password for security
  const safeURI = uri.replace(/:(.*)@/, ':****@');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>MongoDB Atlas Connection Test</h1>
      
      <div style={{ 
        margin: '20px 0', 
        padding: '15px', 
        backgroundColor: hasMongoDBURI ? '#d4edda' : '#f8d7da',
        border: `2px solid ${hasMongoDBURI ? '#c3e6cb' : '#f5c6cb'}`,
        borderRadius: '5px'
      }}>
        <h3>Status: {hasMongoDBURI ? '✅ Environment Variable Found' : '❌ Not Found'}</h3>
        <p><strong>URI (hidden password):</strong> {safeURI}</p>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Next Steps:</h3>
        <ol>
          <li>If you see ✅ above, your URI is loaded correctly</li>
          <li>If you see ❌, check your <code>.env.local</code> file</li>
          <li>Make sure your file is in the root of your Next.js project</li>
        </ol>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e7f3ff' }}>
        <h4>Your .env.local file should look like:</h4>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/database?retryWrites=true&w=majority
        </pre>
      </div>
    </div>
  );
}