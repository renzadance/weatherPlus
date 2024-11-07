export default async function getGeo(name) {
    const geoURL = `https://nominatim.openstreetmap.org/search?q=${name}&format=json&limit=3`;
    const response = await fetch(geoURL)
    const data = await response.json()
    return data;
}