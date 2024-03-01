const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

  let cafeId; 

  it('debería agregar un nuevo café y devolver un status code 201', async () => {
    const newCafe = {
      nombre: 'Café Nuevo',
    };

    const response = await request(server)
      .post('/cafes')
      .send(newCafe);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    cafeId = response.body.id; 
  });

  it('debería devolver un status code 200 y un arreglo con al menos 1 objeto', async () => {
    const response = await request(server).get('/cafes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it('debería actualizar un café y devolver un status code 200', async () => {
    const updatedCafe = {
      id: cafeId,
      nombre: 'Café Actualizado',
    };

    const response = await request(server)
      .put(`/cafes/${cafeId}`)
      .send(updatedCafe);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([{ id: cafeId, nombre: 'Café Actualizado' }]));
  });

  it('debería eliminar un café y devolver un status code 200', async () => {
    const response = await request(server).delete(`/cafes/${cafeId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.not.arrayContaining([{ id: cafeId }]));
  });

  it('debería devolver un status code 404 al intentar obtener un café eliminado', async () => {
    const response = await request(server).get(`/cafes/${cafeId}`);
    expect(response.status).toBe(404);
  });
});
