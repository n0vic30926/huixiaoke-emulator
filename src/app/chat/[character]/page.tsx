"use client"; 

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

// 角色数据
const characterData = {
  yuelao: {
    name: '月老',
    image: '/assets/月老.png',
    description: '月老，别名柴道煌，民间又称月下老人、月下老儿，是汉族民间传说中主管婚姻的红喜神。',
  },
  hongniang: {
    name: '红娘',
    image: '/assets/红娘.png',
    description: '红娘的形象在文学作品中经历了从模糊到具体的发展过程。',
  },
};

export default function Page(): React.JSX.Element {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<{ text: string; id: number }[]>([]); // 存储对话记录
  const pathname = usePathname();
  const router = useRouter();
  const character = pathname.split('/').pop(); // 从路径中获取角色名称

  const currentCharacter = characterData[character as keyof typeof characterData];

  if (!currentCharacter) {
    return <div>角色未找到</div>;
  }

  const handleSend = () => {
    if (message.trim() !== '') {
      // 将新消息添加到对话记录中
      setMessages([...messages, { text: message, id: Date.now() }]);
      setMessage(''); // 清空输入框
    }
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100vh" p={3} position="relative">
      {/* 返回按钮 */}
      <IconButton 
        onClick={handleBack} 
        sx={{ position: 'absolute', top: 16, right: 16 }}
      >
        <img src="/assets/ret.png" alt="返回" style={{ width: 24, height: 24 }} />
      </IconButton>

      {/* 头像和名字居中显示 */}
      <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" mb={4}>
        <Avatar src={currentCharacter.image} alt={currentCharacter.name} sx={{ width: 150, height: 150, mb: 3 }} />
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          {currentCharacter.name}
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '80%', mb: 2 }}>
          {currentCharacter.description}
        </Typography>
      </Box>

      {/* 对话记录显示区域 */}
      <Box flexGrow={1} mb={2} sx={{ overflowY: 'auto' }}>
        {messages.map((msg) => (
          <Box key={msg.id} display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
            <Avatar src="/assets/my_avatar.png" alt="我的头像" sx={{ width: 32, height: 32, mr: 2 }} />
            <Box sx={{ bgcolor: '#e0e0e0', p: 2, borderRadius: 2, maxWidth: '60%' }}>
              <Typography>{msg.text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* 聊天输入框和发送按钮位于底部 */}
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" p={2} sx={{ position: 'sticky', bottom: 0, bgcolor: 'white', boxShadow: '0 -2px 5px rgba(0,0,0,0.1)' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="开始聊天吧"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ maxWidth: '80%' }}
        />
        <Button variant="contained" color="primary" onClick={handleSend} sx={{ ml: 2 }}>
          发送
        </Button>
      </Box>
    </Box>
  );
}
