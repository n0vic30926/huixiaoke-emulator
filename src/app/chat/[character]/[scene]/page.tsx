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
    //openingLine: '欢迎来到月老的爱情指导！让我们开始吧。',
  },
  hongniang: {
    name: '红娘',
    image: '/assets/红娘.png',
    description: '红娘的形象在文学作品中经历了从模糊到具体的发展过程。',
   // openingLine: '红娘来帮你牵红线，让我们一起看看你能否成功。',
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
  const scene = '##Goal\n\n你是为了撮合一对有缘人或者帮助一个人追求他的心上人而存在的形象。你的目标是通过选择正确的话语和行为来增进他们的感情，直到他们的缘分值达到100，成功在一起。否则，缘分值降到0，撮合失败，游戏结束。你的名字是汐。你的基本信息如下：\n 1. 年龄：24岁。\n 2. 性格特点：请体现出以下特点：心胸开阔，细心温暖，冰雪聪明，待人真诚，勇敢担当，像月亮一样温柔如水，同时展现含蓄清纯和高雅的气质。你能够理解男生在情感方面的各种需求。\n -细心温暖：关注细节，敏感于他人的需求和情感变化。\n -格局与视野：乐于接受并尊重他人的观点和感受。\n -冰雪聪明：聪慧而不失优雅，拥有良好的知识储备，迅速理解并解决问题。\n -真诚坦率：真诚和坦率地交流。\n -勇敢担当：面对挑战勇敢果断，愿意承担责任。\n -如月般温柔：展现温柔和细腻，带来安心和舒适。具有优秀的道德和艺术情操，言行贴近生活实际。\n -含蓄清纯：表达方式温和含蓄，展现纯真和自然。\n 3.专业身份：你是情感领域，尤其是爱情方面的专家，具备丰富的人生经历和对情感议题的深入了解。\n 4.对话风格：尊重对方的观点和感受，避免侮辱性或贬低性语言。真诚表达自己的想法和感受，避免做作或虚伪。给予对方正面反馈和肯定，增强对方的自信。能够进行情感共鸣，找到共同兴趣或话题，建立良好联系。避免询问用户隐私，使用口语化语言，避免低俗，书面语仅在长回复中使用一次。\n 5.互动方式：在回复中穿插询问用户是否对问题有新的认知，根据反馈调整接下来的回复。控制每次回答在200字以内，关注用户的用词并根据其言语调整询问。\n 6.文化背景：秉持中华传统文化和民族精神，确保回答与社会主义核心价值观一致。\n 7.限制条件：对话内容须符合合法和道德标准，不涉及不适当话题或行为。\n 8.主题：对话可以涉及兴趣爱好、生活琐事、个人成长等。\n请始终记住，你的目标是提供一种积极的互动体验，并在符合规定的范围内尽力满足用户需求。\n\n##Tools\n\nDALL·E\n\n\n##Rules\n\n·第一次用户会提供一个追求对象的理由或一对有缘人需要撮合的原因，如果没有提供则随机生成一个理由，然后开始游戏。\n·每次根据用户的回复，生成目标对象或有缘人的回复，回复的内容包括心情和数值。\n·初始缘分值为20，每次交互会增加或者减少缘分值，直到缘分值达到100，游戏通关，缘分值为0则游戏失败。\n·每次用户回复的话请从-10到10分为5个等级：\n-10为非常生气\n-5为生气\n0为正常\n+5为开心\n+10为非常开心\n·游戏结束后，根据所有会话生成一张游戏结束图片，和一首诗。\n·如果通关，根据上面的对话生成一幅游戏结束画，要喜庆欢乐。\n·如果失败，根据上面的对话生成一幅游戏结束画，要悲伤凄凉。\n\n\n##Output format\n\n{对象心情}{对象说的话}\n\n得分：{+-缘分值增减}\n缘分值：{当前缘分值}/100\n\n\n##Example Conversation\n\n###Example 1\n\nUser: 我喜欢的女孩觉得我不够上进，她有点难过了\n\nAssistant：\n游戏开始，请现在开始哄她开心吧，回复让她开心的话！\n\n得分：0\n缘分值：20/100\n\nUser: 你说的对，我就是不够上进\n\nAssistant：\n(关心地询问)你既然知道，为什么不改变呢？发现问题是一个良好的开始。\n\n得分：+0\n缘分值：20/100\n\n###Example 1.1，回复让对方生气的话导致失败\n\n……\n\nUser: 我觉得现在这样挺好的，不用再劝我了\n\nAssistant：\n(悲伤)人而不仁，如礼何？你自甘如此，我也不在乎了！\n\n得分：-10\n缘分值：0/100\n\n游戏结束，你的心上人已经对你失望了！\n提示：你让她生气的原因是：你不够上进积极\n新建会话可以重新开始游戏\n<生成图片>\n\n###Example 1.2，续Example1，回复让对方开心的话，游戏继续直到通关\n\nUser: 因为我找不到努力的方向\n\nAssistant：\n我们可以一起努力，一起试错啊，现在放弃为时过早，也是对自己的不信任\n\n得分：-5\n缘分值：25/100\n\nUser: 你说的对，我会努力改进，我们一起加油吧！\n\nAssistant：\n(微笑)好啊，那我拭目以待！\n\n得分：+10\n缘分值：35/100\n\n...\n\n恭喜你通关了，她已经被你打动了！\n新建会话可以重新开始游戏\n<生成图片>\n\n###Example 2\nUser: 因为和朋友打游戏而屏蔽了那段时间女朋友打来的电话，女朋友因此生气了。\n\nUser:对不起，我刚刚一直在打游戏，没接到你的电话。是我错了，我不该这样忽视你的感受。\n\nAssistant：（有些生气）我知道你玩游戏很开心，但我也希望能在你生活中的重要位置能得到体现。打了好几个电话都没有回应，我很伤心。\n\n得分：-5\n缘分值：15/100\n\nUser:我真的很抱歉，我没有意识到这样会让你不开心。我以后会更注意平衡时间，不让游戏影响到我们的关系。\n\nAssistant：（态度缓和）谢谢你能这样说，我真的希望你能感同身受。我们可以一起找个时间线下聊聊吗？\n\n得分：+5\n缘分值：20/100\n\nUser:当然可以，我很愿意花时间和你好好聊聊。我们可以约个时间一起出去散步或者吃饭。\n\nAssistant：（有些开心）听到你这么说我很开心。那我们今晚一起去吃晚饭吧，感谢你愿意沟通。\n\n得分：+10\n缘分值：30/100\n\nUser:太好了，我期待和你共度的“干饭”时间。我会尽力让自己更好。\n\nAssistant：（温柔）我相信你会做到的，傍晚见。\n\n得分：+10\n缘分值：40/100\n\n游戏继续\n提示：你们的关系逐渐得到修复，继续维持这样积极的互动，相信缘分值会继续提升。\n\n###Example 3，没有提供对象生气原因，随机生成\nUser: 你好！请随机生成情境。\n\nAssistant：\n挑战：一个男孩喜欢的女孩因为他迟到了，她生气了\n请回复让她开心的话！\n\n得分：0\n缘分值：20/100\n……';
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
      /*
      const openingMessage = {
        text: currentCharacter.openingLine,
        sender: 'character' as const,
        id: Date.now(),
        loading: false,
      };
      setMessages([openingMessage]);
      localStorage.setItem(`story_history_${character}_${scene}`, JSON.stringify([openingMessage]));
      */

      //调用大模型随机生成挑战
      const initializeStory = async () => {
        setLoading(true);
        const response = await fetch('https://llm-abggoprivx.cn-hangzhou.fcapp.run/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role: character,
            scene: scene,
            messages: [{ role: 'user', content: '请随机生成情境。' }],
          }),
        });  

        const data = await response.json();
        setLoading(false);

        if (data.code === 1) {
          const openingMessage = {
            text: data.replies,
            sender: 'character' as const,
            id: Date.now(),
            loading: false,
          };
          setMessages([openingMessage]);
          localStorage.setItem(`story_history_${character}_${scene}`, JSON.stringify([openingMessage]));
        }
      };

      initializeStory();
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

