USE eventsphere;

-- Dữ liệu cho roles
INSERT INTO roles (RoleId, RoleName) VALUES
(1,'Admin'),(2,'Organizer'),(3,'Student');

-- Dữ liệu cho users
INSERT INTO users (UserId, Email, PasswordHash, RoleId, CreatedAt, TwoFactorCode, TwoFactorExpiry) VALUES
(1,'admin@test.com','$2a$12$hnJUJaelQQdNXzdMnMInIOUZMi/cv.mK8BCw/uCqWeRYsMUP1HM2a',1,'2025-09-12 17:25:58','325359','2025-09-14 03:17:07'),
(2,'organizer@test.com','$2a$12$tO214XlnUjrKYEEUC3r9reTrfftRjsfApP5RZBpjzPomxJ9EoaJPK',2,'2025-09-12 17:25:58',NULL,NULL),
(3,'student@test.com','$2b$10$rbmJOshfencq1PQrUJvP4ubJGLaYGwI2e9kB51jFt29AbEKuSLw6i',3,'2025-09-12 17:25:58',NULL,NULL),
(5,'test@test.com','$2b$10$ga9LTbiFwKdR2Qa20wXJRuSlzuYCp9sttKpBzFz0nktEh/VhaNN5i',3,'2025-09-13 17:50:16',NULL,NULL),
(6,'nguyenhai1906205@gmail.com','$2b$10$koiAGUBk/hAqPz68.IpTA.ZqEzwYucxNx2ZuhOh4ym/V6fQjpWXLS',1,'2025-09-13 18:58:47','653052','2025-09-14 03:21:22');

-- Dữ liệu cho departments
INSERT INTO departments (DepartmentId, DepartmentName) VALUES
(2,'Chemical and Lips'),
(3,'Economy and Management'),
(1,'Information Technology');

-- Dữ liệu cho userprofiles
INSERT INTO userprofiles (UserId, FullName, MobileNumber, DepartmentId, EnrollmentNo) VALUES
(1,'Admin User',NULL,1,NULL),
(2,'Organizer User',NULL,1,NULL),
(3,'Hello World!',NULL,1,'SV001'),
(5,'Test demo',NULL,1,'SV005'),
(6,'Nguyễn Thanh Hai',NULL,1,'2351260650');

-- Dữ liệu cho eventcategories
INSERT INTO eventcategories (CategoryId, CategoryName) VALUES
(2,'Cultural Event'),
(1,'Workshop');

-- Dữ liệu cho venues
INSERT INTO venues (VenueId, VenueName, Location, Capacity) VALUES
(1,'Room A1','Dormitory',100),
(2,'Hall B','Main Campus',200);

-- Dữ liệu cho events
INSERT INTO events (EventId, Title, Description, StartTime, EndTime, MaxParticipants, Status, OrganizerId, ApproverId, CategoryId, VenueId, PosterUrl) VALUES
(4,'Technology Workshop 2025','A workshop on new technology','2025-09-16 09:00:00','2025-09-14 11:00:00',100,1,1,1,1,1,NULL);

-- Dữ liệu cho attendances
INSERT INTO attendances (AttendanceId, UserId, EventId, CheckInTime) VALUES
(1,3,4,'2025-09-13 20:52:57');

-- Dữ liệu cho registrations
INSERT INTO registrations (RegistrationId, UserId, EventId, Status, RegisteredAt) VALUES
(1,3,4,0,'2025-09-13 20:50:26');

-- Dữ liệu cho certificates
INSERT INTO certificates (CertificateId, UserId, EventId, CertificateUrl, IsPaid, IssuedAt) VALUES
(1,3,4,'/public/certificates/cert-3-4-1757774579410.png',0,'2025-09-13 21:42:59');

-- Dữ liệu cho feedbacks
INSERT INTO feedbacks (FeedbackId, UserId, EventId, Rating, Comment, SubmittedAt, IsApproved) VALUES
(1,3,4,4,'Great event!','2025-09-13 20:59:07',1);

-- Dữ liệu cho media
INSERT INTO media (MediaId, EventId, UploaderId, FileUrl, FileType, Caption, UploadedOn) VALUES
(1,4,1,'/public/media/1757775502459-AA1Mt1RW.jpg','image','Event photo','2025-09-13 21:58:22');

-- Dữ liệu cho notifications
INSERT INTO notifications (NotificationId, UserId, Message, IsRead, CreatedAt, Title) VALUES
(1,6,'Event starting soon!',1,'2025-09-13 19:08:37','Event Reminder');
