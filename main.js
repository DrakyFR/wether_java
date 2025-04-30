document.getElementById('weather-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const postalCode = document.getElementById('postal-code').value;
    const weatherResults = document.getElementById('weather-results');

    try {
        // Étape 1 : Récupérer les communes à partir du code postal
        const communesResponse = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${postalCode}`);
        const communesData = await communesResponse.json();

        if (communesData.length === 0) {
            alert('Aucune commune trouvée pour ce code postal.');
            return;
        }

        const commune = communesData[0]; // Prendre la première commune de la liste
        const communeName = commune.nom;
        const communeCode = commune.code;

        // Étape 2 : Récupérer les données météo pour la commune
        const weatherResponse = await fetch(`https://api.meteo-concept.com/api/forecast/daily?insee=${communeCode}&token=e6b36aed76f96c8ceeb7e5fc66f152212842558af6cd3806b86720eda59c66ed`);
        const weatherData = await weatherResponse.json();

        if (weatherData.error) {
            alert('Erreur lors de la récupération des données météo.');
            return;
        }

        const forecast = weatherData.forecast[0]; // Prendre les prévisions du premier jour

        // Étape 3 : Afficher les résultats
        document.getElementById('commune-name').textContent = communeName;
        document.getElementById('temp-min').textContent = forecast.tmin;
        document.getElementById('temp-max').textContent = forecast.tmax;
        document.getElementById('rain-probability').textContent = forecast.probability_rain;
        document.getElementById('sun-hours').textContent = forecast.sun_hours;

        weatherResults.classList.remove('hidden');

    } catch (error) {
        console.error('Erreur :', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
});