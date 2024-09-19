// user_db.js
// 用于连接用户信息数据库的测试文件

// 创建一个 Sequelize 实例并配置数据库连接
import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const sequelize = new Sequelize('zhengxinhuike', 'zhengxinhuike', '613adfb11b49641d', {
  host: 'mysql.sqlpub.com',
  port: 3306,
  dialect: 'mysql',
  logging: false, // 禁止日志输出（可选）
});

export default async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');

    // 同步数据库表
    await sequelize.sync({ force: false });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// 添加关闭数据库连接的函数
export async function closeDbConnection() {
  try {
    await sequelize.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error closing the database connection:', error);
  }
}

export { sequelize };


