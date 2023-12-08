CREATE DATABASE x_phim_db;
USE x_phim_db;

-- Dumping data for table `x_phim_db`
CREATE TABLE comment_user_film (
    id INT AUTO_INCREMENT PRIMARY KEY,
    film_id INT,
    user_id INT NOT NULL,
    episode INT NOT NULL,
    content VARCHAR(720) NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO `comment_user_film` (film_id, user_id, episode, content, time) VALUES (4, 6, 1, 'binh luan ne', '2023-11-25 09:26:40');

-- Dumping data for table `episode_film`
CREATE TABLE episode_film (
    id INT AUTO_INCREMENT PRIMARY KEY,
    episode VARCHAR(12) NOT NULL,
    film_id INT NOT NULL,
    video_link VARCHAR(255) NOT NULL UNIQUE,
    time_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source_link VARCHAR(32) NOT NULL
);

INSERT INTO `episode_film` (episode, film_id, video_link, time_upload, source_link)
 VALUES 
 ('2',7,'https://1080.opstream4.com/share/424351fe60d01ce7de0fb0e00956b222','2023-11-25 02:44:18','phimgiff'),
 ('1',4,'https://aa.opstream6.com/share/5b3b3e573becfa5d7fac4916f8bc0fed','2023-11-07 13:29:37','ophim'),
 ('2',3,'https://hd1080.opstream2.com/share/1d656ca6611216968c7c89914031e043','2023-11-07 13:26:50','ophim'),
 ('1',3,'https://hd1080.opstream2.com/share/a69b9ecf4cf7f3f9b68464232048c737','2023-11-07 13:26:50','ophim'),
 ('3',3,'https://hd1080.opstream2.com/share/b62db8fadd1b177cc5ed1d239d6e2f1e','2023-11-07 13:26:50','ophim'),
 ('4',7,'https://hdbo.opstream5.com/share/11ce4c3ce3498f8b1c49e8adad14eee5','2023-11-25 02:35:07','ophim'),
 ('1',1,'https://hdbo.opstream5.com/share/2910d1ad8c41edfda403263d973b0ae1','2023-11-07 13:10:30','ophim'),
 ('2',7,'https://hdbo.opstream5.com/share/331456f017370d9aa0750cc86bb8ceb3','2023-11-25 02:09:07','ophim'),
 ('1',2,'https://hdbo.opstream5.com/share/54f3fa6166fe3b6fbc596defb3ebd78b','2023-11-07 13:23:46','ophim'),
 ('1',7,'https://hdbo.opstream5.com/share/782978019e9c64c7b19188539d7339e2','2023-11-25 01:14:46','ophim'),
 ('2',2,'https://hdbo.opstream5.com/share/8cf4ff2dc2db6902d222b0c7dcc98d04','2023-11-07 13:23:46','ophim'),
 ('2',1,'https://hdbo.opstream5.com/share/a11bda17f8522e39a9bcf3cad3794341','2023-11-07 13:10:30','ophim'),
 ('0',2,'https://hdbo.opstream5.com/share/b22f0cfa73e7cba241ffc3bd30e99208','2023-11-07 13:23:46','ophim'),
 ('3',7,'https://hdbo.opstream5.com/share/e11f12430782bff9553b65f2be26d907','2023-11-25 02:24:40','ophim'),
 ('3',1,'https://hdbo.opstream5.com/share/fff38493f5a1643ee8ef247750540ee2','2023-11-07 13:10:30','ophim'),
 ('1',1,'https://short.ink/lZlkpWYzG','2023-11-08 13:54:37','phimgiff');


-- Dumping data for table `evaluates`
create table evaluates (
	id char(8),
	point int unique
);
INSERT INTO `evaluates` VALUES ('1',1),('2',2),('3',3),('4',4),('5',5),('6',6),('7',7),('8',8),('9',9),('10',10);


-- Dumping data for table `evaluate_user_film`
create table evaluate_user_film (
	film_id int not null,
	user_id int not null,
	evaluate_id char(8) not null
);
INSERT INTO `evaluate_user_film` VALUES (1,6,'10');


-- Dumping data for table `films`
create table films (
	name varchar(255) not null,
	description varchar(2000),
	movie_duration varchar(72),
	number_episodes int,
	year int,
	image varchar(256) not null,
	part varchar(32),
	id int auto_increment primary key
);
INSERT INTO `films` VALUES ('Toàn Chức Pháp Sư (Phần 1)','Toàn Chức Pháp Sư\": kể về quá trình nhân vật chính Mạc Phàm học trong trường trung học ma pháp và muốn trở thành một pháp sư xuất sắc. Thế giới tôn sùng khoa học nay đã trở thành tôn sùng ma pháp, nhưng trong thế giới đó vẫn có những giáo viên coi trọng thành tích, vẫn có những ánh mắt kì thị của các bạn học, vẫn có một người cha lăn lộn dưới đáy xã hội, vẫn có một cô em gái tật nguyền xinh đẹp thơ ngây không cùng huyết thống…',NULL,12,2019,'https://img.ophim9.cc/uploads/movies/toan-chuc-phap-su-phan-1-thumb.jpg',NULL,1),('THẤT NGHIỆP CHUYỂN SINH: SANG THẾ GIỚI KHÁC TÔI SẼ NGHIÊM TÚC - MÙA 2','Tôi sẽ nghiêm túc ở cái dị giới này!\"\nCó một người đàn ông 34 tuổi vẫn là giai tân, thất nghiệp, một NEET chính hiệu. Vào đúng ngày tang lễ của cha mẹ mình, anh bị họ hàng đuổi ra khỏi nhà, rồi bị xe tải tông chết mà qua đời. Khi tỉnh lại, anh nhận ra mình đã đầu thai vào một đứa bé ở một thế giới xa lạ với kiếm và ma pháp!\nTừng sống như một kẻ cặn bã của xã hội, nay anh quyết tâm làm lại cuộc đời dưới dưới cái tên Rudeus!\nĐón đợi anh là một cô nàng ma thuật sĩ bé nhỏ, một cô bé xinh đẹp mang đôi tai Elf, một tiểu thư Tsundere hung dữ và biết bao nhân vật khác...\nHành trình cùng những cuộc chiến khốc liệt bắt đầu.\n\"Câu chuyện kỳ ảo về hành trình làm lại cuộc đời bắt đầu!',NULL,12,2023,'https://img.ophim9.cc/uploads/movies/that-nghiep-chuyen-sinh-sang-the-gioi-khac-toi-se-nghiem-tuc-mua-2-thumb.jpg','Phần 2',2),('THÁM TỬ LỪNG DANH CONAN','* NỘI DUNG DÀNH CHO KHÁN GIẢ TUỔI THANH THIẾU NIÊN\nThám tử lừng danh Conan xoay quanh câu chuyện về chàng thám tử Kudo Shinichi, trong một lần đang điều tra đã bị Tổ chức Áo Đen ép uống thuốc độc, khiến cho cơ thể bị teo nhỏ. Sau đó, Shinichi chuyển đến sống ở nhà của người bạn thuở niên thiếu Ran Mori cùng người bố Kogoro Mori. Tại đây, cậu dùng văn phòng thám tử của ông Kogoro để truy tìm tung tích của tổ chức Áo Đen đồng thời giúp ông phá nhiều vụ án dưới một thân phận mới là Conan Edogawa.',NULL,NULL,2020,'https://img.ophim9.cc/uploads/movies/tham-tu-lung-danh-conan-thumb.jpg','Phần chính',3),('THÁM TỬ LỪNG DANH CONAN 21: BẢN TÌNH CA MÀU ĐỎ THẪM','* NỘI DUNG DÀNH CHO KHÁN GIẢ TUỔI THANH THIẾU NIÊN\nĐoạn trailer The story of Ai Haibara: Black iron mystery train cũng cho chúng ta biết được vị trí xảy ra vụ án chính trong tập phim này sẽ là trên một chuyến tàu tốc hành. Kẻ thủ ác thậm chí còn cho nổ tung cả chuyến tàu để đạt được mục đích của mình, quả thật là quá sức manh động và hung hãn. Đối phó với một đối thủ như vậy liệu có quá sức của Haibara Ai và Conan hay không?','129 phút',1,2020,'https://img.ophim9.cc/uploads/movies/tham-tu-lung-danh-conan-21-ban-tinh-ca-mau-do-tham-thumb.jpg','Movie 21',4),('XÓM VẮNG','“XÓM VẮNG” nói về chuyện tình đầy éo le và trắc trở của một cô giáo dạy đàn tên là Phương Tư Doanh và một người đàn ông nho nhã hiền hòa nhưng bị mù đôi mắt trong một trận hỏa hoạn kinh hoàng.Tư Doanh là một cô giáo dạy đàn cho một đứa bé tên là Đình Đình, Đình Đình là con gái của Bách Phối Văn, cũng chính là người đàn ông mù kia.Bộ phim chuyển thể từ một tác phẩm của nhà văn Quỳnh Dao và thực sự thành công khi lấy không biết bào nhiêu nước mắt của khán giả xem truyền hình.',NULL,40,1987,'https://img.ophim9.cc/uploads/movies/xom-vang-thumb.jpg','Phần chính',7);


-- Dumping data for table `followed_film`
create table followed_film (	
	id int auto_increment primary key,
	film_id int not null,
	user_id int not null
);
INSERT INTO followed_film (film_id, user_id) VALUES (1, 6), (4, 6);


-- Dumping data for table `genre_film`
create table genre_film (
	id int auto_increment primary key,
	film_id int not null,
	genre_id varchar(36) not null
);
INSERT INTO genre_film(film_id, genre_id) VALUES (7,'Action'),(7,'Âm nhạc'),(7,'CN Animation'),(7,'Dị giới');

-- Dumping data for table `genres`
create table genres (	
	genre varchar(36) primary key
);
INSERT INTO `genres` VALUES ('Action'),('Âm nhạc'),('Anime'),('Bí ẩn'),('Bi kịch'),('Chuyển sinh'),('CN Animation'),('CNA Hài hước'),('CNA Ngôn tình'),('Comedy'),('Đam mỹ'),('Demon'),('Dị giới'),('Đời thường'),('Drama'),('Echi'),('Fantsy'),('Giả tưởng'),('Hài hước'),('Hành độnh'),('Harem'),('Học đường'),('Huyền ảo'),('Khoa huyễn'),('Kiếm hiệp'),('Kinh dị'),('Lịch sử'),('Live Action'),('Ma cà rồng'),('Manhua'),('Mechar'),('Mystery'),('Phiêu lưu'),('Psychological'),('Quân đội'),('Samurai'),('Seinen'),('Shoujo'),('Shoujo AI'),('Shounen'),('Shounen AI'),('Siêu năng lực'),('Siêu nhiên'),('Thám tử'),('Thể thao'),('Thriller'),('Tiên hiệp'),('Tình cảm'),('Tokusatsu'),('Trò chơi'),('Trùng sinh'),('Viễn tưởng'),('Võ thuật'),('Xuyên không');


-- Dumping data for table `history_film`
create table history_film (	
	film_id int,
	episode int,
	user_id int,
	time_view timestamp default current_timestamp
);
INSERT INTO `history_film` VALUES (3,1,4,'2023-11-26 09:02:58'),(7,1,5,'2023-11-28 11:31:38'),(2,0,6,'2023-11-25 08:34:03'),(1,1,6,'2023-11-25 08:36:09'),(3,1,6,'2023-11-26 09:06:31'),(4,1,6,'2023-11-26 09:13:26'),(7,1,6,'2023-11-25 08:33:04'),(3,2,6,'2023-11-25 08:33:19');

-- Dumping data for table `notifycation`
create table notifycation (	
	id int primary key,
	title varchar(72),
	image varchar(256),
	content varchar(256),
	is_read tinyint(1) default 0,
	user_id int,
	time timestamp default current_timestamp
);
INSERT INTO `notifycation` VALUES (1,'Tin nhắn từ hệ thống','https://i.imgur.com/JzGNfi6.png','Bạn được nhận 2exp',0,1,'2023-11-28 03:55:53'),(2,'Tin nhắn từ hệ thống','https://i.imgur.com/JzGNfi6.png','Bạn được nhận 2exp',1,4,'2023-11-28 03:56:12'),(3,'Tin nhắn từ hệ thống','https://i.imgur.com/JzGNfi6.png','Bạn được nhận 4exp',1,4,'2023-11-28 10:04:18'),(4,'Tin nhắn từ hệ thống','https://i.imgur.com/JzGNfi6.png','Bạn được nhận 6exp',1,4,'2023-11-28 10:37:41'),(5,'Tin nhắn từ hệ thống','https://i.imgur.com/JzGNfi6.png','Bạn được nhận 6exp',1,4,'2023-11-28 10:41:01'),(6,'Tin nhắn từ hệ thống','https://i.imgur.com/JzGNfi6.png','Bạn được nhận 6exp',1,4,'2023-11-28 10:43:19');

-- Dumping data for table `related_film`
create table related_film (	
	id int auto_increment primary key,
	film_id int,
	related_id int
);
INSERT INTO related_film(film_id, related_id) VALUES (4,'3'),(3,'4');

-- Dumping data for table `rep_comment`
create table rep_comment (
	id int auto_increment primary key,
	user_id int,
	time timestamp default current_timestamp,
	content varchar(720),
	id_comment_film int
);


-- Dumping data for table `users`
create table users (	
	id int primary key,
	name varchar(255),
	email varchar(120),
	password varchar(30),
	avatar varchar(255),
	level int default 1,
	account varchar(30),
	nickname varchar(72),
	experience int,
	registration_date timestamp default current_timestamp,
	coint int,
	maxim varchar(72),
	id_google varchar(256),
	admin tinyint(1) default 0
);

INSERT INTO `users` VALUES (1,'Nguyễn Anh Hùng','nguyenanhhung0123456@gmail.com','Bothienha@123','http://127.0.0.1:4000/public/avatar/uploaded_file-1699703686748-750775923OIP.jpg',1,'hung1234','hungdeptrai',0,'2023-09-21 11:00:28',0,NULL,NULL,0),(2,'Võ Đức Luân','voducluan@gmail.com','Voducluan@1234',NULL,10,'luan1234','luandeptrai',0,'2023-09-21 11:00:28',0,NULL,NULL,0),(3,NULL,'truonggiahoang0123456@gmail.com','Hung@1234',NULL,100,'hung12345',NULL,0,'2023-11-03 15:22:15',0,NULL,NULL,0),(4,'Hoàng Trương','truonggiahoang0123456@gmail.com',NULL,'http://127.0.0.1:4000/public/avatar/uploaded_file-1699703606871-252827580tong-hop-nhung-hinh-anh-meme-dep-08.jpg',1000,NULL,NULL,0,'2023-11-04 09:24:13',0,NULL,'111020925096785841626',0),(5,'Hùng Nguyễn','nguyenanhhung0123456@gmail.com',NULL,'https://lh3.googleusercontent.com/a/ACg8ocLIZyxaRa-cWFhy0sus0Y-j9wVFIgAqxuo3AU4lxWFZEw=s96-c',10000,NULL,NULL,0,'2023-11-04 09:26:44',0,NULL,'104909315046107243521',0),(6,NULL,'nguyenanhhung0123456@gmail.com','Dangkymkam@12','http://127.0.0.1:4000/public/avatar/uploaded_file-1700282354709-393623127tong-hop-nhung-hinh-anh-meme-dep-08.jpg',100000,'thoimaemx9',NULL,0,'2023-11-15 11:06:22',0,NULL,NULL,1);


-- Dumping data for table `views_film`
create table views_film (	
	id int auto_increment primary key,
	time timestamp default current_timestamp,
	film_id int
);

INSERT INTO `views_film` VALUES (144,'2023-11-25 08:32:41',3),(145,'2023-11-25 08:33:04',7),(146,'2023-11-25 08:33:19',3),(147,'2023-11-25 08:33:34',1),(148,'2023-11-25 08:33:46',4),(149,'2023-11-25 08:34:03',2),(150,'2023-11-25 08:35:56',1),(151,'2023-11-25 08:36:09',1),(152,'2023-11-26 09:02:58',3),(153,'2023-11-26 09:05:53',3),(154,'2023-11-26 09:06:31',3),(155,'2023-11-26 09:13:26',4),(156,'2023-11-28 11:31:38',7);
