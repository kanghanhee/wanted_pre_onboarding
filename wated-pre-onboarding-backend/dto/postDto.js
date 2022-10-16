const postDto = post => {
  return {
    company_id: post.company.company_id,
    company_name: post.company.company_name,
    country: post.company.country,
    area: post.company.area,
    position: post.position,
    compensation: post.compensation,
    content: post.content,
    tech: post.tech,
  };
};

module.exports = postDto;
