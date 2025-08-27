
export const TICKETMASTER_API_KEY = 'k9vpDKqZrd1ywDE8UjLZAv1XpIluDchA';
export const TICKETMASTER_BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';

export async function fetchEvents(keyword: string, city: string) {
    const url = `${TICKETMASTER_BASE_URL}?apikey=${TICKETMASTER_API_KEY}&keyword=${encodeURIComponent(keyword)}&city=${encodeURIComponent(city)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
}
