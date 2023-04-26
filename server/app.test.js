const request = require('supertest');
const app = require('./app.js');
const pool = require("./db");

describe("GET /admin/getcomplaints", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should return all complaints with status 200", async () => {
        const mockQuery = jest.spyOn(pool, "query").mockImplementation(() => {
            return { rows: [{ id: 1, complaint: "Test complaint" }] };
        });

        const response = await request(app).get("/admin/getcomplaints");

        expect(mockQuery).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].complaint).toBe("Test complaint");
    });

    it("should return an error with status 500 if there is a server error", async () => {
        const mockError = new Error("Database connection error");
        const mockQuery = jest.spyOn(pool, "query").mockRejectedValueOnce(mockError);

        const response = await request(app).get("/admin/getcomplaints");

        expect(mockQuery).toHaveBeenCalled();
        expect(response.status).toBe(500);
        expect(response.text).toBe("Error getting all complaints.");
    });
});



describe('GET /admin/solvedcomplaints', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return all solved complaints with status 200', async () => {
        const mockQuery = jest.spyOn(pool, 'query').mockImplementation(() => {
            return { rows: [{ id: 1, complaint: 'Test complaint', complaint_status: 'done' }] };
        });

        const response = await request(app).get('/admin/solvedcomplaints');

        expect(mockQuery).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].complaint).toBe('Test complaint');
        expect(response.body[0].complaint_status).toBe('done');
    });

    it('should return an error with status 500 if there is a server error', async () => {
        const mockError = new Error('Database connection error');
        const mockQuery = jest.spyOn(pool, 'query').mockRejectedValueOnce(mockError);

        const response = await request(app).get('/admin/solvedcomplaints');

        expect(mockQuery).toHaveBeenCalled();
        expect(response.status).toBe(500);
        expect(response.text).toBe('Error getting all complaints.');
    });
});


describe('GET /complaints/:id', () => {
    let mockPool;
    
    beforeAll(() => {
      // create a mock pool
      mockPool = jest.spyOn(pool, 'query');
    });
  
    afterAll(() => {
      // restore the original pool object
      mockPool.mockRestore();
    });
  
    it('should return the complaint with status 200', async () => {
      const id = 1;
      const complaintData = [      {        complaint_id: id,        complaint: 'Test complaint',        complaint_status: 'pending',      },    ];
      mockPool.mockResolvedValueOnce({ rows: complaintData });
  
      const response = await request(app).get(`/complaints/${id}`);
  
      expect(mockPool).toHaveBeenCalledWith("SELECT * FROM complaint_details WHERE complaint_id=$1", [id]);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].complaint).toBe('Test complaint');
    });
  
    it('should return an error with status 500 if there is a server error', async () => {
      const id = 1;
      mockPool.mockRejectedValueOnce(new Error('Database Error'));
  
      const response = await request(app).get(`/complaints/${id}`);
  
      expect(mockPool).toHaveBeenCalledWith("SELECT * FROM complaint_details WHERE complaint_id=$1", [id]);
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error getting the complaint.');
    });
  
    it('should return an empty array with status 200 if there is no matching complaint', async () => {
      const id = 2;
      mockPool.mockResolvedValueOnce({ rows: [] });
  
      const response = await request(app).get(`/complaints/${id}`);
  
      expect(mockPool).toHaveBeenCalledWith("SELECT * FROM complaint_details WHERE complaint_id=$1", [id]);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(0);
    });
  });