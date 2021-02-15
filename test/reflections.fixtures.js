const faker = require('faker');

const makeReflections = () => {
  return [
    {
      title: faker.lorem.text(),
      image_url: faker.image.imageUrl(),
      description: faker.lorem.sentence(),
      feeling: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3)
    },
    {
      title: faker.lorem.text(),
      image_url: faker.image.imageUrl(),
      description: faker.lorem.sentence(),
      feeling: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3)
    },
    {
      title: faker.lorem.text(),
      image_url: faker.image.imageUrl(),
      description: faker.lorem.sentence(),
      feeling: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3)
    }
  ];
};


module.exports = { makeReflections };