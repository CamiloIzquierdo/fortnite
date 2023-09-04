export const getStats1 = async ({ id }: { id: string }) => {
    try {
        const apiKey = "fdd58547-75eb5d8a-8a408893-9d8f8d02";
        const url = `https://fortniteapi.io/v1/stats?account=${id}`;
        const response = await fetch(url, {
            headers: {
                Authorization: apiKey,
            },
        });
        const data = await response.json();
        return { data };
    } catch (error) {
        console.error("Error:", error);
        return { data: [] };
    }
};

export const getStatsByName = async ({ user }: { user: string }) => {
    try {
        const apiKey = "fdd58547-75eb5d8a-8a408893-9d8f8d02";
        const url = `https://fortniteapi.io/v1/lookup?username=${user}`;
        const response = await fetch(url, {
            headers: {
                Authorization: apiKey,
            },
        });
        const data = await response.json();
        return { data };
    } catch (error) {
        console.error("Error:", error);
        return { data: [] };
    }
};
