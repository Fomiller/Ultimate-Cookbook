const SequielizeMock = require('sequelize-mock');
const dbMock = new SequielizeMock();

describe('Comment', ()=>{
  const newComment = {
      commentBody: 'commentBody'
  };

  describe('Test Creating a Comment', () => {  
    it('Should create a table with the name Comment', async ()=> {
      
      dbMock.define('Comment', newComment);
      expect(dbMock.isDefined('Comment')).toBe(true);
    });
  });
});