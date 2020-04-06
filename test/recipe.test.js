const SequielizeMock = require('sequelize-mock');
const dbMock = new SequielizeMock();

describe('Recipe', ()=> {
  const newRecipe = {
    recipeName: 'recipeName',
    ingredients: 'ingredients',
    instructions: 'instructions',
    description: 'description',
    chefComments: 'chefComments',
  };
  describe('Test Creating a Recipe', () => {
    it('Should create a table with the name Recipe', ()=> {

      dbMock.define('Recipe', newRecipe);
      expect(dbMock.isDefined('Recipe')).toBe(true);
    });
  });
});