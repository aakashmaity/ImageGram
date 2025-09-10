import User from "../schema/user.js"

export const createUser = async (user) => {
    try {
        const newUser = await User.create(user);
        return newUser;
    } catch (error) {
        throw error;
    }
}
export const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (error) {
        throw error;
    }
}
export const findUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw error;
    }
}

export const findAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
}

export async function findSearchUsersRepo(search, offset = 0, limit = 10) {
  const q = (search || '').trim();

  const filter = q
    ? {
        $or: [
          { username: { $regex: escapeRegex(q), $options: 'i' } },
          // { fullName: { $regex: escapeRegex(q), $options: 'i' } },
        ],
      }
    : {};

  // Fetch users
  const users = await User.find(filter)
    .select('_id username email role updatedAt fullName avatar')
    .sort({ createdAt: -1 })
    .skip(Math.max(0, Number(offset) || 0))
    .limit(Math.min(50, Math.max(1, Number(limit) || 20)))
    .lean();

  // Count documents
  const totalDocuments = await User.countDocuments(filter);

  return { users, totalDocuments };
}



// Helper function
function escapeRegex(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}