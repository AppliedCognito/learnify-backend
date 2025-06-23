/**
 * @desc Format a Subject document into a clean API response
 * @param {Object} subject - Mongoose Subject document (lean or plain)
 * @returns {Object} formatted Subject
 */
export const formatSubject = (subject) => ({
  id: subject._id,
  name: subject.name,
  paper_id: subject.paper_id?._id || null,
  paper_name: subject.paper_id?.name || null,
  createdAt: subject.createdAt,
  updatedAt: subject.updatedAt,
});
