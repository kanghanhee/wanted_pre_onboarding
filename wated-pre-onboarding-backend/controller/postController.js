const responseMessage = require('../constants/responseMessage');
const returnType = require('../constants/returnType');
const statusCode = require('../constants/statusCode');
const util = require('../constants/util');
const postService = require('../service/postService');

module.exports = {
  /**
   * @채용공고_전체_불러오기
   * @router GET /post
   * @error
   */
  getPostAll: async (req, res) => {
    try {
      const result = await postService.getPostAll();

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_POST_SUCCESS, result));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * @채용공고_검색하기
   * @router GET /search/integration?search=
   * @error
   *  1.
   *  2.
   */
  getPostSearch: async (req, res) => {
    const { search } = req.query;

    try {
      const result = await postService.getPostSearch(search);

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_POST_SUCCESS, result));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * @채용공고_상세_불러오기
   * @router GET /post/:postId
   * @error
   *  1. 필요한 값이 없는 경우
   */
  getPostDetail: async (req, res) => {
    const { postId } = req.params;

    // @error 1.
    if (!postId) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const result = await postService.getPostDetail(postId);

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_POST_SUCCESS, result));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * @채용공고_등록하기
   * @router POST /post
   * @error
   *  1. 필요한 값이 없는 경우
   *  2. 존재하지 않는 회사 id인 경우
   */
  addPost: async (req, res) => {
    const { companyId, position, compensation, content, tech } = req.body;

    // @error 1.
    if (!companyId || !position || !compensation || !content || !tech) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const result = await postService.addPost(companyId, position, compensation, content, tech);

      // @error 2.
      if (result === returnType.DB_NOT_FOUND) {
        return res
          .status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, responseMessage.READ_COMPANY_FAIL));
      }

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATE_POST_SUCCESS, result));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * @채용공고_수정하기
   * @router PATCH /post/:postId
   * @error
   *  1.
   *  2.
   */
  updatePost: async (req, res) => {
    const { postId } = req.params;
    const { position, compensation, content, tech } = req.body;

    try {
      const result = await postService.updatePost(postId, position, compensation, content, tech);

      // @error 2.
      if (result === returnType.DB_NOT_FOUND) {
        return res
          .status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, responseMessage.READ_POST_FAIL));
      }

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_POST_SUCCESS, result));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
  },

  /**
   * @채용공고_삭제하기
   * @router DELETE /post/:postId
   * @error
   * 1. 필요한 값이 없는 경우
   * 2. 존재하지 않는 채용공고인 경우
   */
  deletePost: async (req, res) => {
    const { postId } = req.params;

    // @error 1.
    if (!postId) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const result = await postService.deletePost(postId);

      // @error 2.
      if (result === returnType.DB_NOT_FOUND) {
        return res
          .status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, responseMessage.READ_POST_FAIL));
      }

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_POST_SUCCESS));
    } catch (error) {
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
  },
};
