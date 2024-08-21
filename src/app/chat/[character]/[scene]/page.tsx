"use client";

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// 角色数据和剧情开场白
const characterData = {
  yuelao: {
    name: '月老',
    image: '/assets/月老.png',
    description: '月老，别名柴道煌，民间又称月下老人、月下老儿，是汉族民间传说中主管婚姻的红喜神。',
    openingLine: '欢迎来到月老的爱情指导！让我们开始吧。',
  },
  hongniang: {
    name: '红娘',
    image: '/assets/红娘.png',
    description: '红娘的形象在文学作品中经历了从模糊到具体的发展过程。',
    openingLine: '红娘来帮你牵红线，让我们一起看看你能否成功。',
  },
};

export default function StoryPage(): React.JSX.Element {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<{ text: string; sender: 'user' | 'character'; id: number; loading: boolean }[]>([]); 
  const [progress, setProgress] = React.useState(0); // 初始化进度为0
  const [attemptsLeft, setAttemptsLeft] = React.useState(10); // 可用次数
  const pathname = usePathname();
  const router = useRouter();
const handleClearChat = () => {
  // 清空当前角色的聊天记录
  setMessages([]);
  // 删除 localStorage 中的记录
  localStorage.removeItem(`story_history_${character}_${scene}`);
};

  // 获取角色和剧情
  const pathParts = pathname?.split('/');
  const character = pathParts?.[2] || ''; // 确保路径正确
  const scene = pathParts?.[3] || ''; // 确保路径正确
  const sceneName = pathParts?.[3]; // 场景名称显示

  const currentCharacter = characterData[character as keyof typeof characterData];
  const [loading, setLoading] = React.useState(false);

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

  React.useEffect(() => {
    // 从 localStorage 中恢复聊天记录
    const savedMessages = localStorage.getItem(`story_history_${character}_${scene}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // 如果没有聊天记录，则添加角色的开场白
      const openingMessage = {
        text: currentCharacter.openingLine,
        sender: 'character' as const,
        id: Date.now(),
        loading: false,
      };
      setMessages([openingMessage]);
      localStorage.setItem(`story_history_${character}_${scene}`, JSON.stringify([openingMessage]));
    }
  }, [character, scene]);

  const handleSend = async () => {
    if (message.trim() !== '' && attemptsLeft > 0) {
      const userMessage = { text: message, sender: 'user' as const, id: Date.now(), loading: false };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setMessage('');

      setLoading(true);

      const loadingMessage = { text: '', sender: 'character', id: Date.now() + 1, loading: true };
      setMessages((prevMessages) => [...prevMessages, loadingMessage as any]);

      localStorage.setItem(`story_history_${character}_${scene}`, JSON.stringify(newMessages));

      const response = await fetch('/api/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: character,
          scene: scene, // 传递剧情参数
          messages: newMessages.map(msg => ({ role: msg.sender, content: msg.text })),
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.code === 1) {
        const characterMessage = { text: data.replies, sender: 'character', id: Date.now() + 1, loading: false };
        const updatedMessages = [...newMessages, characterMessage];
        setMessages((prevMessages) => {
          return prevMessages.map((msg) => 
          msg.loading ? { ...msg, text: data.replies, loading: false } : msg
          );          
        });

        // 更新进度条
        setProgress(prev => Math.min(100, prev + data.scoreIncrement));
        
        // 更新可用次数
        setAttemptsLeft(prev => prev - 1);
        
        localStorage.setItem(`story_history_${character}_${scene}`, JSON.stringify(updatedMessages));
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100vh" p={2} position="relative">
      {/* 剧情名称显示 */}
      <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
        当前剧情: {sceneName}
      </Typography>
      {/* 进度条 */}
      <Box display="flex" alignItems="center" mb={2}>
        <LinearProgress variant="determinate" value={progress} sx={{ flexGrow: 1, mr: 2 }} />
        <Typography variant="body2">{progress}/100 功德值</Typography>
      </Box>
      <Typography variant="body2" textAlign="center" sx={{ mb: 2 }}>
        剩余次数: {attemptsLeft}/10
      </Typography>

      <IconButton 
        onClick={() => router.push('/dashboard')} 
        sx={{ position: 'absolute', top: 16, right: 16 }}
      >
        <ArrowBackIcon sx={{ fontSize: 32, transform: 'rotate(180deg)' }} />
        <Typography variant="caption" sx={{ fontSize: 14 }}>
          返回
        </Typography>
      </IconButton>

      <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
        <Avatar src={currentCharacter.image} alt={currentCharacter.name} sx={{ width: 150, height: 150, mb: 3 }} />
        <Typography variant="h4" component="h1">{currentCharacter.name}</Typography>
        <Typography variant="body1">{currentCharacter.description}</Typography>
      </Box>

      <Box flexGrow={1} mb={2} sx={{ overflowY: 'auto' }}>
        {messages.map((msg) => (
          <Box key={msg.id} display="flex" flexDirection={msg.sender === 'user' ? 'row-reverse' : 'row'} alignItems="center" mb={2}>
            <Avatar src={msg.sender === 'user' ? '/assets/用户.png' : currentCharacter.image} sx={{ ml: 2, mr: 2 }} />
            <Box sx={{ bgcolor: msg.sender === 'user' ? '#e0e0e0' : '#f0f0f0', p: 2, borderRadius: 1 }}>
              {msg.loading ? <LoadingDots /> : <Typography>{msg.text}</Typography>}
            </Box>
          </Box>
        ))}
      </Box>

    {/* 聊天输入框和发送按钮位于底部 */}
    <Box
        display="flex"
        justifyContent="space-between" // 将清空按钮和发送按钮放在两边
        alignItems="center"
        width="100%"
        p={1}
        m={0.5}
        sx={{
          position: 'sticky',
          bottom: 0,
          bgcolor: 'white',
          boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
          flexDirection: 'row',
          boxSizing: 'border-box',
        }}
      >
        <IconButton 
          onClick={handleClearChat} 
          sx={{ 
            padding: '2px', 
            minWidth: { xs: 30, sm: 48 }, 
          }}
        >
          <DeleteIcon sx={{ fontSize: 24 }} />
          <Typography variant="caption" sx={{ fontSize: 0 }}>清空聊天</Typography>
        </IconButton>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="开始聊天吧"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
              e.preventDefault();
            }
          }}
          sx={{ 
            flexGrow: 1, 
            height: { xs: '36px', sm: '48px' }, 
            mx: 1, // 确保输入框两侧有适当的间距
            '& .MuiOutlinedInput-root': { 
              height: '100%',
              padding: '0 14px',
            },
          }}
        />

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSend} 
          sx={{ 
            padding: '4px 8px',
            minWidth: { xs: 50, sm: 80 }, 
            fontSize: { xs: '0.75rem', sm: '1rem' },
          }}
        >
          发送
        </Button>
      </Box>
    </Box>
  );
}

