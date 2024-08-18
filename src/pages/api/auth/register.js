import bcrypt from 'bcrypt';
import User from '../../../lib/models/user';
import dbConnect from '../../../lib/user_db';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    const { firstName, lastName, email, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      // Return the new user data
      return res.status(201).json({ 
        message: 'User registered successfully', 
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          fullName: `${newUser.firstName} ${newUser.lastName}`,  // Combine firstName and lastName
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error registering user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

