const { getPostByCompanyId } = require('../service/postService');
const postDto = require('./postDto');
const postListDto = require('./postListDto');

const postDetailDto = async (post, postList) => {
  return {
    post_id: post.post_id,
    company_name: post.company.company_name,
    country: post.company.country,
    area: post.company.area,
    position: post.position,
    compensation: post.compensation,
    content: post.content,
    tech: post.tech,
    post_list: postList,
  };
};

module.exports = postDetailDto;
