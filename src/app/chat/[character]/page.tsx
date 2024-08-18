"use client"; 

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'; // 引入删除图标
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // 引入返回图标

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
  const [messages, setMessages] = React.useState<{ text: string; sender: 'user' | 'character'; id: number }[]>([]); 
  const pathname = usePathname();
  const router = useRouter();
  const character = pathname.split('/').pop(); // 从路径中获取角色名称

  const currentCharacter = characterData[character as keyof typeof characterData];
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // 从 localStorage 中恢复聊天记录
    const savedMessages = localStorage.getItem(`chat_history_${character}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [character]);

  if (!currentCharacter) {
    return <div>角色未找到</div>;
  }

  const handleSend = async () => {
    if (message.trim() !== '') {
      // 将用户的消息添加到对话记录中
      const userMessage = { text: message, sender: 'user', id: Date.now() };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setMessage(''); // 清空输入框

      // 显示加载中动画
      setLoading(true);

      // 添加一个假的对方消息（显示头像和加载中动画）
      const loadingMessage = { text: '', sender: 'character', id: Date.now() + 1, loading: true };
      setMessages((prevMessages) => [...prevMessages, loadingMessage]);

      // 保存聊天记录到 localStorage
      localStorage.setItem(`chat_history_${character}`, JSON.stringify(newMessages));

      // 发送请求到后端
      const response = await fetch('https://llm-abggoprivx.cn-hangzhou.fcapp.run/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: character,
          messages: [{ role: 'user', content: message }],
        }),
      });

      const data = await response.json();
      setLoading(false); // 停止加载动画

      if (data.code === 1) {
        const characterMessage = { text: data.replies, sender: 'character', id: Date.now() + 1 };
        const updatedMessages = [...newMessages, characterMessage];
        setMessages((prevMessages) => {
          return prevMessages.map((msg) => 
            msg.loading ? { ...msg, text: data.replies, loading: false } : msg
          );          
        });

        // 更新聊天记录到 localStorage
        localStorage.setItem(`chat_history_${character}`, JSON.stringify(updatedMessages));
      }
    }
  };

  // CSS加载动画
  const LoadingDots = () => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: 4, height: 4, bgcolor: 'black', borderRadius: '50%', animation: 'dot-blink 1.4s infinite both', animationDelay: '0s' }} />
      <Box sx={{ width: 4, height: 4, bgcolor: 'black', borderRadius: '50%', animation: 'dot-blink 1.4s infinite both', animationDelay: '0.2s', mx: 1 }} />
      <Box sx={{ width: 4, height: 4, bgcolor: 'black', borderRadius: '50%', animation: 'dot-blink 1.4s infinite both', animationDelay: '0.4s' }} />
      <style jsx>{`
        @keyframes dot-blink {
          0%, 20% { transform: scale(1); }
          50% { transform: scale(1.5); }
          100% { transform: scale(1); }
        }
      `}</style>
    </Box>
  );



  const handleClearChat = () => {
    // 清空当前角色的聊天记录
    setMessages([]);
    localStorage.removeItem(`chat_history_${character}`);
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100vh" p={3} position="relative">
      {/* 返回按钮 */}
      <IconButton 
        onClick={handleBack} 
        sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 16, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          mt: -7,  // 向上移动一点点
          ml: -1,  // 向左移动一点点
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 32, transform: 'rotate(180deg)' }} />  {/* 旋转图标 */}
        <Typography variant="caption" sx={{ fontSize: 14 }}>返回</Typography>  {/* 添加返回文字并调整字体大小 */}
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
          <Box key={msg.id} display="flex" flexDirection={msg.sender === 'user' ? 'row-reverse' : 'row'} alignItems="center" mb={2}>
            <Avatar src={msg.sender === 'user' ? '/assets/用户.png' : currentCharacter.image} alt={msg.sender === 'user' ? '我的头像' : currentCharacter.name} sx={{ width: 32, height: 32, [msg.sender === 'user' ? 'ml' : 'mr']: 2 }} />
            <Box sx={{ bgcolor: msg.sender === 'user' ? '#e0e0e0' : '#f0f0f0', p: 2, borderRadius: 2, maxWidth: '60%' }}>
              {msg.loading ? <LoadingDots /> : <Typography>{msg.text}</Typography>}
            </Box>
          </Box>
        ))}
      </Box>

      {/* 聊天输入框和发送按钮位于底部 */}
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" p={2} sx={{ position: 'sticky', bottom: 0, bgcolor: 'white', boxShadow: '0 -2px 5px rgba(0,0,0,0.1)' }}>
        {/* 清空聊天记录按钮 */}
        <IconButton 
          onClick={handleClearChat} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            mr: 2, 
            mt: -1,  // 向上移动一点点
            ml: -1,  // 向左移动一点点
            padding: '4px' // 减小 padding 以减少占用空间
          }}
        >
          <DeleteIcon sx={{ fontSize: 28 }} />  {/* 可适当调小图标大小，避免重叠 */}
          <Typography variant="caption" sx={{ fontSize: 12 }}>清空聊天</Typography>
        </IconButton>
      
      
        <TextField
          fullWidth
          variant="outlined"
          placeholder="开始聊天吧"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend(); // 检测到回车键时发送消息
              e.preventDefault(); // 阻止默认行为（如换行）
            }
          }}
          sx={{ maxWidth: '80%' }}
        />
        <Button variant="contained" color="primary" onClick={handleSend} sx={{ ml: 2 }}>
          发送
        </Button>
      </Box>
    </Box>
  );
}
