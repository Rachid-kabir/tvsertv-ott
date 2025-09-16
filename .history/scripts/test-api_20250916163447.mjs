async function testFormSubmission() {
    const testData = {
        nom: "Test",
        prenom: "User",
        whatsapp: "+1234567890",
        abonnement: "1 MOIS",
        device: "PC/Mac",
    };

    try {
        // We're using localhost:3000, which is the default for `next dev`
        const response = await fetch("http://localhost:3000/api/submit-form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(testData),
        });

        const result = await response.json();

        console.log("Status Code:", response.status);
        console.log("Response Body:", result);

        if (response.ok) {
            console.log("\n✅ Test successful! Check your Google Sheet for a new entry.");
        } else {
            console.error("\n❌ Test failed. See error message above.");
        }
    } catch (error) {
        console.error("An error occurred while running the test:", error);
    }
}

testFormSubmission();
