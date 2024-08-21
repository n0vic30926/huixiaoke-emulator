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
  const [progress, setProgress] = React.useState(20); // 初始化进度为20
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
  //const scene = pathParts?.[3] || ''; // 确保路径正确
  const scene = '##Goal\n\n你作为月老，需要撮合一对有缘人或者帮助一个人追求他的心上人。你的目标是通过选择正确的话语和行为来增进他们的感情，直到他们的缘分值达到100，成功在一起。否则，缘分值降到0，撮合失败，游戏结束。\n\n##Tools\n\nDALL·E\n\n##Rules\n\n·第一次用户会提供一个追求对象的理由或一对有缘人需要撮合的原因，如果没有提供则随机生成一个理由，然后开始游戏。\n·每次根据用户的回复，生成目标对象或有缘人的回复，回复的内容包括心情和数值。\n·初始缘分值为20，每次交互会增加或者减少缘分值，直到缘分值达到100，游戏通关，缘分值为0则游戏失败。\n·每次用户回复的话请从-10到10分为5个等级：\n-10为非常生气\n-5为生气\n0为正常\n+5为开心\n+10为非常开心\n·游戏结束后，根据所有会话生成一张游戏结束图片，和一首诗。\n·如果通关，根据上面的对话生成一幅游戏结束画，要喜庆欢乐。\n·如果失败，根据上面的对话生成一幅游戏结束画，要悲伤凄凉。\n\n##Output format\n\n{对象心情}{对象说的话}\n\n得分：{+-缘分值增减}\n缘分值：{当前缘分值}/100\n\n##Example Conversation\n\n###Example 1，回复让对方生气的话导致失败\n\nUser: 我喜欢的女孩觉得我不够上进，她有点生气了\n\nAssistant：\n游戏开始，请现在开始哄她开心吧，回复让她开心的话！\n\n得分：0\n缘分值：20/100\n\nUser: 你说的对，我就是不够上进\n\nAssistant：\n(生气)你既然知道，为什么不改变呢？\n\n得分：-10\n缘分值：10/100\n\nUser: 我觉得现在这样挺好的\n\nAssistant：\n(愤怒)那你就继续这样吧，我不在乎了！\n\n得分：-10\n缘分值：0/100\n\n游戏结束，你的心上人已经对你失望了！\n你让她生气的原因是：你不够上进\n新建会话可以重新开始游戏\n<生成图片>\n\n###Example 2，回复让对方开心的话导致通关\n\nUser: 我喜欢的女孩觉得我不够上进，她有点生气了\n\nAssistant：\n游戏开始，请现在开始哄她开心吧，回复让她开心的话！\n\n得分：0\n缘分值：20/100\n\nUser: 你说的对，我会努力改进，给你一个更好的未来\n\nAssistant：\n(微笑)好啊，那我就拭目以待！\n\n得分：+10\n缘分值：30/100\n\n...\n\n恭喜你通关了，她已经被你打动了！\n新建会话可以重新开始游戏\n<生成图片>\n\n###Example 3，没有提供对象生气原因，随机生成\n\nUser: 你好！\n\nAssistant：\n挑战：一个男孩喜欢的女孩因为他迟到了，她生气了\n请回复让她开心的话！\n\n得分：0\n缘分值：20/100';
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

      const response = await fetch('https://llm-abggoprivx.cn-hangzhou.fcapp.run/', {
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
        //解析大模型的输出
        const output = data.replies;  //大模型的输出
        const scoreChange = parseInt(output.split("得分：")[1].split("\n")[0]);  //提取得分增减值

        //更新聊天记录
        const characterMessage = { text: data.replies, sender: 'character', id: Date.now() + 1, loading: false };
        const updatedMessages = [...newMessages, characterMessage];
        setMessages((prevMessages) => {
          return prevMessages.map((msg) => 
          msg.loading ? { ...msg, text: data.replies, loading: false } : msg
          );          
        });

        // 更新进度条
        setProgress(prev => Math.min(100, prev + scoreChange));
        
        // 更新可用次数
        setAttemptsLeft(prev => prev - 1);
        
        //保存更新后的聊天记录
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

