
fetch("https://raw.githubusercontent.com/nss-day-cohort-31/national-parks/master/database.json")
    .then(parks => parks.json())
    .then(parsedParks => {
        let parks = parsedParks.parks

        parks.forEach(park => {
            fetch(`https://api.darksky.net/forecast/3ca26b518c5c0a9c13a652097f679648/${park.latitude},${park.longitude}`)
                .then(things => things.json())
                .then(parsedThings => {
                    let weather = parsedThings
                    console.log(weather)
                    park.current = weather.currently.summary
                    park.today = weather.hourly.summary
                    park.weekly = weather.daily.summary
                    let parkDiv = parkFactory(park)
                    appendToDom(parkDiv)
                })
        })
    })


parkFactory = (park) => {
    if (park.visited === true) {
        return `
        <article class="visited">
            <h3>${park.name}</h3>
            <p>${park.state}</p>
            <ul>
                <li>Currently: ${park.current}</li>
                <li>Today: ${park.today}</li>
                <li>Week: ${park.weekly}</li>
            </ul>
        </article >
            `
    } else {
        return `
            <article class="not-visited" >
                <h3>${park.name}</h3>
                <p>${park.state}</p>
                <ul>
                    <li>Currently: ${park.current}</li>
                    <li>Today: ${park.today}</li>
                    <li>Week: ${park.weekly}</li>
                </ul>
            </article >
            `
    }
}

appendToDom = (parkInfo) => {
    let parkContainer = document.querySelector(".park-container")
    parkContainer.innerHTML += parkInfo
}