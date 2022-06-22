export function insertCommentController(comments: any[], newComment: any) {
	comments.push(newComment);
	return comments;
}