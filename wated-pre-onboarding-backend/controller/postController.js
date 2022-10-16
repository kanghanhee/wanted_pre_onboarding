module.exports = {
  /**
   * @채용공고_전체_불러오기
   * @router GET /post
   * @error
   *  1.
   *  2.
   */
  getPostAll: async (req, res) => {},

  /**
   * @채용공고_검색하기
   * @router GET /post?word=
   * @error
   *  1.
   *  2.
   */
  getPostSearch: async (req, res) => {},

  /**
   * @채용공고_상세_불러오기
   * @router GET /post/:postId
   * @error
   *  1.
   *  2.
   */
  getPostDetail: async (req, res) => {},

  /**
   * @채용공고_등록하기
   * @router POST /post
   * @error
   *  1.
   *  2.
   */
  addPost: async (req, res) => {},

  /**
   * @채용공고_수정하기
   * @router PUT /post/:postId
   * @error
   *  1.
   *  2.
   */
  updatePost: async (req, res) => {},

  /**
   * @채용공고_삭제하기
   * @router DELETE /post
   * @error
   *  1.
   *  2.
   */
  deletePost: async (req, res) => {},
};
