const fetch = require('node-fetch');

async function testContact() {
    const payload = {
        name: "Test Runner",
        email: "test@truenorth.com",
        message: "Verifying the Protocol Entry sequence from code-base."
    };

    console.log("Sending payload to http://localhost:5000/api/contact...");
    
    try {
        const res = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log("Response Status:", res.status);
        console.log("Response Body:", JSON.stringify(data, null, 2));

        if (res.status === 201 && data.success) {
            console.log("SUCCESS: Backend protocol accepted.");
        } else {
            console.error("FAILURE: Backend rejected the protocol.");
        }
    } catch (err) {
        console.error("ERROR: Could not connect to backend.", err.message);
    }
}

testContact();
