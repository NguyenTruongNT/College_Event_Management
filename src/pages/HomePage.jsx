// src/pages/HomePage.jsx
import StatisticCard from "../components/public/StatisticCard";
import EventCard from "../components/public/EventCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import CalendarComponent from "../components/public/Calendar";
import NotificationCard from "../components/public/NotificationCard";
import NewsCard from "../components/public/NewsCard";
import Footer from "../components/public/Footer";
import EventsList from "../components/public/EventsList";
import HomeHero from "../components/public/HomeHero";

// Import CSS Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function HomePage() {
  const featuredEvents = [
    {
      id: "ai-2024",
      title: "Hội thảo Công nghệ AI 2025",
      date: "12/09/2025 10:00 AM",
      description:
        "Hội thảo về AI và Machine Learning cho các sinh viên đam mê Nghiên cứu.",
      imageUrl: "https://via.placeholder.com/300x200?text=AI+2024",
    },
    {
      id: "tech-summit",
      title: "Hội nghị Công nghệ Toàn cầu",
      date: "15/09/2025 01:00 PM",
      description:
        "Tham gia học tập và trao đổicùng chuyên gia công nghệ hàng đầu trong lĩnh vực.",
      imageUrl: "https://via.placeholder.com/300x200?text=Tech+Summit",
    },
    {
      id: "coding-bootcamp",
      title: "Khóa học Lập trình Cơ bản",
      date: "20/09/2025 09:00 AM",
      description:
        "Học lập trình từ cơ bản đến nâng cao nắm chắc kiến thức từ A - Z.",
      imageUrl: "https://via.placeholder.com/300x200?text=Coding+Bootcamp",
    },
    {
      id: "design-thinking",
      title: "Workshop Design Thinking",
      date: "25/09/2025 02:00 PM",
      description:
        "Ứng dụng tư duy thiết kế để giải quyết vấn đề sáng tạo trong lĩnh vực.",
      imageUrl: "https://via.placeholder.com/300x200?text=Design+Thinking",
    },
  ];

  const notifications = [
    {
      id: "notif1",
      title: "Thông báo mới",
      date: "10/09/2025",
      message: "Hội thảo AI đã mở đăng ký.",
      link: "/notifications",
    },
    {
      id: "notif2",
      title: "Cập nhật hệ thống",
      date: "09/09/2025",
      message: "Hệ thống nâng cấp thành công.",
      link: "/notifications",
    },
  ];

  const news = [
    {
      id: "news1",
      title: "AI trong giáo dục",
      date: "08/09/2025",
      summary: "Tìm hiểu cách AI thay đổi giáo dục.",
      imageUrl:
        "https://aptechvietnam.com.vn/wp-content/uploads/1_0001_0_1.png",
      link: "/news/ai",
    },
    {
      id: "news2",
      title: "Công nghệ 2025",
      date: "07/09/2025",
      summary: "Xu hướng công nghệ mới nhất.",
      imageUrl:
        "https://aptechvietnam.com.vn/wp-content/uploads/1_0001_0_1.png",
      link: "/news/tech",
    },
  ];

  return (
    <div>
      <HomeHero />

      <div className="container">
        {/* Thống kê */}
        <div className="container mt-5 ">
          <h2 className="mb-4">Thống kê tổng quan</h2>
          <div className="row">
            <div className="col-md-3">
              <StatisticCard
                icon="bi-calendar-event"
                number="156"
                title="Tổng sự kiện"
                subtitle="+12 trong tháng này"
              />
            </div>
            <div className="col-md-3">
              <StatisticCard
                icon="bi-people"
                number="2,847"
                title="Người tham gia"
                subtitle="+234 tuần này"
              />
            </div>
            <div className="col-md-3">
              <StatisticCard
                icon="bi-award"
                number="1,234"
                title="Chứng chỉ cấp"
                subtitle="+89 hôm nay"
              />
            </div>
            <div className="col-md-3">
              <StatisticCard
                icon="bi-star-fill"
                number="4.8"
                title="Đánh giá TB"
                subtitle="Từ 892 đánh giá"
              />
            </div>
          </div>
        </div>

        {/* Sự kiện nổi bật */}
        <div className="container mt-5">
          <h2 className="mb-4">Sự kiện nổi bật</h2>
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
            className="mb-5"
          >
            {featuredEvents.map((event) => (
              <SwiperSlide key={event.id}>
                <div
                  className="h-100 d-flex"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "450px", // 👈 Chiều cao cố định cho tất cả card
                  }}
                >
                  <EventCard
                    eventId={event.id}
                    title={event.title}
                    date={event.date}
                    description={event.description}
                    imageUrl={event.imageUrl}
                    className="flex-fill d-flex flex-column"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Lịch & Thông báo */}
        <div className="container mt-5">
          <h2 className="mb-4">Lịch sự kiện & Thông báo</h2>
          <div className="row">
            <div className="col-md-9">
              <CalendarComponent />
            </div>
            <div className="col-md-3">
              <h5 className="mb-3">Thông báo gần đây</h5>
              {notifications.map((notif) => (
                <NotificationCard
                  key={notif.id}
                  title={notif.title}
                  date={notif.date}
                  message={notif.message}
                  link={notif.link}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tin tức */}
        <div className="container mt-5">
          <h2 className="mb-4">Tin tức</h2>
          <div className="row">
            {news.map((item) => (
              <div key={item.id} className="col-md-6 mb-3">
                <NewsCard
                  title={item.title}
                  date={item.date}
                  summary={item.summary}
                  imageUrl={item.imageUrl}
                  link={item.link}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
