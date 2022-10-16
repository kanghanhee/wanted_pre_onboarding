const postDto = require('./postDto');

const postListDto = postList => {
  return postList.map(post => {
    return postDto(post);
  });
};

module.exports = postListDto;
