const users = [
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

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name } = body;
        if (!name) {
            return new Response(JSON.stringify({ error: 'Name is required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const newUser = { id : Date.now(), name };
        users.push(newUser);
        
        return new Response(JSON.stringify(newUser), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
         return new Response(JSON.stringify({ error: 'Invalid JSON data' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, name } = body;
        if (!id || !name) {
            return new Response(JSON.stringify({ error: 'ID and Name are required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // const existingUser = users.find(user => user.id === id);
        
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        users[userIndex].name = name;

        return new Response(JSON.stringify(users[userIndex]), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
         return new Response(JSON.stringify({ error: 'Invalid JSON data' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}   

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;
        if (!id) {
            return new Response(JSON.stringify({ error: 'ID is required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        users.splice(userIndex, 1);

        return new Response(JSON.stringify({ message: 'User deleted successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
         return new Response(JSON.stringify({ error: 'Invalid JSON data' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}