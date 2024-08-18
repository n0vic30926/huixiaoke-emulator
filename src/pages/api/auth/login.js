import bcrypt from 'bcrypt';
import User from '@/lib/models/user';
import dbConnect from '@/lib/user_db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    const { email, password } = req.body;

    try {
      // 查找用户
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // 验证密码
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // 登录成功，返回用户信息
      return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error logging in' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
