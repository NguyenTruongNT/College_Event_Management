-- Tạo Database (nếu chưa có)
CREATE DATABASE EventSphere CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE EventSphere;

-- Cụm 1: Quản lý Người dùng & Tổ chức
-- =============================================
-- Bảng Roles: Lưu vai trò (Admin=1, Organizer=3, Student=2)
CREATE TABLE Roles (
    RoleId INT PRIMARY KEY AUTO_INCREMENT,
    RoleName VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bảng Departments: Khoa/phòng ban
CREATE TABLE Departments (
    DepartmentId INT PRIMARY KEY AUTO_INCREMENT,
    DepartmentName VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bảng Users: Tài khoản chính (thêm TwoFactorSecret cho 2FA)
CREATE TABLE Users (
    UserId INT PRIMARY KEY AUTO_INCREMENT,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    RoleId INT,
    TwoFactorSecret VARCHAR(255) NULL,  -- Cho 2FA (Admin/Organizer)
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (RoleId) REFERENCES Roles(RoleId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- INDEX cho query nhanh (Email cho login)
CREATE INDEX idx_Users_Email ON Users(Email);

-- Bảng UserProfiles: Profile (EnrollmentNo NULL cho non-student)
CREATE TABLE UserProfiles (
    UserId INT PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    MobileNumber VARCHAR(15),
    DepartmentId INT,
    EnrollmentNo VARCHAR(50) NULL,  -- NULL cho Admin/Organizer; UNIQUE chỉ check backend cho Student
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (DepartmentId) REFERENCES Departments(DepartmentId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Cụm 2: Quản lý Sự kiện
-- =============================================
CREATE TABLE EventCategories (
    CategoryId INT PRIMARY KEY AUTO_INCREMENT,
    CategoryName VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Venues (
    VenueId INT PRIMARY KEY AUTO_INCREMENT,
    VenueName VARCHAR(150) NOT NULL,
    Location LONGTEXT,
    Capacity INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Events (
    EventId INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(150) NOT NULL,
    Description LONGTEXT,
    StartTime DATETIME NOT NULL,
    EndTime DATETIME NOT NULL,
    MaxParticipants INT,
    Status INT NOT NULL, -- 0: Pending, 1: Approved, 2: Cancelled
    OrganizerId INT,
    ApproverId INT,
    CategoryId INT,
    VenueId INT,
    PosterUrl VARCHAR(255) NULL,  -- Ảnh bìa sự kiện
    FOREIGN KEY (OrganizerId) REFERENCES Users(UserId),
    FOREIGN KEY (ApproverId) REFERENCES Users(UserId),
    FOREIGN KEY (CategoryId) REFERENCES EventCategories(CategoryId),
    FOREIGN KEY (VenueId) REFERENCES Venues(VenueId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- INDEX cho query sự kiện (Status cho lọc approved)
CREATE INDEX idx_Events_Status ON Events(Status);

-- Cụm 3: Đăng ký & Tham gia
-- =============================================
CREATE TABLE Registrations (
    RegistrationId INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT NOT NULL,
    EventId INT NOT NULL,
    Status INT NOT NULL, -- 0: Confirmed, 1: Cancelled
    RegisteredAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (EventId) REFERENCES Events(EventId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE WaitlistEntries (
    WaitlistId INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT NOT NULL,
    EventId INT NOT NULL,
    WaitlistedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (EventId) REFERENCES Events(EventId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Attendances (
    AttendanceId INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT NOT NULL,
    EventId INT NOT NULL,
    CheckInTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (EventId) REFERENCES Events(EventId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE QRCheckIns (
    QRId INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT NOT NULL,
    EventId INT NOT NULL,
    QRCode VARCHAR(255) NOT NULL UNIQUE,
    GeneratedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    ScannedAt DATETIME NULL,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (EventId) REFERENCES Events(EventId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Cụm 4 & 5: Tương tác & Tiện ích
-- =============================================
CREATE TABLE Feedbacks (
    FeedbackId INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT NOT NULL,
    EventId INT NOT NULL,
    Rating INT CHECK (Rating >= 1 AND Rating <= 5),
    Comments LONGTEXT,
    SubmittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (EventId) REFERENCES Events(EventId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Certificates (
    CertificateId INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT NOT NULL,
    EventId INT NOT NULL,
    CertificateUrl VARCHAR(255) NOT NULL,
    IsPaid TINYINT(1) DEFAULT 0,  -- Thay BIT bằng TINYINT(1)
    IssuedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (EventId) REFERENCES Events(EventId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Media (
    MediaId INT PRIMARY KEY AUTO_INCREMENT,
    EventId INT NOT NULL,
    UploaderId INT,
    FileUrl VARCHAR(255) NOT NULL,
    FileType VARCHAR(20) NOT NULL,
    Caption VARCHAR(255),
    UploadedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (EventId) REFERENCES Events(EventId),
    FOREIGN KEY (UploaderId) REFERENCES Users(UserId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE UserFavorites (
    FavoriteId INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT NOT NULL,
    MediaId INT NOT NULL,
    FavoritedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (MediaId) REFERENCES Media(MediaId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Notifications (
    NotificationId INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT NOT NULL,
    Message LONGTEXT NOT NULL,
    IsRead TINYINT(1) DEFAULT 0,  -- Thay BIT bằng TINYINT(1)
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dữ liệu mẫu (để test)
-- Tạo role mới
INSERT INTO Roles (RoleId, RoleName) VALUES (1, 'Admin');
INSERT INTO Roles (RoleId, RoleName) VALUES (2, 'Organizer');
INSERT INTO Roles (RoleId, RoleName) VALUES (3, 'Student');

INSERT INTO Departments (DepartmentName) VALUES ('Communication Technology'), ('Chemical and Lips'), ('Economy and Management') ;

-- Tạo user mẫu
INSERT INTO Users (Email, PasswordHash, RoleId) VALUES ('admin@test.com', '$2a$12$hnJUJaelQQdNXzdMnMInIOUZMi/cv.mK8BCw/uCqWeRYsMUP1HM2a', 1);  -- Hash của 'password'
INSERT INTO UserProfiles (UserId, FullName, DepartmentId) VALUES (1, 'Admin User', 1);

INSERT INTO Users (Email, PasswordHash, RoleId) VALUES ('organizer@test.com', '$2a$12$tO214XlnUjrKYEEUC3r9reTrfftRjsfApP5RZBpjzPomxJ9EoaJPK', 2);  -- Hash của 'password'
INSERT INTO UserProfiles (UserId, FullName, DepartmentId) VALUES (2, 'Organizer User', 1);

INSERT INTO Users (Email, PasswordHash, RoleId) VALUES ('student@test.com', '$2a$12$J4AkjgsvQ.edt60CVHq.1OKvC3tttf369ukyyUtiJiwmUNqnjk6IW', 3);  -- Hash của 'password'
INSERT INTO UserProfiles (UserId, FullName, DepartmentId, EnrollmentNo) VALUES (3, 'Student User', 1, 'SV001');

-- Thêm event categories
INSERT INTO EventCategories (CategoryId, CategoryName) VALUES (1, 'Workshop');
INSERT INTO EventCategories (CategoryId, CategoryName) VALUES (2, 'Cultural Event');

-- Thêm venues
INSERT INTO Venues (VenueId, VenueName, Location, Capacity) VALUES (1, 'Room A1', 'Dormitory', 100);
INSERT INTO Venues (VenueId, VenueName, Location, Capacity) VALUES (2, 'Hall B', 'Main Campus', 200);