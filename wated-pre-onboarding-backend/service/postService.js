const { Op } = require('sequelize');
const returnType = require('../constants/returnType');
const postDetailDto = require('../dto/postDetailDto');
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
    let whereClause = {
      [Op.and]: {},
    };
    if (search.length > 0) {
      whereClause[Op.and] = { [Op.or]: {} };
      whereClause[Op.and][Op.or][`$company.company_name$`] = { [Op.like]: `%${search}%` };
      whereClause[Op.and][Op.or]['$post.position$'] = { [Op.like]: `%${search}%` };
    }
    try {
      const postList = await post.findAll({
        include: [
          {
            model: company,
            where: whereClause,
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      return postListDto(postList);
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
      if (!postDetail) {
        return returnType.DB_NOT_FOUND;
      }

      const findPostByCompanyId = await post.findAll({
        where: { company_id: postDetail.company_id },
        attributes: ['post_id'],
      });
      const postList = findPostByCompanyId.map(post => post.post_id);

      return postDetailDto(postDetail, postList);
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
  updatePost: async (postId, position, compensation, content, tech) => {
    try {
      const findPost = await post.findOne({
        where: { post_id: postId },
      });
      if (!findPost) {
        return returnType.DB_NOT_FOUND;
      }

      await post.update(
        {
          position: position,
          compensation: compensation,
          content: content,
          tech: tech,
        },
        {
          where: { post_id: postId },
        },
      );
      const updatePost = await post.findOne({
        where: { post_id: postId },
      });

      return updatePost;
    } catch (error) {
      throw error;
    }
  },

  /**
   * @채용공고_삭제하기
   */
  deletePost: async postId => {
    try {
      const findPost = await post.findOne({
        where: { post_id: postId },
      });
      if (!findPost) {
        return returnType.DB_NOT_FOUND;
      }

      await post.destroy({
        where: { post_id: postId },
      });
    } catch (error) {
      throw error;
    }
  },
  getPostByCompanyId: async companyId => {
    try {
      const postList = await post.findAll({
        where: { company_id: companyId },
      });
      console.log(postList);
      return postListDto(postList);
    } catch (error) {
      throw error;
    }
  },
};
