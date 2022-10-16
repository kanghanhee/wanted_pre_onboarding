const returnType = require('../constants/returnType');
const postDto = require('../dto/postDto');
const postListDto = require('../dto/postListDto');
const { company, post } = require('../models');

module.exports = {
  /**
   * @채용공고_전체_불러오기
   */
  getPostAll: async () => {
    try {
      const postList = await post.findAll({
        include: [{ model: company }],
        order: [['createdAt', 'DESC']],
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
  getPostDetail: async postId => {
    try {
      const postDetail = await post.findOne({
        include: [{ model: company }],
        where: { post_id: postId },
      });

      return postDto(postDetail);
    } catch (error) {
      throw error;
    }
  },

  /**
   * @채용공고_등록하기
   */
  addPost: async (companyId, position, compensation, content, tech) => {
    try {
      const findCompany = await company.findOne({
        where: { company_id: companyId },
      });
      if (!findCompany) {
        return returnType.DB_NOT_FOUND;
      }

      const addPost = await post.create({
        position: position,
        compensation: compensation,
        content: content,
        tech: tech,
        company_id: companyId,
      });

      return addPost;
    } catch (error) {
      throw error;
    }
  },

  /**
   * @채용공고_수정하기
   */
  updatePost: async () => {},

  /**
   * @채용공고_삭제하기
   */
  deletePost: async () => {},
};
