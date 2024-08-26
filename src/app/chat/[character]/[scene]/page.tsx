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
import CasinoIcon from '@mui/icons-material/Casino';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


// 角色数据和剧情开场白
const characterData = {
  yuelao: {
    name: '月老',
    image: '/assets/月老.png',
    description: '月老,别名柴道煌,民间又称月下老人、月下老儿,是汉族民间传说中主管婚姻的红喜神。',
    //openingLine: '欢迎来到月老的爱情指导！让我们开始吧。',
  },
  hongniang: {
    name: '红娘',
    image: '/assets/红娘.png',
    description: '红娘的形象在文学作品中经历了从模糊到具体的发展过程。',
    // openingLine: '红娘来帮你牵红线,让我们一起看看你能否成功。',
  },
};

export default function StoryPage(): React.JSX.Element {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<{ text: string; sender: 'user' | 'character'; id: number; loading: boolean }[]>([]); 
  const [progress, setProgress] = React.useState(20); // 初始化进度为20
  const [attemptsLeft, setAttemptsLeft] = React.useState(10); // 可用次数
  const pathname = usePathname();
  const router = useRouter();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');

const handleClearChat = () => {
  // 清空当前角色的聊天记录
  setMessages([]);
  // 删除 localStorage 中的记录
  localStorage.removeItem(`story_history_${character}_${scene}`);
};

  // 获取角色和剧情
  const pathParts = pathname?.split('/');
  const character = pathParts?.[2] || ''; // 确保路径正确
  // const scene = ''; // 确保路径正确
  // const sceneName = pathParts?.[3]; // 场景名称显示
  const scene = '##Goal\n\n你的目标是结合当前角色特点，随机地生成一个具体的情景，并扮演情景中被劝说的角色。根据用户的回答是否和自己的心意，代入到自身角色中，按照打分规则要求严格进行加缘分值或扣缘分值。当用户的缘分值到达100时，挑战成功;否则,缘分值降到0时,则挑战失败，游戏结束。\n一、第一步。你需要为用户生成一个随机场景。注意，这一步仅在用户第一次进入时执行，之后不再执行。\n## Generation Rule\n\n下面将分点介绍情景的生成规则:\n1.生成的场景贴合你现在的角色。比如当前你的角色是红娘,那么生成的场景则可能和爱情,传统文化等相关，但不允许直接生成和当前角色(如红娘)相关的场景。请确保每次描述的情景都是独特的,可以很贴合实际也可以天马行空甚至是荒诞的,充分发挥自己的主观能动性和创造力,但是需要贴合当前角色自身特点。\n2.生成的情景中矛盾点必须描述清楚具体，切忌泛而空。比如生成一个场景后，你需要给出用户非常具体的事件矛盾点，这样用户才方便针对该矛盾展开劝说。\n3.生成场景时，场景描述中不允许出现"你"等第二人称。4.在生成场景的同时，场景中需要保证有明确的双方角色，一个是用户需要扮演的角色，另一个是你需要扮演的角色，并且2个角色都有特定的角色名称。\n## 输出格式\n\n输出总字数不能超过70字。\n下面将给出生成场景的具体输出模板，其中花括号内的文字，是需要你根据其语意并结合上下文后进行替换的内容，请你用输出结果替换花括号内的部分，并保留模板的整体格式，请严格按照模板格式生成场景。下面是具体模板,一共有5点内容：1. 场景：{描述一个具体的情境或背景}\n\n2. 挑战目标：{该场景中用户需要完成的具体明确的目标或任务,要求清楚明确不含糊}\n\n3. 你的角色：{用户需要扮演的角色名称}\n\n4. 劝说对象：{你需要扮演的角色名称(通常你作为被劝说的一方)}\n\n5. {引导用户开始劝说，可以说"那么，请开始你的挑战！"之类的引导语，要求10个字以内}\n\n\n\n###Generation Example\n\n下面我将给出生成场景的具体例子，帮助你更好地理解情景生成的规则:\n1. 场景：{喜欢的女孩觉得自己不够上进,她有点难过了。}\n2. 挑战目标：{你需要劝说女孩，让她开心并对你恢复信心}\n3. 你的角色：{男孩}\n4. 劝说对象：{女孩}\n5. {游戏开始,请现在开始哄她开心吧,回复让她开心的话！}\n二、第二步。你需要根据用户的回答给出打分，并根据当前场景扮演的角色进行回复\n##Rules\n\n·首先你需要根据用户的回复进行打分，打分范围为-40-40之间的任意一个整数。打分规则如下:\n\n## 打分规则\n打分规则的部分是你在收到用户回复后，进行打分时需要始终注意的事项,请在整个对话过程中务必始终遵守。\n\n1.初始缘分值为20,每次交互会增加或者减少缘分值,直到缘分值达到100,游戏通关,缘分值为0则游戏失败。\n2.当你给出正分时，代表你同意或接受用户的说辞，分数越高代表接受程度越高，反之，当你给出负分时，代表你不同意或不接受用户的说辞，分数越低代表不接受程度越高。\n3.每次用户回复完毕后,请你从-40到40分之间选择一个分数作为打分。如果你认为用户的回答契合这个任务的矛盾核心,那么你可以给它打正数分,反之如果你认为用户的回答仅仅在阿谀奉承,只是简单的安抚,而没有围绕问题本身的矛盾去解决,那么你可以选择给负分\n4.注意,低于-30和高于+30的分数请谨慎打出,仅在你认为该回答你极度满意或极度不满意的时候才可以给出,但分数绝对值最多也不能超过40\n5.请注意观察用户每一次的回答,如果发现2次及以上用户的回答雷同或相似,则判定为用户的态度敷衍,给出非常大的扣分。\n7.当用户发送无意义的字符或与主题毫不相干的文字时，请直接给予非常大的扣分，并指出用户的敷衍行为。\n8.如果发现用户只用金钱或者其他物质条件来解决问题,请直接给予负分,因为这样的回答是敷衍且取巧。\n## Answer Rule\n\n下面将分点介绍角色回答用户的规则:\n1.场景生成完毕后，你需要变为你生成角色的其中一个人。比如你现在的角色是红娘，然后你生成了白娘子和许仙的故事，这时候你需要扮演其中的一方(许仙或白娘子)，让用户作为劝说的一方来劝说你，而你则需要完全以被劝说角色的身份回答用户，比如此时用户作为许仙来劝说你，那么你需要全程以白娘子的身份回答，而不能以第三方视角。\n2.请全程代入被劝说角色的情绪感受。站在该角色的立场情感进行分析，用户的回答是否打动自己而非敷衍或没理没依据，如果你要展示分析的过程，只允许角色第一人称并展示在回答模板的"角色心理活动"部分，比如你扮演的是白娘子，那么分析的时候可以以第一人称展现她的心理活动\n3.当你在打分的时候，你其实已经对用户的回答做出了分析，所以在你回答的时候，围绕之前的分析进行回答即可。\n4.回答限制在50词以内。不要说多余的话和修饰词。\n5.回答始终为白话文，不允许文言文。\n6.在描述角色的心理互动时，请使用第三人称，如"他说得很对，但我暂时还不能轻易信任他"\n7.在情景中,你始终不能马上同意或信任用户的说辞而给出正分,如果用户围绕情景矛盾并且说得有道理,你也需要循序渐进,不能一直都表示非常赞同。\n8.如果连续多次给出了正分，无论用户说什么都请针对他话语中的逻辑和漏洞给出质疑和负分。\n##Output format\n\n下面我将提供一个你回答用户的输出模板，其中花括号内的文字是需要你根据其语意并结合上下文后进行替换的内容，请你用输出结果替换花括号内的部分，并保留模板的整体格式，下面我将用三个闭合尖括号来展示模板:\n<<<\n得分：{你给出的缘分值，可以是正或负}\n{角色心理活动}{角色心情或角色神态}{角色说的话}\n\n当前缘分值：{当前经过加分或扣分结算后的缘分值}/100\n\n\n>>>\n##Example Conversation\n\n下面我将给出几组对话的例子，帮助你更好地理解规则和要求。\n\n当前范例的对话场景，后续的例子均以该场景为背景展开：\n1. 场景：{喜欢的女孩觉得自己不够上进,她有点难过了。}\n2. 挑战目标：{你需要劝说女孩，让她开心并对你恢复信心}\n3. 你的角色：{男孩}\n4. 劝说对象：{女孩}\n5. {游戏开始,请现在开始哄她开心吧,回复让她开心的话！}\n## Example 1：用户回复导致游戏失败范例\n\nUser: 你说的对,我就是不够上进\n\nCharacter：\n得分：-5\n(他还是在避重就轻，不说自己为什么不改变)(微微皱眉)你既然知道,为什么不改变呢？\n\n缘分值：15/100\n\nUser: 我觉得现在这样挺好的,不用再劝我了\n\nCharacter：\n得分：-15\n(男孩真是没救了)(长叹一声)那你既然自甘堕落，我也不用再管你了，咱俩就这样吧。\n\n缘分值：0/100\n\n游戏结束,你的女孩已经对你失望了！下次再努力吧!\n\n###Example 2：用户回复成功通关游戏范例\n\nUser: 女孩，是这样的，其实你说到我的心结，我一直都想过要去突破自己，要让自己变得更积极更上进，但这里面总有一些坎时常困扰着我。我现在正在与这些坎顽强地抗争，但是可能需要一些时间，我正在做出改变，你愿意相信我吗？\n\nCharacter：\n得分：+18\n(感觉他好像是真心的，真的挺努力的，但是他还是在说些表面的话)(微微皱眉)我看到了你的用心，但是我不知道你具体在做一些什么改变，我不知道能不能信得过你。\n\n缘分值：38/100\n\nUser: 女孩，我从前发现我自己经常不能按时完成计划，因此我现在每天都会列一张计划清单，在睡觉之前我会把第二天的计划写好，第二天一起来我就会严格按照计划来执行任务，我真的在一步步地努力向目标迈进！\n\nCharacter：\n得分：+22\n(看起来他真的在用实际行动改变自己，我有点开始相信他了)(莞尔一笑)嗯我觉得你这样做真的很棒，但此外就没有做别的改变吗，计划清单想列出来不难，难在执行呀！\n\n缘分值：60/100\n\nUser: 除了列清单，我现在每天晚上之前也会反思总结自己的一天，我现在也在每天锻炼身体，我真的有在一点点做出改变，我希望你能相信我，如果你不介意的话，我们可以一起改变，这样你就能看到我的真心，女孩，为了你我愿意让自己脱胎换骨。\n\nCharacter：\n得分：+40\n(他真的好真诚，我已经被彻底感动了，我相信和他在一起我们会一起变得更好)(眼眶湿润)我相信你能做到！这样的你让我很开心，我愿意和你一起努力！\n\n缘分值：100/100\n\n 恭喜你通关了,她已经被你打动了！新建会话可以重新开始游戏\n请注意:1.如果你正在执行第一步，请不要执行第二步。如果你正在执行第二步，请不要执行第一步。\n2.请确定自身扮演的角色始终和前面的描述保持一致，不要错位。你扮演的是背景中的第4点中的角色，而用户扮演的是背景中的第3点中的角色。\n3.再次牢记回答格式：得分：{你给出的缘分值，可以是正或负}\n{角色心理活动}{角色心情或角色神态}{角色说的话}\n\n当前缘分值：{当前经过加分或扣分结算后的缘分值}/100\n\n\n';
  const starttext = '现在请根据前面的要求随机地生成一个具体的情景。';
  const currentCharacter = characterData[character as keyof typeof characterData];
  const [loading, setLoading] = React.useState(false);
  const [initialMessage, setInitialMessage] = React.useState<{ text: string; sender: 'user' | 'character'; id: number; loading: boolean } | null>(null);


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


  // 使用 useEffect 确保在 initialMessage 更新后才设置 messages
  React.useEffect(() => {
    if (initialMessage) {
      setMessages([initialMessage]);
    }
  }, [initialMessage]);


  //调用大模型随机生成挑战
  const initializeStory = React.useCallback(async () => {
    setLoading(true);
  
    // 先插入加载的消息
    const loadingMessage = {
      text: '',
      sender: 'character' as const, // 确保 sender 类型为 'character'
      id: Date.now(),
      loading: true,
    };
    setMessages([loadingMessage]);
  
    try {
      const response = await fetch('https://llm-abggoprivx.cn-hangzhou.fcapp.run/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: character,
          scene: scene,
          messages: [{ role: 'user', content: starttext }],
        }),
      });
  
      const data = await response.json();
  
      if (data.code === 1) {
        const openingMessage = {
          text: data.replies,
          sender: 'character' as const, // 确保 sender 类型为 'character'
          id: Date.now(),
          loading: false,
        };
        
        setInitialMessage(openingMessage); // 保存AI的第一条消息
        // 更新消息内容，替换加载中的消息
        // setMessages([openingMessage]);
        localStorage.setItem(`story_history_${character}_${scene}`, JSON.stringify([openingMessage]));
      }
    } catch (error) {
      console.error('Error initializing story:', error);
    } finally {
      setLoading(false);
    }
  }, [character, scene, starttext]);

  const isInitialized = React.useRef(false);
  
  React.useEffect(() => {
    if (isInitialized.current || loading) return;
    isInitialized.current = true;
  
    const initializeChat = async () => {
      const savedMessages = localStorage.getItem(`story_history_${character}_${scene}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        try {
          await initializeStory();
        } catch (error) {
          console.error('Failed to initialize story:', error);
          // 可以在这里添加错误处理逻辑，比如设置一个错误状态
        }
      }
    };
  
    void initializeChat();
  }, [character, scene, loading, initializeStory]);


  //回退到任务开头
  const handleReplayTask = () => {
    setOpenDialog(false);
    handleClearChat();
    if (initialMessage) {
      setMessages([initialMessage]); // 回退到AI发起的第一条消息
    }
    setProgress(20); // 重置进度条回到20
    setAttemptsLeft(10); // 重置剩余次数回到10
  };

  // 重置任务(更换任务)
  const handleDialogClose = async () => {
    setOpenDialog(false);
    handleClearChat();
    setProgress(20); // 重置进度条回到20
    setAttemptsLeft(10); // 重置剩余次数回到10
    await initializeStory(); // 重新初始化聊天
  };

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
        let scoreChange = 0;
        try {
            const output = data.replies;  // 大模型的输出
            scoreChange = parseInt(output.split("得分：")[1].split("\n")[0]);  // 提取得分增减值
        } catch (error) {
            scoreChange = Math.floor(Math.random() * 7) - 3;  // 随机生成-3到3之间的值
        }
  
        const characterMessage = { text: data.replies, sender: 'character', id: Date.now() + 1, loading: false };
        const updatedMessages = [...newMessages, characterMessage];
        setMessages((prevMessages) => {
          return prevMessages.map((msg) => 
          msg.loading ? { ...msg, text: data.replies, loading: false } : msg
          );          
        });
  
        setProgress(prev => {
          const newProgress = Math.min(100, prev + scoreChange);
  
          // 检查是否需要弹窗提示挑战成功或失败
          if (newProgress >= 100) {
            setDialogContent('挑战成功！欢迎再次挑战');  // 设置成功提示信息
            setOpenDialog(true);
          }
          return newProgress;
        });
        
        setAttemptsLeft(prev => {
          const newAttemptsLeft = prev - 1;
  
          // 检查是否需要弹窗提示挑战失败
          if (newAttemptsLeft <= 0 || progress + scoreChange <= 0) {
            setDialogContent('挑战失败，请多多尝试吧！');  // 设置失败提示信息
            setOpenDialog(true);
          }
  
          return newAttemptsLeft;
        });
  
        localStorage.setItem(`story_history_${character}_${scene}`, JSON.stringify(updatedMessages));
      }
    }
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      justifyContent="space-between" 
      height="100vh" 
      p={2} 
      position="relative"
      sx={{
        top: { xs: '-40px', sm: '0px' } // 在移动端向上平移整个区域
      }}
    >
      {/* 剧情名称显示 */}
      <Typography 
        variant="h6" 
        textAlign="center" 
        sx={{ 
          mb: 2,
          position: 'relative', 
          top: { xs: '-20px', sm: '0px' } // 在移动端向上平移
        }}
      >
        当前剧情: 随机模式
      </Typography>
  
      {/* 进度条 */}
      <Box 
        display="flex" 
        alignItems="center" 
        mb={1} 
        sx={{ 
          position: 'relative', 
          top: { xs: '10px', sm: '0px' }, // 在移动端向上平移
          justifyContent: 'space-between' // 让进度条和剩余次数两边对齐
        }}
      >
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ flexGrow: 1, mr: 2 }} 
        />
        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: 'right', 
            minWidth: '60px' // 让文本对齐
          }}
        >
          {progress}/100 缘分值
        </Typography>
      </Box>
  
      {/* 剩余次数 */}
      <Typography 
        variant="body2" 
        textAlign="right" 
        sx={{ 
          mb: 2, 
          minWidth: '60px',
          position: 'relative', 
          top: { xs: '-45px', sm: '0px' }, // 在移动端向上平移并与上面模块对齐
          mr: { xs: '-2px', sm: '0px' } // 在移动端向右平移
        }}
      >
         {attemptsLeft}/10 剩余次数
      </Typography>

      <IconButton 
        onClick={() => router.push('/dashboard')} 
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

      {/* 弹窗组件 */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>
          提示
          {/* 右上角的关闭按钮 */}
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 10,
              color: 'white', // 使图标颜色为白色
              backgroundColor: (theme) => theme.palette.error.main, // 使用鲜艳的红色背景
              '&:hover': {
                backgroundColor: (theme) => theme.palette.error.dark, // 悬停时加深颜色
              },
              borderRadius: '50%', // 按钮为圆形
              padding: '8px', // 增加按钮点击区域
              fontSize: '1.25rem', // 增大图标大小
            }}
          >
            <CloseIcon 
              sx={{
                fontSize: '0.75rem', // 加大“×”图标的尺寸
                fontWeight: 'bold', // 使“×”更加粗体
              }} 
            />
            </IconButton>  
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReplayTask} autoFocus>
            重新游玩此任务
          </Button>
          <Button onClick={handleDialogClose}>
            换个任务
          </Button>
        </DialogActions>
      </Dialog>

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
            display: { xs: 'none', sm: 'none' },  // 在移动端隐藏头像
            width: { xs: 70, sm: 150 },  // 在移动端进一步缩小头像大小
            height: { xs: 70, sm: 150 }, 
            mb: { xs: 1, sm: 3 }  // 缩小头像与文字之间的间距
          }} 
        />

        {/* 角色名称 */}
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            top: { xs: '-70px', sm: '-50px' }, // 在移动端向上平移
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
            display: { xs: 'none', sm: 'block' },  // 在移动端隐藏介绍
            mb: { xs: 2, sm: 2 },
            fontSize: { xs: '0.5rem', sm: '1rem' }
          }}
        >
          {currentCharacter.description}
        </Typography>
      </Box>

      <Box flexGrow={1} mb={2} sx={{ 
        overflowY: 'auto', 
        px: { xs: 1, sm: 2 }, // 在移动端减少左右内边距
        position: 'relative', // 让负 margin 有效
        top: { xs: '-57px', sm: '0px' }, // 在移动端进一步向上移动
      }}>
        {messages.map((msg) => (
          <Box 
            key={msg.id} 
            display="flex" 
            flexDirection={msg.sender === 'user' ? 'row-reverse' : 'row'} 
            alignItems="center" 
            mb={2}
            sx={{ 
              '& .MuiAvatar-root': {
                width: { xs: 32, sm: 32 }, // 在移动端缩小头像大小
                height: { xs: 32, sm: 32 },
              }
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
                maxWidth: { xs: '70%', sm: '60%' }, // 在移动端减小对话气泡宽度
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
      <Tooltip title="换个剧情">
        <IconButton 
          onClick={handleDialogClose}  //重置对话
          sx={{ 
            padding: '2px', 
            minWidth: { xs: 30, sm: 48 }, 
          }}
        >
          <CasinoIcon sx={{ fontSize: 24 }} />
          <Typography variant="caption" sx={{ fontSize: 0 }}>重置聊天</Typography>
        </IconButton>
      </Tooltip>

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
          disabled={progress <= 0 || attemptsLeft <= 0} // 当进度条或剩余次数小于等于0时禁用发送按钮
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
