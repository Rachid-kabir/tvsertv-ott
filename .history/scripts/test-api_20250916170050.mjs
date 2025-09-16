async function testFormSubmission() {
    const testData = {
        nom: "Test",
        prenom: "User",
        whatsapp: "+33612345678",
        abonnement: "1 MOIS",
        device: "PC/Mac",
    };

    try {
        const response = await fetch("http://localhost:3006/api/submit-form", {
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
            console.log("\n✅ Test successful! Check your Gmail inbox.");
        } else {
            console.error("\n❌ Test failed. See error message above.");
        }
    } catch (error) {
        console.error("An error occurred while running the test:", error);
    }
}

testFormSubmission();
