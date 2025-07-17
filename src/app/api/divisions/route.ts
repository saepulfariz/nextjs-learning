const divisions = [
  {
    id: 1,
    name: "Ketua",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Wakil Ketua",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Sekretaris",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Bendahara",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Agama",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Komunikasi & Informasi",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 7,
    name: "Penelitian & Pengembangan Bakat",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 8,
    name: "Kewirausahaan",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 9,
    name: "Seni & Olahraga",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 10,
    name: "Humas",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET - Get all divisions
export async function GET() {
  return new Response(JSON.stringify(divisions), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// POST - Create new division
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return new Response(JSON.stringify({ error: "Name is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const newDivision = {
      id: Math.max(...divisions.map((d) => d.id)) + 1,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    divisions.push(newDivision);

    return new Response(JSON.stringify(newDivision), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON data" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// PATCH - Update division
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, name } = body;

    if (!id || !name) {
      return new Response(
        JSON.stringify({ error: "ID and Name are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const divisionIndex = divisions.findIndex((division) => division.id === id);
    if (divisionIndex === -1) {
      return new Response(JSON.stringify({ error: "Division not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    divisions[divisionIndex].name = name;
    divisions[divisionIndex].updatedAt = new Date().toISOString();

    return new Response(JSON.stringify(divisions[divisionIndex]), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON data" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// DELETE - Delete division
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const divisionIndex = divisions.findIndex((division) => division.id === id);
    if (divisionIndex === -1) {
      return new Response(JSON.stringify({ error: "Division not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    divisions.splice(divisionIndex, 1);

    return new Response(
      JSON.stringify({ message: "Division deleted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON data" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
