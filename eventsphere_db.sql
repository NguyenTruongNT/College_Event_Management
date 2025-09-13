-- Tạo database
CREATE DATABASE IF NOT EXISTS eventsphere
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE eventsphere;

SET FOREIGN_KEY_CHECKS = 0;

-- Bảng roles
CREATE TABLE roles (
  RoleId INT AUTO_INCREMENT PRIMARY KEY,
  RoleName VARCHAR(50) NOT NULL UNIQUE
);

-- Bảng users
CREATE TABLE users (
  UserId INT AUTO_INCREMENT PRIMARY KEY,
  Email VARCHAR(100) NOT NULL UNIQUE,
  PasswordHash VARCHAR(255) NOT NULL,
  RoleId INT,
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  TwoFactorCode VARCHAR(6),
  TwoFactorExpiry DATETIME,
  KEY idx_Users_Email (Email),
  FOREIGN KEY (RoleId) REFERENCES roles(RoleId)
);

-- Bảng departments
CREATE TABLE departments (
  DepartmentId INT AUTO_INCREMENT PRIMARY KEY,
  DepartmentName VARCHAR(100) NOT NULL UNIQUE
);

-- Bảng userprofiles
CREATE TABLE userprofiles (
  UserId INT PRIMARY KEY,
  FullName VARCHAR(100) NOT NULL,
  MobileNumber VARCHAR(15),
  DepartmentId INT,
  EnrollmentNo VARCHAR(50),
  FOREIGN KEY (UserId) REFERENCES users(UserId) ON DELETE CASCADE,
  FOREIGN KEY (DepartmentId) REFERENCES departments(DepartmentId)
);

-- Bảng eventcategories
CREATE TABLE eventcategories (
  CategoryId INT AUTO_INCREMENT PRIMARY KEY,
  CategoryName VARCHAR(100) NOT NULL UNIQUE
);

-- Bảng venues
CREATE TABLE venues (
  VenueId INT AUTO_INCREMENT PRIMARY KEY,
  VenueName VARCHAR(150) NOT NULL,
  Location LONGTEXT,
  Capacity INT DEFAULT 0
);

-- Bảng events
CREATE TABLE events (
  EventId INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(150) NOT NULL,
  Description LONGTEXT,
  StartTime DATETIME NOT NULL,
  EndTime DATETIME NOT NULL,
  MaxParticipants INT,
  Status INT NOT NULL,
  OrganizerId INT,
  ApproverId INT,
  CategoryId INT,
  VenueId INT,
  PosterUrl VARCHAR(255),
  KEY idx_Events_Status (Status),
  FOREIGN KEY (OrganizerId) REFERENCES users(UserId),
  FOREIGN KEY (ApproverId) REFERENCES users(UserId),
  FOREIGN KEY (CategoryId) REFERENCES eventcategories(CategoryId),
  FOREIGN KEY (VenueId) REFERENCES venues(VenueId)
);

-- Bảng attendances
CREATE TABLE attendances (
  AttendanceId INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT NOT NULL,
  EventId INT NOT NULL,
  CheckInTime DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UserId) REFERENCES users(UserId),
  FOREIGN KEY (EventId) REFERENCES events(EventId)
);

-- Bảng registrations
CREATE TABLE registrations (
  RegistrationId INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT NOT NULL,
  EventId INT NOT NULL,
  Status INT NOT NULL,
  RegisteredAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UserId) REFERENCES users(UserId),
  FOREIGN KEY (EventId) REFERENCES events(EventId)
);

-- Bảng waitlistentries
CREATE TABLE waitlistentries (
  WaitlistId INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT NOT NULL,
  EventId INT NOT NULL,
  WaitlistedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UserId) REFERENCES users(UserId),
  FOREIGN KEY (EventId) REFERENCES events(EventId)
);

-- Bảng certificates
CREATE TABLE certificates (
  CertificateId INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT NOT NULL,
  EventId INT NOT NULL,
  CertificateUrl VARCHAR(255) NOT NULL,
  IsPaid TINYINT(1) DEFAULT 0,
  IssuedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UserId) REFERENCES users(UserId),
  FOREIGN KEY (EventId) REFERENCES events(EventId)
);

-- Bảng feedbacks
CREATE TABLE feedbacks (
  FeedbackId INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT NOT NULL,
  EventId INT NOT NULL,
  Rating INT CHECK (Rating >= 1 AND Rating <= 5),
  Comment LONGTEXT,
  SubmittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  IsApproved INT NOT NULL DEFAULT 0,
  FOREIGN KEY (UserId) REFERENCES users(UserId),
  FOREIGN KEY (EventId) REFERENCES events(EventId)
);

-- Bảng media
CREATE TABLE media (
  MediaId INT AUTO_INCREMENT PRIMARY KEY,
  EventId INT NOT NULL,
  UploaderId INT,
  FileUrl VARCHAR(255) NOT NULL,
  FileType VARCHAR(20) NOT NULL,
  Caption VARCHAR(255),
  UploadedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (EventId) REFERENCES events(EventId),
  FOREIGN KEY (UploaderId) REFERENCES users(UserId)
);

-- Bảng notifications
CREATE TABLE notifications (
  NotificationId INT AUTO_INCREMENT PRIMARY KEY,
  UserId INT NOT NULL,
  Message LONGTEXT NOT NULL,
  IsRead TINYINT(1) DEFAULT 0,
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  Title VARCHAR(255) NOT NULL DEFAULT 'Notification',
  FOREIGN KEY (UserId) REFERENCES users(UserId)
);

SET FOREIGN_KEY_CHECKS = 1;
