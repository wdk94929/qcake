/**创建数据库mk**/
set names utf8;
drop database if exists mk;
create database mk charset=utf8;
use mk;
/*******1.创建用户信息表*******/
create table mk_user(
    uid int primary key auto_increment,
    uname varchar(16),
    upwd varchar(32),
    email varchar(64),
    phone varchar(16),
    avatar varchar(128),
    user_name varchar(20),
    gender int               #性别 0-女  1-男
);
/*******2.创建首页商品表*******/
create table mk_index_product(
    pid int primary key auto_increment,
    fre_title varchar(64),
    che_title varchar(64),
    nature_img varchar(128),   #语音/金牌
    pic varchar(128),
    price decimal(7.2),
    href varchar(128),         #跳转页路径
    seq_recommeded tinyint,
    seq_new_arrival tinyint,
    seq_top_sale tinyint
);
/*******3.创建首页轮播照片表*******/
create table mk_index_carousel(
    cid int primary key auto_increment,
    img varchar(128),
    title varchar(64),
    href varchar(128)
);
/*******4.创建商品家族表*******/
create table mk_cake_family(
    fid int primary key auto_increment,
    fname varchar(32)
);
/*******5.创建蛋糕商品表*******/
create table mk_cake(
    cid int primary key auto_increment,
    family_id int,
    fre_title varchar(128),
    che_title varchar(128),      #主标题
    price decimal(7,2),      #单价
    category varchar(32),    #所属分类 cake xiaoshi
    spec varchar(64),        #尺寸/大小
    mname varchar(32),       #商品名称
    weight int,           #商品重量
    sweetness_index tinyint,  #商品甜度
    details varchar(1024),    #商品介绍
    shelf_time bigint,        #上架时间
    sold_count int,           #销量
    is_onsale boolean,         #是否在销售 0 否 1 是
    pic varchar(128),         #照片路径
    nature_img varchar(128),   #语音/金牌
    href varchar(128)         #跳转页路径

);
/*******6.创建商品照片表*******/
create table mk_cake_pic(
    pid int primary key auto_increment,
    cake_id int,               #蛋糕商品id
    sm varchar(128),          #小图片路径
    md varchar(128),
    lg varchar(128)
);
/*******7.创建收货地址表*******/
create table mk_receiver_address(
    aid int primary key auto_increment,
    user_id int,              #用户编号
    receiver varchar(16),     #收件人
    province varchar(16),
    city varchar(16),
    county varchar(16),       #县
    address varchar(128),     #收货地址
    cellphone varchar(16),    #手机号
    fixedphone varchar(16),   #固定电话
    postcode varchar(6),      #邮编
    tag varchar(16),          #标签
    is_default boolean         #是否为当前用户的默认收货地址
);
/*********8.创建购物车商品列表*******/
create table mk_shopping_car(
    sid int primary key auto_increment,
    user_id int,
    cake_id int,
    count int,
    is_delete int   # 0表示不删除
	
);
/*******9.创建商品订单列表*******/
create table mk_order(
    oid int primary key auto_increment,
    user_id int,
    adress_id int,
    status varchar(16),   #订单状态，已付款 等待付款
    order_time bigint,
    pay_time bigint,
    deliver_time bigint,
    received_time bigint
);
/*******10.创建商品订单详细表*******/
create table mk_order_details(
    did int primary key auto_increment,
    order_id int,
    product_id int,
    count int
);


/*******插入数据********/
/**1.添加用户信息**/
insert into mk_user values
(null,'dongdong','123456','dong.@tedu.cn','15764445555','','张东',1),
(null,'daxu','654321','daxu.@tedu.cn','17666448899','','赵大旭',1),
(null,'wenhua.li','123456','wenhua.@tedu.cn','13044668898','','李文华',1),
(null,'taotao','123456','tao.@tedu.cn','13544668898','','程涛',1);
/*2.添加首页商品表*/
insert into mk_index_product values
(null,'Liliane ~ Gâteau glacée','恋恋·草莓冰淇淋蛋糕','images/nature_1','images/1_011.jpg','298','',1,1,1),
(null,'Luke et dondon','卢克和咚咚冰淇淋蛋糕','','images/1_008.jpg','298','',1,1,1),
(null,'Choco ~ Mariage','浓巧·迷情冰淇淋蛋糕','images/nature_1','images/1_024.jpg','298','',1,1,1),
(null,'lapin détendu','安逸兔','','images/1_016.jpg','318','',1,1,1);
/*3.添加轮播图片*/
insert into mk_index_carousel values
(null,'images/2_01.jpg','底部轮播商品1',''),
(null,'images/2_02.jpg','底部轮播商品2',''),
(null,'images/2_03.jpg','底部轮播商品3',''),
(null,'images/2_04.jpg','底部轮播商品4',''),
(null,'images/2_05.jpg','底部轮播商品5',''),
(null,'images/2_06.jpg','底部轮播商品6','');
/*4.插入蛋糕家族数据*/
insert into mk_cake_family values
(null,'拿破仑'),
(null,'鲜奶'),
(null,'慕斯'),
(null,'芝士'),
(null,'巧克力'),
(null,'咖啡'),
(null,'坚果'),
(null,'水果'),
(null,'冰激凌');
/*5.创建蛋糕商品表*/
insert into mk_cake values
(null,9,'Liliane ~ Gâteau glacée','恋恋·草莓冰淇淋蛋糕','298','cake','适合4-7人食用+SIZE:17.5cm*4.6cm+需提前5小时预定','Liliane ~ Gâteau glacée 恋恋·草莓冰淇淋蛋糕',2,3,'Une petite cuillère vous suffira d entrer dans une image d été. Les petites perles vous transmet des secrets par le goût savoureux.+一匙轻动，进入仲夏夜的梦境，小小的珍珠向你诉说夏天的秘密。夏夜的甜蜜由此开启。',null,25,0,'images/1_011.jpg','images/nature_1.png','4.product_details.html'),
(null,9,'Luke et dondon','卢克和咚咚冰淇淋蛋糕','298','cake','适合4-7人食用+SIZE:27cm*17cm*6cm+需提前5小时预定','Luke et dondon 卢克和咚咚冰淇淋蛋糕',1.5,1,'Dans une cuillère, s’épanouit une saveur à la crème glace vanille et une saveur de glace au fromage. De glace délicate, lisse impétueux. Comme l Antarctique rencontrent l Arctique, vous vous met dans les contes de fées.+一匙之间，绽放芝士冰淇淋与香草冰淇淋的双重美味，冰爽细腻，抚平浮躁。宛若南极遇见北极，置身冰雪童话。',null,35,0,'images/1_008.jpg','',''),
(null,9,'Choco ~ Mariage','浓巧·迷情冰淇淋蛋糕','298','cake','适合4-7人食用+SIZE:17cm*4.3cm+需提前5小时预定','Choco ~ Mariage 浓巧·迷情冰淇淋蛋糕',2,3,'Grâce aux maîtres chocolatiers Belge, les sauveurs du chocolat belge ont fait le tour du monde. Un mariage parfait entre le fraîcheur de la glace et du gâteau au chocolat.+承袭比利时大师工艺，将源自比利时的纯正可可豆缔造风靡世界的巧克力风味； 当冰爽的冰淇淋与浓郁的巧克力蛋糕完美邂逅，冰火交融，香滑甜蜜。',null,null,0,'images/1_024.jpg','images/nature_1.png',''),
(null,4,'lapin détendu','安逸兔','318','cake','适合4-7人食用+SIZE:21cm*5.5cm+需提前5小时预定','lapin détendu 安逸兔',2.5,2,'En ce moment, Le fromage et la crème massent vos papilles, Laissez ta langue se dominer , retour à ton enfance+这一刻，奶油芝士的细腻与淡奶油的绵软嵌入味蕾，让舌尖主宰，重返童年时光',null,45,0,'images/1_016.jpg','',''),
(null,1,'Napoléon aux myrtilles','蓝莓轻乳拿破仑','298','cake','适合4-7人食用+SIZE:23cm*14cm*5cm+需提前5小时预定','Napoléon aux myrtilles 蓝莓轻乳拿破仑',2,1,'Myrtilles fraiches, bio, feuilletage au goût de beurre frais, marmelade de myrtilles, crème chantilly, et tout celà dans le plaisir du palais .+精选野生蓝莓的清爽可口/芝士的香浓/优质奶油的醇厚 起酥皮的香脆可口/内层轻乳芝士的松软 层层美味/回味无穷',null,56,0,'images/1_017.jpg','images/nature_3.png',''),
(null,1,'Napoléon 1893','拿破仑1893','298','cake','适合4-7人食用+SIZE:23cm*14cm*5cm+需提前5小时预定','Napoléon 1893 拿破仑1893',2,2,'Depuis sa création en 1893 du restaurant Maxim, ce gâteau, comme son panonceau, n a jamais changé.+自1893年马克西姆餐厅成立以来，没换过的除了招牌，还有这款蛋糕。',null,null,0,'images/1_032.jpg','',''),
(null,1,'Napoléon vanille','经典香草拿破仑','298','cake','适合4-7人食用+SIZE:23cm*14cm*5cm+需提前5小时预定','Napoléon vanille 经典香草拿破仑',2,1,'Avec un style typiquement français, ce gâteau unique vous laissera des souvenirs Napoléoniens.+纯正的法国风味/香浓绵甜的吉士酱 加上香脆起酥皮 入口即化/层层美味',null,null,0,'images/1_033.jpg','images/nature_3.png',''),
(null,1,'La Forêt noir','黑森林拿破仑','298','cake','适合4-7人食用+SIZE:23cm*14cm*5cm+需提前5小时预定','La Forêt noir 黑森林拿破仑',2,2,'La rencontre des fameuses pâtisseries : la forêt noir et les mille-feuilles, est un choque au niveaux goût en tant que texture, l amertume douce de chocolat avec la croquante feuilletage, crémeux et fruité, parfumé au kirsch, une pure sensation de voyage à l esprit au de là du pays du nord.+久负盛名的黑森林蛋糕遇上绝对经典的拿破仑酥皮，微苦与松脆，浓香丰满。融合樱桃的清爽、奶油的甜，带思绪飘往北地黑森林。',null,null,0,'images/1_034.jpg','',''),
(null,1,'Carré Blanc','简','318','cake','适合4-7人食用+SIZE:23cm*14cm*5.5cm+需提前5小时预定','Carré Blanc 简',2,1,'La célèbre pâte feuilletée, les myrtilles bien sélectionnées, la génoise au fromage fondante,Voilà notre Carré Blanc pour les horoscopes de la vierge. C est la perfection !+法国国宝级拿破仑酥皮、精心挑选的野生蓝莓、口感绝佳的轻乳芝士，献给极致挑剔的处女座。外表极致简洁，内心醇厚酥脆。必须美味，必须完美！',null,null,0,'images/1_035.jpg','',''),
(null,2,'Jardin d Alice','爱丽丝花境','298','cake','适合4-7人食用+SIZE:15cm*8.2cm+需提前5小时预定','Jardin d Alice 爱丽丝花境',1.5,1,'Framboise aigre, Lychee sucrée, s’éclatait étincelles de l’amour sur la langue, Comme l’humeur de la jeune fille qui se détours innombrable, qui est rafraîchissant .+树莓的酸，荔枝的甜，在舌尖上碰撞出恋爱的火花，犹如少女心境的千回百转，沁人心脾。',null,null,0,'images/1_019.jpg','images/nature_2.png',''),
(null,4,'Fromage Velouté','香溢新芝','298','cake','适合4-7人食用+SIZE:23cm*14cm*4.5cm+需提前5小时预定','Fromage Velouté 香溢新芝',2,1,'La décoration n’est plus indispensable. Une émulsion de la crème cheese, mixé d’une couche de la crème fouettée. Une saveur harmonieuse et pénétrante.+传承享受纯粹，修饰不再重要 只融在口的芝香，让舌尖主宰你的私享 蓬松夹着鲜香淡雅，因齿间的温度而融化肆溢 奶香轻盈，用层层的绵柔瞬间勾勒永恒的味觉记忆',null,null,0,'images/1_019.jpg','',''),
(null,4,'Nino','尼诺','298','cake','适合4-7人食用+SIZE:23cm*14cm*4.5cm+需提前5小时预定','Nino 尼诺','标准款',1,'A ce moment,laissez votre langue dominent votre joie.un parfum délicat de la crème cheese se cache sous les couches moelleux, qui refuse se fondre sauf dans la bouche+.这一刻，让舌尖主宰你的私享。蓬松夹着鲜香淡雅，只融在口的浓浓芝香，填满心的另一半。',null,null,0,'images/1_007.jpg','images/nature_2.png',''),
(null,4,'Velour rouge','蔓越莓红丝绒','298','cake','适合4-7人食用+SIZE:23cm*7cm+需提前5小时预定','Velour rouge 蔓越莓红丝绒',2,1,'Dans la couleur de la paix et la confusion, la canneberge de haute qualité honore le parfum aristrocratique de l histoire.+MCAKE/完美的复苏红丝绒蛋糕的传统和历史/ 并选用新鲜蔓越莓点缀其上/ 让贵族般的色香/再度氤氲美妙的午后',null,null,0,'images/1_045.jpg','images/nature_2.png',''),
(null,4,'Ricotta','瑞可塔厚爱','318','cake','适合4-7人食用+SIZE:23cm*14cm*5cm+需提前5小时预定','Ricotta 瑞可塔厚爱',2,1,'Même c’est un gâteau au fromage, il est différent que le gâteau au fromage velouté. Une combinaison parfaite du fromage grillé et fromage congelé. Seulement quand nous connaissons le ratio, le saveur plus profond du fromage peut être se réveiller.+同样是芝士蛋糕，却与「香溢新芝」大相径庭，烤芝士与冻芝士的完美结合，只有掌握精确配比，才能唤醒暗藏在芝士内部更深层次的味道。',null,null,0,'images/1_026.jpg','',''),
(null,8,'Fraise-Chantilly','鲜莓印雪','298','cake','适合4-7人食用+SIZE:19cm*7cm+需提前5小时预定','Fraise-Chantilly 鲜莓印雪',2,1,'Soleil après les chutes de neige, prenant une profonde inspiration, se sentir la douceur de la crème. Les rouges、mûres fraises，comme les elfes, tombant sur la terre.+雪过天晴后的第一口呼吸，甜蜜清新得不落俗套，鲜红的草莓，如俏皮的精灵降落凡间。',null,26,0,'images/1_042.jpg','',''),
(null,8,'bonbon','棒棒糖','318','cake','适合4-7人食用+SIZE:18cm*4.5cm+需提前5小时预定','bonbon 棒棒糖',2,1,'Un paradis aux enfants, des bonbons avec des fraises seches sont les meilleurs câdeaux pour les enfants, une mousse légère rosée, une couche de gelée à la fraise.+童话中的糖果仙境在现实中上演，随着白巧克力在口中的融化渐渐清晰；当舌尖品尝到脱水冻干草莓，童真年代悄然回归',null,null,0,'images/1_028.jpg','',''),
(null,2,'Mont Blanc','朗姆醇栗','318','cake','适合4-7人食用+SIZE:17.5cm*7.0cm+需提前5小时预定','Mont Blanc 朗姆醇栗',2,2,'La crème de marron fondante, accompagnée de la crème chantilly vanillée, parfumée délicatement au rhum, un goût aussi profond que celui dans la vitrine de pâtisserie à Paris.+栗茸特有的绵密，配搭鲜奶油的柔滑细腻，而更妙的莫过于丝丝萦绕的黑朗姆酒微香，带出的浓醇馥郁，是专属法兰西的摩登一刻。',null,null,0,'images/1_044.jpg','',''),
(null,8,'Pink Rosette','Pink•罗赛特','318','cake','适合4-7人食用+SIZE:18cm*4cm+需提前5小时预定','Pink Rosette Pink•罗赛特',2,2,'Une crème légère au chocolat blanc parfumée à la rose, litchis frais coupés en cubes, une fine gelée de framboise. Le Pink Rosette vous offrirait une expérience+细腻软甜的玫瑰白巧克力慕斯邂逅酸爽的树莓啫喱于珍馐荔枝 色与味的双重盛宴',null,null,0,'images/1_021.jpg','',''),
(null,5,'Sablé parfait','沙布蕾芭菲','298','cake','适合4-7人食用+SIZE:23cm*14cm*5cm+需提前5小时预定','Sablé parfait 沙布蕾芭菲',2,1,'UUne recette tradionnelle française, avec une mousse à la vanille de Madagascar et un coulis au chocolat qui fond directement dans la bouche, le Parfait à la vanille vous donnerait le fraicheur en plein été.+法式传统沙布蕾饼，搭配马达加斯加香草芭菲和熔岩巧克力，入口即化，尽享夏季沁脾清凉。',null,null,0,'images/1_039.jpg','',''),
(null,5,'Le MOJITO','Mojito 柠•漾','298','cake','适合4-7人食用+SIZE:18cm*5cm+需提前5小时预定','Le MOJITO Mojito 柠•漾',2,1,'Une mousse au citron vert légèrement aromatisée au rhum blanc, une gélée verte de menthe, le Mojito vous présente une harmonie entre l’acidité et la fraîcheur.Mojito+柠•漾，柔滑慕斯内蕴Q弹酒冻，绝妙配比带来口感的平衡，不太浓烈也不过于寡淡，青柠独特的酸甜带出白朗姆酒的微醺之意。',null,null,0,'images/1_043.jpg','',''),
(null,6,'Genoise café','卡法香缇','298','cake','适合4-7人食用+SIZE:23cm*14cm*5.5cm+需提前5小时预定','Genoise café 卡法香缇',2,1,'Traditionel et unique, lamertume du café et de la crème vous conduisent dans un rêve de romantisme et damour.+传承独特技艺的奶油咖啡香缇蛋糕/融入更多浪漫味道/ 等待你用心揭开',null,null,0,'images/1_020.jpg','',''),
(null,8,'Tarte au durian','榴莲雪塔','318','cake','适合4-7人食用+SIZE:20cm*8cm+需提前5小时预定','Tarte au durian 榴莲雪塔',2,1,'S’il exist un goût, qui peut vous faire bouger, Il doit être le roi des fruits "Durian". Mélanger de la crème fraiche et plus que 45% de chair de durian Monthong Thailandais, une fois vous l’avez côuté , vous comprendrez notre sincérité.+若有一种味道，能让你闻香而欲动，必是果中之王“榴莲“，淡奶油与占比45%以上的泰国金枕榴莲肉厮磨出的醇厚香甜，一旦亲口尝过，便会懂我们的诚意。',null,12,0,'images/1_025.jpg','',''),
(null,4,'Gâteau de crêpes','法香奶油可丽','298','cake','适合4-7人食用+SIZE:23cm*14cm*6cm+需提前5小时预定','Gâteau de crêpes 法香奶油可丽',2,1,'Une genoise légère, des crêpes fondantes, un goût subtile de crème de fromage, et une domination d’amandes torrifiées.+奶油绵甜柔软、香郁醇滑/轻乳芝士蛋糕松软可口/ 弹性十足的可丽饼/细腻浓郁的芝士酱/以及松脆的巴旦木仁片/ 口感层次极为丰富',null,null,0,'images/1_023.jpg','',''),
(null,7,'Moka praline noisette','榛果摩卡布拉吉','318','cake','适合4-7人食用+SIZE:21cm*5cm+需提前5小时预定','Moka praline noisette 榛果摩卡布拉吉',2,2,'Grâce à l’artisanat du Moka, en général, ce délicieux gâteau aux saveurs café vous laisse une légère amertume en bouche et vous rappelle les goûts de+用马克西姆极为香醇的布拉吉工艺/ 来盛情承载这一美好事物/更加入口感绵厚的榛子',null,null,0,'images/1_037.jpg','',''),
(null,5,'Soirée Bailay’s','百利派对','298','cake','适合4-7人食用+SIZE:23cm*14cm*5cm+需提前5小时预定','Soirée Bailay’s 百利派对',2,1,'Un moment merveilleux entre les amis, les amoureux et les soirées Mélange la crème et Bailay’s, rajouté un cout fine du chocolat blanc du Bruxelle Partagé une dégustation conviviale et fantastique.+来一场百利私享派对 奶油和威士忌的美妙融合，再加一点比利时白巧克力 感受着丝般顺滑的口感，分享与闺蜜专属的时间',null,null,0,'images/1_001.jpg','',''),
(null,8,'Mangue chantilly','芒果•Mangue','298','cake','适合4-7人食用 SIZE:23cm*14cm*4.5cm+需提前5小时预定','Mangue chantilly 芒果•Mangue',2,1,'La meilleure qualitée de mangue que l‘ on puisse trouver L ‘additon de mangue et de fruit de la passion pour une saveur parfaite Un parfum qui ne pourra que exalter vos papilles.+用心甄选热带优质芒果/ 芒果及百香果的完美组合/ 香气迷人，绽放清甜芳华',null,65,0,'images/1_013.jpg','',''),
(null,8,'Le Soleil','阳光心芒','298','cake','适合4-7人食用+SIZE:23cm*14cm*5cm+需提前5小时预定','Le Soleil 阳光心芒',2,1,'Un après-midi sous le soleil, une tasse de thé, un gâteau de mousse à la mangue. Deux couches de biscuits génoise nature, deux couches de mousse à la mangue, une fine couche de gelée mangue.+阳光下的心情，世界会很美 呼吸着芒果清香醉人的果芳 入口清甜的法国荔枝酒会让天际也染上了色彩 只一口，阳光早已开启心情空间',null,null,0,'images/1_041.jpg','',''),
(null,3,'Le Thé','摩登茶道','298','cake','适合4-7人食用+SIZE:23cm*14cm*5cm+需提前5小时预定','Le Thé 摩登茶道',2,1,'Une promenade à la campagne dans les bambous. Doux couches de biscuits moelleux au chocolat, deux couches de mousse au matcha du Japon, ce gâteau au thé vous donne un saveur extraodinaire qui représente la philosophie orientale.+在巴黎的街头回到自然的茶意翠语， 时尚与原生态微妙平衡，正如比利时白巧克力与顶级抹茶间的味觉语言 冲突，彼此的分明；融合，彼此的丰满。停下，聆听。',null,null,0,'images/1_022.jpg','',''),
(null,4,'Mousse de thé vert','蒸青抹茶','298','cake','适合4-7人食用+SIZE:24cm*15cm*4.5cm+需提前5小时预定','Mousse de thé vert 蒸青抹茶',2,1,'Sirop de rose, biscuits cuillères, thé vert, fermez les yeux et envolez-vous comme une feuille de thé au vent vers Paris.+用自然的抹茶清香/搭配口感上乘的提拉米苏/ 合成美妙的回甘滋味/ 降落到巴黎的城郊/完成一次浪漫的田园幻想。',null,null,0,'images/1_002.jpg','',''),
(null,5,'Choco Cointreau','君度可可','298','cake','适合4-7人食用+SIZE:20cm*4.0cm+需提前5小时预定','Choco Cointreau 君度可可',2,1,'Une mousse au chocolat noir, un goût sucré et amer du 100% chocolat, avec un parfum de Cointreau.+甜与苦从来不是永恒的对立，因为巧克力，更因为君度力娇 浓烈而温和，清凉却温暖，苦涩带甘甜的味觉冲击 滋味的美妙融合，丰富而立体 君度可可，只为呈现跨越时光的经典味道。',null,null,0,'images/1_015.jpg','',''),
(null,4,'Tiramisu','提拉米苏','298','cake','适合4-7人食用+SIZE:24cm*15cm*4.5cm+需提前5小时预定','Tiramisu 提拉米苏',2,1,'UUne révolution de café Le croissment de café italien et du liqueur de café mexican Un saveur séduisant et hors-fontière.+一切因咖啡而变得不同 当意式咖啡的香醇，遇见墨西哥咖啡酒的浓烈 诱惑在入口，鸣响在心律 升华沉醉的不单单是味蕾。',null,null,0,'images/1_031.jpg','',''),
(null,5,'Lotus Noir','巧克力黑兰','298','cake','适合4-7人食用+SIZE:23cm*14cm*5cm+需提前5小时预定','Lotus Noir 巧克力黑兰',2,1,'Cognac, un spititueux provenant de raisin. Fusioné aux chocolat noir du Bruxelle. Un gout inoubliable et enrichissant.+这是法国白兰地的一次重生 以另一种脱胎换骨的形式，加上比利时黑巧克力的爽滑 借着时间的指针，在舌尖，在心间，画出微醺的轨迹。',null,null,0,'images/1_040.jpg','',''),
(null,5,'Diable chocolat','魔鬼巧克力','298','cake','适合4-7人食用+SIZE:23cm*14cm*4.5cm+需提前5小时预定','Diable chocolat 魔鬼巧克力',2,2,'Le Diable artiste vous amène vers l’enfer du chocolat noir, vous exite les sens par son croquant et son croutillant de biscuit.+MCAKE/将艺术气质渗入蛋糕制作环节/ 每一款作品表层/都被赋予千变万化的笔触/ 当你收到的时候/绝不需要担心“撞衫”的危险。',null,null,0,'images/1_029.jpg','',''),
(null,5,'Gâteau des anges','天使巧克力','298','cake','适合4-7人食用+SIZE:23cm*14cm*5cm 需提前5小时预定','Gâteau des anges 天使巧克力',2,1,'D’un goût de plus de 100 ans, un gâteau frabriqué d‘une façon minutieusevous rappelle l‘inoccupation et le romantisme parisiens.+ MCAKE/用巴黎的慵懒与浪漫/与马克西姆传承的百年味道/ 精心制作出让天使都会爱上的美丽',null,null,0,'images/1_038.jpg','',''),
(null,2,'Cici','Cici','268','cake','适合4-7人食用+SIZE:7/盒+需提前5小时预定','Cici Cici',1,2,'Sept Cupcakes, dans les quels vous découvriez quatre goûts différents. La génoise moelleuse avec le coulis dedans, plusieurs couches de joies goûteuses. Au jardin de printemps, partager vos sentiments originaux avec les amis, la famille, les amoureux et vous-même.+M七枚cupcake，四种绝妙口味。新鲜烘焙蛋糕胚，包裹着的夹心，一层口感一层梦境，无法摆脱的美味。把最初的心情，在微风轻拂的花园里，与恋人，亲人，闺蜜当然还有自己，分享。',null,null,0,'images/1_018.jpg','images/nature_2.png',''),
(null,3,'Joséphine','约瑟芬玫瑰','398','cake','++需提前5小时预定','Joséphine 约瑟芬玫瑰',2,2,'Des rosettes pour les amoureux, une histoire d’amour, une romance unique de toute la vie.+见证无数情侣最甜蜜的一刻，从舌尖蔓延到心间的感动，今生今世唯一爱恋',null,128,0,'images/1_027.jpg','images/nature_4.png',''),
(null,null,'cheese cake','半熟芝士','48','refreshments','适合4-7人食用+SIZE:6.8cm*5cm*3.5cm*5个+需提前24小时预定','cheese cake 半熟芝士',1,1,'une forme de fromage français plus légère, un goût doux et moelleux du lait,dès le moment dans la bouche, comme se baigner dans les nuages.+赋予法国芝士更加轻盈的形态，绵软的口感搭配醇正的奶香，入口的一刹那，仿佛徜徉在云间。',null,2,0,'images/1_009.jpg','','4.product_details.html'),
(null,null,'M’chocolat','V.S.O.P生巧','116','refreshments','适合2-3人食用+SIZE:15.5cm*11.5cm*2cm*2盒+需提前5小时预定','M’chocolat V.S.O.P生巧',240,2,'Un chocolat qui fond doucement dans la bouche, savourez le goût unique du cognac bien sélectionné par notre chef.+V.S.O.P白兰地被比利时巧克力温柔驯服。那一口柔软，正缓慢融化，从舌尖到舌根深处的灼热，如爱恋般蔓延。',null,null,0,'images/1_005.jpg','images/nature_2.png',''),
(null,null,'1/4 chocolat au lait','1/4牛奶生巧','58','refreshments','适合1-2人食用+SIZE:15.5cm*11.5cm*2cm+需提前5小时预定','1/4 chocolat au lait 1/4牛奶生巧',120,2,'la fraîcheur du lait diminue et adouci l’amertume du chocolat, souple et délicat, un sentiment de se tomber dans le nuage.+牛奶的醇香调和了比利时黑巧的微苦，丝滑细腻的口感，犹如坠落柔软的云间。',null,null,0,'images/1_004.jpg','',''),
(null,null,'Chocolats mixtes','生巧组合','116','refreshments','适合2-3人食用+SIZE:15.5cm*11.5cm*2cm*2盒+需提前5小时预定','Chocolats mixtes 生巧组合',240,2,'L’élégance de Rémy Martin V.S.O.P et la douceur de chocolat au lait à l’origine de Belgique, dégustez les deux saveurs en même temps dans une boîte magique ?+人头马v.s.o.p生巧的微醺与1/4牛奶生巧的甜润奶香，哪一种柔软，你能舍弃？',null,null,0,'images/1_010.jpg','',''),
(null,null,'Cookies aux craneberry','塔尼小红莓','78','refreshments','SIZE:12.5cm*12.5cm*9cm+需提前5小时预定','Cookies aux craneberry 塔尼小红莓',200,2,'Arôme naturel, délicieux fusion de canneberges crémeuse aigre-douce, attarder longtemps.+包裹天然香气，美味奶香融合蔓越莓的酸甜，口感生活，品质提升，萦绕时间经久不散',null,null,0,'images/1_048.jpg','',''),
(null,null,'Biscuit aux cheeses','芝士小生','78','refreshments','SIZE:12.5cm*12.5cm*9cm+需提前5小时预定','Biscuit aux cheeses 芝士小生',200,2,'Délicieux, partagé avec vous. Le secret de parfum de biscuit croquant viens du lait sous l’oeuf jaune doré. Chaque bouche peut ressentir la douceur de l’œuf et du beurre doux.+美味，与你共享。香浓酥脆的曲奇秘密源于金黄色的蛋液下史无前例的奶香。每一口都能感受到鸡蛋的清甜和黄油的醇滑。',null,null,0,'images/1_049.jpg','',''),
(null,null,'cookies au beurre（original）','云顶小花（原味）','78','refreshments','SIZE:12.5cm*12.5cm*9cm+需提前5小时预定','cookies au beurre（original） 云顶小花（原味）',200,2,'En utilisant le fleur de sel Breton et du beurre sélectionné，avec la technologie traditionnelle de biscuits français， aucun additif alimentaire, qu’il se fondue dans la bouche.+来自布列塔尼的“盐之花”和优质黄油的组合。恰好的甜度，酥脆不腻，层层香浓，更有法国传统工艺的精湛，赋予曲奇新的生命力。',null,null,0,'images/1_050.jpg','',''),
(null,null,'cookies au beurre（Motcha）','云顶小花（抹茶味）','78','refreshments','SIZE:12.5cm*12.5cm*9cm+需提前5小时预定','cookies au beurre（Motcha） 云顶小花（抹茶味）',200,2,'Un histoire d’amour entre Motcha japonais et beurre français, une expérience nouvelle. Le secrete de biscuit artisanale vous transfera un température différent.+日本宇治抹茶搭配法国黄油的跨国之恋，带来全新的味蕾体验。手工曲奇的秘密在于指尖的温度传递不一样的惊喜，成就更多的舌尖奇迹。',null,null,0,'images/1_051.jpg','',''),
(null,null,'cookies au beurre（Chocolat）','云顶小花（巧克力味）','78','refreshments','SIZE:12.5cm*12.5cm*9cm+需提前5小时预定','cookies au beurre（Chocolat） 云顶小花（巧克力味）',200,2,'Chocolat belge au beurre français, Fragrance entre les lèvres et les dents, n’oublira jamais.+比利时巧克力的细腻甜美搭配法式黄油的浪漫浓郁，唇齿之间，久久留香，总是难以忘怀。',null,null,0,'images/1_052.jpg','','');
/*6.创建放大镜所需大中小图*/
insert into mk_cake_pic values
(null,1,'images/pro_img/1_small_1.jpg','images/pro_img/1_md_1.jpg','images/pro_img/1_bg_1.jpg'),
(null,1,'images/pro_img/1_small_2.jpg','images/pro_img/1_md_2.jpg','images/pro_img/1_bg_2.jpg'),
(null,1,'images/pro_img/1_small_3.jpg','images/pro_img/1_md_3.jpg','images/pro_img/1_bg_3.jpg'),
(null,2,'images/pro_img/2_small_1.jpg','images/pro_img/2_md_1.jpg','images/pro_img/2_bg_1.jpg'),
(null,2,'images/pro_img/2_small_2.jpg','images/pro_img/2_md_2.jpg','images/pro_img/2_bg_2.jpg'),
(null,2,'images/pro_img/2_small_3.jpg','images/pro_img/2_md_3.jpg','images/pro_img/2_bg_3.jpg'),
(null,3,'images/pro_img/3_small_1.jpg','images/pro_img/3_md_1.jpg','images/pro_img/3_bg_1.jpg'),
(null,3,'images/pro_img/3_small_2.jpg','images/pro_img/3_md_2.jpg','images/pro_img/3_bg_2.jpg'),
(null,3,'images/pro_img/3_small_3.jpg','images/pro_img/3_md_3.jpg','images/pro_img/3_bg_3.jpg'),
(null,4,'images/pro_img/4_small_1.jpg','images/pro_img/4_md_1.jpg','images/pro_img/4_bg_1.jpg'),
(null,4,'images/pro_img/4_small_2.jpg','images/pro_img/4_md_2.jpg','images/pro_img/4_bg_2.jpg'),
(null,4,'images/pro_img/4_small_3.jpg','images/pro_img/4_md_3.jpg','images/pro_img/4_bg_3.jpg'),
(null,5,'images/pro_img/5_small_1.jpg','images/pro_img/5_md_1.jpg','images/pro_img/5_bg_1.jpg'),
(null,5,'images/pro_img/5_small_2.jpg','images/pro_img/5_md_2.jpg','images/pro_img/5_bg_2.jpg'),
(null,5,'images/pro_img/5_small_3.jpg','images/pro_img/5_md_3.jpg','images/pro_img/5_bg_3.jpg'),
(null,6,'images/pro_img/6_small_1.jpg','images/pro_img/6_md_1.jpg','images/pro_img/6_bg_1.jpg'),
(null,6,'images/pro_img/6_small_2.jpg','images/pro_img/6_md_2.jpg','images/pro_img/6_bg_2.jpg'),
(null,6,'images/pro_img/6_small_3.jpg','images/pro_img/6_md_3.jpg','images/pro_img/6_bg_3.jpg'),
(null,7,'images/pro_img/7_small_1.jpg','images/pro_img/7_md_1.jpg','images/pro_img/7_bg_1.jpg'),
(null,7,'images/pro_img/7_small_2.jpg','images/pro_img/7_md_2.jpg','images/pro_img/7_bg_2.jpg'),
(null,7,'images/pro_img/7_small_3.jpg','images/pro_img/7_md_3.jpg','images/pro_img/7_bg_3.jpg'),
(null,8,'images/pro_img/8_small_1.jpg','images/pro_img/8_md_1.jpg','images/pro_img/8_bg_1.jpg'),
(null,8,'images/pro_img/8_small_2.jpg','images/pro_img/8_md_2.jpg','images/pro_img/8_bg_2.jpg'),
(null,8,'images/pro_img/8_small_3.jpg','images/pro_img/8_md_3.jpg','images/pro_img/8_bg_3.jpg'),
(null,9,'images/pro_img/9_small_1.jpg','images/pro_img/9_md_1.jpg','images/pro_img/9_bg_1.jpg'),
(null,9,'images/pro_img/9_small_2.jpg','images/pro_img/9_md_2.jpg','images/pro_img/9_bg_2.jpg'),
(null,9,'images/pro_img/9_small_3.jpg','images/pro_img/9_md_3.jpg','images/pro_img/9_bg_3.jpg'),
(null,10,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,10,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,10,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
/*后26个暂时用10的图片*/
(null,11,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,11,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,11,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,12,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,12,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,12,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,13,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,13,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,13,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,14,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,14,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,14,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,15,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,15,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,15,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,16,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,16,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,16,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,17,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,17,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,17,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,18,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,18,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,18,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,19,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,19,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,19,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,20,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,20,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,20,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,21,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,21,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,21,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,22,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,22,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,22,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,23,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,23,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,23,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,24,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,24,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,24,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,25,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,25,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,25,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,26,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,26,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,26,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,27,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,27,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,27,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,28,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,28,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,28,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,29,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,29,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,29,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,30,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,30,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,30,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,31,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,31,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,31,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,32,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,32,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,32,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,33,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,33,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,33,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,34,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,34,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,34,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,35,'images/pro_img/10_small_1.jpg','images/pro_img/10_md_1.jpg','images/pro_img/10_bg_1.jpg'),
(null,35,'images/pro_img/10_small_2.jpg','images/pro_img/10_md_2.jpg','images/pro_img/10_bg_2.jpg'),
(null,35,'images/pro_img/10_small_3.jpg','images/pro_img/10_md_3.jpg','images/pro_img/10_bg_3.jpg'),
(null,36,'images/pro_img/1_small_1.jpg','images/pro_img/1_md_1.jpg','images/pro_img/1_bg_1.jpg'),
(null,36,'images/pro_img/1_small_2.jpg','images/pro_img/1_md_2.jpg','images/pro_img/1_bg_2.jpg'),
(null,36,'images/pro_img/1_small_3.jpg','images/pro_img/1_md_3.jpg','images/pro_img/1_bg_3.jpg'),

(null,37,'images/pro_img/1_small_1.jpg','images/pro_img/1_md_1.jpg','images/pro_img/1_bg_1.jpg'),
(null,37,'images/pro_img/1_small_2.jpg','images/pro_img/1_md_2.jpg','images/pro_img/1_bg_2.jpg'),
(null,37,'images/pro_img/1_small_3.jpg','images/pro_img/1_md_3.jpg','images/pro_img/1_bg_3.jpg'),
(null,38,'images/pro_img/1_small_1.jpg','images/pro_img/1_md_1.jpg','images/pro_img/1_bg_1.jpg'),
(null,38,'images/pro_img/1_small_2.jpg','images/pro_img/1_md_2.jpg','images/pro_img/1_bg_2.jpg'),
(null,38,'images/pro_img/1_small_3.jpg','images/pro_img/1_md_3.jpg','images/pro_img/1_bg_3.jpg'),
(null,39,'images/pro_img/1_small_1.jpg','images/pro_img/1_md_1.jpg','images/pro_img/1_bg_1.jpg'),
(null,39,'images/pro_img/1_small_2.jpg','images/pro_img/1_md_2.jpg','images/pro_img/1_bg_2.jpg'),
(null,39,'images/pro_img/1_small_3.jpg','images/pro_img/1_md_3.jpg','images/pro_img/1_bg_3.jpg'),
(null,40,'images/pro_img/1_small_1.jpg','images/pro_img/1_md_1.jpg','images/pro_img/1_bg_1.jpg'),
(null,40,'images/pro_img/1_small_2.jpg','images/pro_img/1_md_2.jpg','images/pro_img/1_bg_2.jpg'),
(null,40,'images/pro_img/1_small_3.jpg','images/pro_img/1_md_3.jpg','images/pro_img/1_bg_3.jpg'),
(null,41,'images/pro_img/1_small_1.jpg','images/pro_img/1_md_1.jpg','images/pro_img/1_bg_1.jpg'),
(null,41,'images/pro_img/1_small_2.jpg','images/pro_img/1_md_2.jpg','images/pro_img/1_bg_2.jpg'),
(null,41,'images/pro_img/1_small_3.jpg','images/pro_img/1_md_3.jpg','images/pro_img/1_bg_3.jpg'),
(null,42,'images/pro_img/1_small_1.jpg','images/pro_img/1_md_1.jpg','images/pro_img/1_bg_1.jpg'),
(null,42,'images/pro_img/1_small_2.jpg','images/pro_img/1_md_2.jpg','images/pro_img/1_bg_2.jpg'),
(null,42,'images/pro_img/1_small_3.jpg','images/pro_img/1_md_3.jpg','images/pro_img/1_bg_3.jpg'),
(null,43,'images/pro_img/1_small_1.jpg','images/pro_img/1_md_1.jpg','images/pro_img/1_bg_1.jpg'),
(null,43,'images/pro_img/1_small_2.jpg','images/pro_img/1_md_2.jpg','images/pro_img/1_bg_2.jpg'),
(null,43,'images/pro_img/1_small_3.jpg','images/pro_img/1_md_3.jpg','images/pro_img/1_bg_3.jpg'),
(null,44,'images/pro_img/1_small_1.jpg','images/pro_img/1_md_1.jpg','images/pro_img/1_bg_1.jpg'),
(null,44,'images/pro_img/1_small_2.jpg','images/pro_img/1_md_2.jpg','images/pro_img/1_bg_2.jpg'),
(null,44,'images/pro_img/1_small_3.jpg','images/pro_img/1_md_3.jpg','images/pro_img/1_bg_3.jpg'),
(null,45,'images/pro_img/1_small_1.jpg','images/pro_img/1_md_1.jpg','images/pro_img/1_bg_1.jpg'),
(null,45,'images/pro_img/1_small_2.jpg','images/pro_img/1_md_2.jpg','images/pro_img/1_bg_2.jpg'),
(null,45,'images/pro_img/1_small_3.jpg','images/pro_img/1_md_3.jpg','images/pro_img/1_bg_3.jpg');

