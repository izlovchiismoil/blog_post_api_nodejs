import User from "./userModel.js";
import Post from "./postModel.js";
import Category from "./categoryModel.js";
import Comment from "./commentModel.js";
import UserRole from "./userRoleModel.js";
const models = {};

UserRole.hasMany(User, { foreignKey: "userRoleId" });
User.belongsTo(UserRole, { foreignKey: "userRoleId" });

User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId' });

Category.hasMany(Post, { foreignKey: 'categoryId' });
Post.belongsTo(Category, { foreignKey: 'categoryId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });


models.user = User;
models.post = Post;
models.category = Category;
models.comment = Comment;
models.userRole = UserRole;


export default models;
