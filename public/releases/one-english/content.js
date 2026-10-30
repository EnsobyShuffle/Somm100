/* ONE English · curriculum seed · v0.1 · content can be separated into a CMS later */
const COURSE = {
  name: 'ONE English', language: 'en', interface: 'zh-CN', contentVersion: '2026-10-27',
  topics: {
    daily: {label:'日常生活',emoji:'☀️'},
    conversation: {label:'日常交流',emoji:'💬'},
    travel: {label:'旅行出行',emoji:'🧳'},
    work: {label:'职场沟通',emoji:'💼'},
    dining: {label:'餐厅与服务',emoji:'🍽️'},
    growth: {label:'表达与成长',emoji:'🌱'}
  },
  levels: {'A0':'零基础','A1':'入门','A2':'基础','B1':'中级','B2':'进阶'}
};
const VOCAB=[];
function addWords(topic, rows) {
  rows.trim().split('\n').forEach((line,i)=>{
    let [e,c,ex,ipa] = line.split('|').map(s=>s.trim());
    if (!e||!c||!ex) return;
    VOCAB.push({id:'w'+(VOCAB.length+1),e,c,ex,ipa:ipa||'',topic,level:i<6?'A0':i<15?'A1':i<23?'A2':'B1'});
  });
}
addWords('daily', `
hello|你好|Hello, nice to meet you.|/həˈləʊ/
good morning|早上好|Good morning! Did you sleep well?
thank you|谢谢你|Thank you for your help.|/ˈθæŋk juː/
excuse me|不好意思；劳驾|Excuse me, is this seat taken?
please|请|Please speak a little more slowly.|/pliːz/
sorry|抱歉|Sorry, I am late today.
usually|通常|I usually get up at seven.
nearly|几乎；差不多|I'm nearly ready.
busy|忙碌的|I am a little busy this afternoon.
available|有空的；可用的|Are you available tomorrow?
prefer|更喜欢|I prefer tea to coffee.
comfortable|舒服的|This chair is very comfortable.
appointment|预约；约定|I have an appointment at two.
on time|准时|The train arrived on time.
a little bit|一点点|I'm a little bit tired today.
used to|过去常常|I used to live near the station.
get used to|适应|I'm getting used to my new schedule.
figure out|弄明白|I need to figure out this problem.
run out of|用完|We've run out of milk.
look forward to|期待|I look forward to seeing you.
keep in touch|保持联系|Let's keep in touch after the trip.
by the way|顺便说一下|By the way, how was your weekend?
so far|到目前为止|So far, everything is going well.
at least|至少|Try to study for at least ten minutes.
make the most of|充分利用|Let's make the most of our free time.
`);
addWords('conversation', `
how are you?|你好吗？|How are you feeling today?
what's your name?|你叫什么名字？|What's your name, please?
where are you from?|你来自哪里？|Where are you from originally?
I don't understand|我不理解|Sorry, I don't understand.
could you repeat that?|你能重复一遍吗？|Could you repeat that, please?
what do you mean?|你的意思是什么？|What do you mean by that?
actually|其实；实际上|Actually, I have another idea.
probably|大概；很可能|I'll probably arrive around six.
exactly|确切地；正是|That's exactly what I wanted to say.
in my opinion|在我看来|In my opinion, this is a good idea.
I agree|我同意|I agree with your point.
I disagree|我不同意|I disagree, but I understand why.
that makes sense|这说得通|That makes sense to me.
tell me more|再多说一点|Tell me more about your work.
it depends|看情况|It depends on the weather.
to be honest|坦白说|To be honest, I was nervous.
as far as I know|据我所知|As far as I know, the shop closes at nine.
what if|如果……会怎样？|What if we try a different way?
I was wondering|我想请问|I was wondering if you had a minute.
let me clarify|让我澄清一下|Let me clarify what I mean.
in other words|换句话说|In other words, we need more time.
from my perspective|从我的角度来看|From my perspective, the timing is right.
I see your point|我理解你的观点|I see your point, but I have a concern.
would you mind|你介意……吗？|Would you mind opening the window?
what I mean is|我的意思是|What I mean is that we should start today.
`);
addWords('travel', `
airport|机场|We need to leave for the airport now.
ticket|票|I booked my ticket online.
passport|护照|Please show your passport at the counter.
luggage|行李|Where can I collect my luggage?
platform|站台|Which platform does the train leave from?
turn left|左转|Turn left at the next street.
check in|办理入住；登机|I'd like to check in, please.
check out|办理退房|What time do we need to check out?
one-way|单程的|I'd like a one-way ticket to London.
round trip|往返|Is a round-trip ticket cheaper?
delay|延误|Our flight has a two-hour delay.
boarding pass|登机牌|Can I see your boarding pass?
gate|登机口|The boarding gate is number twelve.
reservation|预订|I have a reservation under Chen.
availability|可用名额；空房|Do you have any availability tonight?
transfer|换乘；转机|I have a transfer in Singapore.
itinerary|旅行行程|I made a simple itinerary for the weekend.
local|本地的|Can you recommend a local restaurant?
nearby|附近|Is there a pharmacy nearby?
get around|四处走动；出行|What's the easiest way to get around?
miss a flight|误机|I don't want to miss my flight.
carry-on|随身行李|Is this bag allowed as carry-on?
confirmation|确认信息|Could you send me a confirmation email?
refund|退款|Can I request a refund?
make a detour|绕路|Let's make a detour to see the old town.
`);
addWords('work', `
meeting|会议|We have a meeting at ten.
schedule|日程；安排|What's your schedule for tomorrow?
team|团队|Our team is working on a new project.
email|邮件|I'll send you an email this afternoon.
question|问题|I have a question about the task.
deadline|截止日期|The deadline is next Friday.
follow up|跟进|I'll follow up with the client tomorrow.
feedback|反馈|Could you give me some feedback?
priority|优先事项|What's our top priority today?
manage to|设法做到|We managed to finish on time.
accomplish|完成；实现|What would you like to accomplish this week?
execution|执行；落实|Good ideas need strong execution.
responsibility|职责；责任|This is part of my responsibility.
collaborate|合作|We need to collaborate across teams.
solution|解决方案|Let's find a practical solution.
update|最新进展；更新|Do you have an update on the project?
clarify|澄清；说明|Could you clarify the requirements?
approach|方法；处理方式|Let's try a different approach.
handle|处理|I can handle this task.
deliver|交付|We promised to deliver by Monday.
take ownership|主动负责|Who will take ownership of this issue?
set expectations|明确预期|We should set expectations early.
workload|工作量|My workload is heavy this week.
be on the same page|达成共识|Let's make sure we're on the same page.
reach a compromise|达成妥协|We finally reached a compromise.
`);
addWords('dining', `
menu|菜单|Could I see the menu, please?
water|水|Would you like still or sparkling water?
bill|账单|Could we have the bill, please?
table|餐桌|Do you have a table for two?
vegetarian|素食的；素食者|Do you have any vegetarian dishes?
allergy|过敏|Do you have any food allergies?
recommend|推荐|What would you recommend?
order|点餐；订单|Are you ready to order?
starter|前菜|Would you like a starter?
main course|主菜|Your main course will be ready shortly.
dessert|甜点|Would you like to see the dessert menu?
special|今日特色|Our special today is grilled sea bass.
rare|一分熟；较生|I'd like my steak rare.
medium rare|三分熟|I prefer my steak medium rare.
well done|全熟|Could you cook it well done?
on the side|另外放；单独装|Could I have the sauce on the side?
seasonal|时令的|We use seasonal vegetables.
locally sourced|本地采购的|These tomatoes are locally sourced.
paired with|搭配|This dish is paired with a dry white wine.
complimentary|赠送的；免费的|The bread is complimentary.
service charge|服务费|Is the service charge included?
dietary restriction|饮食限制|Please tell us about any dietary restrictions.
fully booked|订满了|I'm sorry, we're fully booked tonight.
substitution|替换选项|Is there a substitution for the cheese?
recommendation|推荐建议|May I offer a recommendation?
`);
addWords('growth', `
practice|练习|I practice English every day.
progress|进步|I can see my progress this month.
challenge|挑战|Speaking is still a challenge for me.
confidence|自信|Practice helps build confidence.
improve|提高|I want to improve my pronunciation.
mistake|错误|It's okay to learn from a mistake.
fluent|流利的|I hope to become more fluent.
consistent|持续稳定的|Try to be consistent with your practice.
motivation|动力|What's your motivation for learning English?
pronunciation|发音|I want to work on my pronunciation.
expression|表达方式|That's a useful English expression.
fluency|流利程度|Fluency takes time and practice.
accuracy|准确度|Focus on accuracy first, then speed.
review|复习|I review new words before bed.
remember|记住|I can't remember that phrase yet.
make progress|取得进步|You're making progress every week.
stick with|坚持|Stick with your learning routine.
step by step|一步一步地|Let's work on it step by step.
overcome|克服|I want to overcome my fear of speaking.
set a goal|设立目标|Set a small goal for each day.
keep going|继续坚持|Keep going, even when it's hard.
reflect on|反思|Take time to reflect on what you learned.
self-awareness|自我认知|Self-awareness helps you improve.
apply|应用；运用|Try to apply these phrases at work.
turn knowledge into action|把知识转化为行动|We need to turn knowledge into action.
`);
const SENTENCES = [
  ['Could you speak a little more slowly?', '你能说慢一点吗？','用于没听清楚、请求对方放慢语速','conversation'],
  ["I'm still learning English, but I'd like to try.",'我还在学英语，但我想试试。','礼貌且自然地表达学习阶段','conversation'],
  ["What does this word mean?",'这个单词是什么意思？','听到不认识的单词时','conversation'],
  ["Let me think about that for a second.",'让我想一想。','给自己争取表达时间','conversation'],
  ["I didn't quite catch that.",'我刚才没听清。','比 I don’t understand 更委婉','conversation'],
  ["Could you give me an example?",'你能举个例子吗？','请求更具体的说明','conversation'],
  ["What have you been up to lately?",'你最近在忙什么？','朋友间自然的寒暄','daily'],
  ["That sounds like a great idea.",'听起来是个很棒的主意。','回应朋友的提议','daily'],
  ["I'm running a little late.",'我会晚到一点。','通知对方迟到','daily'],
  ["Are you free sometime this weekend?",'你这个周末有时间吗？','邀请见面','daily'],
  ["I'd like to make a reservation for two.",'我想订一个两人位。','餐厅订位','dining'],
  ["Do you have any dietary restrictions?",'您有什么饮食禁忌吗？','餐厅服务','dining'],
  ["Would you like me to recommend something?",'需要我为您推荐一些东西吗？','专业服务','dining'],
  ["May I take your order?",'现在可以为您点餐吗？','餐厅服务','dining'],
  ["The sauce is served on the side.",'酱汁会单独提供。','描述菜品','dining'],
  ["Could you help me find the right platform?",'你能帮我找到正确的站台吗？','出行问路','travel'],
  ["Is there an earlier flight available?",'还有更早的航班吗？','航班变更','travel'],
  ["Could I check out a little later?",'我能晚一点退房吗？','酒店沟通','travel'],
  ["Let me make sure I understood correctly.",'让我确认一下我是否理解正确。','复述核对','work'],
  ["What's the next step?",'下一步是什么？','工作推进','work'],
  ["Could we move the meeting to tomorrow?",'我们能把会议改到明天吗？','调整会议','work'],
  ["I'll follow up and get back to you.",'我会跟进之后回复你。','工作承诺','work'],
  ["I managed to finish it ahead of schedule.",'我设法提前完成了。','汇报进度','work'],
  ["Let's focus on one thing at a time.",'我们一次专注一件事。','工作与成长','growth'],
  ["The more I practice, the more confident I feel.",'我练得越多，就越有信心。','表达学习进步','growth'],
  ["It's okay to make mistakes as long as I keep learning.",'只要继续学习，犯错也没关系。','学习心态','growth'],
  ["What would you do in my situation?",'如果你是我，你会怎么做？','寻求建议','conversation'],
  ["I see what you mean, but I have a different opinion.",'我理解你的意思，但我的看法不太一样。','礼貌表达不同意见','conversation'],
  ["If I understand you correctly, you mean ...",'如果我理解得没错，你是说……','确认理解','conversation'],
  ["Could we go over that one more time?",'我们能再过一遍吗？','会议或学习','work'],
].map(([en,zh,note,topic],i)=>({id:'s'+(i+1),en,zh,note,topic}));
const ARTICLES = [
 {id:'r1',title:'My First English Conversation',subtitle:'第一次勇敢开口',level:'A0',topic:'conversation',mins:5,
  body:`Today, I meet someone new at a coffee shop. Her name is Emma. She smiles and says, “Hello! How are you?” I feel a little nervous because I am learning English. I say, “I'm good, thank you. How about you?” We talk for two minutes. I make a few mistakes, but Emma understands me. Before she leaves, I say, “It was nice to meet you.” She says, “You too!” I feel happy. Two minutes may seem short, but today I spoke English instead of staying silent. Tomorrow, I want to try again.`,
  summary:'在咖啡馆第一次和陌生人用英语交谈，虽然紧张，却完成了真正的交流。',qs:[['Why is the speaker nervous?',['They lost their phone.','They are learning English.','They missed the train.'],1],['How does the speaker feel at the end?',['Happy','Angry','Sleepy'],0]]},
 {id:'r2',title:'A Simple Morning Routine',subtitle:'一个可坚持的早晨',level:'A0',topic:'daily',mins:5,
  body:`I wake up at seven o'clock. I drink a glass of water and open the window. Then I make breakfast. I usually have eggs, fruit, and tea. Before I start work, I study English for ten minutes. I listen to a short conversation and repeat the useful sentences. Sometimes I cannot remember a word. That's okay. I write it down and review it the next day. Small habits help me learn. I don't need a perfect morning. I just need to begin.`,
  summary:'用十分钟听英语、重复句子、记录生词，从简单晨间习惯建立长期学习。',qs:[['When does the speaker study English?',['Before work','After dinner','On the bus'],0],['What happens when a word is difficult?',['They quit studying.','They write it down.','They skip breakfast.'],1]]},
 {id:'r3',title:'Ordering Lunch',subtitle:'午餐点餐',level:'A1',topic:'dining',mins:6,
  body:`Mia goes to a small restaurant for lunch. A server welcomes her and gives her the menu. “Are you ready to order?” he asks. Mia would like a salad and a bowl of soup. She has a food allergy, so she asks, “Does the soup contain nuts?” The server checks with the kitchen before answering. He explains that the soup is made without nuts, but the kitchen also handles nuts. Mia chooses a different dish to be safe. At the end of lunch, she asks for the bill and thanks the server for his help. Good communication makes the experience better for everyone.`,
  summary:'点餐时主动询问过敏原，服务员核实并说明交叉接触风险。',qs:[['What does Mia ask about?',['The price of a salad','Whether soup contains nuts','The opening time'],1],['Why does Mia choose another dish?',['To be safe','She is not hungry','The server is late'],0]]},
 {id:'r4',title:'The Missed Train',subtitle:'错过火车之后',level:'A1',topic:'travel',mins:6,
  body:`Daniel arrives at the station five minutes too late. His train has already left. He feels frustrated, but he walks to the service desk. “Excuse me,” he says, “I've missed my train. Is there another one?” The staff member checks the schedule. The next train leaves in forty minutes. Daniel asks whether he needs to buy a new ticket. The staff member explains the conditions of his ticket and tells him what to do. Daniel thanks her, finds the correct platform, and waits. He learns that asking a clear question is often more useful than worrying in silence.`,
  summary:'错过火车后向工作人员询问下一班车、车票规则和站台。',qs:[['How late is Daniel?',['Five minutes','Forty minutes','One hour'],0],['Who helps him?',['A taxi driver','A staff member','A friend'],1]]},
 {id:'r5',title:'A Better Team Meeting',subtitle:'更高效的会议',level:'A1',topic:'work',mins:7,
  body:`A team meets every Monday morning. In the past, their meetings were long and confusing. Now they begin with three questions: What did we accomplish last week? What is our biggest priority? Who will take ownership of each task? Everyone gives a short update. When something is unclear, they ask for an example or clarify the deadline. At the end, the team writes down the next steps. The meeting lasts only twenty minutes, but the work is more organized. A good meeting is not about speaking a lot. It is about making sure people understand what to do.`,
  summary:'通过进展、优先级和负责人三个问题，让会议简短且能真正推进工作。',qs:[['What is one question the team asks?',['Who will take ownership?','Who wants pizza?','Where is the train?'],0],['What is most important in a meeting?',['Speaking the longest','Clear next steps','Using difficult words'],1]]},
 {id:'r6',title:'Learning Through Mistakes',subtitle:'错误就是反馈',level:'A1',topic:'growth',mins:7,
  body:`When Leo began learning English, he wanted to say every sentence perfectly. Because of this, he rarely spoke. One day, his teacher asked him to describe his weekend without preparing any notes. Leo made mistakes, stopped, and started again. His teacher did not interrupt every sentence. Instead, she wrote down three useful corrections and discussed them after he finished. Leo realized that communication and accuracy can improve together. Now he speaks a little every day, reviews his mistakes, and tries the same ideas again in new conversations. His confidence is growing because he is willing to practice.`,
  summary:'先完成表达，再集中纠正关键错误，把语言输出变成常态。',qs:[['Why did Leo rarely speak at first?',['He wanted to be perfect','He had no teacher','He disliked weekends'],0],['How did his teacher give feedback?',['Interrupted every sentence','Discussed three corrections afterward','Gave no feedback'],1]]},
 {id:'r7',title:'Finding the Right Hotel',subtitle:'旅行中的真实选择',level:'A2',topic:'travel',mins:8,
  body:`Sophie is planning a three-day trip. She has found two hotels. The first is in the city center, close to museums and restaurants, but it is quite expensive. The second is cheaper and quieter, although it takes twenty minutes to reach the center by train. Sophie checks the cancellation policies and reads recent guest reviews. She also contacts the second hotel to ask whether early check-in might be possible. After comparing the options, she chooses the quieter hotel. It fits her budget and gives her more time to rest. She learns that the best choice is not always the most expensive or most popular one. It is the one that meets her needs.`,
  summary:'根据预算、交通、取消规则和休息需求比较酒店，而不是只看价格。',qs:[['Why does Sophie choose the second hotel?',['It is the most famous','It meets her needs','It is next to the museum'],1],['What policy does she check?',['Cancellation','Dress code','Parking fines'],0]]},
 {id:'r8',title:'An Unexpected Guest Request',subtitle:'服务中的沟通能力',level:'A2',topic:'dining',mins:8,
  body:`During a busy dinner service, a guest tells Alex that her main course is too salty. Alex listens carefully instead of becoming defensive. He says, “I'm sorry the dish wasn't what you expected. Let me see what we can do.” He confirms the issue with the kitchen and offers a suitable alternative. The guest appreciates that he takes her concern seriously. Later, Alex explains the situation to the team so that they can improve. Good service is not about promising that nothing will ever go wrong. It is about responding clearly, respectfully, and quickly when something does.`,
  summary:'面对客诉不急于辩解，确认问题、提供替代方案、团队复盘。',qs:[['What does Alex do first?',['Argues with the guest','Listens carefully','Ignores the complaint'],1],['What is good service about?',['Never making mistakes','Responding well to problems','Speaking fast'],1]]},
 {id:'r9',title:'Giving Constructive Feedback',subtitle:'有建设性的反馈',level:'A2',topic:'work',mins:9,
  body:`People often avoid difficult conversations because they worry about hurting someone's feelings. However, clear feedback can be a form of respect. A manager might begin by describing a specific situation: “In yesterday's presentation, a few important figures were missing.” Then the manager explains the impact: “The client could not compare the options.” Finally, they discuss a practical next step: “Could we add a short summary table before the next meeting?” This approach focuses on observable work rather than personal criticism. The other person also has a chance to explain their perspective. Constructive feedback is a conversation, not a judgment.`,
  summary:'用具体情境、影响和下一步建议构成建设性反馈，避免人身评价。',qs:[['What should feedback focus on?',['Personal criticism','Observable work','Rumors'],1],['What is feedback described as?',['A judgment','A conversation','An order'],1]]},
 {id:'r10',title:'Small Talk That Leads Somewhere',subtitle:'从寒暄到真正交流',level:'A2',topic:'conversation',mins:8,
  body:`Small talk can feel awkward when you don't know what to say. One helpful method is to notice something you genuinely share with the other person. Perhaps you are both attending the same event or waiting for the same flight. Start with a simple observation, then ask an open question. If the other person answers briefly, you don't have to force a long conversation. If they seem interested, ask a follow-up question and share a little of your own experience. Listening is as important as asking. The goal is not to impress someone with difficult vocabulary. It is to create a comfortable moment of connection.`,
  summary:'从共同情境切入，使用开放式问题，倾听并自然追问。',qs:[['What is a good way to begin?',['Make an observation','Use difficult words','Ask ten questions'],0],['What is as important as asking?',['Listening','Running','Interrupting'],0]]},
 {id:'r11',title:'Why Consistency Beats Intensity',subtitle:'为什么长期坚持更有效',level:'B1',topic:'growth',mins:10,
  body:`A common mistake in language learning is to study for several hours one day and then do nothing for the rest of the week. Intense sessions can be useful, but consistency helps build the mental pathways needed for quick recall. A practical routine combines retrieval practice, listening, speaking, and periodic review. For example, you might learn eight expressions, use three of them in a conversation, and revisit difficult ones tomorrow. The value of a session depends less on how many pages you finish and more on what you can remember and use later. A sustainable routine also includes rest, variation, and the freedom to adjust when life becomes busy.`,
  summary:'把记忆提取、听说应用与间隔复习结合，比短暂突击更可持续。',qs:[['What helps quick recall?',['Consistency','Only reading silently','Never reviewing'],0],['How should you use new expressions?',['Only copy them','Use some in a conversation','Avoid speaking'],1]]},
 {id:'r12',title:'Handling a Difficult Conversation at Work',subtitle:'处理棘手的职场对话',level:'B1',topic:'work',mins:10,
  body:`A project is running behind schedule, and two colleagues disagree about the reason. Instead of deciding who is to blame, their manager asks each person to describe the facts and the impact on their work. She restates their concerns to confirm her understanding. Then she moves the conversation toward solutions: What can be completed this week? What additional support is needed? Which risks should the client know about? The discussion does not remove every disagreement, but it creates a shared plan and clear responsibilities. Effective communication often means slowing down enough to understand the problem before trying to solve it.`,
  summary:'面对项目延期，先对齐事实和影响，再明确支持、风险、责任人与计划。',qs:[['What does the manager ask for first?',['Blame','Facts and impact','More meetings'],1],['What is the outcome?',['A shared plan','No responsibilities','An argument'],0]]},
 {id:'r13',title:'What Makes a Recommendation Useful?',subtitle:'有价值的推荐',level:'B1',topic:'dining',mins:10,
  body:`A recommendation should help someone make a decision, not simply display the knowledge of the person giving it. In a restaurant, a thoughtful recommendation begins with a few genuine questions. Is the guest looking for something light or rich? Do they have a budget in mind? Are there ingredients they prefer to avoid? Once the server understands the situation, they can suggest two suitable options and explain the difference in plain language. The best explanation is specific, relevant, and short enough to be useful. Even guests who know very little about food or wine can make confident choices when they feel understood.`,
  summary:'推荐不是炫耀知识，而是理解预算与偏好，再做清晰、有针对性的比较。',qs:[['What should come first?',['Asking relevant questions','Listing all the wines','Using technical vocabulary'],0],['How many options does the text suggest?',['Two suitable options','Twenty options','No options'],0]]},
 {id:'r14',title:'Turning Practice Into Real Ability',subtitle:'如何把练习转化为能力',level:'B1',topic:'growth',mins:10,
  body:`Understanding an English phrase is not the same as being able to use it in a live conversation. Recognition is often easier than retrieval. To close the gap, learners need moments when they must produce language without looking at an answer. One approach is to read a short paragraph, close it, and explain the main idea aloud. Another is to rehearse a real situation, such as asking for clarification in a meeting. Feedback helps, but repeated use in different contexts is what makes expressions more flexible. Over time, familiar phrases become easier to access under pressure, and learners can focus more attention on the person they are speaking with.`,
  summary:'理解不等于能说；通过脱离提示的输出、情景迁移和反馈建立真正的语言能力。',qs:[['What is harder than recognition?',['Retrieval','Reading a title','Listening to music'],0],['What makes expressions flexible?',['Repeated use in varied contexts','Only memorizing lists','Never speaking'],0]]}
];
const SCENARIOS = [
 {id:'sc1',title:'第一次见面',sub:'Coffee Shop · A0',topic:'conversation',level:'A0',role:'Emma',emoji:'☕',turns:[
  ['Hi! I’m Emma. What’s your name?','说出你的名字',"Hi, I'm Alex. Nice to meet you!",['i am','i\'m','my name']],
  ['Nice to meet you! Where are you from?','告诉她你来自哪里',"I'm from Shanghai, China.",['from','live in']],
  ['Great! Are you learning English?','说你正在学英语',"Yes, I'm learning English every day.",['yes','learning','study']],
  ['That’s wonderful. See you again!','自然告别',"It was nice talking to you. See you!",['see you','nice','bye']]
 ]},
 {id:'sc2',title:'问路',sub:'City Street · A0',topic:'travel',level:'A0',role:'Local',emoji:'🗺️',turns:[
  ['Hi there! Can I help you?','询问最近的地铁站在哪里',"Yes, where is the nearest subway station?",['subway','metro','station']],
  ['Go straight and turn left at the corner.','请求对方重复一次',"Could you repeat that, please?",['repeat','again','slow']],
  ['Of course. Straight ahead, then left.','礼貌感谢',"Thank you so much for your help!",['thank','appreciate']],
  ['You’re welcome. Have a great day!','道别',"You too! Have a nice day.",['you too','bye','nice day']]
 ]},
 {id:'sc3',title:'餐厅点餐',sub:'Restaurant · A1',topic:'dining',level:'A1',role:'Server',emoji:'🥗',turns:[
  ['Good evening. Do you have a reservation?','说明你预订了两个人的座位',"Yes, I have a reservation for two.",['reservation','book','table']],
  ['Welcome! Would you like something to drink?','点一杯气泡水',"Could I have sparkling water, please?",['water','sparkling']],
  ['Of course. Are you ready to order?','点一份沙拉',"I'd like the salad, please.",['salad','order','have']],
  ['Certainly. Anything else?','说明就这些并致谢',"That's all, thank you.",['all','thank','nothing']]
 ]},
 {id:'sc4',title:'周末计划',sub:'Friends · A1',topic:'daily',level:'A1',role:'Jamie',emoji:'🌞',turns:[
  ['Hey! Are you free this weekend?','说周六有空',"Yes, I'm free on Saturday.",['saturday','free','yes']],
  ['Would you like to go for a walk?','表示赞成',"That sounds like a great idea!",['great','love','sure','yes']],
  ['Shall we meet around ten?','确认时间',"Ten o'clock works for me.",['ten','10','works']],
  ['Perfect. See you then!','告别',"See you on Saturday!",['see','bye','saturday']]
 ]},
 {id:'sc5',title:'酒店入住',sub:'Hotel · A1',topic:'travel',level:'A1',role:'Receptionist',emoji:'🏨',turns:[
  ['Welcome to our hotel. How can I help?','表明要办理入住',"Hi, I'd like to check in, please.",['check in','reservation']],
  ['Of course. May I have your name?','告诉对方姓名',"My name is Alex Chen.",['name','i am','i\'m']],
  ['Thank you. Would you like a quiet room?','表达房间偏好',"Yes, a quiet room would be great.",['quiet','yes','room']],
  ['Check-in is complete. Enjoy your stay!','感谢并结束',"Thank you very much!",['thank']]
 ]},
 {id:'sc6',title:'工作进度汇报',sub:'Team Meeting · A2',topic:'work',level:'A2',role:'Manager',emoji:'📋',turns:[
  ['Good morning! What did you accomplish yesterday?','汇报完成了一项任务',"I managed to finish the first draft.",['finished','completed','managed','draft']],
  ['Excellent. What is your priority today?','说明今天要完善细节',"My priority is to improve the details.",['priority','improve','work','focus']],
  ['Do you need support from anyone?','说你需要团队的反馈',"Yes, I'd appreciate some feedback from the team.",['feedback','team','help','support']],
  ['Sure. When can we review it?','约定明天',"Could we review it tomorrow?",['tomorrow','friday','next']]
 ]},
 {id:'sc7',title:'解决客人问题',sub:'Customer Service · A2',topic:'dining',level:'A2',role:'Guest',emoji:'🍽️',turns:[
  ['Excuse me, this dish is a little too salty.','先表达歉意',"I'm sorry the dish wasn't what you expected.",['sorry','apologize']],
  ['Could you suggest something else?','表示愿意推荐其他选择',"Of course. May I recommend another dish?",['recommend','suggest','another']],
  ['That would be helpful. Is there something lighter?','推荐清淡的菜',"Our grilled fish is a lighter option.",['fish','salad','lighter','light']],
  ['That sounds good. Thank you for helping.','自然回复',"My pleasure. I'll arrange that for you.",['pleasure','welcome','happy','arrange']]
 ]},
 {id:'sc8',title:'向同事澄清问题',sub:'Office · A2',topic:'work',level:'A2',role:'Colleague',emoji:'💻',turns:[
  ['We need to change the deadline for the project.','询问新截止日期',"Could you clarify the new deadline?",['deadline','when','date']],
  ['We are aiming for next Wednesday.','复述确认',"So the new deadline is next Wednesday, correct?",['wednesday','confirm','correct']],
  ['Yes. Do you think that’s realistic?','礼貌提出担忧',"I have one concern about the timeline.",['concern','tight','time','challeng']],
  ['Thanks for raising it. Let’s discuss the risks.','表达感谢',"Thanks. Let's go through the risks together.",['thank','risks','discuss','together']]
 ]},
 {id:'sc9',title:'机场航班变更',sub:'Airport · A2',topic:'travel',level:'A2',role:'Airline Agent',emoji:'✈️',turns:[
  ['Hello. How can I help you today?','说明航班延误',"My flight has been delayed.",['flight','delay']],
  ['I’m sorry to hear that. What would you like to know?','询问更早的航班',"Is there an earlier flight available?",['earlier','flight','available']],
  ['Let me check. There is one at 3 p.m.','询问是否要额外付费',"Would I need to pay an extra fee?",['fee','pay','cost','charge']],
  ['There is no extra charge for this change.','感谢帮助',"Great, thank you for checking.",['thank','great','appreciate']]
 ]},
 {id:'sc10',title:'表达不同意见',sub:'Discussion · B1',topic:'conversation',level:'B1',role:'Teammate',emoji:'💡',turns:[
  ['I think we should launch the product immediately.','先表示理解',"I see your point, and I understand the urgency.",['see','understand','point']],
  ['So you agree with launching now?','礼貌提出不同意见',"Not entirely. I think we need more testing.",['but','not','test','concern']],
  ['What kind of testing do you suggest?','说出一个具体方案',"We could test it with a small group first.",['test','group','pilot','customer']],
  ['That sounds reasonable. Shall we make a plan?','主动承担行动',"Yes, I'll draft the plan today.",['plan','draft','today','yes']]
 ]},
 {id:'sc11',title:'介绍一款葡萄酒',sub:'Hospitality · B1',topic:'dining',level:'B1',role:'Guest',emoji:'🍷',turns:[
  ['I’d like a white wine that isn’t too heavy.','确认客人的风格偏好',"Would you prefer something crisp and refreshing?",['crisp','fresh','prefer','light']],
  ['Yes, something fresh would be lovely.','推荐一种清爽的风格',"I'd suggest a dry, refreshing white wine.",['dry','white','refresh','recommend']],
  ['What would it taste like?','用非术语描述风味',"It has bright citrus notes and a clean finish.",['citrus','fresh','fruit','clean']],
  ['Sounds great! Shall we try it?','回应并提供服务',"Absolutely. I'd be happy to bring you a glass.",['happy','glass','certainly','yes']]
 ]},
 {id:'sc12',title:'讨论工作优先级',sub:'Leadership · B1',topic:'work',level:'B1',role:'Teammate',emoji:'🎯',turns:[
  ['We have too many tasks this week.','说明需要调整优先级',"Let's review our priorities first.",['priority','priorit','review','focus']],
  ['Which task should we tackle first?','说先做影响最大的任务',"I think we should start with the highest-impact task.",['impact','important','urgent','first']],
  ['Who will take responsibility for it?','主动承担任务',"I can take ownership of that task.",['ownership','responsib','handle','i can']],
  ['Great. How should we track progress?','建议每天简短同步',"Let's share a quick update every day.",['update','daily','every day','check']]
 ]},
];
const PHONICS = [
 ['θ','think','th','舌尖轻触上下齿间，送气但不振动声带'],
 ['ð','this','th','口型类似 /θ/，但声带振动'],
 ['æ','cat','a','张口较大，舌位靠前，别读成“啊”'],
 ['ʌ','cup','u','短促自然的中元音，不要拖长'],
 ['ɪ','sit','i','比 /iː/ 更短更放松'],
 ['iː','see','ee','长元音，嘴角略向两边展开'],
 ['v','very','v','上齿轻触下唇并振动声带'],
 ['w','water','w','双唇收圆再迅速打开'],
 ['r','right','r','舌尖不碰上颚，卷舌略往后'],
 ['l','light','l','舌尖抵上齿龈'],
 ['ʃ','she','sh','双唇略圆，气流持续摩擦'],
 ['tʃ','chair','ch','先短暂堵气，再快速释放']
].map(([ipa,word,letters,tip],i)=>({id:'p'+i,ipa,word,letters,tip}));
