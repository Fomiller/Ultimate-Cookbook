const SequielizeMock = require('sequelize-mock');
const dbMock = new SequielizeMock();

describe('User', ()=>{
  const newUser = {
    id: 1,
    username: 'username',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    bio: 'bio'
  };

  describe('Test Creating a User', () => {  
    it('Should create a table with the name User', async ()=> {
      
      dbMock.define('User', newUser);
      expect(dbMock.isDefined('User')).toBe(true);
    });
  });
})

