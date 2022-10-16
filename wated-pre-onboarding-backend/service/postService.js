const postListDto = require('../dto/postListDto');
const { post, company } = require('../models');

module.exports = {
  /**
   * @채용공고_전체_불러오기
   */
  getPostAll: async () => {
    try {
      const postList = await post.findAll({
        include: [{ model: company }],
      });

      return postListDto(postList);
    } catch (error) {
      throw error;
    }
  },

  /**
   * @채용공고_검색하기
   */
  getPostSearch: async search => {
    try {
      const postList = await post.findAll({
        include: [{ model: company }],
      });

      return postList;
    } catch (error) {
      throw error;
    }
  },

  /**
   * @채용공고_상세_불러오기
   */
  getPostDetail: async () => {},

  /**
   * @채용공고_등록하기
   */
  addPost: async () => {},

  /**
   * @채용공고_수정하기
   */
  updatePost: async () => {},

  /**
   * @채용공고_삭제하기
   */
  deletePost: async () => {},
};
