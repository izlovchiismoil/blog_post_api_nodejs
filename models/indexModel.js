import User from "./userModel.js";
import Post from "./postModel.js";
import Category from "./categoryModel.js";
import Comment from "./commentModel.js";
const models = {};

User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId' });;

Category.hasMany(Post, { foreignKey: 'categoryId' });
Post.belongsTo(Category, { foreignKey: 'categoryId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });


models.user = User;
models.post = Post;
models.category = Category;
models.comment = Comment;


export default models;
