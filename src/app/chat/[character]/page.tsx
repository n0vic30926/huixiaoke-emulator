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
import { useEffect, useRef } from 'react';

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
  const [messages, setMessages] = React.useState<{ text: string; sender: 'user' | 'character'; id: number; loading: boolean }[]>([]); 
  const pathname = usePathname();
  const router = useRouter();
  const character = pathname?.split('/').pop() || ''; // 先检查 pathname 是否为 null，然后提供默认值

  const currentCharacter = characterData[character as keyof typeof characterData];
  const [loading, setLoading] = React.useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null); // 指定为 HTMLDivElement 类型

  // 每当 messages 更新时，自动滚动到最底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


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
      // 确保 sender 的类型为 "user" | "character"
      const userMessage = { text: message, sender: 'user' as const, id: Date.now(), loading: false };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setMessage(''); // 清空输入框

      // 显示加载中动画
      setLoading(true);

      // 添加一个假的对方消息（显示头像和加载中动画）
      // 定义 MessageType 类型
      interface MessageType {
        text: string;
        sender: 'user' | 'character'; // 确保 sender 只能是 'user' 或 'character'
        id: number;
        loading: boolean; // 可选的 loading 属性
      }

      // 定义扩展类型以支持 loading 字段
      interface LoadingMessage extends Omit<MessageType, 'sender'> {
        sender: 'character'; // 强制 sender 类型为 'character'
      }

      // 示例代码
      const loadingMessage: LoadingMessage = { text: '', sender: 'character', id: Date.now() + 1, loading: true };

      // 更新消息状态时将其类型限定为 'user' | 'character'
      setMessages((prevMessages) => [...prevMessages, loadingMessage as MessageType]);

      // 保存聊天记录到 localStorage
      localStorage.setItem(`chat_history_${character}`, JSON.stringify(newMessages));

      // 发送请求到后端，将所有聊天记录传递给后端以支持多轮对话
      const response = await fetch('https://llm-abggoprivx.cn-hangzhou.fcapp.run/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: character,
          messages: newMessages.map(msg => ({ role: msg.sender, content: msg.text })),
        }),
      });

      const data = await response.json();
      setLoading(false); // 停止加载动画

      if (data.code === 1) {
        const characterMessage = { text: data.replies, sender: 'character', id: Date.now() + 1,loading: false };
        const updatedMessages = [...newMessages, characterMessage];
        setMessages((prevMessages) => {
          return prevMessages.map((msg) => 
          (msg as MessageType).loading ? { ...msg, text: data.replies, loading: false } : msg
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
          padding: { xs: '12px', sm: '12px' },  // 增加按钮的点击区域
          mt: -10,  // 移除向上移动的margin
          mr: -3,  // 移除向左移动的margin
          minWidth: 48, // 设置最小点击区域
          minHeight: 48,
        }}
      >
        <ArrowBackIcon 
          sx={{ 
            fontSize: 32, 
            transform: 'rotate(180deg)', 
          }} 
        />  {/* 旋转图标 */}
        <Typography 
          variant="caption" 
          sx={{ fontSize: 14 }}
        >
          返回
        </Typography>  {/* 添加返回文字并调整字体大小 */}
      </IconButton>



      {/* 头像和名字居中显示 */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        sx={{
          position: 'relative', // 让负 margin 有效
          top: { xs: '-87px', sm: '0px' }, // 在移动端进一步向上移动
        }}
      >
        <Avatar 
          src={currentCharacter.image} 
          alt={currentCharacter.name} 
          sx={{ 
            width: { xs: 70, sm: 150 },  // 在移动端进一步缩小头像大小
            height: { xs: 70, sm: 150 }, 
            mb: { xs: 1, sm: 3 }  // 缩小头像与文字之间的间距
          }} 
        />
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: { xs: 1, sm: 2 }, 
            fontSize: { xs: '1rem', sm: '2rem' }  // 调整字体大小以适应屏幕
          }}
        >
          {currentCharacter.name}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            maxWidth: '80%', 
            mb: { xs: 2, sm: 2 },
            fontSize: { xs: '0.5rem', sm: '1rem' }
          }}
        >
          {currentCharacter.description}
        </Typography>
      </Box>

      {/* 对话记录显示区域 */}
      <Box 
        flexGrow={1} 
        mb={2} 
        sx={{ 
          overflowY: 'auto', 
          px: { xs: 1, sm: 2 }, // 在移动端减少左右内边距
          position: 'relative', // 让负 margin 有效
          top: { xs: '-87px', sm: '0px' }, // 在移动端进一步向上移动
        }}
      >
        {messages.map((msg) => (
          <Box 
            key={msg.id} 
            display="flex" 
            flexDirection={msg.sender === 'user' ? 'row-reverse' : 'row'} 
            alignItems="flex-start" 
            mb={2}
            sx={{ 
              '& .MuiAvatar-root': {
                width: { xs: 32, sm: 32 }, // 在移动端缩小头像大小
                height: { xs: 32, sm: 32 },
              },
              width: '100%', // 确保父容器占据整个宽度
            }}
          >
            <Avatar 
              src={msg.sender === 'user' ? '/assets/用户.png' : currentCharacter.image} 
              alt={msg.sender === 'user' ? '我的头像' : currentCharacter.name} 
              sx={{ 
                [msg.sender === 'user' ? 'ml' : 'mr']: 2 
              }} 
            />
            <Box 
              sx={{ 
                bgcolor: msg.sender === 'user' ? '#e0e0e0' : '#f0f0f0', 
                p: 2, 
                borderRadius: 1, 
                maxWidth: { xs: '85%', sm: '60%' }, // 在移动端减小对话气泡宽度
                fontSize: { xs: '0.5rem', sm: '0.7rem' }, // 在移动端缩小字体大小
              }}
            >
            {msg.loading ? (
                <LoadingDots />
              ) : (
                // 确保 Typography 内没有其他内容，只有 dangerouslySetInnerHTML 插入的内容
                <Typography
                  component="span"
                  dangerouslySetInnerHTML={{
                    __html: msg.text.replace(/\n/g, '<br/>'),
                  }}
                />
              )}
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} /> {/* 用于自动滚动到最底部的占位元素 */}
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
