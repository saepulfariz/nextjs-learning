let users = [
    {
        id: 1,
        name: 'John Doe',
    }
];

export async function GET(request: Request) {
    return new Response(JSON.stringify(users), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}