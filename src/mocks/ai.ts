const response = [
    {
        "id": 1,
        "paragraph": "Traveling through mountain villages offers a unique blend of adventure and tranquility. Winding roads reveal breathtaking landscapes, while local markets provide an authentic glimpse into regional culture. Visitors often find that the slower pace of life encourages meaningful connections with both nature and the people they meet along the way."
    },
    {
        "id": 2,
        "paragraph": "A weekend city escape can be the perfect way to recharge. From exploring historic neighborhoods to sampling local cuisine, urban destinations offer endless opportunities for discovery. Many travelers enjoy balancing popular attractions with hidden gems recommended by residents."
    },
    {
        "id": 3,
        "paragraph": "Beach destinations remain popular for travelers seeking relaxation and scenic views. Crystal-clear waters, warm weather, and coastal activities create memorable experiences for families, couples, and solo adventurers alike. Sunset walks along the shoreline are often highlights of the journey."
    },
    {
        "id": 4,
        "paragraph": "Road trips provide the freedom to explore destinations at your own pace. Travelers can stop at scenic viewpoints, visit small towns, and adjust their plans based on unexpected discoveries. The journey itself often becomes just as rewarding as the final destination."
    },
    {
        "id": 5,
        "paragraph": "Cultural travel allows visitors to immerse themselves in traditions, art, and history. Whether attending local festivals, touring museums, or learning regional customs, these experiences help travelers gain a deeper understanding of the places they visit and the people who call them home."
    },
    {
        "id": 6,
        "paragraph": "Nature enthusiasts often seek destinations known for hiking, wildlife, and outdoor recreation. National parks and protected reserves offer opportunities to experience diverse ecosystems while promoting sustainable tourism practices that help preserve these environments for future generations."
    },
    {
        "id": 7,
        "paragraph": "Food is often one of the most memorable aspects of travel. Trying regional specialties, visiting street markets, and dining at local restaurants can reveal the unique character of a destination. Culinary experiences frequently become stories travelers share long after returning home."
    },
    {
        "id": 8,
        "paragraph": "International travel introduces people to new languages, perspectives, and ways of life. Navigating unfamiliar environments can be both challenging and rewarding, encouraging personal growth and adaptability while creating lasting memories from unique experiences."
    }
]
const getResponse = () => {
    const index = Math.floor(Math.random() * response.length);
    return response[index].paragraph
}

const generateResponse = (onUpdate = (text: string) => { }, onDone = (text: string) => { }) => {
    const text = getResponse()
    let index = 0;
    const interval = setInterval(() => {
        onUpdate(text.slice(0, index + 1));
        index++;
        if (index >= text.length) {
            clearInterval(interval);
            onDone(text);
        }
    }, 15);

    return () => clearInterval(interval);
};

export { generateResponse };
