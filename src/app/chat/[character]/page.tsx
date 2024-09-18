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
import { useEffect, useRef, useState } from 'react';

// 引入麦克风和键盘图标
import MicIcon from '@mui/icons-material/Mic';
import KeyboardIcon from '@mui/icons-material/Keyboard';

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
  xionger: {
    name: '熊二',
    image: '/assets/熊二.jpg',
    description: '光头强，你又来砍树！',
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

  const messagesEndRef = useRef<HTMLDivElement>(null); // 指定为 HTMLDivElement 类型
  const [innovation, setInnovation] = React.useState(50); // Default value is 50
  const [gender, setGender] = React.useState(50); // Default value is 50


  // 添加状态变量，控制是文本输入还是语音输入
  const [isVoiceInput, setIsVoiceInput] = useState(false);

  // 开始录音的处理函数
  const handleVoiceRecordStart = () => {
    // 在此添加开始录音的逻辑
  };

  // 占位函数，用于模拟获取语音转文本的结果
  const getTranscribedText = async (): Promise<string> => {
    // 模拟一个异步操作，返回一个默认的字符串
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('这是语音转换的文本'); // 您可以替换为您想要的默认文本
      }, 1000); // 模拟 1 秒的延迟
    });
  };

  // 结束录音的处理函数
  const handleVoiceRecordStop = async () => {
    // 在此添加结束录音并处理结果的逻辑
    // 假设您已经有了将录音转换为文本的功能

    const transcribedText = await getTranscribedText(); // 替换为您的实际实现

    setMessage(transcribedText);
    handleSend();
  };

  // 每当 messages 更新时，自动滚动到最底部
  useEffect(() => {
    (messagesEndRef.current as HTMLDivElement)?.scrollIntoView({ behavior: 'smooth' });
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
      const userMessage = { text: message, sender: 'user' as const, id: Date.now(), loading: false };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setMessage(''); // 清空输入框
  
      setLoading(true);

      const loadingMessage = { text: '', sender: 'character' as const, id: Date.now() + 1, loading: true };
      setMessages((prevMessages) => [...prevMessages, loadingMessage]);
  
      // 保存聊天记录到 localStorage
      localStorage.setItem(`chat_history_${character}`, JSON.stringify(newMessages));
  
      try {
        // Include `innovation` and `gender` as part of the POST request body
        const response = await fetch('https://llm-abggoprivx.cn-hangzhou.fcapp.run/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role: character, // The character being used in the chat
            messages: newMessages.map(msg => ({ role: msg.sender, content: msg.text })), // User messages
            // Include innovation and gender as additional data
            innovation, 
            gender, 
          }),

        });
  
        const data = await response.json();
        setLoading(false); // 停止加载动画
  
        if (data.code === 1) {
          const characterMessage = { text: data.replies, sender: 'character' as const, id: Date.now() + 1, loading: false };
          const updatedMessages = [...newMessages, characterMessage];
          setMessages(updatedMessages);
  
          // 更新聊天记录到 localStorage
          localStorage.setItem(`chat_history_${character}`, JSON.stringify(updatedMessages));
        }
      } catch (error) {
        console.error('Error during message handling:', error);
        setLoading(false); // 停止加载动画，即使请求失败
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
  justifyContent="space-between"
  alignItems="center"
  width="100%"
  p={1}
  m={0.5}
  sx={{
    position: 'sticky',
    bottom: 0,
    bgcolor: 'white',
    boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
  }}
>
  {/* Clear Chat Button */}
  <IconButton 
    onClick={handleClearChat} 
    aria-label="清空聊天"
    sx={{ 
      padding: '2px', 
      minWidth: { xs: 30, sm: 48 }, 
    }}
  >
    <DeleteIcon sx={{ fontSize: 24 }} />
  </IconButton>

  {/* Input Mode Toggle Button */}
  <IconButton 
    onClick={() => setIsVoiceInput(!isVoiceInput)}
    aria-label={isVoiceInput ? "切换至文本输入" : "切换至语音输入"}
    sx={{ 
      padding: '2px', 
      minWidth: { xs: 30, sm: 48 }, 
    }}
  >
    {isVoiceInput ? <KeyboardIcon sx={{ fontSize: 24 }} /> : <MicIcon sx={{ fontSize: 24 }} />}
  </IconButton>

  {/* Voice Input Mode */}
  {isVoiceInput ? (
    <Button
      fullWidth
      variant="outlined"
      onMouseDown={handleVoiceRecordStart}
      onMouseUp={handleVoiceRecordStop}
      sx={{ 
        flexGrow: 1, 
        height: { xs: '36px', sm: '48px' }, 
        mx: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20px',
      }}
    >
      <MicIcon sx={{ mr: 1 }} />
      按住说话
    </Button>
  ) : (
    // Text Input Mode
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
        mx: 1,
        borderRadius: '20px',
        '& .MuiOutlinedInput-root': { 
          height: '100%',
          padding: '0 14px',
          borderRadius: '20px',
        },
      }}
    />
  )}

  {/* Send Button */}
  {!isVoiceInput && (
    <Button 
      variant="contained" 
      color="primary" 
      onClick={handleSend} 
      aria-label="发送消息"
      sx={{ 
        padding: '4px 8px',
        minWidth: { xs: 50, sm: 80 }, 
        fontSize: { xs: '0.75rem', sm: '1rem' },
        borderRadius: '20px',
      }}
    >
      发送
    </Button>
  )}
</Box>
</Box>
  );
}
